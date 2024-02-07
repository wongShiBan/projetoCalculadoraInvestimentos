function convertToMonthlyReturnRate(yearlyReturnRate){
  // 
  // conversäo da taxa de Rentabilidade de ano para mes,
  // ou seja, caso a unidade de aplicacao usada for ano 
  // Seja uma taxa de Rentabilidade de 5% ao ano..
  // Um ano possui 12 meses
  // Ex: 5%/12 = 0.416% ou (5%)**1/12 =  0.416%
  //
    return yearlyReturnRate**(1/12);
}

// use export para garantir a acessibilidade de outros módulos a ele
// Essa "function" fazer tudo para obter a lista de rendimentos, mes a mes
export function generateReturnsArray(
    startingAmount = 0,            // investimento inicial
    timeHorizon = 0,               // prazo ou tempo de projecao  
    timePeriod = "monthly",        // tipo/modo do tempo de projeçäo ( mes/ ano )
    monthlyContribution = 0,       // aporte mensal
    returnRate = 0,                // taxa de retorno 
    returnTimeFrame = "monthly")   // tipo/modo da taxa de retorno (por/mes ou por/ano)
{
    // Faz crítica dos dados de entrada 
    // Se informar startingAmount = 0, entende-se como false ou, na forma booleana, !startingAmount 
    if (!startingAmount || !timeHorizon){   // um ou outro for false (!)
       throw new Error('Investimento inicial ou prazo devem ser informados com valores positivos !')
    };

    // ternário 
    // Adequar a taxa de retorno para mes se o "tipo de taxa de retorno" informado for anual
    const finalReturnRate = returnTimeFrame === "monthly" ? 1 + returnRate/100 : convertToMonthlyReturnRate(1 + returnRate/100);

    // Se for 1 ano,   5%/12       ou  (5%)**1/12        ou  (5/100)**1/12
    // Se for 2 anos,  5%/(12 * 2) ou  (5%)**1/(12*2)    ou  (5/100)**1/(12*2)
    // Se for n anos,  5%/(12 * n) ou  (5%)**1/(12*n)    ou  (5/100)**1/(12*n)
    //
    // o montante final do investimento sem aporte:
    // mf = investimento_inicial * (1 + ((5/100)**1/(12*n)) ) onde n = total de anos 

    // Prazo de investimento informado que pode ser em número de meses ou anos
    // Adequar o prazo para mes se o "tipo de prazo" informado for anual
    const finalTimeHorizon = timePeriod === 'monthly' ?  timeHorizon : timeHorizon * 12;

    // Criar objeto de referencia com atributos necessários p/ registrar cada resultado do investimento 
    // mensal 
    const referenceInvestimentObject = {
      investedAmount: startingAmount,     // investimento inicial de cada mes
      interestReturns: 0,                 // investimento atualizado com juros, do mes em questäo
      totalInterestReturns: 0,            // acumulador de todos os juros 
      month: 0,                           // nº de meses ocorridos desse investimento
      totalAmount: startingAmount,        // total geral (invest inicial + aportes + total de juros)
    }
    
    // lista de objetos ou lista de resultados 
    // =======================================
    // Mes 0 -> Corresponde ao objeto referenceInvestimentObject com dados iniciais como 
    //          investedAmount: startingAmount,
    //          totalAmount: startingAmount,

    // Mes 1 -> objeto1 
    // Mes 2 -> objeto2 
    // ...   -> objetoN
    // 
    const returnsArray = [referenceInvestimentObject];  
    // para o primeiro returnsArray [0] = referenceInvestimentObject 
    // o q se tem nela säo: investedAmount: startingAmount e totalAmount: startingAmount

    // timeReference = 1, pois assim, o que se faz é preparar para o mes 1 
    // porque o mes 0 é o "referenceInvestimentObject"
    for (let timeReference = 1; timeReference <= timeHorizon; timeReference++)
    {  // 1, 2, 3 ... n é sempre se refere ao término de cada mes 
       // ou seja, qdo for 1 é o fim de 1 
       // para cada iteraçäo concluída, o returnsArray terá um objeto a + 
       // returnsArray = [referenceInvestimentObject, {}..];  
       //
       // totalAmount = total que tem * taxa + contribuiçäo mensal 
       //      
       // Esta equaçäo prepara o valor totalAmount, depois de um ciclo, para o próximo
       // Vamos entender... no início de tudo tem startingAmount, näo tem monthlyContribution e que
       // totalAmount tem também o valor de startingAmount. 
       // Entäo, logo depois do primeiro ciclo, o que se tem é um totalAmount atualizado pela 
       // taxa de rentabilidade e mais o valor da monthlyContribution;
       // 
       // Entäo, para ciclo seguinte, o totalAmount será corrigido pela aplicaçäo da taxa   
       // e mais o valor da monthlyContribution, e deste modo já preparando para o próximo ciclo;
       
       // Ex: returnsArray[timeReference-1].totalAmount = 10000 (é o valor do mes anterior)  
       // e totalAmount = tudo q tinha do mes passado * pela correçäo + aporte mensal        
       // OBS: Este valor já serve como base de cálculo para o mes seguinte
       const totalAmount = returnsArray[timeReference-1].totalAmount * finalReturnRate + monthlyContribution;

       // interestReturns diz o qto que rendeu naquele último mes 
       // É o valor que tem multiplicado pela taxa de retorno
       // Ex: returnsArray[timeReference-1].totalAmount se refere sempre o mes anterior 
       // Ex: mes [1 - 1] = mes [0] => totalAmount = investedAmount = 10000
       // returnsArray[timeReference-1].totalAmount * (finalReturnRate - 1) = 10000 * 0.05 = 500
       const interestReturns = returnsArray[timeReference-1].totalAmount * (finalReturnRate - 1);

       // investAmount -> total investido = startingAmount + Qtd de aportes efetuados
       // Caso no início näo houver Contribution, entäo investAmount = startingAmount
       // OBS: na vida real, monthlyContribution pode ser variável, logo esta equaçäo näo se sustenta

       // Ex: startingAmount = 10000, monthlyContribution = 3000, timeReference = 1
       // investedAmount = 13000, onde startingAmount é o investimento inicial
       const investedAmount = startingAmount + monthlyContribution * timeReference;

       // total dos rendimentos (juros obtidos) é igual tudo que tem no momento menos tudo que foi 
       // investido 
       // Ex: total do momento menos ( - ) o total investido 
       const totalInterestReturns = totalAmount - investedAmount;

       // Neste loop (corresponde ao tempo de projeçäo), nele se cria a lista de objetos 
       // OBS: qdo os campos do objeto possuem nomes iguais às das variáveis, neste caso basta
       // deixar os nomes dos campos para facilitar e simplificar a codificaçäo. 

       /* Dados informados ao formulário
          investedAmount = 10000
          monthlyContribution = 3000 
          timeHorizon = 60 meses 
          returnRate  = 5% ao mes 
       */

       // OBS: 
       // Para o mes 0 - o q se tem é o próprio conteúdo de "referenceInvestimentObject"
       //
       /* Para o mes 0 - investedAmount  = 10000,
                         interestReturns = 0,
                         totalInterestReturns = 0,
                         month = 0,
                       * totalAmount = 10000 

          Para mes 1     investedAmount  = 13000 => (invst inicial + NrContrib * ValorContrib)
                         interestReturns = 500,   
                         totalInterestReturns = 500 ==> (totalAmount - investedAmount)
                         month = 1,
                       * totalAmount = 13500 => (totalAmount mes anter * correçäo + ValorContrib)  
 
          Para mes 2     investedAmount  = 16000 (invst inicial + NrContrib * ValorContrib)
                         interestReturns = 675 
                         totalInterestReturns = 1175 ==> (totalAmount - investedAmount)
                         month = 2,
                       * totalAmount = 17175 => (totalAmount mes anter * correçäo + ValorContrib)

          Para mes 3     investedAmount  = 19000 (invst inicial + NrContrib * ValorContrib)
                         interestReturns = 858
                         totalInterestReturns = 2033 ==> (totalAmount - investedAmount)
                         month = 3,
                       * totalAmount = 21033 => (totalAmount mes anter * correçäo + ValorContrib)

       */
       returnsArray.push({
        investedAmount,
        interestReturns,
        totalInterestReturns,
        month: timeReference,  
        totalAmount, 
       });
    }

    // Saindo do For ..
    return returnsArray;

    // Passo seguinte, após desta linha de comando.. 
    // no terminal, digite git add . (ponto) => p/ atualizar index.html, main.js e investimentGoals.js
    //                     git commit -m 'escrever comentarios a respeito desta etapa do projeto'
    // Estes 2 passos acima só devem ser executados quando finalizar toda a branch ? 
    // Resposta: näo ! Eles podem ser executados assim que tiver necessidade de alguma interrupçäo.
  }
   