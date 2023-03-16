import { menuArray } from './data.js'

function getFeedHtml(){
    
    let feedHtml = ``
    
    menuArray.forEach(function(dish){
        feedHtml += `
                <div class="dish">
                    <div class="dish-inner">
                        <p class="dish-pic">${dish.emoji}</p>
                            <div class="dish-detail">
                                <p class="dish-name">${dish.name}</p>
                                <p class="dish-ingredients">${dish.ingredients}</p>
                                <p class="dish-price">$${dish.price}</p>      
                            </div>
                              <button type="button" class="button" id="button" data-dish=${dish.id}>+</button>
                    </div>
                  
                `
   })
   return feedHtml
}
 

function render(){
    document.getElementById('menu').innerHTML = getFeedHtml()
}

render()



document.addEventListener('click', function(e){
    if(e.target.dataset.dish){
    addBtn(e.target.dataset.dish)
}
})

function addBtn(dishId){
    const dishIdNum = parseInt(dishId)
     const addedDish = menuArray.filter(function(dish){
         return dish.id === dishIdNum
     })[0]
     const addedDishName = addedDish.name
     const addedDishPrice = addedDish.price
    const cart = document.getElementById("cart");
     const heading = document.getElementById("cart-heading");
        if (!heading) {
          cart.innerHTML = '<p id="cart-heading">Your order</p>' + cart.innerHTML;
        }

        cart.innerHTML += `<div class="cart-details">
                            <div class="cart-name-remove">
                              <p class="cart-name">${addedDishName}</p>
                              <button class="remove" id="remove">REMOVE</button>
                            </div>
                              <p class="cart-price">$${addedDishPrice}</p>
                            </div>`;   
        cart.style.borderBottom = '1px solid black'      
        function removeItem(event) {
         const btn = event.target;
         const cartItem = btn.closest('.cart-details');
         const priceEl = cartItem.querySelector('.cart-price');
         const price = parseFloat(priceEl.textContent.slice(1));
         cartItem.remove();
         totalPrice -= price;
         const totalPriceEl = document.querySelector('.total-price');
         totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
        }

        const removeBtns = document.querySelectorAll('.remove');
        removeBtns.forEach(btn => {
        btn.addEventListener('click', removeItem);
        });
            
       
         let totalPrice = 0;
         const prices = cart.querySelectorAll(".cart-details p:last-child");
        for (let i = 0; i < prices.length; i++) {
         const price = parseFloat(prices[i].textContent.slice(1));
                        totalPrice += price;
            }
     
     const checkout = document.getElementById('checkout')
     checkout.innerHTML = `<div class="check-detail">
                           <p class="total-price-word">Total price:</p> <p class="total-price">$${totalPrice}</p>
                           </div>
                           <div class="checkBtn"><button id="orderBtn">Complete order</button></div>
                            `
   }
 
 checkout.addEventListener('click', function(event) {
    if (event.target.id === 'orderBtn') {
        console.log('Button clicked!')
        modal.style.display = 'inline'
        cart.style.borderBottom = ''  
    }
})


  
const form = document.querySelector('form') // select the form element
const payBtn = document.getElementById('pay')
const message = document.getElementById('message')

form.addEventListener('submit', function(event) {
  event.preventDefault() // prevent the form from being submitted by default
})
  // get the form inputs
  const nameInput = document.getElementById('yourname')
  const cardNumberInput = document.getElementById('cardnumber')
  const cvvInput = document.getElementById('cvv')


payBtn.addEventListener('click', function(){

  if (nameInput.value === '' || cardNumberInput.value === '' || cvvInput.value === '') {
    alert('Please fill in all required fields.') // show an error message
  } else {
    modal.style.display = 'none'
    cart.innerHTML = ''
    checkout.innerHTML = ''
    message.innerHTML = `<p class="thankyou">Thanks, ${nameInput.value}! Your order is on its way!</p>`
  }
})

  
  
  
