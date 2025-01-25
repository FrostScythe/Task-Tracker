# Task Tracker CLI

## Overview
Task Tracker is a simple command-line interface (CLI) application to manage and track your tasks efficiently.

## Features
- Add new tasks
- List all tasks
- List tasks by status (todo, in-progress, done)
- Update task descriptions
- Mark tasks as in-progress or done
- Delete tasks

## Prerequisites
- Node.js (v14 or higher)
- npm

## Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/task-tracker-cli.git
cd task-tracker-cli
```

2. Initialize project
```bash
npm init -y
```

## Usage

### Add a Task
```bash
node task-cli.js add "Buy groceries"
```

### List Tasks
```bash
# List all tasks
node task-cli.js list

# List tasks by status
node task-cli.js list todo
node task-cli.js list in-progress
node task-cli.js list done
```

### Update a Task
```bash
node task-cli.js update <task-id> "Updated task description"
```

### Change Task Status
```bash
# Mark task as in progress
node task-cli.js mark-in-progress <task-id>

# Mark task as done
node task-cli.js mark-done <task-id>
```

### Delete a Task
```bash
node task-cli.js delete <task-id>
```

## Task Properties
- `id`: Unique task identifier
- `description`: Task description
- `status`: Current task status (todo, in-progress, done)
- `createdAt`: Task creation timestamp
- `updatedAt`: Last update timestamp

## Storage
Tasks are stored in `tasks.json` in the project directory.

## Error Handling
- Provides user-friendly error messages
- Validates input and task existence

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Project idea
https://roadmap.sh/projects/task-tracker

## License
[Specify your license, e.g., MIT]#
