# Typing Game

This project is part of the Udemy course [30 Days of Angular: Build 30 Web Projects with Angular](https://www.udemy.com/course/30-days-of-angular/).

## Overview

The Typing Game is an interactive web application designed to improve typing speed and accuracy. It features a typing test, leaderboard, themes, and more.

## Features

- **Typing Test**: Practice typing with random words and track your speed and accuracy.
- **Leaderboard**: Compete with others and see the top scores.
- **Themes**: Customize the look and feel of the application.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

## Project Structure

The project is built using Angular and follows a modular structure:

- `src/app/components`: Reusable UI components like header and footer.
- `src/app/pages`: Pages like home, leaderboard, and typing test.
- `src/app/services`: Services for managing game logic, themes, and leaderboard.
- `src/app/models`: Data models for leaderboard entries, stats, and words.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MuhammadAlifBudiman/typing-game.git
   ```
2. Navigate to the project directory:
   ```bash
   cd typing-game
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200/`.

## Testing

Run the tests using:

```bash
npm test
```

## License

This project is licensed under the MIT License.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
