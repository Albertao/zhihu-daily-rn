# zhihu-daily-rn

another third party zhihuDaily client built by react-native.

# usage：

- after clone from this repo,run `npm install`

- according to [#issue18](https://github.com/react-native-material-design/react-native-material-design/issues/18) of [react-native-material-design](https://github.com/react-native-material-design/react-native-material-design)
,you should change this file
`node_modules/react-material-design/lib/index.js`,
then delete the comment of this line `export { default as List } from './List';`


- `react-native start` && `react-native run-android` （make sure you have a connected device or an emulator first）

# dependencies：

- [react-native-material-design](https://github.com/react-native-material-design/react-native-material-design)

- [react-native-swiper](https://github.com/leecade/react-native-swiper)

- [react-native-scrollable-tab-view](https://github.com/skv-headless/react-native-scrollable-tab-view)

- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

# how to generate signed apk：

please seek in the [docs of rn](http://facebook.github.io/react-native/docs/signed-apk-android.html)

# what to do next:

- [ ] add network sniff
- [ ] add local storage
- [ ] optimize ui
