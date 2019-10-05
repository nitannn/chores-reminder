const { sendEmail } = require('./awsSES');

const sendEmailNotif = async (emailSender, emailRecipients, title, dateFrom, dateTo, chores, assignment) => {
  const generateEmailTemplate = () => {
    return `
    <h1>${title}</h1>
    <h3>${dateFrom} to ${dateTo}:</h3>
    <p>
      ${chores.map((chore, index) => {
        return `
          <b>${chore.name}: </b>${assignment[index]}
        `;
      }).join('<br />')}
    </p>
    <hr />
    ${chores.map((chore) => {
      return `
        <h3>${chore.name}</h3>
        <ol>
          ${chore.steps.map((step) => `<li>${step}</li>`).join('')}
        </ol>
      `;
    }).join('')}
    `;
  }

  const emailTemplate = generateEmailTemplate();
  console.log(emailTemplate);
  return sendEmail({
    to: emailRecipients,
    from: emailSender,
    subject: title,
    body: emailTemplate,
  });
}

module.exports = {
  sendEmailNotif,
}
