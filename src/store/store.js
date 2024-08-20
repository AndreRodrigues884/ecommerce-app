import { defineStore } from 'pinia';
import { getLimitProducts } from './request.js';


export const useProductsStore = defineStore('auth', {
    state: () => ({
        productsData: [],
        cart: JSON.parse(localStorage.getItem('cart')) || [],
    }),
    getters: {
        getProductsTitle: (state) => {
            if (state.productsData && state.productsData.length > 0) {
                // Retorna os títulos de todos os produtos como um array
                return state.productsData.map(product => product.title);
            }
            return [];
        },
        getProductsPrice: (state) => {
            if (state.productsData && state.productsData.length > 0) {
                // Retorna os títulos de todos os produtos como um array
                return state.productsData.map(product => product.price);
            }
            return [];
        },
        getProductsImage: (state) => {
            if (state.productsData && state.productsData.length > 0) {
                // Retorna os títulos de todos os produtos como um array
                return state.productsData.map(product => product.image);
            }
            return [];
        },
        cartItemCount: (state) => {
            return state.cart.length; // Conta o número de itens no carrinho
          }
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
        }
    },
},
)
