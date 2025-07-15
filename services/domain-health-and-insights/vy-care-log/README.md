# vy-care-log

`vy-care-log` is a NestJS microservice for storing and retrieving baby care events.  
It receives commands over Kafka topics and persists data to a MySQL/TiDB database
using TypeORM.

The service currently handles four types of events:

- **DiaperChange** – wet or soiled diaper logs
- **MedicationAdministration** – medicines given and their dosages
- **TemperatureMeasurement** – body temperature readings
- **SymptomReport** – recorded symptoms and severity

A matching `ztracking_*` table exists for each entity to keep historical versions
of the records.

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Create a `.env` file from `.env-example` and set the Kafka and TiDB options.

3. Run the database migrations

   ```bash
   npm run migration:run
   ```

4. Start the service in development mode

   ```bash
   npm run start:dev
   ```

The service connects to the broker defined in `KAFKA_BROKER` and consumes
messages using the `KAFKA_GROUP` name.  Topics exported by `ez-utils` such as
`KT_CREATE_DIAPER_CHANGE` and `KT_GET_TEMPERATURE_MEASUREMENTS` are supported.

## Scripts

- `npm run build` – compile the project
- `npm run migration:run` – apply pending migrations
- `npm run start:dev` – start the microservice with live reload
- `npm run test` – run Jest tests

## Technologies Used

- **NestJS** framework
- **KafkaJS** for messaging
- **TypeORM** with TiDB/MySQL
- **ez-logger** for structured logging
