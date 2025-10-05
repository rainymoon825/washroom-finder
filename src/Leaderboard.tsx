import "./Leaderboard.css";
import { useEffect, useState } from "react";


interface User {
    username: string;
    submissionCount: number;
  }
  
  interface LeaderboardEntry {
    user: User;
    rank: number;
  }
  
  function createLeaderboard(users: User[]): LeaderboardEntry[] {
    const sortedUsers = [...users].sort((a, b) => b.submissionCount - a.submissionCount);
  
    return sortedUsers.map((user, index) => ({
      user,
      rank: index + 1
    }));
  }
  
  function normalizeUsers(rawList: any[]): User[] {
    if (!Array.isArray(rawList)) return [];
    return rawList
      .map((u: any) => {
        const username = u?.username ?? u?.name ?? u?.Name ?? "Unknown";
        const submissionCount =
          typeof u?.submissionCount === "number"
            ? u.submissionCount
            : typeof u?.reviewsGiven === "number"
            ? u.reviewsGiven
            : 0;
        return { username, submissionCount } as User;
      })
      .filter((u: User) => typeof u.submissionCount === "number");
  }

  function Leaderboard() {
    const [users, setUsers] = useState<User[]>(() => normalizeUsers(JSON.parse(localStorage.getItem("userlist") || "[]")));

    useEffect(() => {
      const reload = () => setUsers(normalizeUsers(JSON.parse(localStorage.getItem("userlist") || "[]")));
      window.addEventListener("data-updated", reload);
      window.addEventListener("storage", reload);
      return () => {
        window.removeEventListener("data-updated", reload);
        window.removeEventListener("storage", reload);
      };
    }, []);

    const leaderboard = createLeaderboard(users);

    return (
      <div className="leaderboard-page">
        <div className="leaderboard-card">
          <div className="leaderboard-header">
            <h1>🏆 Leaderboard</h1>
            <p>Top contributors by submissions</p>
          </div>
          <div className="leaderboard-list">
            {leaderboard.map((entry) => (
              <div
                key={entry.user.username}
                className={`leaderboard-row ${
                  entry.rank === 1
                    ? "first"
                    : entry.rank === 2
                    ? "second"
                    : entry.rank === 3
                    ? "third"
                    : "other"
                }`}
              >
                <div className="rank-badge">{entry.rank}</div>
                <div className="user-name">{entry.user.username}</div>
                <div className="user-score">
                  <span className="score-number">{entry.user.submissionCount}</span>
                  <span className="score-label">submissions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default Leaderboard;
  