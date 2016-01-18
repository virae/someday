/**
 * OneDo iOS App
 * https://github.com/virae
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} = React;

var App = require('./application/components/App');

class SomeDay extends React.Component {
    render() {
        return (
            <NavigatorIOS
                barTintColor='#7956EB'
                tintColor='#ffffff'
                titleTextColor='#ffffff'
                style={styles.navigator}
                initialRoute={{component: App, title: 'Today'}} />
        );
    }
}

var styles = StyleSheet.create({
    navigator: {
        flex: 1
    }
});

AppRegistry.registerComponent('SomeDay', () => SomeDay);
