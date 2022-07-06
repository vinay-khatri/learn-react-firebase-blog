import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ProjectContext } from '../../contexts/ProjectContext';
import { Link } from 'react-router-dom'
import { SearchProject } from './SearchProject'
import moment from 'moment'
// Note - react doesn't allow raw time in miliseconds to render
// So using moment package to format time into desired format

export const ProjectList = (props) => {

    // const localUser = JSON.parse(sessionStorage.getItem('user'))
    const { user } = useContext(AuthContext)
    const { projects } = useContext(ProjectContext)

    return (
        <div className="project-list section">
            <SearchProject />
            { user ? React.Children.toArray(
                projects && projects.map(project => {
                    return <Link to={'/project/' + project.id} ><ProjectCard project={project} /></Link>
                })
            ) : <DummyCard />}
        </div>
    )
};

export const ProjectCard = ({ project }) => {

    return (
        <div className="card z-depth-1 project-card">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title grey-text text-lighten-1 ">{project.title}</span>
                <p className='grey-text name '>Posted by {project.author}</p>
                <p className='grey-text '>{moment(project.time.toDate()).calendar()}</p>
            </div>
        </div>
    );
};

export const DummyCard = (props) => {

    const localUser = JSON.parse(sessionStorage.getItem('user'))

    return (
        <React.Fragment>
            {
                localUser ? <div></div> :
                    <div className="dummy-card card z-depth-1">
                        <div className="card-content">
                            <span className="card-title grey-text">Login to Read Posts</span>
                        </div>
                    </div>
            }
        </React.Fragment>
    )
}

export default ProjectList;