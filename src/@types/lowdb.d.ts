declare module 'lowdb/adapters/FileSync' {
  import { AdapterSync } from 'lowdb';
  class FileSync<T> implements AdapterSync<T> {
    constructor(filename: string, options?: any);
    read(): T | null;
    write(data: T): void;
  }
  export = FileSync;
}

declare module 'lowdb';