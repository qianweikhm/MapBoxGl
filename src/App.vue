<script setup>
import { onMounted, ref, reactive } from 'vue'
import mapboxgl from 'mapbox-gl';
import JsonData from './jsonData/banner.json'
import MapboxLanguage from '@mapbox/mapbox-gl-language';
mapboxgl.accessToken = 'pk.eyJ1IjoicWlhbndlaTQ1NiIsImEiOiJjbGl2OWtodXkwNjZiM25sbTg0NW50M2xwIn0.TltzkQ67djjdD6MjEg3Oeg';
const BannerData = reactive(JsonData)
const initMapBoxGl = () => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [108.23012, 34.128557],
    zoom: 4,
  });
  const language = new MapboxLanguage({ defaultLanguage: 'zh-Hans' });
  map.addControl(language);


  BannerData.forEach(ele => {
    console.log('[ ele.lat ] >', ele.lat)
  })
  const popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setHTML(
      `<h3>1</h3><p>2</p>`
    )
  let marker1 = new mapboxgl.Marker()
    .setLngLat([104.477071, 34.920368])
    .setPopup(popup)
    .addTo(map);
  // Create a default Marker, colored black, rotated 45 degrees.
  let marker2 = new mapboxgl.Marker()
    .setLngLat([108.524477, 33.883399])
    .addTo(map);
  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  map.addControl(new mapboxgl.ScaleControl(), 'bottom-right');


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
      <div class="carousel-img" v-for="(item, index) in BannerData" :key="index">
        <img :src="item.mainImg">
        <div class="carousel-detail">
          <a href="#"><span>{{ item.name }}</span>-位于{{ item.address }}-始建于{{ item.year }}({{ item.dynasty }})-属于{{
            item.type }}</a>
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
  height: 100vh;
  z-index: 9;
  width: 400px;
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
    // height: 40px;
    width: 100%;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    display: flex;
    align-items: center;
    padding: 4px 20px;
    padding-right: 40px;
    font-size: 12px;
    box-sizing: border-box;
    line-height: 20px;

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
