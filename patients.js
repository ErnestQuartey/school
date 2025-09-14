const express = require('express'); const prisma = require('../lib/prisma'); const { middleware } = require('../lib/auth'); const router = express.Router(); router.use(middleware);
router.get('/', async (req,res)=>{ try{ const patients = await prisma.patient.findMany({ orderBy:{ createdAt:'desc' } }); res.json(patients) }catch(e){ console.error(e); res.status(500).json({message:'err'}) } });
router.post('/', async (req,res)=>{ try{ const { firstName,lastName,phone,dob } = req.body; const created = await prisma.patient.create({ data:{ firstName,lastName, phone, dob: dob?new Date(dob):null, createdById: req.user.id } }); res.status(201).json(created) }catch(e){ console.error(e); res.status(500).json({message:'err'}) } });
module.exports = router;
