import Project from "./project";

function AppController(){
    const projects = [];
    let currentProject = null;

    function addProject(projectTitle){
        const project = Project(projectTitle);
        projects.push(project);
    }

    function deleteProject(projectID){
        for(let i = 0; i < projects.length; i++){
            if(projects[i].getProjectID() === projectID){
                projects.splice(i, 1);
                break;
            }
        }
    }

    function getCurrentProject(){
        return currentProject;
    }

    function setCurrentProject(project){
        currentProject = project;
    }

    return {
        addProject,
        deleteProject,
        getCurrentProject,
        setCurrentProject
    }
}

export default AppController;