import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  ListView,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';
import {
  Button,
  Card,
  List,
  Subheader,
  Divider,
  Ripple,
} from 'react-native-material-design';
import Swiper from 'react-native-swiper';
var styles = require('../style.js');
var ProgressBar =require('ActivityIndicator');
var moment = require('moment');

var stories = {};
var date;
var LoadingMore = false;

class MainScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ds : new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id, 
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        getRowData: (dataBlob, sectionId, rowId) => dataBlob[sectionId][rowId]
      }),
      loaded : false,
      bottomLoaded: true,
      stories: {},
      dataSource: {},
      top_stories: [],
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
    var that =this;
    return fetch('http://news-at.zhihu.com/api/4/news/latest')
      .then((res) => res.json())
      .then((resJSON) => {
        date = resJSON.date;
        stories = {date: resJSON.stories};
        return that.setState({
          loaded: true,
          bottomLoaded: true,
          top_stories: resJSON.top_stories,
          dataSource: this.state.ds.cloneWithRowsAndSections(stories),
          refreshing: false,
        })
      })
      .catch((err) => {console.error(err)})
  }

  fetchMore() {
    LoadingMore = true;
    return fetch('http://news-at.zhihu.com/api/4/news/before/'+date)
      .then((res) => res.json())
      .then((resJSON) => {
        date = resJSON.date;
        LoadingMore = false;
        console.log(date);
        stories[date] = resJSON.stories;
        //console.log(stories);
        return this.setState({
          // stories: this.state.stories.[date],
          dataSource: this.state.ds.cloneWithRowsAndSections(stories),
        });
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

_renderHeader() {
  
}

_renderRow(story) {
  return (
    <Card style={{flex: 1,}}>
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
  );
}

_renderFooter() {
  
}

renderLoaded() {
  return (
    <ListView
      dataSource={this.state.dataSource}
      renderHeader={() => {
        return (
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
        );
      }}
      renderSectionHeader={(sectionData, date) => {
          return (
            <Subheader text={date} color="#2196f3" />
          );
      }}
      renderRow={(story, rowId, sectionId) => {
        return (
          <Card style={{flex: 1,}}>
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
        );
      }}
      onEndReached={this.fetchMore.bind(this)}
      onEndReachedThreshold={10}
      renderFooter={() => {
        if (this.state.bottomLoaded) {
          return (
            <View></View>
          );
        }else{
          return (
            <View><List primaryText="loading" /></View>
          );
        }
      }}
    />
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
