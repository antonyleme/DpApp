export function addItem(product, qtd) {
    return {
        type: '@cart/ADD',
        payload: { 
            item: {
                product,
                qtd
            } 
        }
    }
}

export function removeItem(item) {
    return {
        type: '@cart/REMOVE',
        payload: { item }
    }
}

export function clearCart() {
    return {
        type: '@cart/CLEAR',
    }
}

export function saveCreditCard(number, valid) {
    return {
        type: '@cart/CARD',
        payload: {number, valid}
    }
}