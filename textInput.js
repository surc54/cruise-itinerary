import React, { Component } from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

export default function UselessTextInput(props) {

  return (
    <TextInput
      style={ styles.textBox }
      {...props}
      />
  );
}
