export const initializeUsers = (list) => {
  console.log(list)
  return { type: 'INIT_USERS', data: list }
}