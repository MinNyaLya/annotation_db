# Annotation Database

A modern web application for managing and tracking annotations with impact assessment and financial tracking.

## Features

- Create and manage annotations with detailed information
- Track financial impact and responsible teams
- Sort and filter annotations
- JIRA ticket integration
- Responsive design for all devices

## Docker Setup

### Prerequisites

- Docker installed on your system
- Docker Compose (optional, but recommended)

### Running with Docker

1. Build the Docker image:
```bash
docker build -t annotation-db .
```

2. Run the container:
```bash
docker run -p 5173:5173 annotation-db
```

The application will be available at `http://localhost:5173`

### Using Docker Compose

1. Start the application:
```bash
docker-compose up
```

2. To stop the application:
```bash
docker-compose down
```

## Development

### Local Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- DexieJS for client-side storage
- Vite for development and building