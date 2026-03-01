# D.Kumail Bug

<p align="center">
  <img src="https://img.shields.io/badge/D.Kumail%20Bug-v1.0.0-red?style=for-the-badge" alt="version" />
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge" alt="nodejs" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="license" />
</p>

A powerful WhatsApp crash bot with iOS, Android & multi-platform crash methods. Built by Muhammad Kumail (D.Kumail).

## Features

- iOS, Android & multi-platform crash methods
- Call bombing & call creator tools
- Auto typing, auto react, auto status view
- Anti delete — save deleted messages
- One-click Railway deploy
- DKML~ session system support
- Auto reconnect & 24/7 uptime

---

## Get Session ID

<p align="center">
  <a href="https://dk-md.org">
    <img src="https://img.shields.io/badge/Get%20Session-D.Kumail%20Bug-red?style=for-the-badge" alt="session" />
  </a>
</p>

1. Visit the D.Kumail session generator
2. Select **D.Kumail Bug** bot
3. Enter your WhatsApp number with country code
4. Copy the pairing code
5. Open WhatsApp > Settings > Linked Devices > Link a Device
6. Tap "Link with phone number instead"
7. Enter the pairing code
8. You'll receive your session ID on WhatsApp

---

## Deploy

### Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

1. Fork this repo
2. Go to Railway > New Project > Deploy from GitHub
3. Set environment variables (see below)
4. Deploy!

### VPS / Local

```bash
git clone https://github.com/YOUR_USERNAME/DKumail-Bug.git
cd DKumail-Bug
npm install
```

Create environment variables or `.env` file:
```env
SESSION=DKML~your_session_id
SESSION_URL=https://your-session-site.replit.app
SUDO=923001234567
```

Start:
```bash
npm start
```

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SESSION` | - | Session ID (required, e.g. `DKML~a3f8b2c1e9`) |
| `SESSION_URL` | - | Session generator site URL (required) |
| `SUDO` | - | Owner WhatsApp number(s), comma-separated |
| `BOT_NAME` | `D.Kumail Bug` | Bot display name |
| `AUTO_REACT` | `true` | Auto react to messages |
| `ANTI_DELETE` | `true` | Anti-delete messages |
| `AUTO_STATUS_VIEW` | `true` | Auto view statuses |
| `AUTO_RECORDING` | `true` | Show recording status |
| `AUTO_TYPING` | `true` | Show typing status |
| `HANDLERS` | `.,!` | Command prefix(es) |

---

## Commands

| Category | Commands |
|----------|----------|
| Crash Tools | `.crash` `.ios` `.ios2` `.android` `.freeze` `.hang` |
| Call Tools | `.call` `.call-creator` `.offer` `.ring` |
| Message Tools | `.repeat` `.bold` `.tag` `.react` |
| Bot Controls | `.menu` `.ping` `.uptime` `.alive` `.runtime` `.owner` |
| Auto Features | `.autosview-on/off` `.autotyping-on/off` `.autoreact-on/off` |
| Protection | `.antidel-on/off` `.public` `.inspect` |

---

## File Structure

```
DKumail-Bug/
├── start.js
├── index.js
├── usama8.js
├── settings.js
├── session-loader.js
├── Usama1/
│   ├── clone.js
│   ├── myfunc.js
│   ├── storage.js
│   ├── exif.js
│   ├── owner.json
│   └── premium.json
├── package.json
├── railway.json
├── Procfile
└── readme.md
```

---

## Credits

- **Muhammad Kumail (D.Kumail)** — Bot development & customization
- [Baileys](https://github.com/WhiskeySockets/Baileys) — WhatsApp Web API

## License

MIT License — D.Kumail Bug

---

<p align="center">
  <b>D.Kumail Bug</b><br>
  <i>By Muhammad Kumail (D.Kumail)</i>
</p>
