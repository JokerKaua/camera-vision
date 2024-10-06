import { StyleSheet, Animated, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { Ionicons } from '@expo/vector-icons';

export default function MediaSettings() {

  const [visible, setVisible] = useState<boolean>(false);

  const rotationGear = useRef(new Animated.Value(0)).current;
  const colorGear = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.timing(rotationGear, {
      toValue: visible ? -1 : 0,
      duration: 300,
      useNativeDriver: true
    }).start();

    Animated.timing(colorGear, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true
    }).start();

  }, [visible]);

  const press = () => {
    setVisible(!visible)
    // console.log(`Visible: ${visible}`);
  }

  return (

    <Pressable
      style={styles.container}
      onPress={press}
    >
      <Animated.View style={[{
        transform: [
          { rotate: rotationGear.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '80deg'] }) },
          { scale: colorGear.interpolate({ inputRange: [0, 1], outputRange: [1, 1.25] }) }
        ]
      }]}>
        <Ionicons name="settings-outline" size={24} color={'#c0c0c0'} />
      </Animated.View>
    </Pressable>

  )
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#c0c0c0',
    backgroundColor: '#c0c0c00',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.75
  }
});