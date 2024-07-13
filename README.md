# Task management using NestJS
- **Backend**: NestJS
- **Frontend**: ReactJS & Tailwindcss
- **Security**: Password hashing
- **Authentication & Authorization**: JWT
- **Backend port**: 5000
- **Frontend port**: 3000
- **Database port**: 5432
- **Database**: PostgreSQL hosted on a Docker container
- **Database Relations**:

<div align="center">
  <img src="assets/erd.PNG" alt="ERD Diagram" />
</div>

## Constrains:
- **User**:
  - **Username**: must contain alphanumeric characters only.
  - **Password**: Minimum length is 6 chracters and must contain at least 1 symbol, 1 uppercase, 1 lowercase, and 1 number.
  - **Email**: Must be a valid email.
  - **userGroup**: Regular by default.

## User Groups:
| id | name   |
|----|--------|
| 1  | admin  |
| 2  | regular|

## Endpoints:
| Method | Endpoint       | Description                                      |
|--------|----------------|--------------------------------------------------|
| POST   | /login         | Logs in user                                     |
| POST   | /register      | Creates new account                              |
| GET    | /user          | Retrieves username only for frontend             |
| GET    | /profile       | Retrieves profile data                           |
| GET    | /tasks         | Retrieves tasks associated with user             |
| POST   | /tasks/assign  | Creates a task. Must be admin to assign tasks.   |

## Endpoint tests:
Note: account details in the response are there for debugging purposes.
## Registration
Endpoint: http://localhost:5000/register  
Method: POST
- **Registration failure test:**
```
{
  "username": "te st",
  "email": "test",
  "password": "test"
}
```
- **Response:**
```
{
    "message": [
        "Username must contain only alphanumeric characters",
        "Email must be a valid email address",
        "Password too weak. It must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character."
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```
___

- **Registration success test:**
```
{
    "username": "admin",
    "email": "admin@admin.com",
    "password": "AdminPassword123$",
    "userGroupId": "1"
}

```

- **Response:**
```
{
    "user": {
        "username": "admin",
        "email": "admin@admin.com",
        "password": "$2b$10$eNS68.fDNZz2T4/nZjfQ.uwFLkfc4iGPWQRkLAJNlinH76UidRJCa",
        "userGroup": {
            "id": 1,
            "name": "admin"
        },
        "id": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJpYXQiOjE3MjA3OTY2NjIsImV4cCI6MTcyMTA1NTg2Mn0.CSvrh8Wo9rZRpXm-JeKUTSS41k8v5ueQ-oKI3qTDnkk"
}
```
## Login
Endpoint: http://localhost:5000/login  
Method: POST
- **Login failure test:**
```
{
    "email": "doesntexist@doesntexist.com",
    "password": "123123"
}
```
- **Response:**
```
{
    "statusCode": 401,
    "timestamp": "2024-07-12T15:10:44.011Z",
    "path": "/login",
    "message": {
        "message": "Invalid email of password",
        "error": "Unauthorized",
        "statusCode": 401
    }
}
```
___

- **Login success test:**
```
{
    "email": "admin@admin.com",
    "password": "AdminPassword123$"
}
```

