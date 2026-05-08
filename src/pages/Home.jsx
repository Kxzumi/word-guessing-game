import { Link } from "react-router-dom"
import { auth } from "../firebase/firebaseConfig"
import { useState, useEffect } from "react"

function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser)
    return unsubscribe
  }, [])

  return (
    <div className="home-container">
      <h1>WordMaster</h1>
      <p className="tagline">Test your vocabulary and guess the hidden word</p>
      
      <div className="features">
        <div className="feature">
          <h3>How to Play</h3>
          <p>Guess the word correctly. Each correct answer earns points based on remaining attempts.</p>
        </div>
        <div className="feature">
          <h3>Leaderboard</h3>
          <p>Compete with other players and track your ranking.</p>
        </div>
        <div className="feature">
          <h3>Hints</h3>
          <p>Stuck? Use hints to help you figure out the word.</p>
        </div>
      </div>
      
      <div className="cta-buttons">
        {user ? (
          <Link to="/play"><button className="primary-btn">Start Playing</button></Link>
        ) : (
          <>
            <Link to="/login"><button className="primary-btn">Login</button></Link>
            <Link to="/register"><button className="secondary-btn">Register</button></Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Home