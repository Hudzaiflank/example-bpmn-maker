const nodemailer = require('nodemailer');
const Mustache = require('mustache');
const fs = require('fs');
const createDeepLink = require('../branch');
const config = require('../../../config/environment-config');
config.loadEnvironmentVariables();

const formatHumanReadableDate = async (data) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'Desember',
  ];

  if (data.startDate) {
    const day = data.startDate.getDate();
    const month = months[data.startDate.getMonth()];
    const year = data.startDate.getFullYear();

    const formatDate = `${day} ${month} ${year}`;
    data.startDate = formatDate;
  }

  if (data.endDate) {
    const day = data.endDate.getDate();
    const month = months[data.endDate.getMonth()];
    const year = data.endDate.getFullYear();

    const formatDate = `${day} ${month} ${year}`;
    data.endDate = formatDate;
  }

  if (data.invoiceDate) {
    const dateObject = new Date(data.invoiceDate);

    const day = dateObject.getDate();
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();
    const time = data.invoiceDate.slice(-8);

    const formatDate = `${day} ${month} ${year} ${time}`;
    data.invoiceDate = formatDate;
  }

  if (data.dueDate) {
    const dateObject = new Date(data.dueDate);

    const day = dateObject.getDate();
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();
    const time = data.dueDate.slice(-8);

    const formatDate = `${day} ${month} ${year} ${time}`;
    data.dueDate = formatDate;
  }

  if (data.participantsList) {
    data.participantsList.forEach(
      (participant) => {
        const invoiceDate = new Date(participant.Transaction.invoiceDate);
        const formattedDate = `${invoiceDate.getDate()} ${months[invoiceDate.getMonth()]
          } ${invoiceDate.getFullYear()}`;
        participant.Transaction.invoiceDate = formattedDate;
      }
    );
  }

  return data;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_LOGIN,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true,
});

const forgotPassEmail = async (email, data) => {
  try {
    let template = fs.readFileSync('app/views/email/reset-pass.html', 'utf8');
    const branchResponse = await createDeepLink(data);
    const detail = { ...data, branchResponse };

    let message = {
      from: process.env.SMTP_LOGIN,
      to: email,
      subject: 'Reset Password',
      html: Mustache.render(template, detail),
    };

    return await transporter.sendMail(message);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  forgotPassEmail,
  formatHumanReadableDate,
};
