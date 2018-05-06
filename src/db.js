import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import PouchDBUpsert from 'pouchdb-upsert'

PouchDB.plugin(PouchDBUpsert)
PouchDB.plugin(PouchDBFind)

const localDB = createDB()

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

function createDB () {
  const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)

  if (!iOS) return new PouchDB('local')

  let local
  try {
    // this is for ios
    local = new PouchDB('local', { adapter: 'websql' })
  } catch (err) {
    // this is for private mode in safari
    local = new PouchDB('local', { adapter: 'idb' })
  }

  return local
}
