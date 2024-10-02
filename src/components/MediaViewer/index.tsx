import { Href, router } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export function MediaViewer() {

  // Função para ir para a rota de MediaPage
  const navigate = () => {

    //Não, não sei o porque e nem quero saber, mas tem que ter esse 'as Href' aqui (pode ser 'as any' também)
    //Simplesmente dá erro quando não tem isso, é um erro de incompartibilidade de tipos
    //Mas, incrivelmente, mesmo dando erro, a rota funciona no aplicativo
    //Ou seja, apenas siga o roteiro
    router.navigate('/MediaPage' as Href);
  }

  return (
    <Pressable onPress={() => {navigate()}}>
      <View style={styles.container}>
        <Text>FOTOS</Text>
      </View>
    </Pressable>
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