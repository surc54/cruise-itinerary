/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {NativeRouter, Route, Link, Redirect, Switch} from "react-router-native"
import { Page1, Page2, Page3, Page4 } from './pages.js'

export default class App extends Component {
  componentDidMount() {

  }
  render() {
      return (
        <NativeRouter>
          <Switch>
          <Route exact path='/' component={Page1} />
          <Route path='/page2' component={Page2} />
          <Route path='/page3' component={Page3} />
          <Route path='/page4' component={Page4} />
          <Route render={(e) => <Redirect to="/" />} />
          </Switch>
        </NativeRouter>
      );
  }

}