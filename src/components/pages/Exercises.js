import React, { Component } from 'react'
import Layout from '../Layout'
import * as exercises from '../../repositories/exercises'
import List from '../List'

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
    const { exercises } = this.state

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
              {name: 'Sessions', value: exercise => `#${exercise.value}`}
            ]}
            keyFunc={exercise => exercise.key}
            placeholder='You have no exercises yet. Start training!'
          />
        </div>
      </Layout>
    )
  }
}

export default Exercises
