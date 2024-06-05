"use strict";

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

export { Project, projects };
