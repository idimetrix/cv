import TelegramBot from "node-telegram-bot-api";
import * as Stream from "stream";

declare global {
  var TELEGRAMS: Record<string, TelegramBot>;
}

export class Telegram {
  constructor(
    private readonly token: string,
    private readonly chat: string
  ) {}

  private get telegram() {
    global.TELEGRAMS = global.TELEGRAMS || {};

    if (global.TELEGRAMS[this.token]) {
      // console.log("TELEGRAM -> getting instance from memory");
    } else {
      // console.log("TELEGRAM -> creating new instance");
    }

    global.TELEGRAMS[this.token] = global.TELEGRAMS[this.token] || new TelegramBot(this.token);

    return global.TELEGRAMS[this.token];
  }

  public async message(
    text: string,
    options?: TelegramBot.SendMessageOptions
  ): Promise<TelegramBot.Message | null> {
    try {
      const message = await this.telegram.sendMessage(this.chat, text, options);

      console.log(`>>>>>>>>>> SUCCESS Telegram:message`, message);

      return message;
    } catch (error) {
      console.error(`>>>>>>>>>> ERROR Telegram:message`, error);
    }

    return null;
  }

  public async document(
    doc: string | Stream | Buffer,
    options?: TelegramBot.SendDocumentOptions | undefined,
    fileOptions?: TelegramBot.FileOptions | undefined
  ): Promise<TelegramBot.Message | null> {
    try {
      const message = await this.telegram.sendDocument(this.chat, doc, options, fileOptions);

      console.log(`>>>>>>>>>> SUCCESS Telegram:document`, message);

      return message;
    } catch (error) {
      console.error(`>>>>>>>>>> ERROR Telegram:document`, error);
    }

    return null;
  }
}
