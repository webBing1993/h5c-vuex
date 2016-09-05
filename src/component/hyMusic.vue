<template>
<div>
<a href="javascript:;" class="btn-music">
  <img src="data:image/png;base64,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Y0hgWYbBB4ZuJBsPthjSaDT8cXUwM5QKPn6dKOR5bfJCmBPhWZ+JWnDwY+hdMwFvXrElkWFHV/BMyWQxT7VeD3z+c7lLVOq1Fb9b9xocPTNKvlYJswW95DO5PBebQm8pCiQPRb+bJL2KXurN3CXm69VARggh+N/URUbHzy5/H8rj2ddOcfTMaWSsveHEEnrKZ4Jsqsk7jA5MgbSarrdcrfLq1DgNL9jkVQClRo0nX/wXo+Nn8Vq4W26uyOEX/83j/zlK3ZKYVmgVImM+CxZXd4z65O4NYkLda1yeH62kVy+e48z0JDIdfI3echzOX5zkl0//hb1D17MzO0R3PEmxMs8b0xOMjp/lzdwlZMwmmUmFGX+eoqnKbHGF2e3A46xQI6SAPiPGF/e+b8VFu8lCnl8d/RtvNko4qdXNvGuleeYuTdOo1ZFCIBAoFEopEAI74eJ2ZzCs0HJC54FPAs8ueNbiUdgx9Ga0ZX1BCMF4PsdfX36BUrWy5PcmCnkee+5pzsxMYsdXP1C34g7JgT7cTBojZiMMiWFbxFIJkv29JPp6woSjfNuPXWFr8wu/Fd0EPIbeD7ak6vMV5qdyHBjewciufWzt6sEQEgXMlIuMnj/LP149yVhuinhvN3aygxIYBcrzfJcGpIxiJn8S+BQw2lwr3SqyjQI/Q++IWXLZ0ozZSDfGP/87yolzYwykMiRjLpV6janiLLm5AjXlEe/KYCc6zAkJEEakxVcV3+bRxR8sVWmfQZehfWa5syrPozwzS6Uwh9dooP9qvcRjxmycdErDufaXeQ6h923kF1faL9U35oEfot1tyWp7ISXxbt1CGpUaquGBFBiWiRGzkUa46daIdNy3Nd/SxlZvdryZRRDxclVoWnEzS8tcwqLB44PoCW1wbQw4Rd+2y4PCVloy2eL/oI6ORQ8BpfW2KESVfJseBerLbctcNhvl/7AEPAL8FL3NeqNr3rflEaAU1p7VOfSe1Txvs029K2lzW3hYgGDzwQKBtPloiuCQYPPhJoFAbT4eJyCozQcsBQS1+YiugKBg8yFvgWFt2McE/h9KE0PLD+5UmQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0wNy0yNVQyMTo0OTo1NSswODowMHrzItkAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTQtMTEtMjRUMjE6NDc6NDYrMDg6MDCp3nXRAAAATnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjguOC0xMCBRMTYgeDg2XzY0IDIwMTUtMDctMTkgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmcFDJw1AAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAAxMjhDfEGAAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADEyONCNEd0AAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTQxNjgzNjg2NrwxlisAAAATdEVYdFRodW1iOjpTaXplADIuNzVLQkLAd7YOAAAAWnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE4MDUvMTE4MDU2NS5wbmdk9OZlAAAAAElFTkSuQmCC">
</a>
<!-- <audio loop>
  <source src="./static/audios/background.mp3" type="audio/mpeg">
</audio> -->
</div>

</template>
<style scoped>
.btn-music {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0);
  z-index: 9999;
  padding: 0;
  /*animation: btnMusicAni 3s infinite linear; */
}
.btn-music img {
  width: 100%;
  height: 100%;
}
.btn-music.paused {
  opacity: 0.5;
  animation: none;
}
@keyframes btnMusicAni {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<script>
  module.exports = {
    props: {
      music: {
        type: Object,
        require: true,
        twoway: true
      }
    },
    ready: function(){
      this.$dispatch('compReady');
      $('.btn-music').on('click', function(){
        $(this).toggleClass('paused');   
      });     
    }
  }
</script>