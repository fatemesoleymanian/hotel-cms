// scripts/updateColors.js
const fs = require('fs');
const path = require('path');

// Path to your quasar.variables.scss file
const filePath = path.join(__dirname, '../src/css/quasar.variables.scss');

function updateColors(primaryColor, secondaryColor, accentColor, darkColor) {
  console.log('Attempting to update colors...'); // Debug log

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    // Define new color variables
    const primaryVariable = `$primary: ${primaryColor};`;
    const secondaryVariable = `$secondary: ${secondaryColor};`;
    const accentVariable = `$accent: ${accentColor};`;
    const darkVariable = `$accent: ${darkColor};`;

    // Check if variables are already defined, and replace or add them
    let updatedData;
    if (data.includes('$primary:')) {
      // Replace existing definitions
      updatedData = data.replace(/\$primary:.*;/, primaryVariable);
    } else {
      // Add new definition if not found
      updatedData = primaryVariable + '\n' + data;
    }
    if (data.includes('$accent:')) {
      // Replace existing definitions
      updatedData = data.replace(/\$accent:.*;/, accentVariable);
    } else {
      // Add new definition if not found
      updatedData = accentVariable + '\n' + data;
    }

    if (data.includes('$secondary:')) {
      // Replace existing definitions
      updatedData = updatedData.replace(/\$secondary:.*;/, secondaryVariable);
    } else {
      // Add new definition if not found
      updatedData = secondaryVariable + '\n' + updatedData;
    }
    if (data.includes('$dark:')) {
      // Replace existing definitions
      updatedData = updatedData.replace(/\$dark:.*;/, dark);
    } else {
      // Add new definition if not found
      updatedData = darkVariable + '\n' + updatedData;
    }

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedData, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing to the file:', writeErr);
      } else {
        console.log('Colors updated successfully.');
      }
    });
  });
}

module.exports = updateColors;
