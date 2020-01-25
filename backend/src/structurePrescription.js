module.exports = response => {

    const data =  response.parameters.fields

    let prescription = []

    data.medicines.listValue.values.forEach(element => {
        prescription.push({
            name: element.stringValue,
            Strength: '500 mg',
            Dosage: null
        })
    });

    data.frequency.listValue.values.forEach((ele, ind) => {
        console.log(ele)
        prescription[ind].Dosage = ele.stringValue + " a day"
    });
    
    data.duration_phrases.listValue.values.forEach((ele, ind) => {
        prescription[ind].Dosage+= " " + ele.stringValue 
    });

    return {
        name: data.name.stringValue.toUpperCase(),
        age: data.age.structValue.fields.amount.numberValue,
        sex: data.gender.stringValue,
        symptoms: data.symptoms.listValue.values.map(ele => ele.stringValue),
        diagnosis: data.diseases.listValue.values.map(ele => ele.stringValue),
        prescription: prescription,
        advice: null
    }
}