import { View, Text, StyleSheet } from 'react-native';

export default function MediaPage() {

  return (
    <View style={styles.container}>
      <Text>Medias Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});