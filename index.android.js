/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  BackAndroid
} from 'react-native';
var styles = require('./style');
var route = require('./route.js');


var zhihuDaily =React.createClass ({
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
  },

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
  },

  onBackAndroid() {
    const nav = this.navigator;
    const routers = nav.getCurrentRoutes();
    if (routers.length > 1) {
      nav.pop();
      return true;
    }
    return false;
  },

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
        this.navigator = nav;
        return route.setRoute(rou, nav);
    }
});

AppRegistry.registerComponent('zhihuDaily', () => zhihuDaily);
