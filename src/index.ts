import FileSystem from "expo-file-system";
import { startActivityAsync } from "expo-intent-launcher";
import { Platform } from "expo-modules-core";
import { Linking } from "react-native";

import ExpoFileViewerModule from "./ExpoFileViewerModule";

async function openFile(filePath: string) {
  if (Platform.OS === "web") {
    await Linking.openURL(filePath);
  } else if (Platform.OS === "android") {
    const contentUri = await FileSystem.getContentUriAsync(filePath);
    await startActivityAsync("android.intent.action.VIEW", {
      data: contentUri,
      flags: 1,
    });
  } else if (Platform.OS === "ios") {
    await ExpoFileViewerModule.openFile(filePath);
  }
}

export { openFile };
