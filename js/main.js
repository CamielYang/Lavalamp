const randomNumbers = (min, max) => {
	return Math.round(Math.random() * (max - min)) + min;
}

const blobSettings = {
    size: {
        min: 10,
        max: 30,
    },
    borderRadius: {
        min: 30,
        max: 70,
    },
    transitionDuration: {
        min: 5,
        max: 10,
    },
}

const spawnList = [
    {
        location: 'top',
        amount: 4,
    },
    {
        location: 'bottom',
        amount: 3,
    },
]

const setRandomSize = (blob) => {
    const blobSize = randomNumbers(blobSettings.size.min, blobSettings.size.max);
    blob.style.width = `${blobSize}px`;
    blob.style.height = `${blobSize}px`;
}

const setRandomShape = (blob) => {
    let borerRadiusValues = [
        randomNumbers(blobSettings.borderRadius.min, blobSettings.borderRadius.max),
        randomNumbers(blobSettings.borderRadius.min, blobSettings.borderRadius.max),
        randomNumbers(blobSettings.borderRadius.min, blobSettings.borderRadius.max),
        randomNumbers(blobSettings.borderRadius.min, blobSettings.borderRadius.max),
    ];

    blob.style.borderRadius = `
        ${borerRadiusValues[0]}%
        ${100 - borerRadiusValues[0]}%
        ${borerRadiusValues[1]}%
        ${100 - borerRadiusValues[1]}%
        /
        ${borerRadiusValues[2]}%
        ${100 - borerRadiusValues[2]}%
        ${borerRadiusValues[3]}%
        ${100 - borerRadiusValues[3]}%
    `;
}

const getHsl = () => {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hsl'));
};


const spawnBlob = (location = 'top') => {
    let transitionDuration = randomNumbers(blobSettings.transitionDuration.min, blobSettings.transitionDuration.max);
    let blob = document.createElement('div');
    const hsl = getHsl();
    blob.classList.add('blob');
    blob.style.setProperty('--hsl', randomNumbers(hsl, hsl + 20))
    blob.style.position = 'absolute';
    blob.style.transform = 'translateX(-50%)';
    blob.style.left = `${randomNumbers(70, 30)}%`;
    blob.style.transition = `all ${transitionDuration}s ease-in-out`;

    setRandomShape(blob);
    setRandomSize(blob);

    if (location === 'top') {
        blob.style.top = '-20px';
    } else {
        blob.style.bottom = '-20px';
    }

    document.querySelector('.blobs').appendChild(blob);
    setTimeout(() => {
        setRandomShape(blob);
        blob.style.left = `${randomNumbers(70, 30)}%`;

        if (location === 'top') {
            blob.style.top = '100%';
        } else {
            blob.style.bottom = '100%';
        }

        setTimeout(() => {
            blob.remove();
            setTimeout(() => {
                spawnBlob(location === 'top' ? 'bottom' : 'top');
            }, randomNumbers(1000, 5000));
        }, transitionDuration * 1000);
    }, 10);
}

spawnList.forEach((spawn) => {
    for (let i = 0; i < spawn.amount; i++) {
        setTimeout(() => {
            spawnBlob(spawn.location);
        }, randomNumbers(100, 1000));
    }
})

const initHueSlider = () => {
    const hueSlider = document.querySelector('.hue-slider');
    hueSlider.value = getHsl();

    document.querySelector('.hue-slider').addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--hsl', e.target.value);
    });
}

initHueSlider();

