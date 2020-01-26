import React, { Component } from "react";

import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Modal
} from "react-native";
import DismissKeyboard from "../shared/DismissKeyboard";
import { Image as ReactImage } from "react-native";

import Voice from "react-native-voice";

export default class DoctorSpeak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: "",
      started: true,
      results: ["Nikhil eats cancer"],
      success: false,
      modalVisible: false
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }

  // componentWillUnmount() {
  //   Voice.destroy().then(Voice.removeAllListeners);
  // }
  onSpeechStart(e) {
    this.setState({
      started: false
    });
  }
  onSpeechRecognized(e) {
    this.setState({
      recognized: "√"
    });
  }
  onSpeechResults(e) {
    this.setState(prevState => ({
      results: [...prevState.results, e.value[0]]
    }));
    Voice.start("en-US");
  }

  async componentDidMount() {
    // ("https://hack-404.herokuapp.com/api/df_event_query", {
    //   event: "welcome"
    // }
    axios
      .post("http://10.21.131.143:8000/api/df_event_query", { event: "welcome" })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log("error came"));
    const res = await axios.post("/api/df_event_query", { event: "welcome" });
    console.log(res.data);
  }

  handleDialogflow = () => {
    let text = [...this.state.results].join(" ");
    console.log("the send text is ", text);

    axios
      .post("/api/df_text_query", { text: text })
      .then(res => console.log(res.data))
      .then(this.setState({ success: true }))
      .catch(err => console.log("error coming"));
    this.props.navigation.navigate("DoctorForm", {
      name: "krish",
      age: "22",
      sex: "male",
      symptoms: ["COUGH", "MILD FEVER"],
      diagnosis: ["CANCER", "HEART ATTACK"],
      prescription: [
        {
          name: "Paracetamol",
          strength: "500 mg",
          dosage: "Once a day before food"
        },
        {
          name: "Cefixime",
          strength: "500 mg",
          dosage: "Twice a day before food"
        }
      ],
      advice: ["EAT GRAPES", "DRINK WATER"]
    });
  };

  async _startRecognition(e) {
    console.log("started");
    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  }
  async _endRecognition(e) {
    console.log("stoped");
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    // Voice.isRecognizing()
    //   .then(e => {
    //     if (e) this.setState({ started: false });
    //     else this.setState({ started: true });
    //   })
    //   .catch(err => console.log(err));
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={{ marginTop: 22 }}>
              <View>
                <Text>Hello World!</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <View style={styles.speechcontainer}>
            <View style={styles.scrollcontainer}>
              <ScrollView>
                {this.state.results.map((result, index) => (
                  <TextInput
                    style={styles.text}
                    multiline
                    key={index}
                    value={this.state.results[index]}
                    onChangeText={text => {
                      let newResults = this.state.results;
                      newResults[index] = text;
                      this.setState({ results: newResults });
                    }}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
          <View style={styles.buttonscontainer}>
            <TouchableOpacity onPress={this._startRecognition.bind(this)}>
              <ReactImage
                source={require("../assets/icons8-microphone-64.png")}
                style={styles.microphone}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this._endRecognition.bind(this)}>
              <ReactImage
                source={require("../assets/icons8-stop-64.png")}
                style={styles.stop}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleDialogflow}>
              <ReactImage
                source={require("../assets/icons8-next-page-64.png")}
                style={styles.stop}
              />
            </TouchableOpacity>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Text>Show Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1
  },
  speechcontainer: {
    flex: 7,
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonscontainer: {
    flex: 1,

    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  microphone: {
    width: 50,
    height: 50
  },
  text: {
    color: "white"
  },
  stop: {
    width: 50,
    height: 50
  },
  microphonecontainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  scrollcontainer: {
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#6B52AE",
    marginVertical: 20,

    width: "90%"
  }
});
