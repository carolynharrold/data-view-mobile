import * as WebBrowser from "expo-web-browser";
import React from "react";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";

import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";

import data from "../data/tidepool-data.json";

// const formattedData = [];

// data.forEach((cv, index) => {
//   const objToReturn = {};

//   if (index%10000 === 0) {
//     objToReturn.deviceTime = cv.deviceTime;
//     if (cv.value) {
//       let valueToShorten = cv.value;
//       let shortenedValue = valueToShorten.toFixed(3);
//       objToReturn.value = shortenedValue;
//     } else {
//       objToReturn.value = 0;
//     }
//     formattedData.push(objToReturn);
//   }
// });

// console.log('formattedData: ', formattedData);

// let xAxisTickValues = [];
// let xAxisTickFormats = [];
// let number = 0;
// let amount = 0;

// formattedData.forEach((cv, i) => {
//     number +=1;
//     amount += 1;
//     i += 1;
//     xAxisTickValues.push(i);
// });


// formattedData.forEach((cv, i) => {
//   xAxisTickFormats.push(cv.deviceTime);
// });
// console.log('xAxisTickValues: ', xAxisTickValues);
// console.log('xAxisTickFormats: ', xAxisTickFormats);



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

import { TextTitle } from "../components/TextTitle";


export default class DataScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: [],
    };

    this.useLocalData = true;
    this.xAxisValues = [];
    this.generateXAxisValues = this.generateXAxisValues.bind(this);
    //this.xAxisValues = this.generateXAxisValues(data);
  }

 

  componentDidMount() {
    //console.log('formattedData: ', formattedData[0]);


    if (this.useLocalData) {
      const formattedData = [];
      data.forEach((cv, index) => {
        const objToReturn = {};
        if (index%10000 === 0) {
          objToReturn.deviceTime = cv.deviceTime;
          if (cv.value) {
            let valueToShorten = cv.value;
            let shortenedValue = valueToShorten.toFixed(3);
            objToReturn.value = shortenedValue;
          } else {
            objToReturn.value = 0;
          }
          formattedData.push(objToReturn);
        }
      });
      console.log('formattedData: ', formattedData);
    
      this.setState({
        isLoading: false,
        dataSource: formattedData,
      });
    } else {
      let dateSet = [
        { deviceTime: 1, value: 10000 },
        { deviceTime: 2, value: 20000 },
        { deviceTime: 3, value: 30000 },
        { deviceTime: 4, value: 40000 }
      ];

      this.setState({
        isLoading: false,
        dataSource: dateSet,

      })
      
    }
  }

  




  render() {
    
    // let xAxisTickValues = this.state.dataSource.map((cv, i) => {
    //   return i += 1;
    // });

    // let xAxisTickFormats = 

    // formattedData.forEach((cv, i) => {
    //   xAxisTickFormats.push(cv.deviceTime);
    // });


    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    

    return (
      <Container>
        <Content padder>
          <TextTitle title="Imported from tidepool-data" />
          <VictoryChart domainPadding={20}>
            

            <VictoryBar 
              data={data}
              x="deviceTime"
              y="value"
            />
          </VictoryChart>
          <FlatList
            style={{ paddingTop: 20, backgroundColor: 'red' }}
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

// tickFormat={(x) => (`$${x.toFixed(3)}`)}
            // tickFormat={(x) => (`$${x / 1000}k`)}

{/* <VictoryAxis
            tickValues={this.state.dataSource.map((cv, i) => {
      return i += 1;
    });}
            tickFormat={this.state.dataSource.map((cv, i) => {
      return i += 1;
    });}
          /> 
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => (`$${x / 1000}k`)}
          /> */}






      //     return 

      // return fetch("https://potterverse.herokuapp.com/data/characters_basic")
      // // if you wanted to fetch data from an API rather than using local data

      //   .then(response => {
      //     return response.json();
      //   })
      //   .then(responseJson => {
      //     this.setState({
      //       isLoading: false,
      //       dataSource: responseJson,
      //     });
      //   })
      //   .catch(error => {
      //     console.log("error");
      //   });