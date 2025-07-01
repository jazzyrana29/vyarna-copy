# Vyarna API

This is the README file for the vy-bd-siteapp API built using NestJS. Follow the instructions below to set up and run
the
project.

## Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine using the following command:

```bash
git clone git@gitlab.com:vyarna/vy-bd-siteapp.git
```

Replace `<repository-url>` with the actual URL of the repository.

### 2. Navigate to the Project Directory

Change your current directory to the project directory `vy-bd-siteapp`:

```bash
cd vy-bd-siteapp
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root directory by copying the `.env-example` file:

```bash
cp .env-example .env
```

Make sure to configure the environment variables in the `.env` file as per your requirements.

### 4. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 5. Run Redis For Cache

Ensure redis is installed and running on your machine.You can start redis by running:

```bash
redis-server
```

## Running the Application

After setting up the environment and dependencies, you can start the NestJS application using:

```bash
npm run start:dev
```

The application should now be running and accessible according to the configuration in your `.env` file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For further assistance or questions, please refer to the project's documentation or contact the maintainers.
