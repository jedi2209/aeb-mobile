import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, View } from 'react-native';
import ArrowDropdown from '../components/ArrowDropdown';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favSport3: 'football'
    };
  }
  render() {
    return (
      <View style={[this.props.style, style.dropdown]}>
        <RNPickerSelect
          items={[
            {
              label: 'Automobile Manufacturers Committee',
              value: 'football',
              key: 'drop-1'
            },
            { label: 'Baseball', value: 'baseball', key: 'drop-2' },
            { label: 'Hockey', value: 'hockey', key: 'drop-3' }
          ]}
          onValueChange={value => {
            this.setState({
              favSport3: value
            });
          }}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 10,
              right: 12
            }
          }}
          value={this.state.favSport3}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ textAlign: 'left' }}
          Icon={() => {
            return <ArrowDropdown />;
          }}
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
