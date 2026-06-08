// Todo App - Vanilla JavaScript with localStorage

class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.initElements();
        this.attachEventListeners();
        this.render();
    }

    // Initialize DOM elements
    initElements() {
        this.form = document.getElementById('todoForm');
        this.input = document.getElementById('todoInput');
        this.todosList = document.getElementById('todosList');
        this.emptyState = document.getElementById('emptyState');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.actionsSection = document.getElementById('actions');
        this.totalCount = document.getElementById('totalCount');
        this.activeCount = document.getElementById('activeCount');
        this.completedCount = document.getElementById('completedCount');
    }

    // Attach event listeners
    attachEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleAddTodo(e));
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
    }

    // Load todos from localStorage
    loadTodos() {
        try {
            const stored = localStorage.getItem('todos');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading todos from localStorage:', error);
            return [];
        }
    }

    // Save todos to localStorage
    saveTodos() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (error) {
            console.error('Error saving todos to localStorage:', error);
        }
    }

    // Add new todo
    handleAddTodo(e) {
        e.preventDefault();
        const text = this.input.value.trim();

        if (!text) {
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        this.todos.unshift(newTodo);
        this.saveTodos();
        this.input.value = '';
        this.input.focus();
        this.render();
    }

    // Toggle todo completion
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    // Delete todo
    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
    }

    // Clear all completed todos
    clearCompleted() {
        this.todos = this.todos.filter(t => !t.completed);
        this.saveTodos();
        this.render();
    }

    // Update stats
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const active = total - completed;

        this.totalCount.textContent = total;
        this.activeCount.textContent = active;
        this.completedCount.textContent = completed;
    }

    // Render todos list
    renderTodos() {
        this.todosList.innerHTML = '';

        if (this.todos.length === 0) {
            this.emptyState.style.display = 'flex';
            this.actionsSection.style.display = 'none';
            return;
        }

        this.emptyState.style.display = 'none';
        this.actionsSection.style.display = 'flex';

        this.todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.role = 'listitem';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'todo-checkbox';
            checkbox.checked = todo.completed;
            checkbox.aria-label = `Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`;
            checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

            const span = document.createElement('span');
            span.className = 'todo-text';
            span.textContent = todo.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.aria-label = `Delete todo: ${todo.text}`;
            deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);

            this.todosList.appendChild(li);
        });
    }

    // Main render function
    render() {
        this.renderTodos();
        this.updateStats();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
