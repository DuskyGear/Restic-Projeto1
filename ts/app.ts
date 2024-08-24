import { informacao, data } from './dados.js';

// Seletores de elementos HTML
const imcTable: HTMLDivElement = document.querySelector("#tabela-imc") as HTMLDivElement;
const inputAltura: HTMLInputElement = document.querySelector("#altura") as HTMLInputElement;
const inputPeso: HTMLInputElement = document.querySelector("#peso") as HTMLInputElement;
const botaoCalcular: HTMLButtonElement = document.querySelector("#botao-calcular") as HTMLButtonElement;
const botaoLimpar: HTMLButtonElement = document.querySelector("#botao-limpar") as HTMLButtonElement;
const numeroIMC: HTMLSpanElement = document.querySelector("#numero-imc span") as HTMLSpanElement;
const informacaoIMC: HTMLSpanElement = document.querySelector("#informacao-imc span") as HTMLSpanElement;
const botaoVoltar: HTMLButtonElement = document.querySelector("#botao-voltar") as HTMLButtonElement;
const containerCalculadora: HTMLDivElement = document.querySelector("#calculadora-container") as HTMLDivElement;
const containerResultado: HTMLDivElement = document.querySelector("#resultado-container") as HTMLDivElement;
const containerImagem: HTMLDivElement = document.querySelector("#container-imagem") as HTMLDivElement;
const imagem: HTMLImageElement = document.querySelector("#imagem-imc img") as HTMLImageElement;
const pesoIdealMinimo: HTMLSpanElement = document.querySelector("#peso-minimo") as HTMLSpanElement;
const pesoIdealMaximo: HTMLSpanElement = document.querySelector("#peso-maximo") as HTMLSpanElement;

// Cria a tabela de informações com base nos dados fornecidos
function criarTabelaInfo(informacao: data[]): void {
    informacao.forEach((item: data) => {
        const div: HTMLDivElement = criarDiv();
        div.classList.add("dados-tabela");

        const classificacao: HTMLParagraphElement = criarParagrafo();
        classificacao.innerText = item.classificacao;

        const informacao: HTMLParagraphElement = criarParagrafo();
        informacao.innerText = item.info;

        const obesity: HTMLParagraphElement = criarParagrafo();
        obesity.innerText = item.obesity;

        div.appendChild(classificacao);
        div.appendChild(informacao);
        div.appendChild(obesity);

        imcTable.appendChild(div);
    });
}

// Cria um elemento <div>
function criarDiv(): HTMLDivElement {
    const div = document.createElement("div");
    return div;
}

// Cria um elemento <p>
function criarParagrafo(): HTMLParagraphElement {
    const paragrafo = document.createElement("p");
    return paragrafo;
}

// Limpa os valores dos inputs
function limparImputs(): void {
    inputAltura.value = "";
    inputPeso.value = "";
}

// Inicialização: cria a tabela de informações
criarTabelaInfo(informacao);

// Eventos

// Limpa os inputs quando o botão de limpar é clicado
botaoLimpar.addEventListener("click", (evento) => {
    evento.preventDefault();
    limparImputs();
});

// Volta à calculadora e limpa os inputs quando o botão de voltar é clicado
botaoVoltar.addEventListener("click", () => {
    limparImputs();
    mostrarOResconderResultados();
});

// Calcula e exibe o IMC quando o botão de calcular é clicado
botaoCalcular.addEventListener("click", (evento) => {
    evento.preventDefault();

    const peso: number = +inputPeso.value.replace(",", ".");
    const altura: number = +inputAltura.value.replace(",", ".");

    if (!peso || !altura) {
        return;
    }

    const imc: string = calcularIMC(altura, peso);
    let resultado: string = verificarResultado(imc);

    if (!resultado) {
        return;
    }

    numeroIMC.innerHTML = imc;
    informacaoIMC.innerHTML = resultado;

    const pesoIdeal: number[] = calcularPesoIdeal(altura);

    pesoIdealMinimo.innerHTML = (pesoIdeal[0]).toFixed(1) + " KG";
    pesoIdealMaximo.innerHTML = (pesoIdeal[1]).toFixed(1) + " KG";

    estilizarResultado(resultado);
    mostrarOResconderResultados();
});

// Verifica a classificação do IMC
function verificarResultado(imc: string): string {
    let resultado: string = "";

    informacao.forEach((item: data) => {
        if (imc >= item.min.toString() && imc <= item.max.toString()) {
            resultado = item.info;
        }
    });

    return resultado;
}

// Calcula o IMC
function calcularIMC(altura: number, peso: number): string {
    const imc: string = (peso / (altura * altura)).toFixed(1);
    return imc;
}

// Alterna a visibilidade dos resultados e da calculadora
function mostrarOResconderResultados(): void {
    containerCalculadora.classList.toggle("hide");
    containerResultado.classList.toggle("hide");
    containerImagem.classList.toggle("hide");
}

// Calcula o peso ideal baseado na altura
function calcularPesoIdeal(altura: number): number[] {
    const imcMin: number = 18.5;
    const imcMax: number = 24.9;

    const pesoMin: number = imcMin * altura * altura;
    const pesoMax: number = imcMax * altura * altura;

    return [pesoMin, pesoMax];
}

// Estiliza o resultado com base na classificação do IMC
function estilizarResultado(resultado: string): void {
    switch (resultado) {
        case "Magreza":
            limparEstilizacaoCampo();
            numeroIMC.classList.add("leve");
            informacaoIMC.classList.add("leve");
            imagem.src = './img/magreza.png';
            break;
        case "Normal":
            limparEstilizacaoCampo();
            numeroIMC.classList.add("bom");
            informacaoIMC.classList.add("bom");
            imagem.src = './img/normal.png';
            break;
        case "Sobrepeso":
            limparEstilizacaoCampo();
            numeroIMC.classList.add("alterado");
            informacaoIMC.classList.add("alterado");
            imagem.src = './img/sobrepeso.png';
            break;
        case "Obesidade":
            limparEstilizacaoCampo();
            numeroIMC.classList.add("ruim");
            informacaoIMC.classList.add("ruim");
            imagem.src = './img/obesidade.png';
            break;
        case "Obesidade grave":
            limparEstilizacaoCampo();
            numeroIMC.classList.add("muito-ruim");
            informacaoIMC.classList.add("muito-ruim");
            imagem.src = './img/obesidade-grave.png';
            break;
    }
}

function limparEstilizacaoCampo(): void {
        // Remove todas as classes adicionadas anteriormente dos elementos
        numeroIMC.className = "";
        informacaoIMC.className = "";
        
        // Adiciona novas classes se necessário (você pode modificar isso conforme necessário)
        // numeroIMC.classList.add("nova-classe"); // Exemplo de adição de nova classe
        // informacaoIMC.classList.add("nova-classe"); // Exemplo de adição de nova classe
    }

