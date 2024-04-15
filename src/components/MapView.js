/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 * onChange: (ads) => void
 */

import React from 'react';
import { Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import LocationUtil from '../utils/LocationUtil';

const { width, height } = Dimensions.get('window');
// let webViewRef = null
export default class MapView extends React.PureComponent {
  webViewRef = null
  runFirst = `
      // setTimeout(function() { window.alert('上海市') }, 2000);
      true; // note: this is required, or you'll sometimes get silent failures
    `;

  html = `
  <!DOCTYPE html>
  <html lang="">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="initial-scale=1.0, user-scalable=no, width=device-width"
      />
      <title>地图选点</title>
      <link
        rel="stylesheet"
        href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css"
      />
      <style>
        html,
        body,
        #map {
          height: 100%;
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        #container {
          height: 106%;
          width: 100%;
        }
        #keysetBox {
          position: absolute;
          top: 0;
          width: 100%;
          height: 46px;
          z-index: 9;
          display: flex;
          flex-direction: row;
          align-items: center;
          background-color: white;
        }
        #selectCity {
          width: 86px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        #keysetinput {
          flex: 1;
          /* margin-right: 16px; */
          padding: 8px 10px;
          border: none;
          border-radius: 6px;
          background-color: #f3f3f3;
        }
        #searchBox {
          padding: 8px 8px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
        #addresslist {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60%;
          z-index: 9;
          padding-bottom: 16px;
          background-color: white;
          overflow: scroll;
        }
        ul {
          padding: 0 16px;
          margin: 0;
          list-style: none;
        }
        li {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 8px 0;
          list-style: none;
          border-bottom: solid 1px #f3f3f3;
        }
        h3 {
          padding: 0;
          margin: 0;
          line-height: 32px;
        }
        .amap-marker:first-child .amap-icon img {
          width: 25px;
          height: 34px;
        }
        .city-tag {
          color: #232323;
          font-size: 14px;
          font-weight: 500;
        }
        .select-list {
          z-index: 99;
          top: 46px;
          left: 0;
          width: 100%;
          height: 0;
          display: flex;
          flex-direction: column;
          overflow: scroll;
          position: absolute;
          background-color: white;
        }
        .city-item {
          color: #232323;
          font-size: 14px;
          font-weight: 400;
          height: 40px;
          margin-left: 16px;
          padding-right: 16px;
          line-height: 40px;
          border-bottom: solid 1px #ededed;
        }
      </style>
    </head>
    <body>
      <div id="map">
        <div id="container"></div>
      </div>
      <div id="keysetBox">
        <div id="selectCity" onclick="changeCity(1)">
          <span id="cityTag" class="city-tag">北京市</span>
        </div>
        <input
          id="keysetinput"
          maxlength="32"
          placeholder="请输入地址关键"
          onkeyup="bindInput(this)"
        />
        <div id="searchBox" onclick="onSearch()">
          <span id="searchBtn" class="city-tag"></span>
        </div>
      </div>
      <div id="selectListBox" class="select-list"></div>
      <!-- <div id="addresslist"></div> -->
      <script
        type="text/javascript"
        src="https://webapi.amap.com/maps?v=1.4.15&key=8d76c0ad419ac842c8f9fe420e85c5c2&plugin=AMap.DistrictSearch,AMap.Autocomplete,AMap.Geocoder"
      ></script>
      <script type="text/javascript">
        // ///////////////////////////////////////////////////////////////////// //
        const icon =
          "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png";
        const icon2 =
          "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png";
        let marker = null; // marker点
        let district = null; // 城市列表获取实例
        let regeocode = {};
        let markerPoint = { lat: 39.915085, lng: 116.368324 };
  
        // 如果是IOS
        window.addEventListener("message", nativeEvent);
        document.addEventListener("message", nativeEvent);
  
        // 地图实例
        const map = new AMap.Map("container", {
          resizeEnable: true,
          zoomEnable: true,
          center: [116.397428, 39.90923],
          zoom: 15,
        });
        // 事件绑定
        map.on("click", onClick);
        map.on("zoomend", getCenter);
        map.on("moveend", getCenter);
        map.on("dragend", getCenter);
        //输入提示
        const auto = new AMap.Autocomplete({
          input: "keysetinput",
        });
        // mapLocation();
  
        // 初始化城市列表
        const timer = setTimeout(() => {
          clearTimeout(timer);
          initCity(); //
        }, 3000);
  
        function nativeEvent(event) {
          const data = JSON.parse(event.data);
          if (data.location) {
            setCenter([data.lng, data.lat]);
            addMarker(data);
            const timer = setTimeout(() => {
              clearTimeout(timer);
              const point = map.getCenter();
              regeoAddress(point); // 等地图加载完成在调用
            }, 500);
          }
        }
  
        // 获取中心点
        function getCenter() {
          const point = map.getCenter();
          // removeList("addresslist")
        }
  
        // 删除div
        function removeList(key) {
          const body = document.body;
          const ch = document.getElementById(key);
          if (ch) {
            body.removeChild(ch);
          }
          setMapHeight(0)
        }
        function setTagText(text) {
          const cityDiv = document.getElementById("cityTag");
          if (cityDiv) {
            cityDiv.innerHTML = text;
          }
        }
        function setMapHeight(num=0) {
          const mapView = document.getElementById("container");
          mapView.style = num == 0 ? 'height: 105%;':'height: 40%;'
        }
        //
        function bindInput(obj) {
          const size = obj.value.length;
          const search = document.getElementById("searchBtn");
          if (size > 0 && search.innerHTML.length < 2) {
            search.style = "padding: 0 8px";
            search.innerHTML = "搜索";
            changeCity(0); // 隐藏选择城市
          } else if (size < 2) {
            search.style = "padding: 0";
            search.innerHTML = "";
          }
        }
        // 搜索
        function onSearch(obj) {
          getPoi(markerPoint);
        }
        // 点击地图事件
        function onClick(e) {
          addMarker(e.lnglat);
          getPoi(e.lnglat);
          regeoAddress(e.lnglat);
        }
  
        // 根据经纬度获取逆编码
        function regeoAddress(lnglat) {
          const geocoder = new AMap.Geocoder({
            radius: 1500, //范围，默认：500
          });
  
          geocoder.getAddress(lnglat, function (status, result) {
            if (status === "complete" && result.regeocode) {
              const { addressComponent } = result.regeocode;
              regeocode = {
                country: addressComponent.country,
                district: addressComponent.district,
                province: addressComponent.province,
                street: addressComponent.street,
                city: addressComponent.city,
              };
              console.log(addressComponent);
              setTagText(addressComponent.province || addressComponent.city);
            } else {
              console.log("根据经纬度查询地址失败");
            }
          });
        }
  
        // 获取标记点附近地址
        function getPoi(lnglat) {
          changeCity(0); // 隐藏选择城市
          // console.log(lnglat);
          AMap.service(["AMap.PlaceSearch"], function () {
            //构造地点查询类
            const placeSearch = new AMap.PlaceSearch({
              // city: '010',
              pageSize: 20, // 单页显示结果条数
              pageIndex: 1, // 页码
              type: "汽车销售|汽车维修|餐饮服务|购物服务|生活服务|体育休闲服务|住宿服务|风景名胜|商务住宅|交通设施服务|公司企业",
            });
  
            const cpoint = [lnglat.lng, lnglat.lat]; //中心点坐标
            const keyset = document.getElementById("keysetinput").value;
            // 查询附近地址
            placeSearch.searchNearBy(
              keyset,
              cpoint,
              10000,
              function (status, result) {
                console.log(status);
                if (status == "complete" && result.info == "OK") {
                  const list = result.poiList.pois;
                  // console.log(list)
                  const body = document.body;
                  removeList("addresslist");
                  const div = document.createElement("div");
                  div.id = "addresslist";
                  // div.appendChild(ul); // 隐藏按钮
                  const ul = document.createElement("ul");
                  ul.id = "listUl";
                  let lastBody = null; // 记录点击的元素
                  let lastSelect = null; // 记录点击的元素
                  const select =
                    "width: 18px; height: 18px; border-radius: 50%; margin-right: 8px; border: solid 1px #dedede";
                  const selected =
                    "width: 18px; height: 18px; border-radius: 50%; margin-right: 8px; border: solid 6px #F56105";
                  for (var i = 0; i < list.length; i++) {
                    const div2 = document.createElement("div");
                    const div3 = document.createElement("div");
                    const li = document.createElement("li");
                    const h3 = document.createElement("h3");
                    const span = document.createElement("span");
                    const item = list[i];
                    h3.innerHTML = item.name;
                    span.innerHTML =
                      regeocode.province +
                      regeocode.city +
                      regeocode.district +
                      item.address;
                    div2.append(h3, span);
                    div3.style = select;
                    li.append(div3, div2);
                    li.onclick = () => {
                      if (lastBody) {
                        lastBody.style = ""; // 清除样式
                        lastSelect.style = select;
                      }
                      h3.style = "color: #F56105;";
                      div3.style = selected;
                      lastBody = h3;
                      lastSelect = div3;
                      setCenter([item.location.lng, item.location.lat]);
                      addMarker(item.location);
                      window.ReactNativeWebView.postMessage(
                        JSON.stringify({ ...item, ...regeocode })
                      );
                    };
                    ul.appendChild(li);
                  }
                  div.appendChild(ul);
                  body.appendChild(div);
                  // 地图布局改变
                  setMapHeight(1)
                }
              }
            );
          });
        }
  
        // 获取城市列表
        function initCity() {
          //行政区划查询
          const opts = {
            subdistrict: 1, //返回下一级行政区
            showbiz: false, //最后一级返回街道信息
          };
          district = new AMap.DistrictSearch(opts); //注意：需要使用插件同步下发功能才能这样直接使用
          district.search("中国", function (status, result) {
            if (status == "complete") {
              //result.districtList[0][0]: adcode: "410000", center: {lng: 113.753094, lat: 34.767052}, citycode: [], level: "province", name: "河南省"''
              showCity(result.districtList);
            }
          });
        }
  
        // 选择城市结果
        function onChange(obj) {
          const option = obj[obj.options.selectedIndex];
          const keyword = option.text; //关键字
          const adcode = option.adcode;
          district.setLevel(option.value); //行政区级别
          district.setExtensions("all");
          //行政区查询
          //按照adcode进行查询可以保证数据返回的唯一性
          district.search(adcode, function (status, result) {
            if (status === "complete") {
            }
          });
        }
  
        // 切换城市
        function changeCity(num) {
          if (num == 1) {
            removeList("addresslist");
          }
          const listDiv = document.getElementById("selectListBox");
          listDiv.style = "height: " + (num == 1 ? "50%" : "0");
        }
  
        // 显示城市列表
        function showCity(data) {
          // map.setFitView(); //地图自适应
          const list = data[0].districtList;
          const listDiv = document.getElementById("selectListBox");
          let lastDiv = null;
          list.forEach((e) => {
            const div = document.createElement("div");
            div.className = "city-item";
            div.innerHTML = e.name;
            div.onclick = () => {
              if (lastDiv) {
                lastDiv.style = "color: #232323";
              }
              const city = document.getElementById("cityTag");
              city.innerHTML = e.name;
              div.style = "color: #F56105";
              lastDiv = div;
              changeCity(0);
              setCenter(e.center);
            };
            listDiv.appendChild(div);
          });
        }
  
        // 添加点标记
        function addMarker(position) {
          if (marker) {
            marker.setMap(null);
            marker = null;
          }
          markerPoint.lat = position.lat;
          markerPoint.lng = position.lng;
          marker = new AMap.Marker({
            icon: icon,
            position,
            offset: new AMap.Pixel(-13, -30),
            // 设置是否可以拖拽
            draggable: false,
            cursor: "move",
            // 设置拖拽效果
            raiseOnDrag: false,
          });
          marker.setMap(map);
        }
  
        // 设置地图中心点
        function setCenter(center) {
          console.log(center)
          markerPoint.lat = center.lat;
          markerPoint.lng = center.lng;
          map.setCenter(center);
        }
        // 定位
        function mapLocation() {
          AMap.plugin("AMap.Geolocation", function () {
            const geolocation = new AMap.Geolocation({
              enableHighAccuracy: true, //是否使用高精度定位，默认:true
              timeout: 10000, //超过10秒后停止定位，默认：5s
              buttonPosition: "RB", //定位按钮的停靠位置
              buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function (status, result) {
              if (status == "complete") {
                onComplete(result);
              } else {
                onError(result);
              }
            });
          });
        }
  
        //解析定位结果
        function onComplete(data) {
          const str = [];
          str.push("定位结果：" + data.position);
          str.push("定位类别：" + data.location_type);
          if (data.accuracy) {
            str.push("精度：" + data.accuracy + " 米");
          } //如为IP精确定位结果则没有精度信息
          str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
          console.log(str);
        }
        //解析定位错误信息
        function onError(data) {
          console.log(data.message);
        }
      </script>
    </body>
  </html>  
`;

  onLoadEnd = () => {
    LocationUtil.getLocation().then((res) => {
      const params = {
        // icon: '',
        location: true,
        lng: res.longitude,
        lat: res.latitude,
        Q: res.latitude, // marker点坐标
        R: res.longitude // marker点坐标
      }
      console.log(params)
      const timer = setTimeout(() => {
        clearTimeout(timer)
        this.webViewRef.postMessage(JSON.stringify(params));
      }, 1000);
    })
  }

  render() {
    return (
      <WebView
        ref={webView => this.webViewRef = webView}
        source={{ html: this.html }}
        style={{ width, height }}
        onMessage={(event) => {
          const item = event.nativeEvent.data;
          const json = JSON.parse(item);
          // json: {"address": "东四环小武基北路", "distance": 220, "location": {"lat": 39.908566, "lng": 116.403456}, "name": "北京欢乐谷","tel": "", "type": "风景名胜;公园广场;公园"}
          if (this.props.onChange) {
            this.props.onChange(json)
          }
        }}
        onLoadEnd={this.onLoadEnd}
      // injectedJavaScript={runFirst}
      // injectedJavaScriptBeforeContentLoaded={runFirst}
      />
    );
  }
};
