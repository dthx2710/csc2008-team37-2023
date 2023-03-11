const { spawn } = require("child_process");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

module.exports = async (req, res) => {
  try {
    const { script } = req.query;
    const { method } = req;
    // test data
    let data = {
      Age: 35,
      Gender: 1,
      "Air Pollution": 2,
      "Alcohol use": 2,
      "Dust Allergy": 3,
      "OccuPational Hazards": 3,
      "Genetic Risk": 2,
      "chronic Lung Disease": 1,
      "Balanced Diet": 4,
      Obesity: 2,
      Smoking: 1,
      "Passive Smoker": 1,
      "Chest Pain": 3,
      "Coughing of Blood": 2,
      Fatigue: 2,
      "Weight Loss": 1,
      "Shortness of Breath": 2,
      Wheezing: 2,
      "Swallowing Difficulty": 3,
      "Clubbing of Finger Nails": 1,
      "Frequent Cold": 2,
      "Dry Cough": 2,
      Snoring: 1,
    };

    if (method === "POST") {
      data = req.body;
      // data = JSON.parse(req.body);
      data = {
        Age: data.age,
        Gender: data.gender,
        "Air Pollution": data.airPollution,
        "Alcohol use": data.alcoholUse,
        "Dust Allergy": data.dustAllergy,
        "OccuPational Hazards": data.occupationalHazards,
        "Genetic Risk": data.geneticRisk,
        "chronic Lung Disease": data.chronicLungDisease,
        "Balanced Diet": data.balancedDiet,
        Obesity: data.obesity,
        Smoking: data.activeSmoking,
        "Passive Smoker": data.passiveSmoking,
        "Chest Pain": data.chestPain,
        "Coughing of Blood": data.coughingOfBlood,
        Fatigue: data.fatigue,
        "Weight Loss": data.weightLoss,
        "Shortness of Breath": data.shortnessOfBreath,
        Wheezing: data.wheezing,
        "Swallowing Difficulty": data.swallowingDifficulty,
        "Clubbing of Finger Nails": data.clubbingOfFingernails,
        "Frequent Cold": data.frequentCold,
        "Dry Cough": data.dryCough,
        Snoring: data.snoring,
      };
      console.log(data);
    }

    let venv_keyword = process.env.OS_VENV == "LINUX" ? "bin" : "Scripts";
    let python_keyword = process.env.OS_VENV == "LINUX" ? "python3" : "python";
    let source_keyword = process.env.OS_VENV == "LINUX" ? "source " : "";
    // Activate virtual environment
    // const activateEnv = path.join(__dirname, './scripts/venv/Scripts/activate');
    const cwd = process.cwd();
    const activateEnv =
      source_keyword +
      path.resolve(cwd, "scripts", "venv", venv_keyword, "activate");
    console.log(activateEnv);
    const { stdout } = await exec(activateEnv);

    // // Install required packages
    // const pipInstall = spawn('pip', ['install', '-r', './scripts/requirements.txt'], { shell: true, stdio: 'inherit' });
    // await new Promise((resolve, reject) => {
    //   pipInstall.on('error', (err) => {
    //     console.error(`Error installing packages: ${err}`);
    //     reject(err);
    //   });

    //   pipInstall.on('close', (code) => {
    //     if (code !== 0) {
    //       console.error(`Package installation failed with code ${code}`);
    //       reject(`Package installation failed with code ${code}`);
    //       return;
    //     }

    //     console.log('Packages installed successfully');
    //     resolve();
    //   });
    // });

    // Run Python script
    const pythonScript = spawn(
      `./scripts/venv/${venv_keyword}/${python_keyword}`,
      [`./scripts/${script}.py`]
    );

    pythonScript.on("error", (err) => {
      console.error(`Error running Python script: ${err}`);
    });
    let output = "";
    let error = "";
    pythonScript.stdin.write(JSON.stringify(data));
    pythonScript.stdin.end();

    pythonScript.stdout.on("data", (data) => {
      output += data.toString();
    });

    pythonScript.stderr.on("data", (data) => {
      console.error(`Error running Python script: ${data}`);
      error += data.toString();
    });

    pythonScript.on("close", (code) => {
      if (code !== 0) {
        console.error(
          `ML script exited with code ${code}. Error output: ${error}`
        );
        return;
      }
      console.log("ML script completed successfully");
      res.status(200).json({ result: output });
    });
  } catch (err) {
    console.error(`Error running ML script: ${err}`);
    res.status(500).json({ error: `Error running ML script: ${err}` });
  }
};
