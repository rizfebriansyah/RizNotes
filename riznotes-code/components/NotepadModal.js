import React, { useState, useEffect, } from 'react';
import {  View,  TouchableWithoutFeedback, StatusBar, StyleSheet,  Modal,  TextInput, Keyboard, } from 'react-native';
import EnterButton from '../components/EnterButton';
import colors from '../components/Colours';

const NotepadModal = ({ visible, onSubmit, onClose, isEdit, notepad }) => {
  const [title, setNotepadTitle] = useState('');
  const [desc, setNotepadDesc] = useState('');
  const handleModalNotepadClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setNotepadTitle(notepad.title);
      setNotepadDesc(notepad.desc);
    }
  }, [isEdit]);

  const closeNotepadModal = () => {
    if (!isEdit) {
      setNotepadTitle('');
      setNotepadDesc('');
    }
    onClose();
  };

  const handleOnChangeNotepadText = (text, valueFor) => {
    if (valueFor === 'title') setNotepadTitle(text);
    if (valueFor === 'desc') setNotepadDesc(text);
  };

  const handleSubmission = () => {
    if (!title.trim() && !desc.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setNotepadTitle('');
      setNotepadDesc('');
    }
    onClose();
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType='slide'>
        <View style={styles.container}>
          <TextInput
            value={title}
            onChangeText={text => handleOnChangeNotepadText(text, 'title')}
            placeholder='Note Title'
            style={[styles.inputTitle, styles.mainTitle]}
          />
          <TextInput
            value={desc}
            multiline
            placeholder='Description'
            style={[styles.inputTitle, styles.inputDesc]}
            onChangeText={text => handleOnChangeNotepadText(text, 'desc')}
          />
          <View style={styles.buttonContainer}>
            {title.trim() || desc.trim() ? (
              <EnterButton
                size={25}
                style={{ marginRight: 10 }}
                antIconName='closesquareo'
                onPress={closeNotepadModal}
              />
            ) : null}
            <EnterButton
              size={25}
              antIconName='checksquareo'
              onPress={handleSubmission}
            />            
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalNotepadClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 18,
  },
  inputTitle: {
    fontSize: 30,
    borderBottomWidth: 3,
    borderBottomColor: colors.MAIN,
    color: colors.DARK,
  },
  modalBG: {
    zIndex: -1,
    flex: 1,
  },
  mainTitle: {
    height: 50,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  inputDesc: {
    fontSize: 15,
    height: 200,
  },
  buttonContainer: {
    paddingVertical: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default NotepadModal;
