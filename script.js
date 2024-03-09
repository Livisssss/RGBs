// Função para 'reiniciar' a tela sempre que um tipo de conversão foi selecionada
function atualizarTipoConversao() {
    // Pegar os elementos a serem utilizados
    var tipoConversaoSelect = document.getElementById("tipoConversao");
    var redInput = document.getElementById('red');
    var greenInput = document.getElementById('green');
    var blueInput = document.getElementById('blue');
    var resultDiv = document.getElementById('result');


    // Limpar os campos de input, se estiverem presentes
    limparCampos();

    // Limpar o conteúdo do resultado
    resultDiv.innerHTML = "";

    // Atualizar os labels conforme a seleção de conversão
    alterarLabels();

    // Chamar a função limitarEntrada() para cada campo de input com o novo tipo de conversão
    if (redInput && greenInput && blueInput) {
        limitarEntrada(redInput, tipoConversaoSelect.value);
        limitarEntrada(greenInput, tipoConversaoSelect.value);
        limitarEntrada(blueInput, tipoConversaoSelect.value);
    }

    // Verificar se todos os elementos necessários foram encontrados
    if (!tipoConversaoSelect || !redInput || !greenInput || !blueInput || !resultDiv) {
        console.error("Um ou mais elementos não foram encontrados:");
        console.log("redInput:", redInput);
        console.log("greenInput:", greenInput);
        console.log("blueInput:", blueInput);
        return;
    }

    // Para depois que sair da opção CMYK para RGB, a rotina de 'limpeza' seja ativada
    if (tipoConversaoSelect.value !== 'CMYKpRGB') {
        limparCampos();
    }
}

// Função para limpar todos os campos de input
function limparCampos() {
    var redInput = document.getElementById('red');
    var greenInput = document.getElementById('green');
    var blueInput = document.getElementById('blue');
    var hueInput = document.getElementById("hue");
    var saturationInput = document.getElementById("saturation");
    var valueInput = document.getElementById("value");
    var cyanInput = document.getElementById('cyan');
    var magentaInput = document.getElementById("magenta");
    var yellowInput = document.getElementById("yellow");
    var blackInput = document.getElementById("black");

    if (inputPreto) {
        inputPreto.style.display = "none";
    }
    if (redInput) {
        redInput.value = "";
    }
    if (greenInput) {
        greenInput.value = "";
    }
    if (blueInput) {
        blueInput.value = "";
    }
    if (hueInput) {
        hueInput.value = "";
    }
    if (saturationInput) {
        saturationInput.value = "";
    }
    if (valueInput) {
        valueInput.value = "";
    }
    if (cyanInput) {
        cyanInput.value = "";
    }
    if (magentaInput) {
        magentaInput.value = "";
    }
    if (yellowInput) {
        yellowInput.value = "";
    }
    if (blackInput) {
        blackInput.value = "";
    }
}

