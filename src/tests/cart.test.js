// importera här
import { expect } from "playwright/test"
import { getCartItemCount, addToCart, getItem, getTotalCartValue, removeFromCart, editCart, clearCart } from "../cart"

// beforeEach används här för att rensa kundvagnen innan varje test körs,
// så att testerna inte påverkar varandra. Annars kan en vara som lagts till i ett test ligga kvar i nästa.
describe('Cart', () => {
	beforeEach(() => {
		// Denna kod körs före varje test. Det är för att rensa kundvagnen, så inte saker ligger kvar från föregående test.
		clearCart() // Nollställer varukorgen
	})

	// Testar funktionen addToCart, som lägger till produkter i kundvagnen.
	// Här kontrolleras att produkten verkligen läggs till och att antal i kundvagnen ökar.
	test('addToCart lägger till en ny produkt i kundvagnen', () => {
		const itemCountBefore = getCartItemCount() // Sparar antal produkter innan något läggs till 
		const input = { id: 1002, name: 'Vattenpistol', price: 40 } // Testprodukt 

		// addToCart returnerar inget - den påverkar kundvagnen
		// vi behöver använda getCartItemCount för att se om det har lagts till en ny produkt i kundvagnen

		addToCart(input) // Lägger till produkten i varukorg 
		const itemCountAfter = getCartItemCount() // Hämtar antalet produkter i varukorgen efter att produkten har lagts till
		expect(itemCountAfter).toBe(itemCountBefore + 1) // Kontroll att antalet har ökat med 1
	})
	// Testar att addToCart kastar fel om produkten är ogiltig
	test('kastar fel om produkten är ogiltig i addToCart', () => {
		// Här skickas ett ogiltigt objekt in (som saknar name och price)
		const ogiltig = { name: "saknar id och namn" }

		// Förväntar att funktionen ska kasta ett felmeddelande eftersom produkten inte uppfyller kraven
		expect(() => addToCart (ogiltig)).toThrow("Ogiltig produkt")
	})

	

	// Testar funktionen getCartItemCount, som räknar hur många produkter som finns i kundvagnen.
	describe('getCartItemCount', () => {

		// Testar att funktionen returnerar 0 om vagnen är tom
		test('returnerar 0 när de är tomt i cart', () => {
			clearCart() // Säkerställer att varukorgen är tom
			const expected = 0; // Förväntat antal produkter 
			const actual = getCartItemCount(); // Hämtar antal produkter i varukorgen 
			expect(actual).toBe(expected) // Kontroll att funktionen returnerar 0 när inget finns 
		})

		// Testar att funktionen visar rätt antal när vi har lagt till något
		test('returnerar antal produkter i varukorgen', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) // Lägger till produkt i varukorgen

			const expected = 1; // Lades till en produkt 
			const actual = getCartItemCount(); // Hämtar antal produkter i varukorgen 
			expect(actual).toBe(expected) // Kontroll att antalet är korrekt
		})
	})


	// Testar funktionen getItem, som hämtar en produkt från ett visst index i kundvagnen.
	describe('getItem', () => {

		// Testar att man kan hämta ett objekt som finns
		test('returnerar ett objekt om index finns', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) //Lägger till produkt i varukorgen

			const result = getItem(0) // Hämtar de första objektet i varukorgen (index 0)
			expect(result.item).toEqual(produkt) // Kontroll att produkten som hämtas är exakt den som tidigare lades till varukorgen
		})

		// Testar att man får undefined om man försöker hämta något som inte finns (att inget hittades)
		test('returnerar undefined om index inte finns', () => {
			const result = getItem(21) // Försöker hämta ett objekt från ett index som inte existerar
			expect(result).toBeUndefined() // Förväntar resultatet att vara undefined eftersom att indexet är ogiltigt
		})
	})


	// Testar funktionen getTotalCartValue, som räknar ihop det totala värdet av kundvagnen.
	describe('getTotalCartValue', () => {

		// Testar att totalvärdet blir rätt när en produkt ligger i varukorgen
		test('visar det totala i varukorgen', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) // Lägger till produkt i varukorgen

			const expected = 12; // Eftersom amount är 1 och priset är 12, blir totala värdet 12
			const actual = getTotalCartValue(); // Hämtar de totala värdet från varukorgen

			expect(actual).toBe(expected) // Förväntar att värdet ska vara 12
		})

		// Testar att funktionen returnerar 0 om vagnen är tom
		test('returnerar 0 kr när varukorgen är tom', () => {
			// Ingen produkt har lagts till, så värdet är 0

			const expected = 0; // Förväntar att de totala värdet är 0 
			const actual = getTotalCartValue(); // Hämtar det totala värdet från varukorgen 

			expect(actual).toBe(expected) // Förväntar 0 när varukorgen är tom
		})
	})


	// Testar funktionen removeFromCart, som tar bort en produkt från kundvagnen med hjälp av dess id.
	describe('removeFromCart', () => {

		// Testar att man kan ta bort en produkt som finns
		test('ta bort objekt från cart', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) // Lägger till produkt i varukorgen

			const cartItem = getItem(0) // Hämtar första objektet i varukorgen
			const itemId = cartItem.id // Hämtar produktens unika cart id i varukorgen

			const expected = true; // Förväntar att produkten ska tas bort
			const actual = removeFromCart(itemId); // Försöker ta bort produkten från varukorgen 

			expect(actual).toBe(expected) // Ska returnera true om borttagningen lyckades
		})
		// Testar att funktionen hanterar ogiltiga id korrekt, t.ex om inte produkten finns
		test('returnera false om objekt inte finns', () => {

			const expected = false; // Förväntar false om produkten inte finns
			const actual = removeFromCart(8989); // Försöker ta bort en produkt med ogiltig (icke existerande) id

			expect(actual).toBe(expected) // Returnerar false eftersom produkten inte finns i varukorgen och därför inte kan tas bort
		})
	})


	// Testar funktionen editCart, som ändrar antal på en viss produkt, eller tar bort den om antalet blir 0.
	describe('editCart', () => {

		// Testar att man kan ändra antalet på en produkt
		test('ändrar antalet produkter i varukorg', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) //Lägger till produkt i varukorgen

			const cartItem = getItem(0) //Hämtar det första som finns i varukorgen
			const itemId = cartItem.id //Hämtar id på objektet

			const expected = true;
			const actual = editCart(itemId, { amount: 4 }); // Försöker ändra antalet till något annat som t.ex 4 
			expect(actual).toBe(expected) // Förväntar att ändringen lyckas och att de då blir true
		})

		// Testar att sätta amount till 0 tar bort produkten
		test('ta bort produkt från varukorg', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 } // Test produkt
			addToCart(produkt) // Lägger till produkt i varukorgen

			const cartItem = getItem(0) // Hämtar produkten vi nyss la till i varukorgen
			const itemId = cartItem.id // Hämtar id på objektet

			const expected = true;
			const actual = editCart(itemId, { amount: 0 }); // Försöker ta bort produkten 
			expect(actual).toBe(expected) // Förväntar att produkten tas bort
		})

		// Testar att editCart kastar fel om produkten inte finns i varukorgen	
		test('kastar fel om produkten inte finns', () => {
			// Använder ett ID som inte finns i kundvagnen
			expect(() => editCart(8989, { amount: 1 })).toThrow("Produkten finns inte i kundvagnen");
		});

		// Testar att editCart kastar fel om amount är negativt eller ogiltigt (t.ex har negativa tal)
		test('kastar fel om amount är negativt eller ogiltigt', () => {
			const produkt = { id: 1003, name: 'snorkel', price: 12 }; // Giltig testprodukt
			addToCart(produkt);  // Lägger till produkten i kundvagnen

			const cartItem = getItem(0); // Hämtar produkten ur kundvagnen
			const itemId = cartItem.id; // Hämtar produktens unika id i kundvagnen

			// Testar två olika ogiltiga värden för amount som båda är negativa
			expect(() => editCart(itemId, { amount: -2 })).toThrow("Amount måste vara ett giltigt tal större än eller lika med 0");
			expect(() => editCart(itemId, { amount: -8989 })).toThrow("Amount måste vara ett giltigt tal större än eller lika med 0");
		});
	})



	// Testar funktionen clearCart, som rensar hela varukorgen och gör den tom.
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