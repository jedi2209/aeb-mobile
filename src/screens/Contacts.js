import React from 'react';
import {
  LoadingIndicator,
  theme,
  DeviceWidth,
  DeviceHeight
} from '../core/themeProvider';
import Header from '../components/Header';
import BottomSheet from 'reanimated-bottom-sheet';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Divider, Button, Card, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Text,
  Linking,
  StyleSheet,
  Platform,
  Clipboard,
  NativeModules,
  Alert
} from 'react-native';

import {API} from '../core/server';

class ContactsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      loading: true
    };
  }

  componentDidMount() {
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    this.lang = deviceLanguage.includes('ru') ? 'rus' : 'eng';

    this._getContacts();
  }

  _getContacts = async () => {
    this.api = new API({lang: this.lang, platform: Platform.OS});
    const responsedData = await this.api.getContacts();
    const _this = this;
    setTimeout(function() {
      _this.setState({
        data: responsedData,
        loading: false
      });
    }, 500);
  };

  _onPressButton(link) {
    Linking.openURL(link);
  }

  renderContent = () => {
    const items = this.state.data.items;
    return (
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>{items.address.name}</Text>
        <Text style={styles.panelSubtitle}>{items.address.description}</Text>
        <Divider style={{backgroundColor: '#0E4F9F', marginBottom: 10}} />
        {items.email.map(value => {
          return (
            <Button
              key={value}
              icon={<Icon name="email-outline" size={25} color="#0E4F9F" />}
              iconLeft
              type="outline"
              // title={value}
              titleStyle={theme.whiteButtonText}
              containerStyle={{width: '30%', paddingHorizontal: 20}}
              buttonStyle={theme.whiteButton}
              onPress={() => {
                return this._onPressButton(`mailto:${value}`);
              }}
            />
          );
        })}
        <View
          style={{
            width: '100%',
            flex: 1,
            paddingTop: 10,
            paddingHorizontal: 20,
          }}>
          {items.phone.map(value => {
            return (
              <Card
                title={value.name}
                key={value.name}
                containerStyle={{
                  width: '100%',
                  marginBottom: 5,
                  marginRight: '2%',
                  marginLeft: 0,
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    width: '100%'
                  }}>
                  {value.phone.map((data, i) => {
                    return (
                      <Button
                        key={'phoneBt' + i}
                        useForeground={true}
                        icon={<Icon name="phone" size={20} color="#0E4F9F" />}
                        iconLeft
                        type="clear"
                        title={data}
                        titleStyle={[
                          theme.whiteButtonText,
                          {
                            marginBottom: 1,
                            marginLeft: 5,
                            fontSize: 12
                          }
                        ]}
                        buttonStyle={theme.whiteButton}
                        onPress={() => {
                          return this._onPressButton(
                            `tel:${data.replace(/[^+\d]+/g, '')}`
                          );
                        }}
                      />
                    );
                  })}
                  {value.fax.map((data, i) => {
                    return (
                      <View key={'fax' + i}>
                        <Button
                          key={'faxBt' + i}
                          icon={<Icon name="fax" size={20} color="#0E4F9F" />}
                          iconLeft
                          type="clear"
                          title={data}
                          titleStyle={[
                            theme.whiteButtonText,
                            {
                              marginBottom: 5,
                              marginLeft: 5,
                              fontSize: 12
                            }
                          ]}
                          buttonStyle={theme.whiteButton}
                          onPress={() => {
                            Alert.alert(
                              this.props.screenProps.translate(
                                'CopyToClipboard.Title'
                              ),
                              this.props.screenProps.translate(
                                'CopyToClipboard.Fax'
                              ),
                              [
                                {
                                  text: this.props.screenProps.translate(
                                    'Button.OK'
                                  )
                                }
                              ],
                              {cancelable: false}
                            );
                            return Clipboard.setString(data);
                          }}
                        />
                      </View>
                    );
                  })}
                </View>
              </Card>
            );
          })}
        </View>
      </View>
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
    );
  };

  render() {
    return !this.state.loading ? (
      <View style={styles.container}>
        <BottomSheet
          snapPoints={['30%', '80%', '10%']}
          renderContent={this.renderContent}
          renderHeader={this.renderHeader}
          enabledContentTapInteraction={false}
          enabledInnerScrolling={true}
        />
        <TouchableWithoutFeedback style={styles.containerMap}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: parseFloat(
                this.state.data.items.address.coords.latitude
              ),
              longitude: parseFloat(
                this.state.data.items.address.coords.longitude
              ),
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121
            }}>
            <Marker coordinate={this.state.data.items.address.coords} />
          </MapView>
        </TouchableWithoutFeedback>
      </View>
    ) : (
      <LoadingIndicator />
    );
  }
}

const styles = StyleSheet.create({
  containerMap: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  pageTitle: {
    marginBottom: 20
  },
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  panel: {
    height: 930,
    backgroundColor: '#ffffff'
  },
  header: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  panelHeader: {
    alignItems: 'center'
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 6,
    backgroundColor: '#00000040',
    marginBottom: 10
  },
  panelTitle: {
    fontSize: 20,
    width: DeviceWidth,
    marginBottom: 10,
    paddingHorizontal: 20
  },
  panelSubtitle: {
    fontSize: 12,
    color: 'gray',
    width: DeviceWidth,
    marginBottom: 10,
    paddingHorizontal: 20
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default ContactsScreen;
