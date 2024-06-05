import "../sass/style.sass";
import { Project, projects } from "./index";

"use strict";

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
