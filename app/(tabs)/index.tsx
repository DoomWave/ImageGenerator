import {
  Image,
  StyleSheet,
  Platform,
  View,
  TextInput,
  Pressable,
  Text,
  Alert,
} from "react-native";
import React from "react";

export default function HomeScreen() {
  const [text, onChangeText] = React.useState("Text to image");
  const [image, setImage] = React.useState(null);
  const [imageUri, setImageUri] = React.useState(null); // State to hold the image URI

  const handlePress = () => {
    console.log(text); // Log the text value to ensure it's captured

    // Send a POST request with the 'text' variable to the backend
    fetch("http://localhost:3000/chat", {
      method: "POST", // Set the method to POST
      headers: {
        "Content-Type": "application/json", // Inform the server that we're sending JSON data
      },
      body: JSON.stringify({ text: text }), // Send the text variable in the body
    })
      .then((response) => response.blob()) // Convert the response to a Blob
      .then((blob) => {
        // Create a URL for the Blob (image)
        const imageObjectURL = URL.createObjectURL(blob);
        // setImageUri(imageObjectURL); // Update state with the image URL
        console.log(imageUri)
      })
      .catch((error) => {
        console.error("Error fetching the image:", error); // Handle any errors
      });

    console.log("Server called");
  };

  return (
    <View>
      <TextInput
        style={{
          height: 40,
          marginTop: 340,
          borderWidth: 1,
          padding: 10,
        }}
        onChangeText={onChangeText}
        value={text}
      ></TextInput>

      <Pressable onPress={handlePress}>
        <Text>Test</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
