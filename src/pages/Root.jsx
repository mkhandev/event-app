import { useEffect } from "react";
import MainNavigation from "../components/MainNavigation";
import {
  Outlet,
  useNavigation,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
  const navigation = useNavigation();
  const token = useRouteLoaderData("root");
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "POST" });
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === "loading" ? <h3>Loading...</h3> : <Outlet />}
      </main>
    </>
  );
}

export default RootLayout;
