function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const accountLookup = {
  cash: 'cash',
  fidelity401k: 'investment',
  fidelityHSA: 'investment',
  etradeRothIra: 'investment',
  savingsBonds: 'investment',
  otherAssets: 'investment',
  studentLoan: 'debt',
  ccDebt: 'debt',
};

function formatter(value, style = 'currency', places = 0) {
  return new Intl.NumberFormat('en-US', {
    style,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: places,
  }).format(value);
}

export { numberWithCommas, accountLookup, formatter };
