import { readFile, writeFile } from "fs/promises";
import {
  normalizeMessageReceived,
  denormalizeMessages,
} from "../helpers/index.js";
import logger from "../loggerConfig.js";

export class FileContainer {
  constructor(path) {
    this.data = [];
    this.path = path;
    this.compression;
  }

  async readFile() {
    try {
      const dataJSON = await readFile(this.path);
      const data = await JSON.parse(dataJSON);

      if (!Object.keys(data).length) {
        this.data = [];
      } else {
        const denormalizedData = denormalizeMessages(data).mensajes;

        this.data = denormalizedData.map((data) => {
          const fyh = this.convertDate(data.date);
          return {
            ...data,
            fyh,
          };
        });
      }

      return this.data;
    } catch (err) {
      logger.error(`error: ${err}`);
      throw new Error(err);
    }
  }

  convertDate(date) {
    const today = new Date();
    const messageDate = new Date(date);
    const messageDay = messageDate.getDate();
    const messageMonth = messageDate.getMonth();
    const messageYear = messageDate.getFullYear();
    const messageHour = messageDate.getHours();
    const messageMin = messageDate.getMinutes();
    const actualDay = today.getDate();
    const actualMonth = today.getMonth();

    const isToday = messageDay === actualDay && messageMonth === actualMonth;
    const isThisWeek =
      messageMonth === actualMonth && actualDay - messageDay <= 7;

    let fyh;

    if (isToday) fyh = `Hoy ${messageHour}:${messageMin}`;
    else if (isThisWeek) {
      const dayNumber = messageDate.getDay();
      const days = {
        0: "Domingo",
        1: "Lunes",
        2: "Martes",
        3: "Miércoles",
        4: "Jueves",
        5: "Viernes",
        6: "Sábado",
      };
      fyh = `${days[dayNumber]} ${messageHour}:${messageMin}`;
    } else
      fyh = `${messageDay}/${messageMonth}/${messageYear} ${messageHour}:${messageMin}`;

    return fyh;
  }

  getId() {
    try {
      let id;
      if (!this.data.length) {
        id = 1;
      } else {
        const ids = this.data.map((d) => d.id);
        id = Math.max(...ids) + 1;
      }
      return id;
    } catch (err) {
      logger.error(`error: ${err}`);
      throw new Error(err);
    }
  }

  async saveOnFile(data) {
    // data debe ser un array
    // obtener id, date y fyh para los nuevos mensajes
    const firstIdOfSet = this.getId();
    const newMessages = data.map((d, index) => {
      const id = firstIdOfSet + index;
      const date = new Date();
      return {
        ...d,
        id,
        date,
      };
    });
    const allMessages = [...this.data, ...newMessages];
    const normalizedMessages = await normalizeMessageReceived(allMessages);

    this.setCompressionPercentage(this.data, normalizedMessages);

    try {
      writeFile(this.path, JSON.stringify(normalizedMessages, null, 2)).then(
        () => {
          console.log("Save on File: OK");
          return this.compression;
        }
      );
    } catch (err) {
      logger.error(`error: ${err}`);
      throw new Error(
        "Se produjo un error al intentar guardar el archivo. " + err
      );
    }
  }

  setCompressionPercentage(original, normalized) {
    const originalLength = JSON.stringify(original).length;
    const normalizerLength = JSON.stringify(normalized).length;

    const compression = 100 - (normalizerLength * 100) / originalLength;

    this.compression = compression;
  }

  getCompressionPercentage() {
    return this.compression;
  }
}
