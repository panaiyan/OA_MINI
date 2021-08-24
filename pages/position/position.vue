<template>
  <view class="content">
    <map
      style="width: 100%; height: 300px; height: 90%"
      :latitude="Latitude"
      :longitude="Longitude"
      :markers="covers"
    >
    </map>
    <view style="margin-top: 5%"> 车牌号: {{ palteCod }} </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      Latitude: "",
      Longitude: "",
      palteCod: "",
      covers: [],
    };
  },
  onLoad(options) {
    this.Latitude = options.Latitude;
    this.Longitude = options.Longitude;
    this.palteCod = options.palteCod;
  },
  mounted() {
    this.covers = [
      {
        latitude: this.Latitude,
        longitude: this.Longitude,
        iconPath: "/static/img/local.png",
        width: 30,
        height: 30,
        label: "chepan",
      },
    ];
  },
};
</script>