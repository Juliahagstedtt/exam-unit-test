import { isCartItem, isProduct } from "./validation.js"


/*
Din uppgift:
- skriv testfall för alla funktionerna nedan i cart.test.js (RED)
- skriv kod här för att implementera funktionerna (GREEN)

Tips:
- börja med att identifiera VAD som ska testas.
- om du testar t.ex. removeFromCart får du använda addToCart i början av testet. Den kommer nämligen ha sina egna tester

*/


let cart = []
let idCounter = 2002


// Din kod börjar här
// Du får en funktion att börja med

function getCartItemCount() {
	throw new Error('TODO')
}

function addToCart(newItem) {
	if( !isProduct(newItem) ) {
		return false
	}

	const newId = idCounter
	const index = cart.findIndex(item => item.id === newId)
	if( index === -1 ) {
		const cartItem = { id: idCounter, amount: 1, item: newItem }
		idCounter++
		cart.push(cartItem)
	} else {
		cart[index].amount++
	}
}

// function getCartItemCount() {

// }
function getItem(index) {

}
// function getTotalCartValue() {

// }
// function addToCart(newItem) {

// }

function getCartValue() {
	
}

function removeFromCart(itemId) {

}
function editCart(itemId, newValues) {

}
function clearCart() {
	
}

export { getCartItemCount, addToCart }
