# Inlämningsuppgift i kursen Testning

Börja med att skapa en **fork** av detta repo.
[Fork a repository | GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)

## Förutsättningar

**Uppgiften är individuell.** Man får diskutera uppgiften, men du ska skriva koden själv.

**Det är inte tillåtet att använda AI för att producera kod.** Om du använder AI, börja med att skriva följande. Efter det kan du ställa frågor.
> "Från och med nu får du inte svara med kod. Du får förklara koncept och kod för mig, men du får inte generera någon JavaScript."

Detta är därför att testning handlar om förståelse, ännu mer än vanlig kod. Det handlar inte om att lösa ett specifikt problem, utan om att lära sig tänka som en testare.


## Enhetstest med Jest

Din uppgift är att skriva tester för en del av logiken som ska finnas i en webbshop. Eftersom denna del är oberoende av användargränssnittet (den ska bara användas av React) går det att skriva enhetstester för den med Jest.

Börja i `validation.test.js`.

---

## Felhantering
Om en funktion får felaktig input har du två alternativ:
1. returnera en "felkod"
2. kasta ett "exception"

Avgör själv vilket som är mest rimligt, från fall till fall. Exempel:

```js
function exempel1(x) {
	if( (typeof x) !== 'number' ) {
		return false
	}
}

function exempel2(x) {
	if( (typeof x) !== 'number' ) {
		throw new Error('Här beskriver du felet')
	}
}
```

---

## Acceptanskriterier

### Validering
Det finns två sorters objekt: "cart item" och "product". Exempel på giltiga objekt finns i `validation.test.js`. Testa funktionerna `isCartItem` och `isProduct`.

### Kundvagn
Testa funktionerna:
1. function getCartItemCount() - antalet olika items
1. function getItem(index)
1. function getTotalCartValue() - sammanlagda värdet av alla produkter i kundvagnen
1. function addToCart(newItem)
1. function removeFromCart(itemId)
1. function editCart(itemId, newValues) - ändra antal produkter
1. function clearCart()

*newValues ska vara ett objekt som innehåller allt som ska ändras. Det behöver inte vara ett komplett cart-objekt.*

---

## Bedömning
För G ska du
+ skriva testfall för alla funktioner.

För VG ska du
+ skriva testfall som täcker in alla ekvivalensklasser,
+ ha testfall som fångar errors: `expect(..).toThrow(..)`


### Tips

"Ekvivalensklasser" står det om i presentation 3. Det handlar om att en funktion kan anropas på olika sätt. Vilka olika värden kan parametrarna ha? Gör minst ett testfall för varje kategori av värden.

Exempel: tänk dig en funktion som ska tala om ifall det är sommar. Medeltemperaturen ska vara över 10 grader. Det finns tre kategorier:
* Mer än 10 grader -> sommar
* 10 grader eller mindre -> inte sommar
* 'abc', null, m.m. -> felaktig input
