# EZ Business Operators Permissions

This is a NestJS microservice that integrates with Kafka for messaging and uses TypeORM for database migrations. The
service is designed to be scalable, maintainable, and easily extensible. It includes a variety of features such as
logging, configuration management, and testing utilities.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Service](#running-the-service)
  - [Running Migrations](#running-migrations)
- [Testing](#testing)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **NestJS Framework**: Utilizes NestJS for building efficient and scalable server-side applications.
- **Kafka Integration**: Supports Kafka for messaging through `ez-kafka-consumer` and `ez-kafka-producer`.
- **TypeORM Migrations**: Includes TypeORM for database management and migrations.
- **Comprehensive Logging**: Uses `ez-logger` for logging.
- **Configuration Management**: Managed via `@nestjs/config`.
- **Testing**: Includes unit and e2e testing with Jest.

## Getting Started

### Prerequisites

Ensure you have the following installed and configured:

- **Node.js** (>= 18.x)
- **NPM** or **Yarn**
- **MySQL** or another supported relational database
- **Kafka** (for messaging)
  - For Kafka configuration, refer to the [ez-kafka](https://gitlab.com/ezwaveflow/ez-kafka) for detailed
    instructions.
- **TIDB Configuration** (for messaging)
  - For TiDB configuration, refer to
    the [ez-tidb](https://gitlab.com/ezwaveflow/ez-tidb#creating-a-cluster-on-tidb-cloud) for detailed
    instructions. Replace your-database to business-operator-permissions
- **Redis** (for caching and other needs)

### Installation

1. Clone the repository:

   ```bash
   git clone https://gitlab.com/ezwaveflow/ez-operators-permissions
   cd ez-operators-permissions
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Setting Up Environment Variables

1. Create a `.env` file in the root directory by copying the `.env-example` file:

   ```bash
   cp .env-example .env
   ```

2. Open the `.env` file and add your specific configurations for the database, Kafka, and Redis connections.

3. Note: You will also need a `.pem` file for secure connections. Please contact your administrator or supervisor to
   obtain this file.

### Running the Service

To start the service in development mode:

```
npm run start:dev
```

### Running Migrations

To run database migrations:

```bash
npm run migration:run
```

To generate a new migration:

```bash
npm run migration:init
```

Note: Please build the project before running the migrations

## Testing

Run unit tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Scripts

- **build**: Compile the project
- **format**: Format code using Prettier
- **start**: Start the NestJS application
- **start:dev**: Start in development mode with file watching
- **start:debug**: Start in debug mode
- **start:prod**: Start in production mode
- **lint**: Run ESLint with auto-fix
- **test**: Run unit tests
- **test:watch**: Run unit tests in watch mode
- **test:cov**: Run tests and generate coverage report
- **test:debug**: Debug tests
- **test:e2e**: Run end-to-end tests
- **migration:run**: Run TypeORM migrations
- **migration:init**: Generate a new TypeORM migration

## Technologies Used

- **NestJS**: Framework for building scalable server-side applications
- **TypeORM**: ORM for database management
- **KafkaJS**: Kafka client for Node.js
- **MySQL2**: MySQL client for Node.js
- **Redis**: In-memory data structure store
- **Jest**: Testing framework

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or new features.

## License

This project is licensed under the [UNLICENSED License]().
