function changeLabels() {
    var conversionType = document.getElementById("conversionType").value;
    if (conversionType === "HSVpRGB") {
        document.querySelector("label[for='red']").textContent = "H (°):";
        document.querySelector("label[for='green']").textContent = "S (%):";
        document.querySelector("label[for='blue']").textContent = "V (%):";
        document.getElementById("red").id = "hue";
        document.getElementById("green").id = "saturation";
        document.getElementById("blue").id = "value";
    } else if (conversionType === "CMYKpRGB") {
        document.querySelector("label[for='red']").textContent = "Cyan (%):";
        document.querySelector("label[for='green']").textContent = "Magenta (%):";
        document.querySelector("label[for='blue']").textContent = "Yellow (%):";
        document.getElementById("red").id = "cyan";
        document.getElementById("green").id = "magenta";
        document.getElementById("blue").id = "yellow";
        document.getElementById("blackInput").style.display = "block"; // Exibe o campo black
    } else {
        document.querySelector("label[for='hue']").textContent = "Red:";
        document.querySelector("label[for='saturation']").textContent = "Green:";
        document.querySelector("label[for='value']").textContent = "Blue:";
        document.getElementById("hue").id = "red";
        document.getElementById("saturation").id = "green";
        document.getElementById("value").id = "blue";
    }
}

function updateConversionType() {
    var conversionType = document.getElementById("conversionType").value;
    var redInput = document.getElementById('red');
    var greenInput = document.getElementById('green');
    var blueInput = document.getElementById('blue');

    // Limpa os campos de entrada
    redInput.value = "";
    greenInput.value = "";
    blueInput.value = "";

    changeLabels(); // Atualiza os rótulos conforme a seleção

    // Chama a função limitInput() para cada campo de entrada com o novo tipo de conversão
    limitInput(redInput, conversionType);
    limitInput(greenInput, conversionType);
    limitInput(blueInput, conversionType);
}

function limitInput(element, conversionType) {
    var value = parseInt(element.value);
    var maxValue = 255; // valor max para RGB

    if (conversionType === 'HSVpRGB') {
        if (element.id === 'hue') { // H
            maxValue = 359;
        } else if (element.id === 'value' || element.id === 'saturation') { // S e V
            maxValue = 100;
        }
    } else if (conversionType === 'RGBpHSV') {
        maxValue = 255;
    } else if (conversionType === 'CMYKpRGB') {
        maxValue = 100; // porcentagem para as cores
    }

    if (value > maxValue) {
        element.value = maxValue;
    }
}

function convertColors() {
    var conversionType = document.getElementById('conversionType').value;

    if (conversionType === "normaliza") {
        convertNormalizeRGB();
    } else if (conversionType === "RGBpHSV") {
        convertRGBtoHSV();
    } else if (conversionType === "HSVpRGB") {
        convertHSVtoRGB();
    } else if (conversionType === "RGBpCMYK") {
        convertRGBtoCMYK();
    } else if (conversionType === "CMYKpRGB") {
        convertCMYKtoRGB();
    } else if (conversionType === "RGBpCINZA") {
        // Implementar a conversão de RGB para Escala de Cinza
    }
}

function convertNormalizeRGB() {
    var red = parseInt(document.getElementById('red').value);
    var green = parseInt(document.getElementById('green').value);
    var blue = parseInt(document.getElementById('blue').value);

    // limitar os valores de input RGB a um máximo de 255
    red = Math.min(red, 255);
    green = Math.min(green, 255);
    blue = Math.min(blue, 255);

    // chamar a função
    var normalizedRGB = normalizaRGB([red, green, blue]);
    
    // resultado da conversão, editado o style e habilitada uma casa decimal
    document.getElementById('result').innerHTML = 
    `<div>
        <div style="font-size: 20px; color: #34a4eb;">RGB normalizado:</div>
        <div style="font-size: 16px;">R: ${normalizedRGB[0]}</div>
        <div style="font-size: 16px;">G: ${normalizedRGB[1]}</div>
        <div style="font-size: 16px;">B: ${normalizedRGB[2]}</div>
    </div>`;
}

function convertRGBtoHSV() {
    var red = parseInt(document.getElementById('red').value);
    var green = parseInt(document.getElementById('green').value);
    var blue = parseInt(document.getElementById('blue').value);

    // chamar a função
    var hsv = RGBpHSV(red, green, blue);

    // resultado da conversão, editado o style e habilitada uma casa decimal e os tipos dos valores
    document.getElementById('result').innerHTML = 
    `<div>
        <div style="font-size: 20px; color: #34a4eb;">Resultado HSV:</div>
        <div style="font-size: 16px;">H: ${hsv[0]}°</div>
        <div style="font-size: 16px;">S: ${hsv[1]}%</div>
        <div style="font-size: 16px;">V: ${hsv[2]}%</div>
    </div>`;
}

