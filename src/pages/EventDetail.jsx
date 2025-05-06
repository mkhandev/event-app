import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
  const data = useRouteLoaderData("event-detail");

  return <EventItem event={data.event} />;
}

export default EventDetailPage;

export async function edLoader({ params }) {
  const response = await fetch(
    "http://localhost:8080/events/" + params.eventId
  );
  if (!response.ok) {
    throw new Response("Could not fetch event details", {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData;
  }
}
