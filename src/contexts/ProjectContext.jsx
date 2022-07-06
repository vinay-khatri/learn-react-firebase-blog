import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext'
import { withRouter } from 'react-router-dom'
import { v1 as uuidv1 } from 'uuid'
import { db } from '../firebase'
import firebase from 'firebase/app'

export const ProjectContext = createContext()

export const ProjectContextProvider = (props) => {

    const { isAuth, user } = useContext(AuthContext)

    const [projects, setProjects] = useState([])

    useEffect(() => {
        if (isAuth) {
            fetchProjects()
            console.time('fetched-project')
        } else {
            setProjects([])
        }
    }, [isAuth])

    const country = 'India'
    const state = 'Haryana'
    const city = 'Gohana'

    const projectDb = db.collection('projects').doc(`${country} ${state} ${city}`).collection('project')

    const getByTime = projectDb.orderBy('time', 'desc').limit(9)

    const getByLength = projectDb.orderBy('length').limit(9)

    const getByTitle = projectDb.orderBy('title').limit(9)


    // MOST IMPORTANT NOTE - 
    // This is the only way to fetch and render data properly.
    // use ur state hook right after then method
    // use map method instead of forEach
    // attach an id to each doc

    const fetchProjects = async () => {
        getByTime.get()
            .then(snap => {
                console.timeEnd('login-projectFetched')
                console.timeEnd('fetched-project')
                const projectList = snap.docs.map(doc => {
                    return ({ ...doc.data() })
                })
                setProjects(projectList)
            })
    }

    const addProject = (title, content) => {
        const project = {
            title: title,
            content: content,
            author: user.displayName,
            time: firebase.firestore.Timestamp.now(),
            keyword: title.trim().toLowerCase().split(' '),
            length: content.length,
            user_id: user.uid,
            id: uuidv1(),
        }
        setProjects([project, ...projects])
        props.history.push('/')
        db.collection('projects').doc(`${country} ${state} ${city}`).collection('project').doc(project.id).set(project)
            .catch(err => console.log(err))
    }


    const removeProject = (id) => {
        setProjects(projects.filter(project => project.id !== id))
        projectDb.doc(id).delete();
        props.history.push('/')
    }


    const searchProject = (value) => {
        projectDb.where("keyword", "array-contains", `${value.toLowerCase()}`).get()
            .then(snap => {
                setProjects(
                    snap.docs.map(doc => {
                        return ({ ...doc.data(), id: doc.id })
                    })
                )
            }).catch(err => console.log(err))
    }

    return (
        <ProjectContext.Provider value={{ projects, addProject, removeProject, searchProject }}>
            {props.children}
        </ProjectContext.Provider>
    )
}

export default withRouter(ProjectContextProvider)