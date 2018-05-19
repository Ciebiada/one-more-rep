import { isEmpty, forEach, sortBy, prop, last } from 'ramda'
import React, { Component } from 'react'
import { store } from '../db'
import Layout from './Layout'

class Stats extends Component {
  state = {
    workoutsCount: 0,
    favWorkout: 'Unnamed',
    favExercise: 'Unnamed'
  }

  componentDidMount () {
    // TODO: this doesn't really work as it count indices as well.
    // Potential solution would be to prefix workout ids
    store().allDocs().then(({total_rows: totalRows}) => this.setState({ workoutsCount: totalRows - 1 }))

    store()
      .query({
        map (doc, emit) {
          emit(doc.name)
        },
        reduce: '_count'
      }, { reduce: true, group: true })
      .then(result => {
        if (!isEmpty(result.rows)) {
          const favWorkout = last(sortBy(prop('value'))(result.rows)).key
          if (favWorkout) {
            this.setState({favWorkout})
          }
        }
      })

    store()
      .query({
        map (doc, emit) {
          forEach(exercise => {
            emit(exercise.name)
          }, doc.exercises || [])
        },
        reduce: '_count'
      }, { reduce: true, group: true })
      .then(result => {
        if (!isEmpty(result.rows)) {
          const favExercise = last(sortBy(prop('value'))(result.rows)).key
          if (favExercise) {
            this.setState({favExercise})
          }
        }
      })
  }

  render () {
    const {workoutsCount, favWorkout, favExercise} = this.state

    return (
      <Layout
        title="Stats"
        subtitle="Eat, sleep, train, repeat 🏋️"
      >
        <div>
          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Workouts</p>
                <p className="title">{workoutsCount}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Fav workout</p>
                <p className="title">{favWorkout}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Fav exercise</p>
                <p className="title">{favExercise}</p>
              </div>
            </div>
          </nav>
        </div>
      </Layout>
    )
  }
}

Stats.propTypes = {
}

export default Stats
