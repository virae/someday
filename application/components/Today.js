'use strict';

var moment = require('moment');
var React = require('react-native');
var Styles = require('../styles/Styles');

var { ActionSheetIOS, DatepickerIOS, Image, Text, TouchableHighlight, View } = React;

var Today = React.createClass({
    
    render() {
        if (this.props.completedToday) {
            return this.renderDoneForToday();
        } else if (!this.props.todo) {
            return this.renderNoTasks();
        } else {
            return this.renderTask();
        }
    },

    renderTask() {
        
        var canBeDefered = typeof this.props.deferedToday == "undefined" && this.props.todos && this.props.todos.legth > 1;
        
        var label = 'Complete', caption;
        
        if (this.props.todo.due) {
            caption = 'Due ' + moment(this.props.todo.due).format('dddd');
        } else if (this.props.deferedToday) {
            caption = "OK, here's another task"
        } else {
            caption = "Today's task";
        }
        
        return (
            <View style={Styles.screen}>
                <View style={[Styles.taskHeader, canBeDefered && Styles.isHidden]}>
                    <TouchableHighlight
                        onPress={this.showTaskMenu}
                        underlayColor='#fff'>
                        <Image source={{uri: 'iconDots'}} style={Styles.taskHeaderIcon} />
                    </TouchableHighlight>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.caption}>
                        {caption.toUpperCase()}
                    </Text>
                    <Text style={Styles.message}>{this.props.todo.text}</Text>
                </View>
                <View style={Styles.taskFooter}>
                    <TouchableHighlight
                        style={Styles.button}
                        underlayColor='#D1DBFC'
                        onPress={() => { this.props.onComplete(this.props.todo.id) }}>
                        <Text style={Styles.buttonText}>
                            {label.toUpperCase()}
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    },
    
    renderDoneForToday() {
        var label = 'All set for today, enjoy your day!';
        return (
            <View style={Styles.screen}>
                <View style={Styles.messageWithIcon}>
                    <Image source={{uri: 'Check'}} style={Styles.messageIcon} />
                    <Text style={[Styles.message, {flex: 1}]}>
                        {label}
                    </Text>
                </View>
            </View>
        );
    },
    
    renderNoTasks() {
        var label = 'Create a task';
        return (
            <View style={Styles.screen}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch'}}>
                    <Text style={Styles.caption}>Welcome!</Text>
                    <Text style={Styles.message}>Start by creating your first task</Text>
                </View>
                <View style={Styles.taskFooter}>
                    <TouchableHighlight
                        style={Styles.button}
                        underlayColor='#D1DBFC'
                        onPress={() => { this.props.onNewTask() }}>
                        <Text style={Styles.buttonText}>
                            {label.toUpperCase()}
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    },

    // -----------------
    // Postpone options
    // -----------------

    showTaskMenu() {
        ActionSheetIOS.showActionSheetWithOptions({
            options: [
                'Tomorrow',
                'Some day',
                'Delete',
                'Cancel',
            ],
            destructiveButtonIndex: 2,
            cancelButtonIndex: 3
        }, (buttonIndex) => {
            switch (buttonIndex) {
                case 0:
                    this.props.onDefer(this.props.todo.id, buttonIndex)
                    break;
                case 1:
                    this.props.onDefer(this.props.todo.id, buttonIndex)
                    break;
                case 2:
                    this.props.onRemove(this.props.todo.id)
                    break;
            }
        });
    }
});

module.exports = Today;
