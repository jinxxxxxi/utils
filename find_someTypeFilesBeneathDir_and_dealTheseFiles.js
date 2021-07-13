// readme: 匹配某文件夹下的某种文件格式，并对之进行操作
let path = require('path');
let fs = require('fs');

let pathName = './src/widgets'; // 待匹配的文件目录
let type = '.vue'; // 待匹配的文件格式

function fileWalker(filePath) {
  // 根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function(err, files) {
    if (err) {
      console.warn(err);
    } else {
      // 遍历读取到的文件列表
      files.forEach(filename => {
        // 获取当前文件的绝对路径
        let filedir = path.join(filePath, filename);
        // 根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function(eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            let isFile = stats.isFile(); // 是文件
            let isDir = stats.isDirectory(); // 是文件夹
            let isVue = new RegExp(type).test(filename);
            if (isFile && isVue) {
              console.log(filename);

              // 读取文件内容
              let content = fs.readFileSync(filedir, 'utf-8');
              let compressedContent = content.replace(/\s/g, ''); // 压缩文件，去除所有空格
              // TODO:匹配中文
              let match = compressedContent.match(/!(^\/\/?|^<!--)([\u4e00-\u9fa5])+/g);
              //   let match = content.match(/\\*[\u4E00-\u9FA5]+|[\u4E00-\u9FA5]+\.\*/g);
              match && console.log(match);
            }
            if (isDir) {
              fileWalker(filedir); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        });
      });
    }
  });
}

fileWalker(pathName);

