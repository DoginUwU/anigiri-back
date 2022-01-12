import { Request } from "express";
import { IPost, IPostEngine } from "../@types/post";
import { ISearch, ISearchEngine } from "../@types/search";
import { getDirectories } from "../utils/directory";

class Engines {
    engines: Array<Engine> = [];

    constructor() {
        getDirectories(__dirname).then((directories) => {
            directories.forEach(async (directory) => {
                const { default: engine } = await import(`./${directory}`);
                this.add(new engine());
            });
        })
    }

    add(engine: Engine): void {
        this.engines.push(engine);
    }

    get(name: string): Engine | undefined {
        return this.engines.find((engine) => engine.name === name.toLowerCase());
    }

    getAll(): Array<Engine> {
        return this.engines;
    }
}

abstract class Engine {
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }

  abstract searchByTags(options: ISearchEngine): Promise<ISearch>;
  abstract getPostById(options: IPostEngine): Promise<IPost>;
}

const engines = new Engines();

export { Engines, Engine as default, engines };