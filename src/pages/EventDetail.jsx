import { redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
import { getAuthToken } from "../util/auth";

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

export async function action({ params, request }) {
  const eventId = params.eventId;
  const token = getAuthToken();

  const response = fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response) {
    throw new Response("Could not delete event", {
      status: 500,
    });
  }

  return redirect("/events");
}
