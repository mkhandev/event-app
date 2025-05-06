import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/Home";
import EventPage, { eLoader as eventLoader } from "./pages/Events";
import EventDetailPage, {
  edLoader as eventDetailLoader,
} from "./pages/EventDetail";
import NewEventPage, { action as newEventAction } from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RootLayout from "./pages/Root";
import EventRootLayout from "./pages/EventRoot";
import ErrorPage from "./pages/Error";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventRootLayout />,
        children: [
          {
            index: true,
            element: <EventPage />,
            loader: eventLoader,
          },

          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
              },
              {
                path: "edit",
                element: <EditEventPage />,
              },
            ],
          },

          { path: "new", element: <NewEventPage />, action: newEventAction },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
