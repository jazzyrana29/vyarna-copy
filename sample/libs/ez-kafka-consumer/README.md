Certainly! Here is your `README.md` file for your library "ez-kafka-consumer" in a NestJS application:

---

# ez-kafka-consumer

`ez-kafka-consumer` is a simple and easy-to-use Kafka consumer library designed for use in NestJS applications. It enables you to consume messages from a Kafka cluster with minimal configuration and effort, providing a user-friendly interface and straightforward API for working with Kafka.

## Features

- **Easy Setup and Configuration**: Integrates seamlessly with NestJS applications.
- **Consume Messages Efficiently**: Supports consuming messages from Kafka topics with minimal code.
- **Batch Message Consumption**: Offers support for consuming messages in batches for efficiency.
- **Configurable Options**: Customize offsets, error handling, and other settings according to your needs.
- **Built-in Logging**: Provides built-in logging and error reporting for better debugging and monitoring.

## Installation

To install `ez-kafka-consumer`, use the following command:

```shell
npm install ez-kafka-consumer
```

## Usage in NestJS

Here's an example of how to use the `ez-kafka-consumer` library in a NestJS application:

First, import the library and set up a Kafka consumer service:

```typescript
import { Injectable, OnModuleInit } from "@nestjs/common";
import { KafkaConsumer } from "ez-kafka-consumer";

@Injectable()
export class KafkaService implements OnModuleInit {
  private readonly consumer: KafkaConsumer;

  constructor() {
    this.consumer = new KafkaConsumer({
      bootstrapServers: "localhost:9092",
      groupId: "my-group",
      topics: ["my-topic"],
      autoOffsetReset: "earliest",
      enableAutoCommit: true,
      batchSize: 1,
    });
  }

  async onModuleInit() {
    await this.startConsuming();
  }

  async startConsuming() {
    for await (const message of this.consumer.consume()) {
      // Handle the message
      console.log(`Received message: ${message.value}`);
    }
  }

  async close() {
    await this.consumer.close();
  }
}
```

In your NestJS application module, inject the `KafkaService` to manage your Kafka consumer:

```typescript
import { Module } from "@nestjs/common";
import { KafkaService } from "./kafka.service";

@Module({
  providers: [KafkaService],
  exports: [KafkaService],
})
export class AppModule {}
```

## Configuration

The `KafkaConsumer` class can be configured with various options:

- `bootstrapServers`: A comma-separated list of Kafka broker addresses.
- `groupId`: The consumer group ID.
- `topics`: A list of topics to consume from.
- `autoOffsetReset`: The strategy to use when resetting offsets (default: 'latest').
- `enableAutoCommit`: Whether to automatically commit offsets (default: true).
- `batchSize`: The number of messages to consume in a batch (default: 1).

## Contributing

We welcome contributions to `ez-kafka-consumer`! If you encounter any issues, have suggestions, or want to add new features, please feel free to open an issue or pull request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---
