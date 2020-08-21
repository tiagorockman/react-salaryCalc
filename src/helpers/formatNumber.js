const formatter = Intl.NumberFormat('pt-BR');
function formatNumber(value){
 return  formatter.format(value);
}

const toReal= (value) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

const percentCalc = (numerator, denominator) =>{
  const result =  ((numerator/denominator) * 100).toFixed(2);
  return isNaN(result)? 0 : result;
}

export { formatNumber, toReal, percentCalc };