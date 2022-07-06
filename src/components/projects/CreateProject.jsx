import React, { useState, useContext } from 'react';
import { ProjectContext } from '../../contexts/ProjectContext'
import M from "materialize-css"


export const CreateProject = (props) => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const { addProject } = useContext(ProjectContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        addProject(title, content)
        setTitle('')
        setContent('')
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="blue-grey darken-3">
                <h5 className="grey-text text-lighten-1">New Post</h5>
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" pattern="^[\w\s'@]{2,40}$" id="title" value={title} onChange={e => setTitle(e.target.value)} required autoComplete='off' />
                </div>
                <div className="input-field">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" pattern="^[\w\s'@.]{2,440}$" className="materialize-textarea" value={content} onChange={e => setContent(e.target.value)} required></textarea>
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Create</button>
                </div>
            </form>
        </div>
    )
};

export default CreateProject;
