import { spawnBlobs } from './helpers/blob.js';
import getHueValue from './helpers/getHueValue.js';

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

const initHueSlider = () => {
    const hueSlider = document.querySelector('.hue-slider');
    hueSlider.value = getHueValue();

    document.querySelector('.hue-slider').addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--hue', e.target.value);
    });
}

initHueSlider();
spawnBlobs(spawnList);