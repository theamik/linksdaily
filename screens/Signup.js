import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const Signup = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    console.log("Signup request=>", name, email, password);
    try {
      const { data } = await axios.post("http://localhost:8080/signup", {
        name,
        email,
        password,
      });
      setLoading(false);
      console.log("Sing up successful =>", data);
      alert("Sing up successful");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <CircleLogo />
        <Text center bold style={styles.text}>
          Sign up
        </Text>
        <UserInput
          name="NAME"
          value={name}
          setValue={setName}
          autoCapitalize="words"
        />
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
          title="Sign Up"
          handleSubmit={handleSubmit}
          loading={loading}
        />
        {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
        <Text small center>
          Already Joined ?{" "}
          <Text onPress={() => navigation.navigate("Signin")} color="#ff2222">
            Sign In
          </Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

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
