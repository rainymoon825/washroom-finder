import userData from "./data/user-data.json";


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
  
  function Leaderboard() {
    const users: User[] = userData;
    const leaderboard = createLeaderboard(users);
  
    return (
      <>
        <h1 className="Leaderboard">Leaderboard</h1>
        {leaderboard.map((entry) => (
          <h1
            key={entry.user.username}
            className={
              entry.rank === 1
                ? "LeaderboardFirst"
                : entry.rank === 2
                ? "LeaderboardSecond"
                : entry.rank === 3
                ? "LeaderboardThird"
                : "LeaderboardOther"
            }
          >
            {entry.rank}. {entry.user.username} — {entry.user.submissionCount} submissions
          </h1>
        ))}
      </>
    );
  }
  
  export default Leaderboard;
  