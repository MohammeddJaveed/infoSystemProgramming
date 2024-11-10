


function addRoute(){
    //  Getting values from the user to add the route
    const startPoint = document.getElementById("Starting_Point").value;
    const destination = document.getElementById("destination").value;
    const routeName = document.getElementById("routeName").value;
    const description = document.getElementById("routeDescription").value;


    //  Checking all the fields are properly filled
    if(!startPoint||!destination||!routeName||!description){
        alert("Please fill all the required fields ")
    }else{

   // Creating  list  to display the route
   const routesContainer = document.getElementById("routesContainer");
   const listContainer = document.createElement("li");
   
   // Formatting the route details
   listContainer.innerHTML = `
       <strong>Route Name:</strong> ${routeName} <br>
       <strong>Starting Point:</strong> ${startPoint} <br>
       <strong>Destination:</strong> ${destination} <br>
       <strong>Description:</strong> ${description}
       <Button id ="editButton">Edit</Button>
        <Button id="deleteButton">Delete</Button><br>
    <strong>-----------------------------------------------------------------------------------------------------------</strong>
   `;
   
   // Adding the new route to the list
   routesContainer.appendChild(listContainer);

   // To Clear field
   document.getElementById("Starting_Point").value = '';
   document.getElementById("destination").value = '';
   document.getElementById("routeName").value = '';
   document.getElementById("routeDescription").value = '';
   
   console.log("Route added successfully");
    }
}