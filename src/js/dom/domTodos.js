import { currentProject } from "./domProjects";
import * as _ from "lodash";
import { format, parse } from "date-fns";
import { saveProjects } from "./localStorage";

let isDialogOpen = false;

function setIsDialogOpen(value) {
    isDialogOpen = value;
}

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
            todoDiv.style.background = "#2a9d8f";
        } else if (todo.priority === 2) {
            todoDiv.style.background = "#e9c46a";
        } else if (todo.priority === 3) {
            todoDiv.style.background = "#e63946";
        } else {
            todoDiv.style.background = "#e0e1dd";
        }

        todoTitle.classList.add("todo-title");
        checkbox.classList.add("todo-checkmark");
        todoChecklist.classList.add("todo-checklist");

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

        if (todo.completed) {
            checkbox.checked = true;
            todoTitle.style.textDecoration = "line-through";
            todoDescription.style.textDecoration = "line-through";
        } else {
            checkbox.checked = false;
            todoTitle.style.textDecoration = "none";
            todoDescription.style.textDecoration = "none";
        }

        checkbox.addEventListener("click", () => {
            if (checkbox.checked) {
                todoTitle.style.textDecoration = "line-through";
                todoDescription.style.textDecoration = "line-through";
                todo.completed = true;
                saveProjects();
            } else {
                todoTitle.style.textDecoration = "none";
                todoDescription.style.textDecoration = "none";
                todo.completed = false;
                saveProjects();
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

        const titleDescChecklist = document.createElement("div");
        const leftTodo = document.createElement("div");
        const rightTodo = document.createElement("div");

        titleDescChecklist.classList.add("title-desc-checklist");
        leftTodo.classList.add("left-todo");
        rightTodo.classList.add("right-todo");

        titleDescChecklist.appendChild(todoTitle);
        titleDescChecklist.appendChild(todoDescription);
        titleDescChecklist.appendChild(todoChecklist);

        leftTodo.appendChild(checkbox);
        leftTodo.appendChild(titleDescChecklist);

        rightTodo.appendChild(todoDueDate);
        rightTodo.appendChild(deleteTodo);
        rightTodo.appendChild(editTodo);

        todoDiv.appendChild(leftTodo);
        todoDiv.appendChild(rightTodo);

        todosDisplay.appendChild(todoDiv);

        saveProjects();
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

    setIsDialogOpen(true);

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

    function formatDate(date) {
        console.log("runnin");
        if (date === "") {
            return;
        }
        const defaultFormat = parse(date, "yyyy-MM-dd", new Date());
        const preferredFormat = format(defaultFormat, "dd/MM/yyyy");
        console.log(preferredFormat)
        return preferredFormat;
    }

    function submitted() {
        todo.title = titleInput.value;
        todo.description = descInput.value;
        todo.dueDate = formatDate(dueInput.value);
        todo.priority = isNaN(prioInput.value) ? "" : Number(prioInput.value);
        todo.checklist = listToObject(listInput.value);

        pushTodos(currentProject);
        dialog.close();
        setIsDialogOpen(false);
        submitButton.removeEventListener("click", submitted);
    }

    closeButton.addEventListener("click", closed);

    function closed() {
        dialog.close();
        setIsDialogOpen(false);
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

    isDialogOpen = true;

    titleInput.value = "";
    descInput.value = "";
    dueInput.value = "";
    prioInput.value = "";
    listInput.value = "";

    dialogTitle.textContent = "New To Do";
    submitButton.textContent = "Create";

    submitButton.addEventListener("click", submitted);

    function formatListInput(list) {
        if (list === "") {
            return undefined;
        }
        const array = list.split(",");
        const stripped = {};
        for (let i = 0; i < array.length; i++) {
            stripped[(_.trim(array[i]))] = false;
        }
        return stripped;
    }

    function formatDate(date) {
        if (date === "") {
            return;
        }
        const defaultFormat = parse(date, "yyyy-MM-dd", new Date());
        const preferredFormat = format(defaultFormat, "dd/MM/yyyy");
        return preferredFormat;
    }

    function submitted() {
        if (titleInput.value === "") {
            titleInput.value = "New To Do";
        }
        currentProject.addTodo(
            titleInput.value,
            descInput.value,
            formatDate(dueInput.value),
            isNaN(prioInput.value) ? "" : Number(prioInput.value),
            formatListInput(listInput.value)
        );
        pushTodos(currentProject);
        dialog.close();

        isDialogOpen = false;

        submitButton.removeEventListener("click", submitted);
    }

    closeButton.addEventListener("click", closed);

    function closed() {
        dialog.close();
        isDialogOpen = false;
        closeButton.removeEventListener("click", closed);
        submitButton.removeEventListener("click", submitted);
    }

}

export { pushTodos, editCurrentTodo, addNewTodo, isDialogOpen, setIsDialogOpen };
