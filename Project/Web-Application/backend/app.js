const express = require('express');
const pool = require('./db');
const app = express();
const port = 3000;

app.use(express.json());

const parseToISO = (timestampStr) => {
  const [datePart, timePart] = timestampStr.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hour, minute] = timePart.split(':').map(Number);

  // สร้าง Date object แบบ local
  const date = new Date(year, month - 1, day, hour, minute);

  // แปลงเป็น ISO string (UTC)
  return date.toISOString();
};

function toFixed2(val) {
  const num = parseFloat(val);
  return isNaN(num) ? null : Math.round(num * 100) / 100;
}

const toLocalTimestampString = (isoString) => {
  const date = new Date(isoString);
  date.setHours(date.getHours() + 7); // เพิ่ม 7 ชั่วโมง
  return date.toISOString().slice(0, 19).replace('T', ' '); // → '2025-07-12 17:00:00'
};

const percentOf = (val, total) => {
  if (!total || total === 0) return 0;
  return toFixed2((val / total) * 100);
};

/**
 * GET /api/power_flow
 * ?timestamp=2025-07-08T10:00:00
 */
app.get('/api/power_flow', async (req, res) => {
  const { timestamp } = req.query;

  try {
    let result;

    if (timestamp) {
      // ถ้ามี timestamp → หาข้อมูล "ใกล้ที่สุด" ที่ <= timestamp
      result = await pool.query(
        `
        SELECT timestamp,
               load_site1_kw,
               load_site2_kw,
               load_site3_kw,
               (load_site1_kw + load_site2_kw + load_site3_kw) AS load_kw,
               ev_charger_kw,
               total_load_kw,
               solar_power_kw,
               battery1_kw,
               battery2_kw,
               grid_kw
        FROM data
        WHERE TO_TIMESTAMP(timestamp, 'FMDD/FMMM/YYYY FMHH24:MI') <= TO_TIMESTAMP($1, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
        ORDER BY TO_TIMESTAMP(timestamp, 'FMDD/FMMM/YYYY FMHH24:MI') DESC
        LIMIT 1
        `,
        [timestamp]
      );
    } else {
      // ถ้าไม่ส่ง timestamp → เอาข้อมูลล่าสุดสุด
      result = await pool.query(
        `
        SELECT timestamp,
               load_site1_kw,
               load_site2_kw,
               load_site3_kw,
               (load_site1_kw + load_site2_kw + load_site3_kw) AS load_kw,
               ev_charger_kw,
               total_load_kw,
               solar_power_kw,
               battery1_kw,
               battery2_kw,
               grid_kw
        FROM data
        ORDER BY TO_TIMESTAMP(timestamp, 'FMDD/FMMM/YYYY FMHH24:MI') DESC
        LIMIT 1
        `
      );
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    const data = result.rows[0];
    data.timestamp = parseToISO(data.timestamp); // 🔁 แปลง timestamp
    res.json(data);
  } catch (err) {
    console.error('Error fetching power flow data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/solar_summary', async (req, res) => {
  try {
    const { start, end, intervalHour } = req.query;

    let startTime, endTime;

    if (start && end) {
      // 📌 ถ้ามี start/end จากผู้ใช้
      startTime = new Date(start);
      endTime = new Date(end);
    } else {
      // 📌 Default → เอาช่วง 1 วันสุดท้ายจากฐานข้อมูล
      const latestResult = await pool.query(`
        SELECT TO_TIMESTAMP(timestamp, 'FMDD/FMMM/YYYY FMHH24:MI') AS ts
        FROM data
        ORDER BY TO_TIMESTAMP(timestamp, 'FMDD/FMMM/YYYY FMHH24:MI') DESC
        LIMIT 1
      `);

      if (latestResult.rows.length === 0) {
        return res.status(404).json({ message: 'No data in database' });
      }

      endTime = new Date(latestResult.rows[0].ts);
      startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);
    }

    // 📌 คำนวณช่วงเวลา
    const durationMs = endTime - startTime;
    const durationDays = durationMs / (1000 * 60 * 60 * 24);

    let interval = Number(intervalHour);
    if (!interval) {
      if (durationDays < 4) interval = 1;
      else if (durationDays < 8) interval = 2;
      else if (durationDays < 31) interval = 24;
      else interval = 168;
    }

    const result = await pool.query(
      `
      SELECT
        time_bucket(
          make_interval(hours => $3),
          TO_TIMESTAMP(timestamp, 'FMDD/FMMM/YYYY FMHH24:MI') AT TIME ZONE 'Asia/Bangkok'
        ) AS timestamp,
        AVG(load_site1_kw) AS load_site1_kw,
        AVG(load_site2_kw) AS load_site2_kw,
        AVG(load_site3_kw) AS load_site3_kw,
        AVG(load_site1_kw + load_site2_kw + load_site3_kw) AS load_kw,
        AVG(ev_charger_kw) AS ev_charger_kw,
        AVG(total_load_kw) AS total_load_kw,
        AVG(forecasted_load_site1_kw) AS forecasted_load_site1_kw,
        AVG(forecasted_load_site2_kw) AS forecasted_load_site2_kw,
        AVG(forecasted_load_site3_kw) AS forecasted_load_site3_kw,
        AVG(forecasted_ev_charger_kw) AS forecasted_ev_charger_kw,
        AVG(solar_power_kw) AS solar_power_kw,
        AVG(forecasted_solar_power_kw) AS forecasted_solar_power_kw,
        AVG(forecasted_total_load_kw) AS forecasted_total_load_kw
      FROM data
      WHERE TO_TIMESTAMP(timestamp, 'FMDD/FMMM/YYYY FMHH24:MI') AT TIME ZONE 'Asia/Bangkok' BETWEEN $1 AND $2
      GROUP BY 1
      ORDER BY 1 ASC
      `,
      [startTime.toISOString(), endTime.toISOString(), interval]
    );

    // 📌 แปลง timestamp เป็น ISO string
    const data = result.rows.map(row => ({
      ...row,
      timestamp: new Date(row.timestamp).toISOString(),
    }));

    res.json(data);
  } catch (err) {
    console.error('💥 Error fetching solar summary:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 📁 app.js (หรือไฟล์หลักของ backend)
app.get('/api/solar_summary_point', async (req, res) => {
  console.log('🔥 GET /api/solar_summary_point called');
  console.log('🕒 query:', req.query);


  const { period = 'day', date, month } = req.query;
  const periodType = period === 'month' ? 'month' : 'day';

  try {
    // ✅ 1. get latest row
    const latestResult = await pool.query(`
      SELECT * FROM data
      ORDER BY TO_TIMESTAMP(timestamp, 'FMDD/FMMM/YYYY FMHH24:MI') DESC
      LIMIT 1
    `);

    if (latestResult.rows.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    const latestRow = latestResult.rows[0];
    const iso = parseToISO(latestRow.timestamp);
    const utcDate = new Date(iso);
    const localDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

    // ✅ 2. define rangeStart / rangeEnd
    let rangeStart, rangeEnd;

    if (periodType === 'month' && month) {
      const [y, m] = month.split('-').map(Number);
      rangeStart = new Date(Date.UTC(y, m - 1, 1));
      rangeEnd = new Date(Date.UTC(y, m, 1));
    } else if (periodType === 'day' && date) {
      const [y, m, d] = date.split('-').map(Number);
      rangeStart = new Date(Date.UTC(y, m - 1, d));
      rangeEnd = new Date(Date.UTC(y, m - 1, d + 1));
    } else {
      if (periodType === 'month') {
        rangeStart = new Date(localDate);
        rangeStart.setDate(1);
        rangeStart.setHours(0, 0, 0, 0);
        rangeEnd = new Date(rangeStart);
        rangeEnd.setMonth(rangeEnd.getMonth() + 1);
      } else {
        rangeStart = new Date(localDate);
        rangeStart.setHours(0, 0, 0, 0);
        rangeEnd = new Date(rangeStart);
        rangeEnd.setDate(rangeEnd.getDate() + 1);
      }
    }

    const rangeStartStr = rangeStart.toISOString().slice(0, 19).replace('T', ' ');
    const rangeEndStr = rangeEnd.toISOString().slice(0, 19).replace('T', ' ');

    // ✅ 3. query total sum
    const sumResult = await pool.query(
      `
      SELECT
        SUM(load_site1_kw) AS load_site1_kw,
        SUM(load_site2_kw) AS load_site2_kw,
        SUM(load_site3_kw) AS load_site3_kw,
        SUM(ev_charger_kw) AS ev_charger_kw,
        SUM(grid_kw) AS grid_kw,
        SUM(solar_power_kw) AS solar_power_kw,
        SUM(battery1_kw) AS battery1_kw,
        SUM(battery2_kw) AS battery2_kw
      FROM data
      WHERE TO_TIMESTAMP(timestamp, 'FMDD/FMMM/YYYY FMHH24:MI') >= TO_TIMESTAMP($1, 'YYYY-MM-DD HH24:MI:SS')
        AND TO_TIMESTAMP(timestamp, 'FMDD/FMMM/YYYY FMHH24:MI') < TO_TIMESTAMP($2, 'YYYY-MM-DD HH24:MI:SS')
      `,
      [rangeStartStr, rangeEndStr]
    );

    const total = sumResult.rows[0];

    // ✅ 4. จัดกลุ่ม energy_in / energy_out
    const inVals = {
      grid_kw: toFixed2(total.grid_kw),
      solar_power_kw: toFixed2(total.solar_power_kw),
      battery1_kw: total.battery1_kw > 0 ? toFixed2(total.battery1_kw) : 0,
      battery2_kw: total.battery2_kw > 0 ? toFixed2(total.battery2_kw) : 0,
      ev_charger_kw: total.ev_charger_kw < 0 ? toFixed2(Math.abs(total.ev_charger_kw)) : 0,
    };

    const outVals = {
      load_site1_kw: toFixed2(total.load_site1_kw),
      load_site2_kw: toFixed2(total.load_site2_kw),
      load_site3_kw: toFixed2(total.load_site3_kw),
      battery1_kw: total.battery1_kw < 0 ? toFixed2(Math.abs(total.battery1_kw)) : 0,
      battery2_kw: total.battery2_kw < 0 ? toFixed2(Math.abs(total.battery2_kw)) : 0,
      ev_charger_kw: total.ev_charger_kw > 0 ? toFixed2(total.ev_charger_kw) : 0,
    };

    const inTotal = Object.values(inVals).reduce((a, b) => a + b, 0);
    const outTotal = Object.values(outVals).reduce((a, b) => a + b, 0);

    const energy_in = {};
    const energy_out = {};

    for (const [key, val] of Object.entries(inVals)) {
      energy_in[key] = { value: val, percent: percentOf(val, inTotal) };
    }
    for (const [key, val] of Object.entries(outVals)) {
      energy_out[key] = { value: val, percent: percentOf(val, outTotal) };
    }

    // ✅ 5. respond
    res.json({
      timestamp: parseToISO(latestRow.timestamp),
      period: periodType,
      range_start: rangeStartStr,
      range_end: rangeEndStr,
      latest: {
        battery1_kw: toFixed2(latestRow.battery1_kw),
        battery2_kw: toFixed2(latestRow.battery2_kw),
        battery1_status: latestRow.battery1_kw > 0 ? 'charging' : 'discharging',
        battery2_status: latestRow.battery2_kw > 0 ? 'charging' : 'discharging',
        total_load_kw: toFixed2(latestRow.total_load_kw),
        forecasted_total_load_kw: toFixed2(latestRow.forecasted_total_load_kw),
        solar_power_kw: toFixed2(latestRow.solar_power_kw),
        forecasted_solar_power_kw: toFixed2(latestRow.forecasted_solar_power_kw),
      },
      energy_in,
      energy_out
    });
  } catch (err) {
    console.error('💥 Internal Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});