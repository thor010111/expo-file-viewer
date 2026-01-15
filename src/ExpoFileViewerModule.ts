import * as FileSystem from "expo-file-system/legacy";
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
      // Android Intent flags:
      // FLAG_ACTIVITY_NEW_TASK = 0x10000000 = 268435456
      // FLAG_GRANT_READ_URI_PERMISSION = 0x00000001 = 1
      // Combined: 268435456 | 1 = 268435457
      await startActivityAsync("android.intent.action.VIEW", {
        data: contentUri,
        flags: 268435457, // FLAG_ACTIVITY_NEW_TASK | FLAG_GRANT_READ_URI_PERMISSION
      });
    };
    break;
  default:
    openFile = async (filePath: string) => {
      await Linking.openURL(filePath);
    };
}

export { openFile };
