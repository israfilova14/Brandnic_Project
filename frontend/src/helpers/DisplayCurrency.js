const displayCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-GB', {
      style: "currency",
      currency: 'GBP',
      minimumFractionDigits: 2
    });
    return formatter.format(num);
  }
  
  export default displayCurrency;
  