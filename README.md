**Chinese New Energy Eco-Benefit Demo Software**

The Chinese New Energy Eco-Benefit Demo Software is a 3D GIS-based desktop application built with Electron and Vue.js, designed to visualize and analyze environmental conditions related to desert distribution, sandstorm transmission pathways, and restoration efforts across China.
It provides interactive, 3D geospatial visualization using CesiumJS for scientific analysis and environmental planning.

/screenshots
  eco-benefit-demo.png
/README.md

✨ Key Features

A). **Desert Distribution**

Visualize different terrain types: desert areas, sandy terrain, Gobi desert regions.

Compare and analyze various desert types across China.

B). **Transmission Path**

Explore possible 3D sandstorm transmission routes (West, Northwest, North).

Assess potential impact zones based on wind patterns.

C). **Sand Source Area**

Visualize sand source regions (e.g., SE Mongolia, Central/East/Central-West Inner Mongolia).

Analyze regional contributions to desertification.

D). **Case Selection**

Select specific time ranges to view and analyze historical data trends in desert conditions and sandstorm activity.

E). **Interactive Map Controls**

Zoom, pan, reset view, toggle layers for detailed exploration.

**3D Geospatial Data**

Display detailed metrics: coordinates, sea level, pitch, heading, camera height for precise scientific reporting.

**🛠 Tech Stack**
Electron — for desktop application shell

Vue.js — for frontend framework

CesiumJS — for 3D geospatial visualization

Node.js — for backend logic within Electron

🚀 **Getting Started**
Prerequisites
Node.js (v14+ recommended)

npm (comes with Node.js)

Clone the repository
bash
Copy
Edit
git clone https://github.com/yourusername/chinese-eco-benefit-demo.git
cd chinese-eco-benefit-demo
Install dependencies
bash
Copy
Edit
npm install
Run the application in development mode
bash
Copy
Edit
npm run electron:serve
👉 This will start both the Electron shell and the Vue.js frontend.

📦 **Build for production**
bash
Copy
Edit
npm run electron:build
👉 This will generate platform-specific desktop build artifacts (e.g., .exe, .dmg).

💡 **Project Structure**
css
Copy
Edit
/src
  /renderer   → Vue.js frontend code
  /main       → Electron main process code
  /assets     → Images, static files
/public
  index.html  → Main HTML entry
package.json  → Project metadata and scripts
📝 Notes
Data Source: The application integrates geospatial datasets relevant to China’s desert and sandstorm patterns. Ensure appropriate data files (e.g. GeoJSON, CZML) are configured in the assets/ or external API endpoints as needed.

CesiumJS API Key: If Cesium Ion is used, ensure your API token is configured in the environment or CesiumJS setup file.

📌 License
This project is for demo or educational purposes. Licensing details should be provided based on dataset and CesiumJS usage terms.
