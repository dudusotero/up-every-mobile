import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Main from "./pages/Main";
import Boxes from "./pages/Boxes";
import Box from "./pages/Box";

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Main,
      Boxes,
      Box
    },
    {
      backBehavior: "history"
    }
  )
);

export default Routes;
