const express = require('express');
const cors = require('cors'); // Импортируйте пакет cors
const path = require('path');

const app = express();

app.use(express.static('public'));

// Получение абсолютного пути к текущей директории
const rootPath = path.resolve(__dirname, '..'); // '..' переходит на уровень выше, в папку 'BlackJackReact'

app.use(cors());
// Использование относительных путей от текущей директории
app.use(express.static(path.join(rootPath, 'public', 'static')));
app.use(express.static(path.join(rootPath, 'public', 'images')));

//console.log(__dirname);
// Маршрут для отправки HTML
app.get('/getHtml', (req, res) => {
  // Здесь вы можете прочитать ваш HTML файл и отправить его как ответ
  res.sendFile(__dirname + '/public/index.html');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Сервер Express запущен на порту ${port}`);
});
