# 🚀 Java Gradle CI/CD Pipeline using Jenkins

A simple **Student Management System** built in **Java** using **Gradle**, automated with **Jenkins Pipeline**, tested using **JUnit**, and containerized using **Docker**.

This project demonstrates the implementation of a complete Continuous Integration (CI) workflow where every code change is automatically built, tested, and packaged into a Docker image.

---

## 📌 Features

- Add Student
- View Students
- Search Student by ID
- Delete Student
- Display Total Students
- Calculate Average Marks
- Show Topper
- Input Validation
- Unit Testing using JUnit
- Docker Containerization
- Automated Jenkins Pipeline

---

## 🛠 Tech Stack

- Java 21
- Gradle 9.6
- Jenkins
- JUnit 5
- Docker
- Git & GitHub

---

# 📂 Project Structure

```
java-gradle-app
│
├── app
│   ├── src
│   │   ├── main
│   │   │   └── java
│   │   │       └── org/example
│   │   │           ├── App.java
│   │   │           ├── Student.java
│   │   │           └── StudentService.java
│   │   │
│   │   └── test
│   │       └── java
│   │           └── org/example
│   │               └── StudentServiceTest.java
│   │
│   └── build.gradle
│
├── Dockerfile
├── Jenkinsfile
├── gradlew
├── gradlew.bat
├── settings.gradle
└── README.md
```

---

# ⚙️ Jenkins Pipeline

The Jenkins pipeline consists of the following stages:

```
GitHub Repository
        │
        ▼
Checkout Source Code
        │
        ▼
Gradle Build
        │
        ▼
JUnit Tests
        │
        ▼
Docker Image Build
        │
        ▼
Pipeline Success
```

---

# 🐳 Docker

Build Docker Image

```bash
docker build -t java-gradle-app .
```

Run Container

```bash
docker run -it java-gradle-app
```

---

# ▶️ Run Project Locally

Clone Repository

```bash
git clone https://github.com/Jatins01/CodeAlpha_DevOps_Internship-Task.git
```

Navigate

```bash
cd java-gradle-app
```

Run Application

```bash
gradlew.bat run
```

---

# 🧪 Run Tests

```bash
gradlew.bat test
```

---

# 🔨 Build Project

```bash
gradlew.bat clean build
```

---

# ⚙ Jenkinsfile Stages

The Jenkins pipeline performs the following tasks automatically:

- Checkout Source Code
- Build Java Project
- Execute JUnit Tests
- Build Docker Image
- Display Pipeline Status

---

# 📸 Project Output

### Student Management System

- Add Student
- View Student
- Search Student
- Delete Student
- Show Total Students
- Calculate Average Marks
- Display Topper

---

### Jenkins Pipeline

✔ Checkout Repository

✔ Gradle Build

✔ JUnit Testing

✔ Docker Build

✔ Pipeline Success

---

# 🎯 Learning Outcomes

During this project I learned:

- Java application development
- Gradle build automation
- Unit testing using JUnit
- Jenkins Pipeline creation
- Docker image creation
- Continuous Integration (CI)
- GitHub integration with Jenkins

---

# 👨‍💻 Author

**Jatin Solanki**

GitHub:
https://github.com/Jatins01

---

# ⭐ Internship Task

This project was developed as part of a **CodeAlpha DevOps Internship** to demonstrate:

- Java Application using Gradle
- Jenkins CI/CD Pipeline
- Docker Integration