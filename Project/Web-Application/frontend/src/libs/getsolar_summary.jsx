import axios from 'axios';

export default async function getolarSummary(startDate, endDate) {
    const URL = `http://localhost:5000/api/solar_summary`;

    try {
        const response = await axios.get(URL,{
            params: {
                start: startDate,
                end: endDate,
    }});
        
        return response.data;
    } catch (error) {
        console.error("Error fetching SolarSummary:", error);
        throw new Error("Failed to fetch SolarSummary");
    }
}