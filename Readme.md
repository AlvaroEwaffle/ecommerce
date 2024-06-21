# E-Commerce Application

This is a full-stack e-commerce application that includes a Vite + React + Material UI front-end and a NestJS back-end. The application features user authentication, product management, a shopping cart, and a ticketing system.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Product management (CRUD operations)
- Shopping cart functionality
- Ticketing system for purchases
- Responsive design with Material UI
- Lazy loading and infinite scrolling for product lists

## Tech Stack

### Front-End

- **Vite**
- **React**
- **Material UI**
- **Axios**

### Back-End

- **NestJS**
- **Mongoose** (MongoDB ORM)
- **Passport** (Authentication)
- **JWT** (JSON Web Tokens)

## Architecture

The project is structured into two main parts:

1. **Client**: The front-end application built with Vite, React, and Material UI.
2. **Back-End**: The server-side application built with NestJS, handling APIs, authentication, and business logic.

## Installation

### Prerequisites

- Node.js
- npm (or yarn)
- MongoDB

### Steps

1. **Clone the repository**:

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
Configure environment variables:

Create a .env file in the server directory with the necessary environment variables.

Usage
Start the server:
cd server
npm run start:dev

Start the client:
cd ../client
npm run dev

Open your browser and navigate to http://localhost:5173 to see the application running.