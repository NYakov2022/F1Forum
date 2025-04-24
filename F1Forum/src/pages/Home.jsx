import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import { Link } from 'react-router-dom'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [sort, setSort] = useState('time')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [sort])

  async function fetchPosts() {
    let { data, error } = await supabase
      .from('post')
      .select('*')

    if (sort === 'time') {
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else {
      data.sort((a, b) => b.upvotes - a.upvotes)
    }

    if (search.trim()) {
      data = data.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
    }

    setPosts(data)
  }

  return (
    <div>
      <h2>Posts Feed</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => setSort('time')}>Sort by Time</button>
        <button onClick={() => setSort('upvotes')}>Sort by Upvotes</button>
        <input
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={fetchPosts}>Search</button>
      </div>
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <Link to={`/post/${post.id}`}>
            <h3>{post.title}</h3>
            <p>Created: {new Date(post.created_at).toLocaleString()}</p>
            <p>Upvotes: {post.upvotes}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}