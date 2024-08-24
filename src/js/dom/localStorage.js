import { Project, projects, setProjects } from "../project";
import { pushProject, selectProject} from "./domProjects";
import { defaultProject } from "./examples"

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {

    if (localStorage.getItem("projects")) {

        const newProjects = [];
        const storedProjects = JSON.parse(localStorage.getItem("projects"));

        setProjects([]);

        storedProjects.forEach(proj => {
            const newProj = Project(proj.title);
            proj.todos.forEach(todo => {
                newProj.addTodo(todo.title, todo.description, todo.dueDate, todo.priority, todo.checklist, todo.completed);
            });
            newProjects.push(newProj);
        });

        newProjects.forEach(newProject => {
            pushProject(newProject);
        });

        setProjects(newProjects);
        selectProject(projects[0]);

    } else {
        pushProject(defaultProject);
    }

}

export { saveProjects, loadProjects };
