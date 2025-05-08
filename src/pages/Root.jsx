import MainNavigation from "../components/MainNavigation";
import { Outlet, useNavigation } from "react-router-dom";

function RootLayout() {
  const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === "loading" ? <h3>Loading...</h3> : <Outlet />}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
