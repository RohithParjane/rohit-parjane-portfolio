// Returns only the visitor's approximate country, region and city from Vercel's edge headers.
// No IP address is read or stored.
module.exports = (req, res) => {
  const h = req.headers || {};
  const dec = (v) => { try { return decodeURIComponent(v || ''); } catch (e) { return v || ''; } };
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify({
    country: (h['x-vercel-ip-country'] || '').slice(0, 2),
    region: dec(h['x-vercel-ip-country-region']).slice(0, 40),
    city: dec(h['x-vercel-ip-city']).slice(0, 60)
  }));
};
