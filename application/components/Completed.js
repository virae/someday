'use strict';

var moment = require('moment');
var React = require('react-native');
var Header = require('./Header');
var Styles = require('../styles/Styles');

var { AlertIOS, Image, ListView, Text, TouchableHighlight, View } = React;

var Completed = React.createClass({

    render() {
        var tasks = this.props.tasks || [];

        if (tasks.length) {
            var content = <TaskList items={tasks} clearHistory={this.confirmDialog} />
        } else {
            var content = <Text style={[Styles.caption]}>No completed tasks.</Text>
        }
        return (
            <View style={{flex: 1}}>
                <Header navigator={this.props.navigator} route={{id: this.props.route}} />
                <View style={Styles.screen}>
                    { content }
                </View>
            </View>
        )
    },

    /**
     * Removal confirmation dialog
     */

    confirmDialog() {
        AlertIOS.alert(
            'Are you sure?', 'This will delete all completed tasks',
            [
                {text: 'Ok', onPress: () => this.props.clearHistory() },
                {text: 'Cancel', style: 'cancel'}
            ]
        )
    }
});

var TaskList = React.createClass({

    componentWillMount() {
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
    },

    render() {
        var dataSource = this.dataSource.cloneWithRows(this.props.items);
        return (
            <ListView
                automaticallyAdjustContentInsets={false}
                dataSource={dataSource}
                renderRow={this.renderRow}
                renderFooter={this.renderFooter} />
        );
    },

    renderRow(rowData, sectionID, rowID) {
        return (
            <TaskListItem item={rowData} />
        )
    },

    renderFooter() {
        return (
            <View>
                <TouchableHighlight
                    onPress={this.props.clearHistory}
                    underlayColor='#D1DBFC'>
                    <Text style={Styles.listItemLink}>
                        Clear completed tasks
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
});

var TaskListItem = React.createClass({
    render() {
        var item = this.props.item;
        return (
            <View style={Styles.listItem}>
                <Image source={{uri: 'iconCompleted'}} style={Styles.listItemIcon} />
                <Text
                    style={[Styles.listItemText, {flex: 1}]}>
                    {item.text}
                </Text>
                <Text
                    style={[Styles.listItemSmallText, {flex: 1}]}>
                    {moment(item.completedOn).fromNow()}
                </Text>
            </View>
        );
    }
});

module.exports = Completed;
