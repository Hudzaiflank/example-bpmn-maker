const { StatusCodes } = require("http-status-codes");
const { sendMessage } = require("../../../service/gemini");

const chatbot = async (req, res, next) => {
    try {
        const result = await sendMessage(req);

        res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            msg: "Prompt Successfully Generated",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { chatbot };
