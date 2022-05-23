import React, { useState } from 'react';
import { WordsContext } from '../../App';
import { View, Text } from 'react-native';

const WordItem = ({word}) => {
console.log({word});
  return (
      
    <View>
      <Text>{word.item.value}</Text>
      <Text>{word.item.translation}</Text>
    </View>
            
    );
}

export default WordItem;
