// eslint-disable-next-line import/no-extraneous-dependencies
const SES = require('aws-sdk/clients/ses');

const ses = new SES({
  region: 'us-east-1',
});

const sendEmail = async ({
  to, from, subject, body,
}) => {
  console.log('i am called');
  const params = {
    Source: from,
    Destination: {
      ToAddresses: to,
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: body,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
  };

  return new Promise((resolve, reject) => {
    console.log('sending email');
    ses.sendEmail(params, (err, data) => {
      if (err) {
        console.log('err');
        console.error(err, err.stack);
        reject(err);
      }
      console.log('data');
      console.log(data);
      resolve(data);
    });
  });
};

module.exports = {
  sendEmail,
}