const structJson = require("structjson"),
  dialogflow = require("dialogflow"),
  config = require("../config/config");

const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
};


const sessionClient = new dialogflow.SessionsClient({projectId, credentials});


module.exports = {
    textQuery: async function(text, parameters = {}) {
        let self = module.exports;
        const sessionPath = sessionClient.sessionPath(projectId, sessionId);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: languageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },

    eventQuery: async function(event,  parameters = {}) {
        let self = module.exports;
        let sessionPath = sessionClient.sessionPath(projectId, sessionId);

        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structJson.jsonToStructProto(parameters),
                    languageCode: languageCode,
                },
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = self.handleAction(responses);
        return responses;

    },


    handleAction: function(responses){
        let self = module.exports;
        let queryResult = responses[0].queryResult;

        switch (queryResult.action) {
            case 'demo_reg':
                if (queryResult.allRequiredParamsPresent) {
                    self.saveRegistration(queryResult.parameters.fields);
                }
                break;
        }

        return responses;
    },

    saveRegistration: async function(fields){
        
    }
}