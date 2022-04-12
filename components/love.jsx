import React, { Component } from "react";
import { Text, View, Button, ScrollView, StyleSheet } from "react-native";

class Love extends Component {
  constructor(props) {
    super(props);
    this.state = {
      miliSecond: 0,
      second: 0,
      minute: 0,
      prevMilisec: 0,
      prevSecond: 0,
      prevMinute: 0,
      lap: [],
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.lap = this.lap.bind(this);
    this.format = this.format.bind(this);
  }

  start() {
    this.interval = setInterval(() => {
      this.setState({ miliSecond: this.state.miliSecond + 1 });
      if (this.state.miliSecond === 100) {
        this.setState({ miliSecond: 0, second: this.state.second + 1 });
      }

      if (this.state.second === 60) {
        this.setState({ second: 0, minute: this.state.minute + 1 });
      }
    }, 10);
  }

  stop() {
    this.setState({
      miliSecond: 0,
      second: 0,
      minute: 0,
      prevMilisec: 0,
      prevSecond: 0,
      prevMinute: 0,
      lap: [],
    });
    clearInterval(this.interval);
  }
  lap() {
    let tempms = 0,
      tempsc = 0,
      tempmn = 0;
    if (this.state.miliSecond >= this.state.prevMilisec) {
      tempms = this.state.miliSecond - this.state.prevMilisec;
    } else {
      tempms = this.state.miliSecond + 100 - this.state.prevMilisec;
      tempsc--;
    }
    this.setState({ prevMilisec: this.state.miliSecond });
    if (this.state.second >= this.state.prevSecond) {
      tempsc = this.state.second - this.state.prevSecond;
    } else {
      tempsc = this.state.second + 60 - this.state.prevSecond;
      tempmn--;
    }
    this.setState({ prevSecond: this.state.second });
    tempmn += this.state.minute;
    tempmn -= this.state.prevMinute;
    this.setState({ prevMinute: this.state.minute });
    this.setState({
      lap: [...this.state.lap].concat({ tempmn, tempsc, tempms }),
    });
  }
  format(m) {
    return m > 10 ? m : "0" + m;
  }
  render() {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "powderblue",
          flexDirection: "column",
          marginTop: "20",
          alignItems: "center",
        }}
      >
        <Text>{`${this.format(this.state.minute)}:${this.format(
          this.state.second
        )}:${this.format(this.state.miliSecond)}`}</Text>

        <View style={{ flexDirection: "row", gap: "5" }}>
          <Button color="#841584" onPress={this.start} title="Start"></Button>
          <Button color="#FF0000" onPress={this.stop} title="refresh"></Button>
          <Button color="#808080" onPress={this.lap} title="Lap"></Button>
        </View>
        {this.state.lap.map((loop, id) => (
          <Text key={id}>{`lap ${id}: ${this.format(loop.tempmn)}:${this.format(
            loop.tempsc
          )}:${this.format(loop.tempms)}`}</Text>
        ))}
      </View>
    );
  }
}

export default Love;
