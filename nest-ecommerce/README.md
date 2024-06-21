# NestJS Project

This project is a backend application built using NestJS. It includes authentication, products, carts, and tickets modules. It also implements Winston for logging with different configurations for development and production environments.

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Set up your environment variables in a `.env` file
4. Run `npm run start` to start the application

## Environment Variables

Create a `.env` file in the root directory and set the following variables:

MONGO_URI=mongodb://localhost/nest
JWT_SECRET=your_jwt_secret
NODE_ENV=development


## Endpoints

### Authentication

- **POST /auth/register** - Register a new user
  - Request Body: `{ "username": "string", "password": "string" }`
- **POST /auth/login** - Login and receive a JWT token
  - Request Body: `{ "username": "string", "password": "string" }`

### Products

- **POST /products** - Create a new product
  - Request Body: `{ "title": "string", "description": "string", "code": "string", "price": "number", "status": "boolean", "stock": "number", "thumbnails": ["string"] }`
- **GET /products** - Get all products
- **GET /products/:id** - Get a product by ID
- **PUT /products/:id** - Update a product by ID
  - Request Body: `{ "title": "string", "description": "string", "code": "string", "price": "number", "status": "boolean", "stock": "number", "thumbnails": ["string"] }`
- **DELETE /products/:id** - Delete a product by ID

### Carts

- **GET /carts** - Get all carts
- **GET /carts/:id** - Get a cart by ID
- **POST /carts** - Create a new cart
- **POST /carts/:cartId/products/:productId** - Add a product to the cart
  - Request Body: `{ "quantity": "number" }`
- **DELETE /carts/:id** - Delete a cart by ID

### Tickets

- **POST /carts/purchase** - Create a purchase ticket for the user’s cart
  - Requires authentication
  - Request Body: None

### Logger Test

- **GET /loggerTest** - Test the logging functionality by generating logs of different levels

## Logging

This project uses Winston for logging with different configurations for development and production environments. 

### Development

- Logs all levels from `debug` to `fatal` to the console

### Production

- Logs levels from `info` to `fatal` to the console
- Logs levels from `error` to `fatal` to a file named `errors.log`

## Error Handling

Custom error handling middleware is implemented to provide consistent error responses and logging.

## Running the Project

1. Run `npm run start` for development
2. Run `npm run build` and then `npm run start:prod` for production

## Testing

To test the endpoints, you can use tools like Postman or Insomnia. Here's some sample product data you can use to test the `/products` endpoints:

```json
{
  "title": "Sample Product",
  "description": "This is a sample product.",
  "code": "ABC123",
  "price": 100,
  "status": true,
  "stock": 50,
  "thumbnails": ["http://example.com/image1.jpg"]
}


This project is licensed under the MIT License. (?)