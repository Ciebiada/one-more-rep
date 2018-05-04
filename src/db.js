import PouchDBUpsert from 'pouchdb-upsert'
import PouchDB from 'pouchdb'

PouchDB.plugin(PouchDBUpsert)

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
