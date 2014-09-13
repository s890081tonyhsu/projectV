"use strict";angular.module("projectVApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","leaflet-directive"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/join",{templateUrl:"views/join.html",controller:"JoinCtrl"}).when("/map/:county",{templateUrl:"views/map.html",controller:"MapCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("projectVApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("projectVApp").controller("JoinCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("projectVApp").controller("MissionsCtrl",["$scope",function(a){a.missions=[{id:"TPE-4",name:"TPE-4",description:"童些趣錯事立報式而變受……論技麼康應居孩了定同大李本天心備，方告那下好當放一的科不復多神分發自原事慢費日華國心風出和夜大"},{id:"TPQ-1",name:"TPQ-1",description:"童些趣錯事立報式而變受……論技麼康應居孩了定同大李本天心備，方告那下好當放一的科不復多神分發自原事慢費日華國心風出和夜大"},{id:"TPQ-6",name:"TPQ-6",description:"童些趣錯事立報式而變受……論技麼康應居孩了定同大李本天心備，方告那下好當放一的科不復多神分發自原事慢費日華國心風出和夜大"}]}]),angular.module("projectVApp").controller("PagesCtrl",["$scope","$location",function(a,b){a.pages=[{id:"news",name:"戰略消息"},{id:"plan",name:"罷免日計劃"},{id:"demo",name:"自由罷免示範區"},{id:"join",name:"加入公民 v 與物資支援"},{id:"facebook",name:"Facebook",href:"https://www.facebook.com/Appendectomy"},{id:"email",name:"Email",href:"mailto:appy.service@gmail.com"}],a.getActive=function(a){return b.url().substr(1)===a?"active":""},a.getHref=function(a){return a.href?a.href:"#/"+a.id}}]);var DEFAULT_COUNTY="TPE-4",MAP_DEFAULT_VIEW={"TPE-4":{lat:25.0666313,lng:121.5943403,zoom:13},"TPQ-1":{lat:25.1752044,lng:121.4813232,zoom:12},"TPQ-6":{lat:25.0260396,lng:121.4654445,zoom:14}};angular.module("projectVApp").controller("MapCtrl",["$scope","$routeParams","$http","$q","$filter","leafletData","voteInfoService",function(a,b,c,d,e,f,g){function h(a){var b=[];a.properties.TOWNNAME&&b.push(a.properties.TOWNNAME),a.properties.VILLAGENAM&&b.push(a.properties.VILLAGENAM);var c=g.getWinner(b,q),d="#dd1c77";return void 0!=c?"中國國民黨"===c.party?c.ratio>40?"#045a8d":c.ratio>35?"#2b8cbe":"#74a9cf":"民主進步黨"===c.party?c.ratio>40?"#006d2c":c.ratio>35?"#2ca25f":"#66c2a4":d:d}function i(){$(".county").each(function(a,b){b.classList?b.classList.remove("transparent"):b.getAttribute&&b.getAttribute("class")&&b.setAttribute("class",b.getAttribute("class").replace("transparent",""))})}function j(a){return{fillColor:h(a),weight:2,opacity:1,color:"white",dashArray:"3",fillOpacity:.7,className:"county transparent"}}function k(b){a.geojson?a.leafletData.getGeoJSON().then(function(a){a.addData(b)}):a.geojson={data:b,style:j,resetStyleOnMouseout:!0},i()}function l(a,b){var d=null,e="json/votestat/8/"+q+".json",f=[];c.get(e).then(function(e){d=e.data,angular.forEach(a["投票狀況"],function(e,g){angular.forEach(e,function(e,h){var i="json/twVillage1982/"+b+"/"+a["選區"][0]+"/"+g+"/"+h+".json";c.get(i).then(function(a){k(a.data)},function(){}),angular.forEach(e,function(a){var b=a["投票所別"];if(void 0!=d[g]&&void 0!=d[g][h]&&void 0!=d[g][h][b]){var c=d[g][h][b];f.push({townName:g,villageName:h,vsid:b,vsobj:c})}})})}),p(f)},function(a){console.log("err",a)})}function m(a,b){var c=b.target;c.setStyle({weight:5,color:"#666",dashArray:"",fillOpacity:.7}),c.bringToFront()}function n(a,b,c){console.log("scope",c)}function o(a){var b=[];return a?(b.push(a.TOWNNAME,a.VILLAGENAM),g.getWinner(b,q)):"--"}function p(b){var c={iconUrl:"images/liberty.png",iconAnchor:[17,97]},d={iconUrl:"images/liberty_selected.png",iconAnchor:[17,97]},e={};angular.forEach(b,function(a){e[a.vsid]={lat:a.vsobj.lat,lng:a.vsobj.lng,icon:c,myloc:a.townName+"-"+a.villageName}}),angular.extend(a,{markers:e}),a.markerNs={},a.markerNs.click=!1,a.$on("leafletDirectiveMarker.mouseover",function(b,c){var e=c.markerName,f=a.markers[e],h=f.myloc.split("-");if(!a.markerNs.click){a.markerNs.click=!0;var i=g.voteInfos[q]["投票狀況"][h[0]][h[1]],j=g.voteInfos[q]["候選人"];angular.forEach(i,function(b){if(b["投票所別"]==e){var c=b["得票數"],d=c.indexOf(Math.max.apply(this,c));a.markerNs.winner={name:j[d][1],party:j[d][2],ratio:(100*b["得票率"][d]).toFixed(2).toString()+"%",count:b["得票數"][d]}}})}a.markerNs.click=!0,f.icon=d;var k=f.myloc.replace("-","")+"第"+c.markerName+"投票所";a.markerNs.loc=k}),a.$on("leafletDirectiveMarker.mouseout",function(b,d){a.markerNs.click=!1,a.markers[d.markerName].icon=c})}var q=b.county;console.log("county",q),q in MAP_DEFAULT_VIEW||(q=DEFAULT_COUNTY),a.getWinnerName=function(a,b){var c=o(a);if("string"==typeof c)return c;var d=c.name;return b&&(d+="（"+c.party+"）"),d},a.getWinnerRatio=function(a){var b=o(a);return"string"==typeof b?b:e("number")(b.count)+" 票（"+e("number")(b.ratio,2)+"%）"},a.debug=function(){},a.back=function(){},a.leafletData=f,a.taiwan=MAP_DEFAULT_VIEW[q],a.defaults={zoomControlPosition:"bottomright"},g.getAllVoteInfo(q).then(function(){},function(){},function(b){a.voteInfos||(a.voteInfos={}),a.voteInfos[b.id]=b.content;var d="json/twVote1982/"+b.id+".json";console.log("get3",d),c.get(d).then(function(c){a.districts?a.districts.features.push(c.data.features[0]):a.districts=c.data;var d=b.id;l(a.voteInfos[d],d)})}),a.$on("leafletDirectiveMap.geojsonMouseover",m),a.$on("leafletDirectiveMap.geojsonClick",n)}]),angular.module("projectVApp").service("voteInfoService",["$q","$http",function(a,b){var c={};this.voteInfos=c,this.getAllVoteInfo=function(d){function e(a){f.notify({id:a,content:c[a]})}var f=a.defer();return c[d]?e(d):b.get("json/mly/8/"+d+".json").then(function(a){c[d]=a.data,e(d)}),f.promise},this.getWinner=function(a,b){var c={},d=this.voteInfos[b],e=[],f=0;if(void 0!=d){var g=d;d=d["投票狀況"],angular.forEach(a,function(a){d=d[a]});for(var h=0;h<g["候選人"].length;h++)e.push(0);angular.forEach(d,function(a){angular.forEach(a["得票數"],function(a,b){e[b]+=a}),f+=a["選舉人數"]});var i=e.indexOf(Math.max.apply(this,e));return c.name=g["候選人"][i][1],c.party=g["候選人"][i][2],c.ratio=e[i]/f*100,c.count=e[i],c}}}]);