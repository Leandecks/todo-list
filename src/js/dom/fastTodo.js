import { currentProject } from "./domProjects";
import { pushTodos } from "./domTodos";


function fastTodo(e) {
    if (e.key === "a" && e.ctrlKey) {
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
