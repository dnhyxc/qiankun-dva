/* eslint-disable no-async-promise-executor */
const fs = require('fs');
const path = require('path');
const request = require('request');
const compressing = require('compressing');

const url = [];

function _getUrl(data, localFileName) {
  const regx = new RegExp(/((https?):)?\/\/(s\.newscdn\.cn)[-a-zA-Z0-9+/?_.]+(\.js)?\.[a-zA-Z0-9]+/, 'g');

  const result = data.match(regx);


  if (result) {
    const urlFormat = {
      localFileName,
      urls: [],
    };

    const date = new Date().getTime();

    const _result = result.map(v => {
      // console.log('url', v);
      const _url = v;
      const filename = _url.substring(_url.lastIndexOf('/') + 1);
      return {
        url: _url,
        fileName: filename,
        path: `/static/media/media-web/vpc/${filename}?_t=${date}`,
      };
    });
    // 保存URL
    urlFormat.urls = _result;
    url.push(urlFormat);
  }
}

// 遍历文件下的文件
function _fileDisplay(filePath) {
  const files = fs.readdirSync(filePath);
  files.forEach((filename) => {
    const filedir = path.join(filePath, filename);
    const stats = fs.statSync(filedir);
    const isFile = stats.isFile();
    const isDir = stats.isDirectory();
    if (isFile) {
      // console.log(filedir);
      // 读取文件内容
      const content = fs.readFileSync(filedir, 'utf-8');
      _getUrl(content, filedir);
      console.log('-------------getUrl:', filedir);
    }
    if (isDir) {
      // console.log(filedir);
      console.log('文件夹就不管了');
      // fileDisplay(filedir);
    }
  });
  // 拿到了完整的文件
}

// 创建文件夹目录
const dirPath = path.join(__dirname, 'build/vpc');
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
  console.log('文件夹创建成功');
} else {
  console.log('文件夹已存在');
}

/*
* url 网络文件地址
* filename 文件名
* callback 回调函数
*/
function _downloadFile(uri, fileName) {
  const stream = fs.createWriteStream(path.join(dirPath, fileName));
  return new Promise((resolve) => {
    request(uri).pipe(stream).on('close', () => {
      resolve(true);
    }).on('error', (err) => {
      console.log('error: ', err);
      console.error('error: ', uri);
    });
  });
}

function download(urlObj) {
  return new Promise(async resolve => {
    for (let index = 0; index < urlObj.length; index++) {
      const urlSingle = urlObj[index].urls;
      for (let i = 0; i < urlSingle.length; i++) {
        // 获取URL、以及文件名字
        const { url: _url, fileName: filename } = urlSingle[i];
        console.log('start>>>>>>>>>>:', _url);
        // 有些URL不是协议开头的，是//，需要兼容一下
        if (_url.startsWith('http')) {
          await _downloadFile(_url, filename);
        } else {
          await _downloadFile(`https:${_url}`, filename);
        }
        console.log('success<<<<<<<<<<<<<:', index, ':', _url);
      }
    }
    // 下载成功
    resolve(true);
  });
}

function _replace(content, localFileName) {
  // 拿到具体的url对象
  let _content = content;
  const urlsObj = url.filter(v => v.localFileName === localFileName)[0];
  // 可能不存在
  if (!urlsObj) {
    return _content;
  }
  const { urls } = urlsObj;

  urls.map(v => {
    const regx = new RegExp(v.url, 'g');
    _content = _content.replace(regx, v.path);
    return true;
  });
  return _content;
}

function replaceUrl(filePath) {
  const files = fs.readdirSync(filePath);
  files.forEach((filename) => {
    const fullName = path.join(filePath, filename);
    const stats = fs.statSync(fullName);
    const isFile = stats.isFile();
    const isDir = stats.isDirectory();
    if (isFile) {
      console.log('----------', fullName);
      // 读取文件内容
      const content = fs.readFileSync(fullName, 'utf-8');
      const replaceContent = _replace(content, fullName);
      fs.writeFileSync(fullName, replaceContent, 'utf8');
      // console.log(replaceContent);
    }
    if (isDir) {
      // console.log(filedir);
      console.log('文件夹就不管了');
      // fileDisplay(filedir);
    }
  });
  // 拿到了完整的文件
}

// eslint-disable-next-line no-unused-vars
function compressFile() {
  compressing.zip.compressDir('build', 'build.zip')
    .then(() => {
      console.log('success');
    })
    .catch(err => {
      console.error(err);
    });
}


const filePaths = path.resolve('./build');
// 调用文件遍历方法
_fileDisplay(filePaths);
// 文件路径
console.log('>>>>>>>>>>>>>>>>>>>>>>url length:', url.length);
// 下载文件
console.log('<<<<<<<<<<<<<<<<<<<<<<文件开始');

download(url).then(() => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>文件下载完成');
  replaceUrl(filePaths);
});

// compressFile();
