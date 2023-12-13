import React, { useState } from 'react'
import { Card, Avatar, Button, Input, message } from 'antd'
import {
  LikeOutlined,
  LikeFilled,
  EditOutlined,
  DeleteOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import moment from 'moment'

interface CommentType {
  text: string
  user: string
  date: moment.Moment
}

interface PostType {
  id: string
  owner: string
  date: moment.Moment
  content: string
  likes: number
  bookmarks: number
}

interface PostProps {
  post: PostType
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [comments, setComments] = useState<CommentType[]>([])
  const [comment, setComment] = useState('')
  const currentUser = 'John Doe'

  const handleLikeToggle = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleCommentSubmit = () => {
    if (!comment.trim()) {
      return
    }

    // Simulate adding a comment
    const newComment: CommentType = {
      text: comment,
      user: currentUser,
      date: moment(),
    }

    setComments([...comments, newComment])
    setComment('')
  }

  return (
    <Card>
      <div>
        {/* Post details */}
        <p>{post.content}</p>
        {/* Other post details */}
      </div>

      {/* Like and Bookmark buttons */}
      <Button
        icon={isLiked ? <LikeFilled /> : <LikeOutlined />}
        onClick={handleLikeToggle}
      >
        {post.likes} Likes
      </Button>
      <Button
        icon={isBookmarked ? <DeleteOutlined /> : <EditOutlined />}
        onClick={handleBookmarkToggle}
      >
        {post.bookmarks} Bookmarks
      </Button>

      {/* Comment section */}
      <Button icon={<MessageOutlined />} onClick={handleCommentSubmit}>
        {comments.length} Comments
      </Button>

      {comments.map((c, index) => (
        <div key={index}>
          <p>{c.text}</p>
          <p>{c.user}</p>
          <p>{c.date.fromNow()}</p>
        </div>
      ))}

      {/* Comment input */}
      <Input.TextArea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button type="primary" onClick={handleCommentSubmit}>
        Add Comment
      </Button>
    </Card>
  )
}

export default Post
