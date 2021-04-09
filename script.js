const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
async function calculate() {
  try {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/d80a04782d274f5f245f7344/latest/${currency_one}`
    );
    const data = await response.json();

    // console.log(data);
    const rate = data.conversion_rates[currency_two];
    rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
    amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
  } catch (error) {
    console.log(error);
  }
}

// Event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
