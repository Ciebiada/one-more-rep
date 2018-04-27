import React, { Component } from 'react'
import moment from 'moment'

import { store } from '../db'

import Hero from './Hero'

class Workout extends Component {
  state = {
    workout: null
  }

  componentDidMount() {
    const workoutId = this.props.match.params.id

    this.getWorkout(workoutId)

    this.changes = store().changes({
      doc_ids: [workoutId],
      since: 'now',
      live: true
    }).on('change', () => this.getWorkout(workoutId))
  }

  componentWillUnmount() {
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

    console.log(workout)

    store().put({
      ...workout,
      _rev: null,
      _id: now,
      date: now
    }).then(created => {
      history.push(`/workout/${created.id}`)
    })
  }

  onNameChange = (evt) => {
    const id = this.state.workout._id
    const name = evt.target.value
    store().upsert(id, doc => ({ ...doc, name }))
  }

  onDateChange = (evt) => {
    const id = this.state.workout._id
    const date = moment(evt.target.value).toDate()
    store().upsert(id, doc => ({ ...doc, date }))
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
            className='button is-small'
            onClick={this.cloneWorkout}
          >
            Clone
          </a>
        </p>
        <p className='control'>
          <a
            className='button is-text is-small'
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
                <a className='button is-primary is-rounded' onClick={this.addWorkout}>Add Exercise</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Workout
