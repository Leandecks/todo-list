import { currentProject } from "./domProjects";
import * as _ from "lodash";

function pushTodos(project) {

    const todosDisplay = document.querySelector(".todos");
    todosDisplay.textContent = "";

    for (const todo of project.todos) {
        const todoDiv = document.createElement("div");
        const todoTitle = document.createElement("p");
        const todoDescription = document.createElement("p");
        const todoChecklist = document.createElement("div");
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

        if (todo.checklist !== undefined) {
            for (const checklistKey in todo.checklist) {
                const checklistTodoDiv = document.createElement("div");

                const checklistTodoMark = document.createElement("input");
                checklistTodoMark.type = "checkbox";
                checklistTodoMark.checked = todo.checklist[checklistKey]

                checklistTodoMark.addEventListener("click", () => {
                    if (checklistTodoMark.checked) {
                        checklistTodoMark.nextElementSibling.style.textDecoration = "line-through";
                        todo.checklist[checklistKey] = true;
                    } else {
                        checklistTodoMark.nextElementSibling.style.textDecoration = "none";
                        todo.checklist[checklistKey] = false;
                    }
                });

                const checklistTodoPar = document.createElement("p");
                checklistTodoPar.textContent = checklistKey;

                checklistTodoDiv.appendChild(checklistTodoMark);
                checklistTodoDiv.appendChild(checklistTodoPar);

                if (todo.checklist[checklistKey]) {
                    checklistTodoMark.checked = true;
                    checklistTodoMark.nextElementSibling.style.textDecoration = "line-through";
                } else {
                    checklistTodoMark.checked = false;
                    checklistTodoMark.nextElementSibling.style.textDecoration = "none";
                }

                todoChecklist.appendChild(checklistTodoDiv);
            }
        }

        todoDiv.classList.add("todo");
        todoTitle.textContent = todo.title;
        todoDescription.textContent = todo.description;
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
        todoDiv.appendChild(todoDescription);
        todoDiv.appendChild(todoChecklist);
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
        if (string === "") {
            return undefined;
        }
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

        console.log(currentProject);
    }

    closeButton.addEventListener("click", closed);

    function closed() {
        dialog.close()
        submitButton.removeEventListener("click", submitted);
        closeButton.removeEventListener("click", closed);
    }

}

function addNewTodo() {

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

    titleInput.value = "";
    descInput.value = "";
    dueInput.value = "";
    prioInput.value = "";
    listInput.value = "";

    dialogTitle.textContent = "New To Do";
    submitButton.textContent = "Create";

    submitButton.addEventListener("click", submitted);

    function formatListInput() {
        if (listInput.value === "") {
            return undefined;
        }
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

    closeButton.addEventListener("click", closed);

    function closed() {
        dialog.close();
        closeButton.removeEventListener("click", closed);
        submitButton.removeEventListener("click", submitted);
    }

}

export { pushTodos, editCurrentTodo, addNewTodo };
