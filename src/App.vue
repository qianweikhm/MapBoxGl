<script setup>
import { onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
mapboxgl.accessToken = 'pk.eyJ1IjoicWlhbndlaTQ1NiIsImEiOiJjbGl2OWtodXkwNjZiM25sbTg0NW50M2xwIn0.TltzkQ67djjdD6MjEg3Oeg';

const initMapBoxGl = () => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center.value,
    zoom: 3,
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
</template>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
