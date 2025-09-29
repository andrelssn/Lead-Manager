const { createObjectCsvStringifier } = require('csv-writer');

async function createCsv(data){
  const csvStringifier = createObjectCsvStringifier({
    header: [
      {id: 'id', title: 'ID'},
      {id: 'nome', title: 'Name'},
      {id: 'email', title: 'Email'},
      {id: 'telefone', title: 'Phone'},
      {id: 'cargo', title: 'Job'},
      {id: 'data_nascimento', title: 'Birth Date'},
      {id: 'mensagem', title: 'Message'},
      {id: 'utm_source', title: 'UTM Source'},
      {id: 'utm_medium', title: 'UTM Medium'},
      {id: 'utm_campaign', title: 'UTM Campaign'},
      {id: 'gclid', title: 'GCLID'},
      {id: 'fbclid', title: 'FBCLID'},
      {id: 'createdAt', title: 'Created At'}
    ]
  });

  const header = csvStringifier.getHeaderString();
  const records = csvStringifier.stringifyRecords(data.map(d => ({
    ...d,
    data_nascimento: d.data_nascimento ? new Date(d.data_nascimento).toISOString().split('T')[0] : '',
    createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : ''
  })));
  return header + records;
}

module.exports = { createCsv };
