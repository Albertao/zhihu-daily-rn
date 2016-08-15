import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';
import {
  Card,
  Ripple,
} from 'react-native-material-design';
var styles = require('../style.js');
var ProgressBar =require('ActivityIndicator');
import Icon from 'react-native-vector-icons/MaterialIcons';

class ListScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      detail: {},
      sid: 0
    }
  }

  componentDidMount() {
    this.fetchContent();
  }

  toDetail(story_id){
    this.props.navigator.push({id:"themeDetail", aid: story_id});
  }

  fetchContent() {
    return fetch('http://news-at.zhihu.com/api/4/theme/'+this.props.route.sid)
      .then((res) => res.json())
      .then((resJSON) => {
        return this.setState({
          loaded: true,
          detail: resJSON,
          sid: this.props.route.sid,
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
     return (
       <View style={styles.container}>
       <StatusBar
         backgroundColor="#1976d2"
       />
       <Icon.ToolbarAndroid
         title={this.state.detail.name}
         titleColor="#fff"
         navIconName="arrow-back"
         onIconClicked={() => {this.props.navigator.pop()}}
         style={styles.toolbar} />
       <ScrollView style={styles.container}>
         {this.state.detail.stories.map((story, index) => {
           return (
            <View key={index}>
              <Ripple onPress={() => this.toDetail(story.id)}>
              <Card>
                <Card.Body>
                  <Text>{story.title}</Text>
                </Card.Body>
              </Card>
              </Ripple>
            </View>
           );
         })}
       </ScrollView>
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

module.exports = ListScreen;
