# Best Route Project

## Description

The **Best Route Project** is a web application that helps users find the most efficient routes to travel. The website provides the best route suggestions. The application uses a Node.js backend and an SQL database for efficient data storage and retrieval. This application satisfies all CRUD requirements, enabling meaningful system interaction for both administrators and users.

## Features

- **Route Suggestions**:
  - **User Input** 
   - Users can enter a starting location and destination into the system, specifying their desired travel points.
   - The system uses this input to search for the most relevant bus routes that match the provided locations.

  - **Route Recommendation**
   - Based on the data, the program evaluates the available routes and identifies the most efficient ones 
   - The system then displays these suggested routes to the user, helping them make the best decision for their travel.

- **Admin Panel**: The application offers a set of CRUD (Create, Read, Update, Delete) operations, enabling admins to maintain and update the route database.

  - **Create**: Admins can add new routes, providing essential details such as the route name, starting point, destination, and description.

    - When the form is submitted, the addBusRoute() function in JavaScript is called.
    - The addBusRoute() function gathers the form data (route name, starting point, destination, and description) and prepares it for submission.
    - A POST request is then made to the backend API endpoint /bus/add to add the new bus route.
    - The backend server handles the incoming POST request at /bus/add, where the bus route is added to the database.
    - After processing, the backend sends a response back to the UI confirming the bus route was successfully added or returning an error message if something went wrong.

  - **Update**: Admins can edit or update existing routes and descriptions if there is an inconsistency.
    - The admin clicks the "Edit" button below the bus route they want to update, triggering the editRoute() function.
    - The editRoute() function retrieves the current details of the selected bus route and populates the form with that data.
    - The editRoute() function prepares the updated data and sends a PUT request to the backend API endpoint /bus/update/:id, where :id is the bus route's unique identifier.
    - The backend server processes the PUT request at /bus/update/:id, updates the corresponding bus route in the database, and sends a response
    - The UI then receives the response and displays a success or error message.

  - **Delete**: Admins have full access to delete existing routes if required.
    - The admin clicks the "Delete" button below the bus route they want to remove.
    - This triggers the deleteRoute() function in JavaScript.
    - The deleteRoute() function sends a DELETE request to the backend API endpoint /bus/delete/:id, where :id is the unique identifier of the bus route to be deleted.
    - The backend server processes the DELETE request at /bus/delete/:id, deletes the bus route from the database, and sends a response indicating whether the deletion was successful.
    - The UI then receives the response and displays a success or error message, removing the deleted bus route from the displayed list.

  - **Read**: Admins and users can browse the existing routes.
    - When the "Routes" is clicked, the fetchRoutes() function is called.
    - The fetchRoutes() function makes a GET request to the backend API endpoint /bus/ to fetch all bus routes
    - The backend server processes the GET request at /bus/, retrieves the list of bus routes from the database, and sends it as a response.
    - The UI then receives the data and displays the list of bus routes to the admin.

## Technologies Used

### Backend

- **Node.js**: A JavaScript runtime used for building the server-side logic of the application. It runs the `index.js` file, which hosts the application.
- **Express.js**: A web framework for Node.js, providing the infrastructure for building RESTful APIs. This is used to handle HTTP requests in the application.
- **CORS (Cross-Origin Resource Sharing)**: A package that allows the application to accept requests from different origins, domains, or ports. It helps handle cross-origin requests securely.
- **SQL Database**: SQL Workbench is used to manage and interact with the MySQL database, enabling efficient query execution and database management.

### Frontend

- **HTML**: Used for structuring the web pages.
- **CSS**: Used for styling the user interface.
- **JavaScript**: Used for dynamic content.

### Testing

- **Jest**: A JavaScript testing framework, used for unit and integration tests.
- **Supertest**: An HTTP assertion library, used for testing Express routes.

### Hosting Website

- **AWS**: The website was hosted using AWS services. A MySQL database was created on AWS and connected through SQL Workbench. For application hosting, AWS App Runner was used to deploy the app. However, since App Runner is billable, the service was stopped and deleted to cut down on costs.

## Challenges Faced

- **Writing Test Cases**: Writing unit tests for database interactions and mocking these operations correctly was crucial. Ensuring proper test coverage for all endpoints and handling edge cases, such as invalid data or unauthorized access, required careful planning.

- **Hosting the Website**: There were a number of difficulties in hosting the website, especially as I had never done this before. I tried using Azure at first, but I had trouble moving the local MySQL database to the production environment. After a lot of troubleshooting, I was only able to host the static website correctly. After that, I attempted a manual integration method, but it was ineffective and unsuitable for the project's requirements. In the end, I had to look into other options to make sure the website could be hosted correctly.

## References

- **Node js** - Node.js. (2024). Node.js. Available at: https://nodejs.org/ [Accessed 29 Nov. 2024].
- **MySQL Workbench** - Oracle. (2024). MySQL Workbench. Available at: https://www.mysql.com/products/workbench/ [Accessed 2 Dec. 2024].
- **Jest** - Facebook. (2024). Jest. Available at: https://jestjs.io/ [Accessed 5 Dec. 2024].

## Installation

To install and run the project locally, follow these steps:

### Prerequisites

- **Node.js**
- **npm**
- **SQL Database**

### Steps

1. Clone the repository:
   git clone https://github.com/MohammeddJaveed/infoSystemProgramming.git
2. npm install
3. node index.js
4. Access website in browser
