import { currentProject } from "./domProjects";
import { isDialogOpen, pushTodos } from "./domTodos";


function fastTodo(e) {
    if (e.key === "a" && e.ctrlKey && !isDialogOpen) {
        e.preventDefault();
        const input = prompt("Input todo: ");

        if (input === "" || input === null) {
            return;
        }

        currentProject.addTodo(input, "", "", "", "", "");
        pushTodos(currentProject);
    }
}

export { fastTodo };
