module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    // Lead recebido com sucesso na Vercel
    res.status(200).json({ success: true, received: true });
    return;
  }

  res.status(405).json({ error: 'Method Not Allowed' });
};
