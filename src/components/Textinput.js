import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput as NativeTextInput,
  StyleSheet
} from 'react-native';

export const TextInput = ({label, value = '', ...props}) => {
  const [focused, setFocused] = useState(false);
  console.log(value);
  const isActive = focused || Boolean(value && value.trim());

  return (
    <View style={styles.container}>
      <Text style={[styles.label, isActive && styles.labelActive]}>
        {label}
      </Text>
      <NativeTextInput
        {...props}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={styles.control}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16
  },
  label: {
    position: 'absolute',
    left: 0,
    top: 18,
    fontSize: 18,
    color: '#d8d8d8'
  },
  labelActive: {
    top: 0,
    fontSize: 14,
    color: '#d8d8d8'
  },
  control: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaecef',
    height: 40
  }
});
