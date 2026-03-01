const { loadSession } = require('./session-loader');
const fs = require('fs');
const path = require('path');
const Module = require('module');

async function main() {
  console.log('╔══════════════════════════════════════╗');
  console.log('║       D.Kumail Bug - Starting        ║');
  console.log('║   Developer: Muhammad Kumail         ║');
  console.log('╚══════════════════════════════════════╝');

  if (process.env.SESSION && process.env.SESSION_URL) {
    await loadSession();
  }

  const sudoNumbers = (process.env.SUDO || '').replace(/[^0-9,]/g, '').split(',').filter(Boolean);
  if (sudoNumbers.length > 0) {
    const ownerPath = path.join(__dirname, 'Usama1', 'owner.json');
    const premiumPath = path.join(__dirname, 'Usama1', 'premium.json');
    fs.writeFileSync(ownerPath, JSON.stringify(sudoNumbers));
    fs.writeFileSync(premiumPath, JSON.stringify(sudoNumbers));
    console.log('[D.Kumail Bug] Owner numbers set:', sudoNumbers);
  }

  const sessionUrl = (process.env.SESSION_URL || '').replace(/\/+$/, '');
  const menuImageUrl = sessionUrl ? `${sessionUrl}/dkumail-bug-menu.jpg` : 'https://i.ibb.co/placeholder/menu.jpg';
  global.menuImage = menuImageUrl;
  console.log('[D.Kumail Bug] Menu image:', menuImageUrl);

  const usama8Path = path.join(__dirname, 'usama8.js');
  if (fs.existsSync(usama8Path)) {
    let code = fs.readFileSync(usama8Path, 'utf8');
    const relPath = '/dkumail-bug-menu.jpg';
    const fullUrl = menuImageUrl;

    function toUniEsc(str) {
      return str.split('').map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('');
    }
    function toHexEsc(str) {
      return str.split('').map(c => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    }

    code = code.split(toUniEsc(relPath)).join(toUniEsc(fullUrl));
    code = code.split(toHexEsc(relPath)).join(toHexEsc(fullUrl));

    const patchedPath = path.join(__dirname, 'usama8_patched.js');
    try {
      fs.writeFileSync(patchedPath, code);
      console.log('[D.Kumail Bug] Patched image URLs in usama8.js');
    } catch (writeErr) {
      console.error('[D.Kumail Bug] Could not write patched file (read-only fs?), using original:', writeErr.message);
      return;
    }

    const origResolve = Module._resolveFilename;
    Module._resolveFilename = function(request, parent, isMain, options) {
      if (request === './usama8' || request === './usama8.js') {
        if (parent && parent.filename && parent.filename.includes(path.basename(__dirname))) {
          return patchedPath;
        }
      }
      return origResolve.call(this, request, parent, isMain, options);
    };
  }

  const baileys = require('@whiskeysockets/baileys');
  const origMakeWASocket = baileys.default || baileys.makeWASocket;
  const patchedMakeWASocket = function(...args) {
    const sock = origMakeWASocket(...args);

    let startupSent = false;
    const origEv = sock.ev;
    const origOn = origEv.on.bind(origEv);

    origOn('connection.update', async (update) => {
      if (update.connection === 'open' && !startupSent) {
        startupSent = true;
        console.log('[D.Kumail Bug] Connected to WhatsApp!');

        try {
          const jid = sock.user.id.replace(/:.*@/, '@');
          const botName = process.env.BOT_NAME || 'D.Kumail Bug';

          const startMsg = `╔══════════════════════════╗\n` +
            `║  *${botName} Started!*  ║\n` +
            `╚══════════════════════════╝\n\n` +
            `✅ *Connected Successfully*\n\n` +
            `👤 *Owner:* ${sudoNumbers.join(', ') || 'Not Set'}\n` +
            `🤖 *Bot:* ${botName}\n` +
            `🔧 *Developer:* Muhammad Kumail\n` +
            `💫 *D.Kumail Network*\n\n` +
            `_Type .menu to see all commands_`;

          await sock.sendMessage(jid, {
            image: { url: menuImageUrl },
            caption: startMsg
          });
          console.log('[D.Kumail Bug] Startup message sent!');
        } catch (err) {
          console.error('[D.Kumail Bug] Failed to send startup message:', err.message);
        }
      }
    });

    return sock;
  };

  if (baileys.default) {
    baileys.default = patchedMakeWASocket;
  }
  if (baileys.makeWASocket) {
    baileys.makeWASocket = patchedMakeWASocket;
  }

  require('./index.js');
}

main().catch(err => {
  console.error('[D.Kumail Bug] Startup error:', err);
  process.exit(1);
});
