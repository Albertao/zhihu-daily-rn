/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  StatusBar,
  TouchableHighlight,
  ToolbarAndroid,
} from 'react-native';
var styles = require('./style');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var route = require('./route.js');
import Icon from 'react-native-vector-icons/MaterialIcons';

var zhihuDaily =React.createClass ({
  render(){
      return (
        <Navigator
          style = {styles.container}
          initialRoute={{id:"main",}}
          renderScene={this.renderNav}
          />
      );
    },
    renderNav(rou,nav){
        return route.setRoute(rou, nav);
    }
});

AppRegistry.registerComponent('zhihuDaily', () => zhihuDaily);
