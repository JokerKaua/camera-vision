// Imports das bilbiotecas
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

import * as MediaLibrary from 'expo-media-library';
import { MediaViewer } from '../components/MediaViewer';
import MediaSettings from '../components/MediaSettings';

// Imports components


// Criando components animados
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Função que será retornada (basicamente a telas)
export default function Index() {

  // Declarando o dispositivo da camerca, no caso, a camera traseira
  const device = useCameraDevice('back');
  // Utilizando uma variavel como referencia para um elemento, precisa estar nas propriedades do elemento <Camera> tambem
  const cameraRef = useRef<Camera>(null);

  // Pegar variáveis e métodos de permissões para uso de camera e acesso aos arquivos
  const { hasPermission, requestPermission } = useCameraPermission();
  const [permissionResponse, requestPermissionMedia] = MediaLibrary.usePermissions();

  // Variáveis e setters para controle das permissiões, as variáveis são `permission` e `isRecording`, ambas booleans (true ou false)
  // Pesquise mais sobre useState do react
  const [permission, setPermission] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  // Criando função para iniciar uma gravação
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
      onRecordingFinished: (video) => {
        console.log(video);

        try {
          // Salvando o vídeo na galeria através da biblioteca do expo, MediaLibrary
          const asset = MediaLibrary.createAssetAsync(video.path);
          console.log(`Video salvo na galeria:`);
          console.log(asset);
        } catch (error) {
          console.error(error);
        }

      },
      onRecordingError: (error) => {
        console.error(error);
      },
    });
  }
  // Função para parar de gravar
  const stopRecording = async () => {
    // Definie isRecording como false
    setIsRecording(false);
    await cameraRef.current?.stopRecording();
    console.log(`Gravação finalizada!`);
  }
  // Função para tirar foto e salvar na galeria
  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePhoto();
    if (photo) {
      const asset = MediaLibrary.createAssetAsync(photo?.path)
      console.log(`Foto armazenada na galeria!`);
    }
  }
  // Veja mais sobre useEffect do react
  // Aqui é para requisitar as permissões
  useEffect(() => {
    // Requisitando permissões
    const requestsPermissions = async () => {
      const status = await requestPermission(); // O nome do método tem que ser igual o que está na linha 26
      const mediaStatus = await requestPermissionMedia(); // O nome do método tem que ser igual o que está na linha 27

      // Condição para verificar se os status (camera) e o mediaStatus (arquivos) estão aceitos
      if (status && mediaStatus?.granted) {
        setPermission(true) // Define a variável permission como true
        console.log('Permission accepted');
      } else {
        console.log('Permissões negadas');
      }
    }
    // O useEffect funciona meio que como um loop, então tem que chamar essa requestPermission aqui
    requestsPermissions()

  }, []);

  // Animações 
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: isRecording ? 6 : 0, // Altera para 6 quando gravando e 0 quando não
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isRecording]);


  // Essa condição verifica se estão inválidos as permissões e os dispositivo da camera e então retorna nada para caso a condição for atendida
  if (!permission || (!device)) {
    return <View></View>
  }
  // Caso a condição não retorne, esse vai ser o return padrão
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
        <MediaViewer/>
        {/* <Pressable */}
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
        {/* </Pressable> */}
        <MediaSettings />
      </View>

    </View>
  );

}

// Estilizalção
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