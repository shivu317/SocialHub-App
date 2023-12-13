interface LikeData {
  postId: string
  userId: string
}

const likedPostsData: LikeData[] = [
  { postId: '1', userId: 'user1' },
  { postId: '2', userId: 'user1' },
  { postId: '3', userId: 'user2' },
  // We Can Add more data as needed
]

export const fetchLikedPosts = (userId: string): Promise<LikeData[]> => {
  return new Promise((resolve) => {
    const likedPosts = likedPostsData.filter((like) => like.userId === userId)
    resolve(likedPosts)
  })
}