// Função para mudar o layout de acordo com a conversão
function alterarLabels() {
    // Buscar o tipo de conversão selecionado
    var tipoConversao = document.getElementById("tipoConversao").value;

    // Caso for uma conversão HSV para RGB, o label trocará de RGB para a descrição de HSV, além disso muda o nome do id do campo input, para ser aplicado o limite de valor
    if (tipoConversao === "HSVpRGB") {
        var redLabel = document.querySelector("label[for='red']");
        var greenLabel = document.querySelector("label[for='green']");
        var blueLabel = document.querySelector("label[for='blue']");
        if (redLabel && greenLabel && blueLabel) {
            redLabel.textContent = "H (°):";
            greenLabel.textContent = "S (%):";
            blueLabel.textContent = "V (%):";
        }
        var redInput = document.getElementById("red");
        var greenInput = document.getElementById("green");
        var blueInput = document.getElementById("blue");
        if (redInput && greenInput && blueInput) {
            redInput.id = "hue";
            greenInput.id = "saturation";
            blueInput.id = "value";
        }
    // Caso for uma conversão CMYK para RGB, o label trocará de RGB para a descrição de CMYK e será inserido o campo BLACK, aqui pelo js, além disso muda o nome do id do campo input, para ser aplicado o limite de valor
    } else if (tipoConversao === "CMYKpRGB") {
        var redLabel = document.querySelector("label[for='red']");
        var greenLabel = document.querySelector("label[for='green']");
        var blueLabel = document.querySelector("label[for='blue']");
        if (redLabel && greenLabel && blueLabel) {
            redLabel.textContent = "Ciano (%):";
            greenLabel.textContent = "Magenta (%):";
            blueLabel.textContent = "Amarelo (%):";
            document.getElementById("inputPreto").style.display = "block";
        }
        var redInput = document.getElementById("red");
        var greenInput = document.getElementById("green");
        var blueInput = document.getElementById("blue");
        if (redInput && greenInput && blueInput) {
            redInput.id = "cyan";
            greenInput.id = "magenta";
            blueInput.id = "yellow";
            document.getElementById("inputPreto").style.display = "block";
        }
    // Caso for as demais conversões o label permanece RGB ou voltará a ser RGB
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
        var redInput = document.getElementById("hue");
        var greenInput = document.getElementById("saturation");
        var blueInput = document.getElementById("value");
        if (redInput && greenInput && blueInput) {
            redInput.id = "red";
            greenInput.id = "green";
            blueInput.id = "blue";
        }
        var redInput = document.getElementById("cyan");
        var greenInput = document.getElementById("magenta");
        var blueInput = document.getElementById("yellow");
        if (redInput && greenInput && blueInput) {
            redInput.id = "red";
            greenInput.id = "green";
            blueInput.id = "blue";
        }
    }
}

// Função para limitar o valor do input de acordo com a conversão
function limitarEntrada(elemento, tipoConversao) {
    // Identifica o valor inserido
    var value = parseInt(elemento.value);
    var valueMaximo = 255; // Valor max para RGB

    // Se for de tipo HSV, hue vale 359 e value e saturation valem 100
    if (tipoConversao === 'HSVpRGB') {
        if (elemento.id === 'hue') { // H
            valueMaximo = 359;
        } else if (elemento.id === 'value' || elemento.id === 'saturation') { // S e V
            valueMaximo = 100;
        }
    // Se for de tipo RGB fica max 255
    } else if (tipoConversao === 'RGBpHSV') {
        valueMaximo = 255;
    // Se for de tipo HSVCMYK, deve valer 100 pois se trata de valores em porcentagem
    } else if (tipoConversao === 'CMYKpRGB') {
        valueMaximo = 100;
    }

    // Verifica se o elemento existe antes de tentar acessar sua propriedade value
    if (elemento && value > valueMaximo) {
        elemento.value = valueMaximo;
    }
}

// Valida o tipo de conversão selecionado e aplica a função de cálculo para ele
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

