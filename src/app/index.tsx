// Imports das bilbiotecas
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

import * as MediaLibrary from 'expo-media-library';

// Imports components
import { MediaViewer } from '../components/MediaViewer';
import MediaSettings from '../components/MediaSettings';

// Criando components animados
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);


export default function Index() {

  // Declarando o dispositivo da camera
  const device = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);

  // Permissons
  const { hasPermission, requestPermission } = useCameraPermission();
  const [permissionResponse, requestPermissionMedia] = MediaLibrary.usePermissions();

  const [permission, setPermission] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  // Variables 
  const [lastVideoUri, setLastVideoUri] = useState<string | null>(null);


  // Functions
  const startRecording = async () => {
    // Caso não tenha ref e nem um device, não será executada
    if (!cameraRef || !device) {
      console.log(`Não existe camera ou device`);
      return
    }
    // Define a variavel isRecording como `true`
    setIsRecording(true);

    console.log(`Gravando...`);

    // Utilizando o ref para começar a grtavar
    cameraRef.current?.startRecording({
      // Propriedades do método startRecording - veja https://react-native-vision-camera.com/docs/api/classes/Camera#startrecording 
      fileType: 'mp4',
      videoCodec: 'h265',
      onRecordingFinished: async (video) => {
        console.log(video);
        try {
          // Salvando o vídeo na galeria através da biblioteca do expo, MediaLibrary
          const asset = await MediaLibrary.createAssetAsync(video.path); 
          setLastVideoUri(asset.id);
          
          console.log(`Video salvo na galeria!`);
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
    // Definie isRecording como false
    setIsRecording(false);
    await cameraRef.current?.stopRecording();
    console.log(`Gravação finalizada!`);
  }
  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePhoto();

    if (photo) {
      const asset = await MediaLibrary.createAssetAsync(photo?.path);
      setLastVideoUri(asset.id);

      console.log(`Foto armazenada na galeria!`);
    }
  }

  // Request permissions
  useEffect(() => {

    const requestsPermissions = async () => {
      const status = await requestPermission(); 
      const mediaStatus = await requestPermissionMedia(); 

      if (status && mediaStatus?.granted) {
        setPermission(true) 
        console.log('Permission accepted');
      } else {
        console.log('Permissões negadas');
      }
    }
    requestsPermissions()
  }, []);

  // Animations 
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: isRecording ? 6 : 0, // Altera para 6 quando gravando e 0 quando não
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isRecording]);


  if (!permission || !device) 
    return <View></View>
  
  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={[StyleSheet.absoluteFill]}
        device={device}
        isActive={true}
        video={true}
        photo={true}

      />

      <View style={styles.footer}>
        <MediaViewer lastMediaUri={lastVideoUri}/>
         <AnimatedPressable
          style={[styles.cameraButton, { borderWidth: borderAnim, borderColor: 'red' }]}
          onPress={() => {
            takePhoto()
          }}
          delayLongPress={200}
          onLongPress={() => {
            if (!isRecording) {
              startRecording();
            }
          }}
          onPressOut={() => {
            if (isRecording) {
              stopRecording();
            }
          }}>
        </AnimatedPressable>
        <MediaSettings />
      </View>

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
    width: 70,
    backgroundColor: '#c8c8c8',
    height: 70,
    borderRadius: 100,
    opacity: 0.6,
    alignSelf: 'center'
  },
  footer: {
    position: `absolute`,
    bottom: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});