- **Response:**
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJpYXQiOjE3MjA3OTczMTAsImV4cCI6MTcyMTA1NjUxMH0.TqDE5nmhOPZ_EsohxCrHC8HlftE8CTnhwp54_qquSPU"
}
```

## Profile
Endpoint: http://localhost:5000/profile  
Method: GET
- **Profile failure test:**
```
{
    "Authorization": {
      "Bearer ${invalid token}"
    }
}
```
- **Response:**
```
{
    "statusCode": 401,
    "timestamp": "2024-07-13T16:11:11.435Z",
    "path": "/profile",
    "message": {
        "message": "Unauthorized",
        "statusCode": 401
    }
}
```
___

- **Profile success test:**
```
{
    "Authorization": {
      "Bearer ${valid token}"
    }
}
```

- **Response:**
```
{
    "id": 2,
    "username": "huthaifa",
    "email": "huthaifa@gmail.com",
    "password": "$2b$10$in.cRgH1y.MwHwOmR.NYLeqN0/RbXMwF35zntlNhALLWHSb5zLT3K"
}
```

## (GET) /Tasks
Endpoint: http://localhost:5000/tasks
Method: GET
- **Tasks failure test:**
```
{
    "Authorization": {
      "Bearer ${invalid token}"
    }
}
```
- **Response:**
```
{
    "statusCode": 401,
    "timestamp": "2024-07-13T16:13:21.370Z",
    "path": "/tasks",
    "message": {
        "message": "Unauthorized",
        "statusCode": 401
    }
}
```
___

- **Tasks success test:**
```
{
    "Authorization": {
      "Bearer ${valid token}"
    }
}
```

- **Response:**
```
[
    {
        "id": 2,
        "title": "Did you finish the task management assignement",
        "description": "Finish it.",
        "status": "pending",
        "assignedBy": {
            "id": 1,
            "username": "admin",
            "email": "admin@admin.com",
            "password": "$2b$10$eNS68.fDNZz2T4/nZjfQ.uwFLkfc4iGPWQRkLAJNlinH76UidRJCa"
        },
        "assignedTo": {
            "id": 2,
            "username": "huthaifa",
            "email": "huthaifa@gmail.com",
            "password": "$2b$10$in.cRgH1y.MwHwOmR.NYLeqN0/RbXMwF35zntlNhALLWHSb5zLT3K"
        }
    }
]
```

## (POST) /Tasks/assign
Endpoint: http://localhost:5000/tasks/assign
Method: POST  
Requirement: Must be in user group "Admin"
- **Assign task failure test:**
```
{
    "Authorization": {
      "Bearer ${invalid admin token}"
    },
    "title": "Finish the task management assignement",
    "description": "Finish it.",
    "assignedToUserId": 2
}
```
- **Response:**
```
{
    "statusCode": 401,
    "timestamp": "2024-07-13T16:16:26.492Z",
    "path": "/tasks/assign",
    "message": {
        "message": "Unauthorized",
        "statusCode": 401
    }
}
```
___

- **Assign tasks success test:**
```
{
    "Authorization": {
      "Bearer ${valid admin token}"
    },
    "title": "Finish the task management assignement",
    "description": "Finish it.",
    "assignedToUserId": 2
}
```

- **Response:**
```
{
    "title": "Did you finish the task management assignement",
    "description": "Finish it.",
    "status": "pending",
    "assignedBy": {
        "id": 1,
        "username": "admin",
        "email": "admin@admin.com",
        "password": "$2b$10$eNS68.fDNZz2T4/nZjfQ.uwFLkfc4iGPWQRkLAJNlinH76UidRJCa",
        "userGroup": {
            "id": 1,
            "name": "admin"
        }
    },
    "assignedTo": {
        "id": 2,
        "username": "huthaifa",
        "email": "huthaifa@gmail.com",
        "password": "$2b$10$in.cRgH1y.MwHwOmR.NYLeqN0/RbXMwF35zntlNhALLWHSb5zLT3K"
    },
    "id": 2
}
```
## Installation (Untested yet)
1. Clone the repository:
```
git clone https://github.com/5ukui/huthaifa-assignment.git
```  
2. Change directory into backend:
```
cd huthaifa-assignment\backend
```  
3. Create a .env file:
```
#  Database
DB_DATABASE = postgres
DB_HOST = localhost
DB_PORT = 5432
DB_USERNAME = ADD YOUR USERNAME
DB_PASSWORD = ADD YOUR PASSWORD

# JSON Web Token
JWT_EXPIRE = 3d
JWT_SECRET = ADD YOU JWT SECRET

# Frontend
FRONTEND_URL = http://localhost:3000
```
4. Run PostgreSQL using docker container: (Ensure that docker is installed)
```
docker compose up --build --detach
```
5. Install backend dependencies:
```
npm install
```
6. Run the migrations:
```
npm run migration:run
```
8. Run the server:
```
npm run start:dev
```
### For the frontend
1. Change directory into frontend:
```
cd huthaifa-assignment\frontend
```
2. Install the dependencies:
```
npm install
```
3. Run the server:
```
npm run start
```