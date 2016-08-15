import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  WebView,
} from 'react-native';
import {
  Button,
  Divider,
} from 'react-native-material-design';
var styles = require('../style.js');
var ProgressBar =require('ActivityIndicator');
import Icon from 'react-native-vector-icons/MaterialIcons';

const HTML = "<html><head><link rel='stylesheet' type='text/css' href='"

class ThemeDetailScreen extends Component{
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

  toList(section_id){
     this.props.navigator.push({id:"list", sid: section_id});
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
     if (this.state.article.body) {
       var html_string = HTML+this.state.article.css[0]
          +"' /></head><body>"
          +this.state.article.body
          +"</body></html>";
     }else{
       var url = this.state.article.share_url;
     }
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


       <WebView
          ref="webview"
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={html_string? {html: html_string} : {uri: url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
        />
        <Divider />
        <View style={styles.section}>
          <Button
            text={"本文来自："+this.state.article.theme.name+"合集"}
            onPress={() => this.toList(this.state.article.theme.id)}
            raised={true} />
        </View>
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

module.exports = ThemeDetailScreen;
