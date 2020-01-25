const voicePrescription = require('../src/voicePrescription')

const createPDF = require('../src/pdfGenerator')

module.exports = app => {

    app.get('/', (req, res) => {
        res.send({'HELLO': 'FROM JARVIS'})
    });

    app.post('/api/df_text_query', async (req, res) => {

        let responses = await voicePrescription.textQuery(req.body.text, req.body.parameters);
        res.json(responses[0].queryResult)
    });

    app.post('/api/df_event_query', async (req, res) => {
        let responses = await voicePrescription.eventQuery(req.body.event, req.body.parameters);
        res.json(responses[0].queryResult)
    });

    app.post('/api/finalData', async (req, res) => {
            const now = new Date();

    let currentdate = "" + now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
        const data = {
            title: "Medical Report",
            doctor: "Dr. Deep Maheshwari",
            hospital: "Apollo Hospital",
            doctorNumber: "6302734859",
            date: currentdate,
            name: "Tapish",
            age: 19,
            sex: "male",
            symptoms: ["Dry Cough for last 3 days ", "fever ", "Running Nose"],
            diagnosis: ["Acute Bronchitis"],
            prescription: [{ name: "Paracetamol", Strength: "500 mg", Dosage: "once a day for 3 days" },
            { name: "Dolo", Strength: "650 mg", Dosage: "once a day for 3 days" }
            ],
            advice: ["Drink Warm Water ", "Dont eat grapes"]
        }


        await createPDF.createPDF(data)
        res.send("Successfull")
    })
}