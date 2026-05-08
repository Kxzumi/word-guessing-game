import { useState, useEffect } from "react"
import { auth, db } from "../firebase/firebaseConfig"
import { updateProfile } from "firebase/auth"
import { collection, query, where, getDocs } from "firebase/firestore"

function Profile() {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [userScores, setUserScores] = useState([])
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        setUsername(currentUser.displayName || "")
        const q = query(collection(db, "scores"), where("userEmail", "==", currentUser.email))
        const snapshot = await getDocs(q)
        const scores = snapshot.docs.map(doc => doc.data())
        setUserScores(scores)
      }
    })
    return unsubscribe
  }, [])

  const updateUsername = async () => {
    try {
      await updateProfile(user, { displayName: username })
      setEditing(false)
      alert("Username updated successfully!")
    } catch (error) {
      alert(error.message)
    }
  }

  if (!user) return <div className="loading">Please login to view profile</div>

  const totalScore = userScores.reduce((sum, s) => sum + (s.score || 0), 0)

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-initial">
            {username ? username.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="profile-info">
          {editing ? (
            <div className="edit-section">
              <label>Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} />
              <div className="edit-buttons">
                <button onClick={updateUsername} className="save-btn">Save</button>
                <button onClick={() => setEditing(false)} className="cancel-btn">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="info-section">
              <div className="info-row">
                <span className="info-label">Username:</span>
                <span className="info-value">{username || "Not set"}</span>
                <button onClick={() => setEditing(true)} className="edit-btn">Edit</button>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Total Score:</span>
                <span className="info-value highlight">{totalScore}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Games Played:</span>
                <span className="info-value">{userScores.length}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile