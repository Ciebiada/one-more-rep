import 'bulma/css/bulma.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Exercise from './components/pages/Exercise'
import Exercises from './components/pages/Exercises'
import Workout from './components/pages/Workout'
import Workouts from './components/pages/Workouts'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div>
      <Route exact path="/" component={Workouts}/>
      <Route path="/workouts/:id" component={Workout}/>
      <Route exact path="/exercises" component={Exercises}/>
      <Route path="/exercises/:name" component={Exercise}/>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)

registerServiceWorker()
