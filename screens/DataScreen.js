import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, View, Alert, FlatList, ActivityIndicator } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import { Container, Header, Body, Title, Left, Right, Content, Text, Button } from "native-base";

import { TextTitle } from "../components/TextTitle";
import data from "../data/tidepool-data.json";



export default class DataScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: [],
    };

    this.useLocalData = false;
  }

  componentDidMount() {
    if (this.useLocalData) {
      this.setState({
        isLoading: false,
        dataSource: data,
      });
    } else {
      console.log(false);
      const tempData = [
          {
              "deviceTime": "2018-12-31T19:02:25",
              "value": "9.991",
          },
          {
              "deviceTime": "2019-02-01T05:39:52",
              "value": "12.378",
          },
          {
              "deviceTime": "2019-03-04T14:27:19",
              "value": "7.382",
          },
          {
              "deviceTime": "2019-04-06T00:00:00",
              "value": "9.39393",
          },
          {
              "deviceTime": "2019-05-14T06:25:41",
              "value": "0",
          },
      ];

      const editedTempData = tempData.map((cv, i) => {
        const editedObj = {};
        editedObj.deviceTime = cv.deviceTime;
        editedObj.value = Number(cv.value).toFixed(1);
        return editedObj;
      })
      console.log('tempData: ', tempData);
      console.log('editedTempData: ', editedTempData);


      this.setState((prevState) => ({
          isLoading: false,
          dataSource: editedTempData,
      }));

    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    console.log('this.state: ', this.state);
    console.log(7654.9.toFixed(3))

    return (
      <Container>
        <Content padder>
          <TextTitle title="Imported from tidepool-data" />
           <VictoryChart domainPadding={20}>
            <VictoryBar 
              data={this.state.dataSource}
              x="deviceTime"
              y="value"
              barRatio={10}
              style={{ data: { fill: "tomato", width: 25 } }}
              
            />
            <VictoryAxis
              label="Date and Time"
              offsetX={200}
              tickValues={this.state.dataSource.map((cv, i) => {
                return i += 1;
              })}
              tickFormat={this.state.dataSource.map((cv, i) => {
                return cv.deviceTime;
              })}
            /> 
            <VictoryAxis
              dependentAxis
              // tickFormat specifies how ticks should be displayed
              tickFormat={(x) => {x}}
              label="Value"
            />
          </VictoryChart>

          <FlatList
            style={{ paddingTop: 20 }}
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <Text style={styles.item}>
                {item.id} {" "}
              </Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
      </Container>
    );
  }
}

DataScreen.navigationOptions = {
  header: null,
};

function tidepoolLearnMorePress() {
  WebBrowser.openBrowserAsync("https://tidepool.org/");
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});