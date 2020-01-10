import React from 'react';

import Header from '../components/Header';
import ThumbList from '../components/ThumbList';
import { theme } from '../core/themeProvider';

import RNPickerSelect from 'react-native-picker-select';
import ArrowDropdown from '../components/ArrowDropdown';

import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Platform,
  NativeModules
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
      headerStyle: [
        theme.headerShadow,
        {
          height: Platform.OS === 'ios' ? 60 : 68,
          borderBottomWidth: 0
        }
      ]
    };
  };

  async componentDidMount() {
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    this.lang = deviceLanguage.includes('ru') ? 'rus' : 'eng';
    this.api = new API({ lang: this.lang, platform: Platform.OS });

    const responsedData = await this.api.getReleases(1, {});

    let options =
      responsedData &&
      responsedData.filters &&
      responsedData.filters[0] &&
      responsedData.filters[0].value &&
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
                  placeholder={{
                    label: this.props.screenProps.translate('select_an_item')
                  }}
                  onValueChange={value => {
                    if (Platform.OS === 'ios') {
                      this.setState({
                        filter: value
                      });

                      return;
                    }
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
                      top: Platform.OS === 'ios' ? 8 : 18,
                      right: 12
                    }
                  }}
                  onDonePress={() => {
                    this.setState({
                      params: {
                        [this.state.name]: this.state.filter
                      }
                    });
                  }}
                  value={this.state.filter}
                  useNativeAndroidPickerStyle={true}
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
    backgroundColor: '#FAFAFA',
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    paddingHorizontal: 14,
    alignItems: 'stretch',
    fontSize: 17,
    color: '#000',
    borderBottomWidth: 1,
    borderColor: '#ACB1C0',
    borderStyle: 'solid'
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#FAFAFA',
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
