'use strict';
var React = require('react-native');
var { StyleSheet } = React;

var styles = StyleSheet.create({

    screen: {
        flex: 1,
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: 'white',
        justifyContent: 'center'
    },

    flex: {
        flex: 1
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    isHidden: {
        opacity: 0
    },

    caption: {
        marginTop: 0,
        marginBottom: 10,
        fontSize: 16,
        textAlign: 'center',
        color: '#aaa'
    },

    message: {
        marginTop: 0,
        marginLeft: 30,
        marginRight: 30,
        fontSize: 26,
        textAlign: 'center',
        color: '#222'
    },

    button: {
        flex: 0,
        height: 36,
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginLeft: 60,
        marginRight: 60,
        borderRadius: 20,
        borderColor: '#977ED1',
        borderWidth: 2
    },

    buttonLarge: {
        height: 42,
        marginLeft: 40,
        marginRight: 40
    },

    buttonText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#977ED1',
        alignSelf: 'center'
    },

    buttonTextLarge: {
        fontSize: 15
    },

    inlineButton: {
        flex: 6,
        marginLeft: 5,
        marginRight: 5
    },

    secondaryButton: {
        borderColor: '#aaaaaa',
        flex: 4,
    },

    secondaryButtonText: {
        color: '#aaaaaa'
    },

    buttonGroup: {
        flex: 0,
        flexDirection: 'row',
        marginTop: 30,
        paddingLeft: 20,
        paddingRight: 20
    },

    /* Create View */

    form: {
        flex: 1,
        paddingBottom: 40
    },

    formInput: {
        flex: 1,
        fontSize: 20,
        height: 90,
        padding: 30,
        borderWidth: 0,
    },

    datePicker: {
        flex: 1,
        marginTop: 164,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    /* Today View */

    taskFooter: {
        flex: 0,
        marginBottom: 40,
        flexDirection: 'column',
        alignItems: 'stretch'
    },

    taskHeader: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    taskHeaderIcon: {
        height: 20,
        width: 20,
        margin: 30,
        resizeMode: 'contain'
    },

    messageWithIcon: {
        flex: 0,
        marginTop: -40,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    messageIcon: {
        flex: 1,
        height: 40,
        width: 40,
        marginBottom: 16,
        resizeMode: 'contain',
    },

    /* Completed View */

    listItem: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        paddingVertical: 8
    },

    listItemIcon: {
        height: 12,
        width: 12,
        marginLeft: 16,
        marginTop: 24,
        resizeMode: 'contain'
    },

    listItemText: {
        padding: 16,
        fontSize: 20,
        marginLeft: 5,
        marginTop: 2,
        color: '#222222'
    },

    listItemSmallText: {
        padding: 16,
        fontSize: 13,
        lineHeight: 20,
        textAlign: 'right',
        color: '#999'
    },

    listItemLink: {
        color: '#977ED1',
        padding: 10,
        fontSize: 18,
        marginLeft: 5,
        marginTop: 2
    },

    header: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#977ED1'
    },

    headerComponent: {
        flex: 1,
        alignSelf: 'stretch',
        paddingVertical: 60
    },

    headerText: {
        textAlign: 'left',
        paddingHorizontal: 30,
        color: 'white',
        fontSize: 24,
        lineHeight: 24
    },

    headerDate: {
        flex: 2, alignSelf: 'center', flexDirection: 'row', marginTop: 10
    },

    headerDateTextLarge: {
        flex: 3, color: 'white', textAlign: 'right', lineHeight: 48, fontSize: 48, paddingHorizontal: 3

    },

    headerDateTextSmall: {
        color: 'white', lineHeight: 20, fontSize: 20, paddingHorizontal: 3
    },

    headerIcon: {
        flex: 1,
        alignSelf: 'center',
        height: 24,
        width: 24,
        resizeMode: 'contain'
    }
});

module.exports = styles;
