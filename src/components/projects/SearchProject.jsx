import React, { useState, useContext } from 'react';
import { ProjectContext } from '../../contexts/ProjectContext'
import M from "materialize-css"


export const SearchProject = () => {

    const { searchProject } = useContext(ProjectContext)

    const [search, setSearch] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        searchProject(search)
        setSearch('')
    }

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <label htmlFor="search">Search</label>
                    <input type="text" id="search" value={search} onChange={e => setSearch(e.target.value)} required autoComplete='off' />
                </div>
            </form>
        </div>
    )
};

export default SearchProject;