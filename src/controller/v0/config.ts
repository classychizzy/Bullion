import { generateSecret } from "../../utils/utilFunctions";

const accessKey = generateSecret(64);
const refreshKey = generateSecret(64);

export const config = {
    "jwt": {
      "accessKey": accessKey,
      "refreshKey": refreshKey
    }
  }
