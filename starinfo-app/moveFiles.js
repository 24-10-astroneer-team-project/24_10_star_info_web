const fs = require('fs-extra');
const path = require('path');

async function moveBuildFiles() {
    const buildDir = path.join(__dirname, 'build');
    const staticDir = path.join(__dirname, '..', 'src', 'main', 'resources', 'static');

    try {
        // static 폴더 내부의 모든 파일을 static 최상위 폴더로 이동
        await fs.copy(path.join(buildDir, 'static'), staticDir);

        // 최상위 파일들도 static 폴더로 이동 (index.html, asset-manifest.json 등)
        const topLevelFiles = ['asset-manifest.json', 'favicon.ico', 'index.html', 'logo192.png', 'logo512.png', 'manifest.json', 'robots.txt'];
      
        for (const file of topLevelFiles) {
            const sourcePath = path.join(buildDir, file);
            const destinationPath = path.join(staticDir, file);

            // 파일이 존재하는 경우에만 복사하도록 수정
            if (await fs.pathExists(sourcePath)) {
                await fs.copy(sourcePath, destinationPath);
                console.log(`Copied ${file} successfully.`);
            } else {
                console.warn(`File ${file} not found. Skipping copy.`);
            }
        }

        console.log('Build files moved successfully!');
    } catch (err) {
        console.error('Error moving build files:', err);
    }
}

moveBuildFiles();
