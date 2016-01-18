'use strict';
var React = require('react-native');
var { StyleSheet } = React;

var styles = StyleSheet.create({

    screen: {
        flex: 1, 
        marginTop: 64,
        marginBottom: 50,
        backgroundColor: 'white',
        justifyContent: 'center'
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
        borderColor: '#7956EB',
        borderWidth: 2
    },

    buttonText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#7956EB',
        alignSelf: 'center'
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
        paddingLeft: 20, 
        paddingRight: 20
    },
    
    /* Create View */
    
    form: {
        flex: 1
    },

    formInput: {
        flex: 1,
        fontSize: 20, 
        padding: 30, 
        borderWidth: 0, 
    },

    datePicker: {
        flex: 1, 
        marginTop: 64, 
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
        height: 16, 
        width: 16, 
        margin: 20, 
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
        marginBottom: 10,
        resizeMode: 'contain',
    },

    /* Completed View */
                
    listItem: {
        flexDirection: 'row',
        borderBottomWidth: 1, 
        borderBottomColor: '#eeeeee'
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
    
    listItemLink: {
        color: '#6D85FA',
        padding: 10, 
        fontSize: 18,
        marginLeft: 5,
        marginTop: 2,
        color: '#6D85FA'
    }    

});

module.exports = styles;
