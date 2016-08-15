/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';
var styles = require('./style');
var route = require('./route.js');


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
