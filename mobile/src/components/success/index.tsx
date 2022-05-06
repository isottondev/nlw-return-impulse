import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import doneImage from "../../assets/success.png";
import { Copyright } from "../copyright";
import { styles } from "./styles";

interface SuccessProps {
  handleFeedbackRestart: () => void;
}
export function Success({ handleFeedbackRestart }: SuccessProps) {
  return (
    <View style={styles.container}>
      <Image source={doneImage} style={styles.image} />
      <Text style={styles.title}>Agradecemos o feedback!</Text>
      <TouchableOpacity style={styles.button} onPress={handleFeedbackRestart}>
        <Text style={styles.buttonTitle}>Quero enviar outro</Text>
      </TouchableOpacity>
      <Copyright />
    </View>
  );
}
