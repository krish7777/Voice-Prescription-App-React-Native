const voicePrescription = require('../src/voicePrescription')

const structurePrescription = require('../src/structurePrescription')

module.exports = app => {

    app.get('/', (req, res) => {
        res.send({'HELLO': 'FROM JARVIS'})
    });

    app.post('/api/df_text_query', async (req, res) => {

        let responses = await voicePrescription.textQuery(req.body.text, req.body.parameters);
        const prescription = await structurePrescription(responses[0].queryResult)
        res.json(prescription)
    });

    app.post('/api/df_event_query', async (req, res) => {
        let responses = await voicePrescription.eventQuery(req.body.event, req.body.parameters);
        res.json(responses[0].queryResult)
    });
}