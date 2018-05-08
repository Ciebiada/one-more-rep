import { object } from 'prop-types'
import React, { Component } from 'react'
import { store } from '../db'
import Layout from './Layout'
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

    store().allDocs().then(({ total_rows: totalRows }) => this.setState({ totalRows }))

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
    const { history } = this.props
    const now = new Date().toJSON()

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
      <Layout
        title='Workouts'
        subtitle='Eat, sleep, train, repeat 🏋️'
      >
        <div>
          <div className='top-bar'>
            <div className='buttons is-centered'>
              <a className='button is-primary' onClick={this.addWorkout}>Add Workout</a>
            </div>
          </div>
          <WorkoutsList workouts={workouts} />
          {limit < totalRows && (
            <div className='buttons is-centered'>
              <a className='button is-light is-small' onClick={this.loadMore}>Load more</a>
            </div>
          )}
        </div>
      </Layout>
    )
  }
}

Workouts.propTypes = {
  history: object.isRequired
}

export default Workouts
