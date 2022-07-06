import React, { useContext } from 'react';
import { ProjectContext } from '../../contexts/ProjectContext';
import { AuthContext } from '../../contexts/AuthContext';
import moment from 'moment'

export const ProjectDetails = (props) => {

    const { projects, removeProject } = useContext(ProjectContext)
    const { user } = useContext(AuthContext)

    const id = props.match.params.id;

    const project = projects.find(project => {
        return project.id === id
    })

    const deleteProject = (e) => {
        removeProject(project.id)
    }

    return (
        <div className="project-details section container">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title grey-text text-lighten-1">{project.title}</span>
                    <p className="grey-text text-lighten-1">{project.content}</p>
                </div>
                <div className="card-action grey darken-3">
                    <div className="grey-text text-darken-1">Posted By {project.author}</div>
                    <div className="grey-text text-darken-1">{moment(project.time.toDate()).calendar()}</div>
                    {user.uid === project.user_id ? <div className="btn-small delete-btn" onClick={deleteProject}>Delete</div> : <div></div>}
                </div>
            </div>
        </div>
    )
};

export default ProjectDetails;