import React, { Component } from 'react'
import * as exercises from '../../repositories/exercises'
import Layout from '../Layout'
import List from '../List'

const repsToString = reps =>
  reps === 1
    ? `1 time`
    : `${reps} times`

class Exercises extends Component {
  state = {
    exercises: []
  }

  componentDidMount () {
    exercises.findAll().then(exercises => {
      this.setState({exercises})
    })
  }

  componentWillUnmount () {
  }

  render () {
    const {exercises} = this.state

    return (
      <Layout
        title='Exercises'
        subtitle='Eat, sleep, train, repeat 🏋️'
      >
        <div>
          <List
            elements={exercises}
            columns={[
              {name: 'Name', value: exercise => exercise.key},
              {name: 'Sessions', value: exercise => repsToString(exercise.value)}
            ]}
            keyFunc={exercise => exercise.key}
            placeholder='You have no exercises yet. Start training!'
            link={exercise => `exercises/${exercise.key}`}
          />
        </div>
      </Layout>
    )
  }
}

export default Exercises
