import express from "express";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TASKS_FILE = path.join(__dirname, 'tasks.json');

const readTasks = () => {
    try {
        if (!fs.existsSync(TASKS_FILE)) {
            return [];
        }
        const rawData = fs.readFileSync(TASKS_FILE, 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading tasks:', error);
        return [];
    }
};

const writeTasks = (tasks) => {
    try {
        fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error('Error writing tasks:', error);
    }
};

// CLI Command Handler
const handleCLICommand = () => {
    const args = process.argv.slice(2);
    const command = args[0];

    switch(command) {
        case 'add':
            if (!args[1]) {
                console.error('Please provide a task description');
                process.exit(1);
            }
            addTask(args[1]);
            break;
        
        case 'list':
            listTasks(args[1]);
            break;
        
        case 'update':
            if (args.length < 3) {
                console.error('Usage: task-cli update <id> <new description>');
                process.exit(1);
            }
            updateTask(parseInt(args[1]), args[2]);
            break;
        
        case 'delete':
            if (!args[1]) {
                console.error('Please provide a task ID to delete');
                process.exit(1);
            }
            deleteTask(parseInt(args[1]));
            break;
        
        case 'mark-in-progress':
            if (!args[1]) {
                console.error('Please provide a task ID');
                process.exit(1);
            }
            updateTaskStatus(parseInt(args[1]), 'in-progress');
            break;
        
        case 'mark-done':
            if (!args[1]) {
                console.error('Please provide a task ID');
                process.exit(1);
            }
            updateTaskStatus(parseInt(args[1]), 'done');
            break;
        
        default:
            console.log('Usage: task-cli [add|list|update|delete|mark-in-progress|mark-done]');
            process.exit(1);
    }
};

// Task Management Functions
const addTask = (description) => {
    const tasks = readTasks();
    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    writeTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
};

const listTasks = (status) => {
    let tasks = readTasks();
    
    if (status) {
        tasks = tasks.filter(task => task.status === status);
    }
    
    if (tasks.length === 0) {
        console.log('No tasks found.');
        return;
    }
    
    tasks.forEach(task => {
        console.log(`ID: ${task.id}, Description: ${task.description}, Status: ${task.status}`);
    });
};

const updateTask = (id, newDescription) => {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
        console.error(`Task with ID ${id} not found`);
        process.exit(1);
    }
    
    tasks[taskIndex].description = newDescription;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    writeTasks(tasks);
    console.log(`Task ${id} updated successfully`);
};

const deleteTask = (id) => {
    let tasks = readTasks();
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);
    
    if (tasks.length === initialLength) {
        console.error(`Task with ID ${id} not found`);
        process.exit(1);
    }
    
    writeTasks(tasks);
    console.log(`Task ${id} deleted successfully`);
};

const updateTaskStatus = (id, status) => {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
        console.error(`Task with ID ${id} not found`);
        process.exit(1);
    }
    
    tasks[taskIndex].status = status;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    writeTasks(tasks);
    console.log(`Task ${id} marked as ${status}`);
};

// Run CLI
handleCLICommand();