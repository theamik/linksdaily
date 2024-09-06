import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import Text from "@kaloraat/react-native-text";
const UserInput = ({
  name,
  value,
  setValue,
  autoComplete = "none",
  autoCapitalize = "none",
  keyboardType = "default",
  secureTextEntry = false,
}) => {
  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text semi>{name}</Text>
      <TextInput
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        style={styles.textInput}
        secureTextEntry={secureTextEntry}
        autoComplete={autoComplete}
        value={value}
        onChangeText={(text) => setValue(text)}
      ></TextInput>
    </View>
  );
};

export default UserInput;

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 0.5,
    height: 48,
    borderBottomColor: "#8e93a1",
    marginBottom: 30,
  },
});
