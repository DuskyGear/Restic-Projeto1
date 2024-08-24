// Define a estrutura de dados para as informações de IMC
export interface data {
    min: number, // Valor mínimo do IMC para a faixa
    max: number, // Valor máximo do IMC para a faixa
    classificacao: string, // Classificação textual da faixa de IMC
    info: string, // Informação sobre a faixa de IMC
    obesity: string // Código de obesidade associado à faixa de IMC
}

// Lista de informações de IMC e suas classificações
export const informacao: data[] = [
    {
        min: 0,
        max: 18.4,
        classificacao: "Menor que 18,5",
        info: "Magreza",
        obesity: "0",
    },
    {
        min: 18.5,
        max: 24.9,
        classificacao: "Entre 18,5 e 24,9",
        info: "Normal",
        obesity: "0",
    },
    {
        min: 25,
        max: 29.9,
        classificacao: "Entre 25,0 e 29,9",
        info: "Sobrepeso",
        obesity: "I",
    },
    {
        min: 30,
        max: 39.9,
        classificacao: "Entre 30,0 e 39,9",
        info: "Obesidade",
        obesity: "II",
    },
    {
        min: 40,
        max: 99,
        classificacao: "Maior que 40,0",
        info: "Obesidade grave",
        obesity: "III",
    }
];
