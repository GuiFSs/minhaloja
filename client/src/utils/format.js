export const formatLink = text => {
  return text.split(' ').join('-');
};

export const deformLink = text => {
  return text.split('-').join(' ');
};

export const formatPreco = preco => {
  return preco
    .toFixed(2)
    .toString()
    .split('.')
    .join(',');
};

export const formatParcela = (preco, parcelas) => {
  return `${parcelas}x de R$ ${formatPreco(preco / parcelas)}`;
};
