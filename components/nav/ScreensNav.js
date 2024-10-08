import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";

import Home from "../../screens/Home";
import Signin from "../../screens/Signin";
import Signup from "../../screens/Signup";
import { AuthContext } from "../../contex/auth";
import HeaderTabs from "./HeaderTabs";
import Account from "../../screens/Account";
import Post from "../../screens/Post";
import Links from "../../screens/Links";
import ForgetPassword from "../../screens/ForgetPassword";
import PostLink from "../../screens/PostLink";

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
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen
            name="PostLink"
            component={PostLink}
            options={{
              title: "Post",
            }}
          />
          <Stack.Screen name="Links" component={Links} />
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
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
