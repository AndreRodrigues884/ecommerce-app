<script>
import { useProductsStore } from '../store/store';
import { ref, onMounted } from 'vue';
import SideBar from "../components/SideBarCart.vue";

export default {
  components: {
    SideBar,
  },
  setup() {
    const store = useProductsStore();
    const isSidebarOpen = ref(false);

    onMounted(() => {
      store.fetchLimitProducts();
    });

    const addProductToCart = (index) => {
      const product = {
        title: store.getProductsTitle[index],
        price: store.getProductsPrice[index],
        image: store.getProductsImage[index],
      };
      store.addToCart(product);
    };

    const toggleSidebar = () => {
            isSidebarOpen.value = !isSidebarOpen.value;
            if (isSidebarOpen.value) {
                console.log('Sidebar is now open');
            } else {
                console.log('Sidebar is now closed');
            }
        };

        const handleSidebarClose = () => {
            isSidebarOpen.value = false; // Feche a sidebar quando o evento close for emitido
        };

    return {
      store,
      addProductToCart,
      isSidebarOpen,
      toggleSidebar,
      handleSidebarClose,
    };

  },


  computed: {
    getProductsTitle() {
      return this.store.getProductsTitle;
    },
    getProductsPrice() {
      return this.store.getProductsPrice;
    },
    getProductsImage() {
      return this.store.getProductsImage;
    },
    cartItemCount() {
      return this.store.cartItemCount;
    } 
  },



};
</script>

<template>

  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex items-center justify-between">
      <div class="text-white text-2xl font-bold">
        MyShop
      </div>
      <div class="flex items-center space-x-4">
        <button class="text-white relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48" @click="toggleSidebar">
            <path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round"
              d="m5.815 15.64l2.056 20.267a8.445 8.445 0 0 0 8.402 7.593h15.454a8.445 8.445 0 0 0 8.402-7.593l2.056-20.268z" />
            <path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round"
              d="M15.633 15.64v-2.816a8.366 8.366 0 0 1 16.732 0v2.815" />
          </svg>
          <span v-if="cartItemCount > 0"
            class="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {{ cartItemCount }}
          </span>
          <SideBar :isOpen="isSidebarOpen" @close="handleSidebarClose" />
        </button>

        <!-- Botão de login -->
        <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Login
        </button>
      </div>
    </div>
  </nav>




  <div class="p-8 w-full">
    <div v-if="getProductsTitle.length && getProductsPrice.length && getProductsImage.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(title, index) in getProductsTitle" :key="index" class="bg-white shadow-md rounded-lg p-4">
        <img :src="getProductsImage[index]" alt="Product Image" class="w-full h-48 object-cover rounded-t-lg" />
        <div class="p-4">
          <p class="font-montserrat font-medium text-lg">{{ title }}</p>
          <p class="font-montserrat font-light text-xl text-gray-500">{{ getProductsPrice[index] + ' €' }}</p>
        </div>
        <button @click="addProductToCart(index)"
          class="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
          Add
        </button>
      </div>
    </div>
    <p v-else>Carregando Produtos...</p>
  </div>


</template>

<style></style>
