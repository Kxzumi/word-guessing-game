import { useEffect, useState } from "react"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"

function Scores() {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const q = query(collection(db, "scores"), orderBy("score", "desc"), limit(50))
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setScores(data)
      } catch (error) {
        console.error("Error fetching scores:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchScores()
  }, [])

  if (loading) return <div className="loading">Loading leaderboard...</div>

  return (
    <div className="scores-container">
      <h1>Leaderboard</h1>
      <table className="leaderboard">
        <thead>
          <tr><th>Rank</th><th>Player</th><th>Score</th><th>Date</th></tr>
        </thead>
        <tbody>
          {scores.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">No scores yet. Play a game to appear on the leaderboard!</td>
            </tr>
          ) : (
            scores.map((score, index) => (
              <tr key={score.id}>
                <td className={index < 3 ? `rank-${index + 1}` : ""}>#{index + 1}</td>
                <td>{score.userName || score.userEmail}</td>
                <td className="score-value">{score.score}</td>
                <td>{score.date?.toDate?.().toLocaleDateString() || "Recent"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Scores