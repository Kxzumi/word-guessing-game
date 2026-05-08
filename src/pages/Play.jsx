import { useState, useEffect } from "react"
import { auth, db } from "../firebase/firebaseConfig"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const WORDS = [
  { word: "react", hint: "A JavaScript library for building UIs" },
  { word: "firebase", hint: "Google's backend platform" },
  { word: "javascript", hint: "Language of the web" },
  { word: "component", hint: "Building block of React apps" },
  { word: "router", hint: "Handles navigation in React" }
]

function Play() {
  const [currentWord, setCurrentWord] = useState(null)
  const [guess, setGuess] = useState("")
  const [message, setMessage] = useState("")
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(3)
  const [gameActive, setGameActive] = useState(true)
  const [hintUsed, setHintUsed] = useState(false)

  useEffect(() => {
    newGame()
  }, [])

  const newGame = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length)
    setCurrentWord(WORDS[randomIndex])
    setGuess("")
    setMessage("")
    setAttempts(3)
    setGameActive(true)
    setHintUsed(false)
  }

  const checkGuess = async () => {
    if (!gameActive) return
    if (guess.toLowerCase() === currentWord.word) {
      const points = attempts * 10
      setScore(score + points)
      setMessage(`Correct! +${points} points!`)
      setGameActive(false)
      
      if (auth.currentUser) {
        await addDoc(collection(db, "scores"), {
          userEmail: auth.currentUser.email,
          userName: auth.currentUser.displayName || auth.currentUser.email,
          score: score + points,
          word: currentWord.word,
          date: serverTimestamp()
        })
      }
    } else {
      const newAttempts = attempts - 1
      setAttempts(newAttempts)
      if (newAttempts === 0) {
        setMessage(`Game Over! The word was "${currentWord.word}"`)
        setGameActive(false)
      } else {
        setMessage(`Wrong! ${newAttempts} attempts left`)
      }
    }
    setGuess("")
  }

  const showHint = () => {
    if (!hintUsed && gameActive) {
      setMessage(`Hint: ${currentWord.hint}`)
      setHintUsed(true)
    }
  }

  if (!currentWord) return <div>Loading...</div>

  return (
    <div className="play-container">
      <h1>Word Guessing Game</h1>
      <div className="game-info">
        <p>Score: {score}</p>
        <p>Attempts: {attempts}</p>
      </div>
      <div className="word-display">
        {currentWord.word.split("").map((_, i) => (
          <span key={i} className="letter-slot">_</span>
        ))}
      </div>
      <input
        type="text"
        placeholder="Enter your guess"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={!gameActive}
      />
      <div className="game-buttons">
        <button onClick={checkGuess} disabled={!gameActive}>Submit</button>
        <button onClick={showHint} disabled={!gameActive || hintUsed}>Hint</button>
        <button onClick={newGame}>New Game</button>
      </div>
      <h2 className={message.includes("Correct") ? "success" : "error"}>{message}</h2>
    </div>
  )
}

export default Play
