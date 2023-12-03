import * as fs from "node:fs";
import os from "node:os";
import util from "node:util";
import { JSONPreset } from 'lowdb/node'
import { join } from 'node:path';

const readfile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const writefile = util.promisify(fs.writeFile);

const dataDir = [
  "/usr/share/applications",
  `${os.userInfo().homedir}/.local/share/applications`,
];

const pattern = (path: string) => {
  return [
    path,
    `/usr/share/icons/hicolor/scalable/apps/${path}.svg`,
    `/usr/share/icons/hicolor/48x48/apps/${path}.png`,
    `/usr/share/icons/hicolor/32x32/apps/${path}.png`,
    `/usr/share/icons/hicolor/16x16/apps/${path}.png`,
    `/usr/share/icons/hicolor/128x128/apps/${path}.png`,
    `/usr/share/icons/hicolor/256x256/apps/${path}.png`,
    `/usr/share/icons/hicolor/512x512/apps/${path}.png`,
    `/usr/share/icons/breeze/apps/48/${path}.png`,
    `/usr/share/icons/breeze/apps/48/${path}.svg`,
    `/usr/share/icons/breeze/apps/16/${path}.svg`,
    `/usr/share/icons/breeze/status/16/${path}.svg`,
    `/usr/share/icons/breeze/status/24/${path}.svg`,
    `/usr/share/pixmaps/${path}.svg`,
    `/usr/share/pixmaps/${path}.png`,
    `/usr/share/pixmaps/${path}`,
    `/usr/share/icons/${path}.png`,
    `/usr/share/icons/breeze/actions/16/${path}.svg`,
    `/usr/share/icons/breeze/actions/24/${path}.svg`,
    `/usr/share/icons/breeze/places/16/${path}.svg`,
    `/usr/share/icons/breeze/preferences/16/${path}.svg`,
    `/usr/share/icons/breeze/devices/16/${path}.svg`,
    `/usr/share/icons/breeze/applets/64/${path}.svg`,
    `/usr/share/icons/breeze/preferences/24/${path}.svg`,
    `/usr/share/icons/breeze/preferences/32/${path}.svg`,
    `/usr/share/icons/Adwaita/16x16/legacy/${path}-symbolic.png`,
    `/usr/share/icons/Adwaita/symbolic/legacy/${path}-symbolic.png`,
    `/usr/share/icons/Adwaita/symbolic/legacy/${path}-symbolic.svg`,
    `/usr/share/icons/breeze/actions/symbolic/${path}.svg`,
    `/usr/share/icons/Adwaita/symbolic/legacy/${path}.svg`,
  ];
};

interface Application {
  name: string;
  exec: string;
  terminal: boolean;
  type: string;
  icon: string;

  count: number;
}

const iconCache = new Map<string, string>();
const getIcon = (app: Application) => {
  if (app.icon === "") {
    return null;
  }

  if (iconCache.has(app.icon)) {
    return iconCache.get(app.icon);
  }

  const p = pattern(app.icon);
  for (let i = 0; i < p.length; i++) {
    const item = p[i];
    if (fs.existsSync(item)) {
      const image = "file://" + item;
      iconCache.set(app.icon, image);
      return image;
    }
  }
  return null;
};

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

        app.count = await getAppRunCount(app.name)
        if (existName.has(app.name)) {
          return;
        }

        existName.add(app.name);

        applications.push(app);
      }));
    }),
  );

  return applications;
};


interface RunHistory {
  items: RunItem[],
}

interface RunItem {
  name: string,
  count: number,
}

type Data = {
  appRunHistory: RunHistory
}

const defaultData: Data = {
  appRunHistory: {
    items: []
  }
}



const db = await JSONPreset<Data>(join(await window.launcher.getPath("userData"), "runAppHistory.json"), defaultData)
await db.read()

const addAppRunCount = async (name: string) => {
  const item = db.data.appRunHistory.items.find((item) => item.name === name);
  if (item) {
    item.count += 1;
  } else {
    db.data.appRunHistory.items.push({ name, count: 1 });
  }
  await db.write()
}

const getAppRunCount = async (name: string) => {
  const item = db.data.appRunHistory.items.find((item) => item.name === name);
  if (item) {
    return item.count
  }
  return 0
}

export { type Application, getApplications, getIcon, addAppRunCount };
