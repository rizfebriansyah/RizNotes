import React from 'react';
import colors from '../components/Colours';
import { Dimensions, StyleSheet, TouchableOpacity, Text, } from 'react-native';

const Notepad = ({ item, onPress }) => {
  const { title, desc } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.notepadTitle} numberOfLines={2}>
        {title}
      </Text>
      <Text numberOfLines={5}>{desc}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width - 20;

const styles = StyleSheet.create({
  container: {
    width: width / 2,
    backgroundColor: colors.MAIN,
    borderRadius: 20,
    padding: 12,
    marginLeft: 5,
    marginRight: 5,

  },
  notepadTitle: {
    fontWeight: 'bold',
    color: colors.LIGHT,
    fontSize: 20,
  },
});

export default Notepad;
