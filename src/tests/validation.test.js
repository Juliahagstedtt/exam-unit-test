import { isCartItem, isProduct } from "../validation.js"

// Exempel på en giltig produkt: har id, namn och pris
const exampleProduct = {
	id: 1001,
	name: 'Badanka',
	price: 500
}


// Exempel på en giltig vara i kundvagnen: har id, antal och ett item (en produkt), i detta fall är (exampleProduct)
const exampleCartObject = {
	id: 2001,
	amount: 1,
	item: exampleProduct
}


// Här behövs inte beforeEach eftersom testerna bara testar enskilda funktioner med färdiga exempel,
// och inget sparas eller påverkar andra tester.

// Tester för funktionen isCartItem, kontrollerar om ett objekt är en giltig kundvagnsvara
describe('isCartItem', () => {

	// Returnera true om objektet är en korrekt kundvagnsvara (objektet är exampleCartObject)
	test('returnera true om cartitem är giltig', () => {
		const input = exampleCartObject; // giltig kundvagnsvara
		const expected = true; // förväntar att funktionen returnerar true om allt är giltigt
		const actual = isCartItem(input); // Funktionen kör med input
		expect(actual).toBe(expected) // jämför med de som förväntades
	})


	// Ska returnera false om något är fel eller saknas som t.ex id, mängd och item
	test('returnera false  om cartitem är ogiltig', () => {
		
		const input = { id: 2001, }; //exempel på ett ogiltigt input där information saknas

		const expected = false; // Om de är ogiltigt förväntas false

		const actual = isCartItem(input); // Validerar input med funktionen isCartItem, för att se om det är en giltig kundvagnsvara

		expect(actual).toBe(expected) // Jämför resultatet (actual) med det förväntade värdet (expected), vilket är false
	})
	
})

describe('isProduct', () => {
	// Blir true om produkten är giltig
	test('returnerar true om produkten är giltig', () => {
		const input = exampleProduct;
		const expected = true; // förväntar att funktionen returnerar true om allt är giltigt
		const actual = isProduct(input); //Funktionen kör med input
		expect(actual).toBe(expected)// jämför med de som förväntades (true)
	})


// Blir false om produkten är ogiltig (t.ex. om något saknas, som id, namn eller pris)
	test('returnerar false om produkten är ogiltig', () => {
		const input = {id: 1001}; // Ogiltig produkt, saknar namn och pris
		const expected = false; // förväntar false eftersom produkten är ofullständing 
		const actual = isProduct(input); // Funktionen kör med input, som är ogiltigt
		expect(actual).toBe(expected) // jämför med de som förväntades (false)
	})

})