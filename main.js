
function showSection(sectionId) {
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden'); 
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        fetchAdminRoutes();
    }
    if (sectionId === 'home') {
        document.getElementById('routes').classList.remove('hidden'); 
        fetchRoutes();
    }
}

// Fetching Routes for Home page
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
                `;
                routesContainer.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching routes:', error);
        });
}
// Search function used in home page
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
                        <strong>Starting Point:</strong> ${route.starting_point || 'N/A'} <br>
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

// Fetch and display routes in the admin section
function fetchAdminRoutes() {
    fetch('http://localhost:5500/bus') 
        .then(response => response.json())
        .then(data => {
            const adminRoutesContainer = document.getElementById('adminRoutesContainer');
            adminRoutesContainer.innerHTML = ''; 
            data.forEach(route => {
                    const routeItem = document.createElement('div');
                routeItem.classList.add('route-item');
                routeItem.innerHTML = `
                    <p>
                        <strong>Route Name:</strong> ${route.route_name} <br>
                        <strong>Starting Point:</strong> ${route.starting_point} <br>
                        <strong>Destination:</strong> ${route.destination} <br>
                        <strong>Description:</strong> ${route.description}
                    </p>
                    <button onclick="editRoute('${route.id}')">Edit</button>
                    <button onclick="deleteRoute('${route.id}')">Delete</button>
                `;
                adminRoutesContainer.appendChild(routeItem);
            });
        })
        .catch(error => {
            console.error('Error fetching routes for admin:', error);
        });
}
// Adding Bus
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


//deleting route
function deleteRoute(routeId) {
    fetch(`http://localhost:5500/bus/${routeId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                alert('Route deleted successfully');
                fetchAdminRoutes(); 
            } else {
                alert('Failed to delete route');
            }
        })
        .catch(error => console.error('Error deleting route:', error));
}
//editing route
function editRoute(routeId) {
    const newRouteName = prompt('Enter new Route Name:');
    const newStartingPoint = prompt('Enter new Starting Point:');
    const newDestination = prompt('Enter new Destination:');
    const newDescription = prompt('Enter new Description:');

    if (newRouteName && newStartingPoint && newDestination && newDescription) {
        fetch(`http://localhost:5500/bus/${routeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                route_name: newRouteName,
                starting_point: newStartingPoint,
                destination: newDestination,
                description: newDescription,
            }),
        })
            .then(response => {
                if (response.ok) {
                    alert('Route updated successfully');
                    fetchAdminRoutes(); // Refresh the admin routes list
                } else {
                    alert('Failed to update route');
                }
            })
            .catch(error => console.error('Error updating route:', error));
    } else {
        alert('All fields are required for editing a route.');
    }
}


    document.addEventListener('DOMContentLoaded', () => {
        showSection('home');
    });
