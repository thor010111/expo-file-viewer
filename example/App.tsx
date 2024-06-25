import * as FileSystem from "expo-file-system";
import * as ExpoFileViewer from "expo-file-viewer";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export default function App() {
  const openDUmmyFile = async () => {
    const dummyPdfFilePath = `${FileSystem.bundleDirectory}/Resources/dummy.pdf`;

    console.log("dummyPdfFilePath open");
    await ExpoFileViewer.openFile(dummyPdfFilePath);
    console.log("dummyPdfFilePath close");
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
