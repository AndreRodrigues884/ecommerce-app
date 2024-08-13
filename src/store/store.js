import { defineStore } from 'pinia';
import { getLimitProducts } from './request.js';


export const useProductsStore = defineStore('auth', {
    state: () => ({
        productsData: [],
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
        }
    },
})
