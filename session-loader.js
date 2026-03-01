const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function loadSession() {
  const SESSION = process.env.SESSION;
  const SESSION_URL = process.env.SESSION_URL;

  if (!SESSION || !SESSION_URL) {
    console.log('[D.Kumail Bug] No SESSION or SESSION_URL env var found, using local auth');
    return;
  }

  console.log('[D.Kumail Bug] Loading session from website...');
  console.log('[D.Kumail Bug] Session ID:', SESSION);

  try {
    const url = `${SESSION_URL.replace(/\/$/, '')}/api/fetch-session?id=${encodeURIComponent(SESSION)}`;
    const response = await axios.get(url, { timeout: 30000 });

    if (response.data && response.data.session && response.data.session.data) {
      const decoded = Buffer.from(response.data.session.data, 'base64').toString('utf8');
      const parsed = JSON.parse(decoded);
      const creds = parsed.creds || parsed;

      const sessionDir = path.join(__dirname, 'session');
      if (!fs.existsSync(sessionDir)) {
        fs.mkdirSync(sessionDir, { recursive: true });
      }

      fs.writeFileSync(
        path.join(sessionDir, 'creds.json'),
        JSON.stringify(creds, null, 2)
      );

      console.log('[D.Kumail Bug] Session loaded successfully!');
    } else {
      console.log('[D.Kumail Bug] Invalid session data received');
      console.log('[D.Kumail Bug] Response:', JSON.stringify(response.data).substring(0, 200));
    }
  } catch (error) {
    console.error('[D.Kumail Bug] Failed to load session:', error.message);
    if (error.response) {
      console.error('[D.Kumail Bug] Status:', error.response.status);
    }
  }
}

module.exports = { loadSession };
