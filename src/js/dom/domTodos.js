import { currentProject } from "./domProjects";
import * as _ from "lodash";

function pushTodos(project) {

    const todosDisplay = document.querySelector(".todos");
    todosDisplay.textContent = "";

    for (const todo of project.todos) {
        const todoDiv = document.createElement("div");
        const todoTitle = document.createElement("p");
        const todoDueDate = document.createElement("p");

        const checkbox = document.createElement("input");
        const deleteTodo = document.createElement("i");
        const editTodo = document.createElement("i");

        if (todo.priority === 1) {
            todoDiv.style.background = "#339966";
        } else if (todo.priority === 2) {
            todoDiv.style.background = "#ffff33";
        } else if (todo.priority === 3) {
            todoDiv.style.background = "#ff3333";
        } else {
            todoDiv.style.background = "#fff";
        }

        todoDiv.classList.add("todo");
        todoTitle.textContent = todo.title;
        todoDueDate.textContent = todo.dueDate;

        checkbox.type = "checkbox";
        checkbox.classList.add("checkmark");
        checkbox.addEventListener("click", () => {
            if (checkbox.checked) {
                checkbox.nextElementSibling.style.textDecoration = "line-through";
                todo.completed = true;
            } else {
                checkbox.nextElementSibling.style.textDecoration = "none";
                todo.completed = false;
            }
        });

        deleteTodo.classList.add("nf");
        deleteTodo.classList.add("nf-md-delete");
        deleteTodo.addEventListener("click", () => {
            project.removeTodo(todo.title);
            pushTodos(project);
        });

        editTodo.classList.add("nf");
        editTodo.classList.add("nf-md-square_edit_outline");
        editTodo.addEventListener("click", () => {
            editCurrentTodo(todo);
        });

        todoDiv.appendChild(checkbox);
        todoDiv.appendChild(todoTitle);
        todoDiv.appendChild(todoDueDate);
        todoDiv.appendChild(deleteTodo);
        todoDiv.appendChild(editTodo);

        if (todo.completed) {
            checkbox.checked = true;
            checkbox.nextElementSibling.style.textDecoration = "line-through";
        } else {
            checkbox.checked = false;
            checkbox.nextElementSibling.style.textDecoration = "none";
        }

        todosDisplay.appendChild(todoDiv);
    }

}

function editCurrentTodo(todo) {

    const dialog = document.querySelector(".todo-dialog");
    const titleInput = document.querySelector("#todo-title");
    const descInput = document.querySelector("#todo-description");
    const dueInput = document.querySelector("#todo-due");
    const prioInput = document.querySelector("#todo-priority");
    const listInput = document.querySelector("#todo-checklist");
    const submitButton = document.querySelector(".todo-submit");
    const closeButton = document.querySelector(".todo-close");
    const dialogTitle = document.querySelector(".todo-dialog-title");

    dialog.showModal();

    function objectToList(object) {
        let string = "";
        for (const objectElement in object) {
            string += objectElement + ",";
        }
        return _.trim(string, ",");
    }

    dialogTitle.textContent = "Edit To Do";
    submitButton.textContent = "Update";

    titleInput.value = todo.title;
    descInput.value = todo.description;
    dueInput.value = todo.dueDate;
    prioInput.value = todo.priority;
    listInput.value = objectToList(todo.checklist);

    submitButton.addEventListener("click", submitted);

    function listToObject(string) {
        const array = string.split(",");
        const stripped = {};
        for (let i = 0; i < array.length; i++) {
            stripped[(_.trim(array[i]))] = false;
        }
        return stripped;
    }

    function submitted() {
        todo.title = titleInput.value;
        todo.description = descInput.value;
        todo.dueDate = dueInput.value;
        todo.priority = isNaN(prioInput.value) ? "" : Number(prioInput.value);
        todo.checklist = listToObject(listInput.value);

        pushTodos(currentProject);
        dialog.close();
        submitButton.removeEventListener("click", submitted);
    }

    closeButton.addEventListener("click", () => {
        dialog.close();
    });

}

function addNewTodo() {
    const dialog = document.querySelector(".todo-dialog"), titleInput = document.querySelector("#todo-title"),
        descInput = document.querySelector("#todo-description"), dueInput = document.querySelector("#todo-due"),
        prioInput = document.querySelector("#todo-priority"), listInput = document.querySelector("#todo-checklist"),
        submitButton = document.querySelector(".todo-submit"), closeButton = document.querySelector(".todo-close"),
        dialogTitle = document.querySelector(".todo-dialog-title");
    dialog.showModal();

    titleInput.value = "";
    descInput.value = "";
    dueInput.value = "";
    prioInput.value = "";
    listInput.value = "";

    dialogTitle.textContent = "New To Do";
    submitButton.textContent = "Create";

    submitButton.addEventListener("click", submitted);

    function formatListInput() {
        const array = listInput.value.split(",");
        const stripped = {};
        for (let i = 0; i < array.length; i++) {
            stripped[(_.trim(array[i]))] = false;
        }
        return stripped;
    }

    function submitted() {
        if (titleInput.value === "") {
            titleInput.value = "New To Do";
        }
        currentProject.addTodo(
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

export { pushTodos, editCurrentTodo, addNewTodo };
