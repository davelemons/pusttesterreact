/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { withAuthenticator, Auth } from 'aws-amplify-react-native';

import PushNotification from '@aws-amplify/pushnotification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PushNotificationIOS } from '@react-native-community/push-notification-ios';

import AuthDebugger from './AuthDebugger';

// Auth.currentUserInfo()
// 	.then(({ attributes }) => {
//     console.log(attributes)
// 		// const userAttributes = {};
// 		// Object.entries(attributes).forEach(([key, value]) => {
// 		// 	userAttributes[key] = [`${value}`];
// 		// });
// 		// Analytics.updateEndpoint({
// 		// 	address: attributes.email, // Or phone_number
// 		// 	channelType: 'EMAIL', // Or 'SMS'
// 		// 	userId: attributes.sub,
// 		// 	userAttributes
// 		// });
// 	})
// 	.then(() => console.log('Do something else'));

console.log("Dave");

// get the notification data when notification is received
PushNotification.onNotification((notification) => {
    // Note that the notification object structure is different from Android and IOS
    console.log('in app notification', JSON.stringify(notification,null,2));

    Alert.alert(
      notification.title,
      notification.body,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/push-notification-ios#finish)
    //notification.finish(PushNotificationIOS.FetchResult.NoData);
  });

  // get the registration token
  // This will only be triggered when the token is generated or updated.
  PushNotification.onRegister((token) => {
    console.log('in app registration', token);
    AsyncStorage.setItem('@fcmToken', token);
  });

  // get the notification data when notification is opened
  PushNotification.onNotificationOpened((notification) => {
      console.log('the notification is opened', notification);
      console.log('in app notification', JSON.stringify(notification,null,2));

      setTimeout(function(){Alert.alert(
        notification.data['pinpoint.notification.title'],
        notification.data['pinpoint.notification.body'],
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      },1000)
  });

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            <Text>Dave</Text>
          <AuthDebugger />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default withAuthenticator(App);
