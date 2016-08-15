import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import {
  List,
  Subheader,
  Divider,
} from 'react-native-material-design';

ThankScreen = React.createClass({
   render(){
     return (
      <View>
      <Subheader text="关于" color="#2196f3" />
      <List
        primaryText="zhihuDailyRN"
        primaryColor="#42a5f5"
        secondaryText="1.0"
      />
      <Divider />
      <List
        primaryText="作者"
        primaryColor="#42a5f5"
        secondaryText="AlbertHao"
      />
      <Divider />
      <List
        primaryText="反馈及建议"
        primaryColor="#42a5f5"
        secondaryText="my@alberthao.cc"
      />
      <Divider />
      <List
        primaryText="源码地址"
        primaryColor="#42a5f5"
        secondaryText="https://github.com/Albertao/zhihu-daily-rn"
      />
      <Divider />
      </View>
     );
   }
 });

 module.exports = ThankScreen;
