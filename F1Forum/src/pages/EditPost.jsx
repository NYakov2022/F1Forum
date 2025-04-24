import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', image_url: '' });

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase.from('post').select('*').eq('id', id).single();
      if (error) console.error('Error fetching post:', error);
      else setPost(data);
    }
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('post')
      .update({ title: post.title, content: post.content, image_url: post.image_url })
      .eq('id', id);

    if (error) console.error('Error updating post:', error);
    else navigate(`/post/${id}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
          placeholder="Post title"
          className="w-full border rounded p-2"
        />
        <textarea
          name="content"
          value={post.content}
          onChange={handleChange}
          placeholder="Post content"
          className="w-full border rounded p-2 h-40"
        />
        <input
          type="url"
          name="image_url"
          value={post.image_url}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          className="w-full border rounded p-2"
        />
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Save Changes
        </button>
      </form>
    </div>
  );
}
