export const initializeBlogs = (list) => {
  return { type: 'INIT_BLOGS', data: list }
}

export const addBlog = (blog) => {
  return { type: 'NEW_BLOG', data:blog }
}