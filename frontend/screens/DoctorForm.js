import React from "react";
import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Table, TableWrapper, Row, Rows } from "react-native-table-component";
import axios from "axios";

class DoctorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["NAME", "STRENGTH", "DOSAGE"],
      name: props.navigation.getParam("name"),
      age: props.navigation.getParam("age"),
      sex: props.navigation.getParam("sex"),
      symptoms: props.navigation.getParam("symptoms"),
      diagnosis: props.navigation.getParam("diagnosis"),
      prescription: props.navigation.getParam("prescription"),
      advice: props.navigation.getParam("advice"),
      userEmail: "",
      userPhoneNumber: ""
    };
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  sendFinalData = () => {
    const data = {
      title: "Prescription",
      doctor: this.props.navigation.getParam("doctor"),

      hospital: this.props.navigation.getParam("hospital"),

      doctorNo: this.props.navigation.getParam("doctorNo"),
      name: this.state.name,
      age: this.state.age,
      sex: this.state.sex,
      symptoms: this.state.symptoms,
      diagnosis: this.state.diagnosis,
      prescription: this.state.prescription,
      advice: this.state.advice,
      userEmail: this.state.userEmail,
      userPhoneNumber: this.state.userPhoneNumber
    };

    axios
      .post("http://10.0.2.2:8000/api/finalData", { data: data })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  render() {
    const { navigate } = this.props.navigation;
    var tablerows = [];
    for (let i = 0; i < this.state.prescription.length; i++) {
      tablerows.push(
        <View key={"table" + i} style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.tabledata}
            value={this.state.prescription[i].name}
            onChangeText={text => {
              let newPrescription = this.state.prescription;
              newPrescription[i].name = text;
              this.setState({ prescription: newPrescription });
            }}
          />
          <TextInput
            style={styles.tabledata}
            value={this.state.prescription[i].strength}
            onChangeText={text => {
              let newPrescription = this.state.prescription;
              newPrescription[i].strength = text;
              this.setState({ prescription: newPrescription });
            }}
          />
          <TextInput
            style={styles.tabledata}
            value={this.state.prescription[i].dosage}
            onChangeText={text => {
              let newPrescription = this.state.prescription;
              newPrescription[i].dosage = text;
              this.setState({ prescription: newPrescription });
            }}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.row}>
            <Text style={styles.label}>PATIENT'S EMAIL:</Text>
            <TextInput
              style={styles.input}
              value={this.state.userEmail}
              onChangeText={val => this.onChangeText("userEmail", val)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>PATIENT'S PHONE NUMBER:</Text>
            <TextInput
              style={styles.input}
              value={this.state.userPhoneNumber}
              onChangeText={val => this.onChangeText("userPhoneNumber", val)}
            />
          </View>
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
              numericvalue
              keyboardType="numeric"
              style={styles.input}
              value={String(this.state.age)}
              onChangeText={val => this.onChangeText("age", val)}
            />
          </View>
          <View>
            <Text style={styles.label}>SYMPTOMS:</Text>
          </View>
          <View style={styles.column}>
            {this.state.symptoms.map((result, index) => (
              <TextInput
                key={"symptoms" + index}
                style={styles.label}
                value={this.state.symptoms[index]}
                onChangeText={text => {
                  let newSymptoms = this.state.symptoms;
                  newSymptoms[index] = text;
                  this.setState({ symptoms: newSymptoms });
                }}
              />
            ))}
          </View>
          <View>
            <Text style={styles.label}>DIAGNOSIS:</Text>
          </View>
          <View style={styles.column}>
            {this.state.diagnosis.map((result, index) => (
              <TextInput
                key={"diagnosis" + index}
                style={styles.label}
                value={this.state.diagnosis[index]}
                onChangeText={text => {
                  let newDiagnosis = this.state.diagnosis;
                  newDiagnosis[index] = text;
                  this.setState({ diagnosis: newDiagnosis });
                }}
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

          {tablerows}

          <View>
            <Text style={styles.label}>ADVICE:</Text>
          </View>
          <View style={styles.column}>
            {this.state.advice.map((result, index) => (
              <TextInput
                key={"advice" + index}
                style={styles.label}
                value={this.state.advice[index]}
                onChangeText={text => {
                  let newAdvice = this.state.advice;
                  newAdvice[index] = text;
                  this.setState({ advice: newAdvice });
                }}
              />
            ))}
          </View>
          <Button onPress={this.sendFinalData} title="Send Data" />
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
