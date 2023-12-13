// components/CommentList.tsx
import React from 'react'

interface Comment {
  id: string
  author: string
  content: string
}

interface CommentListProps {
  comments: Comment[]
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <strong>{comment.author}</strong>: {comment.content}
        </div>
      ))}
    </div>
  )
}

export default CommentList
