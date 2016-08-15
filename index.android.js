/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  BackAndroid,
  ToastAndroid,
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
    }else{
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
          return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', 2);
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
