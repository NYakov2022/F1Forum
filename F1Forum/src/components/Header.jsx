import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <h1>F1 Forum</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/create">Create Post</Link>
      </nav>
    </header>
  )
}
