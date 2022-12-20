/*-
MIT License

Copyright (c) 2022 KusaReMKN

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { NextApiRequest, NextApiResponse } from "next";
import { BluetoothSerialPort } from "bluetooth-serial-port";
import { Database } from "sqlite3";

const dbfile = "./visrun.db";
const btSerial = new BluetoothSerialPort();

const findVisrun = () =>
  new Promise<{ addr: string; name: string }>((res, rej) => {
    btSerial.on("found", (addr, name) => {
      if (name.indexOf("VISRUN") !== -1) res({ addr, name });
    });
    btSerial.inquireSync();
    rej(new Error("no Visrun found"));
  });

const findSerialPortChannel = (addr: string) =>
  new Promise<number>((res, rej) =>
    btSerial.findSerialPortChannel(
      addr,
      (chan) => res(chan),
      () => rej(new Error("found no serial port channel"))
    )
  );

const connectVisrun = (addr: string, chan: number) =>
  new Promise<void>((res, rej) => btSerial.connect(addr, chan, res, rej));

const command = (cmd: string) =>
  new Promise<number>(async (res, rej) => {
    const cmds = [...(cmd + "\r")];
    let count = 0;
    for (const c of cmds) {
      const buf = Buffer.from(c, "ascii");
      await new Promise((res) =>
        btSerial.write(buf, ((err: Error | undefined, written: number) =>
          err ? rej(err) : res((count += written))) as (
          err: Error | undefined
        ) => void)
      );
      await new Promise<void>((res) => setTimeout(() => res(), 30));
    }
    res(count);
  });

const execute = (cmd: string) =>
  new Promise<string>(async (res) => {
    const timeout = 500;
    let data = Buffer.from("", "ascii");
    let timerId: NodeJS.Timeout;
    let reading = true;
    const handler = (buf: Buffer) => {
      clearTimeout(timerId);
      timerId = setTimeout(readend, timeout);
      data = Buffer.concat([data, buf]);
    };
    const readend = () => {
      btSerial.off("data", handler);
      reading = false;
    };
    const isReading = () =>
      new Promise<boolean>((res) => setTimeout(() => res(reading)));

    btSerial.on("data", handler);
    await command(cmd);
    timerId = setTimeout(readend, timeout);
    while (await isReading());
    res(data.toString("ascii"));
  });

const unique = (dump: string) => {
  const lines = dump.split("\n");
  let prev = lines.shift();
  const result = [prev];

  for (const line of lines) {
    if (prev !== line) result.push(line);
    prev = line;
  }
  return result.join("\n");
};

const peel = (data: string) => {
  const buf: string[] = [];
  for (const line of data.replace(/\r/g, "").split("\n")) {
    const cols = line.split("\t");
    if (cols.length === 3) buf.push(cols[2]);
  }
  return buf.join("\n");
};

const collect = async (path: string) => {
  const buf: string[] = [];
  const list = await execute(`LIST ${path}`);
  for (const line of list.replace(/\r/g, "").split("\n")) {
    switch (line[0]) {
      case "D":
        buf.push(await collect(path + line.split("\t")[1] + "/"));
        break;
      case "F":
        console.log(path + line.split("\t")[1]);
        buf.push(
          peel(unique(await execute(`DUMP ${path + line.split("\t")[1]}`)))
            .replace(/"/g, "")
            .replace(/[-0-9.]+/g, '"$&"')
        );
        // await execute(`REMV ${path + line.split("\t")[1]}`);
        break;
      default:
        void 0;
    }
  }
  // await execute(`RDIR ${path}`);
  return buf.join("\n");
};

const generateArray = (data: string) => {
  const buf = data.split("\n");
  void buf.pop(); // null line
  const last = buf.pop();
  buf.push(last?.replace(/,$/, "") || "");
  const json = `[${buf.join("")}]`;
  console.log(json);
  return JSON.parse(json);
};

const parseDate = (datetime: string) => {
  const DD = datetime.substring(0, 2);
  const MM = datetime.substring(2, 4);
  const YY = datetime.substring(4, 6);
  const hh = datetime.substring(6, 8);
  const mm = datetime.substring(8, 10);
  const ss = datetime.substring(10, 12);
  const ii = datetime.substring(12, 14);
  return `20${YY}-${MM}-${DD}T${hh}:${mm}:${ss}.${ii}0Z`;
};

const storeData = (data: string[][]) => {
  const db = new Database(dbfile);
  const sql = "INSERT INTO visrun ( datetime, lat, lng ) VALUES ( ?, ?, ? )";
  db.serialize(() => {
    const stmt = db.prepare(sql);
    for (const row of data) {
      stmt.run(...row);
    }
    stmt.finalize();
  });
  db.close();
};

async function main() {
  btSerial.on("failure", (err) => console.log("failure:", err));
  // console.debug("Searching visrun ...");
  const { addr, name } = await findVisrun();
  // console.debug(`found.  (${addr}, ${name})`);
  // console.debug("Searching serial port channel ...");
  const chan = await findSerialPortChannel(addr);
  // console.debug(`found. (${chan})`);
  // console.debug("Connecting ...");
  await connectVisrun(addr, chan);
  // console.debug("done.");
  await execute("ZZZ\r");
  const data = generateArray(await collect("/")).map((elem: string[]) => [
    parseDate(elem[0]),
    elem[1],
    elem[2],
  ]);
  storeData(data);
  await execute("QUIT");
  btSerial.close();
}

let syncing = false;

async function matu() {
    if (!syncing) {
        syncing = true;
        await main();
        syncing = false;
        console.log("lazy");
    } else {
        console.log('liksdafj;lfkdjsal;kjf;lsakjdf;lakj');
    }

}

const matunga = (req: NextApiRequest, res: NextApiResponse) => {

    res.json(syncing ? '同期中' : '同期開始');
    res.end();
    matu();
}
export default matunga;
