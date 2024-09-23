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

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const [visible, setVisible] = useState(true);
  const [resetCode, setResetCode] = useState();
  const handleSubmit = async () => {
    setLoading(true);
    if (!email) {
      alert("Email are required");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`/forgot-password`, {
        email,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        console.log("Reset Data", data);
        setLoading(false);
        setVisible(true);
        alert("Check your mail for reset code!");
      }
    } catch (error) {
      alert("Error sending mail, try again");
      console.log(error);
      setLoading(false);
    }
  };
  const handlePasswordReset = async () => {
    setLoading(true);
    if ((!email, !password, !resetCode)) {
      alert("All filed are required");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`/reset-password`, {
        email,
        password,
        resetCode,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        console.log("Reset Data", data);
        setLoading(false);
        alert("Now you can sing in with new password!");
        navigation.navigate("Signin");
      }
    } catch (error) {
      alert("Error sending mail, try again");
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <CircleLogo />
        <Text center bold style={styles.text}>
          Password Recovery
        </Text>
        <UserInput
          name="EMAIL"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        {visible ? (
          <>
            <UserInput
              name="NEW PASSWORD"
              value={password}
              setValue={setPassword}
              autoCompleteType="password"
              secureTextEntry={true}
            />
            <UserInput
              name="RESET CODE"
              value={resetCode}
              setValue={setResetCode}
              secureTextEntry={true}
            />
          </>
        ) : (
          <></>
        )}
        <SubmitButton
          title={visible ? "Reset Password" : "Request Reset Code"}
          handleSubmit={visible ? handlePasswordReset : handleSubmit}
          loading={loading}
        />
        <Text
          small
          center
          color="orange"
          style={{ marginTop: 10 }}
          onPress={() => navigation.navigate("Signin")}
        >
          Sign In
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgetPassword;

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
