# Project Name
API Documentation Project DE Challenge

## Description
This project provides comprehensive documentation for the API, detailing its endpoints, request/response formats, and usage examples.

# Summary

As requested, the following requirements are implemented:

Section 1: Implementation of a REST API for CSV upload and consumption of three tables with GET, POST, PUT, and DELETE methods. A validation is implemented to prevent uploads exceeding 1,000 records. Additionally, an extra endpoint is created to allow bulk uploads of more than 1,000 records specifically for the hired table.

Section 2: Two reporting endpoints are implemented to generate the requested statistics. See below example:

GET: {{url_base}}/reports/employee_department?year=2021

GET: {{url_base}}/reports/employee_quarter?year=2021

Bonus: The API is deployed on AWS, application is containerized using Docker and Postman file test.

# API Documentation

## Overview
This document provides an overview of the API, including its endpoints, request/response formats, and usage examples.

## Base URL
- **Development:** `http://localhost:3000/api/v1`
- **Production:** `http://44.245.154.51:3000/api/v1`


## List of Endpoints

**jobs:**

GET: {{url_base}}/jobs
GET: {{url_base}}/jobs/1
POST: {{url_base}}/jobs
POST: {{url_base}}/jobs/upload
PUT: {{url_base}}/jobs/1
DEL: {{url_base}}/jobs/1

**departments:**

GET: {{url_base}}/departments
GET: {{url_base}}/departments/:id
POST: {{url_base}}/departments
POST: {{url_base}}/departments/upload
PUT: {{url_base}}/departments/:id
DEL: {{url_base}}/departments/:id

**hired_employees:**

GET: {{url_base}}/hired_employees
GET: {{url_base}}/hired_employees/:id
POST: {{url_base}}/hired_employees
POST: {{url_base}}/hired_employees/upload
POST: {{url_base}}/hired_employees/upload_bigfile
PUT: {{url_base}}/hired_employees/:id
DEL: {{url_base}}/hired_employees/:id

**reports:**
GET: {{url_base}}/reports/employee_department?year=2021
GET: {{url_base}}/reports/employee_quarter?year=2021


## Authentication
All endpoints require authentication via Basic Auth. Include the API Basic Authorization:
```
Authorization: Basic

Username: admin@admin.com
Password: password
```

Endpoints were tested with Postman. If you want to load endpoint with Postman App, you can use json file
available in this link:

## Endpoints Example
Example for JOBS

### 1. Get All Items
- **URL:** `/jobs`
- **Method:** `GET`
- **Description:** Retrieves a list of all jobs.
- **Response:**
    ```json
    [
        {
            "id": 1,
            "job": "Secretary"
        }
    ]
    ```

### 2. Get Item by ID
- **URL:** `/jobs/1`
- **Method:** `GET`
- **Description:** Retrieves a single job by its ID.
- **Response:**
    ```json
    {
        "id": 1,
        "job": "Secretary"
    }
    ```

### 3. Create Item
- **URL:** `/jobs`
- **Method:** `POST`
- **Description:** Creates a new job.
- **Request:**
    ```json
    {
        "id": 1,
        "job": "Secretary"
    }
    ```
- **Response:**
    ```json
    {
        "id": 1,
        "job": "Secretary"
    }
    ```

### 4. Update Item
- **URL:** `/jobs/1`
- **Method:** `PUT`
- **Description:** Updates an existing job by its ID.
- **Request:**
    ```json
    {
        "job": "Secretary 1"
    }
    ```
- **Response:**
    ```json
    {
        "id": 1,
        "job": "Secretary 1"
    }
    ```

### 5. Delete Item
- **URL:** `/jobs/1`
- **Method:** `DELETE`
- **Description:** Deletes an job by its ID.
- **Response:**
    ```json
    {
        "success": true,
        "message": "Deleted"
    }
    ```

## Error Handling
The API uses standard HTTP status codes to indicate the success or failure of a request. Common status codes include:
- `200 OK` - The request was successful.
- `400 Bad Request` - The request was invalid or cannot be served.
- `401 Unauthorized` - Authentication failed or user does not have permissions.
- `404 Not Found` - The requested resource could not be found.
- `500 Internal Server Error` - An error occurred on the server.

## Owners
- David Almendras Riesco

## Roles and Descriptions
| Role       | Description                                      |
|------------|--------------------------------------------------|
| Developer  | Responsible for developing and maintaining the API. |

## Contact
For any questions or support, please contact [david.almendras.riesco@gmail.com](mailto:david.almendras.riesco@gmail.com).
