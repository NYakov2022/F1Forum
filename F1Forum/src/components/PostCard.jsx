import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <Link to={`/post/${post.id}`} className="text-xl font-semibold text-red-600 hover:underline">
        {post.title}
      </Link>
      <p className="text-gray-500 text-sm mt-1">Created: {new Date(post.created_at).toLocaleString()}</p>
      <p className="text-gray-700 mt-2">Upvotes: {post.upvotes}</p>
    </div>
  );
}
