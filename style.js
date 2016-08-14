import {
  StyleSheet,
} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    padding: 20,
  },
  toolbar: {
    height: 56,
    backgroundColor: '#2196f3',
  },
  toolbarDetail: {
    height: 200,
    backgroundColor: '#2196f3',
  },
  backimagestyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  loading: {
    fontSize: 15,
    textAlign: 'center',
    marginTop:15,
  },
  headerImg: {
    zIndex:2,
    height: 200,
  },
  webView: {
    zIndex:2,

  },
});

module.exports = styles;
