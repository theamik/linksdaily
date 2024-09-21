import Text from "@kaloraat/react-native-text";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const Tab = ({ name, title }) => (
  <TouchableOpacity>
    <>
      <FontAwesome5
        name={name}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
      />
      <Text>{title}</Text>
    </>
  </TouchableOpacity>
);
const FooterTabs = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        marginHorizontal: 30,
      }}
    >
      <Tab name="home" title="Home" />
      <Tab name="plus-square" title="Post" />
      <Tab name="list-ol" title="Links" />
      <Tab name="user" title="Account" />
    </View>
  );
};

export default FooterTabs;

const styles = StyleSheet.create({});
