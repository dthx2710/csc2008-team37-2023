const { spawn } = require('child_process');

module.exports = async (req, res) => {
  // Run Python script
  console.log('run python script')
  const pyProg = spawn('python', ['./scripts/naive_bayes.py']);

  // Handle data received from Python script
  let dataToSend = '';
  pyProg.stdout.on('data', function(data) {
    console.log(data.toString());
    dataToSend += data.toString();
  });

  // Handle errors
  pyProg.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
    res.status(500).send({ error: data.toString() });
  });

  // When Python script finishes
  pyProg.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    res.status(200).send({ data: dataToSend });
  });
};
