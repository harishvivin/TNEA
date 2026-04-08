const express = require('express');
const College = require('../models/College');

const router = express.Router();

// GET /api/colleges/districts - get all districts
router.get('/districts', async (req, res) => {
  try {
     const districts = await College.distinct('district');
     res.json(districts.sort());
  } catch (err) {
    res.status(500).json({ error: 'Server error '});
  }
});

// GET /api/colleges with query filters
router.get('/', async (req, res) => {
  try {
    const { cutoff, district, type } = req.query;

    let query = {};

    // For cutoff, we want colleges whose historical cutoff is less than or equal to the student's
    // so they are "eligible" to apply
    if (cutoff) {
      query.previousYearCutoff = { $lte: Number(cutoff) };
    }

    if (district && district !== 'All') {
      query.district = district;
    }

    if (type && type !== 'All') {
      query.type = type;
    }

    const colleges = await College.find(query).sort({ previousYearCutoff: -1 });
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
