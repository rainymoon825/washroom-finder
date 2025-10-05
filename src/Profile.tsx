import React from "react";

interface UserStats {
  name: string;
  submissionCount: number;
}

function Profile() {
  const users = JSON.parse(localStorage.getItem("userlist") || "[]");
  const user = users.find((user: any) => user.ID === 1);

  const userStats: UserStats = {
    name: user.name,
    submissionCount: user.reviewsGiven,
  };

  return (
    <div style={{ padding: "20px", color: "white", background: "black" }}>
      <h1>{userStats.name}'s Profile</h1>
      <p>Submissions: {userStats.submissionCount}</p>
    </div>
  );
}

export default Profile;
