# api_bpmn_maker

API for BPMN Maker by 4Nesia

## Running the server

1. Clone the repository
2. Install the dependencies

```bash
npm install
```

3. Run the server

```bash
npm start # For production server
npm start:dev # For development server
npm start:staging # For staging server
npm run dev # For local development
```

## Building the server

There are 3 Dockerfiles for 3 different environments: production, staging, and development. You can build the server using the following commands:

### Production

```bash
docker build -t api_nagarishakti:latest -f deployment/production/Dockerfile .
```

### Staging

```bash
docker build -t api_nagarishakti:staging -f deployment/staging/Dockerfile .
```

### Development

```bash
docker build -t api_nagarishakti:dev -f deployment/development/Dockerfile .
```

## Running the server using Docker

Use the following commands to run the server using Docker:

```bash
docker run -p 9000:9000 -d api_nagarishakti:latest # For production server
docker run -p 9000:9000 -d api_nagarishakti:staging # For staging server
docker run -p 9000:9000 -d api_nagarishakti:dev # For development server
```
