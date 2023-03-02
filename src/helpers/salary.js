// Fonte: https://www.todacarreira.com/calculo-salario-liquido/
// INSS 2023: https://www.contabilizei.com.br/contabilidade-online/desconto-inss/?utm_device=c&utm_term=&utm_source=google&utm_medium=cpc&utm_campaign=%5BMAX%5D_Performance_RNTE&hsa_cam=19671620383&hsa_grp=&hsa_mt=&hsa_src=x&hsa_ad=&hsa_acc=1466761651&hsa_net=adwords&hsa_kw=&hsa_tgt=&hsa_ver=3&gclid=CjwKCAiAr4GgBhBFEiwAgwORrTUa5-vj3VGOpWXE47aTHgeylUSclqidWKrfj_bLtOtM_vG04GvJWBoCOz4QAvD_BwE
// Confirmando INSS: https://www.coalize.com.br/calculadora-de-inss-resultado

const INSS_TABLE = [
  {
    id: 1,
    minValue: 0,
    maxValue: 1302,
    difference: 1302 - 0,
    discountPercentage: 0.075,
    discountValue: -1,
  },
  {
    id: 2,
    minValue: 1302.01,
    maxValue: 2571.29,
    difference: 2571.29 - 1302,
    discountPercentage: 0.09,
  },
  {
    id: 3,
    minValue: 2571.3,
    maxValue: 3856.94,
    difference: 3856.94 - 2571.29,
    discountPercentage: 0.12,
  },
  {
    id: 4,
    minValue: 3856.95,
    maxValue: 7507.49,
    difference: 7507.49 - 3856.94,
    discountPercentage: 0.14,
  },
];

//maxSalaryInssTable
const maxSalaryInssTable = 7507.5;

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
  let discountIRPF =
    baseIRPF < 1903.98
      ? 0
      : baseIRPF < 2826.65
      ? round(baseIRPF * 0.075) - 142.8
      : baseIRPF < 3751.05
      ? round(baseIRPF * 0.15) - 354.8
      : baseIRPF < 4664.68
      ? round(baseIRPF * 0.225) - 636.13
      : round(baseIRPF * 0.275) - 869.36;

  discountIRPF = round(discountIRPF);

  return discountIRPF;
}

function calculateSalaryFrom(fullSalary, dependentes = 0) {
  console.log(`dep: ${dependentes}`)
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
