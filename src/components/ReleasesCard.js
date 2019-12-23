import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Linking,
  NativeModules,
  Platform
} from 'react-native';
import ArrowButton from '../components/ArrowButton';

import moment from 'moment/min/moment-with-locales';

import { theme } from '../core/themeProvider';

class ReleasesCard extends React.Component {
  render() {
    const extraPadding = this.props.extraPadding;

    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    deviceLanguage.includes('ru') ? 'ru' : 'en';
    moment.locale(this.props.locale);

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Linking.openURL(this.props.data.file);
        }}
      >
        <View
          style={[
            theme.cardBlock,
            theme.cardShadow,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              width: this.props.deviceWidth - 14 - this.props.BAR_SPACE,
              paddingHorizontal: 14,
              marginHorizontal: extraPadding ? extraPadding / 2 : 0,
              paddingVertical: 10,
              marginBottom: 10
            }
          ]}
        >
          <View style={{ width: this.props.deviceWidth - 64 - 35 - 14 - 14 }}>
            <Text style={styles.title}>{this.props.data.name}</Text>
            <Text style={styles.commit}>{this.props.data.descr}</Text>
            {this.props.data.created && (
              <Text style={styles.date}>
                {moment(this.props.data.created * 1000).format('dddd, DD MMMM')}
              </Text>
            )}
          </View>
          <ArrowButton
            style={[styles.image, { width: 60, height: 60, marginLeft: 10 }]}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: '#000000',
    shadowOffset: { height: 1, width: 0 }
  },
  image: {
    borderRadius: 4,
    marginRight: 14
  },
  title: {
    fontSize: 16,
    color: '#000000',
    letterSpacing: 0.32,
    textAlign: 'left',
    lineHeight: 22,
    fontWeight: '500'
  },
  date: {
    fontSize: 12,
    color: '#8C8C8C',
    letterSpacing: 0.32,
    lineHeight: 20
  },
  commit: {
    color: '#007AFF',
    fontSize: 15
  }
});

export default ReleasesCard;
