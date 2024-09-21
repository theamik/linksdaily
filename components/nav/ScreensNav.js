import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";

import Home from "../../screens/Home";
import Signin from "../../screens/Signin";
import Signup from "../../screens/Signup";
import { AuthContext } from "../../contex/auth";
import HeaderTabs from "./HeaderTabs";

const Stack = createNativeStackNavigator();
export default function ScreensNav() {
  const [state, setState] = useContext(AuthContext);
  const authenticated = state && state.token !== "" && state.user !== null;
  return (
    <Stack.Navigator
      initialRouteName="Home"
      //   screenOptions={{ headerShown: false }}
    >
      {authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Links Daily",
              headerRight: () => <HeaderTabs />,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
