// importera här
import { getCartItemCount, addToCart, getItem, getTotalCartValue, removeFromCart, editCart, clearCart } from "../cart"
import { isProduct } from "../validation"


describe('Cart', () => {
	beforeEach(() => {
		// Denna kod körs före varje test. Det är för att rensa kundvagnen, så inte saker ligger kvar från föregående test.
		clearCart() // Nollställer varukorgen
	})


	// Du får ett test att börja med
	test('addToCart lägger till en ny produkt i kundvagnen', () => {
		const itemCountBefore = getCartItemCount() // Sparar antal produkter innan något läggs till 
		const input = { id: 1002, name: 'Vattenpistol', price: 40 } // Testprodukt 

		// addToCart returnerar inget - den påverkar kundvagnen
		// vi behöver använda getCartItemCount för att se om det har lagts till en ny produkt i kundvagnen

		addToCart(input) // Lägger till produkten i varukorg 
		const itemCountAfter = getCartItemCount() // Hämtar antalet produkter i varukorgen efter att produkten har lagts till
		expect(itemCountAfter).toBe(itemCountBefore + 1) // Kontroll att antalet har ökat med 1
	})

	


	describe('getCartItemCount', () => {
		test('returnerar 0 när de är tomt i cart', () => {
			clearCart() // Säkerställer att varukorgen är tom
			const expected = 0; // Förväntat antal produkter 
			const actual = getCartItemCount(); // Hämtar antal produkter i varukorgen 
			expect(actual).toBe(expected) // Kontroll att funktionen returnerar 0 när inget finns 
		})
		
		test('returnerar antal produkter i varukorgen', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) //Lägger till produkt i varukorgen

			const expected = 1; // Lades till en produkt 
			const actual = getCartItemCount(); // Hämtar antal produkter i varukorgen 
			expect(actual).toBe(expected) // Kontroll att antalet är korrekt
		})
	})



	describe('getItem', () => {
		test('returnerar ett objekt om index finns', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) //Lägger till produkt i varukorgen

			const result = getItem(0) // Hämtar de första objektet i varukorgen (index 0)
			expect(result.item).toEqual(produkt) // Kontroll att produkten som hämtas är exakt den som tidigare lades till varukorgen
		})
		test('returnerar undefined om index inte finns', () => {
			const result = getItem(21) // Försöker hämta ett objekt från ett index som inte existerar
			expect(result).toBeUndefined() // Förväntar resultatet att vara undefined eftersom att indexet är ogiltigt
		})
	})



	describe('getTotalCartValue', () => {
		test('visar det totala i varukorgen', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) //Lägger till produkt i varukorgen

			const expected = 12; // Eftersom amount är 1 och priset är 12, blir totala värdet 12
			const actual = getTotalCartValue(); // Hämtar de totala värdet från varukorgen

			expect(actual).toBe(expected) // Förväntar att värdet ska vara 12
		})
		test('returnerar 0 kr när varukorgen är tom', () => {
			// Ingen produkt har lagts till, så värdet är 0

			const expected = 0; // Förväntar att de totala värdet är 0 
			const actual = getTotalCartValue(); // Hämtar det totala värdet från varukorgen 

			expect(actual).toBe(expected) // Förväntar 0 när varukorgen är tom
		})
	})



	describe('removeFromCart', () => {
		test('ta bort objekt från cart', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) // Lägger till produkt i varukorgen

			const cartItem = getItem(0) // Hämtar första objektet i varukorgen
			const itemId = cartItem.id // Hämtar produktens unika cart id i varukorgen

			const expected = true; // Förväntar att produkten ska tas bort
			const actual = removeFromCart(itemId); // Försöker ta bort produkten från varukorgen 

			expect(actual).toBe(expected) // Ska returnera true om borttagningen lyckades
		})
		// Testar att funktionen hanterar ogiltiga id t.ex om inte produkten finns
		test('returnera false om objekt inte finns', () => {

			const expected = false; // Förväntar false om produkten inte finns
			const actual = removeFromCart(8989); // Försöker ta bort en produkt med ogiltig (icke existerande) id

			expect(actual).toBe(expected) // Returnera false eftersom att inget togs bort 
		})
	})



	describe('editCart', () => {
		test('ändrar antalet produkter i varukorg', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) //Lägger till produkt i varukorgen

			const cartItem = getItem(0) //Hämtar det första som finns i varukorgen
			const itemId = cartItem.id //Hämtar id på objektet

			const expected = true;
			const actual = editCart(itemId, { amount: 4 }); // Försöker ändra antalet till något annat som t.ex 4 
			expect(actual).toBe(expected) // Förväntar att ändringen lyckas och att de då blir true
		})
		test('ta bort produkt från varukorg', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) // Lägger till produkt i varukorgen

			const cartItem = getItem(0) // Hämtar produkten vi nyss la till i varukorgen
			const itemId = cartItem.id // Hämtar id på objektet

			const expected = true;
			const actual = editCart(itemId, { amount: 0 }); // Försöker ta bort produkten 
			expect(actual).toBe(expected) // Förväntar att produkten tas bort
		})
		test('returnerar false om produkten inte finns', () => {
			const expected = false;
			const actual = editCart(8989, { amount: 10 }); //Testar med ett ogiltigt id exempel
			expect(actual).toBe(expected) // Förväntar false eftersom att produkten inte finns
		})
	})



//Testar så att clearCart har rensat allt från varukorgen
	describe('clearCart', () => {
		test('här rensas varukorgen', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) //Lägger till produkt i varukorgen

			clearCart() // Rensar varukorgen
			const actual = getCartItemCount(); // Hämtar antal produkter i varukorgen (vilket förväntas vara 0 efter rensning)
			expect(actual).toBe(0) // Förväntas att vara 0 produkter kvar
		})
	})
})