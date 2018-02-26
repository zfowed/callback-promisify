# 异步回调函数转换为AsyncFunction

## 手册

> callbackPromisify(`func`, `argsMark = 0`, `isFirstError = true`, `self`)

将需要回调的异步函数转成AsyncFunction，可以使用`await`。

### 参数

| Name         | Type         | Description                                      |
| :----------- | :----------- | :----------------------------------------------- |
| func         | function     | 需要转换的函数                                   |
| argsMark     | number/array | 如果为数字就是函数参数长度，如果是数组就是`keys` |
| isFirstError | boolean      | 对调函数中第一个参数是否为错误对象               |
| self         | any          | 调用转换的函数时`this`的指向                     |

## npm安装

```jsvascript
npm install callback-promisify
```

## 简单例子

原始function

```jsvascript
const fs = require('fs');

// 获取文件夹下的所有文件
fs.readdir('/', function(error, files) {
    console.log(files)
    console.log(error);
});
```

转换为AsyncFunction

```jsvascript
const fs = require('fs');
const callbackPromisify = require('callback-promisify');

// 获取文件夹下的所有文件
const readdirSync = callbackPromisify(fs.readdir, 1, true, fs);

readdirSync('/').then(function (files) {
    console.log(files);
}, function (error) {
    console.log(error);
})；

// 使用`await`
const files = await readdirSync('/');
```
