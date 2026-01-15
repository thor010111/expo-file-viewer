import { Asset } from "expo-asset";
import * as ExpoFileViewer from "expo-file-viewer";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export default function App() {
  const openDUmmyFile = async () => {
    try {
      const asset = Asset.fromModule(require("./assets/dummy.pdf"));
      await asset.downloadAsync();
      if (!asset.localUri) {
        throw new Error("Failed to load asset");
      }

      await ExpoFileViewer.openFile(asset.localUri);
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={openDUmmyFile}>
        <Text>Test</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