//Funções de cálculo
// OK ------------------------------------------
function convertNormalizaRGB() {
    // Pegar o valor dos numeros digitados
    var red = parseInt(document.getElementById('red').value);
    var green = parseInt(document.getElementById('green').value);
    var blue = parseInt(document.getElementById('blue').value);

    // Limitar os valores de input RGB a um máximo de 255
    red = Math.min(red, 255);
    green = Math.min(green, 255);
    blue = Math.min(blue, 255);

    // Verificar se os campos de input estão preenchidos corretamente
    if (isNaN(red) || isNaN(green) || isNaN(blue)) {
        alert("Por favor, insira valores numéricos válidos para RGB.");
        return;
    }
   
    // Somar os valores de R, G e B
    var soma = red + green + blue;

    // Normalizar os valores dividindo pelo total
    var resRed = (red / soma);
    var resGreen = (green / soma);
    var resBlue = (blue / soma);

    // Função para setar o valor 0 caso ele for NaN (dividido por zero)
    function seNan(valor) {
        if (isNaN(valor)) {
            valor = 0;
        } else {
            valor = valor;
        }
        return valor
    }
   
    // Aplicar função de validação NaN
    var resRed = seNan(resRed);
    var resGreen = seNan(resGreen);
    var resBlue = seNan(resBlue);


    // Arredondar os valores com uma casa decimal
    resRed = resRed.toFixed(2);
    resGreen = resGreen.toFixed(2);
    resBlue = resBlue.toFixed(2);

    // Exibir o result da conversão
    document.getElementById('result').innerHTML = `
        <div>
            <div style="font-size: 20px; color: #34a4eb;">RGB normalizado:</div>
            <div style="font-size: 16px;">R: ${resRed}</div>
            <div style="font-size: 16px;">G: ${resGreen}</div>
            <div style="font-size: 16px;">B: ${resBlue}</div>
        </div>`;
}
// OK ------------------------------------------
function convertRGBparaHSV() {
    // Pegar o valor dos numeros digitados
    var red = parseInt(document.getElementById('red').value);
    var green = parseInt(document.getElementById('green').value);
    var blue = parseInt(document.getElementById('blue').value);

    // Verificar se os campos de input estão preenchidos corretamente
    if (isNaN(red) || isNaN(green) || isNaN(blue)) {
        alert("Por favor, insira valores numéricos válidos para RGB.");
        return;
    }
    
    // Dividir os valores R, G e B pelo seu value máximo para ter um value entre 0.0 e 1.0
    var r = red / 255;
    var g = green / 255;
    var b = blue / 255;

    // Encontrar o value mínimo e máximo entre R, G e B
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);

    // Calcular o value da matriz (H)
    var h;
    if (max == r && g >= b) {
        h = 60 * ((g - b) / (max - min)) + 0;
    } else if (max == r && g < b) {
        h = 60 * ((g - b) / (max - min)) + 360;
    } else if (max == g) {
        h = 60 * ((b - r) / (max - min)) + 120;
    } else if (max == b) {
        h = 60 * ((r - g) / (max - min)) + 240;
    }

    // Calcular a saturação (S)
    var s = ((max - min) / max);

    // Calcular o valor (V)
    var v = max;

    // Função para setar o valor 0 caso ele for NaN (dividido por zero)
    function seNan(valor) {
        if (isNaN(valor)) {
            valor = 0;
        } else {
            valor = valor;
        }
        return valor
    }
   
    // Aplica a função de validação NaN
    var h = seNan(h);
    var s = seNan(s);
    var v = seNan(v);

    // Arredondar os valores HSV em um array, o S e o V são multiplicados por 100 para serem porcentagens e recebem uma casa decimal
    h = Math.round(h);
    s = (s * 100).toFixed(1);
    v = (v * 100).toFixed(1);

    // Exibir o result da conversão
    document.getElementById('result').innerHTML = `
        <div>
            <div style="font-size: 20px; color: #34a4eb;">HSV:</div>
            <div style="font-size: 16px;">H: ${h}°</div>
            <div style="font-size: 16px;">S: ${s}%</div>
            <div style="font-size: 16px;">V: ${v}%</div>
        </div>`;
}
// OK ------------------------------------------
function convertHSVparaRGB() {
    // Pegar o valor dos numeros digitados
    var hue = parseFloat(document.getElementById('hue').value);
    var saturation = parseFloat(document.getElementById('saturation').value);
    var value = parseFloat(document.getElementById('value').value);

    // Verificar se os campos de input estão preenchidos corretamente
    if (isNaN(hue) || isNaN(saturation) || isNaN(value)) {
        alert("Por favor, insira valores numéricos válidos para HSV.");
        return;
    }

    // Deixa os valores de S e V entre 0 e 1
    var s = saturation / 100;
    var v = value / 100;

    // Calcular o value de c, x e m
    var c = v * s;
    var x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    var m = v - c;

    // Calcular os valores de R, G e B
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

    // Calcular os valores de R, G e B finais
    var r = (rgbPrime[0] + m) * 255;
    var g = (rgbPrime[1] + m) * 255;
    var b = (rgbPrime[2] + m) * 255;

    // Exibir o result da conversão
    document.getElementById('result').innerHTML = `
        <div>
            <div style="font-size: 20px; color: #34a4eb;">RGB:</div>
            <div style="font-size: 16px;">R: ${Math.round(r)}</div>
            <div style="font-size: 16px;">G: ${Math.round(g)}</div>
            <div style="font-size: 16px;">B: ${Math.round(b)}</div>
        </div>`;
}
// OK ------------------------------------------
function convertRGBparaCMYK() {
    // Pegar o valor dos numeros digitados
    var red = parseInt(document.getElementById('red').value);
    var green = parseInt(document.getElementById('green').value);
    var blue = parseInt(document.getElementById('blue').value);

    // Verificar se os campos de input estão preenchidos corretamente
    if (isNaN(red) || isNaN(green) || isNaN(blue)) {
        alert("Por favor, insira valores numéricos válidos para RGB.");
        return;
    }

    // Mudar os valores de RGB para de 0 a 1
    var r = (red/255);
    var g = (green/255);
    var b = (blue/255);

    // Calculados os valores de blacK, Cyan, Magente e Yellow
    var k = 1 - Math.max(r, g, b);
    var c = (1-r-k) / (1-k);
    var m = (1-g-k) / (1-k);
    var y = (1-b-k) / (1-k);

    // Função para setar o valor 0 caso ele for NaN (dividido por zero)
    function seNan(valor) {
        if (isNaN(valor)) {
            valor = 0;
        } else {
            valor = valor;
        }
        return valor
    }
   
    // Aplicada a função para NaN    
    var c = seNan(c);
    var m = seNan(m);
    var y = seNan(y);
    var k = seNan(k);

    // Resultado da conversão e editado o style
    document.getElementById('result').innerHTML = `
        <div>
            <div style="font-size: 20px; color: #34a4eb;">CMYK:</div>
            <div style="font-size: 16px;">C: ${c.toFixed(2)}</div>
            <div style="font-size: 16px;">M: ${m.toFixed(2)}</div>
            <div style="font-size: 16px;">Y: ${y.toFixed(2)}</div>
            <div style="font-size: 16px;">K: ${k.toFixed(2)}</div>
        </div>`;
}
// OK ------------------------------------------
function convertCMYKparaRGB() {
    // Pegar o valor dos numeros digitados
    var cyan = parseFloat(document.getElementById('cyan').value) / 100;
    var magenta = parseFloat(document.getElementById('magenta').value) / 100;
    var yellow = parseFloat(document.getElementById('yellow').value) / 100;
    var black = parseFloat(document.getElementById('black').value) / 100;

    // Verificar se os campos de input estão preenchidos corretamente
    if (isNaN(cyan) || isNaN(magenta) || isNaN(yellow) || isNaN(black)) {
        alert("Por favor, insira valores numéricos válidos para CYMK.");
        return;
    }

    // Calcula os valores de RGB
    var red = 255 * (1 - cyan) * (1 - black);
    var green = 255 * (1 - magenta) * (1 - black);
    var blue = 255 * (1 - yellow) * (1 - black);

    // Exibe o resultado e habilita uma c
    document.getElementById('result').innerHTML =
        `<div>
            <div style="font-size: 20px; color: #34a4eb;">RGB:</div>
            <div style="font-size: 16px;">R: ${ Math.round(red)}</div>
            <div style="font-size: 16px;">G: ${ Math.round(green)}</div>
            <div style="font-size: 16px;">B: ${ Math.round(blue)}</div>
        </div>`;
}




function convertRGBparaCinza() {
    // Pegar o valor dos numeros digitados
    var red = parseInt(document.getElementById('red').value);
    var green = parseInt(document.getElementById('green').value);
    var blue = parseInt(document.getElementById('blue').value);

    // Verificar se os campos de input estão preenchidos corretamente
    if (isNaN(red) || isNaN(green) || isNaN(blue)) {
        alert("Por favor, insira valores numéricos válidos para RGB.");
        return;
    }

    // Calcular a média dos valores RGB para obter a intensidade da escala de cinza
    var cinza = (red + green + blue) / 3;

    // Exibir o resultado em escala de cinza
    document.getElementById('result').innerHTML =
        `<div>
            <div style="font-size: 20px; color: #34a4eb;">Escala de Cinza:</div>
            <div style="font-size: 16px;">${cinza.toFixed(1)}</div>
        </div>`;
}
