type Stack = {
  [key: string]: Array<{
    resolve: (value: void | PromiseLike<void>) => void;
    reject: (reason?: any) => void;
  }>;
};

export class RequestStack {
  stack: Stack = {};

  checkIfExists(key: string): boolean {
    return Object.keys(this.stack).includes(key);
  }

  getRequest(key: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.stack[key].push({ resolve, reject });
    });
  }

  addNewEntry(key: string): void {
    this.stack[key] = [];

    setTimeout(() => this.removeEntry(key), 8000);
  }

  removeEntry(key: string): void {
    if (this.stack[key]) {
      const entriesCount = this.stack[key].length;
      this.stack[key].forEach(entry => entry.reject());

      if (entriesCount > 1) {
        console.info(`${entriesCount} entries removed due to response timeout`);
      }

      delete this.stack[key];
    }
  }

  resolveAwaitingEntries(key: string, response: any): void {
    if (this.stack[key]) {
      if (this.stack[key]?.length) {
        console.info(`resolving ${this.stack[key]?.length} "${key}" entry with cached response`);
        this.stack[key].forEach(entry => entry.resolve(response));
      }

      delete this.stack[key];
    }
  }

  rejectAwaitingEntries(key: string): void {
    if (this.stack[key]) {
      if (this.stack[key]?.length) {
        console.info(`rejecting ${this.stack[key]?.length} "${key}" entry with cached response`);
        this.stack[key].forEach(entry => entry.reject());
      }

      delete this.stack[key];
    }
  }
}
