import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import tidePoolData from '../data/tidepool-data.json';

import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Right,
  Content,
  Text,
  Button,
} from "native-base";

import { MonoText } from "../components/StyledText";

import { TextTitle } from "../components/TextTitle";

export default class HomeScreen extends React.Component {

  render() {
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Home</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <View style={[styles.elementContainer]}>
          <TextTitle title="Tidepool X Grace Hopper OSD" />
        </View>

        <View style={[styles.elementContainer]}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
              Hello
            </Text>
          </View>
        </View>
      </Content>
    </Container>
  );
}
}
HomeScreen.navigationOptions = {
  header: null,
};

  function showAlert() {
    Alert.alert("Alert!");
  };

const styles = StyleSheet.create({
  elementContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    marginTop: 10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
});
