import Text from "@kaloraat/react-native-text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CircleLogo from "../components/auth/CircleLogo";
import SubmitButton from "../components/auth/SubmitButton";
import UserInput from "../components/auth/UserInput";
import { AuthContext } from "../contex/auth";

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    console.log("Sign in request=>", email, password);
    try {
      const { data } = await axios.post(`/signin`, {
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
        <Text center bold style={styles.text}>
          Sign In
        </Text>
        <UserInput
          name="EMAIL"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          autoCompleteType="password"
          secureTextEntry={true}
        />
        <SubmitButton
          title="Sign In"
          handleSubmit={handleSubmit}
          loading={loading}
        />
        {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
        <Text small center>
          No Account ?{" "}
          <Text onPress={() => navigation.navigate("Signup")} color="#ff2222">
            Sign Up
          </Text>
        </Text>
        <Text small center color="orange" style={{ marginTop: 10 }}>
          Forget password ?
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signin;

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
