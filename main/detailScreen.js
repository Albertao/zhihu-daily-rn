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

const HTML = "<html><head><style type=\"text/css\"> .img-place-holder2{height:100%;width:100%;} </style><link rel='stylesheet' type='text/css' href='"

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
     var html_string = HTML+this.state.article.css[0]
        +"' /></head><body>"
        +this.state.article.body.replace('<div class="img-place-holder"></div>', '<div class="img-place-holder"><img class="img-place-holder2" src="'
        + this.state.article.image + '"/></div>')
        +"</body></html>";
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
          source={{html: html_string}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
        />
        <Divider />
        {this.state.article.section ? this.renderSection() : false}
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

   renderSection() {
     return (
       <View style={styles.section}>
              <Button
                text={"本文来自："+this.state.article.section.name+"合集"}
                onPress={() => this.toList(this.state.article.section.id)}
                raised={true} />
        </View>
     );
   }
 }

module.exports = DetailScreen;
