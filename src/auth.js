import Auth0 from 'auth0-js'
import { sync } from './db'

const auth0 = new Auth0.WebAuth({
  domain: 'one-more-rep.auth0.com',
  clientID: 'KP7MSlvT8TNjPygVA7AvUCkRFxgt3EUj',
  redirectUri: 'https://ciebiada.github.io/one-more-rep/callback',
  audience: 'https://one-more-rep.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid'
})

export function login () {
  auth0.authorize()
}

export function logout () {
  localStorage.removeItem('couchDB')
}

export function isAuthenticated () {
  const couchDB = localStorage.getItem('couchDB')
  return couchDB !== null
}

export function handleCallback ({history, location}) {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth0.parseHash((_, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult)
        sync()
      }

      history.replace('/')
    })
  }
}

function setSession (authResult) {
  localStorage.setItem('couchDB', authResult.idTokenPayload['https://ciebiada.com/couchDB'])
}
