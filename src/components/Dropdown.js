import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, View } from 'react-native';
import ArrowDropdown from '../components/ArrowDropdown';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    };
  }

  render() {
    return (
      <View style={[this.props.style, style.dropdown]}>
        <RNPickerSelect
          items={this.props.options}
          onValueChange={value => {
            this.setState({
              filter: value
            });
          }}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 8,
              right: 12
            }
          }}
          value={this.state.filter}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ textAlign: 'left' }}
          Icon={() => <ArrowDropdown />}
        />
      </View>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 17,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: '#ACB1C0',
    borderRadius: 4,
    color: '#ACB1C0',
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    textAlign: 'left',
    fontSize: 17,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 0,
    borderColor: '#ACB1C0',
    borderRadius: 8,
    color: '#ACB1C0',
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});

const style = StyleSheet.create({
  dropdown: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'stretch',
    backgroundColor: '#FFF',
    fontSize: 17,
    color: '#000',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ACB1C0',
    borderStyle: 'solid'
  }
});
