import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const login = async () => {
    setError("")
    try {
      await signInWithEmailAndPassword(auth, email, password)
      alert("Login Success!")
      navigate("/play")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="auth-container">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
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
      <button onClick={login}>Login</button>
      <p>No account? <a href="/register">Register</a></p>
    </div>
  )
}

export default Login