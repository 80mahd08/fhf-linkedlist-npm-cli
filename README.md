# create-fhf-linkedlist-app

## Overview

`create-fhf-linkedlist-app` is a CLI tool to quickly set up a project for creating a linked list application using either Vite or Next.js. This tool streamlines the process of cloning the necessary repository and installing dependencies, allowing you to focus on development.

## Features

- Clone the `fhf-linkedlist` repository with a specific branch based on your chosen framework and template.
- Automatically install dependencies for the cloned project.
- Supports both JavaScript and TypeScript setups.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [Git](https://git-scm.com/)

## Installation

You can install the CLI globally using npm:

```bash
npm install -g create-fhf-linkedlist-app
```

You can run it by typing in the terminal:

```bash
create-fhf-linkedlist-app
```

Alternatively, you can use `npx` to run it without installing globally:

```bash
npx create-fhf-linkedlist-app
```

## Usage

You will be prompted to choose a framework and, if applicable, a template:

1. Choose a framework for your app:

   - Next.js
   - Vite

2. If you choose Vite, select a template:
   - React JS
   - React TS
   - Vanilla JS
   - Vanilla TS

You can specify a custom path for the project directory by providing it as an argument:

```bash
npx create-fhf-linkedlist-app my-custom-path
```

The CLI will then clone the appropriate branch of the `fhf-linkedlist` repository and install the dependencies.

## Example

Here's an example of using the CLI:

```bash
npx create-fhf-linkedlist-app
```

1. Choose `Vite` as your framework.
2. Choose `React TS` as your template.

The CLI will clone the `vite-react-ts` branch from the `fhf-linkedlist` repository and set up your project.

## Project Structure

After running the CLI, your project structure will look like this (example for `vite-vanilla-ts`):

```
your-project-name/
├── public/
│   ├── wasm/
│   │   ├── main.wasm
│   │   └── vite.svg
├── src/
│   ├── fhf-linkedlist/
│   │   └── index.ts
│   ├── fhf-linkedlist.png
│   ├── main.ts
│   ├── style.css
│   ├── typescript.svg
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.json
└── vite.config.js
```

## Using `fhf-linkedlist` in Your Project

The `fhf-linkedlist` repository is designed to be a foundational component for linked list implementations. To use it in your project, follow these steps:

1. **Import the Linked List Module:**

   In your `src` directory, import the linked list module into your component or application file where you intend to use it.

   ```typescript
   // Example in a TypeScript file
   import LinkedList from "./fhf-linkedlist";
   ```

2. **Instantiate and Use the Linked List:**

   Create an instance of the linked list and utilize its methods as needed.

   ```typescript
   const myList = new LinkedList();
   await myList.append(1);
   await myList.append(2);
   await myList.append(3);

   console.log(await myList.toArray()); // Outputs: [1, 2, 3]
   ```

3. **Documentation and Examples:**

   For more detailed usage and examples, refer to the [fhf-linkedlist documentation](https://github.com/80mahd08/fhf-linkedList#readme).

## Contributing

If you would like to contribute to this project, please feel free to submit a pull request or open an issue on GitHub.

## License

This project is licensed under the ISC License.

---

Happy coding!
