import { useState, useEffect } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"
import { useNavigate } from "react-router-dom"

function Settings() {
  const [darkMode, setDarkMode] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode")
    if (savedTheme === "true") {
      setDarkMode(true)
      document.body.classList.add("dark-mode")
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem("darkMode", newMode)
    if (newMode) {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }
  }

  const logout = async () => {
    await signOut(auth)
    navigate("/login")
    alert("Logged out successfully")
  }

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="settings-options">
        <div className="setting-item">
          <label>Dark Mode</label>
          <button onClick={toggleDarkMode} className={darkMode ? "active" : ""}>
            {darkMode ? "Disable" : "Enable"}
          </button>
        </div>
        <div className="setting-item">
          <label>Sound Effects</label>
          <button onClick={() => setSoundEnabled(!soundEnabled)} className={soundEnabled ? "active" : ""}>
            {soundEnabled ? "Disable" : "Enable"}
          </button>
        </div>
        <div className="setting-item logout-item">
          <label>Account</label>
          <button onClick={logout} className="logout-btn">Sign Out</button>
        </div>
      </div>
    </div>
  )
}

export default Settings