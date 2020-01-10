import React from 'react';
import {
  LoadingIndicator,
  theme,
  DeviceWidth,
  DeviceHeight
} from '../core/themeProvider';
import Header from '../components/Header';
import BottomSheet from 'reanimated-bottom-sheet';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Divider, Button, Card, ListItem } from 'react-native-elements';
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
  NativeModules
} from 'react-native';

import { API } from '../core/server';

class ContactsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      loading: true
    };
  }

  async componentDidMount() {
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    this.lang = deviceLanguage.includes('ru') ? 'rus' : 'eng';
    this.api = new API({ lang: this.lang, platform: Platform.OS });

    const responsedData = await this.api.getContacts();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      data: responsedData,
      loading: false
    });
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerLeft: (
        <Header
          screen="contacts"
          onPress={() => navigation.navigate('Menu')}
          title={screenProps.translate('Contacts')}
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

  renderContent = items => {
    return (
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>{items.address.name}</Text>
        <Text style={styles.panelSubtitle}>{items.address.description}</Text>
        <Divider style={{ backgroundColor: '#0E4F9F', marginBottom: 10 }} />
        {items.email.map(value => {
          return (
            <Button
              key={value}
              icon={<Icon name="email-outline" size={25} color="#0E4F9F" />}
              iconLeft
              type="outline"
              //   title={value}
              titleStyle={theme.whiteButtonText}
              containerStyle={{ width: '20%' }}
              buttonStyle={theme.whiteButton}
            />
          );
        })}
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: 10
          }}
        >
          {items.phone.map(value => {
            return (
              <Card
                title={value.name}
                key={value.name}
                containerStyle={{
                  width: '48%',
                  marginBottom: 5,
                  marginRight: '2%',
                  marginLeft: 0
                }}
              >
                <View
                //   style={{
                //     display: 'flex',
                //     justifyContent: 'space-around',
                //     flexDirection: 'row'
                //   }}
                >
                  {value.phone.map((data, i) => {
                    return (
                      <View
                        key={'phone' + i}
                        // style={{
                        //   width: '100%'
                        // }}
                      >
                        <Button
                          key={'phoneBt' + i}
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
                            return Linking.openURL(
                              `tel:${data.replace(/[^+\d]+/g, '')}`
                            );
                          }}
                        />
                      </View>
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
                            return Clipboard.setString(value);
                          }}
                        />
                      </View>
                    );
                  })}
                </View>
              </Card>
              // <View key={value.name}>
              //   <Divider style={{ backgroundColor: '#0E4F9F', marginTop: 10 }} />
              //   <Text style={styles.panelTitle}>{value.name}</Text>
              //   <View>
              //     {value.phone.map(data => {
              //       return (
              //         <Button
              //           key={value}
              //           icon={<Icon name="phone" size={25} color="#0E4F9F" />}
              //           iconLeft
              //           type="outline"
              //           title={data}
              //           titleStyle={theme.whiteButtonText}
              //         //   containerStyle={{ width: '20%' }}
              //           buttonStyle={theme.whiteButton}
              //         />
              //       );
              //     })}
              //   </View>
              //   <Text>Fax</Text>
              //   <View>
              //     {value.fax.map(data => {
              //       return (
              //         <View key={data}>
              //           <Text>{data}</Text>
              //         </View>
              //       );
              //     })}
              //   </View>
              // </View>
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
          snapPoints={['30%', '80%', '15%']}
          renderContent={() => {
            return this.renderContent(this.state.data.items);
          }}
          renderHeader={this.renderHeader}
          enabledInnerScrolling={true}
        />
        <View style={styles.containerMap}>
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
            }}
          >
            <Marker coordinate={this.state.data.items.address.coords} />
          </MapView>
        </View>
      </View>
    ) : (
      <LoadingIndicator />
    );
  }
}

const styles = StyleSheet.create({
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: DeviceWidth,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
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
    height: DeviceHeight,
    padding: 20,
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
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10
  },
  panelTitle: {
    fontSize: 20,
    width: DeviceWidth,
    marginBottom: 10
  },
  panelSubtitle: {
    fontSize: 12,
    color: 'gray',
    width: DeviceWidth,
    marginBottom: 10
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
