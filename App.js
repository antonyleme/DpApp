import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './src/store';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import api from './src/services/api';

import Routes from './src/routes';
import { Alert } from 'react-native';

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  registerForPushNotificationsAsync();

  // This listener is fired whenever a notification is received while the app is foregrounded
  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    setNotification(notification);
  });

  // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //console.log(response.notification.status);
  });

  async function registerForPushNotificationsAsync() {
    let token;
    const { status: existingStatus2 } = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted' || existingStatus2 !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      const { status: status2 } = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
      finalStatus = status ? status : status2;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    Notifications.getExpoPushTokenAsync().then(res => {
      token = res.data
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      api.put('https://api.dp.codenative.com.br/api/users', {
        notification_token: token,
      })
    }).catch(err => {
      alert(err)
    })
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}