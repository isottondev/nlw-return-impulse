import { ArrowLeft, Copy } from "phosphor-react-native";
import React, { useState } from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import { api } from "../../libs/api";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Button } from "../button";
import { Copyright } from "../copyright";
import { ScreenshotButton } from "../screenshotButton";
import { FeedbackType } from "../widget";

import { styles } from "./styles";

interface FormProps {
  feedbackType: FeedbackType;
  handleFeedbackRestart: () => void;
  onFeedbackSent: () => void;
}
export function Form({
  feedbackType,
  handleFeedbackRestart,
  onFeedbackSent,
}: FormProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [isSending, setIsSending] = useState(false);

  async function handleSendFeedback() {
    if (isSending) {
      return;
    }

    setIsSending(true);
    try {
      await api.post("/feedbacks", {
        screenshot,
        comment,
        type: feedbackType,
      });
      setIsSending(false);
      onFeedbackSent();
    } catch (error) {
      console.log(error);
      setIsSending(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleFeedbackRestart()}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.title}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>
      <TextInput
        multiline
        style={styles.input}
        placeholder={feedbackTypeInfo.message}
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
      />
      <View style={styles.actions}>
        <ScreenshotButton
          isLoading={false}
          screenshot={screenshot}
          onTakeShot={(uri) => setScreenshot(uri)}
          onRemoveShot={() => setScreenshot(null)}
        />
        <Button isLoading={isSending} onPress={handleSendFeedback} />
      </View>
      <Copyright />
    </View>
  );
}
