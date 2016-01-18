'use strict'; 

var _ = require('underscore');
var moment = require('moment');
var React = require('react-native');

var { ActionSheetIOS, AsyncStorage, TabBarIOS, Text, View } = React;

/* Views */
var Today = require('./Today');
var Create = require('./Create');
var Completed = require('./Completed');

/* Store */
var Store = require('../stores/TaskStore');

var App = React.createClass({

    getDefaultProps() {
        return { view: 'today' }
    },
    
    getInitialState() {
        return { view: this.props.view, tasks: [] }
    },

    componentDidMount() {
        this.reloadState()
    },

    // -------------
    // Tasks Store
    // -------------

    async reloadState(options = {}) {
        
        var tasks = await Store.getAll();

        this.setState({
            tasks: tasks,
            view: options.view || this.props.view
        })
    },
    
    async createTask(data) {
        Store.create(data);
        this.props.navigator.pop();
        this.reloadState({view: 'today'});
    },
    
    async removeTask(id) {
        await Store.destroy(id);
        this.reloadState();
    },

    async completeTask(id) {
        await Store.complete(id);
        this.reloadState();
    },

    async deferTask(id, option) {
        await Store.defer(id, option);
        this.reloadState();
    },
            
    async clearCompleted() {
        await Store.clearCompleted();
        this.reloadState({view: 'completed'});
    },

    // -------------
    // Views
    // -------------

    loadView(view) {
        if (this.state.view != view) {
            this.setState({view: view});
        }
    },
    
    loadFormView() {
        this.props.navigator.push({
            title: 'New Task',
            component: Create,
            passProps: {onSubmit: this.createTask}
        });
    },
    
    render() {
        return (
            <TabBarIOS
                tintColor="#7956EB"
                barTintColor="#f6f6f6">
                <TabBarIOS.Item
                    title="Today"
                    icon={{uri: 'menuItemToday', scale: 2}}
                    selected={this.state.view == "today"}
                    onPress={() => {this.loadView('today')}}>
                    <Today 
                        todo={_.first(this.state.tasks.todo)}
                        todos={this.state.tasks.todo}
                        completedToday={this.state.tasks.completedToday} 
                        deferedToday={this.state.tasks.deferedToday}  
                        onComplete={this.completeTask}
                        onRemove={this.removeTask}
                        onDefer={this.deferTask}
                        onNewTask={() => {this.loadFormView()}}>
                    </Today>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Completed"
                    icon={{uri: 'menuItemHistory', scale: 2}}
                    selected={this.state.view == "completed"}
                    onPress={() => {this.loadView('completed')}}>
                    <Completed 
                        tasks={this.state.tasks.completed}
                        clearHistory={this.clearCompleted}>
                    </Completed>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="New Task"
                    icon={{uri: 'menuItemCreate', scale: 2}}
                    selected={this.state.view == "form"}
                    onPress={() => {this.loadFormView()}}>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
});

module.exports = App;
