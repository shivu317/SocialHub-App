import React, { useState, useEffect } from 'react'
import { ProCard } from '@ant-design/pro-card'
import { ProTable, ProColumns } from '@ant-design/pro-table'
import { fetchLikedPosts } from '../api/like'
import CommentList from '../components/CommentList'
import { useAuth } from '../components/Auth/AuthContext'

interface LikeData {
  postId: string
  userId: string
}

interface PostData {
  id: string
  title: string
  content: string
  comments: CommentData[]
}

interface CommentData {
  id: string
  author: string
  content: string
}

const MyLikes: React.FC = () => {
  const [likedPosts, setLikedPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState(false)
  const authContext = useAuth()

  const columns: ProColumns<PostData>[] = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Content', dataIndex: 'content' },
  ]

  useEffect(() => {
    if (authContext.isAuthenticated) {
      const userId = authContext.user?.id
      if (userId) {
        fetchLikedPosts(userId)
          .then((likes: LikeData[]) => {
            const likedPostIds = likes.map((like) => like.postId)
            fetchPostsByIds(likedPostIds)
              .then((posts: PostData[]) => {
                setLikedPosts(posts)
              })
              .catch((error: Error) => {
                console.error('Error fetching liked posts:', error)
              })
              .finally(() => {
                setLoading(false)
              })
          })
          .catch((error: Error) => {
            console.error('Error fetching liked posts:', error)
            setLoading(false)
          })
      }
    }
  }, [authContext.isAuthenticated, authContext.user?.id])

  const fetchPostsByIds = (postIds: string[]): Promise<PostData[]> => {
    // Implement the logic to fetch posts based on their IDs from your actual API
    // This is a placeholder, replace it with your actual API call
    return Promise.resolve([
      { id: '1', title: 'Post 1', content: 'Content of post 1', comments: [] },
      { id: '2', title: 'Post 2', content: 'Content of post 2', comments: [] },
      { id: '3', title: 'Post 3', content: 'Content of post 3', comments: [] },
    ])
  }

  return (
    <ProCard>
      <ProTable<PostData>
        columns={columns}
        dataSource={likedPosts}
        pagination={false}
        rowKey="id"
        expandable={{
          expandedRowRender: (record) => <CommentList comments={record.comments} />,
        }}
      />
    </ProCard>
  )
}

export default MyLikes
