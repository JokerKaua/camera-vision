import { Href, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, Image } from 'react-native';

import * as MediaLibrary from 'expo-media-library';
import { FontAwesome } from '@expo/vector-icons';

export function MediaViewer({ lastMediaUri }: { lastMediaUri: string | null }) {

  const [thumbNail, setThumNail] = useState<string | null>(null);

  useEffect(() => {
    const loadThumbNail = async () => {
      if (lastMediaUri) {
        // console.log('lastMediaUri:', lastMediaUri); // Log do lastVideoUr
        try {
          const asset = await MediaLibrary.getAssetInfoAsync(lastMediaUri); // lastMediaUri should be a ID
          // console.log('Asset info:', asset); 

          if (asset.uri) {
            console.log('localUri encontrada:', asset.uri);
            setThumNail(asset.uri);
          } else {
            console.log('uri não encontrada no asset');
          }
        } catch (error) {
          console.error(`Erro ao carregar thumbnail do MediaView: ${error}`);
        }
      }
    };
    loadThumbNail();
  }, [lastMediaUri]);


  // Função para ir para a rota de MediaPage
  const navigate = () => {
    //Não, não sei o porque e nem quero saber, mas tem que ter esse 'as Href' aqui (pode ser 'as any' também)
    //Simplesmente dá erro quando não tem isso, é um erro de incompartibilidade de tipos
    //Mas, incrivelmente, mesmo dando erro, a rota funciona no aplicativo
    //Ou seja, apenas siga o roteiro
    router.navigate('/MediaPage' as Href);
  }

  return (
    <Pressable onPress={() => { navigate() }}>
      <View style={styles.container}>
        {thumbNail ? (
          <Image source={{uri: thumbNail}} style={styles.thumbnail} resizeMode='cover'/>
        ) : (
          <FontAwesome name="photo" size={24} color="#c0c0c0" />
        )}

      </View>
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
  },
  thumbnail: {
    flex: 1,
    width: `100%`,
    height: `100%`,
    borderRadius: 10,
  }
});