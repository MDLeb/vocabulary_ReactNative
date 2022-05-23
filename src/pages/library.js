import React, {useState} from 'react';
import { WordsContext } from '../../App';

import {Text, View, TextInput, SafeAreaView, FlatList} from 'react-native';
import { Button } from 'react-native-web';
import WordItem from '../components/word';

export default function Library() {
    // return (
    //     <Text>Library component</Text>
    // )
    class Word {
        constructor(word) {
          this.value = word;
          this.learnLevel = 0;
          this.id = Date.now();
          this.meaning = '';
        }
        async init(callback) {//запрос перевода слова + meaning
    
            //TRANSLO_API
    
            const encodedParams = new URLSearchParams();
            encodedParams.append("fast", "false");
            encodedParams.append("from", "en");
            encodedParams.append("to", "ru");
            encodedParams.append("text", `${this.value}`);
    
            const options = {
              method: 'POST',
              headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Host': 'translo.p.rapidapi.com',
                'X-RapidAPI-Key': '90699d32b3msh5c1261c72a4493bp1e89c5jsn4d9e6c19f200'
              },
              body: encodedParams
            };
    
            setIsLoading(true);
            //TRANSLO_API
    
            await fetch('https://translo.p.rapidapi.com/api/v3/translate/', options)
              .then(response => response.json())
              .catch((e) => {
                
              })//417????????????
              .then(response => {
                if (!response.translated_text) {
                  alert('We didn`t find translation for this word');//??
                  this.translation = 'Hasn`t been translated';
                  return;
                }
                response.translated_text.includes(';') ? this.translation = response.translated_text.split(';')[0] : this.translation = response.translated_text;
              })
              .finally(() => {setIsLoading(false)});
          
            callback.bind(this)();
        }
      }
      
      let [inputValue, setInputValue] = useState('');

      async function add()  {//менять!!!
        if(!inputValue) return;
        let word = new Word(inputValue);
        //let spinner = document.createElement('Spinner');
        //document.querySelector('.library').append(spinner);
        await word.init(() => {});
        setInputValue('');
        return word;
      }
    
       const [isLoading, setIsLoading] = useState(false);      
    
    //   function sortByField(array, params = {}) {
    //     let arr = [];
    //     if (!params.filter) {
    //       arr = array.sort((a, b) => {
    //       if (params.field == 'learnLevel') 
    //         return (a[params.field] > b[params.field] ? 1 : -1);
    //       else 
    //         return (a[params.field].toLowerCase() > b[params.field].toLowerCase() ? 1 : -1);
    //       });
    //     } else {
    //         arr = array.filter(elem => elem.value.includes(params.value));
    //     }
    //     return arr;
    //   }
      
    //   let [sortBy, setSortBy] = useState({
    //     field: 'value',
    //     filter: false,
    //     value: '',
    //   })
      //value, translation, learnLevel
      //+filter = 'word' entered
      
      const renderWord = (item) => (
        <WordItem word={item} />
      )

      return (
        <WordsContext.Consumer>
        {([[wordsArray, setWordsArray], [score, setScore]]) => (
            <View>
              {/* {isLoading ? <Spinner /> : ''} */}
              <View>
                <TextInput placeholder='Write your word here...' onChangeText={setInputValue} value={inputValue}></TextInput>
                <Button title="Add word" onPress={async () => {
                    let word = await add();
                    (setWordsArray([...wordsArray, word]));
                }}/>
              </View>
              <View>
                <ul>
                  <li>
                      Word
                      {/* <Button onPress={() => {setSortBy({field:'value', filter: false, value: '',})}}>&#9660;</Button> */}
                  </li>
                  <li>
                      Translate
                      {/* <Button onPress={() => {setSortBy({field:'translation', filter: false, value: '',})}}>&#9660;</Button> */}
                 </li>
                  <li>
                      Learn level
                      {/* <Button  onPress={() => {setSortBy({field:'learnLevel', filter: false, value: '',})}}>&#9660;</Button> */}
                  </li>
                  <li></li>
                </ul>
                {(!wordsArray.length) ? 
                  <Text>There aren't any words. Add some :)</Text> : 
                //   sortByField(wordsArray, sortBy).map((word) => <WordItem  key={word.id} id={word.id} />)}
               // sortByField(wordsArray, sortBy).map((word) => <Text  key={word.id}>{word.value}</Text>)
                    <SafeAreaView>
                        <FlatList
                            data={wordsArray}
                            renderItem={renderWord}
                            keyExtractor={item => item.id}
                        />
                    </SafeAreaView>
                    //(console.log(wordsArray[0].value))
                }

              </View>
          </View>
        )}
      </WordsContext.Consumer>
      );
    }
