# Car Inventory Management

Car Inventory Management is a MERN stack application that allows users to manage car listings, including details like brand, model, year, price, category, description, and availability. The application supports full CRUD operations for car records, including adding, updating, deleting, and retrieving car data.

## Features

- **CRUD Operations**:
  - Create, Read, Update, and Delete car records.
- **Data Validation**:

  - Validation for car details such as brand, model, year, price, and category.

- **Stock Management**:

  - Automatic updates of the stock status based on quantity available.

- **User-Friendly API**:

  - Simple API endpoints to manage car listings.

- **Environment Configuration**:
  - Use of `.env` file for environment-specific configurations like database connection.

## Setup Instructions

Follow the steps below to set up the project locally on your machine.

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- A MongoDB instance (you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud hosting or install MongoDB locally).

### Step-by-Step Setup

1. **Clone the Repository**  
   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/Tasfiq-asif/car-inventory-server.git
   ```

## Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
cd car-inventory-management
npm install
```

## Create the `.env` File

Create a `.env` file in the root directory and add your environment variables:

```env
NODE_ENV=development
PORT=8000
DATABASE_URL=mongodb+srv://yourMongoDBUsername:yourMongoDBPassword@cluster0.onhj8vc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

Replace yourMongoDBUsername and yourMongoDBPassword with your MongoDB credentials.

## Start the Application

Once the dependencies are installed and the `.env` file is configured, start the server:

```bash
npm start
```

This will start the server in port 8000

## API Endpoints

### 1. Create a Car

- **Method**: `POST /api/cars`

### 2. Get All Cars

- **Method**: `GET /api/cars`

### 3. Get a Single Car by ID

- **Method**: `GET /api/cars/:carId`
- **Example Request**: `/api/cars/674ccfe0b26bae7af9f6d08e`

### 4. Update a Car

- **Method**: `PUT /api/cars/:carId`

### 5. Delete a Car

- **Method**: `DELETE /api/cars/:carId`

### 6. Create an Order

- **Method**: `POST /api/orders`

### 7. Get Total Revenue

- **Method**: `POST /api/orders/revenue`

```

```

```

```
