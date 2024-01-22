import { generateReturnsArray } from "./src/investimentGoals";

// Declarando uma variável para receber uma referencia do "id" do botäo do HTML
// const calculeButton = document.getElementById("calculate-results");  
// foi substituida pelo const form = document.getElementById("investiment-form"); 
// A explicaçäo sobre a substituiçäo encontra-se no arquivo ProjetoCalculadoraInvestimento.txt 

// const form = document.getElementById("investiment-form"); 
// form = document.getElementById("investiment-form"); vai ser substituida porque o próprio 
// botäo é q vai disparar o submit, aliás isso foi por causa da declaraçäo de type="submit" 
// no HTML <button id="calculate-results" form="investiment-form" type="submit"...>

const form = document.getElementById("investiment-form"); 

// pelo fato de ter declarado type="submit" do botäo "Calcular" no HTML
// <button id="calculate-results" .. com isso, se pode capturar uma referencia dele com 
// const calculateButton = document.getElementById("calculate-results");
// com isso, ao invés do form disparar o submit, é o próprio botäo que vai fazer isso,
// como na linha bem abaixo deste arq: calculateButton.addEventListener('click', renderProgression);
// const calculateButton = document.getElementById("calculate-results");

// as duas linhas se equivalem 
// const form = document.getElementById("investiment-form"); 
// const calculateButton = document.getElementById("calculate-results");
// Para deixar na forma original comentemos a linha const calculateButton = document.getElementById("calculate-results");

function renderProgression(evt){
// 1- Declarar uma referencia e capturar valor para cada input do formulário  
// =========================================================================================
// OBS: esses valores sâo textos, entâo para usá-los devem se transformados em números
// =========================================================================================
// MACETE PARA EDITAR 2 OU + PALAVRAS : selecione um "caracter", CTRL + D + SETA PARA BAIXO
// O CTRL + D seleciona o próximo elemento iluminado, ou seja, faz com q tenha + 1 cursor
// =========================================================================================
// Selecionando uma linha + ALT + SETA PARA CIMA OU PRA BAIXO, MUDA DE POSICAO
// =========================================================================================

evt.preventDefault();   // traduçäo: "NAO EXECUTE O COMPORTAMENTO PADRAO" 

// Ao declarar os name="" no HTML .. se pode conseguir 
// investimento inicial desta maneira também 
// A T E N C A O - O U T R A  F O R M A  DE  C A P T U R A R  1  R E F E R E N C I A 
// const startingAmount = Number(form["starting-amount"].value);

// investimento inicial
const startingAmount = Number(document.getElementById("startingAmount").value);

// aporte mensal
const additionalcontribution = Number(document.getElementById("additional-contribution").value);

// prazo (tempo) de investimento
const timeAmount = Number(document.getElementById("time-amount").value);
// time-amount-period pode ser mes ou ano (obtém no select)
const timeAmountPeriod = document.getElementById("time-amount-period").value;

// Taxa de retorno do investimento
const returnRate = Number(document.getElementById("return-rate").value);
// Tipo da Taxa de retorno do investimento que pode ser mes ou ano (obtém no select)
const returnRatePeriod = document.getElementById("evaluation-period").value;

// Taxa de Imposto sobre lucro 
// Ex: 15%
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

// Ao disparar este programa , o que vai ser executado inicia-se aqui..
// calculateButton.addEventListener('click', renderProgression); 
// foi substituida pelo form.addEventListener('submit', renderProgression); para 
// evitar o "apagamento" dos campos de input do formulário.
// A explicaçäo sobre a substituiçäo encontra-se no arquivo ProjetoCalculadoraInvestimento.txt  

// form.addEventListener('submit', renderProgression); vai ser substituida de novo, por causa
// da declaraçäo da propriedade - type="submit" - no botäo "calculate-results" no HTML
// e devido a esta linha const calculateButton = document.getElementById("calculate-results");
// a linha form.addEventListener('submit', renderProgression); deixará de ter efeito.

// essas 2 linhas se equivalem  
// ===========================
// calculateButton.addEventListener('click', renderProgression);
// form.addEventListener('submit', renderProgression);

form.addEventListener('submit', renderProgression);

