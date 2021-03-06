<template>
  <div v-show="showFlag" class="food" transition="move" ref="food">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image" />
        <div class="back" @click="hide">
          <i class="iconfont icon-xiangzuo1"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{ food.name }}</h1>
        <div class="detail">
          <span class="sell-count">月售{{ food.sellCount }}份</span>
          <span class="rating">好评率{{ food.rating }}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{ food.price }}</span>
          <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div
          @click.stop.prevent="addFirst"
          class="buy"
          v-show="!food.count || food.count === 0"
          transition="fade"
        >
          加入购物车
        </div>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{ food.info }}</p>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect
          @increment="incrementTotal"
          :select-type="selectType"
          :only-content="onlyContent"
          :desc="desc"
          :ratings="food.ratings"
        ></ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li
              v-show="needShow(rating.rateType, rating.text)"
              v-for="rating in food.ratings"
              class="rating-item border-1px"
            >
              <div class="user">
                <span class="name">{{ rating.username }}</span>
                <img
                  class="avatar"
                  width="12"
                  height="12"
                  :src="rating.avatar"
                  alt=""
                />
              </div>
              <div class="time">{{ rating.rateTime | formatDate }}</div>
              <p class="text">
                <span
                  :class="{
                    'iconfont icon-dianzan1': rating.rateType === 0,
                    'iconfont icon-dianzan_active': rating.rateType === 1,
                  }"
                >
                </span>
                {{ rating.text }}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
            暂无评价
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartcontrol from "components/cartcontrol/cartcontrol";
import split from "components/split/split"
import ratingselect from "components/ratingselect/ratingselect"
import { formatDate } from 'common/js/date'

const ALL = 2;

export default {
  name: "food",
  props: {
    food: {
      type: Object
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  methods: {
    show() {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide() {
      this.showFlag = false
    },
    addFirst(event) {
      console.log('click');
      if (!event._constructed) {
        return
      }
      this.$emit("cart.add", event.target);
      Vue.set(this.food, 'count', 1)
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    incrementTotal(type, data) {
      this[type] = data;
      this.$nextTick(() => { // 当我们改变数据的时候，DOM的更新是异步的
        this.scroll.refresh();
      });
    }
  },
  // events: {
  //   'ratingtype.select'(type) {
  //     this.selectType = type
  //     this.$nextTick(() => {
  //       this.scroll.refresh()
  //     })
  //   },
  //   'content.toggle'(onlyContent) {
  //     this.onlyContent = onlyContent
  //     this.$nextTick(() => {
  //       this.scroll.refresh()
  //     })
  //   }
  // },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.food
  position: fixed
  left: 0
  top: 0
  bottom: 48px
  z-index: 30
  width: 100%
  background: #fff
  &.move-transition
    transition: all 0.2s linear
    transform: translate3d(0, 0, 0)
  &.move-enter, &.move-leave
    transform: translate3d(100%, 0, 0)
  .image-header
    position: relative
    width: 100%
    height: 0
    padding-top: 100%
    img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
    .back
      position: absolute
      top: 10px
      left: 0
    .icon-xiangzuo1
      display: block
      padding: 10px
      font-size: 20px
      color: #fff
  .content
    position: relative
    padding: 18px
    .title
      line-height: 14px
      margin-bottom: 8px
      font-size: 14px
      font-weight: 700
      color: rgb(7, 17, 27)
    .detail
      margin-bottom: 18px
      line-height: 10px
      height: 10px
      font-size: 0
      .sell-count, .rating
        font-size: 10px
        color: rgb(147, 153, 159)
      .sell-count
        margin-right: 12px
    .price
      font-weight: 700
      line-height: 24px
      .now
        margin-right: 8px
        font-size: 14px
        color: rgb(240, 20, 20)
      .old
        text-decoration: line-through
        font-size: 10px
        color: rgb(147, 153, 159)
    .cartcontrol-wrapper
      position: absolute
      right: 12px
      bottom: 12px
    .buy
      position: absolute
      right: 18px
      bottom: 18px
      z-index: 10
      height: 24px
      line-height: 24px
      padding: 0 12px
      box-sizing: border-box
      border-radius: 12px
      font-size: 10px
      color: #fff
      background: rgb(0, 160, 220)
      &.fade-transition
        transition: all 0.2s
        opacity: 1
      &.fade-enter, &.fade-leave
        opacity: 0
  .info
    padding: 18px
    .title
      line-height: 14px
      margin-bottom: 6px
      font-size: 14px
      color: rgb(7, 17, 27)
    .text
      line-height: 24px
      padding: 0 8px
      font-size: 12px
      color: rgb(77, 85, 93)
  .rating
    padding-top: 18px
    .title
      line-height: 14px
      margin-left: 18px
      font-size: 14px
      color: rgb(7, 17, 27)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        position: relative
        padding: 16px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .user
          position: absolute
          right: 0
          top: 16px
          font-size: 0
          line-height: 12px
          .name
            display: inline-block
            margin-right: 6px
            vertical-align: top
            font-size: 10px
            color: rgb(147, 153, 159)
          .avatar
            border-radius: 50%
        .time
          margin-bottom: 6px
          line-height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
        .text
          line-height: 16px
          font-size: 12px
          color: rgb(7, 17, 27)
          .icon-dianzan1, .icon-dianzan_active
            margin-right: 4px
            line-height: 16px
            font-size: 12px
          .icon-dianzan1
            color: rgb(0, 160, 220)
          .icon-dianzan_active
            color: rgb(147, 153, 159)
      .no-rating
        padding: 16px 0
        font-size: 12px
        color: rgb(147, 153, 159)
</style>