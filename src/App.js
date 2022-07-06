import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Navbar } from './components/layout/Navbar'

import AuthContextProvider from './contexts/AuthContext'
import ProjectContextProvider from './contexts/ProjectContext'

const Account = React.lazy(() => import('./components/account/Account'))
const SignIn = React.lazy(() => import('./components/auth/SignIn'))
const SignUp = React.lazy(() => import('./components/auth/SignUp'))
const SignUpDetails = React.lazy(() => import('./components/auth/SignUp').then(m => ({ default: m.OtherComponent })))
const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'))
const LoadingScreen = React.lazy(() => import('./components/layout/Loading'))
const CreateProject = React.lazy(() => import('./components/projects/CreateProject'))
const ProjectDetails = React.lazy(() => import('./components/projects/ProjectDetails'))


function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <AuthContextProvider>
                    <Navbar />
                    <ProjectContextProvider>
                        <React.Suspense fallback={<div></div>}>
                            <Switch>
                                <Route exact path='/' component={Dashboard} />
                                <Route path='/project/:id' component={ProjectDetails} />
                                <Route path='/create' component={CreateProject} />
                                <Route path='/signin' component={SignIn} />
                                <Route path='/signup' component={SignUp} />
                                <Route path='/account' component={Account} />
                                <Route path='/redirecting' component={LoadingScreen} />
                                <Route path='/signup' component={SignUp} />
                                <Route path='/signup-details' component={SignUpDetails} />
                            </Switch>
                        </React.Suspense>
                    </ProjectContextProvider>
                </AuthContextProvider>
            </div>
        </BrowserRouter>
    )
}

export default App;
