import React, { Component } from 'react'
import moment from 'moment'
import { reject, map, addIndex } from 'ramda'

import { store } from '../db'

import Hero from './Hero'
import ExercisesList from './ExercisesList'

const updateInList = (list, id, update) =>
  addIndex(map)(
    (element, idx) => element._id === id
      ? { ...element, ...update(element, idx === list.length - 1) }
      : element,
    list
  )

class Workout extends Component {
  state = {
    workout: null
  }

  componentDidMount () {
    const workoutId = this.props.match.params.id

    this.getWorkout(workoutId)

    this.changes = store().changes({
      doc_ids: [workoutId],
      since: 'now',
      live: true
    }).on('change', () => this.getWorkout(workoutId))
  }

  componentWillUnmount () {
    this.changes.cancel()
  }

  getWorkout = (id) => {
    store().get(id).then(workout => this.setState({workout}))
  }

  deleteWorkout = () => {
    const { history } = this.props
    const { workout } = this.state

    store().remove(workout).then(() => {
      history.push('/')
    })
  }

  cloneWorkout = () => {
    const { history } = this.props
    const { workout } = this.state
    const now = new Date().toJSON()

    store()
      .put({
        ...workout,
        _rev: null,
        _id: now,
        date: now
      })
      .then(created => history.push('/'))
  }

  addExercise = () => {
    const { _id, exercises = [] } = this.state.workout
    const exercise = {
      _id: new Date().toJSON(),
      name: ''
    }

    store()
      .upsert(_id, doc => ({ ...doc, exercises: [...exercises, exercise] }))
      .then(() => this.addWorkSet(exercise._id)())
  }

  deleteExercise = id => () => {
    const { _id, exercises } = this.state.workout

    store().upsert(_id, doc => ({ ...doc, exercises: reject(({ _id }) => _id === id, exercises) }))
  }

  updateExercise = id => (props) => {
    const { _id, exercises } = this.state.workout

    store().upsert(_id, doc => ({
      ...doc,
      exercises: map(exercise => exercise._id === id ? { ...exercise, ...props } : exercise, exercises)
    }))
  }

  onNameChange = evt => {
    const id = this.state.workout._id
    const name = evt.target.value

    store().upsert(id, doc => ({ ...doc, name }))
  }

  onDateChange = evt => {
    const id = this.state.workout._id
    const date = moment(evt.target.value).toDate()

    store().upsert(id, doc => ({ ...doc, date }))
  }

  addWorkSet = exerciseId => () => {
    const { _id } = this.state.workout
    const workSet = {
      _id: new Date().toJSON()
    }

    store().upsert(_id, doc => ({
      ...doc,
      exercises: map(exercise => exercise._id === exerciseId ? { ...exercise, workSets: [...(exercise.workSets || []), workSet] } : exercise, doc.exercises)
    }))
  }

  deleteWorkSet = exerciseId => workSetId => {
    const { _id } = this.state.workout

    store().upsert(_id, doc => ({
      ...doc,
      exercises: updateInList(doc.exercises, exerciseId, exercise => ({
        workSets: reject(({_id}) => _id === workSetId, exercise.workSets)
      }))
    }))
  }

  updateWorkSet = exerciseId => workSetId => (props) => {
    const { _id } = this.state.workout

    store().upsert(_id, doc => ({
      ...doc,
      exercises: updateInList(doc.exercises, exerciseId, exercise => ({
        workSets: updateInList(exercise.workSets, workSetId, (workSet, last) => {
          if (last) this.addWorkSet(exerciseId)()
          const merged = {...workSet, ...props}
          if (!merged.reps && !merged.weight) this.deleteWorkSet(exerciseId)(workSetId)

          return props
        })
      }))
    }))
  }

  render () {
    const { workout } = this.state

    if (!workout) return null

    const title = (
      <input
        autoFocus={!workout.name}
        className='clear-input'
        type='text'
        value={workout.name || ''}
        onChange={this.onNameChange}
        placeholder='Workout name'
      />
    )

    const subtitle = (
      <input
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
      <div>
        <Hero
          title={title}
          subtitle={subtitle}
          meta={meta}
        />
        <section className='section'>
          <div className='container'>
            <div className='top-bar'>
              <div className='buttons is-centered'>
                <a className='button is-primary is-rounded' onClick={this.addExercise}>Add Exercise</a>
              </div>
            </div>
            <ExercisesList
              exercises={workout.exercises}
              onExerciseDelete={this.deleteExercise}
              onExerciseUpdate={this.updateExercise}
              updateWorkSet={this.updateWorkSet}
            />
          </div>
        </section>
      </div>
    )
  }
}

export default Workout
