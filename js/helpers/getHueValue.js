const getHueValue = () => {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hue'));
};

export default getHueValue;
