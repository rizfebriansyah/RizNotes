import React, { useState } from 'react';
import {View, Text, StyleSheet, StatusBar, TextInput, Dimensions,} from 'react-native';
import EnterButton from '../components/EnterButton';
import colors from '../components/Colours';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomePage = ({ onFinish }) => {
  const [name, setName] = useState('');
  const handleOnChangeName = (text) => setName(text);
  
  const handleSubmision = async () => {
    const user = { name: name };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    if (onFinish) onFinish();
  };
  console.log(name);

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.titleInput}>Make this your personal notepad!</Text>
        <TextInput value = {name} onChangeText = {handleOnChangeName} placeholder = "What's your name?"
          style={styles.nameInput}
        />
        {name.trim().length >= 2 ? (
          <EnterButton antIconName = 'enter' onPress={handleSubmision} />
        ) : null}
      </View>
    </>
  );
};

const width = Dimensions.get('window').width - 70;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameInput: {
    borderWidth: 2,
    borderColor: colors.MAIN,
    color: colors.NAME,
    width,
    height: 45,
    borderRadius: 7,
    paddingLeft: 15,
    fontSize: 28,
    marginBottom: 20,
  },
  titleInput: {
    alignSelf: 'flex-start',
    marginBottom: 2,
    paddingLeft: 50,
    opacity: 0.8,
  },
});

export default WelcomePage;
