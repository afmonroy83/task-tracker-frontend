# Task Tracker Frontend

Modern web application for task management, built with React and Vite. Allows you to create, list, and manage tasks efficiently with an intuitive user interface.

## Features

- Create new tasks
- List all tasks
- Loading states and error handling
- Modern interface with CSS Modules
- Complete test suite
- Fast development with Vite

## Technologies

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Vitest** - Testing framework
- **React Testing Library** - Component testing
- **ESLint** - JavaScript/React linter

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Access to the backend API (configure environment variables)

## Backend API

This frontend application requires the backend API to be running. The backend repository can be found at:

**Backend Repository:** [https://github.com/afmonroy83/task-tracker-api](https://github.com/afmonroy83/task-tracker-api)

Make sure to set up and run the backend API before starting the frontend application. Refer to the backend repository for installation and setup instructions.

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-tracker-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with the following variables:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_API_TOKEN=your-token-here
```

**Note:** The `VITE_API_TOKEN` should match the `FRONTEND_API_TOKEN` configured in the backend API. See the [backend repository](https://github.com/afmonroy83/task-tracker-api) for token configuration details.

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server in watch mode. The application will be available at `http://localhost:5173`

### Production Build
```bash
npm run build
```
Generates optimized production files in the `dist/` folder

### Preview Build
```bash
npm run preview
```
Previews the production build locally

### Tests
```bash
# Run tests in watch mode
npm test

# Run tests once
npm test -- --run

# Run tests with visual interface
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Linting
```bash
npm run lint
```
Runs ESLint to check code quality

## Project Structure

```
task-tracker-frontend/
├── public/                 # Public static files
├── src/
│   ├── api/                # API functions
│   │   ├── tasks.js        # Tasks API
│   │   └── tasks.test.js   # API tests
│   ├── components/         # React components
│   │   ├── TaskForm.jsx    # Form to create tasks
│   │   ├── TaskList.jsx    # Task list
│   │   ├── TaskItem.jsx    # Individual task item
│   │   └── *.test.jsx      # Component tests
│   ├── hooks/              # Custom hooks
│   │   ├── useTasks.js     # Hook for task management
│   │   └── useTasks.test.js # Hook tests
│   ├── styles/             # CSS Modules styles
│   │   ├── app.module.css
│   │   ├── taskForm.module.css
│   │   └── taskList.module.css
│   ├── test/               # Test configuration
│   │   └── setup.js
│   ├── App.jsx             # Main component
│   ├── App.test.jsx        # Main component tests
│   └── main.jsx            # Entry point
├── .env                    # Environment variables (create this)
├── vite.config.js          # Vite configuration
├── package.json
└── README.md
```

## Testing

The project includes a complete test suite with **Vitest** and **React Testing Library**:

- **28 tests** covering components, hooks, and API
- Component tests: rendering, interactions, states
- Hook tests: business logic and state management
- API tests: HTTP calls and error handling

### Running Tests

```bash
# Watch mode (recommended for development)
npm test

# Single run
npm test -- --run

# With visual interface
npm run test:ui
```

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Open your browser at `http://localhost:5173`

3. Use the form to add new tasks

4. Tasks are automatically loaded when the application starts

## API Integration

The application communicates with a backend API. Make sure that:

- The backend is running and accessible (see [backend repository](https://github.com/afmonroy83/task-tracker-api))
- The environment variables `VITE_API_BASE_URL` and `VITE_API_TOKEN` are configured correctly
- The backend implements the following endpoints:
  - `GET /api/v1/tasks` - Get all tasks
  - `POST /api/v1/tasks` - Create a new task

### Expected Response Format

**GET /api/v1/tasks:**
```json
{
  "data": [
    { "id": 1, "description": "Task 1" },
    { "id": 2, "description": "Task 2" }
  ]
}
```

**POST /api/v1/tasks:**
```json
{
  "data": { "id": 3, "description": "New task" }
}
```

**Errors:**
```json
{
  "errors": ["Error message 1", "Error message 2"]
}
```

### Authentication

All API requests require authentication via the `X-API-TOKEN` header. The token value should be set in the `VITE_API_TOKEN` environment variable and must match the `FRONTEND_API_TOKEN` configured in the backend.

## Troubleshooting

### API Connection Error
- Verify that the backend is running
- Check environment variables in `.env`
- Confirm that the base URL is correct
- Ensure the API token matches the backend configuration

### Tests Failing
- Make sure all dependencies are installed: `npm install`
- Verify that no processes are using the required ports

### Build Failing
- Clear the cache: `rm -rf node_modules/.vite`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Backend Connection Issues
- Check that the backend API is running (see [backend repository](https://github.com/afmonroy83/task-tracker-api))
- Verify the `VITE_API_BASE_URL` points to the correct backend URL
- Ensure the `VITE_API_TOKEN` matches the `FRONTEND_API_TOKEN` in the backend


