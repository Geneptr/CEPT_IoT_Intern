import React, { useEffect, useState } from "react";

// Import existing assets
import grid from "../assets/grid.png";
import solar from "../assets/solar.png";
import battery from "../assets/battery.png";
import ev from "../assets/ev.png";
import building from "../assets/building.png";

// Import custom SVG icons
import {
  SmartGridIcon,
  PowerManagementIcon,
  ESIDIcon,
  GenerationControllerIcon,
} from "./IconComponents";

// Enhanced component data with architectural elements
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
    category: "infrastructure",
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
    category: "generation",
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
    category: "storage",
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
    category: "storage",
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
    category: "load",
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
    category: "load",
  },
  // New architectural components
  smartGrid: {
    id: "smartGrid",
    name: "Smart Grid Controller",
    shortInfo: "Intelligent grid management system",
    detailInfo:
      "Advanced control system that manages power flow between grid, generation, and storage systems. Implements smart algorithms for optimal energy distribution and grid stability.",
    type: "Control System",
    status: "Active",
    icon: "svg",
    component: SmartGridIcon,
    category: "control",
  },
  pmu: {
    id: "pmu",
    name: "Power Management Unit",
    shortInfo: "Central power coordination hub",
    detailInfo:
      "Manages and coordinates power flow between all connected systems. Monitors power quality, implements safety protocols, and optimizes energy distribution based on demand patterns.",
    type: "Management System",
    status: "Online",
    icon: "svg",
    component: PowerManagementIcon,
    category: "control",
  },
  esid: {
    id: "esid",
    name: "ESID Controller",
    shortInfo: "Energy Storage Integration Device",
    detailInfo:
      "Specialized controller for energy storage systems that manages charging/discharging cycles, battery health monitoring, and integration with renewable energy sources.",
    type: "Storage Controller",
    status: "Active",
    icon: "svg",
    component: ESIDIcon,
    category: "control",
  },
  genController: {
    id: "genController",
    name: "Generation Controller",
    shortInfo: "Renewable generation management",
    detailInfo:
      "Controls and optimizes renewable energy generation systems including solar PV, wind, and other distributed energy resources. Manages MPPT algorithms and grid synchronization.",
    type: "Generation Control",
    status: "Active",
    icon: "svg",
    component: GenerationControllerIcon,
    category: "control",
  },
};

// Enhanced power flow connections with architectural layout
const connections = [
  // Grid connections
  { from: "grid", to: "smartGrid", path: "M 120 60 L 180 100", type: "power" },
  {
    from: "smartGrid",
    to: "pmu",
    path: "M 210 100 L 280 140",
    type: "control",
  },

  // Generation connections
  {
    from: "solar",
    to: "genController",
    path: "M 270 180 L 320 140",
    type: "power",
  },
  {
    from: "genController",
    to: "pmu",
    path: "M 320 140 L 280 140",
    type: "control",
  },

  // Storage connections
  { from: "pmu", to: "esid", path: "M 280 140 L 400 200", type: "control" },
  { from: "esid", to: "battery1", path: "M 400 200 L 440 240", type: "power" },
  { from: "esid", to: "battery2", path: "M 400 200 L 480 280", type: "power" },

  // Load connections
  { from: "pmu", to: "building", path: "M 280 140 L 220 220", type: "power" },
  { from: "pmu", to: "ev", path: "M 280 140 L 540 320", type: "power" },

  // Innovation space connection
  {
    from: "building",
    to: "ev",
    path: "M 250 220 L 540 300",
    type: "innovation",
    style: "dashed",
  },
];

