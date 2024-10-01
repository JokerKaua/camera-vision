import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function MediaSettings() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
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