import { object } from 'prop-types'
import React, { Component } from 'react'
import * as exercises from '../../repositories/exercises'
import Layout from '../Layout'

class Exercise extends Component {
  state = {
    weights: null
  }

  async componentDidMount () {
    const {match: {params: {name}}} = this.props

    const weights = await exercises.find(name)
    this.setState({weights})
  }

  render () {
    const {match: {params: {name}}} = this.props

    return (
      <Layout
        title={name}
        subtitle='Eat, sleep, train, repeat 🏋️'
      >
        <div>
        </div>
      </Layout>
    )
  }
}

Exercise.propTypes = {
  match: object.isRequired
}

export default Exercise
