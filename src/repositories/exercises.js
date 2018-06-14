import { any, descend, forEach, prop, has, sort } from 'ramda'
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
        if (exercise.name === name && any(has('weight'), exercise.workSets)) {
          emit(doc.date, exercise)
        }
      }, doc.exercises)
    }
  })
