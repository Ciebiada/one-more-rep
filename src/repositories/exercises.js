import { descend, forEach, map, max, pipe, prop, reduce, sort } from 'ramda'
import { db } from '../db'

export const findAll = () => db
  .query({
    map (doc, emit) {
      forEach(exercise => emit(exercise.name), doc.exercises)
    },
    reduce: '_count'
  }, {reduce: true, group: true})
  .then(({rows}) => sort(descend(prop('value')), rows))

export const find = name => db
  .query({
    map (doc, emit) {
      forEach(exercise => {
        if (exercise.name === name) {
          const maxWeight = pipe(
            map(prop('weight')),
            reduce(max, -Infinity)
          )

          emit(doc.date, maxWeight(exercise.workSets))
        }
      }, doc.exercises)
    }
  })
