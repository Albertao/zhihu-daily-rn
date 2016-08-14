import React, { Component } from 'react';
import {
  Text,
  View,
  Navigator,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import {
  Button,
  Card,
} from 'react-native-material-design';
var styles = require('../style.js');
var ProgressBar =require('ActivityIndicator');

class MainScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      stories : [],
      top_stories: [],
      date: 0,
    }
  }

  toDetail(story_id){
     this.props.navigator.push({id:"detail", aid: story_id});
  }

  componentDidMount() {
    this.fetchContent();
  }

  fetchContent() {
    return fetch('http://news-at.zhihu.com/api/4/news/latest')
      .then((res) => res.json())
      .then((resJSON) => {
        return this.setState({
          loaded: true,
          stories: resJSON.stories,
          top_stories: resJSON.top_stories,
          date: resJSON.date,
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
        <ScrollView style={styles.container}>
            {this.state.stories.map((story, index) => {
              return (
                <View key={index}>
                  <Card>
                    <Card.Media
                      image={<Image source={{uri: story.images[0]}} />}
                      overlay
                    />
                    <Card.Body>
                      <Text>{story.title}</Text>
                    </Card.Body>
                    <Card.Actions position="right">
                      <Button onPress={() => this.toDetail(story.id) } text="详情" />
                    </Card.Actions>
                  </Card>
                </View>
              );
            })}
        </ScrollView>
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

module.exports = MainScreen;
