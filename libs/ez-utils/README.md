# ez-utils

`ez-utils` is a utility library providing various helper functions and constants for common tasks in
JavaScript/TypeScript projects. It includes utilities for encoding/decoding Kafka messages, generating trace IDs, and
more.

## Installation

To install `ez-utils`, use npm or yarn:

```bash
npm install ez-utils
```

or

```bash
yarn add ez-utils
```

## Usage

Here's an overview of the utilities available in this package:

### Kafka Message Utilities

#### `decodeKafkaMessage`

Decodes a Kafka message by parsing the JSON value.

```typescript
import {decodeKafkaMessage} from 'ez-utils';

const message = {key: 'exampleKey', value: {"traceId": "string", "example": "data"}};
const decodedMessage = decodeKafkaMessage(message);
console.log(decodedMessage); // Output: { "traceId": "string", "example": "data"} }
```

#### `encodeKafkaMessage`

Encodes an object into a Kafka message format, generating a unique key for the message.

```typescript
import {encodeKafkaMessage} from 'ez-utils';

const className = 'ExampleClass';
const value = {example: 'data'};
const encodedMessage = encodeKafkaMessage(className, value);
console.log(encodedMessage);
// Output: { key: 'ExampleClass-1623676950031-0.123456789', value: '{"example":"data"}' }
```

#### `generateKafkaSuccessResponseMessage`

Generates a Kafka success response message containing a class name, message, and trace ID.

```typescript
import {generateKafkaSuccessResponseMessage} from 'ez-utils';

const className = 'ExampleClass';
const message = {example: 'data'};
const traceId = 'exampleProfile-1623676950031-0.123456789';
const successResponseMessage = generateKafkaSuccessResponseMessage(className, message, traceId);
console.log(successResponseMessage);
// Output: { key: 'ExampleClass-1623676950031-0.123456789', value: '{"message":{"example":"data"},"traceId":"exampleProfile-1623676950031-0.123456789"}' }
```

#### `generateKafkaErrorResponseMessage`

Generates a Kafka error response message containing a class name, error, and trace ID.

```typescript
import {generateKafkaErrorResponseMessage} from 'ez-utils';

const className = 'ExampleClass';
const error = {errorCode: 500, errorMessage: 'Internal Server Error'};
const traceId = 'exampleProfile-1623676950031-0.123456789';
const errorResponseMessage = generateKafkaErrorResponseMessage(className, error, traceId);
console.log(errorResponseMessage);
// Output: { key: 'ExampleClass-1623676950031-0.123456789', value: '{"error":{"errorCode":500,"errorMessage":"Internal Server Error"},"traceId":"exampleProfile-1623676950031-0.123456789"}' }
```

### Trace ID Generator

#### `generateTraceId`

Generates a unique trace ID based on a given profile and the current timestamp.

```typescript
import {generateTraceId} from 'ez-utils';

const profile = 'exampleProfile';
const traceId = generateTraceId(profile);
console.log(traceId); // Output: exampleProfile-1623676950031-0.123456789
```

## License

This project is licensed under the MIT License. See the [LICENSE]() file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Git Workflow Rules

1. **Commit, Pull, Push (CPP):**
    - **Commit**: Ensure that your local changes are committed with meaningful commit messages.
    - **Pull**: Always pull the latest changes from the main branch before starting new work to avoid conflicts.
    - **Push**: Push your changes to the remote branch regularly to keep your work backed up and visible to the team.

   **Note**: Follow this sequence:
    - First, commit your code.
    - Then, pull from the main branch to integrate the latest changes.
    - Resolve any conflicts if they arise.
    - Finally, push your code to the remote branch.

   Regularly following this sequence helps avoid conflicts and keeps your work synchronized with the team.

2. **Branch Naming Conventions:**
    - **Module-Specific Branches**: For each module you are working on, create a new branch with a clear name following
      the pattern `<module-name>`. This ensures that the branch is dedicated to the module being worked on.
    - **Feature/Issue Branches**: If working on specific features or issues within a module, use branches named
      like `<module-name>/feature-<description>` or `<module-name>/issue-<description>`.

3. **Branch Scope:**
    - **Module Isolation**: Each branch should be focused on its respective module. Do not include changes related to
      other modules in the same branch to simplify code reviews and merge conflicts.

4. **Commit Messages:**
    - **Descriptive Messages**: Write clear, concise, and descriptive commit messages that explain the purpose of the
      changes. Follow the format `type(scope): description`, where `type` could be `feat`, `fix`, `docs`, etc.
    - **Imperative Mood**: Use the imperative mood for commit messages, e.g., "Add login feature" instead of "Added
      login feature."

5. **Pull Requests (PRs):**
    - **Create PRs for Merges**: Before merging any changes into the main branch, create a pull request (PR) and have it
      reviewed by at least one other team member.
    - **Review Process**: Ensure that PRs are reviewed thoroughly for code quality, adherence to coding standards, and
      potential issues before merging.
    - **Resolve Conflicts**: Address any merge conflicts in the branch before merging it into the main branch.

6. **Testing:**
    - **Run Tests**: Ensure that all tests pass before pushing changes and creating a PR. This includes unit tests,
      integration tests, and any other relevant testing.

7. **Code Style and Linting:**
    - **Consistent Style**: Follow the project's coding style guidelines and use linters to ensure code quality and
      consistency.

8. **Sensitive Information:**
    - **Avoid Sensitive Data**: Do not include sensitive information such as passwords, API keys, or other confidential
      data in commits.

9. **Branch Cleanup:**
    - **Delete Merged Branches**: After a branch has been merged, delete it from both the remote and local repositories
      to keep the repository clean and manageable.

10. **Regular Syncing:**
    - **Sync with Remote**: Regularly sync your local repository with the remote repository to stay up-to-date with the
      latest changes and avoid large merge conflicts.

By following these rules, you can help ensure that your team's use of Git remains organized and efficient, making
collaboration smoother and reducing the risk of errors and conflicts.

## Contact

For any inquiries or questions, please contact the repository owner.

Certainly! Here’s a comprehensive set of Git rules you can adopt to ensure smooth collaboration and effective version
control for your team. I've included your initial rules and added a few more to cover common best practices:

---

This README provides an introduction to the `ez-utils` library, detailing its installation, usage, and available
utilities. For more detailed documentation, please refer to the source code and comments within each utility function.
