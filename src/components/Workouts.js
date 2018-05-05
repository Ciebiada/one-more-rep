import React, { Component } from 'react'

import { store } from '../db'

import Hero from './Hero'
import WorkoutsList from './WorkoutsList'

class Workouts extends Component {
  state = {
    workouts: []
  }

  componentDidMount () {
    this.getWorkouts()

    this.changes = store().changes({
      since: 'now',
      live: true
    }).on('change', this.getWorkouts)
  }

  componentWillUnmount () {
    this.changes.cancel()
  }

  getWorkouts = () => {
    store().createIndex({
      index: { fields: ['date'] }
    }).then(() => store().find({
      selector: { date: { $gte: null } },
      sort: [{ date: 'desc' }]
    })).then(({ docs }) => {
      this.setState({ workouts: docs })
    })
  }

  addWorkout = () => {
    const now = new Date().toJSON()
    store().put({
      _id: now,
      name: '',
      date: now
    })
  }

  deleteWorkout = (workout) => () => {
    store().remove(workout)
  }

  render () {
    const { workouts } = this.state

    return (
      <div>
        <Hero
          title='Workouts'
          subtitle='Eat, sleep, train, repeat 🏋️'
        />
        <section className='section'>
          <div className='container'>
            <div className='top-bar'>
              <div className='buttons is-centered'>
                <a className='button is-primary is-rounded' onClick={this.addWorkout}>Add Workout</a>
              </div>
            </div>
            <WorkoutsList workouts={workouts} />
          </div>
        </section>
      </div>
    )
  }
}

export default Workouts
