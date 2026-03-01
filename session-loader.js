const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function loadSession() {
  const SESSION = process.env.SESSION;
  const SESSION_URL = process.env.SESSION_URL;

  console.log('[D.Kumail Bug] Session Loader started');
  console.log('[D.Kumail Bug] SESSION env:', SESSION ? SESSION.substring(0, 15) + '...' : 'NOT SET');
  console.log('[D.Kumail Bug] SESSION_URL env:', SESSION_URL || 'NOT SET');

  if (!SESSION || !SESSION_URL) {
    console.log('[D.Kumail Bug] No SESSION or SESSION_URL env var found, using local auth');
    return;
  }

  console.log('[D.Kumail Bug] Loading session from website...');

  try {
    const url = `${SESSION_URL.replace(/\/$/, '')}/api/fetch-session?id=${encodeURIComponent(SESSION)}`;
    console.log('[D.Kumail Bug] Fetching:', url);
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

      console.log('[D.Kumail Bug] ✅ Session loaded and saved to session/creds.json');
    } else {
      console.log('[D.Kumail Bug] ❌ Invalid session data received');
      console.log('[D.Kumail Bug] Response keys:', Object.keys(response.data || {}));
      if (response.data && response.data.error) {
        console.log('[D.Kumail Bug] Error:', response.data.error);
      }
    }
  } catch (error) {
    console.error('[D.Kumail Bug] ❌ Failed to load session:', error.message);
    if (error.response) {
      console.error('[D.Kumail Bug] Status:', error.response.status);
      console.error('[D.Kumail Bug] Response:', JSON.stringify(error.response.data || {}).substring(0, 300));
    }
  }
}

module.exports = { loadSession };
