import React, { useState, useEffect } from 'react'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import CommentList from '../components/CommentList'
import { fetchPosts } from '../api/posts' // Replace with your actual API function
import { useAuth } from '../components/Auth/AuthContext'

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

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState(false)
  const authContext = useAuth()

  const columns: ProColumns<PostData>[] = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Content', dataIndex: 'content' },
    // Add other columns as needed
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const fetchedPosts: PostData[] = await fetchPosts() // Replace with your actual API call
        setPosts(fetchedPosts)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <ProTable<PostData>
      columns={columns}
      dataSource={posts}
      pagination={false}
      loading={loading}
      rowKey="id"
      expandable={{
        expandedRowRender: (record) => <CommentList comments={record.comments} />,
      }}
    />
  )
}

export default Home
