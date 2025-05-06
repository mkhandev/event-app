import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import EventList from "../components/EventList";

// const DUMMY_EVENTS = [
//   { id: "e1", title: "Event 1" },
//   { id: "e2", title: "Event 2" },
//   { id: "e3", title: "Event 3" },
//   { id: "e4", title: "Event 4" },
//   { id: "e5", title: "Event 5" },
// ];

function EventsPage() {
  const events = useLoaderData();

  return <EventList events={events} />;
}

export default EventsPage;

export async function eLoader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw new Response("Could not fetch events", {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}
