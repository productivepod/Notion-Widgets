// script.js

document.addEventListener('DOMContentLoaded', () => {
    const jsonPath = 'mf.json';
    const carousel = document.getElementById('carousel');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');

    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) throw new Error('Invalid JSON format');

            data.forEach(value => {
                const apiUrl = `https://api.mfapi.in/mf/${value}/latest`;;

                fetch(apiUrl)
                    .then(apiResponse => apiResponse.json())
                    .then(apiData => {
                        if (apiData.status === 'SUCCESS') {
                            const item = document.createElement('div');
                            item.classList.add('carousel-item');

                            item.innerHTML = `
                                <h2>${apiData.meta.scheme_name}</h2>
                                <p><strong>Fund House:</strong> ${apiData.meta.fund_house}</p>
                                <p><strong>Scheme Type:</strong> ${apiData.meta.scheme_type}</p>
                                <p><strong>Category:</strong> ${apiData.meta.scheme_category}</p>
                                <p><strong>Date:</strong> ${apiData.data[0].date}</p>
                                <p><strong>NAV:</strong> ${apiData.data[0].nav}</p>
                            `;

                            carousel.appendChild(item);
                        }
                    })
                    .catch(error => console.error(`Error fetching data for ${value}:`, error));
            });

            initializeCarousel();
        })
        .catch(error => console.error('Error fetching JSON file:', error));

    function initializeCarousel() {
        const items = document.querySelectorAll('.carousel-item');
        const totalItems = items.length;
        let currentIndex = 0;

        next.addEventListener('click', () => {
            if (currentIndex < totalItems - 1) {
                currentIndex++;
                updateCarousel();
            } else {
                currentIndex = 0;
                updateCarousel(true);
            }
        });

        prev.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            } else {
                currentIndex = totalItems - 1;
                updateCarousel(true);
            }
        });

        function updateCarousel(instant = false) {
            if (instant) {
                carousel.style.transition = 'none';
                carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
                setTimeout(() => {
                    carousel.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            } else {
                carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
        }
    }
});
