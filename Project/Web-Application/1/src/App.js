import React, { useEffect, useState } from "react";

// Import existing assets
import grid from "./assets/grid.png";
import solar from "./assets/solar.png";
import battery from "./assets/battery.png";
import ev from "./assets/ev.png";
import building from "./assets/building.png";

// Component data with information
const componentData = {
  grid: {
    id: "grid",
    name: "Grid Connection",
    shortInfo: "Main electrical grid connection",
    detailInfo:
      "The electrical grid provides and receives power from the building. It serves as the primary power source when renewable energy is insufficient and can receive excess power when production exceeds consumption.",
    type: "Power Source",
    status: "Connected",
    icon: grid,
  },
  solar: {
    id: "solar",
    name: "Solar PV System",
    shortInfo: "Photovoltaic solar panels",
    detailInfo:
      "Solar photovoltaic panels convert sunlight into electrical energy. This renewable energy source reduces dependency on grid power and can provide clean electricity during daylight hours.",
    type: "Renewable Energy",
    status: "Active",
    icon: solar,
  },
  battery1: {
    id: "battery1",
    name: "Battery Storage 1",
    shortInfo: "Primary energy storage unit",
    detailInfo:
      "High-capacity lithium-ion battery system that stores excess energy from solar panels or grid during off-peak hours. Provides backup power and load balancing capabilities.",
    type: "Energy Storage",
    status: "Charging",
    icon: battery,
  },
  battery2: {
    id: "battery2",
    name: "Battery Storage 2",
    shortInfo: "Secondary energy storage unit",
    detailInfo:
      "Additional battery storage system working in parallel with Battery 1 to increase total energy storage capacity and provide redundancy for critical loads.",
    type: "Energy Storage",
    status: "Standby",
    icon: battery,
  },
  ev: {
    id: "ev",
    name: "EV Charging Station",
    shortInfo: "Electric vehicle charger",
    detailInfo:
      "Smart electric vehicle charging station that can charge electric vehicles using renewable energy from solar panels or stored energy from batteries. Features load balancing and scheduling capabilities.",
    type: "Load/Storage",
    status: "Available",
    icon: ev,
  },
  building: {
    id: "building",
    name: "Building Load",
    shortInfo: "Main building consumption",
    detailInfo:
      "Represents the total electrical load of the building including lighting, HVAC, appliances, and other electrical systems. The building management system optimizes energy consumption.",
    type: "Load",
    status: "Active",
    icon: building,
  },
};

// Power flow connections (lines between components)
const connections = [
  { from: "grid", to: "building", path: "M 120 60 L 160 190" },
  { from: "solar", to: "building", path: "M 270 120 L 220 190" },
  { from: "solar", to: "battery1", path: "M 300 120 L 340 200" },
  { from: "battery1", to: "battery2", path: "M 370 200 L 410 290" },
  { from: "battery2", to: "ev", path: "M 440 290 L 540 370" },
  { from: "building", to: "ev", path: "M 220 220 L 540 340" },
];

