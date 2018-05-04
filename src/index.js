import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import { handleCallback } from './auth'

import 'bulma/css/bulma.css'
import './index.css'

import Workouts from './components/Workouts'
import Workout from './components/Workout'

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path='/index.html' component={Workouts} />
      <Route exact path='/' component={Workouts} />
      <Route path='/workout/:id' component={Workout} />
      <Route
        path="/callback"
        render={props => {
          handleCallback(props)
          return null
        }}
      />
    </div>
  </BrowserRouter>,
  document.getElementById('root'))

registerServiceWorker()
