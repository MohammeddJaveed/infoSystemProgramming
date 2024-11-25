

function fetchRoutes() {
    fetch('http://localhost:5500/bus')  
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
                    <button onclick="editRoute(${route.id})">Edit</button>
                    <button onclick="deleteRoute(${route.id})">Delete</button>
                `;
                routesContainer.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching routes:', error);
        });
}

function fetchRoutesForAdmin() {
    fetch('http://localhost:5500/bus')  
        .then(response => response.json())
        .then(data => {
            const routesContainer = document.getElementById('AdminroutesContainer');
            routesContainer.innerHTML = '';  

            
            data.forEach(route => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <strong>Route Name:</strong> ${route.route_name} <br>
                    <strong>Starting Point:</strong> ${route.starting_point} <br>
                    <strong>Destination:</strong> ${route.destination} <br>
                    <strong>Description:</strong> ${route.description} <br>
                    <button onclick="editRoute(${route.id})">Edit</button>
                    <button onclick="deleteRoute(${route.id})">Delete</button>
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

    fetch(`http://localhost:5500/bus/search?starting_point=${encodeURIComponent(starting_point)}&destination=${encodeURIComponent(destination)}`)
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

async function addBusRoute() {
    console.log('Form Submission initiated');

    const route_name = document.getElementById('route_name').value;
    const startingPoint = document.getElementById('starting_point').value;
    const destination = document.getElementById('destination').value; 
    const description = document.getElementById('description').value;

    if (!route_name || !startingPoint || !destination || !description) {
        alert('All fields are required!');
        return;
    }

    const busData = {
        route_name: route_name,
        starting_point: startingPoint,
        destination: destination,
        description: description
    };

    try {   
        const response = await fetch('http://localhost:5500/bus/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(busData)
        });
        if (response.ok) {
            const result = await response.json();
            alert('Bus route added successfully!');
            console.log('Response:', result);
            document.getElementById('route_name').value = '';
            document.getElementById('starting_point').value = '';
            document.getElementById('destination').value = '';
            document.getElementById('description').value = '';
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error adding bus route:', error);
        alert('An error occurred while adding the bus route.');
    }
}
async function deleteRoute(routeId) {
    if (confirm('Are you sure to delete?')) {
        try {
            const response = await fetch(`http://localhost:5500/bus/delete/${routeId}`, {
                method: 'DELETE',
            });

        if (response.ok) {
             alert('Route deleted successfully!');
                fetchRoutesForAdmin();
          } else {
               alert('Failed to delete the route.');
         }
        } catch (error) {
            console.error('Error deleting route:', error);
            alert('An error occurred while deleting the route.');
        }
    }
}

document.addEventListener('DOMContentLoaded', fetchRoutes);
