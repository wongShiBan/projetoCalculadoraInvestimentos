import { generateReturnsArray } from "./src/investimentGoals";
import {Chart} from "chart.js/auto";  // este endereço vem da própria documentaçäo

// Declarando uma variável para receber uma referencia do "id" do botäo do HTML
// const calculeButton = document.getElementById("calculate-results");  
// foi substituida pelo const form = document.getElementById("investiment-form"); 
// A explicaçäo sobre a substituiçäo encontra-se no arquivo ProjetoCalculadoraInvestimento.txt 

// const form = document.getElementById("investiment-form"); 
// form = document.getElementById("investiment-form"); vai ser substituida porque o próprio 
// botäo é q vai disparar o submit, aliás isso foi por causa da declaraçäo de type="submit" 
// no HTML <button id="calculate-results" form="investiment-form" type="submit"...>

const finalMoneyChart  = document.getElementById("final-money-contribution");
const progressionChart = document.getElementById("progression");
 
const form = document.getElementById("investiment-form"); 
const clearFormButton = document.getElementById("clear-form"); 

// let qdo o valor é variável
let doughnutChartReference = {};   
let progressionChartReference = {};

// Formataçäo de valores númericos 
function formatCurrency(value){ 
  return value.toFixed(2);      // casas decimais            
}

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

if (document.querySelector('.error'))    // .error, o ponto indica classe
{  // se no documento HTML encontrar alguma classe ".error", isso indica que houve algum erro
   // num campo input, logo, qdo isso acontecer, deve interromper o processamento dos investimentos.
   return;                 
}

resetCharts();

// investimento inicial - Para facilitar o usuário com o uso do método replace (Aula 17)
// const startingAmount = Number(document.getElementById("starting-amount").value);
const startingAmount = Number(document.getElementById("starting-amount").value.replace(",","."));

// aporte mensal
const additionalcontribution = Number(document.getElementById("additional-contribution").value.replace(",","."));

// prazo (tempo) de investimento - sempre vai ser inteiro
const timeAmount = Number(document.getElementById("time-amount").value);
// time-amount-period pode ser mes ou ano (obtém no select)
const timeAmountPeriod = document.getElementById("time-amount-period").value;

// Taxa de retorno do investimento
const returnRate = Number(document.getElementById("return-rate").value.replace(",","."));
// Tipo da Taxa de retorno do investimento que pode ser mes ou ano (obtém no select)
const returnRatePeriod = document.getElementById("evaluation-period").value;

// Taxa de Imposto sobre lucro 
// Ex: 15%
const taxRate = Number(document.getElementById("tax-rate").value.replace(",","."));

// parei em 12:47 
// investimento inicial, prazo, flag prazo, aporte, Rentabilidade, flag Rentabilidade
// Aqui encontram-se as informaçöes necessárias para plotar os gráficos.
// returnsArray é uma array que contém cada iteraçäo do prazo. 
const returnsArray = generateReturnsArray(
                     startingAmount, 
                     timeAmount,
                     timeAmountPeriod,
                     additionalcontribution,
                     returnRate,
                     returnRatePeriod
                    );

// console.log(returnsArray); foi por uma necessidade temporária para entendimento do projeto 
//  
// uma vez que os dados seräo mostrados em gráficos entäo
// console.log(returnsArray); näo terá mais validade.

// Para plotar no gráfico, o que precisa säo os valores da última iteraçäo 
const finalInvestimentObject = returnsArray[returnsArray.length-1];

// Passar 2 variáveis para este construtor
// { } corresponde um objeto 
// finalMoneyChart é id dado a uma canva no HTML

