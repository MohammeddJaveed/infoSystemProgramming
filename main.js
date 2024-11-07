


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
    console.log("success")
    }
}