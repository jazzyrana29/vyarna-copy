# ez-kafka-producer

`ez-kafka-producer` is a simple and easy-to-use Kafka producer library designed for use in NestJS applications. It enables you to produce messages to a Kafka cluster with minimal configuration and effort, providing a user-friendly interface and straightforward API for working with Kafka.

## Features

- **Easy Setup and Configuration**: Integrates seamlessly with NestJS applications.
- **Produce Messages Efficiently**: Supports sending messages to Kafka topics with minimal code.
- **Configurable Settings**: Customize brokers, topics, and other options according to your needs.
- **Built-in Error Handling**: Provides built-in error handling and logging for better debugging and monitoring.

## Installation

To install `ez-kafka-producer`, use the following command:

```shell
npm install ez-kafka-producer
```

## Usage in NestJS

Here's an example of how to use the `ez-kafka-producer` library in a NestJS application:

First, import the library and set up a Kafka producer service:

```typescript
import { EzKafkaProducerService } from 'ez-kafka-producer';
import { Logger } from '@nestjs/common';

const topic = 'my-topic';
const broker = 'localhost:9092';

const producerService = new EzKafkaProducerService(topic, broker);

async function run() {
  // Connect to the Kafka producer
  await producerService.connect();

  // Create a message to send
  const message = {
    key: 'key1',
    value: Buffer.from('Hello Kafka'),
  };

  // Send the message to the specified topic
  await producerService.produce(message);

  // Disconnect the producer
  await producerService.disconnect();
}

run().catch((err) => {
  const logger = new Logger('Main');
  logger.error('Error running producer:', err);
});
```

## Configuration

The `EzKafkaProducerService` class can be configured with various options:

- `topic`: The Kafka topic to produce messages to.
- `broker`: The Kafka broker address.
- `message`: A message object that contains the key and value of the message to send.

## Contributing

We welcome contributions to `ez-kafka-producer`! If you encounter any issues, have suggestions, or want to add new features, please feel free to open an issue or pull request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---