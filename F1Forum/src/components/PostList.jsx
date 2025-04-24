import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import PostCard from './PostCard';

export default function PostList({ sortBy = 'created_at', searchTerm = '' }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [sortBy, searchTerm]);

  async function fetchPosts() {
    let query = supabase
      .from('post')
      .select('*')
      .order(sortBy, { ascending: false });

    if (searchTerm) {
      query = query.ilike('title', `%${searchTerm}%`);
    }

    const { data, error } = await query;
    if (!error) setPosts(data);
  }

  return (
    <div className="mt-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
