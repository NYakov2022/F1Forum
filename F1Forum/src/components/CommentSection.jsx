import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments();
  }, [postId]);

  async function fetchComments() {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    if (!error) setComments(data);
  }

  async function handleAddComment(e) {
  e.preventDefault();

  // Debug: Log the post ID and comment being submitted
  console.log('Submitting comment:', {
    post_id: Number(postId),
    content: newComment,
  });

  // Submit the comment
  const { error, data } = await supabase.from('comments').insert([
    {
      post_id: Number(postId), // Ensure it's a number
      content: newComment.trim(),
    }
  ]);

  if (error) {
    console.error('Error submitting comment:', error.message);
  } else {
    console.log('Comment submitted:', data);
    setNewComment('');
    fetchComments(); // Refresh list
  }
}


  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <form onSubmit={handleAddComment} className="flex flex-col gap-2">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment..."
          required
          className="border rounded p-2"
        ></textarea>
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Post Comment
        </button>
      </form>
      <div className="mt-4 space-y-2">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-2 rounded">
            <p>{comment.content}</p>
            <span className="text-sm text-gray-500">
              {new Date(comment.created_at).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
