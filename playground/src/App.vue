<template>
  <div>msg.name: {{msg.name}}</div>
  <h1 class="click" @click="clickTest">点击</h1>
  <HelloWorld :msg="msg" :testFn="testFn"/>
</template>


<script>
import HelloWorld from './components/HelloWorld.vue'

// <!--<img alt="Vue logo" src="./assets/logo.png" />-->
// <!--<HelloWorld :msg="msg"/>-->

export default {
  name: 'App',
  data() {
    return {
      msg: {
        name: 'zzh'
      }
    }
  },
  computed: {
    name() {
      return 'zzz'
    }
  },
  // watch: {
  //   msg: {
  //     handler(val) {
  //       console.log('watcher ==========')
  //     },
  //     immediate: true
  //   }
  // },
  created() {
    console.log('created ----------')
  },
  components: {
    HelloWorld
  },
  updated(a) {
    console.log('11', a)
  },
  methods: {
    testFn() {
      debugger
      console.log(this.name)
    },
    clickTest() {
      this.msg.name = Math.random()
      // this.msg = {
      //   name: Math.random()
      // }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
