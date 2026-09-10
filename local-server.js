const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Obter o IP local na rede Wi-Fi / Ethernet
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalIP();

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];

  // Rota para salvar leads enviados pelo formulário
  if (req.method === 'POST' && reqPath === '/api/lead') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const lead = JSON.parse(body);
        lead.timestamp = new Date().toLocaleString('pt-BR');
        const leadsFile = path.join(__dirname, 'leads.json');
        let leads = [];
        if (fs.existsSync(leadsFile)) {
          try { leads = JSON.parse(fs.readFileSync(leadsFile, 'utf8')); } catch (e) {}
        }
        leads.push(lead);
        fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Rota especial para conectar o celular facilmente com QR Code
  if (reqPath === '/celular' || reqPath === '/mobile' || reqPath === '/qr') {
    const mobileUrl = `http://${localIP}:${PORT}`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(mobileUrl)}`;
    
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Conectar Celular | Evx Consultoria</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background: #0A0E17;
      color: #FFFFFF;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .card {
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 2.5rem;
      max-width: 480px;
      width: 100%;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    .logo-box {
      margin-bottom: 1.5rem;
    }
    .logo-box img {
      height: 34px;
      margin: 0 auto;
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
    }
    p {
      color: #94A3B8;
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 1.5rem;
    }
    .qr-container {
      background: #FFFFFF;
      padding: 1rem;
      border-radius: 16px;
      display: inline-block;
      margin-bottom: 1.5rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }
    .qr-container img {
      display: block;
      width: 220px;
      height: 220px;
    }
    .url-badge {
      background: #1E293B;
      border: 1px solid #334155;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      font-family: monospace;
      font-size: 1.1rem;
      font-weight: 700;
      color: #10B981;
      display: block;
      margin-bottom: 1.5rem;
      text-decoration: none;
      word-break: break-all;
    }
    .url-badge:hover {
      background: #273549;
    }
    .steps {
      text-align: left;
      background: rgba(255, 255, 255, 0.04);
      padding: 1rem 1.25rem;
      border-radius: 12px;
      font-size: 0.85rem;
      color: #CBD5E1;
      line-height: 1.6;
    }
    .steps ol {
      padding-left: 1.2rem;
    }
    .btn-open {
      display: inline-block;
      margin-top: 1.5rem;
      background: #10B981;
      color: #FFFFFF;
      font-weight: 700;
      padding: 0.85rem 1.5rem;
      border-radius: 10px;
      text-decoration: none;
      font-size: 0.95rem;
    }
    .btn-open:hover {
      background: #059669;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo-box">
      <img src="/assets/images/logo-evx-white.png" alt="Evx Consultoria">
    </div>
    <h1>Abrir no Celular</h1>
    <p>Aponte a câmera do seu celular para o QR Code abaixo para abrir o site instantaneamente:</p>
    
    <div class="qr-container">
      <img src="${qrApiUrl}" alt="QR Code Evx Consultoria">
    </div>

    <a href="${mobileUrl}" class="url-badge" target="_blank">${mobileUrl}</a>

    <div class="steps">
      <ol>
        <li>Certifique-se de que o celular está no <strong>mesmo Wi-Fi</strong> deste computador.</li>
        <li>Aponte a câmera do celular para o código acima.</li>
        <li>Ou abra o navegador no celular e acesse o endereço verde acima.</li>
      </ol>
    </div>

    <a href="/" class="btn-open">Ver Site no Computador →</a>
  </div>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(html);
    return;
  }

  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(__dirname, reqPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('============================================================');
  console.log('            EVX CONSULTORIA - SERVIDOR ATIVO                ');
  console.log('============================================================');
  console.log(`💻 [No Computador] : http://localhost:${PORT}`);
  console.log(`📱 [No Celular]    : http://${localIP}:${PORT}`);
  console.log('------------------------------------------------------------');
  console.log('👉 Certifique-se de que o celular está no mesmo Wi-Fi.');
  console.log(`📷 Para escanear o QR Code, acesse no PC:`);
  console.log(`   http://localhost:${PORT}/celular`);
  console.log('============================================================');
});
