const graphqlUrl = `${process.env.NEXTAUTH_URL}/api/graphql`

export async function fetchData(query) {
  const res = await fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })
  if (!res.ok) return Promise.reject(res)
  const resBody = await res.json()
  if (resBody.errors) return Promise.reject(resBody.errors[0])
  return Promise.resolve(resBody.data)
}

export async function getBlogs({ limit = 10, page = 1, type = null, author = null } = {}) {
  const query = `
    query {
      blogs(
        limit: ${limit}
        page: ${page}
        type: ${type}
        authorId: ${author ? `"${author}"` : null}
      ) {
        docs {
          id
          user {
            id
            name
            imageUrl
          }
          title
          body
          type
          createdAt
          updatedAt
        }
        authors {
          _id
          name
          imageUrl
          blogCount
        }
        total
        limit
        page
        pages
      }
    }
  `
  const data = await fetchData(query)
  return data.blogs
}

export async function getBlog(blogId) {
  const query = `
    query {
      blog(id: "${blogId}") {
        id
        user {
          id
          name
          imageUrl
        }
        title
        body
        type
        createdAt
        comments {
          id
          comment
          createdAt
          updatedAt
        }
      }
    }
  `
  const data = await fetchData(query)
  return data.blog
}

export async function insertBlog(blog) {
  const { title, body, type } = blog
  const query = `
    mutation {
      newBlog(
        input: {
          title: "${title}"
          body: "${body}"
          type: ${type}
        }
      ) {
        id
      }
    }
  `
  return await fetchData(query)
}

export async function updateBlog(blogId, blog) {
  const { title, body, type } = blog
  const query = `
    mutation {
      updateBlog(
        id: "${blogId}"
        input: {
          title: "${title}"
          body: "${body}"
          type: ${type}
        }
      ) {
        id
      }
    }
  `
  return await fetchData(query)
}

export async function getTypeCount() {
  const query = `
    query {
      typeCount {
        food
        travel
        tech
        lifestyle
      }
    }
  `
  const result = await fetchData(query)
  return result.typeCount
}

export async function insertComment(blogId, comment) {
  const query = `
    mutation {
      newComment(
        blogId: "${blogId}"
        input: {
          comment: "${comment}"
        }
      ) {
        id
      }
    }
  `
  return await fetchData(query)
}

export async function updateComment(blogId, commentId, comment) {
  const query = `
    mutation {
      updateComment(
        blogId: "${blogId}",
        commentId: "${commentId}",
        input: {
          comment: "${comment}"
        }
      ) {
        id
      }
    }
  `
  return await fetchData(query)
}

export async function getProfile(userId) {
  const query = `
    query {
      profile(
        id: "${userId}"
      ) {
        id
        name
        imageUrl
        blogs {
          id
          title
          body
          type
          createdAt
          updatedAt
        }
      }
    }
  `
  const result = await fetchData(query)
  return result.profile
}