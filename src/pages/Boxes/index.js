import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { distanceInWords } from "date-fns";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../../services/api";
import styles from "./styles";

export default class Boxes extends Component {
  state = {
    boxes: [],
    boxesInfo: {},
    page: undefined
  };

  async componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/boxes?page=${page}`);
    const { docs, ...boxesInfo } = response.data;

    this.setState({
      boxes: [...this.state.boxes, ...docs],
      boxesInfo,
      page
    });
  };

  loadMore = () => {
    if (this.state.page === this.state.boxesInfo.pages) return;
    this.loadProducts(this.state.page + 1);
  };

  handleSeletion = async box => {
    await AsyncStorage.setItem("@UpEvery:box", box._id);
    this.props.navigation.navigate("Box");
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.box}
      onPress={() => this.handleSeletion(item)}
    >
      <View style={styles.boxInfo}>
        <Icon name="inbox" size={24} color="#a5cfff" />
        <Text style={styles.boxTitle}>{item.title}</Text>
      </View>

      <Text style={styles.boxDate}>
        {distanceInWords(item.updatedAt, new Date())} ago
      </Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props.navigation.goBack()}
        >
          <Icon name="chevron-left" size={32} color="#333" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <FlatList
          style={styles.list}
          data={this.state.boxes}
          keyExtractor={box => box._id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}
