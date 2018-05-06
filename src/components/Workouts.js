import React, { Component } from 'react'

import { store } from '../db'

import Hero from './Hero'
import WorkoutsList from './WorkoutsList'

class Workouts extends Component {
  state = {
    workouts: [],
    limit: 10,
    totalRows: 0
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
    const { limit } = this.state

    store().allDocs().then(({ total_rows }) => this.setState({ totalRows: total_rows }))

    store().createIndex({
      index: { fields: ['date'] }
    }).then(() => store().find({
      limit,
      selector: { date: { $gte: null } },
      sort: [{ date: 'desc' }]
    })).then(({ docs: workouts }) => {
      this.setState({ workouts })
    })
  }

  addWorkout = () => {
    const now = new Date().toJSON()
    const { history } = this.props

    store().put({
      _id: now,
      name: '',
      date: now
    }).then(({id}) => {
      history.push(`/workout/${id}`)
    })
  }

  deleteWorkout = (workout) => () => {
    store().remove(workout)
  }

  loadMore = () => {
    const { limit } = this.state
    this.setState({ limit: Math.round(limit * 3 / 2) }, this.getWorkouts)
  }

  render () {
    const { workouts, limit, totalRows } = this.state

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
            {limit < totalRows && (
              <div className='buttons is-centered'>
                <a className='button is-light is-small' onClick={this.loadMore}>Load more</a>
              </div>
            )}
          </div>
        </section>
      </div>
    )
  }
}

export default Workouts
