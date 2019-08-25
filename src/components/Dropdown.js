import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, View } from "react-native";
import ArrowDropdown from "../components/ArrowDropdown";

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
            { label: 'Automobile Manufacturers Committee', value: 'football', key: 'drop-1' },
            { label: "Baseball", value: "baseball", key: 'drop-2' },
            { label: "Hockey", value: "hockey", key: 'drop-3' }
          ]}
          onValueChange={value => {
            this.setState({
              favSport3: value,
            });
          }}
          style={{
            inputIOS: {
              fontSize: 17,
              color: '#ACB1C0',
              lineHeight: 20
            },
            inputAndroid: {
              backgroundColor: 'transparent',
            },
            iconContainer: {
              top: 5,
              right: 15,
            },
          }}
          value={this.state.favSport3}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColorAndroid: 'cyan' }}
          Icon={() => {
            return <ArrowDropdown />;
          }}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  dropdown: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    backgroundColor: "#FFF",
    fontSize: 17,
    color: "#000",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#ACB1C0",
    borderStyle: "solid",
  },
});

// opacity: 0;
// background: #FFFFFF;
// font-family: Helvetica;
// font-size: 17px;
// color: #ACB1C0;
// letter-spacing: 0.32px;
// line-height: 22px;
// font-family: Helvetica;
// font-size: 17px;
// color: #ACB1C0;
// letter-spacing: 0.32px;
// line-height: 22px;
// font-family: Helvetica;
// font-size: 17px;
// color: #ACB1C0;
// letter-spacing: 0.32px;
// line-height: 22px;
// font-family: Helvetica;
// font-size: 17px;
// color: #1E2432;
// letter-spacing: 0.32px;
// line-height: 22px;
// font-family: Helvetica;
// font-size: 17px;
// color: #1E2432;
// letter-spacing: 0.32px;
// line-height: 22px;
