export const initializeBlogs = (list) => {
  return { type: 'INIT_BLOGS', data: list }
}

export const addBlog = (blog) => {
  return { type: 'NEW_BLOG', data:blog }
}

export const addLike = (blog) => {
  return { type: 'NEW_LIKE', data:blog }
}

export const deleteBlog = (blog) => {
  return { type: 'DELETE_BLOG', data: blog}
}