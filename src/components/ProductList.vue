<script>
import { useProductsStore } from '../store/store';
import { onMounted } from 'vue';

export default {
  setup() {
    const store = useProductsStore();

    onMounted(() => {
      store.fetchLimitProducts();
    });

    return {
      store,
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
    }
  },



};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-if="getProductsTitle.length">
      <p class="font-montserrat font-light text-xl uppercase" v-for="(title, index) in getProductsTitle"
        :key="index">
        {{ title }}
      </p>
    </div>
    <p v-else>Carregando Titles...</p>
    <div v-if="getProductsPrice.length">
      <p class="font-montserrat font-light text-xl uppercase" v-for="(price, index) in getProductsPrice"
        :key="index">
        {{ price }}
      </p>
    </div>
    <p v-else>Carregando Prices...</p>
    <div v-if="getProductsImage.length">
      <img v-for="(image, index) in getProductsImage" :src="image" :key="index" alt="Product Image" class="product-image" />
    </div>
    <p v-else>Carregando Imagens...</p>
  </div>
</template>

<style></style>
