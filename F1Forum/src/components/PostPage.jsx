import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/client'
import CommentSection from '../components/CommentSection';


export default function PostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)

  useEffect(() => {
    fetchPost()
  }, [id])

  async function fetchPost() {
    const { data } = await supabase.from('post').select('*').eq('id', id).single()
    setPost(data)
  }

  async function handleUpvote() {
    console.log('Upvoting post with ID:', id);
    await supabase.rpc('increment_upvotes', { post_id_input: Number(id) });
    const { error } = await supabase.from('post').update({ upvotes: post.upvotes + 1 }).eq('id', id)
    if (!error) fetchPost()
  }

  async function handleDelete() {
    await supabase.from('post').delete().eq('id', id)
    navigate('/')
  }

  function handleEdit() {
    navigate(`/edit/${id}`)
  }
  
  

  if (!post) return <p>Loading post...</p>

  return (
    <div>
      <h2>{post.title}</h2>
      <p>Created: {new Date(post.created_at).toLocaleString()}</p>
      <p>Upvotes: {post.upvotes}</p>
      {post.image_url && <img src={post.image_url} alt="Post" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />}
      <p>{post.content}</p>
      <button onClick={handleUpvote}>Upvote</button>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>

      <CommentSection postId={id} />
    </div>
  )
}