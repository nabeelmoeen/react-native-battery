/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
//'use strict';

import { NativeModules, AppRegistry, StyleSheet, Text, View, DeviceEventEmitter} from 'react-native';
import React, { Component } from 'react';
const BatteryManager = NativeModules.BatteryManager

export default class RCTBattery extends Component{

  _subscription = null 

  constructor(props){
    super(props)
    this.state = {batteryLevel: null, charging:false};
  }

  onBatteryStatus= (info)=>{
    this.setState({batteryLevel: info.level});
    this.setState({charging: info.isPlugged});
  }

  componentDidMount() {
      BatteryManager.updateBatteryLevel((info) => {
        console.log('inside updateBatterylevel() method')
        this._subscription = DeviceEventEmitter.addListener('BatteryStatus', this.onBatteryStatus);
        this.setState({batteryLevel: info.level});
        this.setState({charging: info.isPlugged});
        }
      ) 
  }

  componentWillUnmount(){
    
  }

  render() {
    var chargingText;
    if(this.state.charging){
      chargingText =<Text>Charging </Text>;
    } else {
      chargingText =<Text>Not Charging </Text>;
    }
    return (
      <View >
        <Text >
          Battery Level {this.state.batteryLevel}
        </Text>
        {chargingText}
      </View>
    )
  }
}


AppRegistry.registerComponent('RCTBattery', () => RCTBattery);
