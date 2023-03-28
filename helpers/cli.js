import parseArgs from "minimist";
import { processDataConfig } from "../constants/processInfo.js";
import os from "os";

const config = {
  alias: {
    p: "puerto",
    m: "modo",
    d: "deploy",
  },
  default: {
    puerto: 8080,
    modo: "fork",
    deploy: "development",
  },
};

const { puerto, modo, deploy } = parseArgs(process.argv.slice(2), config);

const argvs = process.argv.slice(2);
const hasArgvs = Boolean(argvs.length);
const cpus = os.cpus().length;

const processData = {
  argvs: hasArgvs ? argvs : "No se ingresaron argumentos",
  platform: process.platform,
  version: process.version,
  memoryUsage: process.memoryUsage().rss,
  execPath: process.execPath,
  pid: process.pid,
  cwd: process.cwd().split("\\").pop(),
  cpus,
};

const getProcessData = () => {
  return processDataConfig.map((data) => {
    return {
      title: data.legend,
      info: processData[data.name],
    };
  });
};

export { puerto, modo, deploy, cpus, getProcessData };
