// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Path to your mf.json file
  const jsonPath = 'mf.json';

  // Fetch the JSON data
  fetch(jsonPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Ensure data is an array
      if (!Array.isArray(data)) {
        throw new Error('mf.json does not contain an array');
      }

      // Loop through each value and make API calls
      data.forEach(value => {
        // Replace with your actual third-party API URL and parameters
        const apiUrl = `https://api.mfapi.in/mf/${value}/latest`;

        fetch(apiUrl)
          .then(apiResponse => {
            if (!apiResponse.ok) {
              throw new Error(`API error for ${value}: ${apiResponse.status}`);
            }
            return apiResponse.json();
          })
          .then(apiData => {
            // Handle the API response data
            console.log(`Data for ${value}:`, apiData);
            // You can update the DOM or perform other actions here
            displayData(value, apiData);
          })
          .catch(apiError => {
            console.error(apiError);
          });
      });
    })
    .catch(error => {
      console.error('Error fetching mf.json:', error);
    });
});

// Optional: Function to display data on the webpage
function displayData(value, data) {
  const container = document.getElementById('data-container');

  const item = document.createElement('div');
  item.classList.add('data-item');

  const title = document.createElement('h3');
  title.textContent = `Data for ${value}`;

  const content = document.createElement('pre');
  content.textContent = JSON.stringify(data, null, 2);

  item.appendChild(title);
  item.appendChild(content);
  container.appendChild(item);
}
