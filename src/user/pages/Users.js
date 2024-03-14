import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      image: "https://picsum.photos/200/300",
      name: "Max Amillion",
      places: 5,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
