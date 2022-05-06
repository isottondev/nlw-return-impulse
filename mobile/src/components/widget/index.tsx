import { ChatTeardropDots } from "phosphor-react-native";
import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { theme } from "../../theme";
import { styles } from "./styles";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { Options } from "../options";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Form } from "../form";
import { Success } from "../success";

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleWidgetOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleFeedbackRestart() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleWidgetOpen}>
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight={"bold"}
        />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Success handleFeedbackRestart={handleFeedbackRestart} />
        ) : (
          <>
            {feedbackType ? (
              <Form
                feedbackType={feedbackType}
                handleFeedbackRestart={handleFeedbackRestart}
                onFeedbackSent={() => setFeedbackSent(true)}
              />
            ) : (
              <Options onFeedbackTypeChanged={setFeedbackType} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
