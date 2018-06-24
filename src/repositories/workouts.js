import { addIndex, map, reject } from 'ramda'
import { db } from '../db'

const updateInList = (id, update, list) =>
  addIndex(map)(
    (element, idx) => element._id === id
      ? {...element, ...update(element, idx === list.length - 1)}
      : element,
    list
  )

export const create = () => {
  const now = new Date().toJSON()

  return db.put({
    _id: now,
    name: '',
    date: now
  })
}

export const remove = workout => {
  return db.remove(workout)
}

export const findAll = async ({limit}) => {
  await db.createIndex({index: {fields: ['date']}})

  const {total_rows: totalRows} = await db.allDocs()
  const count = totalRows - 1

  const {docs: workouts} = await db.find({
    limit,
    selector: {date: {$gte: null}},
    sort: [{date: 'desc'}]
  })

  return {workouts, count}
}

export const find = id => {
  return db.get(id)
}

export const updateWorkout = workout => props => {
  return db.upsert(workout._id, doc => ({...doc, ...props}))
}

export const clone = workout => {
  const now = new Date().toJSON()

  return db.put({
    ...workout,
    exercises: workout.exercises.map(exercise => ({
      ...exercise,
      workSets: exercise.workSets.map(workSet => ({...workSet, reps: null}))
    })),
    _rev: null,
    _id: now,
    date: now
  })
}

export const addWorkSet = workout => exerciseId => {
  const workSet = {
    _id: new Date().toJSON()
  }

  return db.upsert(workout._id, doc => ({
    ...doc,
    exercises: updateInList(exerciseId, exercise => ({workSets: [...(exercise.workSets || []), workSet]}), doc.exercises)
  }))
}

export const removeWorkSet = workout => exerciseId => workSetId => {
  return db.upsert(workout._id, doc => ({
    ...doc,
    exercises: updateInList(exerciseId, exercise => ({
      workSets: reject(({_id}) => _id === workSetId, exercise.workSets)
    }), doc.exercises)
  }))
}

export const updateWorkSet = workout => exerciseId => id => props => {
  return db.upsert(workout._id, doc => ({
    ...doc,
    exercises: updateInList(exerciseId, exercise => ({
      workSets: updateInList(id, (workSet, last) => {
        if (last) addWorkSet(workout)(exerciseId)
        return props
      }, exercise.workSets)
    }), doc.exercises)
  }))
}

export const addExercise = workout => {
  const exercise = {
    _id: new Date().toJSON(),
    name: ''
  }

  return db
    .upsert(workout._id, doc => ({...doc, exercises: [...(workout.exercises || []), exercise]}))
    .then(() => addWorkSet(workout)(exercise._id))
}

export const removeExercise = workout => id => {
  return db.upsert(workout._id, doc => ({...doc, exercises: reject(({_id}) => _id === id, workout.exercises)}))
}

export const updateExercise = workout => id => props => {
  return db.upsert(workout._id, doc => ({
    ...doc,
    exercises: map(exercise => exercise._id === id ? {...exercise, ...props} : exercise, workout.exercises)
  }))
}

export const watch = callback => {
  return db.changes({
    since: 'now',
    live: true
  }).on('change', callback)
}

export const watchWorkout = id => callback => {
  return db.changes({
    doc_ids: [id],
    since: 'now',
    live: true
  }).on('change', () => callback(id))
}
