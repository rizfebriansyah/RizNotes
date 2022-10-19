import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import WelcomePage from './screens/WelcomePage';
import NotepadStructure from './components/NotepadStructure';
import NotepadProvider from './components/NotepadProvider';
import MainPage from './screens/MainPage';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState ({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');

    if (result === null) return setIsAppFirstTimeOpen(true);

    console.log(result)
    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);

  };

  useEffect(() => {
    findUser();
  
  }, []);

  const RenderMainPage = props => <MainPage {...props} user={user} />;

  if (isAppFirstTimeOpen) return <WelcomePage onFinish={findUser} />;
  return (
    <NavigationContainer>
      <NotepadProvider>
        <Stack.Navigator
          screenOptions={{ headerTitle: '', headerTransparent: true }}
        >
          <Stack.Screen component={RenderMainPage} name='MainPage' />
          <Stack.Screen component={NotepadStructure} name='NotepadStructure' />
        </Stack.Navigator>
      </NotepadProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
