import React from 'react';
import SolarChart from './SolarChart.jsx';
import { CHART_CATEGORIES } from './dataGenerator.js';

const ChartContainer = ({
  loading,
  selectedCategories,
  labels,
  chartData,
  diffDays,
  step,
  showPrediction,
  comparisonMode,
  blockStyle = {},
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-12 w-12 border-4 border-amber-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Custom colors for lines
  const coolColors = [
    'rgba(59,130,246,1)', // blue
    'rgba(16,185,129,1)', // teal
    'rgba(99,102,241,1)', // indigo
  ];
  const warmColors = [
    'rgba(251,191,36,1)', // amber
    'rgba(239,68,68,1)', // red
    'rgba(245,158,11,1)', // orange
  ];

  // Last category is 'Compare', show combined line chart
  const compareCategories = CHART_CATEGORIES.slice(0, 6);
  const compareBlock = (
    <div key="Compare" style={blockStyle}>
      <h3 className="text-xl font-bold mb-4">Compare</h3>
      <SolarChart
        labels={labels}
        multiLineData={compareCategories.map((cat, idx) => ({
          label: cat,
          data: chartData[cat]?.real || [],
          borderColor: idx < 3 ? coolColors[idx] : warmColors[idx - 3],
          backgroundColor: 'transparent',
        }))}
        diffDays={diffDays}
        step={step}
        showPrediction={false}
        comparisonMode={true}
        isCompareChart={true}
      />
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Render all except last category as usual */}
      {CHART_CATEGORIES.slice(0, 6).map((category) => (
        selectedCategories.includes(category) ? (
          <div key={category} style={blockStyle}>
            <h3 className="text-xl font-bold mb-4">{category}</h3>
            <SolarChart
              labels={labels}
              realData={chartData[category]?.real || []}
              predictedData={chartData[category]?.predicted || []}
              category={category}
              diffDays={diffDays}
              step={step}
              showPrediction={showPrediction}
              comparisonMode={false}
            />
          </div>
        ) : null
      ))}
      {/* Render Compare chart as last block */}
      {compareBlock}
    </div>
  );
};

export default ChartContainer;
