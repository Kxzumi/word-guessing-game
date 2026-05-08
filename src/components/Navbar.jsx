import { Link } from "react-router-dom"
import { auth } from "../firebase/firebaseConfig"
import { useState, useEffect } from "react"

function Navbar() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser)
    return unsubscribe
  }, [])

  return (
    <nav>
      <h2>WordMaster</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/play">Play</Link>
        <Link to="/scores">Scores</Link>
        {user && <Link to="/profile">Profile</Link>}
        {user && <Link to="/settings">Settings</Link>}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
      </div>
    </nav>
  )
}

export default Navbar