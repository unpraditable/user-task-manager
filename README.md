# Task Manager

A simple and elegant task management application built with Next.js, TypeScript, and Tailwind CSS.

## Quick Start

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation & Running

**Option 1: Local Development**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

**Option 2: Docker**

```bash
# Build and start with Docker

docker-compose up --build

# Open http://localhost:3000 in your browser
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Future Development

Adding Authentication
The architecture is ready for authentication. To add it:

1. Domain Layer:

```bash
// Add User entity
class User {
  id: string;
  email: string;
  password: string;
}

// Add auth use cases
class RegisterUser { }
class LoginUser { }
```

2. Data Layer:

```bash
// Add auth repository
interface IAuthRepository {
  createUser(user: User): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
}
```

3. Presentation Layer:

```bash
// Add auth store and components
const useAuthStore = create(...);
<LoginForm />
<RegisterForm />
```

### Adding Projects Feature

To organize tasks into projects:

1. Update Task entity with projectId
2. Add Project entity and repository
3. Create project use cases (CreateProject, GetProjects, etc.)
4. Add project components (ProjectList, ProjectForm)

### Adding Notifications

1. Create Notification entity
2. Add notification use cases
3. Implement real-time updates with WebSockets
4. Add notification components

### Database Integration

1. Replace the in-memory repository with a real database:
2. Install database driver (PostgreSQL, MongoDB, etc.)
3. Create database repository implementing ITaskRepository
4. Update dependency injection to use database repository

## Project Structure

```bash
src/
├── domain/           # Business logic
│   ├── entities/     # Task, User, etc.
│   ├── useCases/     # CreateTask, UpdateTask, etc.
│   └── repositories/ # Interfaces
├── data/            # Data layer
│   └── repositories/ # Implementations
└── presentation/    # UI layer
    ├── components/   # React components
    └── stores/       # State management
```

## Current Features

1. Create, edit, delete tasks
2. Filter by status (To Do, In Progress, Done)
3. Update task status
4. Clean Architecture pattern
5. Full test coverage

## Built With

- Frontend: Next.js 14, TypeScript, Tailwind CSS
- State: Zustand
- Testing: Jest, React Testing Library
- Architecture: Clean Architecture
