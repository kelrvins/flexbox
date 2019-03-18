<template lang="pug">
#app
  header
    h1 Flexbox
    span(v-if="!isChrome&&isPC") 配合chrome食用更佳
  main(v-if="isPC")
    .opera-wrapper
      .header 容器属性
        p.reset
          span(@click="resetOperaAttr") 重置
      .content(@click="operaClick")
        p.tip
          i *
          span 默认属性
        template(v-for="(item, index) in operaArray")
          .item(:key="item.title")
            .title(:title="item.title") {{item.title}}
            .list
              template(v-for="(ele, _index) in item.list")
                .radio(
                  :data-title="item.title" 
                  :data-ele="ele.title" 
                  :key="_index" 
                  :title="ele.description" 
                  :class="[{'default-item': ele.isDefault}, {'active': ele.title === operaAttr[item.title]}]"
                ) {{ele.title}}
    .preview-wrapper
      .header 项目属性
      .preview-header
        span 项目个数: 
        span.count {{previewItemCount}}
        span.count-opera(@click="itemCountOpera(true)") +
        span.count-opera(@click="itemCountOpera()") -
      .content(:style="operaAttr")
        template(v-for="(item, index) in previewItemCount")
          PreItem(:key="index" :indexNum="index")
  .pc-tip(v-if="!isPC")
    h1 请使用PC
  footer
    a.github-link(href="https://github.com/kelrvins/flexbox" target="_blank") @github
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PreItem from './components/preItem.vue'
interface IDataSet {
  ele: string;
  title: string;
}
interface IAttributes {
  title: string;
  list: IAttributesDeatil[];
}
interface IOperaAttr {
  "justify-content": string;
  "flex-wrap": string;
  "flex-direction": string;
  "align-content": string;
  "align-items": string;
}
interface IAttributesDeatil {
  title: string;
  isDefault?: boolean;
  description: string;
}
@Component({
  components: {
    PreItem
  }
})

export default class App extends Vue {
  operaArray: IAttributes[] = [
    {
      title: "justify-content",
      list: [
        {
          title: "flex-start",
          isDefault: true,
          description: "默认值，左对齐"
        },
        {
          title: "flex-end",
          description: "右对齐"
        },
        {
          title: "center",
          description: "居中"
        },
        {
          title: "space-between",
          description: "两端对齐，项目之间的间隔都相等。"
        },
        {
          title: "space-around",
          description:
            "每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。"
        }
      ]
    },
    {
      title: "align-items",
      list: [
        {
          title: "stretch",
          isDefault: true,
          description:
            "默认值，如果项目未设置高度或设为auto，将占满整个容器的高度。"
        },
        {
          title: "flex-start",
          description: "交叉轴的起点对齐。"
        },
        {
          title: "flex-end",
          description: "交叉轴的终点对齐。"
        },
        {
          title: "center",
          description: "交叉轴的中点对齐。"
        },
        {
          title: "baseline",
          description: "项目的第一行文字的基线对齐。"
        }
      ]
    },
    {
      title: "align-content",
      list: [
        {
          title: "stretch",
          isDefault: true,
          description: "默认值，轴线占满整个交叉轴。"
        },
        {
          title: "flex-start",
          description: "与交叉轴的起点对齐。"
        },
        {
          title: "flex-end",
          description: "与交叉轴的终点对齐。"
        },
        {
          title: "center",
          description: "与交叉轴的中点对齐。"
        },
        {
          title: "space-between",
          description: "与交叉轴两端对齐，轴线之间的间隔平均分布。"
        },
        {
          title: "space-around",
          description:
            "每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。"
        }
      ]
    },
    {
      title: "flex-direction",
      list: [
        {
          title: "row",
          isDefault: true,
          description: "默认值，主轴为水平方向，起点在左端。"
        },
        {
          title: "row-reverse",
          description: "主轴为水平方向，起点在右端。"
        },
        {
          title: "column",
          description: "主轴为垂直方向，起点在上沿。"
        },
        {
          title: "column-reverse",
          description: "主轴为垂直方向，起点在下沿。"
        }
      ]
    },
    {
      title: "flex-wrap",
      list: [
        {
          title: "nowrap",
          isDefault: true,
          description: "默认，不换行。"
        },
        {
          title: "wrap",
          description: "换行，第一行在上方。"
        },
        {
          title: "wrap-reverse",
          description: "换行，第一行在下方。"
        }
      ]
    }
  ];
  operaAttr: IOperaAttr = {
    "justify-content": "flex-start",
    "flex-wrap": "nowrap",
    "flex-direction": "row",
    "align-content": "stretch",
    "align-items": "stretch"
  };
  previewItemCount: number = 4;
  get isChrome(): boolean {
    const userAgent = navigator.userAgent
    return userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1
  }
  get isPC(): boolean {
    return !(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))
  }
  operaClick(e: any): void {
    if (e.target.className.indexOf("radio") !== -1) {
      const dataset: IDataSet = e.target.dataset;
      this.$set(this.operaAttr, dataset.title, dataset.ele);
      if (dataset.title === 'flex-wrap' && dataset.ele === 'nowrap') {
        this.previewItemCount = 8
      }
    }
  }
  resetOperaAttr(): void {
    this.operaAttr = {
      "justify-content": "flex-start",
      "flex-wrap": "nowrap",
      "flex-direction": "row",
      "align-content": "stretch",
      "align-items": "stretch"
    };
  }
  itemCountOpera(isAdd: boolean): void {
    if (isAdd) {
      if (this.operaAttr['flex-wrap'] === 'nowrap') {
        if (this.previewItemCount >= 8) {
          alert('放不下了别加了')
        } else {
          this.previewItemCount++;
        }
      } else {
        this.previewItemCount++;
      }
    } else {
      if (this.previewItemCount >= 2) {
        this.previewItemCount--;
      }
    }
  }
}
</script>

