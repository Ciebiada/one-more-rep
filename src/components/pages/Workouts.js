import { object } from 'prop-types'
import React, { Component } from 'react'
import * as workouts from '../../repositories/workouts'
import Layout from '../Layout'
import WorkoutsList from '../WorkoutsList'

class Workouts extends Component {
  state = {
    workouts: [],
    limit: 10,
    count: 0
  }

  componentDidMount () {
    this.getWorkouts()

    this.watching = workouts.watch(this.getWorkouts)
  }

  componentWillUnmount () {
    this.watching.cancel()
  }

  getWorkouts = () => {
    const {limit} = this.state

    workouts.findAll({limit}).then(({workouts, count}) => {
      this.setState({workouts, count})
    })
  }

  addWorkout = () => {
    const {history} = this.props

    workouts.create().then(({id}) => {
      history.push(`/workout/${id}`)
    })
  }

  deleteWorkout = (workout) => () => {
    workouts.remove(workout)
  }

  loadMore = () => {
    const {limit} = this.state
    this.setState({limit: Math.round(limit * 3 / 2)}, this.getWorkouts)
  }

  render () {
    const {workouts, limit, count} = this.state

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
          <WorkoutsList workouts={workouts}/>
          {limit < count && (
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
