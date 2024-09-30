import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

import * as MediaLibrary from 'expo-media-library';

export default function Index() {

  const device = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);

  const { hasPermission, requestPermission } = useCameraPermission();

  const [permissionResponse, requestPermissionMedia] = MediaLibrary.usePermissions();



  const [permission, setPermission] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const startRecording = async () => {
    if (!cameraRef || !device) {
      console.log(`Não existe camera ou devce`);
      return
    }
    setIsRecording(true);

    console.log(`Gravando...`);
    
    cameraRef.current?.startRecording({
      onRecordingFinished: (video) => {
        console.log(video);

        try {
          const asset = MediaLibrary.createAssetAsync(video.path);
          console.log(`Video salvo na galeria: ${asset}`);
        } catch (error) {
          console.error(error);
        }

      },
      onRecordingError: (error) => {
        console.error(error);
      },
    });
  }
  const stopRecording = async () => {
    setIsRecording(false);
    await cameraRef.current?.stopRecording();
    console.log(`Gravação finalizada!`);
  }
  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePhoto();
    if(photo){
      const asset = MediaLibrary.createAssetAsync(photo?.path)
      console.log(`Foto armazenada na galeria!`);
    }
  }

  useEffect(() => {

    const requestCamera = async () => {
      const status = await requestPermission();
      const mediaStatus = await requestPermissionMedia();

      if (status && mediaStatus?.granted) {
        setPermission(true)
        console.log('Permission accepted');
      } else {
        console.log('Permissões negadas');
      }
    }
    requestCamera()

  }, []);


  if (!permission || (!device || device == null)) {
    return <View></View>
  }

  return (
    <View style={styles.container}>
      <Text>Camera app</Text>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        video={true}
        photo={true}
      />
      <Pressable
        style={styles.cameraButton}
        // onPress={() => {
        //   console.log(`Gravando: ${!isRecording}`);
        //   if (!isRecording) {
        //     startRecording();
        //   } else {
        //     stopRecording();
        //   }
        // }}
        onPress={()=>{
          takePhoto()
        }}
        onLongPress={()=>{
          if(!isRecording){
            startRecording();
          }
        }}
        onPressOut={()=>{
          if(isRecording){
            stopRecording();
          }
        }}
      >

      </Pressable>
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
  cameraButton: {
    width: 80,
    backgroundColor: '#c8c8c8',
    height: 80,
    borderRadius: 100,
    position: 'absolute',
    bottom: 32,
    zIndex: 1000,
    opacity: 0.6

  }
});