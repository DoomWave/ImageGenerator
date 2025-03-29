import {
  Image,
  StyleSheet,
  Platform,
  View,
  TextInput,
  Pressable,
  Text,
  Alert,
  ActivityIndicator
} from "react-native";
import React, {useState} from "react";
import { Colors } from '../../constants/Colors';

export default function HomeScreen() {
  const [text, onChangeText] = React.useState("Text to image");
  const [loading, setLoading] = useState(false)
  const [imageUri, setImageUri] = React.useState(null); // State to 
  
  const handlePress = async () => {
    setLoading(true);
    console.log("Text sent to API", text)
  
    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
  
      const data = await response.json(); // Parse response as JSON
      if (data.image) { 
        setImageUri(data.image);
      } else {
        console.error("No image received");
      }
    } catch (error) {
      console.error("Error fetching the image:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          height: 40,
          marginTop: 340,
          borderWidth: 1,
          padding: 10,
          color: 'white'
        }}
        onChangeText={onChangeText}
        placeholder="Enter text to generate image"
        value={text}
      ></TextInput>

      <Pressable onPress={handlePress}>
        <Text style={{color: 'white'}}>Generate Image</Text>
      </Pressable>
      {imageUri && (
        <Image
        source={{ uri: imageUri}}
        style={{width: 300, height: 300}}
        resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue'
  },
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
  textInput: {
    width: "100%",
    height: 50,
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loader: {
    marginVertical: 20,
  },
});
