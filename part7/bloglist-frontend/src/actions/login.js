export const setUser = (userData) => {
  return { type: 'SET_USER', data: userData }
}

export const logout = (userData) => {
  return { type: 'LOGIN', data: userData }
}