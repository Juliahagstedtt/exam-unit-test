// importera här
import { addToCart, getCartItemCount } from "../cart"


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
		test('räknar antal i cart', () => {

			const expected = true;
			const actual = getCartItemCount();
			expect(actual).toBe(expected)
		})
		
		test('visar när cart är tom', () => {

			const expected = true;
			const actual = getCartItemCount();
			expect(actual).toBe(expected)
		})
	})

		// -------------------------------------------------- //



	describe('getCartValue', () => {
		test('visar det totala i vaurkorgen', () => {

			const expected = 215;
			const actual = getCartValue();
			expect(actual).toBe(expected)
		})
		test('returnerar 0 om cart är tomt', () => {
			const expected = 0;
			const actual = getCartValue();
			expect(actual).toBe(expected)
		})
	})
		// -------------------------------------------------- //


	describe('removeFromCart', () => {
		test('ta bort objekt från cart', () => {
			// Todo: här behöver jag lägga till addtocart
			const expected = true;
			const actual = removeFromCart(1002);
			expect(actual).toBe(expected)
		})
		test('returnera false om objekt inte finns', () => {

			const expected = false;
			const actual = removeFromCart();
			expect(actual).toBe(expected)
		})
	})
		// -------------------------------------------------- //


	describe('editCart', () => {
		test('ändrar antalet produkter i varukorg', () => {

			const expected = true;
			const actual = editCart();
			expect(actual).toBe(expected)
		})
		test('ta bort objekt från varukorg', () => {

			const expected = false;
			const actual = editCart();
			expect(actual).toBe(expected)
		})
	})
		// -------------------------------------------------- //


	describe('clearCart', () => {
		test('här rensas varukorgen', () => {

			clearCart()
			const actual = getCartItemCount();
			expect(actual).toBe(0)
		})
	})
})