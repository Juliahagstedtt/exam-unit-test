// importera här
import { getCartItemCount, addToCart, getItem, getCartValue, removeFromCart, editCart, clearCart } from "../cart"
import { isProduct } from "../validation"


describe('Cart', () => {
	beforeEach(() => {
		// Denna kod körs före varje test. Det är för att rensa kundvagnen, så inte saker ligger kvar från föregående test.
		clearCart()
	})


	// Du får ett test att börja med
	test('addToCart lägger till en ny produkt i kundvagnen', () => {
		const itemCountBefore = getCartItemCount()
		const input = { id: 1002, name: 'Vattenpistol', price: 40 }
		// addToCart returnerar inget - den påverkar kundvagnen
		// vi behöver använda getCartItemCount för att se om det har lagts till en ny produkt i kundvagnen
		addToCart(input)
		const itemCountAfter = getCartItemCount()
		expect(itemCountAfter).toBe(itemCountBefore + 1)
	})

	
	// -------------------------------------------------- //


	describe('getCartItemCount', () => {
		test('returnerar 0 när de är tomt i cart', () => {
			clearCart()
			const expected = 0;
			const actual = getCartItemCount();
			expect(actual).toBe(expected)
		})
		
		test('returnerar antal produkter i varukorgen', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 }
			addToCart(produkt)

			const expected = 1;
			const actual = getCartItemCount();
			expect(actual).toBe(expected)
		})
	})

		// -------------------------------------------------- //


	describe('getItem', () => {
		test('returnerar ett objekt om index finns', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 }
			addToCart(produkt)

			const result = getItem(0)
			expect(result.item).toEqual(produkt)
		})
		test('returnerar undefined om index inte finns', () => {
			const result = getItem(21)
			expect(result).toBeUndefined()
		})
	})


	describe('getCartValue', () => {
		test('visar det totala i vaurkorgen', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 }
			addToCart(produkt)

			const expected = 12;
			const actual = getCartValue();
			expect(actual).toBe(expected)
		})
		test('returnerar 0 kr närt varukorgen är tom', () => {
			const expected = 0;
			const actual = getCartValue();
			expect(actual).toBe(expected)
		})
	})
		// -------------------------------------------------- //


	describe('removeFromCart', () => {
		test('ta bort objekt från cart', () => {
			// Todo: här behöver jag lägga till addtocart
			const produkt = { id: 1003, name: 'snorkel', price: 12 }
			addToCart(produkt)

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
			const produkt = { id: 1003, name: 'snorkel', price: 12 }
			addToCart(produkt)

			const cartItem = getItem(0)
			const itemId = cartItem.id

			const expected = true;
			const actual = editCart(itemId, { amount: 4 });
			expect(actual).toBe(expected)
		})
		test('ta bort produkt från varukorg', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 }
			addToCart(produkt)

			const cartItem = getItem(0)
			const itemId = cartItem.id

			const expected = true;
			const actual = editCart(itemId, { amount: 0 });
			expect(actual).toBe(expected)
		})
		test('returnerar false om produkten inte finns', () => {
			const expected = false;
			const actual = editCart(8989, { amount: 10 });
			expect(actual).toBe(expected)
		})
	})
		// -------------------------------------------------- //


	describe('clearCart', () => {
		test('här rensas varukorgen', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 }
			addToCart(produkt)
			clearCart()
			const actual = getCartItemCount();
			expect(actual).toBe(0)
		})
	})
})