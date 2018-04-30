import PouchDBAuth from 'pouchdb-authentication'
import PouchDBUpsert from 'pouchdb-upsert'
import PouchDB from 'pouchdb'

PouchDB.plugin(PouchDBAuth)
PouchDB.plugin(PouchDBUpsert)

const dbHost = process.env.REACT_APP_DB_HOST

const remotedb = new PouchDB(`${dbHost}/db`)
const localdb = new PouchDB('local', { adapter: 'websql' })

export function signUp(login, password) {
  return remotedb.signUp(login, password)
}

export function signIn(login, password) {
  return remotedb
    .logIn(login, password)
    .then(() => {
      localdb.sync(`${dbHost}/userdb-${login}`)
    })
}

export function store() {
  return localdb
}

export function recall() {
  return remotedb.getSession()
}

export function signOut() {
  return remotedb.logOut()
}
