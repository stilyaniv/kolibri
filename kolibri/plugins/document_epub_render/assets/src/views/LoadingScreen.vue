<template>

  <div class="loading-screen">
    <KCircularLoader
      type="indeterminate"
      :delay="false"
    />
    <p>{{ $tr('loadingBook') }}</p>
  </div>

</template>


<script>

  import KCircularLoader from 'kolibri.coreVue.components.KCircularLoader';

  export default {
    name: 'LoadingScreen',
    $trs: {
      loadingBook: 'Loading book',
    },
    components: {
      KCircularLoader,
    },
  };

</script>


<style lang="scss" scoped>

  .loading-screen {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

</style>
