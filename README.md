# Car Inventory Management

Car Inventory Management is a MERN stack application that allows users to manage car listings, including details like brand, model, year, price, category, description, and availability. The application supports full CRUD operations for car records, including adding, updating, deleting, and retrieving car data.

## Features

- **Authentication & Authorization**:
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Secure logout mechanism
- **CRUD Operations**:
  - Create, Read, Update, and Delete car records
- **Data Validation**:
  - Validation for car details such as brand, model, year, price, and category
- **Stock Management**:
  - Automatic updates of the stock status based on quantity available
- **User-Friendly API**:
  - RESTful API endpoints with proper documentation
- **Environment Configuration**:
  - Use of `.env` file for environment-specific configurations

## Setup Instructions

Follow the steps below to set up the project locally on your machine.

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- A MongoDB instance (you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud hosting or install MongoDB locally)

### Step-by-Step Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Tasfiq-asif/car-inventory-server.git
   ```

2. **Install Dependencies**

   ```bash
   cd car-inventory-server
   npm install
   ```

3. **Create the `.env` File**

   ```env
   NODE_ENV=development
   PORT=8000
   DATABASE_URL=mongodb+srv://yourMongoDBUsername:yourMongoDBPassword@cluster0.onhj8vc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

4. **Start the Application**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

#### 1. Register User

- **Method**: `POST /api/auth/register`
- **Body**:
  ```json
  {
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "user"
  }
  ```

#### 2. Login

- **Method**: `POST /api/auth/login`
- **Body**:
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Response**: Returns JWT token for authentication

#### 3. Logout

- **Method**: `POST /api/auth/logout`
- **Headers**:
  ```
  Authorization: Bearer <your_token>
  ```

### Cars

#### 1. Create a Car

- **Method**: `POST /api/cars`
- **Auth**: Required
- **Body**:
  ```json
  {
    "brand": "Toyota",
    "model": "Camry",
    "year": 2024,
    "price": 35000,
    "category": "Sedan",
    "description": "New model with advanced features",
    "quantity": 5
  }
  ```

#### 2. Get All Cars

- **Method**: `GET /api/cars`
- **Auth**: Required

#### 3. Get Single Car

- **Method**: `GET /api/cars/:carId`
- **Auth**: Required

#### 4. Update Car

- **Method**: `PUT /api/cars/:carId`
- **Auth**: Required
- **Body**: Same as create car

#### 5. Delete Car

- **Method**: `DELETE /api/cars/:carId`
- **Auth**: Required

### Orders

#### 1. Create Order

- **Method**: `POST /api/orders`
- **Auth**: Required
- **Body**:
  ```json
  {
    "carId": "car_id_here",
    "quantity": 1,
    "email": "buyer@example.com"
  }
  ```

#### 2. Get Total Revenue

- **Method**: `GET /api/orders/revenue`
- **Auth**: Required (Admin only)

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

```

```

```

```
