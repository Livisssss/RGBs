function atualizarTipoConversao() {
    var tipoConversaoSelect = document.getElementById("tipoConversao");
    var redEntrada = document.getElementById('red');
    var greenEntrada = document.getElementById('green');
    var blueEntrada = document.getElementById('blue');
    var resultDiv = document.getElementById('result');
    var hueEntrada = document.getElementById("hue");
    var saturationEntrada = document.getElementById("saturation");
    var valueEntrada = document.getElementById("value");
    var entradaPreto = document.getElementById("entradaPreto");


    // Limpar os campos de entrada, se estiverem presentes
    if (entradaPreto) {
        entradaPreto.style.display = "none";
    }
    if (redEntrada) {
        redEntrada.value = "";
    }
    if (greenEntrada) {
        greenEntrada.value = "";
    }
    if (blueEntrada) {
        blueEntrada.value = "";
    }
    if (hueEntrada) {
        hueEntrada.value = "";
    }
    if (saturationEntrada) {
        saturationEntrada.value = "";
    }
    if (valueEntrada) {
        valueEntrada.value = "";
    }

    // Limpar o conteúdo da div de result
    resultDiv.innerHTML = "";

    // Atualizar os rótulos conforme a seleção
    alterarLabels();

    // Chamar a função limitarEntrada() para cada campo de entrada com o novo tipo de conversão
    if (redEntrada && greenEntrada && blueEntrada) {
        limitarEntrada(redEntrada, tipoConversaoSelect.value);
        limitarEntrada(greenEntrada, tipoConversaoSelect.value);
        limitarEntrada(blueEntrada, tipoConversaoSelect.value);
    }

    // Verificar se todos os elementos necessários foram encontrados
    if (!tipoConversaoSelect || !redEntrada || !greenEntrada || !blueEntrada || !resultDiv) {
        console.error("Um ou mais elementos não foram encontrados:");
        console.log("redEntrada:", redEntrada);
        console.log("greenEntrada:", greenEntrada);
        console.log("blueEntrada:", blueEntrada);
        return;
    }

    if (tipoConversaoSelect.value !== 'CMYKpRGB') {
        limparCampos();
    }
}

function limparCampos() {
    var redEntrada = document.getElementById('red');
    var greenEntrada = document.getElementById('green');
    var blueEntrada = document.getElementById('blue');
    var hueEntrada = document.getElementById("hue");
    var saturationEntrada = document.getElementById("saturation");
    var valueEntrada = document.getElementById("value");
    var cyanEntrada = document.getElementById('cyan');
    var magentaEntrada = document.getElementById("magenta");
    var yellowEntrada = document.getElementById("yellow");
    var blackEntrada = document.getElementById("black");

    if (redEntrada) {
        redEntrada.value = "";
    }
    if (greenEntrada) {
        greenEntrada.value = "";
    }
    if (blueEntrada) {
        blueEntrada.value = "";
    }
    if (hueEntrada) {
        hueEntrada.value = "";
    }
    if (saturationEntrada) {
        saturationEntrada.value = "";
    }
    if (valueEntrada) {
        valueEntrada.value = "";
    }
    if (cyanEntrada) {
        blueEntrada.value = "";
    }
    if (magentaEntrada) {
        magentaEntrada.value = "";
    }
    if (yellowEntrada) {
        yellowEntrada.value = "";
    }
    if (blackEntrada) {
        blackEntrada.value = "";
    }
}

function alterarLabels() {
    var tipoConversao = document.getElementById("tipoConversao").value;
    if (tipoConversao === "HSVpRGB") {
        var redLabel = document.querySelector("label[for='red']");
        var greenLabel = document.querySelector("label[for='green']");
        var blueLabel = document.querySelector("label[for='blue']");
        if (redLabel && greenLabel && blueLabel) {
            redLabel.textContent = "H (°):";
            greenLabel.textContent = "S (%):";
            blueLabel.textContent = "V (%):";
        }
        var redEntrada = document.getElementById("red");
        var greenEntrada = document.getElementById("green");
        var blueEntrada = document.getElementById("blue");
        if (redEntrada && greenEntrada && blueEntrada) {
            redEntrada.id = "hue";
            greenEntrada.id = "saturation";
            blueEntrada.id = "value";
        }
    } else if (tipoConversao === "CMYKpRGB") {
        var redLabel = document.querySelector("label[for='red']");
        var greenLabel = document.querySelector("label[for='green']");
        var blueLabel = document.querySelector("label[for='blue']");
        if (redLabel && greenLabel && blueLabel) {
            redLabel.textContent = "Ciano (%):";
            greenLabel.textContent = "Magenta (%):";
            blueLabel.textContent = "Amarelo (%):";
        }
        var redEntrada = document.getElementById("red");
        var greenEntrada = document.getElementById("green");
        var blueEntrada = document.getElementById("blue");
        if (redEntrada && greenEntrada && blueEntrada) {
            redEntrada.id = "cyan";
            greenEntrada.id = "magenta";
            blueEntrada.id = "yellow";
            document.getElementById("entradaPreto").style.display = "block"; // Exibe o campo preto
        }
    } else {
        // Alterar os rótulos de volta para "Red", "Green" e "Blue"
        var redLabel = document.querySelector("label[for='red']");
        var greenLabel = document.querySelector("label[for='green']");
        var blueLabel = document.querySelector("label[for='blue']");
        if (redLabel && greenLabel && blueLabel) {
            redLabel.textContent = "Red:";
            greenLabel.textContent = "Green:";
            blueLabel.textContent = "Blue:";
        }
        var redEntrada = document.getElementById("hue");
        var greenEntrada = document.getElementById("saturation");
        var blueEntrada = document.getElementById("value");
        if (redEntrada && greenEntrada && blueEntrada) {
            redEntrada.id = "red";
            greenEntrada.id = "green";
            blueEntrada.id = "blue";
        }
    }
}

