import * as FileSystem from "expo-file-system";
import { startActivityAsync } from "expo-intent-launcher";
import { requireNativeModule } from "expo-modules-core";
import { Linking, Platform } from "react-native";

interface ExpoFileViewerModule {
  openFile(filePath: string): Promise<void>;
}

let expoFileViewerModule: ExpoFileViewerModule;

switch (Platform.OS) {
  case "ios":
    expoFileViewerModule = requireNativeModule("ExpoFileViewer");
    break;
  case "android":
    expoFileViewerModule = {
      openFile: async (filePath: string) => {
        const contentUri = await FileSystem.getContentUriAsync(filePath);
        await startActivityAsync("android.intent.action.VIEW", {
          data: contentUri,
          flags: 1,
        });
      },
    };
    break;
  default:
    expoFileViewerModule = {
      openFile: async (filePath: string) => {
        await Linking.openURL(filePath);
      },
    };
}

export default expoFileViewerModule;
