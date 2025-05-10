import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/Home";
import EventPage, { eLoader as eventLoader } from "./pages/Events";
import EventDetailPage, {
  edLoader as eventDetailLoader,
  action as evnetDelete,
} from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RootLayout from "./pages/Root";
import EventRootLayout from "./pages/EventRoot";
import ErrorPage from "./pages/Error";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import { action as manipulateEventActon } from "./components/EventForm";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authenticaion";

import { action as logoutAction } from "./pages/Logout";

import "./App.css";
import { checkAuthLoader, tokenLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
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
                action: evnetDelete,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventActon,
                loader: checkAuthLoader,
              },
            ],
          },

          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventActon,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      { path: "auth", element: <AuthenticationPage />, action: authAction },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
