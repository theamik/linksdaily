import Text from "@kaloraat/react-native-text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CircleLogo from "../components/auth/CircleLogo";
import SubmitButton from "../components/auth/SubmitButton";
import UserInput from "../components/auth/UserInput";
import { AuthContext } from "../contex/auth";

const Account = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [image, setImage] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);
  useEffect(() => {
    if (state) {
      const { name, email, role } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
    }
  }, [state]);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    console.log("Sign in request=>", email, password);
    try {
      const { data } = await axios.post(`/account`, {
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        setState(data);
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        setLoading(false);
        console.log("Sing in successful =>", data);
        alert("Sing in successful");
        navigation.navigate("Home");
      }
    } catch (error) {
      alert("Sing in failed try again");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <CircleLogo />
        <Text center title style={{ paddingBottom: 10 }}>
          {name}
        </Text>
        <Text center medium style={{ paddingBottom: 10 }}>
          {email}
        </Text>
        <Text center small light style={{ paddingBottom: 50 }}>
          {role}
        </Text>
        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          autoCompleteType="password"
          secureTextEntry={true}
        />
        <SubmitButton
          title="Update Password"
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 100,
  },
  text: {
    color: "#333",
    fontSize: 20,
  },
});
