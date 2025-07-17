# Smart Building Energy Architecture Visualization

## Overview

This modern React application provides an interactive visualization of smart building energy management systems with architectural components. Built with React, JavaScript, and Tailwind CSS.

## Features

### 🏗️ Architectural Components

- **Grid Connection**: Main electrical grid interface
- **Solar PV System**: Renewable energy generation
- **Battery Storage**: Dual battery systems for energy storage
- **EV Charging Station**: Smart electric vehicle charging
- **Building Load**: Main consumption monitoring
- **Smart Grid Controller**: Intelligent grid management
- **Power Management Unit**: Central coordination hub
- **ESID Controller**: Energy Storage Integration Device
- **Generation Controller**: Renewable generation management

### 🎯 Interactive Features

- **Hover Information**: Quick component details on hover
- **Click for Details**: Comprehensive technical specifications
- **Category Filtering**: Filter by component type (Infrastructure, Control, Generation, Storage, Load)
- **Animated Power Flow**: Visual representation of energy flow
- **Real-time Status**: Live component status indicators
- **Performance Metrics**: Efficiency and uptime monitoring

### 🎨 Modern UI Design

- **Tailwind CSS**: Modern, responsive design
- **Gradient Backgrounds**: Beautiful color schemes
- **Interactive Animations**: Smooth transitions and hover effects
- **Status Indicators**: Color-coded component states
- **Modal Dialogs**: Detailed component information

## Component Categories

### Infrastructure (Blue)

- Grid Connection

### Control Systems (Purple)

- Smart Grid Controller
- Power Management Unit
- ESID Controller
- Generation Controller

### Generation (Green)

- Solar PV System

### Storage (Yellow)

- Battery Storage 1
- Battery Storage 2

### Load (Red)

- Building Load
- EV Charging Station

## Technology Stack

- **React 19.1.0**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript**: ES6+ features
- **SVG**: Custom component icons
- **CSS Animations**: Smooth transitions

## Installation & Setup

1. **Install Dependencies**

   ```bash
   npm install
   npm install -D tailwindcss postcss autoprefixer
   ```

2. **Start Development Server**

   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## File Structure

```
src/
├── App.js                     # Main application entry
├── components/
│   ├── ArchitecturalDiagram.js # Main diagram component
│   └── IconComponents.js      # Custom SVG icons
├── assets/
│   ├── grid.png              # Grid icon
│   ├── solar.png             # Solar panel icon
│   ├── battery.png           # Battery icon
│   ├── ev.png                # EV charger icon
│   └── building.png          # Building icon
└── index.css                 # Tailwind CSS imports
```

## Features Explanation

### Interactive Hover

- Hover over any component to see quick information
- Status indicators show real-time component state
- Category-specific color coding

### Detailed Click Views

- Click any component for comprehensive details
- Technical specifications
- Performance metrics
- Current power readings

### View Filtering

- Filter components by category
- "All Components" view shows everything
- Category-specific views for focused analysis

### Power Flow Animation

- Animated SVG lines show energy flow
- Different colors for power vs control signals
- Innovation space highlighting

## Customization

### Adding New Components

1. Add component data to `componentData` object
2. Define position in `positions` object
3. Add connections in `connections` array
4. Create custom SVG icon if needed

### Styling

- Modify Tailwind classes for different colors
- Update gradients in component definitions
- Customize animation speeds and effects

## API Integration

The app supports backend integration for real-time data:

```javascript
// Replace mock data with actual API call
fetch("http://localhost:3000/api/power-flow")
  .then((res) => res.json())
  .then((data) => setPower(data));
```

## Performance Features

- Efficient React rendering with proper key props
- Optimized SVG animations
- Responsive design for all screen sizes
- Lazy loading for better performance

## Browser Support

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge
- Mobile responsive design

## Future Enhancements

- Real-time data streaming
- Historical data charts
- Alert system integration
- Multi-language support
- Export functionality
- Advanced filtering options

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Submit pull request

## License

MIT License - see LICENSE file for details
