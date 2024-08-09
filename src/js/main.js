import "../sass/style.sass";
import { defaultProject } from "./dom/examples";
import { pushProject, addNewProject } from "./dom/domProjects";
import { addNewTodo } from "./dom/domTodos";
import {fastTodo} from "./dom/fastTodo";

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    pushProject(defaultProject);

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
