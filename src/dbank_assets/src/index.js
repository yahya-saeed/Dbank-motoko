import { dbank } from "../../declarations/dbank";


// const form = document.querySelector('form')
// console.log(form)
// console.log(inputAmount)


window.addEventListener('load', async () => {
  update()
})


document.querySelector("form").addEventListener('submit', async (e) => {
  e.preventDefault();

  const button = document.querySelector('#submit-btn');
  const inputAmount = parseFloat(document.querySelector('#input-amount').value);
  const withrawAmount = parseFloat(document.querySelector('#withdrawal-amount').value);

  button.setAttribute('disabled', true);

  if (document.querySelector('#input-amount').value.length != 0) {

    await dbank.topUp(inputAmount);

  }

  if (document.querySelector('#withdrawal-amount').value.length != 0) {

    await dbank.withdraw(withrawAmount);

  }

  await dbank.compound()

  update()



  const currentAmount = await dbank.checkBalance()
  document.querySelector('#value').innerText = Math.round(currentAmount * 100) / 100;
  document.querySelector('#input-amount').value = "";
  document.querySelector('#withdrawal-amount').value = "";

  button.removeAttribute('disabled')

})

async function update() {
  const currentAmount = await dbank.checkBalance()
  document.querySelector('#value').innerText = Math.round(currentAmount * 100) / 100;
}
