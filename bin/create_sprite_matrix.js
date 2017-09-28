const dimensions = require('image-size');
const fs = require('fs');
const path = require('path');
const { sheet, columns, rows } = require('minimist')(process.argv.slice(2));

if (!sheet) {
    console.log('Please supply the path to the sprite sheet with the "--sheet" argument');
    process.exit(1);
}

if (!columns) {
    console.log('Please supply the number of columns with the "--columns" argument');
    process.exit(1);
}

if (!rows) {
    console.log('Please supply the number of rows with the "--rows" argument');
    process.exit(1);
}

function createSpriteMatrix (width, height, rows, columns) {
    const spriteWidth = width / columns;
    const spriteHeight = height / rows;
    const matrix = [];

    for (let row = 0; row < height; row += spriteHeight) {
        for (let column = 0; column < width; column += spriteWidth) {
            matrix.push({
                x: column,
                y: row
            });
        }
    }

    console.log(`${matrix.length} sprite coordinates created`);
    return matrix;
}

(async function () {
    try {
        const { width, height } = await dimensions(sheet);
        const target = path.join(process.cwd(), `resources/${path.basename(sheet, path.extname(sheet))}.json`);

        console.log('spritesheet dimensions', `${width}px x ${height}px`);

        fs.writeFile(
            target,
            JSON.stringify(createSpriteMatrix(width, height, rows, columns)), 
            'utf-8', 
        (error) => {
            if (error) {
                console.log(error);
                process.exit(1);
            } else {
                console.log(`saved sprite matix to "${target}"`);
                process.exit(0);
            }
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();
