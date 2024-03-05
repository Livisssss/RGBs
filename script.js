function convertColors() {
    var conversionType = document.getElementById('conversionType').value;

    if (conversionType === "normalize") {
        var red = parseInt(document.getElementById('red').value);
        var green = parseInt(document.getElementById('green').value);
        var blue = parseInt(document.getElementById('blue').value);

        // Verificar se os campos de entrada estão preenchidos corretamente
        if (isNaN(red) || isNaN(green) || isNaN(blue)) {
            alert("Por favor, insira valores numéricos válidos.");
            return;
        }

        // Normalize RGB values
        var normalizedRGB = normalizeRGB([red, green, blue]);
        
        document.getElementById('result').innerHTML = 
            `RGB normalizado: ${normalizedRGB[0]}, ${normalizedRGB[1]}, ${normalizedRGB[2]}`;
    } else if (conversionType === "rgbToHsv") {
        var red = parseInt(document.getElementById('red').value);
        var green = parseInt(document.getElementById('green').value);
        var blue = parseInt(document.getElementById('blue').value);

        // Verificar se os campos de entrada estão preenchidos corretamente
        if (isNaN(red) || isNaN(green) || isNaN(blue)) {
            alert("Por favor, insira valores numéricos válidos.");
            return;
        }

        // Convert RGB to HSV
        var hsv = RGBtoHSV(red, green, blue);

        document.getElementById('result').innerHTML = 
            `HSV: ${hsv[0]}, ${hsv[1]}, ${hsv[2]}`;
    } else if (conversionType === "hsvToRgb") {
        var hue = parseFloat(document.getElementById('red').value);
        var saturation = parseFloat(document.getElementById('green').value);
        var value = parseFloat(document.getElementById('blue').value);

        // Verificar se os campos de entrada estão preenchidos corretamente
        if (isNaN(hue) || isNaN(saturation) || isNaN(value)) {
            alert("Por favor, insira valores numéricos válidos.");
            return;
        }

        // Convert HSV to RGB
        var rgb = HSVtoRGB(hue, saturation, value);

        document.getElementById('result').innerHTML = 
            `RGB: ${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;

    } else if (conversionType === "rgbToCmyk") {
        var red = parseInt(document.getElementById('red').value);
        var green = parseInt(document.getElementById('green').value);
        var blue = parseInt(document.getElementById('blue').value);

        // Verificar se os campos de entrada estão preenchidos corretamente
        if (isNaN(red) || isNaN(green) || isNaN(blue)) {
            alert("Por favor, insira valores numéricos válidos para RGB.");
            return;
        }

        // Convert RGB to CMYK
        var cmyk = RGBtoCMYK(red, green, blue);

        document.getElementById('result').innerHTML = 
            `CMYK: ${cmyk[0]}, ${cmyk[1]}, ${cmyk[2]}, ${cmyk[3]}`;
    } else if (conversionType === "CmykTorgb") {
        // Implementar a conversão de CMYK para RGB
    } else if (conversionType === "rgbToGrayscale") {
        // Implementar a conversão de RGB para Escala de Cinza
    }
}





function normalizeRGB(rgb) {
    var sum = rgb[0] + rgb[1] + rgb[2];
    var norm = [];

    var normalizedRed = (rgb[0] / sum) * 255;
    var normalizedGreen = (rgb[1] / sum) * 255;
    var normalizedBlue = (rgb[2] / sum) * 255;

    norm.push(normalizedRed.toFixed(1));
    norm.push(normalizedGreen.toFixed(1));
    norm.push(normalizedBlue.toFixed(1));

    return norm;
}

function RGBtoHSV(r, g, b) {
    // Normalizar os valores R, G e B
    r /= 255;
    g /= 255;
    b /= 255;

    // Encontrar o valor mínimo e máximo entre R, G e B
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    
    // Calcular o valor da matiz (H)
    var h;
    if (max == min) {
        h = 0; // A matiz é indefinida, então definimos como zero.
    } else if (max == r) {
        h = (60 * ((g - b) / (max - min)) + 360) % 360;
    } else if (max == g) {
        h = (60 * ((b - r) / (max - min)) + 120);
    } else if (max == b) {
        h = (60 * ((r - g) / (max - min)) + 240);
    }

    // Calcular a saturação (S)
    var s = (max == 0) ? 0 : (1 - (min / max));

    // Calcular o valor (V)
    var v = max;

    // Retornar os valores HSV em um array
    return [Math.round(h), (s * 100).toFixed(1), (v * 100).toFixed(1)];
}

function HSVtoRGB(h, s, v) {
    // Normalizar os valores de S e V
    s /= 100;
    v /= 100;

    var c = v * s;
    var x = c * (1 - Math.abs((h / 60) % 2 - 1));
    var m = v - c;

    var rgbPrime;
    if (0 <= h && h < 60) {
        rgbPrime = [c, x, 0];
    } else if (60 <= h && h < 120) {
        rgbPrime = [x, c, 0];
    } else if (120 <= h && h < 180) {
        rgbPrime = [0, c, x];
    } else if (180 <= h && h < 240) {
        rgbPrime = [0, x, c];
    } else if (240 <= h && h < 300) {
        rgbPrime = [x, 0, c];
    } else if (300 <= h && h < 360) {
        rgbPrime = [c, 0, x];
    }

    var r = (rgbPrime[0] + m) * 255;
    var g = (rgbPrime[1] + m) * 255;
    var b = (rgbPrime[2] + m) * 255;

    return [Math.round(r), Math.round(g), Math.round(b)];
}

function RGBtoCMYK(r, g, b) {
    var c = 1 - (r / 255);
    var m = 1 - (g / 255);
    var y = 1 - (b / 255);
    var k = Math.min(c, Math.min(m, y));
    c = ((c - k) / (1 - k) * 100);
    m = ((m - k) / (1 - k) * 100);
    y = ((y - k) / (1 - k) * 100);
    k = Math.round(k * 100);
    return [c.toFixed(2), m.toFixed(2), y.toFixed(2), k.toFixed(2)];

}