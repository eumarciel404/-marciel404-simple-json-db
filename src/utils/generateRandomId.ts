interface Options {
  length?: number;
  usagesCharacters?: Array<"upper" | "lower" | "number">;
  prefix?: string;
  suffix?: string;
}

export class ConfigRandomId {
  public length: number;
  private charactersUpperCase: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private charactersLowerCase: string = "abcdefghijklmnopqrstuvwxyz";
  private numbers: string = "1234567890";
  public charactersUsage: string = "";
  public prefix: string = "";
  public suffix: string = "";

  constructor(options?: Options) {
    this.length = Math.max(1, Math.floor(options?.length ?? 20));
    this.prefix = options?.prefix || "";
    this.suffix = options?.suffix || "";
    const usage = new Set(options?.usagesCharacters);

    if (usage.size === 0) {
      this.charactersUsage =
        this.charactersLowerCase + this.charactersUpperCase + this.numbers;
    } else {
      if (usage.has("lower")) this.charactersUsage += this.charactersLowerCase;
      if (usage.has("upper")) this.charactersUsage += this.charactersUpperCase;
      if (usage.has("number")) this.charactersUsage += this.numbers;
    }
    if (!this.charactersUsage.length) {
      this.charactersUsage =
        this.charactersLowerCase + this.charactersUpperCase + this.numbers;
    }
  }
}

class GenerateRandomId {
  config: ConfigRandomId;

  constructor(config: ConfigRandomId) {
    this.config = config;
  }

  /**
   *
   * @returns object
   */
  generateRandomId() {
    let randomString = this.config.prefix;
    for (let i = 0; i < this.config.length; i++) {
      randomString +=
        this.config.charactersUsage[
          Math.floor(Math.random() * this.config.charactersUsage.length)
        ];
    }

    return randomString + this.config.suffix;
  }
}

export function createRandomId(config = new ConfigRandomId()) {
  return new GenerateRandomId(config).generateRandomId();
}
