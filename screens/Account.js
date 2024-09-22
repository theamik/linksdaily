import Text from "@kaloraat/react-native-text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CircleLogo from "../components/auth/CircleLogo";
import SubmitButton from "../components/auth/SubmitButton";
import UserInput from "../components/auth/UserInput";
import { AuthContext } from "../contex/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";

const Account = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [image, setImage] = useState({
    url: "",
    public_id: "",
  });
  const [uploadImage, setUploadImage] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);
  useEffect(() => {
    if (state) {
      const { name, email, role, image } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
      setImage(image);
    }
  }, [state]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post(`/update-password`, {
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        alert("👍 password updated successful");
        setPassword("");
      }
    } catch (error) {
      alert("Password update failed try again");
      console.log(error);
      setLoading(false);
    }
  };
  const handleImageUpload = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Camera access is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    const dataa = Object.values(pickerResult);
    if (pickerResult.cancelled) {
      return;
    }
    let base64Image = `data:image/png;base64,${pickerResult.assets[0].base64}`;
    setUploadImage(base64Image);

    const { data } = await axios.post("upload-image", {
      image: base64Image,
    });

    const as = JSON.parse(await AsyncStorage.getItem("@auth"));
    as.user = data;
    await AsyncStorage.setItem("@auth", JSON.stringify(as));
    setState({ ...state, user: data });
    setImage(data.image);
    console.log("👍 Save Profile Image");
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <CircleLogo>
          {image && image.url ? (
            <Image
              source={{ uri: image.url }}
              style={{
                height: 190,
                width: 190,
                borderRadius: 100,
                marginVertical: 20,
              }}
            />
          ) : uploadImage ? (
            <>
              <Image
                source={{ uri: uploadImage }}
                style={{
                  height: 190,
                  width: 190,
                  borderRadius: 100,
                  marginVertical: 20,
                }}
              />
            </>
          ) : (
            <TouchableOpacity onPress={handleImageUpload}>
              <FontAwesome5 name="camera" size={25} color="orange" />
            </TouchableOpacity>
          )}
        </CircleLogo>
        {image && image.url ? (
          <TouchableOpacity onPress={handleImageUpload}>
            <FontAwesome5
              name="camera"
              size={25}
              color="orange"
              style={{
                marginTop: -5,
                marginBottom: 10,
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
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
