interface PostData {
  id: string
  title: string
  content: string
  comments: CommentData[]
  // We can Add other properties as needed
}

interface CommentData {
  id: string
  author: string
  content: string
}

interface BookmarkData {
  postId: string
  userId: string
}

export const fetchPosts = async (
  page: number = 1,
  pageSize: number = 10
): Promise<PostData[]> => {
  try {
    const response = await fetch(
      `https://api.example.com/posts?page=${page}&pageSize=${pageSize}`
    )
    const data = await response.json()

    return data.posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

export const fetchUserPosts = (userId: string): Promise<PostData[]> => {
  return Promise.resolve([])
}

export const fetchBookmarkedPosts = async (
  userId: string
): Promise<BookmarkData[] | null> => {
  try {
    const response = await fetch(`https://api.example.com/bookmarks/${userId}`)
    const data = await response.json()

    return data.bookmarks
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    throw error
  }
}
