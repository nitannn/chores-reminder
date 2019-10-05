'use strict';
const moment = require('moment');
const { sendEmailNotif } = require('./lib/emailNotif');

module.exports.handler = async (event) => {
  const refWeekNumber= moment(process.env.refDate, 'YYYY-MM-DD').week();
  const weekNumber = moment().week();
  const weekStart = moment().format('MMM D YYYY');
  const weekEnd = moment().add(6, 'days').format('MMM D YYYY');

  const assignees = process.env.assignees.split(',').map(s => s.trim())
  const chores = Array(parseInt(process.env.choresCount)).fill('').map((_, index) => {
    return {
      name: process.env[`chores${index+1}Name`],
      steps: process.env[`chores${index+1}Steps`].split(',').map(s => s.trim())
    }
  });
  const offset = Math.abs(weekNumber - refWeekNumber);
  const assignment = chores.map((_, index) => {
    const assigneeIndex = (index + offset) % assignees.length;
    return assignees[assigneeIndex];
  })

  await sendEmailNotif(
    process.env.emailSender,
    process.env.emailRecipients.split(',').map(e => e.trim()),
    process.env.title,
    weekStart,
    weekEnd,
    chores,
    assignment
  );
};