function limitarEntrada(elemento, tipoConversao) {
    var value = parseInt(elemento.value);
    var valueMaximo = 255; // value max para RGB

    if (tipoConversao === 'HSVpRGB') {
        if (elemento.id === 'hue') { // H
            valueMaximo = 359;
        } else if (elemento.id === 'value' || elemento.id === 'saturation') { // S e V
            valueMaximo = 100;
        }
    } else if (tipoConversao === 'RGBpHSV') {
        valueMaximo = 255;
    } else if (tipoConversao === 'CMYKpRGB') {
        valueMaximo = 100; // porcentagem para as cores
    }

    // Verifica se o elemento existe antes de tentar acessar sua propriedade value
    if (elemento && value > valueMaximo) {
        elemento.value = valueMaximo;
    }
}

function converterCores() {
    var tipoConversao = document.getElementById('tipoConversao').value;

    if (tipoConversao === "normaliza") {
        convertNormalizaRGB();
    } else if (tipoConversao === "RGBpHSV") {
        convertRGBparaHSV();
    } else if (tipoConversao === "HSVpRGB") {
        convertHSVparaRGB();
    } else if (tipoConversao === "RGBpCMYK") {
        convertRGBparaCMYK();
    } else if (tipoConversao === "CMYKpRGB") {
        convertCMYKparaRGB();
    } else if (tipoConversao === "RGBpCINZA") {
        convertRGBparaCinza();
    }
}


