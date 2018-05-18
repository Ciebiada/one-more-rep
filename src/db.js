import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import PouchDBUpsert from 'pouchdb-upsert'

PouchDB.plugin(PouchDBUpsert)
PouchDB.plugin(PouchDBFind)

const localDB = new PouchDB('local')

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
