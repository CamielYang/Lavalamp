import getHueValue from './getHueValue.js';
import randomNumbers from './randomNumbers.js';

const blobSettings = {
    size: {
        min: 10,
        max: 30,
    },
    borderRadius: {
        min: 0,
        max: 100,
    },
    transitionDuration: {
        min: 5,
        max: 10,
    },
    leftPosition: {
        min: 20,
        max: 60,
    },
};

const setPosition = (blob) => {
    blob.style.left = `${randomNumbers(blobSettings.leftPosition.min, blobSettings.leftPosition.max)}%`;
}

const setRandomSize = (blob) => {
    const blobSize = randomNumbers(blobSettings.size.min, blobSettings.size.max);
    blob.style.width = `${blobSize}px`;
    blob.style.height = `${blobSize}px`;
}

const setRandomShape = (blob) => {
    let borderRadiusValues = [];

    for(let i = 0; i < 4; i++) {
        borderRadiusValues.push(randomNumbers(blobSettings.borderRadius.min, blobSettings.borderRadius.max));
    }

    blob.style.borderRadius = `
        ${borderRadiusValues[0]}%
        ${100 - borderRadiusValues[0]}%
        ${borderRadiusValues[1]}%
        ${100 - borderRadiusValues[1]}%
        /
        ${borderRadiusValues[2]}%
        ${100 - borderRadiusValues[2]}%
        ${borderRadiusValues[3]}%
        ${100 - borderRadiusValues[3]}%
    `;
}

const getBlobAnimationPosition = (startPosition) => {
    if (startPosition === 'top') {
        return {
            property: 'top',
            start: '-30px',
            end: '100%',

        };
    } else {
        return {
            property: 'bottom',
            start: '-10px',
            end: '100%',
        };
    }
}

const createDefaultBlob = (transitionDuration) => {
    let blob = document.createElement('div');
    blob.classList.add('blob');

    blob.style.position = 'absolute';
    blob.style.setProperty('--blob-color', `hsl(calc(var(--hue) + ${randomNumbers(0, 20)}), 100%, 78%)`);
    blob.style.transition = `all ${transitionDuration}s ease-in-out`;

    return blob;
}

const spawnBlob = (location = 'top') => {
    const transitionDuration = randomNumbers(blobSettings.transitionDuration.min, blobSettings.transitionDuration.max);
    const blob = createDefaultBlob(transitionDuration);
    const positions = getBlobAnimationPosition(location);

    blob.style[positions.property] = positions.start;
    setPosition(blob);
    setRandomShape(blob);
    setRandomSize(blob);

    document.querySelector('.blobs').appendChild(blob);

    setTimeout(() => {
        blob.style[positions.property] = positions.end;
        setPosition(blob);
        setRandomShape(blob);

        setTimeout(() => {
            blob.remove();

            setTimeout(() => {
                spawnBlob(location === 'top' ? 'bottom' : 'top');
            }, randomNumbers(1000, 5000));
        }, transitionDuration * 1000);
    }, 10);
}

const spawnBlobs = (spawnList) => {
    spawnList.forEach((spawn) => {
        for (let i = 0; i < spawn.amount; i++) {
            setTimeout(() => {
                spawnBlob(spawn.location);
            }, randomNumbers(100, 1000));
        }
    })
}

export {
    spawnBlob,
    spawnBlobs,
}
