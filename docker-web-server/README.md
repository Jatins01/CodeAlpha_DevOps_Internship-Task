# NoteSphere - Dockerized Notes Management System

A multi-container Notes Management System built using React, Flask, MySQL, Nginx, and Docker Compose.

The project demonstrates Docker containerization, service communication, reverse proxy configuration, persistent storage, and multi-container deployment. It was developed as part of a DevOps learning project to gain hands-on experience with Docker and container orchestration.

---

## Tech Stack

### Frontend

* React
* Vite
* Axios
* Tailwind CSS

### Backend

* Flask
* SQLAlchemy
* Flask-CORS

### Database

* MySQL 8

### Infrastructure

* Docker
* Docker Compose
* Nginx

---

## Architecture

```text
Browser
   │
   ▼
Nginx Reverse Proxy
   │
   ├── Frontend (React)
   │
   └── Backend (Flask API)
               │
               ▼
            MySQL
```

---

## Features

* Create Notes
* View Notes
* Delete Notes
* Search Notes
* REST API Integration
* Reverse Proxy Routing
* Persistent Database Storage
* Dockerized Deployment

---

## Project Structure

```text
.
├── frontend/
├── backend/
├── nginx/
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Docker Concepts Demonstrated

### Multi-Container Architecture

The application is divided into separate containers:

* Frontend
* Backend
* Database
* Reverse Proxy

Each service runs independently while communicating through Docker networking.

### Docker Networking

All containers are attached to a custom Docker bridge network.

Services communicate using Docker DNS:

```text
backend → mysql
nginx → frontend
nginx → backend
```

No hardcoded IP addresses are required.

### Persistent Storage

A named Docker volume is used for MySQL data.

```text
mysql_data
```

This ensures notes remain available even after containers are stopped or recreated.

### Reverse Proxy

Nginx acts as the entry point for all requests.

Routes:

```text
/      → Frontend
/api   → Backend API
```

This provides a clean architecture and simplifies client-server communication.

### Environment Variables

Application configuration is managed through environment variables instead of hardcoded credentials.

Examples:

```env
MYSQL_DATABASE=database
MYSQL_USER=mysql_user
MYSQL_PASSWORD=pass
```

---

## Getting Started

### Clone Repository

```bash
git clone <repository-url>
cd NoteSphere
```

### Configure Environment Variables

Create a .env file:

```env
MYSQL_ROOT_PASSWORD=root_pass
MYSQL_DATABASE=database
MYSQL_USER=user
MYSQL_PASSWORD=pass
```

### Build and Start Containers

```bash
docker compose up --build
```

### Access Application

```text
http://localhost
```

---

## Useful Docker Commands

### Running Containers

```bash
docker ps
```

### View Logs

```bash
docker compose logs

docker compose logs backend

docker compose logs mysql
```

### List Networks

```bash
docker network ls
```

### Inspect Network

```bash
docker network inspect notes-net
```

### List Volumes

```bash
docker volume ls
```

### Stop Application

```bash
docker compose down
```

### Remove Containers and Volumes

```bash
docker compose down -v
```

---

## Data Persistence Test

1. Start the application.
2. Create a few notes.
3. Stop all containers.

```bash
docker compose down
```

4. Start the application again.

```bash
docker compose up -d
```

5. Verify that previously created notes still exist.

This confirms that MySQL data is being stored in a persistent Docker volume.

---

## Learning Outcomes

Through this project I gained practical experience with:

* Docker Images
* Docker Containers
* Docker Compose
* Container Networking
* Docker Volumes
* Reverse Proxy Configuration
* Environment Variables
* Multi-Container Application Deployment
* Container Monitoring and Troubleshooting

---

## Future Improvements

* User Authentication
* Note Editing Functionality
* API Rate Limiting
* HTTPS Configuration
* CI/CD Pipeline Integration
* Cloud Deployment

---

## Author

Jatin Solanki

DevOps Enthusiast | Docker | Linux | AWS | CI/CD
