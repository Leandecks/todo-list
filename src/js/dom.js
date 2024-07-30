import { Project, projects } from "./project";
import * as _ from "lodash";

function pushTodos(project) {

    const todosDisplay = document.querySelector(".todos");
    todosDisplay.textContent = "";

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

    function submitted() {
        if (titleInput.value === "") {
            titleInput.value = "New Project";
        }

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

    const dialog = document.querySelector(".todo-dialog");
    const titleInput = document.querySelector("#todo-title");
    const descInput = document.querySelector("#todo-description");
    const dueInput = document.querySelector("#todo-due");
    const prioInput = document.querySelector("#todo-priority");
    const listInput = document.querySelector("#todo-checklist");
    const submitButton = document.querySelector(".todo-submit");
    const closeButton = document.querySelector(".todo-close");

    titleInput.value = "";
    descInput.value = "";
    dueInput.value = "";
    prioInput.value = "";
    listInput.value = "";

    dialog.showModal();

    submitButton.addEventListener("click", submitted);

    function formatListInput() {
        const array = listInput.value.split(",");
        const stripped = {};
        for (let i = 0; i < array.length; i++) {
            stripped[(_.trim(array[i]))] = false;
        }
        console.log(stripped);
        return stripped;
    }

    function submitted() {
        if (titleInput.value === "") {
            titleInput.value = "New To Do";
        }

        const newTodo = currentProject.addTodo(
            titleInput.value,
            descInput.value,
            dueInput.value,
            isNaN(prioInput.value) ? "" : Number(prioInput.value),
            formatListInput(listInput.value)
        );
        pushTodos(currentProject);
        dialog.close();

        submitButton.removeEventListener("click", submitted);
    }

    closeButton.addEventListener("click", () => {
        dialog.close();
    });

}

export { pushTodos, currentProject, pushProject, selectProject, addNewProject, addNewTodo };
