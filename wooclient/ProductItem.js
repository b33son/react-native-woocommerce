//ProductItem.js

'use strict';

import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import css from "./styles/product";
import style from "./styles/style";
import { Actions } from "react-native-router-flux";

export default class ProductItem extends Component {

  onPress = () => {
    const productId = this.props.product.id;
    const productName = this.props.product.name;
    Actions.checkIn({ productId, productName });

  }

  render() {
    return (
      <TouchableOpacity style={[css.cards]} onPress={this.onPress}>
        <Image source={{ uri: this.props.product.images[0].src }} style={css.productItem}></Image>

        <Text style={css.productName}>{this.props.product.name}</Text>

        <View style={{ flexDirection: 'row' }}>
          <Text style={[css.discountPrice, { paddingBottom: 12 }]}>${this.props.product.price}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}
