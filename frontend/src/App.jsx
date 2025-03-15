import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Leaderboard from "./components/Leaderboard";
import Store from "./components/Store";
import Auth from "./components/Auth";
import Levels from "./components/Levels";
import Level1 from "./components/levels/Level1";
import Level2 from "./components/levels/Level2";
import Level3 from "./components/levels/Level3";
import Level4 from "./components/levels/Level4";
import Level5 from "./components/levels/Level5";
import Level6 from "./components/levels/Level6";
import Level7 from "./components/levels/Level7";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Levels />
    },
    {
      path: "/auth",
      element: <Auth />
    },
    {
      path: "/leaderboard",
      element: <Leaderboard />
    },
    {
      path: "/store",
      element: <Store />
    },
    {
      path: "/level1",
      element: <Level1 />
    },
    {
      path: "/level2",
      element: <Level2 />
    },
    {
      path: "/level3",
      element: <Level3 />
    },
    {
      path: "/level4",
      element: <Level4 />
    },
    {
      path: "/level5",
      element: <Level5 />
    },
    {
      path: "/level6",
      element: <Level6 />
    },
    {
      path: "/level7",
      element: <Level7 />
    }
  ]);

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <RouterProvider router={router} />
    </>

  )
}

export default App;
