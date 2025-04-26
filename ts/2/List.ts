class ListSpec<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  protected insert(index: number, element: T): this {
    this.items.splice(index, 0, element);
    return this;
  }

  protected removeAt(index: number): T | undefined {
    if (index >= 0 && index < this.items.length) {
      return this.items.splice(index, 1)[0];
    }
    return undefined;
  }

  protected remove(element: T): T | undefined {
    const index = this.items.indexOf(element);
    if (index !== -1) {
      return this.removeAt(index);
    }
    return undefined;
  }

  protected update(index: number, newElement: T): boolean {
    if (index >= 0 && index < this.items.length) {
      this.items[index] = newElement;
      return true;
    }
    return false;
  }

  public find(element: T): number {
    return this.items.indexOf(element);
  }

  public getLength(): number {
    return this.items.length;
  }
}
