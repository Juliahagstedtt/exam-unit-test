import { isCartItem, isProduct } from "../validation.js"
// Examples of a valid product and a valid cart item. You may use these when testing below.
const exampleProduct = {
	id: 1001,
	name: 'Badanka',
	price: 500
}

const exampleCartObject = {
	id: 2001,
	amount: 1,
	item: exampleProduct
}

// Test för Validering
describe('isCartItem', () => {
	// Blir true om kundvangsvaran som skickas in är giltig
	test('returnera true om cartitem är giltig', () => {
		const input = exampleCartObject; // giltig exempel av kundvagnsvara
		const expected = true; // förväntar att funktionen returnerar true om allt är giltigt
		const actual = isCartItem(input); //Funktionen kör med input
		expect(actual).toBe(expected) // jämför med de som förväntades
	})


	// Blir false om kundvangsvaran som skickas in är ogiltig
	test('returnera false  om cartitem är ogiltig', () => {
		const input = { id: 2001, }; //exempel på ett ogiltigt input där information saknas
		const expected = false; //Om de är ogiltigt förväntas false
		const actual = isCartItem(input); //Funktionen kör med input
		expect(actual).toBe(expected)// jämför med de som förväntades
	})
	
})

describe('isProduct', () => {
	// Blir true om produkten är giltig
	test('returnerar true om produkten är giltig', () => {
		const input = exampleProduct;
		const expected = true; // förväntar att funktionen returnerar true om allt är giltigt
		const actual = isProduct(input); //Funktionen kör med input
		expect(actual).toBe(expected)// jämför med de som förväntades
	})



	test('returnerar false om produkten är ogiltig', () => {
		// Blir false om produkten är ogiltig (om de saknas något)
		const input = {id: 1001};
		const expected = false; // förväntar att funktionen returnerar true om allt är giltigt
		const actual = isProduct(input); //Funktionen kör med input
		expect(actual).toBe(expected)// jämför med de som förväntades
	})

})