<style lang="scss">
$mainColor: #ed4d6e;
html,
body {
  height: 100%;
}
body {
  background-color: #f4f5f5;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  header {
    height: 80px;
    background-color: #252525;
    position: relative;
    h1 {
      font-size: 40px;
      height: 80px;
      line-height: 80px;
      margin: 0;
      color: #fff;
      text-align: center;
    }
    span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 5px;
      color: $mainColor;
      font-size: 12px;
    }
  }
  main {
    min-height: 500px;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    max-width: 1500px;
    & > div {
      min-height: 400px;
      padding: 15px;
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      justify-content: flex-start;
      .header {
        font-weight: 700;
        font-size: 16px;
        line-height: 25px;
        padding-bottom: 10px;
      }
      .content {
        flex-grow: 1;
      }
    }
    .opera-wrapper {
      position: relative;
      width: 700px;
      .reset {
        position: absolute;
        top: 3px;
        cursor: pointer;
        font-size: 12px;
        user-select: none;
        color: $mainColor;
        text-decoration: underline;
        left: 100px;
      }
      .content {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        .tip {
          position: absolute;
          left: 10px;
          bottom: 10px;
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          i {
            font-size: 18px;
            margin-right: 10px;
            color: $mainColor;
            padding-top: 5px;
          }
        }
      }
      .item {
        &:not(:first-of-type) {
          margin-left: 30px;
        }
        .title {
          font-size: 25px;
          font-weight: 600;
        }
        .list {
          .radio {
            margin-top: 15px;
            width: 100%;
            white-space: nowrap;
            font-weight: 400;
            border-radius: 4px;
            padding: 5px;
            color: $mainColor;
            cursor: pointer;
            border: 1px solid $mainColor;
            &.active {
              background-color: $mainColor;
              color: #fff;
            }
          }
          .default-item {
            &::after {
              content: " *";
            }
          }
        }
      }
    }
    .preview-wrapper {
      position: relative;
      z-index: 10;
      width: 700px;
      .preview-header {
        font-size: 14px;
        user-select: none;
        font-weight: normal;
        margin-bottom: 5px;
        .count {
          color: $mainColor;
          user-select: none;
          font-weight: 600;
        }
        .count-opera {
          user-select: none;
          margin-left: 10px;
          display: inline-block;
          width: 19px;
          height: 19px;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
          color: $mainColor;
          border-radius: 2px;
          border: 1px solid $mainColor;
        }
      }
      .content {
        display: flex;
        padding: 10px;
        min-height: 410px;
        border-radius: 4px;
        background-color: $mainColor;
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
      }
    }
  }

  @media screen and (max-width: 1100px) {
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .pc-tip {
    text-align: center;
    color: $mainColor;
    height: 300px;
    line-height: 300px;
  }
  footer {
    text-align: center;
  }
}
</style>
