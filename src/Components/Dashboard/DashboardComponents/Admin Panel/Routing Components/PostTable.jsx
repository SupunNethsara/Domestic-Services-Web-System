import React from 'react'
import PostTableStructure from './PostTableStructure'

function PostTable() {
  return (
   <div>
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">User Post Management</h2>
            </div>
           <PostTableStructure/>
        </div>
  )
}

export default PostTable