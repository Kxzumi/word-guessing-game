import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"
import { useNavigate } from "react-router-dom"

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const register = async () => {
    setError("")
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, { displayName: username })
      alert("Registered Successfully!")
      navigate("/login")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="auth-container">
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={register}>Register</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  )
}

export default Register