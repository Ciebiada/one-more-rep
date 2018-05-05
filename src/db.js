import PouchDB from 'pouchdb'
import PouchDBUpsert from 'pouchdb-upsert'
import PouchDBFind from 'pouchdb-find'

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
    localDB.sync(remoteDB)
  }
}
