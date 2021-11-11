import React from 'react';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  init() {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('829b3b43-bb6d-40fa-b82e-3305342bd57b');

    this.setNotificationOpenedHandler();

    OneSignal.addPermissionObserver(event => {
      console.log("OneSignal: permission changed:", event);
    });
  },

  setSubscription(type, status) {
    if (status) {
      OneSignal.sendTag('subscription' + type, status);
    } else {
      OneSignal.deleteTag('subscription' + type);
    }
  },

  setNotificationOpenedHandler() {
    OneSignal.setNotificationOpenedHandler(notification => {
      this.onOpenedPush(notification);
    });
  },


  onOpenedPush(openResult) {
    const addData = openResult.notification.additionalData || [];
    const type = addData.type;
    const locale = deviceLanguage.includes('ru') ? 'ru' : 'en';
    let id = 0;
    id = addData.id ? addData.id : 0;
    if (typeof id === 'object' && id[locale]) {
      id = id[locale];
    }
    switch (type) {
      case 'Article':
        setTimeout(function() {
          NavigationService.navigate(type, {
            itemId: id,
            locale: locale
          });
        }, 150);
        break;
      case 'Publications':
        setTimeout(function() {
          NavigationService.navigate(type, {
            itemId: id,
            locale: locale
          });
        }, 150);
        break;
      case 'Events':
        // if (item.iblock && item.iblock !== 14) {
        //   // если событие НЕ встреча комитета
        //   this.props.navigation.navigate('Event', {
        //     itemId: item.id,
        //     otherParam: item
        //   });
        // } else {
        //   if (item.committee && item.committee.url) {
        //     return Linking.openURL(item.committee.url);
        //   }
        // }
        setTimeout(function() {
          NavigationService.navigate(type, {
            itemId: id,
            locale: locale,
          });
        }, 150);
        break;
      case 'Releases':
        const groupID = addData.groupID;
        setTimeout(function() {
          NavigationService.navigate(type, {
            itemId: id,
            locale: locale,
            filter: groupID,
          });
        }, 150);
        break;
      case 'NewsCovid':
        let link =
          translate('const.mainDomain') +
          addData.link;
        Linking.openURL(link);
        break;
    }

    // console.log('Data: ', openResult.notification.payload.additionalData);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);
  },

  onReceivedPush(notification) {
    console.log('Notification received: ', notification);
  },

  onIdsPush(device) {
    console.log('Device info: ', device);
  },

  async deviceState() {
    return await OneSignal.getDeviceState();
  },

  checkPermission() {
    return new Promise((resolve, reject) => {
      // Check push notification and OneSignal subscription statuses
      // OneSignal.promptForPushNotificationsWithUserResponse();
      this.deviceState().then(deviceState => {
        if (deviceState.isSubscribed == false) {
          switch (Platform.OS) {
            case 'ios':
              setTimeout(() => {
                return Alert.alert(
                  'Уведомления выключены',
                  'Необходимо разрешить получение push-уведомлений для приложения в настройках',
                  [
                    {text: 'Позже', style: 'destructive'},
                    {
                      text: 'Разрешить',
                      onPress: () => {
                        Linking.openURL(
                          'app-settings://notification/com.aebrus.app',
                        );
                      },
                      style: 'cancel',
                    },
                  ],
                );
              }, 100);
              break;
          }
          return resolve(false);
        }
        return resolve(true);
      });
    });
  },
}
