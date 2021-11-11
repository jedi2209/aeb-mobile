import React from 'react';

import Header from '../components/Header';
import ThumbList from '../components/ThumbList';
import {theme} from '../core/themeProvider';

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

import {API} from '../core/server';
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

  async componentDidMount() {
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    this.lang = deviceLanguage.includes('ru') ? 'rus' : 'eng';
    this.api = new API({lang: this.lang, platform: Platform.OS});

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
    this.setState({options, name: responsedData.filters[0].name});
  }

  render() {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View>
          <View style={[this.props.style, styles.dropdown]}>
            <RNPickerSelect
              items={this.state.options}
              placeholder={{
                label: this.props.screenProps.translate('all_press_releases')
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
                  top: Platform.OS === 'ios' ? -2 : 2,
                  right: 12
                  // borderBottomWidth: 0,
                  // shadowOpacity: 0.2,
                  // shadowRadius: 15,
                  // shadowColor: "#000000",
                  // shadowOffset: {
                  //   height: 2,
                  //   width: 0
                  // },
                  // elevation: 5
                }
              }}
              pickerProps={{
                mode: 'dialog',
                prompt: 'title'
              }}
              onDonePress={() => {
                this.setState({
                  params: {
                    [this.state.name]: this.state.filter
                  }
                });
              }}
              value={this.state.filter}
              useNativeAndroidPickerStyle={false}
              doneText={this.props.screenProps.translate('done')}
              textInputProps={{textAlign: 'left'}}
              Icon={() => <ArrowDropdown style={{}} />}
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
    );
  }
}

const styles = StyleSheet.create({
  scrollContentContainer: {
    paddingTop: 40,
    paddingBottom: 10
  },
  scrollView: {
    // flex: 1,
    // paddingHorizontal: 0
  },
  body: {
    backgroundColor: '#FAFAFA'
    // flex: 1
  },
  dropdown: {
    backgroundColor: '#FAFAFA',
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
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

export default ReleasesScreen;
