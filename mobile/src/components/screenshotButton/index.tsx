import { Camera, Trash } from "phosphor-react-native";
import React, { useState } from "react";
import { ActivityIndicator, TouchableOpacity, Image, View } from "react-native";
import { theme } from "../../theme";
import { captureScreen } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";

import { styles } from "./styles";

interface ScreenshotButtonProps {
  screenshot: string | null;
  isLoading: boolean;
  onTakeShot: (uri: string) => void;
  onRemoveShot: () => void;
}

export function ScreenshotButton({
  screenshot,
  onRemoveShot,
  onTakeShot,
}: ScreenshotButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  function handleScreenshot() {
    setIsLoading(true);
    captureScreen({
      format: "png",
      quality: 0.8,
    })
      .then(async (uri) => {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: "base64",
        });
        onTakeShot(`data:image/png;base64, ${base64}`);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={screenshot ? onRemoveShot : handleScreenshot}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors.text_on_brand_color} />
      ) : (
        <>
          {screenshot ? (
            <View>
              <Image style={styles.image} source={{ uri: screenshot }} />
              <Trash
                size={22}
                color={theme.colors.text_secondary}
                weight={"fill"}
                style={styles.removeIcon}
              />
            </View>
          ) : (
            <Camera
              size={24}
              color={theme.colors.text_secondary}
              weight={"bold"}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}
