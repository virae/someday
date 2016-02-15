'use strict';

var moment = require('moment');
var dismissKeyboard = require('react-native-dismiss-keyboard');
var React = require('react-native');
var Styles = require('../styles/Styles');
var Views = require('../constants/Views');

var { Image, Text, TouchableOpacity, Navigator, StyleSheet, View } = React;

var NavButton = React.createClass({
    render() {
        return (
            <TouchableOpacity
                style={Styles.headerComponent}
                onPress={this.props.onPress}>
                <Image source={{uri: this.props.icon}} style={Styles.headerIcon} />
            </TouchableOpacity>
        );
    }
});

var NavDate = React.createClass({
    render() {

        var day = moment().format('DD');
        var month = moment().format('MMM');
        var year = moment().format('YYYY');

        return (
            <View style={Styles.headerDate}>
                <View style={Styles.flex}>
                    <Text style={Styles.headerDateTextLarge}>{day}</Text>
                </View>
                <View style={Styles.flex}>
                    <Text style={Styles.headerDateTextSmall}>{month}</Text>
                    <Text style={Styles.headerDateTextSmall}>{year}</Text>
                </View>
            </View>

        );
    }
});

var NavTitle = React.createClass({
    render() {
        return (
            <View style={[Styles.headerComponent, {flex: 3}]}>
                <Text style={Styles.headerText}>{this.props.text}</Text>
            </View>
        );
    }
});

var Header = React.createClass({

    showHistory() {
        this.props.navigator.push({
            id: Views.HISTORY,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom
        })
    },

    showForm() {
        this.props.navigator.push({
            id: Views.CREATE,
            sceneConfig: Navigator.SceneConfigs.HorizontalSwipeJump
        })
    },

    close() {
        dismissKeyboard();
        this.props.navigator.pop();
    },

    render() {
        switch (this.props.route.id) {
            case Views.TODAY:
                return this.headerToday();
                break;
            case Views.HISTORY:
                return this.headerCompleted();
                break;
            case Views.CREATE:
                return this.headerForm();
                break;
        }
    },

    headerToday() {
        return (
            <View style={Styles.header}>
                <NavButton
                    icon="menuItemHistory"
                    onPress={this.showHistory} />
                <NavDate />
                <NavButton
                    icon="menuItemCreate"
                    onPress={this.showForm} />
            </View>
        )
    },

    headerCompleted() {
        return (
            <View style={Styles.header}>
                <NavTitle text="Completed tasks" />
                <NavButton
                    icon="menuItemClose"
                    onPress={this.close} />
            </View>
        )
    },

    headerForm() {
        return (
            <View style={Styles.header}>
                <NavTitle text="New task" />
                <NavButton
                    icon="menuItemClose"
                    onPress={this.close} />
            </View>
        )
    }

});

module.exports = Header;