doughnutChartReference = new Chart(finalMoneyChart, {
   type: 'doughnut',
   data:  {
      labels: [
        //'Red',
        //'Blue',
        //'Yellow'
        'Total investido',
        'Rendimento líquido',
        'Imposto'
      ],
      datasets: [{
        // label: 'My First Dataset', // suprimir esta linha 
        // como tem 3 cores ou partes, entáo, 300, 50, 100 
        // correspondem os %s das partes que compöem o chart 
        // data: [300, 50, 100],  

        // Rendimento líquido
        // finalInvestimentObject.totalInterestReturns*(1-taxRate/100)

        // poderia ser visto assim: 
        // finalInvestimentObject.totalInterestReturns - 
        // finalInvestimentObject.totalInterestReturns*taxRate/100

        data: [
               formatCurrency(finalInvestimentObject.investedAmount), 
               formatCurrency(finalInvestimentObject.totalInterestReturns*(1-taxRate/100)), 
               formatCurrency(finalInvestimentObject.totalInterestReturns*(taxRate/100))
              ],  
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    },
});

// 
progressionChartReference = new Chart (progressionChart,{
  type: 'bar',
  data: {
    labels: returnsArray.map(investObject => investObject.month),
    datasets: [{
      label: 'Total Investido',
      // map -> ele pega uma lista e gera outra lista do mesmo tamanho em funcao de uma condicao
      // entre as duas.  
      // returnsArray retorna com todos os dados de investimento, mes a mes, de acordo com o prazo de 
      // investimento   
      // investedAmount = startingAmount + monthlyContribution * timeReference;
      data: returnsArray.map (investObject => formatCurrency(investObject.investedAmount)),    
      // o primeiro investObject representa a cada objeto da lista original e
      // investObject.investedAmount é o dado que vai ser entregue à nova lista 
      backgroundColor: 'rgb(255, 99, 132)'
    },{
      label: 'Retorno do Investimento',
      // interestReturns = returnsArray[timeReference-1].totalAmount * (finalReturnRate - 1);
      data: returnsArray.map (investObject => formatCurrency(investObject.interestReturns)),
      backgroundColor: 'rgb(54, 162, 235)'
    } ]    
  },
  options: {
    plugins: {
      title: {  
        display: true,
        text: 'Chart.js Bar Chart - Stacked'
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
         }
        }
      }
  })
}

function isObjectEmpty (obj){
  // Object se refere "entidade" do objeto  
  // com isso, return retorna uma lista de todas as chaves que compöe o objeto
  // name: 'ddd', endereco: 'ksss'
  // name, endereco.. etc ?!
  // É um Booleano e isso será verdadeiro qdo for 1 objeto vazio        
 return Object.keys(obj).length===0;          
}

function resetCharts(){
// a intençäo de resetar é qdo os 2 näo forem vazios 
if (!isObjectEmpty(doughnutChartReference) && !isObjectEmpty(progressionChartReference)){
  // destroy() é um método que existe nos objetos Charts (classe)
  doughnutChartReference.destroy(); 
  progressionChartReference.destroy();
}
}


// Limpando o formulário com ou sem msgs de erro na tela
function clearForm(){
  form['starting-amount'].value = '';
  form['additional-contribution'].value = '';
  form['time-amount'].value = '';
  form['return-rate'].value = '';
  form['tax-rate'].value = '';

  resetCharts();

// errorInputContainers se refere à divisäo toda do formulário que contém a classe ".error" 
// e onde tem essa classe ? Resp: na div_pai que engloba vários inputs 
// Qdo se usa querySelector, o argumento passado deve indicar o tipo de seletor e o seu nome
  const errorInputContainers = document.querySelectorAll('.error');

  for (const errorInputContainer of errorInputContainers){
    // errorInputContainer é o item corrente da lista de errorInputContainers
    // e errorInputContainers se refere à div_pai, mas, é preciso tirar tbém os erros do avô
    errorInputContainer.classList.remove('error');

    // Procurar pelo pai do errorInputContainer que é no caso é o parentElement
    errorInputContainer.parentElement.querySelector('p').remove();
  }
}


function inputValidate(evt){ 
  // evt é o nome do objeto do evento  
  // target é sempre o campo em que está sendo submetido ao evento "blur"
  // Náo há necessidade de criticar caso o campo estiver em branco porque no HTML já critica
  if (evt.target.value === '') {
    return;
  }

  // Antes de prosseguir .. para exibir a msg de erro e pintar a borda de vermelho do campo..
  // é preciso capturar o elemento_pai e elemento_avó deste evento "blur"
  // elemento_avó é por causa da msg e pai é por causa da pintura da borda 

  const {parentElement} = evt.target;
  const grandParentElement = evt.target.parentElement.parentElement;
  const inputValue = evt.target.value.replace(",",".");

  if (isNaN(inputValue) || Number(inputValue) <= 0 && !parentElement.classList.contains('error')){  
     // isNaN(inputValue) significa que o usuário digitou algo que näo era 1 número
     // Se parentElement.classList náo contiver a classe 'error' 
     // erorTextElement vai conter um elemento HTML criado a partir do JavaScript 
     // é evidente que ele deve se associar à div_avó 

     // Objetivos: <p class="text-red-500">Insira um valor numérico e maior do que zero</p>
     const errorTextElement = document.createElement('p'); // <p></p>
     errorTextElement.classList.add("text-red-500");       // <p class="text-red-500"></p>
     errorTextElement.innerText = 'Insira um valor numérico e maior do que zero';

     // adicionar + 1 classe(error do style.css) à div_pai
     parentElement.classList.add('error');   
     // Agregar um elemento - TAG <p> - à div_avô
     grandParentElement.appendChild(errorTextElement);     
  }
  else if (parentElement.classList.contains('error') && !isNaN(inputValue) && Number(inputValue) > 0)
   {  // este trecho é para remover o erro existente, condiçöes:
      // parentElement.classList.contains('error') que dizer que tem uma mensagem de erro 
      // !sNaN(inputValue) quer dizer näo é um isNaN
      // e o seu valor é maior que zero 
      parentElement.classList.remove('error');
      // querySelector => Pesquise a classe '.error' - style,css - a partir do avô e seus descendentes .. usou '.error' foi por causa da querySelector (seletor) e seletor usa (.)
      // e no caso de id seria algo + - assim: #algumaCoisa ..
      // se fosse grandParentElement.querySelector('p'); neste caso capturaria o primeiro <p> q encontrou,
      // aliás, pode existir + do que 1 <p> e caso necessite de capturar todas as ocorrencias
      // pode usar querySelectorAll
      grandParentElement.querySelector('p').remove();
   }
}

// for percorre todos os campos "relevantes" da interface e inputValidate faz a critica deles
for (const formElement of form){
    // o form pode ser acessado como uma lista e a referencia de um de seus elementos pode ser pelo
    // "name" 
    // form[0...n]
    
    if (formElement.tagName==="INPUT" && formElement.hasAttribute("name")){
        // tagName tem que ser maiúsculo ("INPUT") para comparaçäo
        // Conceder a cada elemento, que satifaça às condiçöes, o poder se escutar o evento blur e de respondê-lo por meio de uma funçäo - inputValidate()
        formElement.addEventListener('blur',inputValidate);
        // formElement.addEventListener ('blur', inputValidate);  
        // todas as vezes em há "addEventListener", a funçäo associado ao evento recebe um objeto (evt).
        // Esse objeto (ex: evt) contém as informaçöes do evento em questäo  
    }
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

// esta linha possibilita a este botäo de ouvir um "click"
// e ao ouví-lo irá responder com a açäo da funçäo clearForm
clearFormButton.addEventListener('click', clearForm);

