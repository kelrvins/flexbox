<template lang="pug">
#flexBox
  main(v-if="isPC")
    .preview-wrapper
      //- .preview-header
      //-   span 项目个数: 
      //-   span.count {{previewItemCount}}
      //-   span.count-opera(@click="itemCountOpera(true)") +
      //-   span.count-opera(@click="itemCountOpera()") -
      .content(:style="operaAttr")
        template(v-for="(item, index) in previewItemCount")
          .preItem(:key="index" :indexNum="index")
    .opera-wrapper
      .header 容器属性
        p.reset
          span(@click="resetOperaAttr") 重置
      .content(@click="operaClick")
        .tip
          p
            i *
            span 默认属性
          p place-content: &lt;align-content&gt; || &lt;justify-content&gt;;
          p flex-flow: &lt;flex-direction&gt; || &lt;flex-wrap&gt;;
        .computed-attr
          span.copy(:data-clipboard-text="clipboardText") 复制
          p.computed-attr-text display: flex;
          p.computed-attr-text(title="place-content: <align-content> || <justify-content>;") place-content: {{operaAttr['align-content']}}  {{operaAttr['justify-content']}};
          p.computed-attr-text(title="flex-flow: <flex-direction> || <flex-wrap>;") flex-flow: {{operaAttr['flex-direction']}}  {{operaAttr['flex-wrap']}};
          p.computed-attr-text align-items: {{operaAttr['justify-content']}};
        template(v-for="(item, index) in operaArray")
          .item(:key="item.title")
            .title(:title="item.description") {{item.title}}
            .list
              template(v-for="(ele, _index) in item.list")
                .radio(
                  :data-title="item.title" 
                  :data-ele="ele.title" 
                  :key="_index" 
                  :title="ele.description" 
                  :class="[{'default-item': ele.isDefault}, {'active': ele.title === operaAttr[item.title]}]"
                ) {{ele.title}}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import clipboard from "clipboard";
interface IDataSet {
  ele: string;
  title: string;
}
interface IAttributes {
  title: string;
  description: string;
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
export default class App extends Vue {
  operaArray: IAttributes[] = [
    {
      title: "justify-content",
      description: "定义了项目在主轴上的对齐方式",
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
      description: "定义项目在交叉轴上如何对齐",
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
      description: "项目只有一根轴线，该属性不起作用",
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
      description: "主轴的方向（即项目的排列方向）",
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
      description: "如果一条轴线排不下，如何换行",
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
  previewItemCount: number = 0;
  get isChrome(): boolean {
    const userAgent = navigator.userAgent;
    return userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;
  }
  get clipboardText(): string {
    return `display: flex;\nplace-content: ${this.operaAttr["align-content"]} ${this.operaAttr["justify-content"]};\nflex-flow: ${this.operaAttr["flex-direction"]} ${this.operaAttr["flex-wrap"]};\nalign-items: ${this.operaAttr["justify-content"]};`;
  }
  get isPC(): boolean {
    return !/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
  }
  get computedAttrText(): string {
    return "测试";
  }
  mounted(): void {
    document.title = 'CSS Grid'
    const clip: any = new clipboard(".copy");
    clip.on("success", function(e) {
      e.clearSelection();
      alert("复制成功");
    });
  }
  operaClick(e: any): void {
    if (e.target.className.indexOf("radio") !== -1) {
      const dataset: IDataSet = e.target.dataset;
      this.$set(this.operaAttr, dataset.title, dataset.ele);
      if (dataset.title === "flex-wrap" && dataset.ele === "nowrap") {
        this.previewItemCount = 8;
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
      if (this.operaAttr["flex-wrap"] === "nowrap") {
        if (this.previewItemCount >= 8) {
          alert("放不下了别加了");
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

<style lang="scss" scoped>
$mainColor: #ed4d6e;
main {
  min-height: 500px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin: 20px auto;
  display: flex;
  flex-direction: column;
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
    display: grid;
    position: relative;
    width: 100%;
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
        top: 390px;
        font-size: 12px;
        p {
          margin: 0 0 5px;
        }
        i {
          font-size: 18px;
          margin-right: 10px;
          color: $mainColor;
          padding-top: 5px;
        }
      }
      .computed-attr {
        position: absolute;
        top: 350px;
        left: 450px;
        .copy {
          line-height: 18px;
          font-size: 13px;
          display: inline-block;
          cursor: pointer;
          user-select: none;
          margin-bottom: 5px;
          text-decoration: underline;
          color: $mainColor;
        }
        &-text {
          margin: 0;
          line-height: 18px;
          font-size: 13px;
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
    width: 100%;
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
      display: grid;
      padding: 10px;
      min-height: 410px;
      border-radius: 4px;
      background-color: $mainColor;
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
</style>
