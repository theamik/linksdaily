import { StyleSheet, SafeAreaView, View } from "react-native";
import React, { useContext } from "react";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../contex/auth";
import FooterTabs from "../components/nav/FooterTabs";

const Home = () => {
  const [state, setState] = useContext(AuthContext);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text title center light>
        {" "}
        Home
      </Text>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
