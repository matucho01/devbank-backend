# DevBank Backend API

A lightweight Express.js backend service for the DevBank application, containerized with Docker and equipped with multiple CI/CD pipeline configurations.

## Overview

This is a simple Node.js Express API server that provides basic endpoints for health checks, time retrieval, and a welcome message. The application is designed to run in containerized environments with support for both Jenkins and AWS CodeBuild pipelines.

## Features

- **Health Check Endpoint** (`GET /health`) - Returns API status
- **Time Endpoint** (`GET /time`) - Returns current ISO timestamp
- **Welcome Endpoint** (`GET /`) - Returns welcome message
- **CORS Enabled** - Cross-origin requests supported
- **JSON Request Body Support** - Built-in JSON parsing
- **Containerized** - Docker support with Alpine Linux base
- **CI/CD Ready** - Jenkins and AWS CodeBuild configurations included

## Prerequisites

- **Node.js** 20.x or higher
- **npm** (comes with Node.js)
- **Docker** (for containerized execution)
- **Jenkins** (optional, for Jenkins pipeline)
- **AWS CodeBuild** (optional, for AWS CodeBuild pipeline)

## Installation

1. **Clone or download the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npm list
   ```

## Running the Application

### Local Development

```bash
npm start
```

The API will be available at `http://localhost:3000`

### Available Endpoints

- `GET /` - Welcome message
  ```json
  { "message": "Welcome to DevBank API" }
  ```

- `GET /health` - Health check
  ```json
  { "ok": true }
  ```

- `GET /time` - Current time
  ```json
  { "now": "2026-01-24T10:30:45.123Z" }
  ```

### Environment Variables

- `PORT` - Server port (default: 3000)

## Docker

### Building the Docker Image

```bash
docker build -t matucho01/devbank-backend:latest .
```

### Running the Container

```bash
docker run -p 3000:3000 matucho01/devbank-backend:latest
```

### Docker Configuration Details

- **Base Image**: `node:20-alpine` (lightweight Alpine Linux with Node.js 20)
- **Working Directory**: `/app`
- **Port**: 3000 (exposed and configurable via PORT env variable)
- **Dependencies**: Production dependencies only (`npm ci --omit=dev`)
- **Startup Command**: `npm start`

## CI/CD Pipelines

### Jenkins Pipeline

The `Jenkinsfile` defines a complete CI/CD pipeline with the following stages:

1. **Checkout** - Clones the repository
2. **Install** - Installs Node.js dependencies using `npm ci`
3. **Test** - Runs tests if configured in `package.json` scripts
4. **Docker Build** - Builds a Docker image tagged as `matucho01/devbank-backend:v${BUILD_NUMBER}`
5. **Docker Push** - Pushes the image to DockerHub
6. **Cleanup** - Logs out from Docker and cleans workspace

**Prerequisites for Jenkins**:
- Jenkins agent labeled `ec2-agent1`
- Node.js 25 configured in Jenkins tools
- Docker installed and running on the agent
- DockerHub credentials stored in Jenkins with ID `dockerhub-matucho01`

**Setup Instructions**:
```
1. In Jenkins, create a credential of type "Username with password"
2. Username: matucho01
3. Password: (if needed, to recreate this scenario, contact the dev at mailto:pcristopher593@gmail.com)
4. Credential ID: dockerhub-matucho01
```

### AWS CodeBuild

The `buildspec.yml` file configures AWS CodeBuild with the following phases:

1. **Pre-Build** - Authenticates with DockerHub
2. **Build** - Builds Docker image with commit hash as tag
3. **Post-Build** - Pushes image to DockerHub and generates `imagedefinitions.json`

**Environment Variables**:
- `IMAGE_REPO`: `matucho01/devbank-backend`
- `CONTAINER_NAME`: `backend`
- `DOCKERHUB_USERNAME`: (required in CodeBuild environment)
- `DOCKERHUB_PASSWORD`: (required in CodeBuild environment)

**Output Artifacts**:
- `imagedefinitions.json` - Image definition file for ECS/container service deployment

## Project Structure

```
devbank-backend/
├── server.js          # Main Express application
├── package.json       # Node.js dependencies and scripts
├── Dockerfile         # Docker image configuration
├── Jenkinsfile        # Jenkins CI/CD pipeline
├── buildspec.yml      # AWS CodeBuild configuration
└── README.md          # This file
```

## Technology Stack

- **Runtime**: Node.js 20 (Alpine Linux)
- **Framework**: Express.js
- **CORS**: Enabled for cross-origin requests
- **Containerization**: Docker
- **CI/CD**: Jenkins, AWS CodeBuild
- **Container Registry**: DockerHub (matucho01/devbank-backend)

## License

This project is part of the SimpliLearn Capstone Project.

## Support

For issues or questions, please refer to the project documentation or contact the development team.
