import fs from 'fs';
import path from 'path';
import { reloadBrowser } from './serveTask.mjs';

const fontsDir = path.resolve('src/fonts');
const distFontsDir = path.resolve('dist/fonts');
const scssFile = path.resolve('src/scss/base/_fonts.scss');

function createFontsDir() {
    if (!fs.existsSync(distFontsDir)) {
        fs.mkdirSync(distFontsDir, { recursive: true });
        console.log('✅ Папка dist/fonts создана');
    }
}

function createScssFile() {
    fs.writeFileSync(scssFile, '', 'utf8'); // всегда перезаписываем
    console.log('✅ Файл _fonts.scss очищен/создан');
}

function getFontWeight(fontName) {
    const name = fontName.toLowerCase();
    if (name.includes('extrabold') || name.includes('heavy')) return 800;
    if (name.includes('black')) return 900;
    if (name.includes('semibold') || name.includes('demibold')) return 600;
    if (name.includes('bold')) return 700;
    if (name.includes('medium')) return 500;
    if (name.includes('regular') || name.includes('normal')) return 400;
    if (name.includes('light')) return 300;
    if (name.includes('extralight') || name.includes('ultralight')) return 200;
    if (name.includes('thin')) return 100;
    return 400;
}

function getBaseFontName(fullName) {
    return fullName.split('-')[0];
}

function removeTTFfromDist() {
    const files = fs.readdirSync(distFontsDir);
    for (const file of files) {
        if (file.endsWith('.ttf')) {
            fs.unlinkSync(path.join(distFontsDir, file));
            console.log(`🗑 Удалён лишний файл: ${file}`);
        }
    }
}

export async function fontsTask() {
    createFontsDir();
    createScssFile();

    // Динамический импорт для ESM
    const ttf2woff = (await import('ttf2woff')).default;
    const ttf2woff2 = (await import('ttf2woff2')).default;

    const files = fs.readdirSync(fontsDir).filter(f => f.endsWith('.ttf'));
    if (files.length === 0) {
        console.log('⚠️ Нет TTF файлов для обработки.');
        return;
    }

    let scssContent = '';
    const addedFonts = new Set();

    for (const file of files) {
        const fontPath = path.join(fontsDir, file);
        const fontName = path.basename(file, path.extname(file));
        const baseFontName = getBaseFontName(fontName);
        const fontWeight = getFontWeight(fontName);

        const fontKey = `${baseFontName}-${fontWeight}`;
        if (addedFonts.has(fontKey)) {
            console.log(`⚠️ Шрифт ${baseFontName} с весом ${fontWeight} уже добавлен. Пропускаем.`);
            continue;
        }
        addedFonts.add(fontKey);

        // Копируем TTF
        fs.copyFileSync(fontPath, path.join(distFontsDir, file));
        console.log(`✅ ${file} скопирован`);

        // Конвертация в WOFF
        const woffBuffer = ttf2woff(fs.readFileSync(fontPath));
        fs.writeFileSync(path.join(distFontsDir, `${fontName}.woff`), Buffer.from(woffBuffer.buffer));
        console.log(`✅ ${fontName}.woff создан`);

        // Конвертация в WOFF2
        const woff2Buffer = ttf2woff2(fs.readFileSync(fontPath));
        fs.writeFileSync(path.join(distFontsDir, `${fontName}.woff2`), woff2Buffer);
        console.log(`✅ ${fontName}.woff2 создан`);

        // Генерация SCSS
        scssContent += `@font-face {\n` +
            `  font-family: '${baseFontName}';\n` +
            `  src: url('../fonts/${fontName}.woff2') format('woff2'),\n` +
            `       url('../fonts/${fontName}.woff') format('woff');\n` +
            `  font-weight: ${fontWeight};\n` +
            `  font-style: normal;\n` +
            `  font-display: swap;\n` +
            `}\n\n`;
    }

    fs.writeFileSync(scssFile, scssContent, 'utf8');
    removeTTFfromDist();

    console.log('✅ Шрифты обработаны и SCSS обновлён');
    reloadBrowser();
}
