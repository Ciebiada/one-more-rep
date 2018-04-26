import PouchDBAuth from 'pouchdb-authentication'
import PouchDBUpsert from 'pouchdb-upsert'
import PouchDB from 'pouchdb'

PouchDB.plugin(PouchDBAuth)
PouchDB.plugin(PouchDBUpsert)

const remotedb = new PouchDB('http://localhost:5984/db')
const localdb = new PouchDB('local')

export function signUp(login, password) {
  return remotedb.signUp(login, password)
}

export function signIn(login, password) {
  return remotedb
    .logIn(login, password)
    .then(() => {
      localdb.sync(`http://localhost:5984/userdb-${login}`)
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
