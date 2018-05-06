import 'bulma/css/bulma.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { handleCallback } from './auth'
import Workout from './components/Workout'
import Workouts from './components/Workouts'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div>
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
