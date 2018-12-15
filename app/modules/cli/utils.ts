export function centered(str: string) {
    // Get the available screen size
    const width = process.stdout.columns;

    // Calculate the left padding there should be
    const leftPadding = Math.floor((width - str.length) / 2);

    // Put in left padded spaces before the string itself
    let line = '';
    for (let i = 0; i < leftPadding; i++) {
        line+=' ';
    }
    line+= str;
    console.log(line);
}

export function horizontalLine() {
    // Get the available screen size
    const width = process.stdout.columns;

    // Put in enough dashes to go across the screen
    let line = '';
    for (let i = 0; i < width; i++) {
        line+='-';
    }
    console.log(line);
}

export function verticalSpace(lines: number = 0) {
    lines = typeof(lines) == 'number' && lines > 0 ? lines : 1;
    for (let i = 0; i < lines; i++) {
        console.log('');
    }
}