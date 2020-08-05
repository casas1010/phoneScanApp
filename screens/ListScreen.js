import React, { useEffect, useState, useRef } from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import * as actions from "../actions/index";

import ListCard from "../components/ListCard";

const ListScreen = (props) => {
  const deleteItemCallback = (barcode) => {
    props.deleteItem(barcode);
  };

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={{ paddingBottom: 20 }}
      scrollEnabled
      data={props.items}
      keyExtractor={(element) => element.barcode}
      renderItem={(element) => {
        return (
          <>
            <ListCard
              imageURL={element.item.imageURL}
              name={element.item.name}
              barcode={element.item.barcode}
              onPressAction={deleteItemCallback}
            />
          </>
        );
      }}
    />
  );
};

ListScreen.navigationOptions = {
  tabBarIcon: <Feather name="list" size={24} color="white" />,
  tabBarOptions: {
    activeBackgroundColor: "black",
    inactiveBackgroundColor: "black",
  },
};

const styles = StyleSheet.create({
  list: {
    paddingLeft: 15,
    paddingTop: 20,
  },
});

function mapStateToProps({ items }) {
  return { items };
}

export default connect(mapStateToProps, actions)(ListScreen);
