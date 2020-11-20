<template>
  <div class="cartcontrol">
    <div
      class="cart-decrease"
      v-show="food.count > 0"
      @click.stop.prevent="decreaseCart"
      transition="move"
    >
      <span class="inner iconfont icon-jianhao"></span>
    </div>
    <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
    <div
      class="cart-add iconfont icon-add-circle"
      @click.stop.prevent="addCart"
    ></div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "cartcontrol",
  data() {
    return {};
  },
  props: {
    food: {
      type: Object,
    },
    selectedFood: {
      type: Object
    }
  },
  created() {
    // console.log(this.food);
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return;
      }
      //   console.log("aa");
      // if(this.selectedFood!=this.food){
      //   return;
      // }
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      this.$emit("cart.add", event.target);
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    },
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
  font-size: 0
  .cart-decrease, .cart-add
    display: inline-block
    padding: 6px
    transition: all 0.4s linear
    &.move-transition
      opacity: 1
      transform: translate3D(0, 0, 0)
    .inner
      display: inline-block
      font-size: 24px
      line-height: 24px
      transition: all 0.4s linear
      transform: rotate(0)
    &.move-enter, &move-leave
      opacity: 0
      transform: translate3d(24px, 0, 0)
      .inner
        transform: rotate(180)
  .cart-count
    display: inline-block
    vertical-align: top
    width: 12px
    padding-top: 6px
    line-height: 24px
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)
  .cart-add
    display: inline-block
    line-height: 24px
    font-size: 24px
    padding: 6px
</style>