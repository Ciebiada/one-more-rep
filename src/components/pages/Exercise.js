import ReactEcharts from 'echarts-for-react'
import moment from 'moment'
import { object } from 'prop-types'
import { map, max, pipe, prop, reduce } from 'ramda'
import React, { Component } from 'react'
import * as exercises from '../../repositories/exercises'
import Layout from '../Layout'

class Exercise extends Component {
  state = {
    maxWeightGraph: null,
    volumeGraph: null
  }

  async componentDidMount () {
    const {match: {params: {name}}} = this.props

    const sessions = await exercises.find(name)

    const maxWeights = pipe(
      map(prop('value')),
      map(prop('workSets')),
      map(pipe(
        map(prop('weight')),
        map(parseFloat),
        reduce(max, -Infinity)
      ))
    )(sessions.rows)

    const volume = pipe(
      map(prop('value')),
      map(prop('workSets')),
      map(reduce((acc, {reps, weight}) => (reps > 0 && weight > 0) ? acc + reps * weight : acc, 0))
    )(sessions.rows)

    const maxWeightGraph = {
      tooltip: {},
      legend: {
        data: ['Max weight']
      },
      xAxis: {
        data: pipe(
          map(prop('key')),
          map(date => moment(date).format('YYYY-MM-DD'))
        )(sessions.rows)
      },
      yAxis: {},
      series: [{
        name: 'Max weight',
        type: 'line',
        data: maxWeights
      }]
    }

    const volumeGraph = {
      tooltip: {},
      legend: {
        data: ['Volume']
      },
      xAxis: {
        data: pipe(
          map(prop('key')),
          map(date => moment(date).format('YYYY-MM-DD'))
        )(sessions.rows)
      },
      yAxis: {},
      series: [{
        name: 'Volume',
        type: 'line',
        data: volume
      }]
    }

    this.setState({maxWeightGraph, volumeGraph})
  }

  render () {
    const {match: {params: {name}}, history} = this.props
    const {maxWeightGraph, volumeGraph} = this.state

    return (
      <Layout
        title={name}
        subtitle='Eat, sleep, train, repeat 🏋️'
        history={history}
      >
        {maxWeightGraph && <ReactEcharts option={maxWeightGraph}/>}
        {volumeGraph && <ReactEcharts option={volumeGraph}/>}
      </Layout>
    )
  }
}

Exercise.propTypes = {
  match: object.isRequired,
  history: object.isRequired
}

export default Exercise
