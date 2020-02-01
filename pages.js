import React, { Component } from 'react'

import {
    Text,
    View,
    StatusBar,
    Button,
} from 'react-native';

import {Link} from "react-router-native"

import styles from './styles.js'
import UselessTextInput from './textInput.js';

export class Page1 extends Component {
    render() {
        return (
            <>
            <StatusBar barStyle="dark-content" backgroundColor="#EEAA53" />
                <View style = {styles.homeBackground}>
                  <Text style = {styles.homeTitle}>
                    Welcome Message
                  </Text>
                </View>
                <View style = {styles.buttonBackground}>
                    <Button 
                        title="Create A New Iteneraries" 
                        onPress = {() => this.props.history.push('/page2')} 
                    />
                </View>
                <View style = {styles.buttonBackground}>
                    <Button 
                        title="View Saved Iteneraries" 
                        onPress = {() => this.props.history.push('/page3')} 
                    />
                </View>
                <View style = {styles.bodyFiller} />            
            </>
        );
    }
}

export class Page2 extends Component {
    state = { destination: '', arrivalTime: '', departureTime: ''}
    
    render() {
        return (
            <>
            <StatusBar barStyle="dark-content" backgroundColor="#AAAAFF" />
            <View>
                <Text style = { styles.newItTitle }>Create A New Itenerary</Text>
            </View>
            <View style = { styles.flex }>
                <Text style = { styles.textBoxTitle }>Destination:</Text>
                <UselessTextInput value={this.state.destination} onChangeText={text => this.setState({destination: text})} />
            </View>
            <View style = { styles.flex }>
                <Text style = { styles.textBoxTitle }>Arrival Time:</Text>
                <UselessTextInput value={this.state.arrivalTime} onChangeText={text => this.setState({arrivalTime: text})} />
            </View>
            <View style = { styles.flex }>
                <Text style = { styles.textBoxTitle }>Departure Time:</Text>
                <UselessTextInput value={this.state.destination} onChangeText={text => this.setState({departureTime: text})} />
            </View>
            <View style = {styles.buttonBackground}>
                <Button 
                    title="Search and Create!" 
                    onPress = {() => this.props.history.push('/page4')} 
                />
            </View>
            <View style = {styles.buttonBackground}>
                <Button 
                    title="Go Back and view Saved Iteneraries" 
                    onPress = {() => this.props.history.push('/page3')} 
                />
            </View>
            <View style = { styles.bodyFiller } />
            </>
        );
    }
}

export class Page3 extends Component {
    render() {
        return (
            <View>
                <Text>I am God</Text>

                <Link to='/'>
                <Text>Bad Dhruv</Text>
                </Link>
            </View>
        );
    }
}

export class Page4 extends Component {
    render() {
        return (
            <View>
                <Text>P4</Text>

                <Link to='/'>
                <Text>Bad Dhruv</Text>
                </Link>
            </View>
        );
    }
}