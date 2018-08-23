import Auth0Lock from 'auth0-lock'

const clientId = 'KP7MSlvT8TNjPygVA7AvUCkRFxgt3EUj'
const domain = 'one-more-rep.auth0.com'
const options = {
  autoclose: true,
  auth: {
    redirect: false,
  }
}

const lock = new Auth0Lock(clientId, domain, options)

export const login = history => () => {
  lock.on('authenticated', ({accessToken}) => {
    lock.getUserInfo(accessToken, (error, profile) => {
      localStorage.setItem('couchDB', profile['https://ciebiada.com/couchDB'])
      history.replace('/')
    })
  })

  lock.show()
}

export const logout = () => {
  localStorage.removeItem('couchDB')
}

export const isAuthenticated = () => {
  const couchDB = localStorage.getItem('couchDB')
  return couchDB !== null
}
