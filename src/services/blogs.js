import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request =  await axios.get(baseUrl)
  return request.data
}

const getItem = async object => {
  const request = await axios.get(`${baseUrl}/${object.id}`)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updatedObject => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
  return response.data
}

const deleteItem = async object => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${object.id}`, config)
  return response.data
}

export default { getAll, create, setToken, update, deleteItem, getItem }