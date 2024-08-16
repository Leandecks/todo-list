import "../css/style.css";
import { addNewProject } from "./dom/domProjects";
import { addNewTodo } from "./dom/domTodos";
import { fastTodo } from "./dom/fastTodo";
import { loadProjects } from "./dom/localStorage";

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    loadProjects();

    const addProjectBtn = document.querySelector(".addProjectBtn");
    addProjectBtn.addEventListener("click", () => {
        addNewProject();
    });

    const addTodoBtn = document.querySelector(".addTodoBtn");
    addTodoBtn.addEventListener("click", () => {
        addNewTodo();
    });

    document.addEventListener("keydown", (e) => {
        fastTodo(e);
    })
    
});
