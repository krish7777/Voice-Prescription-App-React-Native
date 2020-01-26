const voicePrescription = require("../src/voicePrescription");

const createPDF = require("../src/pdfGenerator");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send({ HELLO: "FROM JARVIS" });
  });

  app.post("/api/df_text_query", async (req, res) => {
    let responses = await voicePrescription.textQuery(
      req.body.text,
      req.body.parameters
    );
    res.json(responses[0].queryResult);
  });

  app.post("/api/df_event_query", async (req, res) => {
    let responses = await voicePrescription.eventQuery(
      req.body.event,
      req.body.parameters
    );
    res.json(responses[0].queryResult);
  });

  app.post("/api/finalData", async (req, res) => {
    const now = new Date();

    let currentdate =
      "" + now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
    const data = req.body.data;

    await createPDF.createPDF(data);
    res.send("Successfull");
  });
};
