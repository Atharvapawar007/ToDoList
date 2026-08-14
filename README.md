# Todo List — The Odin Project

A modular **Todo List application** built as part of **[The Odin Project](https://www.theodinproject.com/)** JavaScript curriculum.

The project focuses on applying JavaScript concepts such as **factory functions, closures, ES6 modules, DOM manipulation, event handling, localStorage, and Webpack** to build a functional Todo List application.

---

## About the Project

This project is part of **The Odin Project's JavaScript curriculum** and was created to practice building a larger JavaScript application using a modular architecture rather than putting all functionality into a single script.

The application allows users to organize their tasks into different **projects**.

Each project can contain multiple todos, and each todo can have:

* A title
* A priority
* A deadline
* A completion status

The application also persists its data using the browser's **localStorage**, allowing projects and todos to remain available after refreshing the page.

---

## Features

* Create projects
* Delete projects
* Switch between projects
* Create todos inside projects
* Delete todos
* Set todo priority

  * Low
  * Medium
  * High
* Set todo deadlines
* Mark todos as completed
* Mark completed todos as incomplete
* Persist data using `localStorage`
* Restore saved data after refreshing the page
* Unique IDs using `crypto.randomUUID()`
* Modal dialogs for creating projects and todos
* Responsive layout
* Webpack development server with hot reload

---

## Concepts Practiced

This project was primarily built to practice the following concepts from the Odin Project curriculum.

### Factory Functions

The application uses factory functions to create Todo and Project objects.

```text
Todo()
Project()
AppController()
StorageController()
DisplayController()
```

Instead of exposing the internal data directly, the Todo and Project factories expose specific methods for interacting with their data.

For example, a Todo exposes methods such as:

```text
getTodoTitle()
setTodoTitle()
getTodoPriority()
setTodoPriority()
isDone()
setTodoDone()
setTodoUndone()
```

This also makes use of **closures** to keep internal variables private.

---

## ES6 Modules

The project is divided into separate JavaScript modules.

```text
src/
├── todo.js
├── project.js
├── appController.js
├── storageController.js
└── displayController.js
```

Each module has a specific responsibility and imports the modules it depends on.

For example:

```text
displayController
        ↓
appController
        ↓
project
        ↓
todo
```

This keeps the codebase organized and avoids putting the entire application into one JavaScript file.

---

# Project Structure

```text
ToDoList/
│
├── src/
│   ├── todo.js
│   ├── project.js
│   ├── appController.js
│   ├── storageController.js
│   ├── displayController.js
│   ├── template.html
│   └── style.css
│
├── package.json
├── webpack.config.js
└── README.md
```

---

# Application Architecture

The application is separated into several modules.

```text
                    ┌────────────────────┐
                    │       User         │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ DisplayController  │
                    │        UI          │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │   AppController    │
                    │ Application State  │
                    └──────┬───────┬─────┘
                           │       │
                 ┌─────────┘       └──────────┐
                 ▼                            ▼
        ┌────────────────┐          ┌──────────────────┐
        │    Project     │          │ StorageController│
        │ Project / Todo │          │   Persistence     │
        └───────┬────────┘          └────────┬─────────┘
                │                            │
                ▼                            ▼
        ┌────────────────┐          ┌──────────────────┐
        │      Todo      │          │   localStorage   │
        └────────────────┘          └──────────────────┘
```

The goal of this structure is to keep the **application logic, UI logic, and storage logic separated**.

---

# Modules

## Todo

**File:** `src/todo.js`

The Todo factory creates individual todo objects.

Each Todo contains:

```text
ID
Title
Priority
Deadline
Completion Status
```

A unique ID is generated using:

```javascript
crypto.randomUUID()
```

The internal state is kept private through closures, while getter and setter functions provide controlled access.

---

## Project

**File:** `src/project.js`

The Project factory creates project objects.

A project contains:

```text
Project ID
Project Title
Array of Todos
```

Projects provide functionality to:

* Add todos
* Delete todos
* Retrieve todos
* Change the project title

When a todo is added, the Project factory creates the Todo through:

```javascript
Todo(title, priority, deadline)
```

and stores it in its internal todo array.

---

## AppController

**File:** `src/appController.js`

The AppController manages the application's overall state.

It is responsible for:

* Adding projects
* Deleting projects
* Getting projects
* Selecting the current project
* Getting the current project
* Saving application state

It initializes the StorageController and loads previously saved projects when the application starts.

---

## StorageController

**File:** `src/storageController.js`

The StorageController handles persistence using the browser's `localStorage`.

The application stores data under:

```text
todo_app_data
```

Before saving, the functional Project and Todo objects are converted into plain JavaScript objects.

```text
Project / Todo Objects
        ↓
Extract raw data
        ↓
JSON.stringify()
        ↓
localStorage
```

When the application starts, the process is reversed:

```text
localStorage
        ↓
JSON.parse()
        ↓
Raw data
        ↓
Recreate Project objects
        ↓
Recreate Todo objects
```

This process of recreating the functional objects from stored data is used to **rehydrate** the application state.

---

## DisplayController

**File:** `src/displayController.js`

The DisplayController connects the application logic with the DOM.

It handles:

* Selecting DOM elements
* Opening and closing modals
* Reading form inputs
* Creating projects
* Creating todos
* Rendering projects
* Rendering todos
* Selecting projects
* Deleting projects
* Deleting todos
* Updating todo completion status

The controller communicates with the AppController rather than directly managing the application's underlying state.

---

# Todo Deadlines

The application accepts the deadline as separate date and time inputs.

The values are combined using:

```javascript
convertToDeadline(date, time)
```

If no time is supplied, the application defaults to:

```text
23:59
```

The resulting deadline is formatted into a readable string such as:

```text
August 14, 2026 - 08:23 AM
```

---

# User Interface

The UI is built with HTML and CSS.

The main layout consists of:

```text
Header
│
├── Sidebar
│   ├── Projects
│   ├── Add Project
│   └── Project List
│
└── Content
    ├── Current Project
    ├── Add Todo
    └── Todo List
```

The application uses HTML `<dialog>` elements for its project and todo creation forms.

---

# Styling

The project uses a clean, minimal interface with CSS variables for:

* Colors
* Typography
* Spacing
* Border radii
* Shadows
* Animation timing

The stylesheet uses:

* **Fraunces** for display typography
* **Inter** for body text
* **IBM Plex Mono** for deadline information

Todo priority is visually represented using different colored indicators for low, medium, and high priority.

---

# Technologies

### Languages

* HTML5
* CSS3
* JavaScript (ES6+)

### JavaScript Concepts

* Factory functions
* Closures
* ES6 modules
* DOM manipulation
* Event listeners
* Array methods
* JSON
* localStorage
* Object rehydration

### Tools

* Webpack
* Webpack Dev Server
* html-webpack-plugin
* css-loader
* style-loader

---

# Webpack

The project uses Webpack to bundle the application.

The entry point is:

```text
src/index.js
```

The generated bundle is placed inside:

```text
dist/
```

Webpack is also configured to:

* Process CSS
* Handle image assets
* Generate HTML from the template
* Run a development server
* Enable hot reload
* Clean the output directory during builds

---

# Getting Started

## Prerequisites

Install:

* [Node.js](https://nodejs.org/)
* npm

Verify the installation:

```bash
node --version
npm --version
```

---

## Clone the Repository

```bash
git clone https://github.com/Atharvapawar007/ToDoList.git
```

Then:

```bash
cd ToDoList
```

---

## Install Dependencies

```bash
npm install
```

---

## Run the Application

Start the Webpack development server:

```bash
npm start
```

The project uses:

```text
webpack serve
```

and is configured to automatically open the application in the browser.

---

## Build the Project

To create a Webpack build:

```bash
npm run build
```

This runs:

```text
webpack
```

and generates the bundled application in the `dist` directory.

The available npm scripts are defined in `package.json`.

---

# Data Persistence

No backend or database is required.

The application stores its data locally using the browser's `localStorage`.

### Saving

```text
Application Objects
        ↓
Extract required data
        ↓
JSON.stringify()
        ↓
localStorage
```

### Loading

```text
localStorage
        ↓
JSON.parse()
        ↓
Raw Data
        ↓
Recreate Projects
        ↓
Recreate Todos
        ↓
Application State
```

This means that refreshing the browser does not remove the user's projects and todos.

However, the data is tied to the browser/device where it was created.

---

# What I Learned

Through this project, I practiced building a larger JavaScript application using a modular structure rather than writing everything in one file.

Some of the major concepts reinforced through the project include:

* Designing objects using factory functions
* Using closures for data encapsulation
* Organizing JavaScript into ES6 modules
* Separating application logic from UI logic
* Managing application state
* Manipulating the DOM dynamically
* Working with browser events
* Persisting data with localStorage
* Serializing JavaScript data with JSON
* Rehydrating application objects from stored data
* Using Webpack to bundle a JavaScript application

---

# Future Improvements

Possible future additions include:

* Editing todos
* Editing project names
* Todo descriptions
* Todo categories
* Search functionality
* Filtering and sorting
* Drag-and-drop todo ordering
* Due-date notifications
* Dark mode
* Improved mobile experience
* Confirmation dialogs before deleting items
* Cloud/database storage
* User authentication
* Cross-device synchronization

---

# Credits

This project was created as part of the **JavaScript curriculum from The Odin Project**.

**The Odin Project:**
https://www.theodinproject.com/

The project is an educational exercise intended to practice JavaScript architecture, object creation, DOM manipulation, Webpack, and browser storage.

---

# Author

**Atharva Pawar**

GitHub:
https://github.com/Atharvapawar007

---

## License

This project currently uses the **ISC License**, as specified in `package.json`.
