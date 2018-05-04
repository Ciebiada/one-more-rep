import PouchDBUpsert from 'pouchdb-upsert'
import PouchDB from 'pouchdb'

PouchDB.plugin(PouchDBUpsert)

// const dbHost = process.env.REACT_APP_DB_HOST
// const remotedb = new PouchDB(`${dbHost}/db`)

const localdb = new PouchDB('local', { adapter: 'websql' })

export function store () {
  return localdb
}
