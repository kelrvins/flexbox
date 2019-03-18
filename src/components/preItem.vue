<template lang="pug">
.item(:style="operaAttr")
  .index-text {{indexNum+1}}
  .input-fill-x
    input.proj-content(type="number" placeholder="order" v-model="order")
    label.input-label order
  .input-fill-x
    input.proj-content(type="number" placeholder="flex-grow" v-model="flexGrow")
    label.input-label flex-grow
  .input-fill-x
    input.proj-content(type="number" placeholder="flex-shrink" v-model="flexShrink")
    label.input-label flex-shrink
  .input-fill-x
    input.proj-content(type="number" placeholder="flex-basis" v-model="flexBasis")
    label.input-label flex-basis
  p.proj-select-title align-self
  select.proj-select(name="align-self" v-model="alignSelf" title="align-self 允许不一样的对齐方式，可覆盖`align-items`属性")
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
</style>
