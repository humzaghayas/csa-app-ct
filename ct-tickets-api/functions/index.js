const mc_tickets = require('./ct-routes-ticekets');
const sf_support = require('./ct-csa-api')
exports.tickets = mc_tickets.tickets;

exports.ct_csa_api = sf_support.ct_csa_api;