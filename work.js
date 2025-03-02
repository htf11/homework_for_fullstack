const http = require('http'); //Подключаем модуль http
const port = 3000;
const server = http.createServer((req, res) => { //Создаем сервер
  res.end('Hello world!'); //Если кто то подключился отвечаем.
}).listen(3000); //Слушаем порт 3000
console.log('Сервер работает на порте ' + port); //Выводим сообщение в консоль