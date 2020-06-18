const { program } = require('commander');

program.option('-c, --config <config>', 'provide config yml file');

program.parse(process.argv);

console.log('config location is ' + program.config);




