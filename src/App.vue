<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
      <a class="navbar-brand" href="#">VUE-SSR</a>
      <button
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
        class="navbar-toggler"
        data-target="#navbarColor03"
        data-toggle="collapse"
        type="button"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor03">
        <ul class="navbar-nav mr-auto">
          <router-link tag="li" class="nav-item" to="/home"><a class="nav-link">Home</a></router-link>
          <router-link tag="li" class="nav-item" to="/article"><a class="nav-link">articles</a></router-link>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.my-h1 {
  color: pink;
}
</style>


