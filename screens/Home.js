import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../contex/auth";

const Home = () => {
  const [state, setState] = useContext(AuthContext);
  return (
    <View>
      <Text>{JSON.stringify(state, null, 4)}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
