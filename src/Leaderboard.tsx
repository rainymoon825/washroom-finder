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
    <>
    <h1 className = "Leaderboard">Leaderboard</h1>
      <h1 className = "LeaderboardFirst">1. u/BenTheUltimatePisser</h1>
      <h1 className = "LeaderboardSecond">2. u/BenThePissper</h1>
      <h1 className = "LeaderboardThird">3. u/BenThePooper</h1>
      <h1 className = "LeaderboardOther">4. u/Normie</h1>
      <h1 className = "LeaderboardOther">5. u/Normie</h1>
      <h1 className = "LeaderboardOther">6. u/Normie</h1>
      <h1 className = "LeaderboardOther">7. u/Normie</h1>
      <h1 className = "LeaderboardOther">8. u/Normie</h1>
      <h1 className = "LeaderboardOther">9. u/Normie</h1>
      <h1 className = "LeaderboardOther">10. u/Normie</h1>
      <h1>(and more...)</h1>
    
    <div>
      <h1>Leaderboard</h1>
      {leaderboard.map((entry) => (
        <div key={entry.user.name}>
          {entry.rank} - {entry.user.name}: {entry.user.submissionCount} submissions
        </div>
      ))}
    </div>
    </>
  );
}

export default Leaderboard;
