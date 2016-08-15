import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl
} from 'react-native';
import {
  List,
  Avatar,
  Divider,
  Ripple,
} from 'react-native-material-design';
var styles = require('../style.js');
var ProgressBar =require('ActivityIndicator');

class CategoryScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      others : [],
    }
  }

  toList(section_id){
     this.props.navigator.push({id:"list", sid: section_id});
  }

  componentDidMount() {
    this.fetchContent();
  }

  fetchContent() {
    return fetch('http://news-at.zhihu.com/api/4/themes')
      .then((res) => res.json())
      .then((resJSON) => {
        return this.setState({
          loaded: true,
          others: resJSON.others,
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
            {this.state.others.map((theme, index) => {
              return (
                <View key={index}>
                <Ripple onPress={() => this.toList(theme.id)}>
                <List
                  primaryText={theme.name}
                  secondaryText={theme.description}
                  leftAvatar={<Avatar image={<Image source={{ uri: theme.thumbnail }} />} />}
                />
                </Ripple>
                <Divider />
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

module.exports = CategoryScreen;
