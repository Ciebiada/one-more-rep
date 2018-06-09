import ReactEcharts from 'echarts-for-react'
import { object } from 'prop-types'
import { map, prop, pipe } from 'ramda'
import moment from 'moment'
import React, { Component } from 'react'
import * as exercises from '../../repositories/exercises'
import Layout from '../Layout'

class Exercise extends Component {
  state = {
    graphOption: null
  }

  async componentDidMount () {
    const {match: {params: {name}}} = this.props

    const weights = await exercises.find(name)

    const graphOption = {
      title: {
        text: 'Max weight by date'
      },
      tooltip: {},
      legend: {
        data: ['Max weight']
      },
      xAxis: {
        data: pipe(
          map(prop('key')),
          map(date => moment(date).format('YYYY-MM-DD'))
        )(weights.rows)
      },
      yAxis: {},
      series: [{
        name: 'Max weight',
        type: 'line',
        data: map(prop('value'))(weights.rows)
      }]
    }

    this.setState({graphOption})
  }

  render () {
    const {match: {params: {name}}} = this.props
    const {graphOption} = this.state

    return (
      <Layout
        title={name}
        subtitle='Eat, sleep, train, repeat 🏋️'
      >
        {graphOption && <ReactEcharts option={graphOption}/>}
        }
      </Layout>
    )
  }
}

Exercise.propTypes = {
  match: object.isRequired
}

export default Exercise
