# Event Management API

## Student Information
Name: Jasmine  
Student Number: 0404057  

## Project Description
This project is a backend Event Management API built using Node.js, Express, and TypeScript.  
It allows users to create, view, update, and delete events.

The project uses Firebase Firestore as the database and Joi for request validation.

## Technologies Used
- Node.js
- Express.js
- TypeScript
- Firebase Firestore
- Joi Validation
- Postman for API testing

## Features
The API supports the following operations:
- Create an event
- Get all events
- Get event by ID
- Update event
- Delete event

Validation is used to make sure correct data is sent when creating events.

## How to Run the Project

Install dependencies:

npm install

Start the server:

npm run dev

The server will run at:

http://localhost:3000

## API Endpoints

Create Event  
POST /api/v1/events

Get All Events  
GET /api/v1/events

Get Event By ID  
GET /api/v1/events/:id

Update Event  
PUT /api/v1/events/:id

Delete Event  
DELETE /api/v1/events/:id

## Testing
All API endpoints were tested using Postman.

## Conclusion
This project demonstrates how to build a REST API using Node.js, Express, TypeScript, and Firebase with validation and CRUD operations.