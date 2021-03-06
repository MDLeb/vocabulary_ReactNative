import React, {useState, Fragment, createContext, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Library from './src/pages/library';
import Learn from './src/pages/learn';
import AsyncStorage from '@react-native-async-storage/async-storage';


const WordsContext = createContext();
const Drawer = createDrawerNavigator();

const App = () => {

  const [wordsArray, setWordsArray] = useState([]);
  
  let checkStorage = async() => {
    return await AsyncStorage.getItem('words').then(res => JSON.parse(res));
  }

  useEffect(() => {
    checkStorage().then(setWordsArray);
   }, []);
   
  // const [score, setScore] = useState((async () => {await AsyncStorage.getItem('score')}) ?
  //                                                 (async () => {await AsyncStorage.getItem('score')}) :
  //                                                 0);
  const [score, setScore] = useState(0);
  // const [level, setLevel] = useState((score >= 50) ? 1 : 0);

  // if(level > 0 && score >= (level+1)*50) setLevel(level+1);

  // useEffect(async () => {
  //   await AsyncStorage.clear();
  //   await AsyncStorage.setItem(`words`, JSON.stringify(wordsArray));
  //   await AsyncStorage.getItem('words').then(res => console.log(res.JSON));
  //   // await AsyncStorage.setItem(`score`, score);
  //   // if(level == 0 && score >= 50)
  //   //   setLevel(1);
  //   // if(level > 0 && score >= level*50)
  //   //   setLevel(level+1);
  // }, [wordsArray]);

  return (
    <WordsContext.Provider value={[[wordsArray, setWordsArray], [score, setScore]]} >
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Library" useLegacyImplementation
            drawerContent={(props) => <CustomDrawerContent {...props}/>}>
                <Drawer.Screen name="Library" component={Library} />
                <Drawer.Screen name="Learn" component={Learn} />
          </Drawer.Navigator>
        </NavigationContainer>
    </WordsContext.Provider>

  );
}

function CustomDrawerContent(props) {///?????????? ????????????, ???? ???????? ???? ?????????????????? ?????????????????????? ???????????? ?????????????????? - ??????????????????????
  return (
    
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem style={style.navbar__btn}
        label="Help"
        onPress={() => {
          console.log(props);
          props.navigation.navigate('Learn');
        }}
      />
    </DrawerContentScrollView>
    
  );
}

let style = StyleSheet.create({
  navbar__btn: {
    backgroundColor: '#ccc',
    color: 'white',
    borderRadius: 0,
  }
});

export { WordsContext };
export default App;

