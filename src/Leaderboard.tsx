interface User {
  name: string;
  submissionCount: number;
}

interface LeaderboardEntry {
  user: User;
  rank: number;
}

function createLeaderboard(users: User[]): LeaderboardEntry[] {
  const sortedUsers = [...users].sort((a, b) => b.submissionCount - a.submissionCount);
  
  const leaderboard: LeaderboardEntry[] = sortedUsers.map((user, index) => ({
    user,
    rank: index + 1
  }));
  
  return leaderboard;
}

function Leaderboard() {
  const users: User[] = [
    { name: "Alice", submissionCount: 15 },
    { name: "Bob", submissionCount: 23 },
    { name: "Charlie", submissionCount: 8 },
    { name: "Diana", submissionCount: 31 },
    { name: "Eve", submissionCount: 12 }
  ];

  const leaderboard = createLeaderboard(users);

  return (
    <div>
      <h1>Leaderboard</h1>
      {leaderboard.map((entry) => (
        <div key={entry.user.name}>
          {entry.rank} - {entry.user.name}: {entry.user.submissionCount} submissions
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;
