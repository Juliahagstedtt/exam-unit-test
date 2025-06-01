// RED, GREEN, REFACTOR
// RED = skriv ett test som misslyckas
// GREEN = implementera kod som får testet att passera
// REFACTOR = förbättra koden utan att ändra funktionalitet

// Den här funktionen kollar om något är en vara i kundvagnen och att allt som behövs finns med. 
// Den säger true om id, antal och item (själva produkten) finns och är korrekt, annars blir de false.
function isCartItem(maybeCartItem) {

// Kollar att maybeCartItem är en vanlig sak med delar som id, amount och item
// Blir false om maybeCartItem inte är ett objekt, är null eller en lista (array)
if (typeof maybeCartItem !== 'object' ||
    maybeCartItem === null ||
    Array.isArray(maybeCartItem)
) {
    return false;
}

// Returnera false om id inte är number
if (typeof maybeCartItem.id !== 'number') {
    return false;
}
// Returnera false om amount inte är number
if (typeof maybeCartItem.amount !== 'number') {
    return false;
}

// Kollar att item (produkten i kundvagnen) är en riktig produkt med id, namn och pris, annars returnera false
// Vi använder isProduct här eftersom en kundvagnsvara måste innehålla en giltig produkt
if (!isProduct(maybeCartItem.item)) {
    return false;
}

// Returnera true om allt stämmer
    return true;
}





// Den här funktionen kollar om något är en riktig produkt. 
// Den säger true om det finns ett id, ett namn och ett pris, annars blir de false
function isProduct(maybeProduct) {

// Kollar att maybeProduct är vanlig sak med egenskaper, som t.ex. id, namn och pris
// Blir false om maybeProduct inte är ett objekt, är null eller en lista (array)
if (typeof maybeProduct !== 'object' ||
    maybeProduct === null ||
    Array.isArray(maybeProduct)
) {
    return false;
}

// Returnera false om id inte är nummer (number)
if (typeof maybeProduct.id !== 'number') {
    return false;
}
// Returnera false om name inte är text (string)
if (typeof maybeProduct.name !== 'string') {
    return false;
}
// Returnera false om price inte är nummer (number)
if (typeof maybeProduct.price !== 'number') {
    return false;
}
// Returnera true om allt stämmer
    return true;
}

export { isCartItem, isProduct };
