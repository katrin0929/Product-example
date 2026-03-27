const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

class Store {
  constructor(fileName) {
    this.filePath = path.join(DATA_DIR, fileName);
  }

  readAll() {
    try {
      const raw = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  writeAll(data) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  findById(id) {
    return this.readAll().find((item) => item.id === id);
  }

  findBy(key, value) {
    return this.readAll().find((item) => item[key] === value);
  }

  filterBy(key, value) {
    return this.readAll().filter((item) => item[key] === value);
  }

  insert(item) {
    const data = this.readAll();
    data.push(item);
    this.writeAll(data);
    return item;
  }

  update(id, partial) {
    const data = this.readAll();
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) return null;
    Object.assign(data[index], partial);
    this.writeAll(data);
    return data[index];
  }

  remove(id) {
    const data = this.readAll();
    const filtered = data.filter((item) => item.id !== id);
    if (filtered.length === data.length) return false;
    this.writeAll(filtered);
    return true;
  }
}

module.exports = Store;
