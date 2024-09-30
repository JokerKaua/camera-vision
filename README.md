# React native vision camera


- Configurando o android studio
  
  - Salvando variáveis de ambiente
  
  ANDROID_HOME
  ```txt
    %userprofile%\AppData\Local\android\Sdk
  ```
  Novo registro no path
  ```txt
    %ANDROID_HOME%\platform-tools\
  ```


- Comandos de instalação e configuração

  -  Instalar npx
```bash
npm install -g npx
```
  -  Instalando bibliotecas
```bash
npm install
npx expo install react-native-camera-vision
npx expo install expo-media-library
```
 - Expo build pro android
```bash
npx expo prebuild
``` 

- Rodando o projeto (emulador):

```bash
npx expo run:android
```
