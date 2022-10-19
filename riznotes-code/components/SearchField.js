import React from 'react';
import colors from '../components/Colours';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, View, TextInput } from 'react-native';


const SearchField = ({ containerStyle, onClear, onChangeText, value }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.searchBox}
        placeholder='Search for your notes here'
      />
    {value ? (
        <AntDesign
          name='closesquare'
          size={20}
          color={colors.MAIN}
          onPress={onClear}
          style={styles.eraseButton}
        />
      ) : null}  
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    fontSize: 21,
    borderColor: colors.MAIN,
    borderWidth: 0.7,
    borderRadius: 35,
    paddingLeft: 20,
    height: 35,
  },
  container: {
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  eraseButton: {
    position: 'absolute',
    right: 20,
  },
});

export default SearchField;
