import React, { useState, useEffect } from 'react'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { fetchBookmarkedPosts, fetchPosts } from '../api/posts'
import { useAuth } from '../components/Auth/AuthContext'
import { Card } from 'antd'

interface BookmarkData {
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

const page = 1 // Replace with your actual page value
const pageSize = 10

const MyPosts: React.FC = () => {
  const [userPosts, setUserPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState(false)
  const authContext = useAuth()

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        if (authContext.isAuthenticated) {
          const userId = authContext.user?.id
          if (userId && isMounted) {
            const bookmarks: BookmarkData[] | null = await fetchBookmarkedPosts(userId)

            if (bookmarks) {
              const bookmarkedPostIds = bookmarks.map((bookmark) => bookmark.postId)
              const posts: PostData[] = await fetchPosts(page, pageSize)

              if (isMounted) {
                setUserPosts(posts)
              } else {
                console.error('Error fetching bookmarks')
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      // Cleanup function to handle component unmounting
      isMounted = false
    }
  }, [authContext.isAuthenticated, authContext.user?.id])

  const columns: ProColumns<PostData>[] = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Content', dataIndex: 'content' },
    // Add other columns as needed
  ]

  return (
    <ProTable<PostData>
      columns={columns}
      dataSource={userPosts}
      pagination={{
        pageSize,
        total: userPosts.length,
      }}
      rowKey="id"
      expandable={{
        expandedRowRender: (record) => (
          <Card title={record.title}>{/* Add content and other details here */}</Card>
        ),
      }}
    />
  )
}

export default MyPosts
