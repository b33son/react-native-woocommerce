// RootRouter.js

'use strict';

import React, { Component } from "react";
import { Navigator, Text, View } from "react-native";
import { Actions, Router, Scene, Schema, Animations } from "react-native-router-flux";
import Products from "./Products";
import CheckIn from "./CheckIn";

export default class RootRouter extends Component {
  render() {
    const scenes = Actions.create(
      <Scene key="scene">
        <Scene key="products" component={Products} title="Products" initial={true} />
        <Scene key="checkIn" component={CheckIn} title="CheckIn" />
      </Scene>
    );

    return (
      <Router hideNavBar={true} scenes={scenes} />
    );
  }
}
