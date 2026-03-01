const fs = require('fs')

// >~~~~~~~~~~ Owner Setting ~~~~~~~~~~~< //
global.botname = process.env.BOT_NAME || "D.Kumail Bug"
global.autoReact = process.env.AUTO_REACT !== "false"
global.antiDelete = process.env.ANTI_DELETE !== "false"
global.autostatusview = process.env.AUTO_STATUS_VIEW !== "false"
global.autoRecording = process.env.AUTO_RECORDING !== "false"
global.autoTyping = process.env.AUTO_TYPING !== "false"
global.prefa = (process.env.HANDLERS || '').split(',').filter(Boolean).length ? process.env.HANDLERS.split(',') : ['','!','.',',']
// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //
let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
