import "../sass/style.sass";
import { Project, projects } from "./index";
"use strict";

// Examples

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

// Code for DOM

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

function pushTodos(project) {

    const todosDisplay = document.querySelector(".todos");

    for (const todo of project.todos) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const todoTitle = document.createElement("p");
        const todoDueDate = document.createElement("p");
        let todoColor;

        if (todo.priority === 1) {
            todoDiv.style.background = "#339966";
        } else if (todo.priority === 2) {
            todoDiv.style.background = "#ffff33";
        } else if (todo.priority === 3) {
            todoDiv.style.background = "#ff3333";
        } else {
            todoDiv.style.background = "#fff";
        }

        todoTitle.textContent = todo.title;
        todoDueDate.textContent = todo.dueDate;

        todoDiv.appendChild(todoTitle);
        todoDiv.appendChild(todoDueDate);

        todosDisplay.appendChild(todoDiv);
    }

}

let currentProject = projects[0];

function pushProject(project) {

    const projectsDisplay = document.querySelector(".projects");

    const projectPar = document.createElement("p");
    projectPar.textContent = project.title;
    projectsDisplay.appendChild(projectPar);

    selectProject(project)

    projectPar.addEventListener("click", () => {
       selectProject(project);
    });

}

function selectProject(project) {

    const projectsDisplay = document.querySelector(".projects");
    const todosDisplay = document.querySelector(".todos");

    for (const par of projectsDisplay.children) {
        if (par.style.fontWeight === "bold") {
            par.style.fontWeight = "normal";
        }
    }

    currentProject = project;

    for (const par of projectsDisplay.children) {
        if (par.textContent === project.title) {
            par.style.fontWeight = "bold";
        }
    }

    todosDisplay.textContent = "";
    pushTodos(project);

}

function addNewProject() {

    const dialog = document.querySelector(".project-dialog");
    const titleInput = document.querySelector("#project-title");
    const submitButton = document.querySelector(".project-submit");
    const closeButton = document.querySelector(".project-close");

    titleInput.value = "";
    dialog.showModal();

    submitButton.addEventListener("click", submitted);

    let projectTitles = [];

    for (const p of projects) {
        projectTitles.push(p.title);
    }

    console.log(projectTitles);

    function submitted() {
        if (titleInput.value === "") {
            titleInput.value = "New Project";
        }

        console.log(titleInput.value);

        while (projectTitles.includes(titleInput.value)) {
            if (isNaN(titleInput.value.slice(-1)) === false) {
                titleInput.value = titleInput.value.slice(0, titleInput.value.length - 1) + (Number(titleInput.value.slice(-1)) + 1);
            } else {
                titleInput.value = titleInput.value + " 1";
            }
        }

        const newProject = Project(titleInput.value);
        pushProject(newProject);
        dialog.close();

        submitButton.removeEventListener("click", submitted);
    }

    closeButton.addEventListener("click", () => {
        dialog.close();
    });

}

function addNewTodo(project) {



}
