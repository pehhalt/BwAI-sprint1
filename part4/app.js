// Todo App - Vanilla JavaScript with localStorage

let todos = [];
let form, input, todosList, emptyState, clearCompletedBtn, actionsSection;
let totalCount, activeCount, completedCount;

// Initialize app
function init() {
    console.log('Initializing Todo App...');

    // Get DOM elements
    form = document.getElementById('todoForm');
    input = document.getElementById('todoInput');
    todosList = document.getElementById('todosList');
    emptyState = document.getElementById('emptyState');
    clearCompletedBtn = document.getElementById('clearCompletedBtn');
    actionsSection = document.getElementById('actions');
    totalCount = document.getElementById('totalCount');
    activeCount = document.getElementById('activeCount');
    completedCount = document.getElementById('completedCount');

    // Check if elements exist
    if (!form || !input) {
        console.error('Required form elements not found');
        return;
    }

    // Load todos from localStorage
    loadTodos();

    // Attach event listeners
    form.addEventListener('submit', handleAddTodo);
    clearCompletedBtn.addEventListener('click', clearCompleted);

    // Initial render
    render();
    console.log('Todo App initialized successfully');
}

// Load todos from localStorage
function loadTodos() {
    try {
        const stored = localStorage.getItem('todos');
        todos = stored ? JSON.parse(stored) : [];
        console.log('Loaded todos:', todos);
    } catch (error) {
        console.error('Error loading todos:', error);
        todos = [];
    }
}

// Save todos to localStorage
function saveTodos() {
    try {
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log('Todos saved:', todos);
    } catch (error) {
        console.error('Error saving todos:', error);
    }
}

// Add new todo
function handleAddTodo(e) {
    e.preventDefault();
    console.log('handleAddTodo called');

    const text = input.value.trim();
    console.log('Input text:', text);

    if (!text) {
        console.log('Empty input, not adding');
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    console.log('Adding new todo:', newTodo);
    todos.unshift(newTodo);
    saveTodos();
    input.value = '';
    input.focus();
    render();
}

// Toggle todo completion
function toggleTodo(id) {
    console.log('Toggling todo:', id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        console.log('Todo toggled:', todo);
        saveTodos();
        render();
    }
}

// Delete todo
function deleteTodo(id) {
    console.log('Deleting todo:', id);
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    render();
}

// Clear all completed todos
function clearCompleted() {
    console.log('Clearing completed todos');
    todos = todos.filter(t => !t.completed);
    saveTodos();
    render();
}

// Update stats
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;

    totalCount.textContent = total;
    activeCount.textContent = active;
    completedCount.textContent = completed;
}

// Render todos list
function renderTodos() {
    todosList.innerHTML = '';

    if (todos.length === 0) {
        emptyState.style.display = 'flex';
        actionsSection.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    actionsSection.style.display = 'flex';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.role = 'listitem';

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.setAttribute('aria-label', `Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`);
        checkbox.addEventListener('change', () => toggleTodo(todo.id));

        // Todo text
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('aria-label', `Delete todo: ${todo.text}`);
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        todosList.appendChild(li);
    });
}

// Main render function
function render() {
    console.log('Rendering...');
    renderTodos();
    updateStats();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