function convertHSVtoRGB() {
    var hue = parseFloat(document.getElementById('hue').value);
    var saturation = parseFloat(document.getElementById('saturation').value);
    var value = parseFloat(document.getElementById('value').value); // Corrigindo aqui

    // chama a função
    var rgb = HSVtoRGB(hue, saturation, value);

    // resultado da conversão, editado o style e habilitada uma casa decimal
    document.getElementById('result').innerHTML = 
    `<div>
        <div style="font-size: 20px; color: #34a4eb;">Resultado RGB:</div>
        <div style="font-size: 16px;">R: ${rgb[0].toFixed(1)}</div>
        <div style="font-size: 16px;">G: ${rgb[1].toFixed(1)}</div>
        <div style="font-size: 16px;">B: ${rgb[2].toFixed(1)}</div>
    </div>`;
}

function convertRGBtoCMYK() {
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

    // Arredonda os valores CMYK para números inteiros
    var cmykRounded = cmyk.map(value => Math.round(value));

    // resultado da conversão, editado o style
    document.getElementById('result').innerHTML = 
    `<div>
        <div style="font-size: 20px; color: #34a4eb;">Resultado CMYK:</div>
        <div style="font-size: 16px;">C: ${cmykRounded[0]}%</div>
        <div style="font-size: 16px;">M: ${cmykRounded[1]}%</div>
        <div style="font-size: 16px;">Y: ${cmykRounded[2]}%</div>
        <div style="font-size: 16px;">K: ${cmykRounded[3]}%</div>
    </div>`;
}

// Aqui deve estar a implementação da função convertCMYKtoRGB() conforme desejado

function normalizaRGB(rgb) {
    // soma valores de R, G e B
    var soma = rgb[0] + rgb[1] + rgb[2];
    var res = [];

    // normaliza os valores os dividindo pelo total e o multiplicando pelo valor máximo de RGB
    var resRed = (rgb[0] / soma) * 255;
    var resGreen = (rgb[1] / soma) * 255;
    var resBlue = (rgb[2] / soma) * 255;

    // adiciona a casa decimal ao resultado e envia o valor para a lista
    res.push(resRed.toFixed(1));
    res.push(resGreen.toFixed(1));
    res.push(resBlue.toFixed(1));

    // retorna a lista como resultado
    return res;
}

function RGBpHSV(r, g, b) {
    // dividir os valores R, G e B pelo seu valor máximo para ter um valor entre 0.0 e 1.0
    r /= 255;
    g /= 255;
    b /= 255;

    // encontrar o valor mínimo e máximo entre R, G e B
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    
    // calcular o valor da matriz (H)
    var h;
    if (max == min) {
        h = 0; 
    } else if (max == r && g >= b) {
        h = 60 * ((g - b) / (max - min)) + 0;
    } else if (max == r && g < b) {
        h = 60 * ((g - b) / (max - min)) + 360;
    } else if (max == g) {
        h = 60 * ((b - r) / (max - min)) + 120;
    } else if (max == b) {
        h = 60 * ((r - g) / (max - min)) + 240;
    }

    // calcular a saturação (S)
    var s = (max == 0) ? 0 : ((max - min) / max);

    // calcular o valor (V)
    var v = max;

    // retornar os valores HSV em um array arredondado, o S e o V são multiplicados por 100 para serem porcentagens e recebem uma casa decimal
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

function convertCMYKtoRGB() {
    var cyan = parseFloat(document.getElementById('cyan').value) / 100; // Alterado de 'red' para 'cyan'
    var magenta = parseFloat(document.getElementById('magenta').value) / 100; // Alterado de 'green' para 'magenta'
    var yellow = parseFloat(document.getElementById('yellow').value) / 100; // Alterado de 'blue' para 'yellow'
    var black = parseFloat(document.getElementById('black').value) / 100; // Adicionado o elemento 'black'

    // Calcula os valores de RGB
    var red = 255 * (1 - cyan) * (1 - black);
    var green = 255 * (1 - magenta) * (1 - black);
    var blue = 255 * (1 - yellow) * (1 - black);

    // Exibe o resultado
    document.getElementById('result').innerHTML =
        `<div>
            <div style="font-size: 20px; color: #34a4eb;">Resultado RGB:</div>
            <div style="font-size: 16px;">R: ${red.toFixed(1)}</div>
            <div style="font-size: 16px;">G: ${green.toFixed(1)}</div>
            <div style="font-size: 16px;">B: ${blue.toFixed(1)}</div>
        </div>`;
}
