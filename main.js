import { generateReturnsArray } from "./src/investimentGoals";

const calculeButton = document.getElementById("calculate-results");


function renderProgression(){
// 1- pegar cada referencia do formulário e capturar seus valores
// =========================================================================================
// OBS: esses valores sâo textos, entâo para usá-los devem se transformados em números
// =========================================================================================
// MACETE PARA EDITAR 2 OU + PALAVRAS : selecione um "caracter", CTRL + D + SETA PARA BAIXO
// O CTRL + D seleciona o próximo elemento iluminado, ou seja, faz com q tenha + 1 cursor
// =========================================================================================
// Selecionando uma linha + ALT + SETA PARA CIMA OU PRA BAIXO, MUDA DE POSICAO
// =========================================================================================

// investimento inicial
const startingAmount = Number(document.getElementById("starting-amount").value);
// aporte mensal
const additionalcontribution = Number(document.getElementById("additional-contribution").value);

// prazo (tempo) de investimento
const timeAmount = Number(document.getElementById("time-amount").value);
// time-amount-period pode ser mes ou ano (obtém no select)
const timeAmountPeriod = document.getElementById("time-amount-period").value;

// Taxa de retorno do investimento
const returnRate = Number(document.getElementById("return-rate").value);
// Unidade da Taxa de retorno do investimento que pode ser mes ou ano (obtém no select)
const returnRatePeriod = document.getElementById("evaluation-period").value;

// Imposto sobre o lucro 
const taxRate = Number(document.getElementById("tax-rate").value);

// parei em 12:47 
// investimento inicial, prazo, flag prazo, aporte, Rentabilidade, flag Rentabilidade
const returnsArray = generateReturnsArray(startingAmount, 
                     timeAmount,
                     timeAmountPeriod,
                     additionalcontribution,
                     returnRate,
                     returnRatePeriod
                    );

console.log(returnsArray);

}

calculeButton.addEventListener('click', renderProgression);