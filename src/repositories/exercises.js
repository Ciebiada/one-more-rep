import { forEach, sort, prop, descend } from 'ramda'
import { db } from '../db'

export const findAll = async () => {
  return db
    .query({
      map (doc, emit) {
        forEach(exercise => emit(exercise.name), doc.exercises)
      },
      reduce: '_count'
    }, {reduce: true, group: true})
    .then(({rows}) => sort(descend(prop('value')), rows))
}
