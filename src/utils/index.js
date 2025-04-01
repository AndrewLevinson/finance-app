function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const accountLookup = {
  cash: ['asset'],
  fidelity401k: ['asset', 'investment'],
  fidelityHSA: ['asset', 'investment'],
  etradeRothIra: ['asset', 'investment'],
  savingsBonds: ['asset', 'investment'],
  otherAssets: ['asset', 'investment'],
  studentLoan: ['debt', 'long term debt'],
  ccDebt: ['debt', 'short term debt'],
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
