import moment from 'moment'
import { object } from 'prop-types'
import React, { Component } from 'react'
import * as workouts from '../../repositories/workouts'
import ExercisesList from '../ExercisesList'
import Input from '../Input'
import Layout from '../Layout'

class Workout extends Component {
  state = {
    workout: null
  }

  componentDidMount () {
    const id = this.props.match.params.id

    this.getWorkout(id)

    this.watching = workouts.watchWorkout(id)(this.getWorkout)
  }

  componentWillUnmount () {
    this.watching.cancel()
  }

  getWorkout = id => {
    workouts.find(id).then(workout => this.setState({workout}))
  }

  deleteWorkout = () => {
    const {history} = this.props
    const {workout} = this.state

    workouts.remove(workout).then(() => {
      history.push('/')
    })
  }

  cloneWorkout = () => {
    const {history} = this.props
    const {workout} = this.state

    workouts.clone(workout).then(created => history.push('/'))
  }

  addExercise = () => {
    workouts.addExercise(this.state.workout)
  }

  deleteExercise = id => () => {
    workouts.removeExercise(this.state.workout)(id)
  }

  updateExercise = id => props => {
    workouts.updateExercise(this.state.workout)(id)(props)
  }

  onNameChange = name => {
    workouts.updateWorkout(this.state.workout)({name})
  }

  onDateChange = dateString => {
    const date = moment(dateString).toDate()

    workouts.updateWorkout(this.state.workout)({date})
  }

  addWorkSet = exerciseId => () => {
    workouts.addWorkSet(this.state.workout)(exerciseId)
  }

  deleteWorkSet = exerciseId => id => {
    workouts.removeWorkSet(this.state.workout)(exerciseId)(id)
  }

  updateWorkSet = exerciseId => id => props => {
    workouts.updateWorkSet(this.state.workout)(exerciseId)(id)(props)
  }

  render () {
    const {workout} = this.state

    if (!workout) return null

    const title = (
      <Input
        autoFocus={!workout.name}
        className='clear-input'
        type='text'
        value={workout.name || ''}
        onChange={this.onNameChange}
        placeholder='Workout name'
      />
    )

    const subtitle = (
      <Input
        className='clear-input'
        type='datetime-local'
        value={moment(workout.date).format('YYYY-MM-DDTHH:mm')}
        onChange={this.onDateChange}
      />
    )

    const meta = (
      <div className='field is-grouped'>
        <p className='control'>
          <a
            className='button is-inverted is-small'
            onClick={this.cloneWorkout}
          >
            Clone
          </a>
        </p>
        <p className='control'>
          <a
            className='button is-inverted is-danger is-small'
            onClick={this.deleteWorkout}
          >
            Delete
          </a>
        </p>
      </div>
    )

    return (
      <Layout
        title={title}
        subtitle={subtitle}
        meta={meta}
      >
        <div>
          <div className='top-bar'>
            <div className='buttons is-centered'>
              <a className='button is-primary' onClick={this.addExercise}>Add Exercise</a>
            </div>
          </div>
          <ExercisesList
            exercises={workout.exercises}
            onExerciseDelete={this.deleteExercise}
            onExerciseUpdate={this.updateExercise}
            updateWorkSet={this.updateWorkSet}
          />
        </div>
      </Layout>
    )
  }
}

Workout.propTypes = {
  history: object.isRequired,
  match: object.isRequired
}

export default Workout