function convertNormalizaRGB() {
    var red = parseInt(document.getElementById('red').value);
    var green = parseInt(document.getElementById('green').value);
    var blue = parseInt(document.getElementById('blue').value);

    // Limitar os valuees de entrada RGB a um máximo de 255
    red = Math.min(red, 255);
    green = Math.min(green, 255);
    blue = Math.min(blue, 255);

    // Somar os valuees de R, G e B
    var soma = red + green + blue;

    // Normalizar os valuees dividindo pelo total e multiplicando pelo value máximo de RGB
    var resRed = (red / soma) * 255;
    var resGreen = (green / soma) * 255;
    var resBlue = (blue / soma) * 255;

    // Arredondar os valuees com uma casa decimal
    resRed = resRed.toFixed(1);
    resGreen = resGreen.toFixed(1);
    resBlue = resBlue.toFixed(1);

    // Exibir o result da conversão
    document.getElementById('result').innerHTML =
        `<div>
            <div style="font-size: 20px; color: #34a4eb;">RGB normalizado:</div>
            <div style="font-size: 16px;">R: ${resRed}</div>
            <div style="font-size: 16px;">G: ${resGreen}</div>
            <div style="font-size: 16px;">B: ${resBlue}</div>
        </div>`;
}
function convertRGBparaHSV() {
    var red = parseInt(document.getElementById('red').value);
    var green = parseInt(document.getElementById('green').value);
    var blue = parseInt(document.getElementById('blue').value);

    // Dividir os valuees R, G e B pelo seu value máximo para ter um value entre 0.0 e 1.0
    var r = red / 255;
    var g = green / 255;
    var b = blue / 255;

    // Encontrar o value mínimo e máximo entre R, G e B
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);

    // Calcular o value da matriz (H)
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

    // Calcular a saturação (S)
    var s = (max == 0) ? 0 : ((max - min) / max);

    // Calcular o value (V)
    var v = max;

    // Arredondar os valuees HSV em um array, o S e o V são multiplicados por 100 para serem porcentagens e recebem uma casa decimal
    h = Math.round(h);
    s = (s * 100).toFixed(1);
    v = (v * 100).toFixed(1);

    // Exibir o result da conversão
    document.getElementById('result').innerHTML =
        `<div>
            <div style="font-size: 20px; color: #34a4eb;">HSV:</div>
            <div style="font-size: 16px;">H: ${h}°</div>
            <div style="font-size: 16px;">S: ${s}%</div>
            <div style="font-size: 16px;">V: ${v}%</div>
        </div>`;
}
function convertHSVparaRGB() {
    var hue = parseFloat(document.getElementById('hue').value);
    var saturation = parseFloat(document.getElementById('saturation').value);
    var value = parseFloat(document.getElementById('value').value);

    // Normalizar os valuees de S e V
    var s = saturation / 100;
    var v = value / 100;

    // Calcular o value de c, x e m
    var c = v * s;
    var x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    var m = v - c;

    // Calcular os valuees de R, G e B
    var rgbPrime;
    if (0 <= hue && hue < 60) {
        rgbPrime = [c, x, 0];
    } else if (60 <= hue && hue < 120) {
        rgbPrime = [x, c, 0];
    } else if (120 <= hue && hue < 180) {
        rgbPrime = [0, c, x];
    } else if (180 <= hue && hue < 240) {
        rgbPrime = [0, x, c];
    } else if (240 <= hue && hue < 300) {
        rgbPrime = [x, 0, c];
    } else if (300 <= hue && hue < 360) {
        rgbPrime = [c, 0, x];
    }

    // Calcular os valuees de R, G e B finais
    var r = (rgbPrime[0] + m) * 255;
    var g = (rgbPrime[1] + m) * 255;
    var b = (rgbPrime[2] + m) * 255;

    // Exibir o result da conversão
    document.getElementById('result').innerHTML =
        `<div>
            <div style="font-size: 20px; color: #34a4eb;">RGB:</div>
            <div style="font-size: 16px;">R: ${Math.round(r)}</div>
            <div style="font-size: 16px;">G: ${Math.round(g)}</div>
            <div style="font-size: 16px;">B: ${Math.round(b)}</div>
        </div>`;
}
function convertRGBparaCMYK() {
    var red = parseInt(document.getElementById('red').value);
    var green = parseInt(document.getElementById('green').value);
    var blue = parseInt(document.getElementById('blue').value);

    // Verificar se os campos de entrada estão preenchidos corretamente
    if (isNaN(red) || isNaN(green) || isNaN(blue)) {
        alert("Por favor, insira valuees numéricos válidos para RGB.");
        return;
    }

    // Convert RGB para CMYK
    var c = 1 - (red / 255);
    var m = 1 - (green / 255);
    var y = 1 - (blue / 255);
    var k = Math.min(c, Math.min(m, y));
    c = ((c - k) / (1 - k) * 100);
    m = ((m - k) / (1 - k) * 100);
    y = ((y - k) / (1 - k) * 100);
    k = Math.round(k * 100);

    // Arredonda os valuees CMYK para números inteiros
    var cmykArredondado = [c.toFixed(2), m.toFixed(2), y.toFixed(2), k.toFixed(2)];

    // result da conversão, editado o style
    document.getElementById('result').innerHTML =
        `<div>
        <div style="font-size: 20px; color: #34a4eb;">CMYK:</div>
        <div style="font-size: 16px;">C: ${cmykArredondado[0]}%</div>
        <div style="font-size: 16px;">M: ${cmykArredondado[1]}%</div>
        <div style="font-size: 16px;">Y: ${cmykArredondado[2]}%</div>
        <div style="font-size: 16px;">K: ${cmykArredondado[3]}%</div>
        </div>`;
}
function convertCMYKparaRGB() {
    var cyan = parseFloat(document.getElementById('cyan').value) / 100; // Alterado de 'red' para 'cyan'
    var magenta = parseFloat(document.getElementById('magenta').value) / 100; // Alterado de 'green' para 'magenta'
    var yellow = parseFloat(document.getElementById('yellow').value) / 100; // Alterado de 'blue' para 'yellow'
    var black = parseFloat(document.getElementById('black').value) / 100; // Adicionado o elemento 'black'

    // Calcula os valuees de RGB
    var red = 255 * (1 - cyan) * (1 - black);
    var green = 255 * (1 - magenta) * (1 - black);
    var blue = 255 * (1 - yellow) * (1 - black);

    // Exibe o result
    document.getElementById('result').innerHTML =
        `<div>
            <div style="font-size: 20px; color: #34a4eb;">RGB:</div>
            <div style="font-size: 16px;">R: ${red.toFixed(1)}</div>
            <div style="font-size: 16px;">G: ${green.toFixed(1)}</div>
            <div style="font-size: 16px;">B: ${blue.toFixed(1)}</div>
        </div>`;
}
function convertRGBparaCinza() {
    var red = parseInt(document.getElementById('red').value);
    var green = parseInt(document.getElementById('green').value);
    var blue = parseInt(document.getElementById('blue').value);

    // Verificar se os campos de entrada estão preenchidos corretamente
    if (isNaN(red) || isNaN(green) || isNaN(blue)) {
        alert("Por favor, insira valuees numéricos válidos para RGB.");
        return;
    }

    // Calcular a média dos valuees RGB para obter a intensidade da escala de cinza
    var cinza = (red + green + blue) / 3;

    // Exibir o resultado em escala de cinza
    document.getElementById('result').innerHTML =
        `<div>
            <div style="font-size: 20px; color: #34a4eb;">Escala de Cinza:</div>
            <div style="font-size: 16px;">${cinza.toFixed(1)}</div>
        </div>`;
}
