import { StyleSheet, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../contex/auth";
import FooterTabs from "../components/nav/FooterTabs";

const Home = () => {
  const [state, setState] = useContext(AuthContext);
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      <Text>{JSON.stringify(state, null, 4)}</Text>
      <FooterTabs />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
