var Cylon = require('cylon');
var path = require('path'); 
var fs = require('fs');

var filename = "log.txt"

Cylon.robot({
  connections: {
    neurosky: { adaptor: 'neurosky', port: 'COM5' }
  },

  devices: {
    headset: { driver: 'neurosky' }
  },

  work: function (my) {
    my.headset.on('attention', function (data) {
      console.log('[ATT]:' + data)

      fs.stat(filename, function(err, stat) {
        if(err == null) {
            fs.appendFile(filename, '[ATT]:' + data + '\n', (err) => {
              if (err) throw err;
              //console.log('The "data to append" was appended to file!');
            });
        } else if(err.code == 'ENOENT') {
            // file does not exist

            var stream = fs.createWriteStream(filename);
            stream.once('open', function(fd) {
              stream.write("[ATT]:" + data + "\n");
              stream.end();
            });
        }
      });      
    })

    my.headset.on('meditation', function (data) {
      console.log('                [MED]:' + data)

      fs.stat(filename, function(err, stat) {
        if(err == null) {
            fs.appendFile(filename, '[MED]:' + data + '\n', (err) => {
              if (err) throw err;
              //console.log('The "data to append" was appended to file!');
            });
        } else if(err.code == 'ENOENT') {
            // file does not exist

            var stream = fs.createWriteStream(filename);
            stream.once('open', function(fd) {
              stream.write("[MED]:" + data + "\n");
              stream.end();
            });
        }
      });
    })

    my.headset.on('eeg', function (data) {
      console.log('                                    [EEG]: ' + data)

      fs.stat(filename, function(err, stat) {
        if(err == null) {
            fs.appendFile(filename, '[EEG]:' + data + '\n', (err) => {
              if (err) throw err;
              //console.log('The "data to append" was appended to file!');
            });
        } else if(err.code == 'ENOENT') {
            // file does not exist

            var stream = fs.createWriteStream(filename);
            stream.once('open', function(fd) {
              stream.write("[EEG]:" + data + "\n");
              stream.end();
            });
        }
      });      
    })
  }
}).start();
