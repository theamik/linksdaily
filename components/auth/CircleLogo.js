import { Image, View } from "react-native";
import React from "react";

const CircleLogo = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 200, height: 200, marginVertical: 20 }}
      />
    </View>
  );
};

export default CircleLogo;
