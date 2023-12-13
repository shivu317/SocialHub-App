// src/components/Comment.tsx
import React from 'react'

interface CommentProps {
  author: string
  content: string
}

const Comment: React.FC<CommentProps> = ({ author, content }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <strong>{author}</strong>: {content}
    </div>
  )
}

export default Comment
