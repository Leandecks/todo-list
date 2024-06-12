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

console.log(projects);

// Code for DOM

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

// let currentProject;
// let currentProjectPar

function pushProject(project) {

    const projectsDisplay = document.querySelector(".projects");
    const todosDisplay = document.querySelector(".todos");

    const projectPar = document.createElement("p");
    projectPar.textContent = project.title;
    projectsDisplay.appendChild(projectPar);

    // let previousProject = currentProject;
    // let previousProjectPar = currentProjectPar;
    // currentProject = project;
    // currentProjectPar = projectPar;


    projectPar.addEventListener("click", () => {
        todosDisplay.textContent = "";
        // previousProjectPar.style.fontWeight = "normal";
        pushTodos(project);
        // currentProjectPar.style.fontWeight = "bold";
    });

}

for (const project of projects) {
    pushProject(project);
}
