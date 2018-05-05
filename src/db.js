import PouchDB from 'pouchdb'
import PouchDBUpsert from 'pouchdb-upsert'
import PouchDBFind from 'pouchdb-find'
import { map, forEach, addIndex, sortBy, prop } from 'ramda'

PouchDB.plugin(PouchDBUpsert)
PouchDB.plugin(PouchDBFind)

const localDB = new PouchDB('local', { adapter: 'websql' })

sync()

export function store () {
  return localDB
}

export function sync () {
  const couchDB = localStorage.getItem('couchDB')
  if (couchDB) {
    const remoteDB = new PouchDB(couchDB)
    localDB.sync(remoteDB, { live: true, retry: true })
  }
}

window.importFromHeroku = (workouts) => {
  addIndex(forEach)((workout, idx) => {
    if (!workout.when) return

    const w = {
      _id: new Date().toJSON() + idx,
      name: workout.name,
      date: workout.when,
      exercises: addIndex(map)((exercise, idx) => ({
        _id: new Date().toJSON() + idx,
        name: exercise.name,
        workSets: addIndex(map)((workSet, idx) => ({
          _id: new Date().toJSON() + idx,
          weight: workSet.weight,
          reps: workSet.reps
        }), exercise.work_sets)
      }), sortBy(prop('updated_at'), workout.exercises))
    }

    localDB.put(w)
  }, workouts)
}
