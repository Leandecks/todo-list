import "../sass/style.sass";

const projects = [];

function Project(title) {

    const todos = [];

    function addTodo(title, description, dueDate, priority, checklist) {
        const todo = { title, description, dueDate, priority, checklist };
        todos.push(todo);
        return todo;
    }

    function removeTodo(todoTitle) {
        const todoToRemove = todos.find(todo => todo.title === todoTitle);
        const todoToRemoveIndex = todos.indexOf(todoToRemove);
        if (todoToRemoveIndex > -1) {
            todos.splice(todoToRemoveIndex, 1);
        }
    }

    projects.push({ title, todos });
    return { title, todos, addTodo, removeTodo };

}

// Tests

const defaultProject = Project("My Projects");

const toDo1 = defaultProject.addTodo(
    "Learn Russian",
    "Learn ypok 10 of russian",
    "10/06/2024",
    3,
    {
        "Learn vocab": false,
        "Learn grammar": true,
        "Do exercises": false,
    },
);

const toDo2 = defaultProject.addTodo("Play piano",
    "Play the piano again",
    "23/07/2024",
    1,
);

const toDo3 = defaultProject.addTodo(
    "Code on project",
    "Finish todo project",
    "15/06/2024",
    2,
    {
        "Console version": true,
        "DOM connection": false,
        "LocalStorage saving": false,
    },
);

const privateTodos = Project("My Private Todos");

privateTodos.addTodo("Load dishwasher");
privateTodos.addTodo("Walk dog");

console.log(projects);
