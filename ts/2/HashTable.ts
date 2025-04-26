class HashTableSpec<K, V> {
  private buckets: Array<Array<{key: K; value: V}>>;
  private count: number;

  constructor(size: number = 32) {
    this.buckets = new Array(size).fill(null).map(() => []);
    this.count = 0;
  }

  private _hash(key: K): number {
    let hash = 0;
    const strKey = String(key);
    for (let i = 0; i < strKey.length; i++) {
      hash = (hash * 31 + strKey.charCodeAt(i)) % this.buckets.length;
    }
    return hash;
  }

  protected insert(key: K, value: V): this {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    const existingItem = bucket.find((item) => item.key === key);

    if (existingItem) {
      existingItem.value = value;
    } else {
      bucket.push({key, value});
      this.count++;
    }
    return this;
  }

  protected get(key: K): V | undefined {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    const item = bucket.find((item) => item.key === key);
    return item?.value;
  }

  protected remove(key: K): boolean {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    const itemIndex = bucket.findIndex((item) => item.key === key);

    if (itemIndex >= 0) {
      bucket.splice(itemIndex, 1);
      this.count--;
      return true;
    }
    return false;
  }

  protected update(key: K, newValue: V): boolean {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    const item = bucket.find((item) => item.key === key);

    if (item) {
      item.value = newValue;
      return true;
    }
    return false;
  }

  public size(): number {
    return this.count;
  }
}
