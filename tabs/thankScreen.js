import React, { Component } from 'react';
import {
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';
import {
  Card,
} from 'react-native-material-design';

ThankScreen = React.createClass({
   toDetail(){
     this.props.navigator.push({id:"detail"});
  },
   render(){
     return (

     );
   }
 });

 module.exports = ThankScreen;
