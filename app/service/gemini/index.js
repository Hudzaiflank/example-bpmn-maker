const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");
const config = require("../../../config/environment-config");
config.loadEnvironmentVariables();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const filePath = path.resolve(__dirname, "../../../data/pizza-bpmn.xml");

// Read the file synchronously
const fileContent = fs.readFileSync(filePath, "utf-8");

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
        "You are a BPMN model generator. Generate a BPMN 2.0 model using XML (bpmn-js) based on the given prompt. Just give the XML script in a single line. Without ```xml\n```'. And also, you must make sure the BPMN XML is well Supported bpmn-js and also it is tidy. The Element is not clashing with each other" +
        `Here is an example you must use to make a decision: ${fileContent} The XML i gave you is the Bare Minimum for tidiness and well supported by bpmn-js. You must follow the same pattern and make sure the XML is well supported by bpmn-js`,
});

const sendMessage = async (req) => {
    const message = req.body.message;

    const parts = [{ text: `input:${message}` }];

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig: {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 16384,
            responseMimeType: "text/plain",
        },
    });

    return result.response.text();
};

module.exports = { sendMessage };
