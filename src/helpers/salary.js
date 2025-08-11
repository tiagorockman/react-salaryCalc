// Fonte: https://www.todacarreira.com/calculo-salario-liquido/
// INSS 2025: https://www.ecalculos.com.br/utilitarios/tabinss.php
// Confirmando INSS: https://www.contabilizei.com.br/contabilidade-online/tabela-inss/
// https://www.debit.com.br/tabelas/tabelas-inss

// Tabela INSS 2025 atualizada
const INSS_TABLE = [
  {
    id: 1,
    minValue: 0,
    maxValue: 1518,
    difference: 1518 - 0,
    discountPercentage: 0.075,
    discountValue: -1,
  },
  {
    id: 2,
    minValue: 1518.01,
    maxValue: 2793.88,
    difference: 2793.88 - 1518.01,
    discountPercentage: 0.09,
  },
  {
    id: 3,
    minValue: 2793.89,
    maxValue: 4190.83,
    difference: 4190.83 - 2793.89,
    discountPercentage: 0.12,
  },
  {
    id: 4,
    minValue: 4190.84,
    maxValue: 8157.41,
    difference: 8157.41 - 4190.84,
    discountPercentage: 0.14,
  },
];

//maxSalaryInssTable (teto do INSS 2025)
const maxSalaryInssTable = 8157.41;

function round(value) {
  return +value.toFixed(2);
}

function calculateDiscountINSS(baseINSS) {
  let discountINSS = 0;
 baseINSS = baseINSS >= maxSalaryInssTable ? maxSalaryInssTable : baseINSS;

  for (var i = 0; i < INSS_TABLE.length; i++) {
    var currentItem = INSS_TABLE[i];
    let discountValue = 0;

    if (baseINSS > currentItem.maxValue) {
      // prettier-ignore
      discountValue = 
        round(currentItem.difference * currentItem.discountPercentage);

      discountINSS += discountValue;
    } else {
      // prettier-ignore
      discountValue = 
        round((baseINSS - currentItem.minValue) * currentItem.discountPercentage);

      discountINSS += discountValue;
      break;
    }
  }

  discountINSS = round(discountINSS);

  return discountINSS;
}

function calculateDiscountIRPF(baseIRPF) {
  // Tabela IRRF 2025 atualizada (a partir de 01/05/2025)
  let discountIRPF =
    baseIRPF < 2428.80
      ? 0
      : baseIRPF < 2826.65
      ? round(baseIRPF * 0.075) - 182.16
      : baseIRPF < 3751.05
      ? round(baseIRPF * 0.15) - 394.16
      : baseIRPF < 4664.68
      ? round(baseIRPF * 0.225) - 675.49
      : round(baseIRPF * 0.275) - 908.73;

  discountIRPF = round(discountIRPF);

  return discountIRPF;
}

function calculateSalaryFrom(fullSalary, dependentes = 0) {
  console.log(`dep: ${dependentes}`)
  // Valor de dedução por dependente atualizado para 2025
  const valorBaseDependente = dependentes !== 0? 189.59*dependentes : 0;

  const baseINSS = +fullSalary;
  const discountINSS = calculateDiscountINSS(baseINSS);
  let baseIRPF = baseINSS - discountINSS;
  baseIRPF -= valorBaseDependente;
  const discountIRPF = calculateDiscountIRPF(baseIRPF);

  const netSalary = baseINSS - discountINSS - discountIRPF;

  return {
    baseINSS,
    discountINSS,
    baseIRPF,
    discountIRPF,
    netSalary,
  };
}

export { calculateSalaryFrom };
