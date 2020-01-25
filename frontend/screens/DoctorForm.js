import React from "react";
import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Table, TableWrapper, Row, Rows } from "react-native-table-component";

class DoctorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["NAME", "STRENGTH", "DOSAGE"],
      name: "krish",
      age: "22",
      sex: "male",
      symptoms: ["COUGH", "MILD FEVER"],
      diagnosis: ["CANCER", "HEART ATTACK"],
      prescription: [],
      advice: ["EAT GRAPES", "DRINK WATER"]
    };
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.row}>
            <Text style={styles.label}>PATIENT'S NAME:</Text>
            <TextInput
              style={styles.input}
              value={this.state.name}
              onChangeText={val => this.onChangeText("name", val)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>GENDER:</Text>
            <TextInput
              style={styles.input}
              value={this.state.sex}
              onChangeText={val => this.onChangeText("sex", val)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>AGE:</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={this.state.age}
              onChangeText={val => this.onChangeText("age", val)}
            />
          </View>
          <View>
            <Text style={styles.label}>SYMPTOMS:</Text>
          </View>
          <View style={styles.column}>
            {this.state.symptoms.map((result, index) => (
              <TextInput
                style={styles.label}
                value={this.state.symptoms[index]}
              />
            ))}
          </View>
          <View>
            <Text style={styles.label}>DIAGNOSIS:</Text>
          </View>
          <View style={styles.column}>
            {this.state.diagnosis.map((result, index) => (
              <TextInput
                style={styles.label}
                value={this.state.diagnosis[index]}
              />
            ))}
          </View>
          <View>
            <Text style={styles.label}>PRESCRIPTION:</Text>
          </View>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#6B52AE" }}>
            <Row
              data={this.state.tableHead}
              style={styles.head}
              textStyle={{ ...styles.text, color: "black" }}
            />
          </Table>
          <View style={{ flexDirection: "row" }}>
            <TextInput style={styles.tabledata} />
            <TextInput style={styles.tabledata} />
            <TextInput style={styles.tabledata} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput style={styles.tabledata} />
            <TextInput style={styles.tabledata} />
            <TextInput style={styles.tabledata} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput style={styles.tabledata} />
            <TextInput style={styles.tabledata} />
            <TextInput style={styles.tabledata} />
          </View>

          <View>
            <Text style={styles.label}>ADVICE:</Text>
          </View>
          <View style={styles.column}>
            {this.state.advice.map((result, index) => (
              <TextInput
                style={styles.label}
                value={this.state.advice[index]}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  label: {
    color: "white",
    fontSize: 20,
    flex: 1
  },
  input: {
    height: 40,
    backgroundColor: "white",
    flex: 1,
    borderRadius: 20,
    textAlign: "center",
    fontSize: 20
  },
  row: {
    flexDirection: "row",
    marginVertical: 20,
    alignContent: "center"
  },
  column: {
    alignItems: "center"
  },
  head: { height: 40, backgroundColor: "#6B52AE" },
  text: { margin: 6, color: "white" },
  tabledata: {
    borderWidth: 2,
    borderColor: "#6B52AE",
    flex: 1,
    color: "white"
  }
});

export default DoctorForm;
