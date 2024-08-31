// script.js

document.addEventListener('DOMContentLoaded', () => {
    const jsonPath = 'mf.json';

    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) throw new Error('Invalid JSON format');

            const slider = document.getElementById('slider');

            data.forEach(value => {
                const apiUrl = `https://api.mfapi.in/mf/${value}/latest`;

                fetch(apiUrl)
                    .then(apiResponse => apiResponse.json())
                    .then(apiData => {
                        if (apiData.status === 'SUCCESS') {
                            const slide = document.createElement('div');
                            slide.classList.add('slide');

                            slide.innerHTML = `
                  <h2>${apiData.meta.scheme_name}</h2>
                  <p><strong>Fund House:</strong> ${apiData.meta.fund_house}</p>
                  <p><strong>Scheme Type:</strong> ${apiData.meta.scheme_type}</p>
                  <p><strong>Category:</strong> ${apiData.meta.scheme_category}</p>
                  <p><strong>Date:</strong> ${apiData.data[0].date}</p>
                  <p><strong>NAV:</strong> ${apiData.data[0].nav}</p>
                `;

                            slider.appendChild(slide);
                        }
                    })
                    .catch(error => console.error(`Error fetching data for ${value}:`, error));
            });
        })
        .catch(error => console.error('Error fetching JSON file:', error));

    // Slider functionality
    let currentIndex = 0;
    setInterval(() => {
        const slider = document.getElementById('slider');
        const slides = document.querySelectorAll('.slide');
        currentIndex = (currentIndex + 1) % slides.length;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 3000); // Adjust the interval as needed
});
