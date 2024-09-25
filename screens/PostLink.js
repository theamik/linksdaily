import { SafeAreaView, ScrollView, TextInput, View } from "react-native";
import React, { useState } from "react";
import Text from "@kaloraat/react-native-text";
import SubmitButton from "../components/auth/SubmitButton";

import urlRegex from "url-regex";

const PostLink = () => {
  const [link, setLink] = useState();
  const [loading, setLoading] = useState();
  const [title, setTitle] = useState();
  const [urlPreview, setUrlPreview] = useState();

  const handleChange = (text) => {
    try {
      setLoading(true);
      setLink(text);
      if (urlRegex({ strict: false }).test(text)) {
        ogs({ url: text }, (error, result, response) => {
          console.log(result);
          if (result.success) {
            setUrlPreview(result);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    console.log("Title & URL ===>", title, link);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator>
        <Text light center style={{ paddingTop: 30 }}>
          Paste website link here
        </Text>
        <TextInput
          value={link}
          onChangeText={(text) => handleChange(text)}
          placeholder="Enter a website URL"
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            borderWidth: 1,
            borderColor: "grey",
            height: 50,
            marginVertical: 30,
            marginHorizontal: 15,
            borderRadius: 10,
            padding: 15,
          }}
        />
        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Enter a title of website URL"
          autoCapitalize="sentences"
          style={{
            borderWidth: 1,
            borderColor: "grey",
            height: 50,
            marginVertical: 30,
            marginHorizontal: 15,
            borderRadius: 10,
            padding: 15,
          }}
        />
        <View style={{ paddingTop: 10 }}>
          <SubmitButton
            title="Submit"
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </View>
        <Text>{JSON.stringify(urlPreview, null, 4)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostLink;
