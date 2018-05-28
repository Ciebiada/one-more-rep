import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import PouchDBUpsert from 'pouchdb-upsert'

PouchDB.plugin(PouchDBUpsert)
PouchDB.plugin(PouchDBFind)

export const db = new PouchDB('local')

sync()

export function store () {
  return db
}

export function sync () {
  const couchUrl = localStorage.getItem('couchDB')

  if (couchUrl !== null) {
    const couch = new PouchDB(couchUrl)
    db.sync(couch, { live: true, retry: true })
  }
}
