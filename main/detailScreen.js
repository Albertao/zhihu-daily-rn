import React, { Component } from 'react';
import {
  Text,
  View,
  Navigator,
  StatusBar,
  Image,
  ScrollView,
  WebView,
} from 'react-native';
import {
  Button,
  Card,
} from 'react-native-material-design';
var styles = require('../style.js');
var ProgressBar =require('ActivityIndicator');
import Icon from 'react-native-vector-icons/MaterialIcons';

const HTML = "<html><head><link rel='stylesheet' type='text/css' href='"

class DetailScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      article: {},
      aid: 0
    }
  }

  componentDidMount() {
    this.fetchContent();
  }

  fetchContent() {
    return fetch('http://news-at.zhihu.com/api/4/news/'+this.props.route.aid)
      .then((res) => res.json())
      .then((resJSON) => {
        return this.setState({
          loaded: true,
          article: resJSON,
          aid: this.props.route.aid,
        })
      })
      .catch((err) => {console.error(err)})
  }

  render(){
    if (this.state.loaded) {
      return this.renderLoaded();
    }else{
      return this.renderLoading();
    }
  }

   renderLoaded() {
     this.state.article.body.replace(/img-place-holder/g, 'headline');
     return (
       <View style={styles.container}>
       <StatusBar
         backgroundColor="#1976d2"
       />
       <Icon.ToolbarAndroid
         title={this.state.article.title}
         titleColor="#fff"
         navIconName="arrow-back"
         onIconClicked={() => {this.props.navigator.pop()}}
         style={styles.toolbar} />

       <Image style={styles.headerImg} source={{uri: this.state.article.image}} />
       <WebView
          ref="webview"
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{html: HTML+this.state.article.css[0]+"' /></head><body>"+this.state.article.body+"</body></html>"}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
        />

       </View>
     );
   }

   renderLoading() {
     return (
        <View style={styles.loadingContainer}>
          <ProgressBar styleAttr="Inverse" color="#2196f3" />
          <Text style={styles.loading}>
            加载中……请稍候，精彩内容即刻呈现
          </Text>
        </View>
      );
   }
 }

module.exports = DetailScreen;
