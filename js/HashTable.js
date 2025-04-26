class HashTable {
  constructor(size = 32) {
    this.buckets = new Array(size).fill(null).map(() => []);
    this.count = 0;
  }

  _hash(key) {
    let hash = 0;
    const strKey = String(key);
    for (let i = 0; i < strKey.length; i++) {
      hash = (hash * 31 + strKey.charCodeAt(i)) % this.buckets.length;
    }
    return hash;
  }

  insert(key, value) {
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

  get(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    const item = bucket.find((item) => item.key === key);
    return item ? item.value : undefined;
  }

  remove(key) {
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

  update(key, newValue) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    const item = bucket.find((item) => item.key === key);

    if (item) {
      item.value = newValue;
      return true;
    }
    return false;
  }

  size() {
    return this.count;
  }
}

const table = new HashTable();
table.insert("name", "Alice");
table.insert("age", 30);
console.log("Вывод таблицы", table);
console.log("Поиск по имени", table.get("name"));

table.update("age", 31);
console.log("Обновление значения текущего элемента", table.get("age")); // 31

table.remove("name");
console.log("Вывод размера после удаления элемента",table.size()); // 1
