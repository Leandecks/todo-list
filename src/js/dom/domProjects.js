import { Project, projects } from "../project";
import { pushTodos, setIsDialogOpen} from "./domTodos";
import { saveProjects } from "./localStorage";

let currentProject = projects[0];

function setCurrentProject(value) {
    currentProject = value;
}

function pushProject(project) {

    let deleted = false;

    const projectsDisplay = document.querySelector(".projects");
    const projectParWrapper = document.createElement("div");
    const projectPar = document.createElement("p");
    projectParWrapper.appendChild(projectPar);
    projectPar.textContent = project.title;

    const editProject = document.createElement("i");
    editProject.classList.add("nf");
    editProject.classList.add("nf-md-square_edit_outline");
    editProject.style.display = "none";
    editProject.addEventListener("click", () => {
       editCurrentProject(project);
    });
    projectParWrapper.appendChild(editProject);

    const deleteProject = document.createElement("i");
    deleteProject.classList.add("nf");
    deleteProject.classList.add("nf-md-delete");
    deleteProject.style.display = "none";
    deleteProject.addEventListener("click", () => {

        if (projects.length > 1) {
            projectPar.remove();

            for (let i = 0; i < projects.length; i++) {
                if (projects[i].title === project.title) {
                    projects.splice(i, 1);
                }
            }

            if (currentProject === project) {
                selectProject(projects[0]);
            }

            deleted = true;
        }

    });
    projectParWrapper.appendChild(deleteProject);

    projectPar.addEventListener("mouseenter", () => {
        deleteProject.style.display = "inline";
        editProject.style.display = "inline";
    });

    projectPar.addEventListener("mouseleave", () => {
        deleteProject.style.display = "none";
        editProject.style.display = "none";
    });

    projectsDisplay.appendChild(projectParWrapper);

    selectProject(project);

    projectPar.addEventListener("click", () => {
        if (!deleted) {
            selectProject(project);
        }
    });

    saveProjects();

}

function selectProject(project) {

    const projectsDisplay = document.querySelector(".projects");
    const todosDisplay = document.querySelector(".todos");

    for (const par of projectsDisplay.children) {
        if (par.style.fontWeight === "bold") {
            par.style.fontWeight = "normal";
        }
    }

    setCurrentProject(project);

    for (const par of projectsDisplay.children) {
        if (par.textContent === project.title) {
            par.style.fontWeight = "bold";
        }
    }

    todosDisplay.textContent = "";
    pushTodos(project);

}

function editCurrentProject(project) {

    const projectsDisplay = document.querySelector(".projects");
    const dialog = document.querySelector(".project-dialog");
    const dialogTitle = document.querySelector(".project-dialog-title");
    const titleInput = document.querySelector("#project-title");
    const submitButton = document.querySelector(".project-submit");
    const closeButton = document.querySelector(".project-close");

    dialogTitle.textContent = "Edit Project";
    submitButton.textContent = "Update";
    titleInput.value = project.title;
    dialog.showModal();
    setIsDialogOpen(true);

    submitButton.addEventListener("click", submitted);

    function submitted() {
        const pars = projectsDisplay.children
        const projectName = project.title;

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].title === project.title) {
                project.title = titleInput.value;
            }
        }

        saveProjects();

        for (let i = 0; i < pars.length; i++) {
            if (pars[i].textContent === projectName) {
                pars[i].textContent = titleInput.value;
            }
        }


        dialog.close();
        setIsDialogOpen(false);
        submitButton.removeEventListener("click", submitted);
        location.reload();
    }

    closeButton.addEventListener("click", closed);

    function closed() {
        dialog.close();
        setIsDialogOpen(false);
        submitButton.removeEventListener("click", submitted);
        closeButton.removeEventListener("click", closed);
    }

}

function addNewProject() {

    const dialog = document.querySelector(".project-dialog");
    const dialogTitle = document.querySelector(".project-dialog-title");
    const titleInput = document.querySelector("#project-title");
    const submitButton = document.querySelector(".project-submit");
    const closeButton = document.querySelector(".project-close");

    dialogTitle.textContent = "New Project";
    submitButton.textContent = "Create";
    titleInput.value = "";
    dialog.showModal();
    setIsDialogOpen(true);

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
        setIsDialogOpen(false);

        submitButton.removeEventListener("click", submitted);
    }

    closeButton.addEventListener("click", closed)

    function closed() {
        dialog.close();
        setIsDialogOpen(false);
        submitButton.removeEventListener("click", submitted);
        closeButton.removeEventListener("click", closed);
    }

}

export { currentProject, pushProject, selectProject, addNewProject, setCurrentProject };
