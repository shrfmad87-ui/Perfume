import products from './products.js'
const { createApp } = Vue;

const app = createApp({
  data() {
    return {
        products: products,
        searchQuery: '',
        cart:false,
        cartItems:[],
    }
  },
  computed: {
    filteredProducts() {
        return this.products.filter(product => {
            const searchLower = this.searchQuery.toLowerCase();
            return product.title.toLowerCase().includes(searchLower) || 
                   product.brand.toLowerCase().includes(searchLower);
        });
    },
    CartItemsCounter() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    Discount(){
      if (this.totalPrice>=200){
        return `<div><del>${this.totalPrice}$</del> <p>${(this.totalPrice*0.9).toFixed(2)}$</p> <p>10% Discount on orders above $200 </p> </div>`
      }
      else{
        return `<p>${this.totalPrice}$</p>`
      }
    },
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  },
  methods:{
    goCart(){
      this.cart = true
    },
    goHome(){
      this.cart = false
    },
    addToCart(product) {
      const existing = this.cartItems.find(item => item.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.cartItems.push({ ...product, quantity: 1 }); 
      }
    },
    deleteItem(product) {
      const item = this.cartItems.find(i => i.id === product.id);
      if (!item) return;
      if (item.quantity <= 1) {
        this.cartItems = this.cartItems.filter(i => i.id !== product.id);
      } else {
        item.quantity--;
      }
    }
  },
  mounted() {
    AOS.init({
      once: true, 
      duration: 1000
    });
  },
  updated() {
    AOS.refresh();
  }
})

app.mount('#app')