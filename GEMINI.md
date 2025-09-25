# GEMINI.md - Project Overview: ConsolAS

## Project Overview

ConsolAS is a JavaScript library designed to enhance the native `console` object within Google Apps Script environments by providing additional, commonly expected methods such as `table` and `assert`. It aims to bridge the gap between standard JavaScript development and the Google Apps Script runtime, offering a more robust debugging and logging experience.

The library is built using modern JavaScript practices, bundled with Vite, and tested with Jest. It supports multiple distribution targets: as an NPM module, a native Google Apps Script library, or a standalone script for direct copy-pasting.

**Key Technologies:**

*   **JavaScript:** Primary development language.
*   **Google Apps Script:** The target environment for the library's functionality.
*   **Vite:** A fast build tool for bundling the library for various targets.
*   **Jest:** A JavaScript testing framework for unit and integration tests.
*   **ESLint & Prettier:** For code linting and formatting, ensuring consistent code style.
*   **Clasp:** The command-line interface for Google Apps Script projects, used for deployment.

**Architecture:**

The core of ConsolAS is the `ConsolAS` class, which can be instantiated to provide extended console functionalities. It can also polyfill the global `console` object to integrate seamlessly with existing code. The build process is configured to generate different output formats suitable for various consumption methods, including an IIFE for Google Apps Script.

## Building and Running

The project utilizes `npm` scripts for various development and build tasks.

*   **Install Dependencies:**
    ```bash
    npm install
    ```

*   **Build All Targets:**
    This command builds the library for copy-paste, Node.js, and Google Apps Script.
    ```bash
    npm run build
    ```

*   **Build for Google Apps Script Only:**
    ```bash
    npm run build:gas
    ```

*   **Deploy to Google Apps Script:**
    This command first builds the project and then pushes the changes to the configured Google Apps Script project using `clasp`.
    ```bash
    npm run build:push
    ```

*   **Run Tests:**
    Executes all unit tests using Jest.
    ```bash
    npm t
    ```

*   **Lint Code:**
    Analyzes the source code for potential errors and style violations using ESLint.
    ```bash
    npm run lint
    ```

*   **Format Code:**
    Automatically formats the code using Prettier and ESLint's fix command.
    ```bash
    npm run format
    ```

## Development Conventions

*   **Code Style:** Code style is strictly enforced using ESLint and Prettier. Developers should run `npm run format` before committing to ensure adherence to the project's style guidelines.
*   **Documentation:** JSDoc comments are used for all functions, classes, and significant code blocks to provide clear explanations of their purpose, parameters, and return values.
*   **Testing:** Unit tests are written using Jest and are located in the `__tests__` directory. New features and bug fixes should be accompanied by appropriate tests.
*   **Google Apps Script Integration:** The project leverages `clasp` for seamless deployment to Google Apps Script. The `appsscript.json` file manages the project's manifest settings. A custom Vite plugin (`vite-plugin/vite-plugin-appsscript.js`) handles specific build requirements for Google Apps Script.
