<script setup>
import { onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
mapboxgl.accessToken = 'pk.eyJ1IjoicWlhbndlaTQ1NiIsImEiOiJjbGl2OWtodXkwNjZiM25sbTg0NW50M2xwIn0.TltzkQ67djjdD6MjEg3Oeg';

const initMapBoxGl = () => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [108.23012, 34.128557],
    zoom: 4,
  });
  const language = new MapboxLanguage({ defaultLanguage: 'zh-Hans' });
  map.addControl(language);
}
const center = ref([])
const getLocation = async () => {
  let response = await fetch('https://restapi.amap.com/v3/ip?key=c7685184ffe7a4db141ffd5d56155510')
  let commits = await response.json();
  center.value = commits.rectangle.split(';')[0].split(',')
}
onMounted(async () => {
  await getLocation()
  initMapBoxGl()
})
</script>

<template>
  <div id="map"></div>
  <div id="head">
    <div class="head-logo"><a href="#" title="中国古建筑">中国古建筑</a></div>
  </div>
  <div id="main">
    <n-carousel class="carousel" direction="vertical" dot-placement="right" autoplay show-arrow>
      <div class="carousel-img">
        <img src="./assets/images/banner/Wutai_Foguang_Si_2013.08.28_11-21-32.jpg">
        <div class="carousel-detail">
          <a href="#"><span>佛光寺</span>-大殿正面-山西省忻州市五台县豆村镇佛光村</a>
        </div>
      </div>
      <div class="carousel-img">
        <img src="./assets/images/banner/Wutai_Nanchan_Si_2013.08.28_13-43-47.jpg">
        <div class="carousel-detail">
          <a href="#"><span>南禅寺</span>-大殿正面-中国山西省忻州市五台县阳白乡李家庄村西北</a>
        </div>
      </div>
      <div class="carousel-img">
        <img src="./assets/images/banner/Wutai_Nanchan_Si_2013.08.28_13-43-47.jpg">
        <div class="carousel-detail">
          <a href="#"><span>鲁班坊</span>-大殿正面-江西省宜丰县花桥乡白市厚埠自然村</a>
        </div>
      </div>
    </n-carousel>
  </div>
</template>

<style lang="scss" scoped>
#map {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

#head {
  width: 100vw;
  height: 50px;
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 20px;
  z-index: 10;
  border-bottom: 1px solid yellow;
}

#head .head-logo {
  color: yellow;
  letter-spacing: 10px;
  font-size: 24px;
  line-height: 50px;
  cursor: pointer;

}

#main {
  padding-top: 50px;
  position: fixed;
  top: 0;
  left: 0;
  background: #ccc;
  height: 100vh;
  z-index: 9;
  width: 400px;
  box-shadow: 0 0 10px 4px #908f8f;
}


.carousel {
  position: relative;
  height: 240px;
}

.carousel-img {
  width: 100%;
  height: 240px;
  position: relative;

  .carousel-detail {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 40px;
    width: 100%;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-size: 12px;

    span {
      font-size: 16px;
      color: yellow;
      font-weight: bold;
    }
  }
}

.carousel-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
