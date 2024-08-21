<script>
import { ref, onMounted } from 'vue';
import { useProductsStore } from '../store/store';

export default {
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
    },
    emits: ['close'],
    setup(props, { emit }) {
        const store = useProductsStore();
        const cartItems = ref([]);

        const removeProduct = (productId) => {
            if (store.getProductId) {
                store.removeFromCart(productId);
                loadCartItems();
            } else {
                alert('Produto não encontrado.');
            }
        };

        const loadCartItems = () => {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            cartItems.value = storedCart;
        };
        const closeSideBar = () => {
            emit('close')
        }

        onMounted(() => {
            loadCartItems();
        });

        return {
            closeSideBar,
            cartItems,
            store,
            removeProduct,
        }
    },

    computed: {
        totalPrice() {
            return this.store.totalPrice;
        },
        getProductId() {
            return this.store.getProductId;
        }

    },

}
</script>


<template>
    <transition name="slide">
        <aside v-if="isOpen" class="fixed inset-y-0 right-0 w-1/4 bg-white p-4 overflow-y-auto">
            <div class="flex justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="white" class="size-6 bg-black cursor-pointer fixed rounded-lg" @click="closeSideBar">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </div>
            <div v-if="cartItems.length > 0" class="mt-4">
                <div v-for="(item, index) in cartItems" :key="index" class="flex flex-col items-center mb-4 gap-4">
                    <img :src="item.image" alt="Product Image" class="w-28 h-auto object-cover rounded-lg mr-4">
                    <p class="font-montserrat text-black">{{ item.title }}</p>
                    <button @click="removeProduct(item.id)"
                        class="bg-red-800 text-white p-2 rounded-lg">Remover</button>
                </div>
            </div>
            <p v-else class="text-center mt-4 text-gray-400">O carrinho está vazio</p>
            <div class="flex text-black">
                Total price: {{ totalPrice }}
            </div>
        </aside>
    </transition>
</template>



<style>
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter,
.slide-leave-to {
    transform: translateX(100%);
}
</style>