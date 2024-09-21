import Text from "@kaloraat/react-native-text";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Divider } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Tab = ({ name, title, handlePress, screenName, routeName }) => {
  const activeScreenColor = screenName === routeName && "orange";
  return (
    <TouchableOpacity onPress={handlePress}>
      <>
        <FontAwesome5
          name={name}
          size={25}
          style={{
            marginBottom: 3,
            alignSelf: "center",
          }}
          color={activeScreenColor}
        />
        <Text>{title}</Text>
      </>
    </TouchableOpacity>
  );
};
const FooterTabs = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <>
      <Divider width={1} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 10,
          marginHorizontal: 30,
        }}
      >
        <Tab
          name="home"
          title="Home"
          handlePress={() => navigation.navigate("Home")}
          screenName="Home"
          routeName={route.name}
        />
        <Tab
          name="plus-square"
          title="Post"
          handlePress={() => navigation.navigate("Post")}
          screenName="Post"
          routeName={route.name}
        />
        <Tab
          name="list-ol"
          title="Links"
          handlePress={() => navigation.navigate("Links")}
          screenName="Links"
          routeName={route.name}
        />
        <Tab
          name="user"
          title="Account"
          handlePress={() => navigation.navigate("Account")}
          screenName="Account"
          routeName={route.name}
        />
      </View>
    </>
  );
};

export default FooterTabs;

const styles = StyleSheet.create({});
