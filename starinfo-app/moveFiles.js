const fs = require('fs-extra');
const path = require('path');

async function moveBuildFiles() {
    const buildDir = path.join(__dirname, 'build');
    const staticDir = path.join(__dirname, '..', 'src', 'main', 'resources', 'static');

    try {
        // static 폴더 내부의 모든 파일을 static 최상위 폴더로 이동
        await fs.copy(path.join(buildDir, 'static'), staticDir);

        // 최상위 파일들도 static 폴더로 이동 (index.html, manifest.json 등)
        const topLevelFiles = ['asset-manifest.json', 'favicon.ico', 'index.html', 'logo192.png', 'logo512.png', 'manifest.json', 'robots.txt'];
        for (const file of topLevelFiles) {
            await fs.copy(path.join(buildDir, file), path.join(staticDir, file));
        }

        console.log('Build files moved successfully!');
    } catch (err) {
        console.error('Error moving build files:', err);
    }
}

moveBuildFiles();