import { StyleSheet, Text, View } from 'react-native';

import * as ExpoFileViewer from 'expo-file-viewer';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoFileViewer.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
