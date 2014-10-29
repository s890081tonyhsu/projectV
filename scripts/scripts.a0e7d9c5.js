"use strict";angular.module("projectVApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","leaflet-directive","ui.bootstrap","facebook","firebase"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/news",{templateUrl:"views/news.html",controller:"NewsCtrl"}).when("/plan",{templateUrl:"views/plan.html"}).when("/demo",{templateUrl:"views/demo.html"}).when("/join",{templateUrl:"views/join.html",controller:"JoinCtrl"}).when("/mission/:county",{templateUrl:"views/mission.html",controller:"MissionCtrl"}).when("/mroute/:county",{templateUrl:"views/blank.html",controller:"MrouteCtrl"}).when("/map/:county",{templateUrl:"views/map.html",controller:"MapCtrl"}).otherwise({redirectTo:"/"})}]).config(["FacebookProvider",function(a){var b="276159409125032";a.init(b)}]).filter("percentage",["$filter",function(a){return function(b,c){return a("number")(100*b,c)+"%"}}]),angular.module("projectVApp").controller("MainCtrl",["$scope","Countdown","FINALDATE",function(a,b,c){a.time=b.getTime(new Date(c),new Date)}]),angular.module("projectVApp").controller("JoinCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("projectVApp").controller("MissionsCtrl",["$scope",function(a){a.missions=[{id:"TPE-4",name:"TPE-4",description:"童些趣錯事立報式而變受……論技麼康應居孩了定同大李本天心備，方告那下好當放一的科不復多神分發自原事慢費日華國心風出和夜大"},{id:"TPQ-1",name:"TPQ-1",description:"童些趣錯事立報式而變受……論技麼康應居孩了定同大李本天心備，方告那下好當放一的科不復多神分發自原事慢費日華國心風出和夜大"},{id:"TPQ-6",name:"TPQ-6",description:"童些趣錯事立報式而變受……論技麼康應居孩了定同大李本天心備，方告那下好當放一的科不復多神分發自原事慢費日華國心風出和夜大"}]}]),angular.module("projectVApp").controller("PagesCtrl",["$scope","$location",function(a,b){a.pages=[{id:"news",name:"戰略消息",img:"https://s3-ap-southeast-1.amazonaws.com/1129vday.tw/img/1129-03.svg","class":"nav-title",cssid:"nav2"},{id:"plan",name:"罷免日計劃",img:"https://s3-ap-southeast-1.amazonaws.com/1129vday.tw/img/1129-05.svg","class":"nav-title",cssid:"nav3"},{id:"demo",name:"自由罷免示範區",img:"https://s3-ap-southeast-1.amazonaws.com/1129vday.tw/img/1129-07.svg","class":"nav-title",cssid:"nav4"},{id:"join",name:"加入公民 v 與物資支援",img:"https://s3-ap-southeast-1.amazonaws.com/1129vday.tw/img/1129-09.svg","class":"nav-title",cssid:"nav5"}],a.getActive=function(a){return b.url().substr(1)===a?"active":""},a.getHref=function(a){return a.href?a.href:"#/"+a.id},a.getTarget=function(a){return a.target?a.target:"_self"}}]);var DEFAULT_COUNTY="TPE-4",MAP_DEFAULT_BOUND={"TPE-4":[{lat:25.1151655,lng:121.6659156},{lat:25.0122295,lng:121.5521896}],"TPQ-1":[{lat:25.301133,lng:121.6195265},{lat:25.0287778,lng:121.2826487}],"TPQ-6":[{lat:25.0398178,lng:121.4895901},{lat:25.0034634,lng:121.4451953}]},MAP_MIN_ZOOM={"TPE-4":13,"TPQ-1":11,"TPQ-6":14};angular.module("projectVApp").controller("MapCtrl",["$scope","$route","$routeParams","$http","$q","$filter","$modal","$window","leafletData","voteInfoService",function(a,b,c,d,e,f,g,h,i,j){function k(){l(C)}function l(b){var c=b[0];return a.myscope.mapLoadingStatus=.2+(C.length-b.length)/C.length*.8,c?void(a.geojson?a.leafletData.getGeoJSON().then(function(a){a.addData(c),setTimeout(function(){l(b.slice(1))},j.MAP_BUFFER_TIME)}):(a.geojson={data:c,style:m,resetStyleOnMouseout:!1},setTimeout(function(){l(b.slice(1))},j.MAP_BUFFER_TIME))):(a.myscope.mapLoadingStatus=1,void $(".myLoading").fadeOut("slow",function(){$(".myLoading").remove()}))}function m(a){return{opacity:1,weight:2,color:"black",dashArray:"6",fillOpacity:.5,fillColor:a.properties.mycolor,className:"county transparent"}}function n(a){var b=a.feature.properties.mycolor;return{fillColor:b}}function o(){return{weight:2,color:"black",dashArray:"6"}}function p(){return{weight:6,color:"yellow",dashArray:"0"}}function q(a,b){var c=b.target;c!=z&&(c.setStyle(G),c.bringToFront(),z&&z.bringToFront())}function r(a,b){var c=b.target;c!=z&&(c.setStyle(H),c.bringToFront(),z&&z.bringToFront())}function s(a,b,c){var d=c.target.feature.properties.town,e=c.target.feature.properties.village,f=c.target;t(d,e,f),u(d,e,0)}function t(a,b,c){z&&z.setStyle(o()),c.setStyle(p()),c.bringToFront(),z=c}function u(b,c,d){a.myscope.showVS={},a.myscope.showVS.townName=b,a.myscope.showVS.villageName=c,a.myscope.showVS.vsArray=[],a.markers={};var e=[],f=0;angular.forEach(a.myscope.voteStatData[b],function(g){var h=g.neighborhood.indexOf(c);-1!=h&&(a.myscope.showVS.vsArray.push({name:g.name,id:g.id}),e.length==d&&(f=g.id),e.push({vsid:g.id,townName:b,villageName:c,vspos:e.length,vscount:F(.5*(a.myscope.vsInfo[g.id].volunteer+a.myscope.vsInfo[g.id].supplement)),vsobj:{lat:g.location.lat,lng:g.location.lng}}))}),e.length>0&&(w(e),a.myscope.setCurrentMarkerClick(f)),a.leafletData.getMap().then(function(a){var b=[];if(z){var c=z.getBounds();b.push({lat:c._northEast.lat,lng:c._northEast.lng}),b.push({lat:c._southWest.lat,lng:c._southWest.lng})}for(var d=0;d<e.length;d++)b.push({lat:e[d].vsobj.lat,lng:e[d].vsobj.lng});b.length>0&&a.fitBounds(b)})}function v(b){a.myscope.currentVsTab.vsId=b,a.myscope.currentVsTab.vsName=function(){for(var c=0;c<a.myscope.showVS.vsArray.length;c++){var d=a.myscope.showVS.vsArray[c];if(d.id==b)return d.name}}()}function w(b){var c={};A=null,angular.forEach(b,function(a){var b=a.vscount;c[a.vsid]={draggable:!0,lat:a.vsobj.lat,lng:a.vsobj.lng,icon:D[b].x,myicons:D[b],mycount:b,mypos:a.vspos,myloc:a.townName+"-"+a.villageName,myid:a.vsid}}),angular.extend(a,{markers:c}),a.$on("leafletDirectiveMarker.dragend",function(b,c){var d=(c.markerName,a.markers[c.markerName]);a.myscope.markerlatlng=[d.lat.toFixed(9),d.lng.toFixed(9)].join(",")}),a.$on("leafletDirectiveMarker.click",function(b,c){a.myscope.setCurrentMarkerClick(c.markerName)}),a.$on("leafletDirectiveMarker.mouseover",function(b,c){var d=a.markers[c.markerName];d.icon=d.myicons.d}),a.$on("leafletDirectiveMarker.mouseout",function(b,c){var d=(c.markerName,a.markers[c.markerName]);d.icon=d!=A?d.myicons.x:d.myicons.c})}function x(b){j.resetDynamics(y),b&&j.getStaticVillageData(y).then(function(){k()},function(){},function(b){a.myscope.mapLoadingStatus=.2*b.loadingStatus,jQuery.isEmptyObject(b.villageArea)||(b.villageArea.features[0].properties.mycolor=E(b.villageSum),C.push(b.villageArea))}),e.all([j.getAllVoteStatInfo(y),j.getAllVoteStatData(y),j.getAllVillageSum(y)]).then(function(c){a.myscope.vsInfo=c[0],a.myscope.voteStatData=c[1],a.myscope.villageSum=c[2],b?a.myscope.currentTownTab=Object.keys(a.myscope.villageSum)[0]:(a.myscope.showVS&&u(a.myscope.showVS.townName,a.myscope.showVS.villageName,B),a.leafletData.getGeoJSON().then(function(b){var c=b.getLayers();angular.forEach(c,function(b){var c=b.feature.properties.town,d=b.feature.properties.village;b.feature.properties.mycolor=E(a.myscope.villageSum[c][d]),b.setStyle(n(b)),z&&z.setStyle(p())})}))})}a.myscope={},a.myscope.mapLoadingStatus=!1;var y=c.county,z=null,A=null,B=0,C=[];a.myscope.voteStatData=null,a.myscope.showVS=null,a.myscope.currentVsTab={},a.myscope.currentTownTab="",a.myscope.vsInfo={},a.myscope.supplementItem=j.supplementItem,a.myscope.volCount=j.volCount,a.myscope.spPeopleMore=!1,a.myscope.hpPeopleMore=!1,a.myscope.spPeopleClick=function(){a.myscope.spPeopleMore=!a.myscope.spPeopleMore},a.myscope.hpPeopleClick=function(){a.myscope.hpPeopleMore=!a.myscope.hpPeopleMore},a.leafletData=i;var D=function(){var a=[60,100],b=[30,10],c=[a[0]/2,a[1]],d=[b[0]/2,b[1]/2],e=["1","2","3"],f=["x","c","d"],g={};return angular.forEach(e,function(e){g[e]={},angular.forEach(f,function(f){g[e][f]={iconSize:a,iconAnchor:c,iconUrl:"images/map"+f+e+".svg",shadowSize:b,shadowAnchor:d,shadowUrl:"images/map_icon_shadow.svg"}})}),g}();y in MAP_DEFAULT_BOUND||(y=DEFAULT_COUNTY);var E=function(a){return a>=1?"#990000":a>.5?"#993333":a>0?"#aa6666":"#aaaaaa"},F=function(a){return a>.66?3:a>.33?2:1};a.myscope.getVoteStatImg=function(){return a.myscope.showVS?0==a.myscope.showVS.vsArray.length?3:a.myscope.showVS?F(.5*(a.myscope.vsInfo[a.myscope.currentVsTab.vsId].volunteer+a.myscope.vsInfo[a.myscope.currentVsTab.vsId].supplement)):1:1};var G={weight:6,color:"white"},H={weight:2,color:"black"};a.myscope.setCurrentAreaClick=function(b,c){a.leafletData.getGeoJSON().then(function(a){var d=a.getLayers();angular.forEach(d,function(a){var d=a.feature.properties.town,e=a.feature.properties.village;b==d&&c==e&&t(b,c,a)})}),u(b,c,0)},a.myscope.setCurrentMarkerClick=function(b,c){a.myscope.spPeopleMore=!1,a.myscope.hpPeopleMore=!1;var d=a.markers[b];B=d.mypos,v(b),A&&(A.icon=A.myicons.x),d.icon=d.myicons.c,A=d,c&&a.leafletData.getMap().then(function(a){a.setView({lat:d.lat,lng:d.lng})})},a.myscope.setTownTab=function(b){a.myscope.currentTownTab=b},a.myscope.isCurrentTownTab=function(b){return a.myscope.currentTownTab==b?"bg-primary":""},a.myscope.isCurrentVsTab=function(b){return a.myscope.currentVsTab.vsId==b?"bg-primary":""},a.debug=function(){},a.myscope.back=function(){a.myscope.showVS=null,B=0,a.markers={},z&&(z.setStyle(o()),z=null),a.leafletData.getMap().then(function(a){a.fitBounds(MAP_DEFAULT_BOUND[y])})},a.$on("leafletDirectiveMap.geojsonMouseover",q),a.$on("leafletDirectiveMap.geojsonMouseout",r),a.$on("leafletDirectiveMap.geojsonClick",s),a.myscope.registerDialog=function(b){var c=g.open({templateUrl:"views/register.html",controller:"registerDialogController",size:"md",resolve:{data:function(){return{county:y,type:b,vsId:a.myscope.currentVsTab.vsId,vsName:a.myscope.currentVsTab.vsName,supCount:a.myscope.vsInfo[a.myscope.currentVsTab.vsId].sItemCount,supWeight:a.myscope.vsInfo[a.myscope.currentVsTab.vsId].vweight}}}});c.result.then(function(b){console.log("send",b),a.$emit("dataReload")})},a.myscope.reload=function(){x(!1)},a.defaults={zoomControlPosition:"bottomright",minZoom:MAP_MIN_ZOOM[y]},a.maxbounds={northEast:MAP_DEFAULT_BOUND[y][0],southWest:MAP_DEFAULT_BOUND[y][1]},a.leafletData.getMap().then(function(a){a.fitBounds(MAP_DEFAULT_BOUND[y])}),x(!0),a.$on("dataReload",function(){console.log("map load data"),x(!1)}),angular.extend(a,{layers:{baselayers:{googleRoadmap:{name:"Google Streets",layerType:"ROADMAP",type:"google"}}}})}]);var USE_CITIZEN_DB=!1,MY_HTTP_DELAY=200;angular.module("projectVApp").service("voteInfoService",["$q","$http",function(a,b){this.MAP_BUFFER_TIME=10,Parse.initialize("QDCw1Ntq4E9PmPpcuwKbO2H0B1H0y77Vj1ScO9Zx","6jaJvf46pYub6Ej9IjhhIXNtZjTqRY0P4IqAJFhH");var c=Parse.Object.extend("citizen"),d=Parse.Object.extend("volunteer"),e=Parse.Object.extend("resource"),f={},g={},h={},i={},j={},k={},l={},m=this;this.supplementItem={pen:[5,"筆"],board:[5,"連署板"],water:[5,"水"],chair:[2,"椅子"],desk:[1,"桌子"],umbrella:[1,"五百萬傘"]},this.volCount=5;var n=0,o=0,p=0,q=0;this.getAllVoteStatData=function(c){function d(a){e.resolve(j[a])}var e=a.defer();return n+=1,setTimeout(function(){if(j[c])d(c);else{var a="json/votestat/"+c+".json";b.get(a).then(function(a){j[c]=a.data,d(c),n=0})}},MY_HTTP_DELAY*n),e.promise},this.getAllVillageVotestatData=function(c){function d(a){console.log("villageVotestat",l[a]),e.resolve(l[a])}var e=a.defer();return p+=1,setTimeout(function(){if(l[c])d(c);else{var a="json/villageVotestat/"+c+".json";b.get(a).then(function(a){p=0,l[c]=a.data,d(c)})}},MY_HTTP_DELAY*p),e.promise},this.getCountyVillage=function(c){function d(a,b){e.resolve({countyVillage:a,villageSum:b})}var e=a.defer();return o+=1,setTimeout(function(){i[c]&&g[c]?d(i[c],g[c]):m.getAllVillageSum(c).then(function(a){i[c]?d(i[c],a):b.get("json/twCountyVillage/"+c+".json").then(function(b){o=0,i[c]=b.data,d(i[c],a)})})},MY_HTTP_DELAY*o),e.promise},this.getParsedQuery=function(b,c,d,e){e||(e=1e3);var f=a.defer();return b.descending("createdAt"),b.equalTo(c,d),b.limit(e),b.find({success:function(a){f.resolve(a)}}),f.promise},this.getCitizenData=function(b){function g(a){i.resolve(f[a])}function h(a,b){var c={email:a.get("email"),fid:a.get("fid"),mobile:a.get("mobile"),name:a.get("name"),poll:a.get("poll"),county:a.get("county")};if("volunteer"==b){c.resource={};for(var d in m.supplementItem)c.resource[d]=0;c.volunteer=!0}else"supplement"==b?(c.resource=a.get("resource"),c.volunteer=!1):(c.resource=a.get("resource"),c.volunteer=a.get("volunteer"));return c}var i=a.defer();if(f[b])g(b);else if(USE_CITIZEN_DB){var j=new Parse.Query(c);m.getParsedQuery(j,"county",b).then(function(a){for(var c=[],d=0;d<a.length;d++)c.push(h(a[d]));f[b]=c,g(b)})}else{var k=new Parse.Query(d),l=new Parse.Query(e);a.all([m.getParsedQuery(k,"county",b),m.getParsedQuery(l,"county",b)]).then(function(a){for(var c=a[0],d=a[1],e=[],i=0;i<c.length;i++)e.push(h(c[i],"volunteer"));for(var i=0;i<d.length;i++)e.push(h(d[i],"supplement"));f[b]=e,g(b)})}return i.promise},this.getTopkCitizen=function(b,c){var f=a.defer(),g=new Parse.Query(d),h=new Parse.Query(e);return a.all([m.getParsedQuery(g,"county",b,c),m.getParsedQuery(h,"county",b,c)]).then(function(a){for(var b=[],d=0;d<a[0].length;d++){var e=a[0][d];b.push({fid:e.get("fid"),createdAt:e.createdAt.getTime(),name:e.get("name"),type:"志工"})}for(var d=0;d<a[1].length;d++){var e=a[1][d];b.push({fid:e.get("fid"),createdAt:e.createdAt.getTime(),name:e.get("name"),type:"物資"})}f.resolve(b.slice(0,c))}),f.promise},this.getAllVillageSum=function(b){function c(a){d.resolve(g[a])}var d=a.defer();return q+=1,setTimeout(function(){g[b]?c(b):a.all([m.getAllVoteStatData(b),m.getCitizenData(b),m.getAllVillageVotestatData(b)]).then(function(a){q=0,console.log("calculate village sum");for(var d=a[0],e=a[1],f=a[2],h={},i={},j=0;j<e.length;j++){var k=e[j],l=k.poll;h[l]=h[l]?h[l]+1:1}for(var n in d)for(var j=0;j<d[n].length;j++)i[d[n][j].id]=d[n][j].power;for(var o in h)h[o]=h[o]>i[o]*m.volCount?1:h[o]/(i[o]*m.volCount);var p={};for(var r in f){p[r]={};for(var s in f[r]){for(var t=f[r][s],u=0,j=0;j<t.length;j++)h[t[j]]&&(u+=h[t[j]]);p[r][s]=0==t.length?1:u/t.length}}g[b]=p,c(b)})},2*MY_HTTP_DELAY*q),d.promise},this.getAllVoteStatInfo=function(b){function c(a){d.resolve(h[a])}var d=a.defer();return h[b]?c(b):a.all([m.getCitizenData(b),m.getAllVoteStatData(b)]).then(function(a){var d=a[0],e=a[1],f={};for(var g in e)for(var i=0;i<e[g].length;i++){var j=e[g][i];f[j.id]={vlist:[],volunteer:0,slist:[],sItemCount:{},sItemSum:0,sTotalSum:0,supplement:0,address:j.address,vweight:j.power}}for(var i=0;i<d.length;i++){var k=d[i],l=k.poll;if(f[l]){k.volunteer&&f[l].vlist.push([k.fid,k.name]);var n=!1,o=k.resource;for(var p in m.supplementItem)f[l].sItemCount[p]||(f[l].sItemCount[p]=0),o[p]&&parseInt(o[p])>0&&(f[l].sItemCount[p]+=parseInt(o[p]),n=!0);n&&f[l].slist.push([k.fid,k.name])}}for(var q in f){var r=f[q].vweight*m.volCount;f[q].volunteer=f[q].vlist.length>r?1:f[q].vlist.length/r;var s=0,t=0;for(var p in m.supplementItem){var u=m.supplementItem[p][0]*f[q].vweight;s+=u,f[q].sItemCount[p]||(f[q].sItemCount[p]=0),t+=f[q].sItemCount[p]>=u?u:f[q].sItemCount[p]}f[q].sItemSum=t,f[q].sTotalSum=s,f[q].supplement=t>s?1:t/s}h[b]=f,c(b)}),d.promise},this.getStaticVillageData=function(c){var d=a.defer(),e=0,f=0,g=0;return this.getCountyVillage(c).then(function(a){function h(a,b,c){f+=1,setTimeout(function(){g+=1;var f=0;j[b]&&j[b][c]&&(f=j[b][c]),d.notify({villageArea:l[a],villageSum:f,loadingStatus:g/e}),g==e&&d.resolve({complete:!0,loadingStatus:g/e})},m.MAP_BUFFER_TIME*f)}var i=a.countyVillage,j=a.villageSum;k[c]=k[c]?k[c]:{};var l=k[c];angular.forEach(i,function(a,d){angular.forEach(a,function(a){e+=1;var f=c+"_"+d+"_"+a;if(l[f])h(f,d,a);else{var g="json/twVillage2010/"+c+"/"+d+"/"+a+".json";b.get(g).success(function(b){l[f]=b,h(f,d,a)}).error(function(){l[f]={},console.log("loading failed",d,a),h(f,d,a)})}})})}),d.promise},this.saveCitizen=function(a,b){if(USE_CITIZEN_DB){var f=new c;f.save(a).then(function(){b()})}else if(a.volunteer){delete a.volunteer,delete a.resource;var g=new d;g.save(a).then(function(){b()})}else{delete a.volunteer;var g=new e;g.save(a).then(function(){b()})}},this.queryCitizen=function(b,c){var f=a.defer();if(USE_CITIZEN_DB)f.resolve(!1);else{var g=null;"volunteer"==c?g=new Parse.Query(d):"supplement"==c&&(g=new Parse.Query(e)),m.getParsedQuery(g,"fid",b).then(function(a){f.resolve(a.length>0?!0:!1)})}return f.promise},this.resetDynamics=function(a){f[a]&&delete f[a],g[a]&&delete g[a],h[a]&&delete h[a],i[a]&&delete i[a]}}]);var BOSS_DESCRIPTION={"TPE-4":{name:"祭止兀",img:"images/head-tsai.png"},"TPQ-6":{name:"林鴻池",img:"images/head-lin.png"},"TPQ-1":{name:"WEGO昇",img:"images/head-wu.png"}};angular.module("projectVApp").controller("MissionCtrl",["$scope","$route","$routeParams","voteInfoService","FeedService",function(a,b,c,d,e){function f(){d.getAllVoteStatInfo(g).then(function(b){var c=0,e=0,f=0,g=0;for(var h in b){var i=d.volCount*b[h].vweight;e+=i,c+=b[h].vlist.length>=i?i:b[h].vlist.length;for(var j in d.supplementItem){var k=d.supplementItem[j][0]*b[h].vweight;g+=k,f+=b[h].sItemCount[j]>=k?k:b[h].sItemCount[j]}}a.miscope.vCount=c,a.miscope.vTotal=e,a.miscope.sCount=f,a.miscope.sTotal=g}),d.getTopkCitizen(g,4).then(function(b){a.miscope.newCitizen=b})}var g=c.county,h="effect:",i="area:",j="type:",k="target:";a.miscope={},a.miscope.county=g,a.miscope.vCount=0,a.miscope.vTotal=0,a.miscope.sCount=0,a.miscope.sTotal=0,a.miscope.boss=BOSS_DESCRIPTION[g],a.miscope.newCitizen=[],e.parseFeed("http://yurenju.tumblr.com/rss").then(function(b){var c=b.data.responseData.feed.entries,d=[],e=[],f=[];angular.forEach(c,function(a){if(angular.forEach(a.categories,function(b){0===b.indexOf(i+g)?d.push(a):0===b.indexOf(h)?a.effect=b.substr(h.length).replace("-"," "):0===b.indexOf(j)?a.type=b.substr(j.length):0===b.indexOf(k)&&(a.target=b.substr(k.length))}),!a.type){var b=["boss","fighting"];a.type=b[Math.floor(Math.random()*b.length)]}}),angular.forEach(d,function(a){"citizen"!==a.target?e.push(a):f.push(a)}),console.log(c),a.bossFeeds=angular.copy(e),a.citizenFeeds=angular.copy(f)}),f(),a.$on("dataReload",function(){f()}),a.miscope.missionAdd=function(){$("html, body").animate({scrollTop:$("#mission_map_title").offset().top},500)}}]),angular.module("projectVApp").controller("registerDialogController",["$scope","$timeout","$modalInstance","Facebook","voteInfoService","data",function(a,b,c,d,e,f){function g(b){a.$apply("connected"==b.status?function(){a.logged=!0,a.me()}:function(){a.logged=!1,a.editState=0,a.unregster=0,a.user={}})}function h(a){return/^\+?(0|[1-9]\d*)$/.test(a)}function i(){var b={fid:a.content.userid,volunteer:"volunteer"==a.content.type,poll:f.vsId,name:a.content.name,mobile:a.content.phone,email:a.content.email,county:f.county,resource:a.content.supplement};e.saveCitizen(b,function(){c.close(a.content)})}function j(){var a="割闌尾V計劃網站測試中\n http://1129vday.tw/";d.api("/me/feed","post",{message:a},function(a){!a||a.error?console.log("error",a.error):console.log("Post ID: "+a.id)})}a.regscope={},a.user={},a.logged=!1,a.unregster=0,a.editState=0,a.facebookReady=!1,a.$watch(function(){return d.isReady()},function(b){b&&(a.facebookReady=!0)});var k=!1;a.intentLogin=function(){k||a.login()},a.login=function(){d.login(function(a){g(a)},{scope:"publish_stream,publish_actions"})},a.me=function(){d.api("/me",function(b){a.$apply(function(){a.user=b})})},a.logout=function(){d.logout(function(){a.$apply(function(){a.user={},a.logged=!1,a.unregster=0,a.editState=0,a.regscope.errors="",k=!1})})},a.$on("Facebook:statusChange",function(a,b){g(b)}),d.getLoginStatus(function(a){g(a),"connected"==a.status&&(k=!0)}),a.regscope.selectItems=e.supplementItem;var l=a.regscope.selectItems;a.regscope.fbshare=!0,a.regscope.type=f.type,a.regscope.supCount=f.supCount,a.regscope.supWeight=f.supWeight,a.regscope.errors="",a.regscope.newuser=!0,a.content={type:f.type,votestat:f.vsName,vsid:f.vsId,userid:"",name:"",phone:"",email:"",supplement:{}};for(var m in l)a.content.supplement[m]=0;a.$watch("user",function(b){if(b&&b.id){a.content.userid=b.id,a.content.name=b.name,a.content.phone="",a.content.email="",a.content.supplement={};for(var c in l)a.content.supplement[c]=0;e.queryCitizen(b.id,f.type).then(function(b){a.unregster=b?1:2})}},!0);var n={phone:"手機",email:"E-Mail"},o=function(){var b=a.content.supplement;for(var c in l)if(!h(b[c]))return[!1,"物資數量填寫錯誤"];for(var c in l)if(b[c]>0)return[!0,""];return b.others_select&&b.others&&b.others.length>0?[!0,""]:[!1,"請填選您要提供的物資"]};a.send=function(){var b=[];if(a.content.register.$invalid){var c=a.content.register;for(var d in n)c[d].$error.required&&b.push("請填寫您的"+n[d]),c[d].$error.email&&b.push("您的"+n[d]+"格式不符")}var e=o();"supplement"!=a.content.type||e[0]||b.push(e[1]),0==b.length?0==a.editState?a.editState+=1:(1==a.regscope.fbshare&&j(),i()):a.regscope.errors=b.join("，")},a.cancel=function(){c.dismiss("cancel")}}]),angular.module("projectVApp").factory("FeedService",["$http",function(a){return{parseFeed:function(b){return a.jsonp("//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q="+encodeURIComponent(b))}}}]),angular.module("projectVApp").controller("NewsCtrl",["$scope","FeedService","Countdown","FINALDATE",function(a,b,c,d){b.parseFeed("http://yurenju.tumblr.com/rss").then(function(b){a.feeds=b.data.responseData.feed.entries}),a.time=c.getTime(new Date(d),new Date)}]),angular.module("projectVApp").service("Countdown",function(){return{getTime:function(a,b){var c=a-b,d=parseInt(c/1e3/60/60),e=parseInt(c/6e4-60*d),f=parseInt(c/1e3/60/60/24);return{hours:d,minutes:e,countdown:f}}}}),angular.module("projectVApp").constant("FINALDATE","2014/11/29"),angular.module("projectVApp").controller("MrouteCtrl",["$scope","$routeParams","$location",function(a,b,c){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"];var d=b.county;c.path("/mission/"+d)}]);