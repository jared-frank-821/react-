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
  const component = process.argv[2]; // 输入的组件名
  const dirName = lowCase(component); // 目录名保持小写
  const componentName = varCase(component); // 组件类名（首字母大写）
  const targetDir = path.join(process.cwd(), 'src', dirName);

  await fs.promises.mkdir(targetDir, { recursive: true });

  const tplDir = path.join(__dirname, 'template').replace(/\\/g, '/');
  const tplFiles = glob.sync(`${tplDir}/*.hbs`);

  for (const filePath of tplFiles) {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const template = handlebars.compile(content);
    const result = template({ dirName, componentName });

    const templateName = path.basename(filePath);
    
    // --- 修改点在这里 ---
    const fileName = templateName === 'Component.tsx.hbs'
      ? `${componentName}.tsx`  // 这里从 dirName 改为 componentName
      : templateName.replace('.hbs', '');
    // -------------------

    const newPath = path.join(targetDir, fileName);
    
    await fs.promises.writeFile(newPath, result);
    console.log(`write ${newPath} success`);
  }

  // 获取样式文件的逻辑保持不变
  try {
    const response = await fetch(`https://unpkg.com/antd@4.24.15/es/${dirName}/style/index.css`);
    if (response.ok) {
      const body = await response.text();
      await fs.promises.writeFile(path.join(process.cwd(), `src/${dirName}/index.scss`), body);
      console.log(`write ${path.join(process.cwd(), `src/${dirName}/index.scss`)} success`);
    }
  } catch (error) {
    console.error('Fetch style failed:', error.message);
  }
})();