// Remember to use RED, GREEN, REFACTOR
// 1. pick one test case in validation.test.js
// 2. write the code, verify that the test is RED
// 3. write code in this file so that the test case becomes GREEN
// 4. refactor as neccessary before you move on to the next
// 5. repeat


//Kollar om de är en kundvagnsvara
function isCartItem(maybeCartItem) {
// Blir false om maybeCartItem inte är ett objekt eller om de är null eller en array
if (typeof maybeCartItem !== 'object' ||
    maybeCartItem === null ||
    Array.isArray(maybeCartItem)
) {
    return false;
}
// Blir false om id inte är number
if (typeof maybeCartItem.id !== 'number') {
    return false;
}
// Blir false om amount inte är number
if (typeof maybeCartItem.amount !== 'number') {
    return false;
}
// Blir false om item inte är en giltig produkt
if (!isProduct(maybeCartItem.item)) {
    return false;
}
// Blir true om allt stämmer
    return true;
}

// Kollar om de är en produkt
function isProduct(maybeProduct) {
// Blir false om maybeProduct inte är ett objekt eller om de är null eller en array
if (typeof maybeProduct !== 'object' ||
    maybeProduct === null ||
    Array.isArray(maybeProduct)
) {
    return false;
}
// Blir false om id inte är number
if (typeof maybeProduct.id !== 'number') {
    return false;
}
// Blir false om name inte är text (string)
if (typeof maybeProduct.name !== 'string') {
    return false;
}
// Blir false om price inte är number
if (typeof maybeProduct.price !== 'number') {
    return false;
}
// Blir true om allt stämmer
    return true;
}

export { isCartItem, isProduct };
