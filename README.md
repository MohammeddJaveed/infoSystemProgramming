# Best Route Project

## Description

The **Best Route Project** is a web application that helps users find the most efficient routes to travel. The website provides the best route suggestions. The application uses a Node.js backend and an SQL database for efficient data storage and retrieval. This application satisfies all CRUD requirements, enabling meaningful system interaction for both administrators and users.

## Features

- **Route Suggestions**: By entering a starting location and destination, users can easily find the best routes. The program takes data into account and shows the most efficient routes.

- **Admin Panel**: The application offers a set of CRUD (Create, Read, Update, Delete) operations, enabling admins to maintain and update the route database.
    - **Create**: Admins can add new routes, providing essential details such as the route name, starting point, destination, and description.
    - **Update**: Admins can edit or update existing routes and descriptions if there is an inconsistency.
    - **Delete**: Admins have full access to delete existing routes if required.
    - **Read**: Admins and users can browse the existing routes.

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
   ```bash
   git clone https://github.com/MohammeddJaveed/infoSystemProgramming.git
2. npm install
3. node index.js
4. Access website in browser


