import React from 'react';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import AsyncStorage from '@react-native-community/async-storage';

export default class PushNotifications {
  // componentDidMount() {
  //   OneSignal.init('829b3b43-bb6d-40fa-b82e-3305342bd57b', {
  //     kOSSettingsKeyAutoPrompt: true
  //   });
  //   OneSignal.addEventListener('received', this.onReceivedPush);
  //   OneSignal.addEventListener('opened', this.onOpenedPush);
  //   OneSignal.addEventListener('ids', this.onIdsPush);
  // }

  // componentWillUnmount() {
  //   OneSignal.removeEventListener('received', this.onReceivedPush);
  //   OneSignal.removeEventListener('opened', this.onOpenedPush);
  //   OneSignal.removeEventListener('ids', this.onIdsPush);
  // }
  setSubscription(type, status) {
    if (status) {
      OneSignal.sendTag('subscription' + type, status);
    } else {
      OneSignal.deleteTag('subscription' + type);
    }
  }

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
