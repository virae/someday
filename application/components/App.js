'use strict';

var _ = require('underscore');
var moment = require('moment');
var React = require('react-native');

var { Navigator } = React;

/* Views */
var Today = require('./Today');
var Create = require('./Create');
var Completed = require('./Completed');

/* Store */
var Store = require('../stores/TaskStore');
var Views = require('../constants/Views');

var App = React.createClass({

    getDefaultProps() {
        return { view: Views.TODAY }
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

        this.navigator.replace({id: options.view || this.props.view})
    },

    async createTask(data) {
        await Store.create(data);
        this.navigator.pop();
        this.reloadState({view: Views.TODAY});
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
        this.reloadState({view: Views.HISTORY});
    },

    // -------------
    // Views
    // -------------

    renderScene: function(route, nav) {
        switch (route.id) {
            case Views.TODAY:
                return <Today
                    navigator={nav}
                    route={Views.TODAY}
                    todo={_.first(this.state.tasks.todo)}
                    todos={this.state.tasks.todo}
                    completedToday={this.state.tasks.completedToday}
                    deferedToday={this.state.tasks.deferedToday}
                    onComplete={this.completeTask}
                    onRemove={this.removeTask}
                    onDefer={this.deferTask} />
            case Views.HISTORY:
                return <Completed
                    navigator={nav}
                    route={Views.HISTORY}
                    tasks={this.state.tasks.completed}
                    clearHistory={this.clearCompleted} />;
            case Views.CREATE:
                return <Create
                    route={Views.CREATE}
                    navigator={nav}
                    onSubmit={this.createTask} />
        }
    },

    render() {
        return (
            <Navigator
                ref={(navigator) => {this.navigator = navigator}}
                initialRoute={{id: this.state.view}}
                renderScene={this.renderScene}
                configureScene={(route) => {
                    var sceneConfig = route.sceneConfig || Navigator.SceneConfigs.HorizontalSwipeJump;
                    sceneConfig.gestures = {};
                    return sceneConfig;
                }}
            />
        );
    }

});

module.exports = App;
