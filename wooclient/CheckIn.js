// CheckIn.js

import React, { Component } from 'react';
import { Button, TextInput, Text, View, TouchableOpacity, Image } from "react-native";
import Api from "./WooCommerce/Api";
import { graphql, compose } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

const newCheckIn = gql`
mutation createCheckIn($wooOrderId: String!, $wooProductName: String!, $wooProductId: String!) {
    createCheckIn(wooOrderId: $wooOrderId, wooProductName:$wooProductName, wooProductId:$wooProductId) {
    wooOrderId
    wooProductName
    wooProductId
    }
  }
`;

const queryCheckInByWooId = gql`
query queryCheckInByWooId($wooOrderId: String!) {
  CheckIn(wooOrderId: $wooOrderId) {
    wooOrderId
    wooProductName
    wooProductName
    createdAt
    user {
      id
      email
    }
  }
}
`;




class CheckIn extends Component {
  constructor(props) {
    super(props);
    //this.data = [];
    //this.data = "";
    this.state = {
      orderId: '15050',
      isOnline: true,
      isLoading: false,
      finish: false,
      data: "",
    };
  }

  queryCheckInByWooId = ({ wooOrderId }) => {
    queryCheckInByWooId({
      // Adds variables to the graphGql named newPost1
      variables: {
        wooOrderId
      }
    }).then(() => {
      console.log("queryCheckInByWooId returned")
    })
      .catch(error => {
        console.log(error);
      });
  };

  createCheckIn = ({ wooOrderId, wooProductId, wooProductName }) => {
    newCheckIn1({
      // Adds variables to the graphGql named newPost1
      variables: {
        wooOrderId,
        wooProductId,
        wooProductName
      }
    })
      .then(() => {
        //navigation.goBack();
      })
      .catch(error => {
        console.log(error);
      });
  };

  fetchOrder() {
    console.log("this.props.productId");
    console.log(this.props.productId);
    var self = this;
    if (this.state.finish || !this.state.isOnline) {
      return;
    }
    self.setState({ isLoading: true });
    //http://woocommerce.github.io/woocommerce-rest-api-docs/?javascript#orders
    console.log("this.state.orderId");
    console.log(this.state.orderId);




    Api.get('orders/' + this.state.orderId)
      .then(function (data) {

        const wooOrderId = this.state.orderId;

        if (data.data && data.data.status == 404) {//         * If order not found
          console.log("Order not found");
        } else if (data.line_items[0].product_id !== self.props.productId) { //         * Display Warning: Ticket is for a different event
          console.log("Ticket is not for the selected event");
          console.log("Selected event: " + self.props.productName);
          console.log("Ticket is for: " + data.line_items[0].name);
          console.log("test");
        } else {
          // Check status of the graphQL CheckIn for WooOrder Id
          //self.queryCheckInByWooId();
          console.log("Call queryCheckInByWooId");

          // const checkIn = await this.props.queryCheckInByWooId({
          //   variables: { wooOrderId }
          // });
        }


      });
  }



  onPressCheckIn = () => {
    // fetch order by id
    //console.log("fetch " + this.state.text);

    this.fetchOrder();
  }

  render() {
    return (
      <View>
        <Text>ProductId: {this.props.productId}</Text>
        <Text>Name: {this.props.productName}</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="Enter order id"
          onChangeText={(orderId) => this.setState({ orderId })}
        />
        <Button
          onPress={this.onPressCheckIn}
          title="Check In"
          color="#333"
          accessibilityLabel="Check In"
        />
        <Text>Name: {this.state.data.id}</Text>
      </View>


    )
  }
};




export default compose(
  graphql(queryCheckInByWooId, {
    name: "queryCheckInByWooId",
    options: () => ({
      variables: {
        wooOrderId: "1"
      }
    })
  }),
  graphql(newCheckIn, {
    name: "newCheckIn1"
  })
)(CheckIn);