<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span
        @click="select(2, $event)"
        class="block positive"
        :class="{ active: mySelectType === 2 }"
        >{{ desc.all }}
        <span class="count">{{ ratings.length }}</span>
      </span>
      <span
        @click="select(0, $event)"
        class="block positive"
        :class="{ active: mySelectType === 0 }"
        >{{ desc.positive }}
        <span class="count">{{ positives.length }}</span>
      </span>
      <span
        @click="select(1, $event)"
        class="block negative"
        :class="{ active: mySelectType === 1 }"
        >{{ desc.negative }}
        <span class="count">{{ negatives.length }}</span>
      </span>
    </div>
    <div
      @click="toggleContent($event)"
      class="switch"
      :class="{ on: myOnlyContent }"
    >
      <i class="iconfont icon-zysjs-gou"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  name: "ratingselect",
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: true
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
  },
  data() {
    return {
      mySelectType: this.selectType,
      myOnlyContent: this.onlyContent
    };
  },
  methods: {
    select(type, event) {//点击的时候外层是有一个BScroll的，所以要传递event阻止默认点击
      if (!event._constructed) {//浏览器直接return掉,去掉自带click事件的点击
        return
      }
      //将this.selectType设置成传入的参数,而不是food传过来的初始化的值，之后样式就可以随着点击改变了
      this.mySelectType = type
      //派发事件通知父组件food.vue selectType的改变,将type值传出去
      this.$emit('increment', 'selectType', this.mySelectType)
    },
    toggleContent(event) {
      if (!event._constructed) {
        return
      }
      this.myOnlyContent = !this.myOnlyContent
      this.$emit('increment', 'onlyContent', this.myOnlyContent)
    }
  },
  computed: {
    positives() {//对应所有正向评价的数组
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.ratingselect
  .rating-type
    padding: 18px 0
    margin: 0 18px
    border-1px(rgba(7, 17, 27, 0.1))
    font-size: 0
    .block
      display: inline-block
      padding: 8px 12px
      margin-right: 8px
      line-height: 16px
      border-radius: 1px
      font-size: 12px
      color: rgb(77, 85, 93)
      &.active
        color: #fff
      .count
        margin-left: 2px
        font-size: 8px
      &.positive
        background: rgba(0, 160, 220, 0.2)
        &.active
          background: rgb(0, 160, 220)
      &.negative
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: rgb(77, 85, 93)
  .switch
    padding: 12px 18px
    line-height: 24px
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    color: rgb(147, 153, 159)
    font-size: 0
    &.on
      .icon-zysjs-gou
        color: #00c850
    .icon-zysjs-gou
      display: inline-block
      vertical-align: top
      margin-right: 4px
      font-size: 24px
    .text
      display: inline-block
      vertical-align: top
      font-size: 12px
</style>