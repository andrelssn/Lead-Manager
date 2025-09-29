const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const basicAuth = require('../middleware/basicAuth');
const { createCsv } = require('../utils/exportCsv');

// public create
router.post('/', async (req, res) => {
  try{
    const payload = req.body;
    if(!payload.name || !payload.email) return res.status(400).json({ error: 'Name and email required' });

    const lead = await prisma.lead.create({ data: {
      nome: payload.name,
      email: payload.email,
      telefone: payload.phone || '',
      cargo: payload.role || '',
      data_nascimento: payload.birthDate ? new Date(payload.birthDate) : new Date('1970-01-01'),
      mensagem: payload.message || '',
      utm_source: payload.utm_source,
      utm_medium: payload.utm_medium,
      utm_campaign: payload.utm_campaign,
      utm_term: payload.utm_term,
      utm_content: payload.utm_content,
      gclid: payload.gclid,
      fbclid: payload.fbclid
    }});

    res.status(201).json(lead);
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'Internal error' });
  }
});

// list (protected)
router.get('/', basicAuth, async (req,res)=>{
  const q = req.query.q || '';
  const where = q ? { OR: [ { nome: { contains: q, mode: 'insensitive'} }, { email: { contains: q, mode: 'insensitive' } } ] } : {};
  const leads = await prisma.lead.findMany({ where, orderBy: { createdAt: 'desc' }});
  res.json(leads);
});

// get by id (protected)
router.get('/:id', basicAuth, async (req,res)=>{
  const id = Number(req.params.id);
  const lead = await prisma.lead.findUnique({ where: { id }});
  if(!lead) return res.status(404).json({ error: 'Not found' });
  res.json(lead);
});

// update (protected)
router.put('/:id', basicAuth, async (req,res)=>{
  const id = Number(req.params.id);
  const payload = req.body;
  const lead = await prisma.lead.update({ where: { id }, data: payload }).catch(()=>null);
  if(!lead) return res.status(404).json({ error: 'Not found' });
  res.json(lead);
});

// delete (protected)
router.delete('/:id', basicAuth, async (req,res)=>{
  const id = Number(req.params.id);
  await prisma.lead.delete({ where: { id }}).catch(()=>null);
  res.json({ success: true });
});

// export CSV (protected)
router.get('/export/csv', basicAuth, async (req,res)=>{
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' }});
  const csv = await createCsv(leads);
  res.header('Content-Type', 'text/csv');
  res.attachment('leads.csv');
  res.send(csv);
});

module.exports = router;
