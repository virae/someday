/**
 * OneDo iOS App
 * https://github.com/virae
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet
} = React;

var App = require('./application/components/App');

class SomeDay extends React.Component {

    render() {
        return (
            <App />
        );
    }
}

AppRegistry.registerComponent('SomeDay', () => SomeDay);