export default function ArchitecturalDiagram() {
  const [power, setPower] = useState({});
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [viewMode, setViewMode] = useState("all"); // 'all', 'infrastructure', 'control', 'generation', 'storage', 'load'

  useEffect(() => {
    // Simulate API call with mock data
    const mockData = {
      grid: 5.2,
      pv: 8.1,
      battery1: 3.4,
      battery2: 2.8,
      ev: 6.5,
      building: 12.3,
      smartGrid: 0.2,
      pmu: 0.1,
      esid: 0.3,
      genController: 0.2,
    };
    setPower(mockData);
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

  const filteredComponents = Object.entries(componentData).filter(
    ([key, component]) => {
      if (viewMode === "all") return true;
      return component.category === viewMode;
    }
  );

  const positions = {
    grid: { x: 50, y: 20 },
    solar: { x: 200, y: 140 },
    battery1: { x: 400, y: 200 },
    battery2: { x: 440, y: 240 },
    ev: { x: 500, y: 280 },
    building: { x: 160, y: 180 },
    smartGrid: { x: 140, y: 60 },
    pmu: { x: 240, y: 100 },
    esid: { x: 360, y: 160 },
    genController: { x: 280, y: 100 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Smart Building Energy Architecture
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Interactive power flow visualization with architectural components
          </p>

          {/* View Mode Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {[
              {
                key: "all",
                label: "All Components",
                color: "bg-gray-100 text-gray-800",
              },
              {
                key: "infrastructure",
                label: "Infrastructure",
                color: "bg-blue-100 text-blue-800",
              },
              {
                key: "control",
                label: "Control Systems",
                color: "bg-purple-100 text-purple-800",
              },
              {
                key: "generation",
                label: "Generation",
                color: "bg-green-100 text-green-800",
              },
              {
                key: "storage",
                label: "Storage",
                color: "bg-yellow-100 text-yellow-800",
              },
              { key: "load", label: "Load", color: "bg-red-100 text-red-800" },
            ].map((mode) => (
              <button
                key={mode.key}
                onClick={() => setViewMode(mode.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  viewMode === mode.key
                    ? "ring-2 ring-blue-500 " + mode.color
                    : mode.color + " hover:ring-2 hover:ring-blue-300"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Diagram Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 rounded-xl overflow-hidden border-2 border-gray-100">
            {/* Power Flow Lines/Connections */}
            <svg className="absolute inset-0 w-full h-[500px] pointer-events-none">
              {connections.map((connection, index) => {
                const isVisible =
                  viewMode === "all" ||
                  (componentData[connection.from] &&
                    componentData[connection.to] &&
                    (componentData[connection.from].category === viewMode ||
                      componentData[connection.to].category === viewMode));

                if (!isVisible) return null;

                const strokeColor =
                  connection.type === "power"
                    ? "#3B82F6"
                    : connection.type === "control"
                    ? "#8B5CF6"
                    : "#10B981";

                return (
                  <g key={index}>
                    <path
                      d={connection.path}
                      stroke={strokeColor}
                      strokeWidth="3"
                      fill="none"
                      className="opacity-70"
                      strokeDasharray={
                        connection.style === "dashed" ? "8,4" : "12,4"
                      }
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;16"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>
                );
              })}
            </svg>

            {/* Innovation Space Label */}
            <div className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-6 py-3 rounded-lg font-semibold shadow-lg border border-purple-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Innovation Space</span>
              </div>
            </div>

            {/* Components */}
            {filteredComponents.map(([key, component]) => {
              const powerValue = power[key];
              const position = positions[key];

              if (!position) return null;

              return (
                <div
                  key={component.id}
                  className="absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:z-10"
                  style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                  }}
                  onMouseEnter={() => handleComponentHover(component.id)}
                  onMouseLeave={handleComponentLeave}
                  onClick={() => handleComponentClick(component.id)}
                >
                  {/* Component Icon */}
                  <div className="relative group">
                    {component.icon === "svg" ? (
                      React.createElement(component.component, {
                        size: 64,
                        className:
                          "drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-xl",
                      })
                    ) : (
                      <img
                        src={component.icon}
                        alt={component.name}
                        className="w-16 h-16 drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-xl"
                      />
                    )}

                    {/* Category Indicator */}
                    <div
                      className={`absolute -top-2 -left-2 w-6 h-6 rounded-full border-2 border-white shadow-md ${
                        component.category === "infrastructure"
                          ? "bg-blue-500"
                          : component.category === "control"
                          ? "bg-purple-500"
                          : component.category === "generation"
                          ? "bg-green-500"
                          : component.category === "storage"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      <div className="w-full h-full rounded-full animate-ping opacity-30 bg-current"></div>
                    </div>

                    {/* Status Indicator */}
                    <div
                      className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        component.status === "Active" ||
                        component.status === "Connected" ||
                        component.status === "Online"
                          ? "bg-green-500"
                          : component.status === "Charging"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {(component.status === "Active" ||
                        component.status === "Connected" ||
                        component.status === "Online") && (
                        <div className="w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></div>
                      )}
                    </div>
                  </div>

                  {/* Power Value Label */}
                  {powerValue !== undefined && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white px-3 py-1 rounded-lg shadow-md border border-gray-200">
                        <span className="text-sm font-semibold text-gray-800">
                          {powerValue ? `${powerValue} kW` : "-- kW"}
                        </span>
                      </div>
                    </div>
                  )}

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
          <div className="fixed bottom-6 left-6 bg-gray-900 text-white p-6 rounded-xl shadow-2xl z-50 max-w-sm border border-gray-700">
            <div className="flex items-center space-x-3 mb-3">
              <div
                className={`w-4 h-4 rounded-full ${
                  componentData[hoveredComponent].category === "infrastructure"
                    ? "bg-blue-500"
                    : componentData[hoveredComponent].category === "control"
                    ? "bg-purple-500"
                    : componentData[hoveredComponent].category === "generation"
                    ? "bg-green-500"
                    : componentData[hoveredComponent].category === "storage"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              ></div>
              <h3 className="font-semibold text-lg">
                {componentData[hoveredComponent].name}
              </h3>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              {componentData[hoveredComponent].shortInfo}
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">
                Type: {componentData[hoveredComponent].type}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  componentData[hoveredComponent].status === "Active" ||
                  componentData[hoveredComponent].status === "Connected" ||
                  componentData[hoveredComponent].status === "Online"
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

        {/* Detail Modal - Enhanced */}
        {selectedComponent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-6">
                    {componentData[selectedComponent].icon === "svg" ? (
                      React.createElement(
                        componentData[selectedComponent].component,
                        { size: 64 }
                      )
                    ) : (
                      <img
                        src={componentData[selectedComponent].icon}
                        alt={componentData[selectedComponent].name}
                        className="w-16 h-16"
                      />
                    )}
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800">
                        {componentData[selectedComponent].name}
                      </h2>
                      <p className="text-lg text-gray-600">
                        {componentData[selectedComponent].type}
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                          componentData[selectedComponent].category ===
                          "infrastructure"
                            ? "bg-blue-100 text-blue-800"
                            : componentData[selectedComponent].category ===
                              "control"
                            ? "bg-purple-100 text-purple-800"
                            : componentData[selectedComponent].category ===
                              "generation"
                            ? "bg-green-100 text-green-800"
                            : componentData[selectedComponent].category ===
                              "storage"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {componentData[selectedComponent].category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={closeDetailModal}
                    className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Details */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Current Status and Power */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                        <h3 className="font-semibold text-gray-700 mb-2">
                          Current Power
                        </h3>
                        <p className="text-4xl font-bold text-blue-600">
                          {power[selectedComponent] !== undefined
                            ? `${power[selectedComponent]} kW`
                            : "N/A"}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                        <h3 className="font-semibold text-gray-700 mb-2">
                          Status
                        </h3>
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                            componentData[selectedComponent].status ===
                              "Active" ||
                            componentData[selectedComponent].status ===
                              "Connected" ||
                            componentData[selectedComponent].status === "Online"
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
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-700 mb-3 text-lg">
                        Description
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {componentData[selectedComponent].detailInfo}
                      </p>
                    </div>
                  </div>

                  {/* Right Column - Specifications */}
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-700 mb-4 text-lg">
                        Technical Specifications
                      </h3>
                      <div className="space-y-3 text-sm">
                        {/* Add relevant specifications based on component type */}
                        {selectedComponent === "solar" && (
                          <>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Capacity:</span>
                              <span className="font-medium">10 kWp</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Efficiency:</span>
                              <span className="font-medium">22%</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Panel Type:</span>
                              <span className="font-medium">
                                Monocrystalline
                              </span>
                            </div>
                            <div className="flex justify-between py-2">
                              <span className="text-gray-600">Inverter:</span>
                              <span className="font-medium">
                                String Inverter
                              </span>
                            </div>
                          </>
                        )}
                        {(selectedComponent === "battery1" ||
                          selectedComponent === "battery2") && (
                          <>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Capacity:</span>
                              <span className="font-medium">50 kWh</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Type:</span>
                              <span className="font-medium">Li-ion</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Voltage:</span>
                              <span className="font-medium">400V DC</span>
                            </div>
                            <div className="flex justify-between py-2">
                              <span className="text-gray-600">Cycles:</span>
                              <span className="font-medium">6000+</span>
                            </div>
                          </>
                        )}
                        {selectedComponent === "smartGrid" && (
                          <>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Protocol:</span>
                              <span className="font-medium">IEC 61850</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">
                                Response Time:
                              </span>
                              <span className="font-medium">&lt; 100ms</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">
                                Communication:
                              </span>
                              <span className="font-medium">Ethernet/WiFi</span>
                            </div>
                            <div className="flex justify-between py-2">
                              <span className="text-gray-600">
                                AI Features:
                              </span>
                              <span className="font-medium">
                                Predictive Control
                              </span>
                            </div>
                          </>
                        )}
                        {selectedComponent === "pmu" && (
                          <>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Max Power:</span>
                              <span className="font-medium">100 kW</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Efficiency:</span>
                              <span className="font-medium">98.5%</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Monitoring:</span>
                              <span className="font-medium">Real-time</span>
                            </div>
                            <div className="flex justify-between py-2">
                              <span className="text-gray-600">Safety:</span>
                              <span className="font-medium">IEC 62109</span>
                            </div>
                          </>
                        )}
                        {selectedComponent === "esid" && (
                          <>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">
                                Max Storage:
                              </span>
                              <span className="font-medium">200 kWh</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">
                                Charge Rate:
                              </span>
                              <span className="font-medium">50 kW</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Technology:</span>
                              <span className="font-medium">Bidirectional</span>
                            </div>
                            <div className="flex justify-between py-2">
                              <span className="text-gray-600">Lifespan:</span>
                              <span className="font-medium">15+ years</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-700 mb-4 text-lg">
                        Performance
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Efficiency
                          </span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                              <div className="w-4/5 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">96%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Uptime</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                              <div className="w-full h-2 bg-blue-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">99.9%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Load Factor
                          </span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                              <div className="w-3/4 h-2 bg-purple-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">75%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Statistics Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-md p-6 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Generation
              </h3>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-green-600 mb-2">
              {power.pv ? `${power.pv} kW` : "-- kW"}
            </p>
            <p className="text-sm text-gray-500">Solar PV Output</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl shadow-md p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Consumption
              </h3>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-2">
              {power.building && power.ev
                ? `${(power.building + power.ev).toFixed(1)} kW`
                : "-- kW"}
            </p>
            <p className="text-sm text-gray-500">Total Load</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl shadow-md p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Storage</h3>
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path
                    fillRule="evenodd"
                    d="M3 8a2 2 0 012-2v9a2 2 0 01-2-2V8zM15 8a2 2 0 012 2v5a2 2 0 01-2 2V8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-purple-600 mb-2">
              {power.battery1 && power.battery2
                ? `${(power.battery1 + power.battery2).toFixed(1)} kW`
                : "-- kW"}
            </p>
            <p className="text-sm text-gray-500">Battery Systems</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl shadow-md p-6 border border-yellow-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Control</h3>
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-yellow-600 mb-2">
              {power.smartGrid && power.pmu
                ? `${(
                    power.smartGrid +
                    power.pmu +
                    power.esid +
                    power.genController
                  ).toFixed(1)} kW`
                : "-- kW"}
            </p>
            <p className="text-sm text-gray-500">System Control</p>
          </div>
        </div>
      </div>
    </div>
  );
}
