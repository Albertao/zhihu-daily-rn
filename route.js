import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  ToolbarAndroid
} from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var styles = require ('./style');
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainScreen from './tabs/mainScreen';
import DetailScreen from './main/detailScreen'
//import ThankScreen from './tabs/thankScreen';

exports.setRoute = (router, nav) => {
  switch (router.id) {
    case 'main':
      return (
        <View style={styles.container}>
        <StatusBar
          backgroundColor="#1976d2"
        />
        <Icon.ToolbarAndroid
          title="知乎日报"
          titleColor="#fff"
          style={styles.toolbar} />
        <ScrollableTabView
          tabBarPosition='top'
          tabBarUnderlineColor="#fff"
          tabBarBackgroundColor="#2196f3"
          tabBarActiveTextColor="#fff"
          tabBarInactiveTextColor="#fffff0">
          <MainScreen tabLabel="首页" navigator={nav} />
          <MainScreen tabLabel="分类" navigator={nav} />
          <MainScreen tabLabel="关于" navigator={nav} />
        </ScrollableTabView>
        </View>
      );
    case 'detail':
      return (<DetailScreen navigator={nav} title="Detail" route={router} / >);
  }
}
