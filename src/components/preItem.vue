<template lang="pug">
.item(:style="operaAttr")
  .index-text {{indexNum+1}}
  .input-fill-x
    input.proj-content(type="number" title="order 定义项目的排列顺序。数值越小，排列越靠前，默认为0" placeholder="order" v-model="order")
    label.input-label order
  .input-fill-x
    input.proj-content(type="number" title="flex-grow 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大" placeholder="flex-grow" v-model="flexGrow")
    label.input-label flex-grow
  .input-fill-x
    input.proj-content(type="number" title="flex-shrink 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小" placeholder="flex-shrink" v-model="flexShrink")
    label.input-label flex-shrink
  .input-fill-x
    input.proj-content(type="number" title="flex-basis 定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小" placeholder="flex-basis" v-model="flexBasis")
    label.input-label flex-basis
  p.proj-select-title align-self
  select.proj-select(name="align-self" v-model="alignSelf" title="align-self 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch")
    option(value="flex-start") flex-start
    option(value="flex-end") flex-end
    option(value="center") center
    option(value="space-between") space-between
    option(value="stretch") stretch
    option(value="auto") auto*
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class FmItem extends Vue {
  @Prop() indexNum: number;
  flexShrink: string = '';
  flexBasis: string = '';
  flexGrow: string = '';
  order: string = '';
  alignSelf: string = 'auto';
  get operaAttr(): any {
    let styleArr: any = {}
    if (this.flexShrink.length) {
      styleArr['flexShrink'] = this.flexShrink
    }
    if (this.flexBasis.length) {
      styleArr['flexBasis'] = this.flexBasis
    }
    if (this.flexGrow.length) {
      styleArr['flexGrow'] = this.flexGrow
    }
    if (this.order.length) {
      styleArr['order'] = this.order
    }
    if (this.alignSelf.length) {
      styleArr['alignSelf'] = this.alignSelf
    }
    return styleArr
  }
}
</script>

<style scoped lang="scss">
$mainColor: #ed4d6e;
.item {
  background-color: #fff;
  width: 110px;
  border-radius: 4px;
  padding: 5px;
  box-sizing: border-box;
  margin: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  .index-text {
    color: $mainColor;
    font-weight: 600;
    height: 20px;
    line-height: 20px;
  }
  .proj-select-title {
    position: relative;
    white-space: nowrap;
    font-size: 12px;
    color: $mainColor;
    margin: 2px 0 0;
    padding-left: 32px;
  }
  .proj-select {
    width: calc(100% - 10px);
    font-size: 14px;
    white-space: nowrap;
    border: none;
    border-bottom: 1px solid #ccc;
    appearance: none;
    background-color: #fff;
    border-radius: 0;
    &:focus {
      outline: none;
    }
  }
  .input-fill-x {
    margin-top: 10px;
    position: relative;
    transition: margin 0.25s;
    &:focus-within {
      transition: margin 0.25s;
      margin-top: 13px;
    }
    &::after {
      transition: transform 0.25s;
    }
    .proj-content {
      width: calc(100% - 10px);
      font-size: 14px;
      border: none;
      border-bottom: 1px solid #ccc;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
      }
      &:focus {
        outline: none;
      }
      &:placeholder-shown::placeholder {
        color: transparent;
      }
    }
    .proj-content:not(:placeholder-shown) ~ .input-label,
    .proj-content:focus ~ .input-label {
      transition: all 0.25s;
      color: $mainColor;
      transform: scale(0.75) translate(30px, -18px);
    }
    .input-label {
      position: absolute;
      left: 0px;
      white-space: nowrap;
      transition: all 0.25s;
      top: 2px;
      pointer-events: none;
      color: #bbb;
    }
  }
}
</style>
