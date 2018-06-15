<template>
    <div class="map-wrapper" id="map">
    </div>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class extends Vue {
    created() {

    }
    private mounted() {
        this.initMap();

                var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos: any) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
};

function error(err: any) {
    console.log(err);
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);

    }

    // methods
    initMap() {
        const map = new BMap.Map("map");
        var point = new BMap.Point(116.404, 39.915);
        // 创建点坐标  
        map.centerAndZoom(point, 15);
    }
    getLocation() {

    }
}
</script>

<style lang="stylus" scoped>
.map-wrapper {
    width: 100vw;
    height: 100vh;
}
</style>
