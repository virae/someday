'use strict';

var _ = require('underscore');
var moment = require('moment');
var assign = require('object-assign');
var React = require('react-native');

var { AsyncStorage } = React;

var _tasks = [];

var TaskStore = {

    /**
     * Get the entire collection of Tasks.
     */
    getAll() {
        return AsyncStorage.getItem('tasks').then((data) => {

            _tasks = JSON.parse(data) || [];

            // Sort tasks by priority
            _tasks.sort(this.sortByPriority)

            return {
                all: _tasks,
                todo: _.where(_tasks, {completed: false}),
                completed: _.where(_tasks, {completed: true}),
                completedToday: _.some(_tasks, (task) => {return moment().format('YYYY-MM-DD') == moment(task.completedOn).format('YYYY-MM-DD')}),
                deferedToday: _.findWhere(_tasks, {deferedOn: moment().format('YYYY-MM-DD')})
            }
        })
    },

    /*
     * Create new Task item.
     */
    create(attributes) {
        _tasks.push({
            id: moment().unix(),
            text: attributes.text,
            due: attributes.due || null,
            completed: false,
            createdOn: moment().format(),
            completedOn: null
        });
        return this.persist();
    },

    /**
     * Update a Task item.
     */
    update(id, attributes) {
        var task = _.findWhere(_tasks, {id: id});
        task = assign(task, attributes);
        return this.persist();
    },

    /**
     * Delete a task.
     */
    destroy(id) {
        _tasks = _.reject(_tasks, (task) => { return task.id == id })
        return this.persist();
    },

    /**
     * Mark task as completed.
     */
    complete(id) {
        var task = _.findWhere(_tasks, {id: id});
        task = assign(task, {
            completed: true,
            completedOn: moment()
        });
        return this.persist();
    },

    /**
     * Defer task.
     */
    defer(id, type) {

        var task = _.findWhere(_tasks, {id: id});
        var tasks = _.where(_.clone(_tasks), {completed: false})

        if (tasks.length > 1) {

            tasks.sort(this.sortByCreatedDate);

            if (type == 0) {
                // Defer after next task
                var deferFor = 1 + moment(tasks[1].createdOn) - moment(task.createdOn)
            } else if (type == 1) {
                // Defer after last task
                var deferFor = 1 + moment(tasks[tasks.length - 1].createdOn) - moment(task.createdOn)
            }
            task = assign(task, {
                deferFor: deferFor,
                deferedOn: moment().format('YYYY-MM-DD')
            });
        }
        return this.persist();
    },

    /**
     * Delete all completed Tasks.
     */
    clearCompleted() {
        _tasks = _.reject(_tasks, (task) => { return task.completed })
        return this.persist();
    },

    getTaskPriority(task) {

        var priority = 0;

        var today = moment();
        var week = moment().add(7, 'days');

        var createdOn = moment(task.createdOn);
        var completedDate = task.completedOn ? moment(task.completedOn) : null;
        var dueDate = task.due ? moment(task.due) : null;

        var unixDays = 24 * 3600000;

        // - Defered tasks
        if (task.deferFor) {
            createdOn = moment(moment(task.createdOn).unix() + task.deferFor, 'X');
        }

        if (task.completed) {
            // - Days since completed
            priority = completedDate - today;
        } else if (task.due) {
            if (dueDate < today) {
                // Due date in the past
                priority = Math.pow(10, 6) * (today - dueDate);
            } else if ((dueDate - today) < (7 * unixDays)) {
                // Due date within a week
                priority = Math.pow(10, 3) * (week - dueDate);
            } else {
                // Due date not taken into account
                priority = today - createdOn;
            }
        } else {
            // Days since created
            priority = today - createdOn;
        }

        return priority / unixDays;
    },

    /**
     * Get the entire collection of Tasks.
     */
    sortByPriority(a, b) {
        return TaskStore.getTaskPriority(b) - TaskStore.getTaskPriority(a)
    },

    /**
     * Get the entire collection of Tasks.
     */
    sortByCreatedDate(a, b) {
        return b.createdOn - a.createdOn
    },

    /**
     * Save Tasks to Storage
     */
    persist() {
        return AsyncStorage.setItem('tasks', JSON.stringify(_tasks));
    }
};

module.exports = TaskStore;
