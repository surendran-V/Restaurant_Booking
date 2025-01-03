# Restaurant Table Booking System

A responsive web application for restaurant table reservations built with Next.js frontend and Node.js/Express backend.

## Features

### Booking Management
- Create, view, and cancel table reservations
- Real-time availability checking
- Date and time slot selection
- Guest count specification
- Contact information collection

### User Interface
- Responsive design optimized for both desktop and mobile
- Interactive booking form with field validation
- Clear booking confirmation display
- Intuitive time slot availability visualization

### Calendar Integration
- Visual calendar interface for date selection
- Timeline view showing available and booked slots
- Real-time slot availability updates

## Technology Stack

### Frontend
- Next.js
- React
- CSS for styling
- Responsive design principles

### Backend
- Node.js
- Express.js
- RESTful API endpoints

## Project Structure
```
C:\Work\Projects\Restaurant_Booking
├── backend/           # Express server and API endpoints
├── frontend/          # Next.js application
├── node_modules/      # Project dependencies
├── package-lock.json  # Dependency lock file
└── package.json       # Project configuration
```

## API Endpoints

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Retrieve all bookings
- `DELETE /api/bookings/:id` - Cancel a booking

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   cd backend
   npm run start
   ```

4. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

5. Access the application at `http://localhost:3000`

## Deployment

The application is deployed using:
- Frontend: Vercel
- Backend: Railway/Heroku
  Visit the live application at: (still needs to be deployed)

## Video Demo
https://drive.google.com/file/d/1QpxaJztaN0ceIjNjt6UrhowHQRIhNMCm/view?usp=sharing

