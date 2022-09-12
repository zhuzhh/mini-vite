<template>
  <div class="hello">
    <h1>{{ msg.name }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <div @click="changeMsg">change-msg</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: Object,
    testFn: Function
  },
  watch: {
    'msg.name'(val) {
      console.log(val)
    }
  },
  mounted() {
    console.log(this.testFn)
    console.log(typeof this.testFn)
    this.testFn()
  },
  methods: {
    changeMsg() {
      this.msg.name = '1111111111'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
