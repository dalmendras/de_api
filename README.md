# Project Name
API Documentation Project DE Challenge

## Description
This project provides comprehensive documentation for the API, detailing its endpoints, request/response formats, and usage examples.

## Owners
- David Almendras Riesco

## Roles and Descriptions
| Role       | Description                                      |
|------------|--------------------------------------------------|
| Developer  | Responsible for developing and maintaining the API. |

# API Documentation

## Overview
This document provides an overview of the API, including its endpoints, request/response formats, and usage examples.

## Base URL
- **Development:** `http://localhost:3000/api/v1`
- **Production:** `https://api.productiondomain.com/api/v1`

## Endpoints
Example for jobs

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

## Authentication
All endpoints require authentication via Basic Auth. Include the API key in the request header:
```
Authorization: Basic

Username: admin@admin.com
Password: password
```

## Error Handling
The API uses standard HTTP status codes to indicate the success or failure of a request. Common status codes include:
- `200 OK` - The request was successful.
- `400 Bad Request` - The request was invalid or cannot be served.
- `401 Unauthorized` - Authentication failed or user does not have permissions.
- `404 Not Found` - The requested resource could not be found.
- `500 Internal Server Error` - An error occurred on the server.

## Contact
For any questions or support, please contact [david.almendras.riesco@gmail.com](mailto:david.almendras.riesco@gmail.com).
