import React, { Component }  from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput
  } from 'react-native';
import {Auth} from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthDebugger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: ''
    }
  }

  componentDidMount() {
    console.log('on component mount');
    // check the current user when the App component is loaded
    Auth.currentAuthenticatedUser().then(user => {
      console.log(user);
    }).catch(e => {
      console.log(e);
    });

    AsyncStorage.getItem('@fcmToken').then(token => {
      console.log("Found Token in AsyncStorage: ", token)
      this.setState({
        token
      })
    }).catch(e => {
      console.log(e);
    });

  }

  render() {
    const {
      token
    } = this.state;

    const styles = StyleSheet.create({
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
      },
      sectionDescription: {
        marginLeft: 8,
        fontSize: 18,
        fontWeight: '400',
      },
      sectionTitle: {
        fontSize: 24,
        margin: 8,
        fontWeight: '600',
      },
    });
    return (
        <View>
          <Text style={styles.sectionTitle}>Pinpoint Push Tester</Text>
          <Text style={styles.sectionDescription}>Your Token Is: </Text>
          <TextInput
            style={styles.input}
            value={token}
          />
        </View>
    );

  }
}
export default AuthDebugger
