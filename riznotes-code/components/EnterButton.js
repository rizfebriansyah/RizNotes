import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import colors from '../components/Colours';

const EnterButton = ({ antIconName, onPress, color, size, style  }) => {
  return (
    <AntDesign
      name={antIconName}
      onPress={onPress}
      color={color || colors.LIGHT}
      size={size || 30}
      style={[styles.icon, { ...style }]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#FE2D00',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 10,
    elevation: 5,
    shadowColor: '#1F1F1F', 
  },
});

export default EnterButton;