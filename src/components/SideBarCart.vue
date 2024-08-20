<script>
import { ref, onMounted } from 'vue';

export default {
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
    },
    emits: ['close'],
    setup(props, { emit }) {
        const cartItems = ref([]);

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
        }
    }
}
</script>


<template>
    <transition name="slide">
        <aside v-if="isOpen" class="fixed inset-y-0 right-0 w-64 bg-black text-white p-4">
            <div class="flex justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6 text-white mr-6 cursor-pointer" @click="closeSideBar">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </div>
            <div v-if="cartItems.length > 0" class="mt-4">
                <div v-for="(item, index) in cartItems" :key="index" class="flex items-center mb-4">
                    <img :src="item.image" alt="Product Image" class="w-12 h-12 object-cover rounded-lg mr-4">
                    <p class="font-montserrat text-white">{{ item.title }}</p>
                </div>
            </div>
            <p v-else class="text-center mt-4 text-gray-400">O carrinho está vazio</p>
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