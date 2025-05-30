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

// Returnerar hur många produkter som finns i varukorgen ( räknar längden på listan cart)
function getCartItemCount() {
	return  cart.length; //Räknar hur många saker som är ligger i listan
}

function addToCart(newItem) {
	//Kollar om de man försöker lägga till är en giltig produkt 
	if( !isProduct(newItem) ) {
		return false
	}
	const newId = idCounter //Sparar det nuvarande id-numret (för de nya objekten) Anvönds dock inte för tillfället!

	// Kollar om produkten redan finns i varukorgen (baserat på produktens id)
	const index = cart.findIndex(ci => ci.item.id === newItem.id)
	// Om produkten inte finns i varukorgen, - skapa ett nytt objekt för varukorgen
	if( index === -1 ) {
		const cartItem = { id: idCounter, amount: 1, item: newItem } //Amount ligger på 1 eftersom att det är första gången
		idCounter++ //Ökar id:ets nummer så att nästa produkt kan få ett unikt id
		cart.push(cartItem) //Lägger till produkten i varukorgen
	} else {
		cart[index].amount++ // Om produkten redan finns i varukorgen, då ökar man bara antalet 
	}
}


function getItem(index) {
	//Hämtar ett objekt från varukorgen baserat på vilket nummer (index) de har i listan
	return cart[index];
}


function getTotalCartValue() {
	let total = 0 //Startar värdet med 0

	// Loopar igenom alla produkter i varukorgen
	for (let i = 0; i < cart.length; i++) {
		const cartItem = cart[i]; //Hämtar ett objekt ur varukorgen
		total += cartItem.item.price * cartItem.amount; // Räknar ihop totalpriset genom att gå igenom varje produkt och ta pris gånger antal 
	}
	// Returnerar det totala värdet av varukorgen
	return total;
}


//Tar bort en en produkt från varukorgen med hjälp av id eller då itemId
function removeFromCart(itemId) {
	// Letar upp vart i varukorgen som produkten finns 
	const index = cart.findIndex(item => item.id === itemId)
	// Om produkten inte finns returnera false
	if (index === -1) {
		return false;
	}
	// Tar bort produkten från varukorgen
	cart.splice(index, 1) //Tar bort objektet från listan med hjälp av splice (baserat på deras index i listan)
	// Returnerar true för att visa att borttagninegn lyckades
	return true
}



function editCart(itemId, newValues) {
	// Hittar index för produkten i varukorgen baserat på produktens unika id
	const index = cart.findIndex(item => item.id === itemId)
	
	// Returnera false om produkten inte finns i varukorgen
	if (index === -1) {
		return false;
	}

	// Om antalet sätts till 0, ta bort produkten från varukorgen 
	if (newValues.amount === 0) {
		cart.splice(index, 1) //Tar bort ett objekt från listan vid indexet
		return true

	// Om antalet är mer än 0, uppdatera mängden (amount) på produkten
	} else if (newValues.amount > 0) {
		cart[index].amount = newValues.amount // Ändrar antalet produkter till de nya värdet
		return true
	} 
	// Returnera false om allt där ovan inte är uppfylt (en säkerhetåtgärd ifall ingen av de ovan är uppfyllda)
	return false // Returnera false om amount är ogiltigt, t.ex. negativt tal eller om det inte finns (undefined)

}


// Tömmer varukorgen genom att sätta den till en tom Array
function clearCart() {
	cart = []; //Tom Array
}


export { getCartItemCount, addToCart, getItem, getTotalCartValue, removeFromCart, editCart, clearCart }
