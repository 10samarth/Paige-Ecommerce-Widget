
# Paige Ecommerce Widget

This repository contains the code for the Paige Ecommerce Widget, a project developed as a part of the assessment test for the Full Stack Developer position at Paige. The project stack uses Angular and Express.

## Project Description

The Paige Ecommerce Widget is a web application that allows users to read, update, and delete products. The product data is loaded via a provided JSON file hosted using Express. The project consists of two main pages:

### Product List Page (/product-list)

This page includes a table of products. The table displays the following information for each product:

-   Name
-   Color
-   Type
-   Cost

Each row of the table includes two buttons:

-   Edit: This button routes the user to the Product Detail Page (/product-detail/{sku}) for the selected product.
-   Delete: This button deletes the entry for the selected product from the table.

The page also includes a filter by color and pagination that displays ten products per table page.

### Product Detail Page (/product-detail/{sku})

This page displays the product details, including its name, type, description, color, and cost. Users can edit each field and save the changes by clicking the "Update" button. The page has validation to ensure that the price is not less than 0, and the type, description, and color input fields are required and are less than 56 characters long.

## Getting Started

To get started follow these steps:

1.  Clone the repository to your local machine using `git clone`.
2.  Install Docker and run the command `docker-compose up --build` in the project's root directory.
3.  Open your browser and navigate to `http://localhost:8009/` to view the application.

Alternatively, you can also start the project without Docker by following these steps:

1.  Clone the repository to your local machine using git clone.
2.  Navigate to the backend directory and run `npm install` to install the necessary dependencies.
3.  Start the backend server by running command `node server.js`.
4.  Navigate to the frontend directory (frontend/paige-ecommerce-widget) and run `npm install` to install the required dependencies.
5.  Install the Angular CLI globally if not installed by running the command `npm install -g @angular/cli`
5.  Start the frontend server by running command `ng serve`.
6.  Open your browser and navigate to `http://localhost:4200/` to view the application.

## Author

👤 Samarth Goudar

-   Website: [https://10samarth.com](https://10samarth.com)
-   Github: [@10Samarth](https://github.com/10Samarth)
-   LinkedIn: [https://www.linkedin.com/in/samarthmg/](https://www.linkedin.com/in/samarthmg/)