export default function PowerFlowDiagram() {
  const [power, setPower] = useState({});
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    // Simulate API call with mock data
    const mockData = {
      grid: 5.2,
      pv: 8.1,
      battery1: 3.4,
      battery2: 2.8,
      ev: 6.5,
      building: 12.3,
    };
    setPower(mockData);

    // Uncomment when backend is ready
    // fetch("http://localhost:3000/api/power-flow")
    //   .then((res) => res.json())
    //   .then((data) => setPower(data));
  }, []);

  const handleComponentHover = (componentId) => {
    setHoveredComponent(componentId);
  };

  const handleComponentLeave = () => {
    setHoveredComponent(null);
  };

  const handleComponentClick = (componentId) => {
    setSelectedComponent(componentId);
  };

  const closeDetailModal = () => {
    setSelectedComponent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Smart Building Energy Management System
          </h1>
          <p className="text-lg text-gray-600">
            Real-time power flow visualization and monitoring
          </p>
        </div>

        {/* Main Diagram Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="relative w-full h-96 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl overflow-hidden">
            {/* Power Flow Lines/Connections */}
            <svg className="absolute inset-0 w-full h-96 pointer-events-none">
              {connections.map((connection, index) => (
                <g key={index}>
                  <path
                    d={connection.path}
                    stroke="#3B82F6"
                    strokeWidth="3"
                    fill="none"
                    className="opacity-70"
                    strokeDasharray="8,4"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;12"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              ))}
            </svg>

            {/* Innovation Space Label */}
            <div className="absolute bottom-4 right-4 bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-semibold">
              Innovation Space
            </div>

            {/* Components */}
            {Object.entries(componentData).map(([key, component]) => {
              const powerValue = power[key];
              const positions = {
                grid: { x: 50, y: 20 },
                solar: { x: 200, y: 80 },
                battery1: { x: 300, y: 160 },
                battery2: { x: 400, y: 250 },
                ev: { x: 500, y: 330 },
                building: { x: 130, y: 150 },
              };

              return (
                <div
                  key={component.id}
                  className="absolute cursor-pointer transition-all duration-300 hover:scale-110"
                  style={{
                    left: `${positions[key].x}px`,
                    top: `${positions[key].y}px`,
                  }}
                  onMouseEnter={() => handleComponentHover(component.id)}
                  onMouseLeave={handleComponentLeave}
                  onClick={() => handleComponentClick(component.id)}
                >
                  {/* Component Icon */}
                  <div className="relative group">
                    <img
                      src={component.icon}
                      alt={component.name}
                      className="w-16 h-16 drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-xl"
                    />

                    {/* Status Indicator */}
                    <div
                      className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        component.status === "Active" ||
                        component.status === "Connected"
                          ? "bg-green-500"
                          : component.status === "Charging"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {(component.status === "Active" ||
                        component.status === "Connected") && (
                        <div className="w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></div>
                      )}
                    </div>
                  </div>

                  {/* Power Value Label */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white px-3 py-1 rounded-lg shadow-md border border-gray-200">
                      <span className="text-sm font-semibold text-gray-800">
                        {powerValue ? `${powerValue} kW` : "-- kW"}
                      </span>
                    </div>
                  </div>

                  {/* Component Name */}
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span className="text-xs font-medium text-gray-600">
                      {component.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hover Tooltip */}
        {hoveredComponent && (
          <div className="fixed bottom-6 left-6 bg-gray-800 text-white p-4 rounded-lg shadow-xl z-50 max-w-sm">
            <h3 className="font-semibold text-lg mb-2">
              {componentData[hoveredComponent].name}
            </h3>
            <p className="text-gray-300 text-sm mb-2">
              {componentData[hoveredComponent].shortInfo}
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">
                Type: {componentData[hoveredComponent].type}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  componentData[hoveredComponent].status === "Active" ||
                  componentData[hoveredComponent].status === "Connected"
                    ? "bg-green-500 text-white"
                    : componentData[hoveredComponent].status === "Charging"
                    ? "bg-blue-500 text-white"
                    : "bg-yellow-500 text-black"
                }`}
              >
                {componentData[hoveredComponent].status}
              </span>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {selectedComponent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={componentData[selectedComponent].icon}
                      alt={componentData[selectedComponent].name}
                      className="w-12 h-12"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {componentData[selectedComponent].name}
                      </h2>
                      <p className="text-gray-600">
                        {componentData[selectedComponent].type}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeDetailModal}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Modal Content */}
                <div className="space-y-6">
                  {/* Current Status and Power */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Current Power
                      </h3>
                      <p className="text-3xl font-bold text-blue-600">
                        {power[selectedComponent]
                          ? `${power[selectedComponent]} kW`
                          : "-- kW"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Status
                      </h3>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          componentData[selectedComponent].status ===
                            "Active" ||
                          componentData[selectedComponent].status ===
                            "Connected"
                            ? "bg-green-100 text-green-800"
                            : componentData[selectedComponent].status ===
                              "Charging"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {componentData[selectedComponent].status}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">
                      Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {componentData[selectedComponent].detailInfo}
                    </p>
                  </div>

                  {/* Technical Specifications (Mock data) */}
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">
                      Technical Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {selectedComponent === "solar" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Capacity:</span>
                            <span className="font-medium">10 kWp</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Efficiency:</span>
                            <span className="font-medium">22%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Panel Type:</span>
                            <span className="font-medium">Monocrystalline</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Inverter:</span>
                            <span className="font-medium">String Inverter</span>
                          </div>
                        </>
                      )}
                      {(selectedComponent === "battery1" ||
                        selectedComponent === "battery2") && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Capacity:</span>
                            <span className="font-medium">50 kWh</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-medium">Li-ion</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Voltage:</span>
                            <span className="font-medium">400V DC</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cycles:</span>
                            <span className="font-medium">6000+</span>
                          </div>
                        </>
                      )}
                      {selectedComponent === "ev" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Power Output:</span>
                            <span className="font-medium">22 kW</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Connector:</span>
                            <span className="font-medium">Type 2</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Smart Features:
                            </span>
                            <span className="font-medium">Load Balancing</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Network:</span>
                            <span className="font-medium">Wi-Fi, 4G</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Total Generation
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {power.pv ? `${power.pv} kW` : "-- kW"}
            </p>
            <p className="text-sm text-gray-500 mt-2">Solar PV Output</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Total Consumption
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {power.building && power.ev
                ? `${(power.building + power.ev).toFixed(1)} kW`
                : "-- kW"}
            </p>
            <p className="text-sm text-gray-500 mt-2">Building + EV Load</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Battery Storage
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {power.battery1 && power.battery2
                ? `${(power.battery1 + power.battery2).toFixed(1)} kW`
                : "-- kW"}
            </p>
            <p className="text-sm text-gray-500 mt-2">Combined Storage</p>
          </div>
        </div>
      </div>
    </div>
  );
}
