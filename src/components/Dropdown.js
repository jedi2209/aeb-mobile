import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {StyleSheet, View} from 'react-native';
import ArrowDropdown from '../components/ArrowDropdown';

const defaultData = [
  {label: 'Тема', value: '0'},
  {label: 'AEB Board News', value: '17'},
  {
    label: 'AEB Committees News',
    value: '18'
  },
  {label: 'AEB News', value: '19'},
  {label: 'AEB Statements', value: '20'},
  {
    label: 'Automobile Manufacturers Committee',
    value: '21'
  },
  {
    label: 'Commercial Vehicles Committee',
    value: '22'
  },
  {label: 'Economic News', value: '23'},
  {label: 'External Events', value: '24'},
  {label: 'Legislative News', value: '25'},
  {
    label: 'Sales of cars and light commercial vehicles',
    value: '26'
  },
  {label: 'Taxation', value: '27'},
  {
    label: 'Sales of new commercial vehicles',
    value: '29'
  },
  {
    label: 'Sales of new construction equipment',
    value: '1341'
  },
  {
    label: 'The AEB about sanctions',
    value: '1379'
  }
];

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
          items={this.props.options || []}
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
          textInputProps={{textAlign: 'left'}}
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
    borderRadius: 6,
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
