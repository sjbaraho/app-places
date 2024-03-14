import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "Famous Skyscraper",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/d/df/NYC_Empire_State_Building.jpg",
    address: "20 W 34th St., New York, NY 10001",
    location: {
      lat: 40.7484,
      lng: -73.9857,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "Famous Skyscraper #2",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/d/df/NYC_Empire_State_Building.jpg",
    address: "20 W 34th St., New York, NY 10001",
    location: {
      lat: 40.7484,
      lng: -73.9857,
    },
    creator: "u2",
  },
];

const UserPlaces = () => {
  const userID = useParams().userID;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userID);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
