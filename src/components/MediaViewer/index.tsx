import { View, Text, StyleSheet } from 'react-native'

export function MediaViewer() {
  return (
    <View style={styles.container}>
      <Text>FOTOS</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#c0c0c0'
    }
});