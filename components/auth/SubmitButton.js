import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Text from "@kaloraat/react-native-text";

const SubmitButton = ({ title, handleSubmit, loading }) => {
  return (
    <TouchableOpacity onPress={handleSubmit} style={styles.opacity}>
      <Text bold medium center>
        {loading ? "Loading..." : title}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  opacity: {
    backgroundColor: "#ff9900",
    borderRadius: 24,
    marginBottom: 20,
    height: 50,
    justifyContent: "center",
    marginHorizontal: 15,
  },
});
