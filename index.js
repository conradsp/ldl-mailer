const SMTPServer = require('smtp-server').SMTPServer
const parser = require('mailparser').simpleParser
const { Client } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

const client = new Client()

client.on('qr', (qr) => {
  qrcode.generate(qr, {small: true})
})

client.on('ready', () => {
    console.log('Client is ready!')
    client.sendMessage("<WhatsApp Number>@c.us", 'Med Air Monitor Ready')
})

client.initialize()

const server = new SMTPServer({
  onData(stream, session, callback) {
    parser(stream, {}, (err, parsed) => {
      if (err)
        console.log('Error:' , err)
      
      console.log(parsed)
      client.sendMessage("<WhatsApp number>@c.us", 'ALERT ON MED AIR MONITOR')
      stream.on('end', callback)
    })
    
  },
  disabledCommands: ['AUTH']
});

server.listen(587)
//server.listen(587, '192.168.11.239')
