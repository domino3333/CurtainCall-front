const AUTH_TOKEN_KEY = 'curtaincall.authToken'

export const authStorage = {
  isAuthenticated() {
    return Boolean(localStorage.getItem(AUTH_TOKEN_KEY))
  },
  setToken(token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  },
  clear() {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  },
}
