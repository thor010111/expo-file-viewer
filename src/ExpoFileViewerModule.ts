import * as FileSystem from "expo-file-system";
import { startActivityAsync } from "expo-intent-launcher";
import { requireNativeModule } from "expo-modules-core";
import { Linking, Platform } from "react-native";

type OpenFileFunction = (filePath: string) => Promise<void>;

let openFile: OpenFileFunction;

switch (Platform.OS) {
  case "ios":
    openFile = async (filePath: string) => {
      const expoFileViewer = requireNativeModule("ExpoFileViewer");
      await expoFileViewer.openFile(filePath);
    };
    break;
  case "android":
    openFile = async (filePath: string) => {
      const contentUri = await FileSystem.getContentUriAsync(filePath);
      await startActivityAsync("android.intent.action.VIEW", {
        data: contentUri,
        flags: 1,
      });
    };
    break;
  default:
    openFile = async (filePath: string) => {
      await Linking.openURL(filePath);
    };
}

export { openFile };
