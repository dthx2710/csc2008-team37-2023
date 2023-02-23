const { spawn } = require('child_process');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async (req, res) => {
  try {
    let venv_keyword = process.env.OS_VENV == 'WINDOWS' ? 'Scripts' : 'bin';
    // Activate virtual environment
    // const activateEnv = path.join(__dirname, './scripts/venv/Scripts/activate');
    const activateEnv = path.join(`./scripts/venv/${venv_keyword}/activate`);
    const { stdout } = await exec(activateEnv);

    // Install required packages
    const pipInstall = spawn('pip', ['install', '-r', './scripts/requirements.txt'], { shell: true, stdio: 'inherit' });
    await new Promise((resolve, reject) => {
      pipInstall.on('error', (err) => {
        console.error(`Error installing packages: ${err}`);
        reject(err);
      });

      pipInstall.on('close', (code) => {
        if (code !== 0) {
          console.error(`Package installation failed with code ${code}`);
          reject(`Package installation failed with code ${code}`);
          return;
        }

        console.log('Packages installed successfully');
        resolve();
      });
    });

    // Run Python script
    const pythonScript = spawn(`./scripts/venv/${venv_keyword}/python`, ['./scripts/naive_bayes.py'], {stdio: ['ignore', 'pipe', 'pipe']});
    await new Promise((resolve, reject) => {
      let output = '';
      let error = '';
      pythonScript.on('error', (err) => {
        console.error(`Error running Python script: ${err}`);
        reject(err);
      });

      pythonScript.stdout.on('data', (data) => {
        output += data.toString();
      });

      pythonScript.stderr.on('data', (data) => {
        console.error(`Error running Python script: ${data}`);
        error += data.toString();
        reject(`Error running Python script: ${data}`);
      });

    

      pythonScript.on('close', (code) => {
        if (code !== 0) {
          console.error(`ML script exited with code ${code}. Error output: ${error}`);
          reject(`ML script exited with code ${code}.`);
          return;
        }

        console.log('ML script completed successfully');
        res.status(200).json({ result: output });
        resolve();
      });
    });
  } catch (err) {
    console.error(`Error running ML script: ${err}`);
    res.status(500).json({ error: `Error running ML script: ${err}` });
  }
}