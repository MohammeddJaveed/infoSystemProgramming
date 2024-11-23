

function fetchRoutes() {
    fetch('http://localhost:3000/bus')  
        .then(response => response.json())
        .then(data => {
            const routesContainer = document.getElementById('routesContainer');
            routesContainer.innerHTML = '';  

            
            data.forEach(route => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <strong>Route Name:</strong> ${route.route_name} <br>
                    <strong>Starting Point:</strong> ${route.starting_point} <br>
                    <strong>Destination:</strong> ${route.destination} <br>
                    <strong>Description:</strong> ${route.description}
                `;
                routesContainer.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching routes:', error);
        });
}

function searchRoutes() {
    const starting_point = document.getElementById('searchStart').value;
    const destination = document.getElementById('searchDestination').value;

   
    if (!starting_point || !destination) {
        alert('Please enter both starting point and destination.');
        return;
    }

    fetch(`http://localhost:3000/bus/search?starting_point=${encodeURIComponent(starting_point)}&destination=${encodeURIComponent(destination)}`)
        .then(response => response.json())
        .then(data => {
            const routesContainer = document.getElementById('routesContainer');
            routesContainer.innerHTML = ''; 

            if (data.length === 0) {
                routesContainer.innerHTML = '<li>No routes found for the given search.</li>';
            } else {
                
                data.forEach(route => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <strong>Route Name:</strong> ${route.route_name || 'N/A'} <br>
                        <strong>Starting Point:</strong> ${route.route_name || 'N/A'} <br>
                        <strong>Destination:</strong> ${route.destination || 'N/A'} <br>
                        <strong>Description:</strong> ${route.description || 'N/A'}
                    `;
                    routesContainer.appendChild(listItem);
                });
            }
        })
        .catch(error => {
            console.error('Error searching routes:', error);
        });
}


document.addEventListener('DOMContentLoaded', fetchRoutes);
