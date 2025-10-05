import React from "react";

interface UserStats {
  name: string;
  submissionCount: number;
}

function Profile() {
  const userStats: UserStats = {
    name: "u/TheUltimatePisser",
    submissionCount: 42,
  };

  return (
    <div style={{ padding: "20px", color: "white", background: "black" }}>
      <h1>{userStats.name}'s Profile</h1>
      <p>Submissions: {userStats.submissionCount}</p>
    </div>
  );
}

export default Profile;
