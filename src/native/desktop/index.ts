import * as fs from "node:fs";
import os from "node:os";
import util from "node:util";

const readfile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);

const dataDir = [
  "/usr/share/applications",
  `${os.userInfo().homedir}/.local/share/applications`,
];

interface Application {
  name: string;
  exec: string;
  terminal: boolean;
  type: string;
  icon: string;
}

const getApplications = async () => {
  const applications: Application[] = [];
  const existName = new Set();

  await Promise.all(
    dataDir.map(async (dir) => {
      const files = await readdir(dir);
      return await Promise.all(files.map(async (file) => {
        const f = (await readfile(`${dir}/${file}`)).toString();
        const app = {} as Application;
        let setTerm = false;
        let setName = false;
        let setExec = false;
        let setType = false;
        let setIcon = false;

        f.split("\n").forEach((line) => {
          if (line.startsWith("Name=") && setName === false) {
            app.name = line.split("=")[1];
            setName = true;
          } else if (line.startsWith("Exec=") && setExec === false) {
            app.exec = line.split("=")[1];
            setExec = true;
          } else if (line.startsWith("Terminal=") && setTerm === false) {
            app.terminal = line.split("=")[1] === "true";
            setTerm = true;
          } else if (line.startsWith("Type=") && setType === false) {
            app.type = line.split("=")[1];
            setType = true;
          } else if (line.startsWith("Icon=") && setIcon === false) {
            app.icon = line.split("=")[1];
            setIcon = true;
          }
        });


        if (app.name === undefined || app.exec === undefined) {
          return;
        }
        if (existName.has(app.name)) {
          return
        }

        existName.add(app.name)

        applications.push(app);
      }));
    }),
  );

  return applications;
};

export {
  getApplications,
  type Application
}
