import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';
import {
  Button,
  Card,
} from 'react-native-material-design';
import Swiper from 'react-native-swiper';
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
      refreshing: true,
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
          refreshing: false,
        })
      })
      .catch((err) => {console.error(err)})
  }

  _onRefresh() {
    this.fetchContent
  }

  render(){
     if (this.state.loaded) {
      return this.renderLoaded();
    }else{
      return this.renderLoading();
    }
   }

renderPagination = (index, total, context) => {
  return (
    <View style={{
      position: 'absolute',
      bottom: -25,
      right: 10
    }}>
      <Text>
        <Text style={{
          color: '#000',
          fontSize: 20
        }}>{index + 1}</Text>/{total}
      </Text>
    </View>
  )
}

   renderLoaded() {
     return (
        <ScrollView
            style={styles.container}
            refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#64b5f6', '#2196f3', '#1976d2']}
              progressBackgroundColor="#fff"
            />}>
            <Swiper 
              style={styles.wrapper} 
              height={280}
              autoplay={true}
              autoplayTimeout={3}
              dot={<View style={{backgroundColor:'rgba(33,150,243,0.5)', width: 10, height: 10,borderRadius: 5, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
              activeDot={<View style={{backgroundColor: '#2196f3', width: 14, height: 14, borderRadius: 7, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
              paginationStyle={{
                bottom: 2, height: 27.5, backgroundColor: 'rgba(0, 0, 0, 0.3)'
              }} loop={true}>
              {this.state.top_stories.map((story, index) => {
                console.log(story.title);
                return (
                  <View key={index} style={styles.slide}>
                    <Image style={styles.image} source={{uri: story.image}} />
                    <TouchableHighlight 
                      style={styles.textWrapper} 
                      onPress={() => this.toDetail(story.id)}
                      activeOpacity={1}
                      underlayColor ="rgba(0, 0, 0, 0.3)">
                      <Text style={styles.text}>{story.title}</Text>
                    </TouchableHighlight>
                  </View>
                );
              })}
            </Swiper>
            
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
