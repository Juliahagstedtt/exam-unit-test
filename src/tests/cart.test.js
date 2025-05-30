// importera här
import { getCartItemCount, addToCart, getItem, getTotalCartValue, removeFromCart, editCart, clearCart } from "../cart"
import { isProduct } from "../validation"




describe('Cart', () => {
	beforeEach(() => {
		// Denna kod körs före varje test. Det är för att rensa kundvagnen, så inte saker ligger kvar från föregående test.
		clearCart() // Säkerställer att varukrogen är tom
	})


	// Du får ett test att börja med
	test('addToCart lägger till en ny produkt i kundvagnen', () => {
		const itemCountBefore = getCartItemCount()
		const input = { id: 1002, name: 'Vattenpistol', price: 40 }
		// addToCart returnerar inget - den påverkar kundvagnen
		// vi behöver använda getCartItemCount för att se om det har lagts till en ny produkt i kundvagnen
		addToCart(input) // Lägger till produkten
		const itemCountAfter = getCartItemCount()
		expect(itemCountAfter).toBe(itemCountBefore + 1)
	})

	
	// -------------------------------------------------- //


	describe('getCartItemCount', () => {
		test('returnerar 0 när de är tomt i cart', () => {
			clearCart() // Säkerställer att varukrogen är tom
			const expected = 0;
			const actual = getCartItemCount();
			expect(actual).toBe(expected)
		})
		
		test('returnerar antal produkter i varukorgen', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) //Lägger till produkt i varukorgen

			const expected = 1;
			const actual = getCartItemCount();
			expect(actual).toBe(expected)
		})
	})

		// -------------------------------------------------- //


	describe('getItem', () => {
		test('returnerar ett objekt om index finns', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) //Lägger till produkt i varukorgen

			const result = getItem(0)
			expect(result.item).toEqual(produkt)
		})
		test('returnerar undefined om index inte finns', () => {
			const result = getItem(21)
			expect(result).toBeUndefined()
		})
	})

	describe('getTotalCartValue', () => {
		test('visar det totala i vaurkorgen', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) //Lägger till produkt i varukorgen

			const expected = 12;
			const actual = getTotalCartValue();
			expect(actual).toBe(expected)
		})
		test('returnerar 0 kr närt varukorgen är tom', () => {
			const expected = 0;
			const actual = getTotalCartValue();
			expect(actual).toBe(expected)
		})
	})
		// -------------------------------------------------- //


	describe('removeFromCart', () => {
		test('ta bort objekt från cart', () => {
			// Todo: här behöver jag lägga till addtocart
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) //Lägger till produkt i varukorgen

			const cartItem = getItem(0)
			const itemId = cartItem.id

			const expected = true;
			const actual = removeFromCart(itemId);
			expect(actual).toBe(expected)
		})
		test('returnera false om objekt inte finns', () => {

			const expected = false;
			const actual = removeFromCart(8989);
			expect(actual).toBe(expected)
		})
	})
		// -------------------------------------------------- //


	describe('editCart', () => {
		test('ändrar antalet produkter i varukorg', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) //Lägger till produkt i varukorgen

			const cartItem = getItem(0) //Hämtar det första som finns i varukorgen
			const itemId = cartItem.id //Hämtar id på objektet

			const expected = true;
			const actual = editCart(itemId, { amount: 4 }); // Försöker ändra antelt till något annat som t.ex 4 
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
			const actual = editCart(8989, { amount: 10 }); //Tetsar med ett ogiltigt id exempel
			expect(actual).toBe(expected) // Förväntar false eftersom att produkten inte finns
		})
	})



//Testar så att clearCart har rensat allt från varukorgen
	describe('clearCart', () => {
		test('här rensas varukorgen', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) //Lägger till produkt i varukorgen

			clearCart() // Rensar varukorgen
			const actual = getCartItemCount(); // Hämtar antal podukter i varukorgen (vilket förväntas vara 0 efter rensning)
			expect(actual).toBe(0) // Förväntas att vara 0 produkter kvar
		})
	})
})