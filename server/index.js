// server/index.js
const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const { exec } = require('child_process');
const updateColors = require('../scripts/updateColors');

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // For parsing JSON requests

// Route to update colors
app.post('/update-colors', (req, res) => {
  const { primaryColor, secondaryColor } = req.body;

  // Run the color update function
  updateColors(primaryColor, secondaryColor);
  console.log('done')
  // Rebuild the Quasar project
  // exec('quasar build', (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Build error: ${error.message}`);
  //     res.status(500).send('Failed to rebuild the project');
  //     return;
  //   }

  //   if (stderr) {
  //     console.error(`Build stderr: ${stderr}`);
  //     res.status(500).send('Build process returned an error');
  //     return;
  //   }

  //   console.log(`Build stdout: ${stdout}`);
  //   res.send('Colors updated and project rebuilt successfully');
  // });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
