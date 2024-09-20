import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";
import { AuthProvider } from "./contex/auth";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator
          initialRouteName="Signin"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
