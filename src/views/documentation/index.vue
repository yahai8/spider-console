<template>
  <div class="app-container documentation-container">
    <div id="dialogue_box" style=" border:1px solid #96c2f1;background:black;width: 1000px;height: 600px; color: white; background-color: black; margin-left: 200px;" class="scrollbar">

      <p style="text-align: center;">爬取日志实时显示</p>
      <div v-for=" item in msgList">
        <span style="margin-left: 10px;font-size: xx-small;">114161171:{{ item }}</span><br>
      </div>
    </div>
  </div>
</template>

<script>
// import DropdownMenu from '@/components/Share/DropdownMenu'
//

import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'
export default {
  name: 'Documentation',
  // components: { DropdownMenu },
  components: { vuescroll },
  data() {
    return {
      websocket: '',
      articleList: [
      ],
      msgList: [],
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
          background: '#F5F5F5', // 滚动条颜色
          opacity: 0.5
        }
      }
    }
  }, mounted() {
    // WebSocket
    if ('WebSocket' in window) {
      this.websocket = new WebSocket('ws://10.10.10.174:9874/websocket/444934564227172522')
      this.initWebSocket()
    } else {
      alert('当前浏览器 Not support websocket')
    }
  },
  beforeDestroy() {
    this.onbeforeunload()
  },
  methods: {
    initWebSocket() {
      // 连接错误
      this.websocket.onerror = this.setErrorMessage

      // 连接成功
      this.websocket.onopen = this.setOnopenMessage

      // 收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage

      // 连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage

      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.onbeforeunload
    },
    setErrorMessage() {
      console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
    },
    setOnopenMessage() {
      console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
    },
    setOnmessageMessage(event) {
      // 根据服务器推送的消息做自己的业务处理
      console.log('服务端返回：' + event.data)
      this.msgList.push(event.data)
      this.$nextTick(() => {
        var div = this.$el.querySelector('#dialogue_box')

        div.scrollTop = div.scrollHeight
        console.log(div)
        console.log('scrollTop:' + div.scrollTop)
        console.log('scrollHeight:' + div.scrollHeight)
      })
    },
    setOncloseMessage() {
      console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
    },
    onbeforeunload() {
      this.closeWebSocket()
    },
    closeWebSocket() {
      this.websocket.close()
    }
  }
}
</script>

<style>
  .scrollbar {
overflow-y: auto;
}
.scrollbar::-webkit-scrollbar {
width: 6px;
background-color: #828282;
}
.scrollbar::-webkit-scrollbar-thumb {
background-color: #828282;
border-radius: 6px;
}
.scrollbar::-webkit-scrollbar-track {
-webkit-box-shadow: inset 0 0 6px #828282;
background-color:black;
}
</style>
<style lang="scss" scoped>
  .documentation-container {
    margin: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .document-btn {
      flex-shrink: 0;
      display: block;
      cursor: pointer;
      background: black;
      color: white;
      height: 60px;
      padding: 0 16px;
      margin: 16px;
      line-height: 60px;
      font-size: 20px;
      text-align: center;
    }
  }
</style>
