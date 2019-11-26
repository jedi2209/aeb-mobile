import React from 'react';

import Header from '../components/Header';
import ThumbList from '../components/ThumbList';

import RNPickerSelect from 'react-native-picker-select';
import ArrowDropdown from '../components/ArrowDropdown';

import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Platform
} from 'react-native';

import { API } from '../core/server';
class ReleasesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      params: {},
      options: [],
      filter: ''
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerLeft: (
        <Header
          onPress={() => navigation.navigate('Menu')}
          title={screenProps.translate('realeses')}
        />
      ),
      headerStyle: {
        height: Platform.OS === 'ios' ? 60 : 68,
        borderBottomWidth: 0,
        shadowRadius: 0,
        shadowOffset: {
          height: 0
        },
        elevation: 0,
        shadowColor: 'transparent'
      }
    };
  };

  async componentDidMount() {
    this.api = new API({ lang: this.lang, platform: Platform.OS });

    const responsedData = await this.api.getReales(1);

    let options =
      responsedData &&
      responsedData.filters &&
      responsedData.filters[0].value.map(opt => {
        return {
          label: opt.name,
          value: opt.id
        };
      });

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ options, name: responsedData.filters[0].name });
  }

  render() {
    return (
      <View style={styles.body}>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View>
              <View style={[this.props.style, styles.dropdown]}>
                <RNPickerSelect
                  items={this.state.options}
                  onValueChange={value => {
                    console.log('ya tyt', value);
                    this.setState({
                      filter: value,
                      params: {
                        [this.state.name]: value
                      }
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
              <View>
                <ThumbList
                  paramsForFetch={this.state.params}
                  screenProps={this.props.screenProps}
                  extraPadding="28"
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {},
  body: {
    backgroundColor: '#FAFAFA'
  },
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

export default ReleasesScreen;
