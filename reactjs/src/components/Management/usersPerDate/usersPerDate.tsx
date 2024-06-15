import React, { useState, useEffect } from "react";
import { User } from "../../../types";

interface TopUser {
  user_id: string;
  count: number;
}

const TopUsersByClaims: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    if (startDate && endDate) {
      fetch(
        `https://ar-mvc-api.vercel.app/api/top-users-by-claims?startDate=${startDate}&endDate=${endDate}`
      )
        .then((response) => response.json())
        .then((data) => {
          setTopUsers(data);
        })
        .catch((error) => {
          console.error("Error fetching top users by claims:", error);
        });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetch("https://ar-mvc-api.vercel.app/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    if (topUsers.length > 0 && users.length > 0) {
      const filtered = users.filter((user: User) => {
        return topUsers.some(
          (topUser) => topUser.user_id === user.id.toString()
        );
      });

      console.log("Usuarios filtrados:", filtered);
      setFilteredUsers(filtered);
    }
  }, [topUsers, users]);

  console.log("usuarios filtrados", filteredUsers);

  return (
    <div>
      <div>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <h2>Top Users</h2>
        <ul>
          {topUsers.map((user) => {
            const userObj = users.find((u) => u.id.toString() === user.user_id);
            return (
              <li key={user.user_id}>
                User ID: {user.user_id} - Name: {userObj?.name} - Premios:{" "}
                {user.count}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TopUsersByClaims;
