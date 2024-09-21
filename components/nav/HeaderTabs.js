import { SafeAreaView, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";
import React, { useContext } from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../../contex/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderTabs = () => {
  const [state, setState] = useContext(AuthContext);
  const SignOut = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={SignOut}>
        <FontAwesome5Icon name="sign-out-alt" size={25} color="#ff9900" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HeaderTabs;
