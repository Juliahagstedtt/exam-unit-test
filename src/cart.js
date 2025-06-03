import { isCartItem, isProduct } from "./validation.js"


let cart = [] // en tom lista där alla produkter i kundvagnen sparas
let idCounter = 2002 // idCounter är ett nummer som ger varje vara ett unikt ID som ökar med 1 för varje ny vara.



// Den här funktionen räknar hur många produkter som finns i kundvagnen.
// Returnerar ett nummer, t.ex. 0 om den är tom, eller 3 om tre produkter har lagts till.
function getCartItemCount() {
	return cart.length; // Räknar hur många saker som är ligger i listan
}

// Den här funktionen lägger till en produkt i kundvagnen.
// Produkten måste ha id, namn och pris, annars läggs den inte till.
function addToCart(newItem) {
	
	// Kollar om produkten man försöker lägga till är giltig
	// Om inte, kasta ett fel (throw) som tydligt säger att produkten är ogiltig
	if( !isProduct(newItem) ) {
		  throw new Error("Ogiltig produkt"); // Produkten saknar t.ex. namn, id eller pris
	}

	const newId = idCounter // Sparar det nuvarande id-numret (för de nya objekten) Anvönds dock inte för tillfället!

	// Kollar om produkten redan finns i varukorgen (baserat på produktens id)
	// Jämför produktens id med de som redan finns
	const index = cart.findIndex(ci => ci.item.id === newItem.id) // (ci = ett objekt i varukorgen)

	// Om produkten inte finns i varukorgen (index är -1), skapa ett nytt objekt (unik id, amount, item) och lägg till det i cart
	if( index === -1 ) {
		const cartItem = { id: idCounter, amount: 1, item: newItem } //Amount ligger på 1 eftersom att det är första gången
		idCounter++ // Ökar id:ets nummer så att nästa produkt kan få ett unikt id
		cart.push(cartItem) // Lägger till produkten i varukorgen
	} else {
		cart[index].amount++ // Om produkten redan finns i varukorgen, då ökar man bara antalet 
	}
}

// Den här funktionen hämtar ett objekt från varukorgen beroende på vilket nummer (index) det har i listan
// T.ex. index 0 hämtar första produkten, index 1 hämtar den andra, osv.
function getItem(index) {
	// Hämtar ett objekt från varukorgen baserat på vilket nummer (index) de har i listan
	return cart[index];
}

// Den här funktionen räknar ihop det totala värdet av alla produkter i kundvagnen.
// Den tar hänsyn till produktens pris och hur många av varje som finns.
function getTotalCartValue() {
	let total = 0 // Startar värdet med 0

	// Loopar igenom alla produkter i varukorgen, för att räkna ihop totalpriset (pris * antal för varje produkt)
	for (let i = 0; i < cart.length; i++) {
		const cartItem = cart[i]; // Hämtar ett objekt ur varukorgen
		total += cartItem.item.price * cartItem.amount; // Räknar ihop totalpriset genom att gå igenom varje produkt och ta pris gånger antal 
	}
	// Returnerar det totala värdet av varukorgen
	return total;
}


// Den här funktionen tar bort en produkt från kundvagnen med hjälp av dess unika cart-id.
// Returnerar true om borttagningen lyckas, annars false.
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


// Den här funktionen ändrar antalet på en viss produkt i kundvagnen.
// Om man lyckas ändra antalet (t.ex. från 1 till 3) returneras true.
// Om man sätter antal till 0 tas produkten bort, och även det returnerar true.
// Men om produkten inte finns i kundvagnen eller om amount är ogiltigt returneras false.
function editCart(itemId, newValues) { // itemId är det unika ID som varje vara får när den läggs till i kundvagnen. Används för att hitta exakt rätt vara
// newValues är ett objekt med de nya ändringar man vill göra. T.ex. { amount: 3 } betyder att man vill ändra antalet till 3.

	// Hittar index för produkten i varukorgen baserat på produktens unika id
	const index = cart.findIndex(item => item.id === itemId)
	
	// Om produkten inte finns, kastas ett felmeddelande
	if (index === -1) {
		throw new Error("Produkten finns inte i kundvagnen");
	}

	// Kollar att newValues.amount finns och är ett positivt tal eller noll (alltså är de giltigt)
	if (typeof newValues.amount !== 'number' || newValues.amount < 0) {
		// Om amount saknas, är negativt eller något annat ogiltigt, kasta fel
		throw new Error("Amount måste vara ett giltigt tal större än eller lika med 0");
	}


	// Om antalet sätts till 0, ta bort produkten från varukorgen 
	if (newValues.amount === 0) {
		cart.splice(index, 1) // Tar bort objektet från listan på rätt plats (index)
		return true

	// Om antalet är mer än 0, uppdatera mängden (amount) på produkten
	} else if (newValues.amount > 0) {
		cart[index].amount = newValues.amount // Ändrar antalet produkter till de nya värdet
		return true
	} 
	
	// Returnera false om allt där ovan inte är uppfylt (en säkerhetåtgärd ifall ingen av de ovan är uppfyllda)

	return false // Returnera false om amount är ogiltigt, t.ex. negativt tal eller om det inte finns (undefined)

}


// Den här funktionen tömmer hela kundvagnen, allt rensas bort och de sätts till en tom Array
// Efter den här körts ska det vara 0 produkter kvar. 
function clearCart() {
	cart = []; //Tom Array
}


export { getCartItemCount, addToCart, getItem, getTotalCartValue, removeFromCart, editCart, clearCart }
