import { defineStore } from 'pinia';
import { getLimitProducts } from './request.js';


export const useProductsStore = defineStore('auth', {
    state: () => ({
        productsData: [],
        cart: JSON.parse(localStorage.getItem('cart')) || [],
    }),
    getters: {
        getProductsTitle: (state) => state.productsData.map(product => product.title),
        getProductsPrice: (state) => state.productsData.map(product => product.price),
        getProductsImage: (state) => state.productsData.map(product => product.image),
        getProductId: (state) => state.productsData.map(product => product.id),
        cartItemCount: (state) => state.cart.length,
        totalPrice: (state) => state.cart.reduce((sum, item) => sum + item.price, 0),
    },
    actions: {
        async fetchLimitProducts() {
            try {
                this.productsData = await getLimitProducts();
                console.log('Produtos:', this.productsData);
            } catch (error) {
                console.error('Erro ao obter produtos:', error);
            }
        },
        addToCart(product) {
            this.cart.push(product);
            localStorage.setItem('cart', JSON.stringify(this.cart));

            alert(`${product.title} foi adicionado ao carrinho!`);
        },
        removeFromCart(productId) {
            this.cart = this.cart.filter(product => product.id !== productId); // Remove o item com o id correspondente
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    },
},
)
