const os = require("os");
const fs = require("fs");
const EKKO_GLOBAL_DIRECTORY = os.homedir() + "/.ekko";
const EKKO_ENVIRONMENT_PATH = EKKO_GLOBAL_DIRECTORY + "/.env";


const createEkkoEnvironment = (endpoint, secret, s3Name) => {
  const API_ENDPOINT = endpoint;
  const SECRET = secret;
  const BUCKET_NAME = s3Name;

  // sample content:
  const CONTENT = `API_ENDPOINT=${API_ENDPOINT}\nSECRET=${SECRET}\nBUCKET_NAME=${BUCKET_NAME}\n`;

  // create .ekko if it does not already exist
  if (!fs.existsSync(EKKO_GLOBAL_DIRECTORY)) {
    try {
      fs.mkdirSync(EKKO_GLOBAL_DIRECTORY);
      console.log("Ekko global directory created");
    } catch (err) {
      throw err;
    }
  }

  // create or override .env file with content passed in
  try {
    fs.writeFileSync(EKKO_ENVIRONMENT_PATH, CONTENT);
    console.log(
      "Ekko API endpoint, secret key and S3 bucket name successfully written to ekko environment"
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = createEkkoEnvironment;
