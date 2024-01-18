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

// use export para garantir a acessibilidade a outros módulos
export function generateReturnsArray(
    startingAmount = 0,            // investimento inicial
    timeHorizon = 0,               // tempo de projecao que pode ser em meses ou em anos
    timePeriod = "monthly",        // modo de avaliacao ( mes/ ano )
    monthlyContribution = 0,       // aporte mensal
    returnRate = 0,                // taxa de retorno que pode ser por/mes ou por/ano
    returnTimeFrame = "monthly")   // modo de avaliacao ( mes/ ano )
{
    if (!startingAmount || !timeHorizon){   // um ou outro for false (!)
    throw new Error('Investimento inicial ou prazo devem ser informados com valores positivos!')
    };

    // ternário 
    const finalReturnRate = returnTimeFrame === "monthly" ? 1 + returnRate/100 : convertToMonthlyReturnRate(1 + returnRate/100);

    // Se for 1 ano,   5%/12       ou  (5%)**1/12        ou  (5/100)**1/12
    // Se for 2 anos,  5%/(12 * 2) ou  (5%)**1/(12*2)    ou  (5/100)**1/(12*2)
    // Se for n anos,  5%/(12 * n) ou  (5%)**1/(12*n)    ou  (5/100)**1/(12*n)
    //
    // o montante final do investimento sem aporte:
    // mf = investimento_inicial * (1 + ((5/100)**1/(12*n)) ) onde n = total de anos 

    // Prazo de investimento que pode ser informado em número de meses ou anos
    const finalTimeHorizon = timePeriod === 'monthly' ?  timeHorizon : timeHorizon * 12;

    // Objeto de referencia para cada objeto da lista, ou seja,
    // todo objeto terá esses dados  
    const referenceInvestimentObject = {
      investedAmount: startingAmount,
      interestReturns: 0,                 // investimento atualizado com juros, do mes em questäo
      totalInterestReturns: 0,            // acumulador de todos os juros 
      month: 0,                           // nº de meses ocorridos desse investimento
      totalAmount: startingAmount,        // total geral (invest inicial + aportes + total de juros)
    }
    
    // lista de objetos ou lista de resultados 
    // Mes 1 -> objeto1 
    // Mes 2 -> objeto2 
    // ...   -> objetoN
    // 
    const returnsArray = [referenceInvestimentObject];  
    // para o primeiro elemento: [0] = referenceInvestimentObject 

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
       // 
       const totalAmount = returnsArray[timeReference-1].totalAmount * finalReturnRate + monthlyContribution;

       // interestReturns diz o qto que rendeu naquele mes 
       // É o valor que tem multiplicado pela taxa de retorno
       const interestReturns = returnsArray[timeReference-1].totalAmount * finalReturnRate;

       // investAmount -> total de investido = startingAmount + Qtd de aportes efetudos
       // Caso no início näo houver Contribution, entäo investAmount = startingAmount
       // OBS: na vida real, monthlyContribution pode ser variável, logo esta equaçäo näo se sustenta
       const investedAmount = startingAmount + monthlyContribution * timeReference;

       // total de rendimento é igual tudo que tem no momento menos tudo que foi investido
       // Ex: total do momento - total investido 
       const totalInterestReturns = totalAmount - investedAmount;

       // Neste loop (corresponde ao tempo de projeçäo) se faz criar a lista de objetos 
       // OBS: qdo os campos do objeto possuem nomes iguais às das variáveis, neste caso basta
       // deixar os nomes dos campos para facilitar e simplificar a codificaçäo. 
       returnsArray.push({
        investedAmount,
        interestReturns,
        totalInterestReturns,
        month: timeReference,  
        totalAmount, 
       });
    }

    return returnsArray;

    // Passo seguinte, após desta linha de comando.. 
    // no terminal, digite git add . (ponto) => p/ atualizar index.html, main.js e investimentGoals.js
    //                     git commit -m 'escrever comentarios a respeito desta etapa do projeto'
    // Estes 2 passos acima só devem ser executados quando finalizar toda a branch ? 
    // Resposta: näo ! Eles podem ser executados assim que tiver necessidade de alguma interrupçäo.
  }
   