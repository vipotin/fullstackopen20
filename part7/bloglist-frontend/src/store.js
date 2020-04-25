import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogListReducer from './reducers/blogListReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogListReducer
})
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store