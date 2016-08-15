import {
  StyleSheet,
} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  loadingContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fafafa',
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
    height: 200,
    zIndex: 2,
    position: 'absolute',
    bottom: 200,
  },
  section: {
    backgroundColor: '#2196f3',
    padding: 10,
  },
  avatar: {
    flex: 1,
  },
  sectionText: {
    flex: 3,
  }
});

module.exports = styles;
