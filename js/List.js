class List {
  constructor() {
    this.items = [];
  }

  insert(index, element) {
    this.items.splice(index, 0, element);
    return this;
  }

  removeAt(index) {
    if (index >= 0 && index < this.items.length) {
      return this.items.splice(index, 1)[0];
    }
    return undefined;
  }

  remove(element) {
    const index = this.items.indexOf(element);
    if (index !== -1) {
      return this.removeAt(index);
    }
    return undefined;
  }

  update(index, newElement) {
    if (index >= 0 && index < this.items.length) {
      this.items[index] = newElement;
      return true;
    }
    return false;
  }

  find(element) {
    return this.items.indexOf(element);
  }

  getLength() {
    return this.items.length;
  }
}

const list = new List();
list.insert(0, "a");
list.insert(1, "b");
list.insert(0, "c");
console.log("Длина списка =", list.getLength());

list.remove("a");
console.log("Список после удаления элемента по имени", list.items);
console.log("Поиск номера элемента списка b =", list.find("b"));

list.update(1, "d");
console.log("Список после обновления элемента", list.items);
list.removeAt(0);
console.log("Список после удаления элемента по индексу", list.getLength());
