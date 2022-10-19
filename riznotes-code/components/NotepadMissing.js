import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Text, StyleSheet, View } from 'react-native';

const NotepadMissing = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Text style={{ marginBottom: 15, fontSize: 30 }}>Note unavailable</Text>
      <AntDesign name='frown' color='blue' size={150} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
    opacity: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotepadMissing;
