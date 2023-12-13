// src/pages/MyBookmarks.tsx
import React, { useState, useEffect } from 'react'
import { ProTable, ProColumns } from '@ant-design/pro-table'
import fetchBookmarkedPosts from '../api/bookmarks'
import CommentList from '../components/CommentList'
import { useAuth } from '../components/Auth/AuthContext'

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

const MyBookmarks: React.FC = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState(false)
  const authContext = useAuth()

  const columns: ProColumns<PostData>[] = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Content', dataIndex: 'content' },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (authContext.isAuthenticated) {
          const userId = authContext.user?.id
          if (userId) {
            const bookmarks: BookmarkData[] | null = await fetchBookmarkedPosts(userId)

            if (bookmarks) {
              const bookmarkedPostIds = bookmarks.map((bookmark) => bookmark.postId)
              const posts: PostData[] = await fetchPostsByIds(bookmarkedPostIds)
              setBookmarkedPosts(posts)
            } else {
              console.error('Error fetching bookmarks')
            }
          }
        }
      } catch (error) {
        console.error('Error fetching bookmarked posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [authContext.isAuthenticated, authContext.user?.id])

  const fetchPostsByIds = async (postIds: string[]): Promise<PostData[]> => {
    return [
      { id: '1', title: 'Post 1', content: 'Content of post 1', comments: [] },
      { id: '2', title: 'Post 2', content: 'Content of post 2', comments: [] },
      { id: '3', title: 'Post 3', content: 'Content of post 3', comments: [] },
    ]
  }

  return (
    <ProTable<PostData>
      columns={columns}
      dataSource={bookmarkedPosts}
      pagination={false}
      rowKey="id"
      expandable={{
        expandedRowRender: (record) => <CommentList comments={record.comments} />,
      }}
    />
  )
}

export default MyBookmarks
