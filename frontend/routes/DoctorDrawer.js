import { createDrawerNavigator } from "react-navigation-drawer";

import DoctorStack from "./DoctorStack";
import DoctorProfileStack from "./DoctorProfileStack";

const DoctorDrawer = createDrawerNavigator({
  DoctorStack: {
    screen: DoctorStack
  },
  Profile: {
    screen: DoctorProfileStack
  }
});

export default DoctorDrawer;
