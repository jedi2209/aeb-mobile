import React from 'react';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import AsyncStorage from '@react-native-community/async-storage';
import {
  check,
  checkNotifications,
  requestNotifications,
  openSettings,
  PERMISSIONS,
  RESULTS
} from 'react-native-permissions';

export default class PushNotifications {
  // componentDidMount() {
  //   OneSignal.init('829b3b43-bb6d-40fa-b82e-3305342bd57b', {
  //     kOSSettingsKeyAutoPrompt: true
  //   });
  //   OneSignal.addEventListener('received', this.onReceivedPush);
  //   OneSignal.addEventListener('opened', this.onOpenedPush);
  //   OneSignal.addEventListener('ids', this.onIdsPush);
  // }

  checkPermit() {
    return checkNotifications().then(({status, settings}) => {
      switch (status) {
        case 'granted':
          break;
        case 'denied':
          requestNotifications(['alert', 'sound']).then(
            ({status, settings}) => {
              console.log('denied status', status);
              console.log('denied settings', settings);
            }
          );
          break;
        case 'blocked':
      }
      return status;
    });
  }

  // componentWillUnmount() {
  //   OneSignal.removeEventListener('received', this.onReceivedPush);
  //   OneSignal.removeEventListener('opened', this.onOpenedPush);
  //   OneSignal.removeEventListener('ids', this.onIdsPush);
  // }

  onReceivedPush(notification) {
    console.log('Notification received: ', notification);
  }

  onOpenedPush(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIdsPush(device) {
    console.log('Device info: ', device);
  }
}
