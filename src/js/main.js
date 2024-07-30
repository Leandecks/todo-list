import "../sass/style.sass";
import { Project, projects } from "./project";
import { defaultProject } from "./examples";
import { pushTodos, currentProject, pushProject, selectProject, addNewProject, addNewTodo } from "./dom";

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

});
