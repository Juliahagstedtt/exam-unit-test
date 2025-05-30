import { isCartItem, isProduct } from "./validation.js"

/*
Din uppgift:
- skriv testfall för alla funktionerna nedan i cart.test.js (RED)
- skriv kod här för att implementera funktionerna (GREEN)

Tips:
- börja med att identifiera VAD som ska testas.
- om du testar t.ex. removeFromCart får du använda addToCart i början av testet. Den kommer nämligen ha sina egna tester

*/
// Din kod börjar här
// Du får en funktion att börja med

let cart = []
let idCounter = 2002

function getCartItemCount() {
	return  cart.length;
}

function addToCart(newItem) {
	if( !isProduct(newItem) ) {
		return false
	}

	const newId = idCounter
	const index = cart.findIndex(ci => ci.item.id === newItem.id)
	if( index === -1 ) {
		const cartItem = { id: idCounter, amount: 1, item: newItem }
		idCounter++
		cart.push(cartItem)
	} else {
		cart[index].amount++
	}
}


function getItem(index) {
	return cart[index];
}


function getTotalCartValue() {
	let total = 0

	// Loop
	for (let i = 0; i < cart.length; i++) {
		const cartItem = cart[i];
		total += cartItem.item.price * cartItem.amount;
	}

	return total;
}



function removeFromCart(itemId) {
	const index = cart.findIndex(item => item.id === itemId)
	if (index === -1) {
		return false;
	}
	cart.splice(index, 1)
	return true
}



function editCart(itemId, newValues) {
	const index = cart.findIndex(item => item.id === itemId)
	if (index === -1) {
		return false;
	}

	if (newValues.amount === 0) {
		cart.splice(index, 1)
		return true

	} else if (newValues.amount > 0) {
		cart[index].amount = newValues.amount
		return true
	} 

	return false
}


// Tömmer varukorgen genom att sätta den till en tom array
function clearCart() {
	cart = []; //Tom Array
}


export { getCartItemCount, addToCart, getItem, getTotalCartValue, removeFromCart, editCart, clearCart }
