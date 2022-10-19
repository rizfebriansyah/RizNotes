import 'react-native';
import React from 'react';
import MainPage from '../screens/MainPage';
import render from 'react-test-renderer';

test('MainPage snapShot', ()=> {
    const snap = render.create(
        < MainPage />
    ).toJSON();
expect(snap).toMatchSnapshot();    
});