/* eslint-disable jsx-a11y/href-no-hash */
import { Switch, Route } from 'react-router-dom'
import React from 'react'

import ALinkOut from '../pages/ALinkOut'
import docscan from '../pages/Docscan'
import GroupType from '../pages/GroupType'
import List from '../pages/List'
import Login from '../pages/Login'
import Notfound from '../pages/Notfound'

// import Project from '../pages/Project'
// import Post from '../pages/Post'
// import About from '../pages/About'
// import Login from '../pages/Login'
// import Show from '../pages/Show'

export default () => (
  <Switch>
    <Route exact path="/" component={docscan} />
    <Route exact path="/list" component={List} />
    <Route exact path="/type" component={GroupType} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/link/:username/:password/:hn/:orgid" component={ALinkOut} />
    <Route exact path="*" component={Notfound}/>
    {/* <Route exact path="/about" component={About} />
    <Route exact path="/projects" component={Project} />
    <Route exact path="/posts" component={Post} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/show" component={Show} /> */}
  </Switch>
)
