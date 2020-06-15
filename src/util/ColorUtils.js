import parse from "pure-color/parse";
import rgb2hsv from "pure-color/convert/rgb2hsv";
import hsv2rgb from "pure-color/convert/hsv2rgb";
import rgb2string from "pure-color/convert/rgb2string";
import rgb2grayscale from "pure-color/convert/rgb2grayscale";
import colorNames from "color-name";


export function parseToHsv(color) {
  color = parse(color);
  if (color === undefined && colorNames.hasOwnProperty(color)) {
    // if the passed in value corresponds to a color name, parse it
    color = parse('rgb(' + colorNames[color].join(',') + ')');
  }
  const hsv  = rgb2hsv(color);

  const alpha = color.length === 4 ? color[3] : 1;
  hsv.push(alpha);

  return hsv;
}

export function toRgbString(hsv) {
  const rgb = hsv2rgb(hsv);

  if(hsv.length === 4) {
    rgb.push(hsv[3]);
  }

  return rgb2string(rgb);
}

export function equals(hsv1, hsv2) {
  return toRgbString(hsv1) === toRgbString(hsv2);
}

export function isDark(hsv) {
  return rgb2grayscale(hsv2rgb(hsv)) <= 128;
}
