import path from 'path';
import fs from 'fs';
import { glob } from 'glob';
import handlebars from 'handlebars';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const varCase = str => {
  return str.replace(/-/g, '_').replace(/^./, char => char.toUpperCase());
}
const lowCase = str => {
  return str.replace(/-/g, '_').replace(/^./, char => char.toLowerCase());
}

(async () => {
  const component = process.argv[2];//输入的组件名
  const dirName = lowCase(component);//(首字母小写，连字符转下划线)
  const componentName = varCase(component);//(首字母大写，连字符转下划线)
  const targetDir = path.join(process.cwd(), 'src', dirName);//目标目录

  await fs.promises.mkdir(targetDir, { recursive: true });//recursive: true 表示如果父目录不存在也一起创建，文件夹已存在也不报错

  const tplDir = path.join(__dirname, 'template').replace(/\\/g, '/');
  const tplFiles = glob.sync(`${tplDir}/*.hbs`);

  for (const filePath of tplFiles) {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const template = handlebars.compile(content);
    const result = template({ dirName, componentName });

    const fileName = path.basename(filePath)
      .replace('components', dirName)
      .replace('Compomemts', componentName)
      .replace('.hbs', '');
    const newPath = path.join(targetDir, fileName);

    await fs.promises.writeFile(newPath, result);
    console.log(`write ${newPath} success`);
  }
})();
