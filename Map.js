define(function(require){
	'use strict'
	Vue.use(require("VueSortable"))
	var Promise = require("Promise")
	var Dialog = require("Dialog")
	var store = require("store")
	function limitTime(limit,isShort){
		if(!limit)return ""
		var limitMap = {}
		limitMap["天"] = 1000*60*60*24
		limitMap["小时"] = 1000*60*60
		limitMap["分钟"] = 1000*60
		limitMap["秒"] = 1000
		var limitResult = []
		var lessThanZero = false
		if(limit < 0){
			lessThanZero = true
			limit = -limit
		}
		Object.keys(limitMap).forEach(function(key){
			var value = limitMap[key]
			var result = ~~(limit / value)
			if(result >= 1)limitResult.push(result+key)
			limit = limit % value
		})
		if(!limitResult.length){
		//	limitResult.push($i18n("lessThanMin"))
		}
		if(isShort && limitResult.length > 2){
			limitResult = limitResult.slice(0,2)
		}
		if(lessThanZero){
			return "-"+limitResult.join("")
		}else{
			return limitResult.join("")
		}
	}
	Vue.filter('monthDate', function (value) {
		if(!value)return ""
		var date = new Date(value)
		var now = new Date()
		if(date.getFullYear() === now.getFullYear())
			return utils.dateFormat(date,"M/d hh:mm")
		else
			return utils.dateFormat(date,"yyyy/M/d hh:mm")
	})
	//如果日期与start一致则只显示时分
	Vue.filter('monthDateEnd', function (value,start) {
		if(!value)return ""
		var startDate = new Date(start)
		var endDate = new Date(value)
		var now = new Date()
		if(
			startDate.getFullYear() === endDate.getFullYear() &&
			startDate.getMonth() === endDate.getMonth() &&
			startDate.getDay() === endDate.getDay()
		){
	  		return utils.dateFormat(endDate,"hh:mm")
		}else{
			if(endDate.getFullYear() === now.getFullYear())
				return utils.dateFormat(endDate,"M/d hh:mm")
			else 
				return utils.dateFormat(endDate,"yyyy/M/d hh:mm")
		}
	})
	return Vue.extend({	
		template : utils.template(function(){/*
			<div class="content">
				<style>
					body, html,.content,#map {
						width: 100%;height: 100%;overflow: hidden;margin:0;
					}
					.content{
						position:relative;
					}
					.remark{
						position:fixed;
						bottom:0;
						left:0;
						right:0;
						padding:10px;
						background:rgba(0, 0, 0, 0.4);
						color:#fff;
					}
					.map-route-list{
						position:absolute;
						top:44px;
						bottom:0;
						left:0;
						right:0;
						background:rgba(255, 255, 255, 0.9333333333333333);
						z-index:9;
						overflow-y:auto;
					}
					.table-view-cell{
						background:#fff;
					}
					.bill-title{
						word-wrap: break-word;
						word-break: break-all;
					}
					.bill-title-normal{
						color:#333;
					}
					.bill-title h3{
						font-size:16px;
						line-height: 1.1em;
						font-weight:normal;
						margin:0;
					}
					.media-object{
						position:relative;
					}
					.media-object .badge{
						display:block;
						width:40px;
						height:40px;
						border-radius:20px;
						text-align:center;
						line-height:40px;
						color:#fff;
						background:#5cb85c;
						font-size:20px;
						padding:0;
					}
					.table-view-cell.media{
						padding:11px 15px;
						overflow: inherit;
					}
					.table-view-cell.media:after{
						content: ' ';
						position: absolute;
						height:100%;
						width:3px;
						padding-top: 26px;
						text-indent: -6px;
						background:#5cb85c;
						top: 20px;
						z-index: 1;
						left: 34px;
					}
					.table-view-cell.media:last-child:after{
						display:none;
					}
					.table-view-cell.media .media-object{
						z-index:2;
					}
					.table-view-custom > li.ignore,
					.table-view-custom > li.sortable-ghost{
						background:#eee;
					}
				</style>
				<div id="map"></div>
				<div class="remark">
					<div v-show="!message">
						<button class="btn pull-right" v-show="routeResultList.length" @click="showList=true">
							<i class="fa fa-list-ul"></i>
							查看规划结果
						</button>
						<div class="segmented-control">
							<a class="control-item" href="javascript:;"  @click="route('smart')">
								<i class="fa fa-location-arrow"></i>
								智能规划
							</a>
							<a class="control-item" href="javascript:;"  @click="route('duration')">
								时间优先
							</a>
							<a class="control-item" href="javascript:;"  @click="route('distance')">
								距离优先
							</a>
						</div>
						<!--
						<button class="btn" @click="route('smart')">
							<i class="fa fa-location-arrow"></i>
							智能规划
						</button>
						<button class="btn" @click="route('duration')">时间优先</button>
						<button class="btn" @click="route('distance')">距离优先</button>
						-->
					</div>
					{{message}}
				</div>
				<div class="map-route-list" v-show="showList">
					<p style="margin:10px;">路线规划结果(可拖动调整顺序):</p>
					<ul class="table-view table-view-custom " v-sortable="getSortableOptions()">
						<li style="position:relative" class="table-view-cell media" :class="$index===0?'ignore':''" v-for="item in routeResultList">
							<div class="media-object pull-left">
								<span class="badge">
									{{$index|markPoint}}
								</span>
							</div>
							<div class="media-body">
								<button class="btn pull-right drag-handle" style="border:0;" v-show="$index>0">
									<i class="fa fa-reorder"></i>
								</button>
								<a href="javascript:;" class="bill-title">
									<h3>{{item.address}}</h3>
								</a>
								<p class="ext-badge">
									{{item.CUSTOMERNAME}}
								</p>
								<p class="timedate">
									<span>预约上门</span>
									{{item.BOOKEDSERVICEBEGINDATE|monthDate}}
									-
									{{item.BOOKEDSERVICEENDDATE|monthDateEnd item.BOOKEDSERVICEBEGINDATE}}
								</p>
							</div>
						</li>
					</ul>
					<p style="padding:10px;">
						<button class="btn btn-block btn-positive" v-show="isListModified" @click="reRouteByModifiedList">保存修改并重新规划路线</button>
						<button class="btn btn-block btn-link" @click="showList=false">回到地图</button>
					</p>
				</div>
			</div>
		*/}),
		data : function(){
			return {
				isListModified : false,//是否拖动排序过
				showList : false,//显示工单排序结果面板
				message :　"",	//在底部状态栏显示消息
				type : "smart",  //smart:智能  duration:时间优先  distance:距离优先
				addressList : [],
				routeResultList : [],
				oper : this.$route.query.oper,
				ak : this.$route.query.ak?this.$route.query.ak:"5G7evX1gec0L5Qox5GepUnjG",
				$map : null,
				$geoc : null,
				$point : null
			}
		},
		filters : {
			markPoint : function(num){
				if(num===0)return "起"
				if(num===this.routeResultList.length-1)return "终"
				return num
			},
			distance : function(value){
				if(value > 1000)return (value/1000).toFixed(1)+"公里"
				return value+"米"
			},
			limitSecs : function(secs,isShort){
				if(secs==0)return 0
				if(!secs)return ""
				return limitTime(secs*1000,isShort)
			}
		},
		ready : function(){
			var title = "工单路线规划"
			this.$dispatch("init",{
				title : title,
				leftbar : [{
						"icon" : "icon icon-left-nav",
						"method" : function(){
							history.go(-1)
						}.bind(this)
					}
				]
			})
			this.load().then(this.init)
		},
		methods : {
			getData : function(){
				/*
				var data = {"message":"查询成功!","returnCode":"1","value":{"begin":0,"count":8,"length":999999,"list":[{"ACTIONTYPE":"3","BILLID":886399810,"BILL_VER_TYPE":"1","BOOKEDSERVICEBEGINDATE":"2018-08-16 16:00:00","BOOKEDSERVICEENDDATE":"2018-08-16 20:00:00","CRM_ORDER_ID":"2-97268198891","CRM_ORDER_TIME":"2015-08-22 09:55:25","CUSTOMERADDRESS":"陈宝路275弄30号1层","CUSTOMERNAME":"上海玉祥货运代理有限公司","EXTBILLCONFIRMFLAG":"N","FIRST_ACCESS_TYPE":"","INTRADAY_FINISH":"N","IS48HOUR":"N","ISBROADBANDBILL":"N","ISENROLLMEAT":"否","ISHISTORY":"N","ISINVOKED":"否","IS_IBABY":"N","IS_SDN_GATEWAY":"","IWIFIFLAG":"N","OPTYPE":"移先装","PRODUCT_ID":"101","PROV_ORDER_ID":"58440357","REIMBURSE_FLAG":"N","SELFMANAGEMENTFLAG":"","SERVICECODE":"62503912","SERVICETYPE":"POTS","SERVICETYPENAME":"POTS","SERVLEVEL":"政企低","SERVLEVELNAME":"政企低","SHCTZWTTYPE":"N","SUB_PRODUCT_ID":"","TARGET_POSITION":" 121.33401450040249,31.36053680050138","TASKID":886456836,"TASKSTAUTS":"待回单","TCREATETIME":"2015-08-22 09:55:25","UPDATETIME":"2015-08-22 10:53:18","VERIFY_ID_CARD":"N","VERIFY_RREALNAME":"N","WOCREATETIME":"2015-08-22 10:08:29","multBrandSameAddrdess":"N"},{"ACTIONTYPE":"1","BILLID":886399563,"BILL_VER_TYPE":"1","BOOKEDSERVICEBEGINDATE":"2018-08-16 16:00:00","BOOKEDSERVICEENDDATE":"2018-08-16 20:00:00","CRM_ORDER_ID":"2-97268198891","CRM_ORDER_TIME":"2015-08-22 09:55:25","CUSTOMERADDRESS":"陈宝路275弄30号1层","CUSTOMERNAME":"上海玉祥货运代理有限公司","EXTBILLCONFIRMFLAG":"N","FIRST_ACCESS_TYPE":"","INTRADAY_FINISH":"N","IS48HOUR":"N","ISBROADBANDBILL":"N","ISENROLLMEAT":"否","ISHISTORY":"N","ISINVOKED":"否","IS_IBABY":"N","IS_SDN_GATEWAY":"","IWIFIFLAG":"N","OPTYPE":"新装","PRODUCT_ID":"524","PROV_ORDER_ID":"2009937348","REIMBURSE_FLAG":"N","SELFMANAGEMENTFLAG":"","SERVICECODE":"KD1037859050","SERVICETYPE":"FTTH","SERVICETYPENAME":"FTTH","SERVLEVEL":"政企低","SERVLEVELNAME":"政企低","SHCTZWTTYPE":"N","SUB_PRODUCT_ID":"pure_iptv","TARGET_POSITION":" 121.33401450040249,31.36053680050138","TASKID":886456819,"TASKSTAUTS":"待回单","TCREATETIME":"2015-08-22 09:55:25","UPDATETIME":"2015-08-22 10:53:17","VERIFY_ID_CARD":"N","VERIFY_RREALNAME":"N","WOCREATETIME":"2015-08-22 10:08:21","multBrandSameAddrdess":"N"},{"ACTIONTYPE":"3","BILLID":886402156,"BILL_VER_TYPE":"1","BOOKEDSERVICEBEGINDATE":"2018-08-16 16:00:00","BOOKEDSERVICEENDDATE":"2018-08-16 20:00:00","CRM_ORDER_ID":"2-97268198891","CRM_ORDER_TIME":"2015-08-22 09:55:25","CUSTOMERADDRESS":"陈宝路275弄30号1层","CUSTOMERNAME":"上海玉祥货运代理有限公司","EXTBILLCONFIRMFLAG":"N","FIRST_ACCESS_TYPE":"","INTRADAY_FINISH":"N","IS48HOUR":"N","ISBROADBANDBILL":"N","ISENROLLMEAT":"否","ISHISTORY":"N","ISINVOKED":"否","IS_IBABY":"N","IS_SDN_GATEWAY":"","IWIFIFLAG":"N","OPTYPE":"移先装","PRODUCT_ID":"101","PROV_ORDER_ID":"58440358","REIMBURSE_FLAG":"N","SELFMANAGEMENTFLAG":"","SERVICECODE":"62503906","SERVICETYPE":"POTS","SERVICETYPENAME":"POTS","SERVLEVEL":"政企低","SERVLEVELNAME":"政企低","SHCTZWTTYPE":"N","SUB_PRODUCT_ID":"","TARGET_POSITION":" 121.33401450040249,31.36053680050138","TASKID":886456824,"TASKSTAUTS":"待回单","TCREATETIME":"2015-08-22 09:55:25","UPDATETIME":"2015-08-22 10:53:17","VERIFY_ID_CARD":"N","VERIFY_RREALNAME":"N","WOCREATETIME":"2015-08-22 10:10:08","multBrandSameAddrdess":"N"},{"ACTIONTYPE":"1","BILLID":886495514,"BILL_VER_TYPE":"1","BOOKEDSERVICEBEGINDATE":"2018-08-16 16:00:00","BOOKEDSERVICEENDDATE":"2018-08-16 20:00:00","CRM_ORDER_ID":"2-97272901334","CRM_ORDER_TIME":"2015-08-22 11:00:42","CUSTOMERADDRESS":"封周路368弄37号11层1101室","CUSTOMERNAME":"沈中华","EXTBILLCONFIRMFLAG":"N","FIRST_ACCESS_TYPE":"","INTRADAY_FINISH":"N","IS48HOUR":"N","ISBROADBANDBILL":"N","ISENROLLMEAT":"否","ISHISTORY":"N","ISINVOKED":"否","IS_IBABY":"N","IS_SDN_GATEWAY":"","IWIFIFLAG":"N","OPTYPE":"新装","PRODUCT_ID":"101","PROV_ORDER_ID":"58441626","REIMBURSE_FLAG":"N","SELFMANAGEMENTFLAG":"","SERVICECODE":"59908559","SERVICETYPE":"POTS","SERVICETYPENAME":"POTS","SERVLEVEL":"","SERVLEVELNAME":"","SHCTZWTTYPE":"N","SUB_PRODUCT_ID":"","TARGET_POSITION":" 121.2803858728792,31.341198225472144","TASKID":886495634,"TASKSTAUTS":"待回单","TCREATETIME":"2015-08-22 11:00:42","UPDATETIME":"2015-08-22 11:24:12","VERIFY_ID_CARD":"N","VERIFY_RREALNAME":"N","WOCREATETIME":"2015-08-22 11:24:05","multBrandSameAddrdess":"N"},{"ACTIONTYPE":"7","ACTIONTYPENAME":"修改","BILLID":886058415,"BILL_VER_TYPE":"1","BOOKEDSERVICEBEGINDATE":"2018-08-16 14:00:00","BOOKEDSERVICEENDDATE":"2018-08-16 16:00:00","CRM_ORDER_ID":"2-97232411159","CRM_ORDER_TIME":"2015-08-21 17:37:42","CUSTOMERADDRESS":"马陆镇云屏路188弄1号12层1203室","CUSTOMERNAME":"王小华","EXTBILLCONFIRMFLAG":"N","FIRST_ACCESS_TYPE":"","INTRADAY_FINISH":"N","IS48HOUR":"N","ISBROADBANDBILL":"N","ISENROLLMEAT":"否","ISHISTORY":"N","ISINVOKED":"否","IS_IBABY":"N","IS_SDN_GATEWAY":"","IWIFIFLAG":"N","OPTYPE":"续约互转变更","PRODUCT_ID":"524","PROV_ORDER_ID":"2009903786","REIMBURSE_FLAG":"N","SELFMANAGEMENTFLAG":"","SERVICECODE":"KD1007644192","SERVICETYPE":"FTTH","SERVICETYPENAME":"FTTH","SERVLEVEL":"","SERVLEVELNAME":"","SHCTZWTTYPE":"N","SUB_PRODUCT_ID":"iptv_hd_intel,iptv_hd_intel","TARGET_POSITION":" 121.26126127722621,31.332508213684193","TASKID":886255013,"TASKSTAUTS":"待回单","TCREATETIME":"2015-08-21 17:37:42","UPDATETIME":"2015-08-22 08:23:02","VERIFY_ID_CARD":"N","VERIFY_RREALNAME":"N","WOCREATETIME":"2015-08-21 17:48:10","multBrandSameAddrdess":"N"},{"ACTIONTYPE":"3","BILLID":886284963,"BILL_VER_TYPE":"2","BOOKEDSERVICEBEGINDATE":"2018-08-16 16:00:00","BOOKEDSERVICEENDDATE":"2018-08-20 16:00:00","CRM_ORDER_ID":"2-96963564015","CRM_ORDER_TIME":"2015-08-18 11:17:52","CUSTOMERADDRESS":"马陆镇宝安公路2976号1层","CUSTOMERNAME":"吴玉蓉","EXTBILLCONFIRMFLAG":"N","FIRST_ACCESS_TYPE":"","INTRADAY_FINISH":"N","IS48HOUR":"N","ISBROADBANDBILL":"N","ISENROLLMEAT":"否","ISHISTORY":"N","ISINVOKED":"否","IS_IBABY":"N","IS_SDN_GATEWAY":"","IWIFIFLAG":"N","OPTYPE":"续约互转变更","PRODUCT_ID":"524","PROV_ORDER_ID":"2009820760","REIMBURSE_FLAG":"N","SELFMANAGEMENTFLAG":"","SERVICECODE":"AD0006737131","SERVICETYPE":"FTTH","SERVICETYPENAME":"FTTH","SERVLEVEL":"政企低","SERVLEVELNAME":"政企低","SHCTZWTTYPE":"N","SUB_PRODUCT_ID":"","TARGET_POSITION":" 121.30017665377797,31.340376204221766","TASKID":886440131,"TASKSTAUTS":"待回单","TCREATETIME":"2015-08-18 11:17:52","UPDATETIME":"2015-08-22 10:40:23","VERIFY_ID_CARD":"N","VERIFY_RREALNAME":"N","WOCREATETIME":"2015-08-22 08:47:34","multBrandSameAddrdess":"N"},{"ACTIONTYPE":"7","ACTIONTYPENAME":"修改","BILLID":886612076,"BILL_VER_TYPE":"1","BOOKEDSERVICEBEGINDATE":"2018-08-16 16:00:00","BOOKEDSERVICEENDDATE":"2018-08-16 18:00:00","CRM_ORDER_ID":"2-97280367240","CRM_ORDER_TIME":"2015-08-22 13:09:43","CUSTOMERADDRESS":"马陆镇封周路368弄14号1层101室","CUSTOMERNAME":"李伟轶","EXTBILLCONFIRMFLAG":"N","FIRST_ACCESS_TYPE":"","INTRADAY_FINISH":"N","IS48HOUR":"N","ISBROADBANDBILL":"N","ISENROLLMEAT":"否","ISHISTORY":"N","ISINVOKED":"否","IS_IBABY":"N","IS_SDN_GATEWAY":"","IWIFIFLAG":"N","OPTYPE":"改性能","PRODUCT_ID":"566","PROV_ORDER_ID":"2009941675","REIMBURSE_FLAG":"N","SELFMANAGEMENTFLAG":"","SERVICECODE":"KD1013602405","SERVICETYPE":"FTTH","SERVICETYPENAME":"FTTH","SERVLEVEL":"","SERVLEVELNAME":"","SHCTZWTTYPE":"N","SUB_PRODUCT_ID":"iptv_4k,iptv_4k","TARGET_POSITION":" 121.28011915677632,31.33957182560036","TASKID":886648778,"TASKSTAUTS":"待回单","TCREATETIME":"2015-08-22 13:09:43","UPDATETIME":"2015-08-22 13:44:51","VERIFY_ID_CARD":"N","VERIFY_RREALNAME":"N","WOCREATETIME":"2015-08-22 13:16:27","multBrandSameAddrdess":"N"},{"ACTIONTYPE":"7","ACTIONTYPENAME":"修改","BILLID":886563940,"BILL_VER_TYPE":"1","BOOKEDSERVICEBEGINDATE":"2018-08-16 16:00:00","BOOKEDSERVICEENDDATE":"2018-08-16 18:00:00","CRM_ORDER_ID":"2-97277584063","CRM_ORDER_TIME":"2015-08-22 12:29:33","CUSTOMERADDRESS":"马陆镇临泽路89弄12号1层102室","CUSTOMERNAME":"陈东","EXTBILLCONFIRMFLAG":"N","FIRST_ACCESS_TYPE":"","INTRADAY_FINISH":"N","IS48HOUR":"N","ISBROADBANDBILL":"N","ISENROLLMEAT":"否","ISHISTORY":"N","ISINVOKED":"否","IS_IBABY":"N","IS_SDN_GATEWAY":"","IWIFIFLAG":"N","OPTYPE":"续约互转变更","PRODUCT_ID":"524","PROV_ORDER_ID":"2009940724","REIMBURSE_FLAG":"N","SELFMANAGEMENTFLAG":"","SERVICECODE":"LN0570011924","SERVICETYPE":"FTTH","SERVICETYPENAME":"FTTH","SERVLEVEL":"","SERVLEVELNAME":"","SHCTZWTTYPE":"N","SUB_PRODUCT_ID":"iptv_dual_channel","TARGET_POSITION":" 121.24564923875234,31.347663525429205","TASKID":886646806,"TASKSTAUTS":"待回单","TCREATETIME":"2015-08-22 12:29:33","UPDATETIME":"2015-08-22 13:43:00","VERIFY_ID_CARD":"N","VERIFY_RREALNAME":"N","WOCREATETIME":"2015-08-22 12:34:16","multBrandSameAddrdess":"N"}]}}
				return Promise.resolve(data.value.list.map(function(item){
					item.point = {
						lng : utils.trim(item.TARGET_POSITION.split(",")[0]),
						lat : utils.trim(item.TARGET_POSITION.split(",")[1])
					}
					item.address = item.CUSTOMERADDRESS
					return item
				}))
				*/
				var url = "/ida40/mobileview/getBillInfo.jhtml?operatorID="+this.oper
				return utils.get(url).then(function(result){
					var addressList = result.list.filter(function(item){
						if(!item.TARGET_POSITION){
							notify.warn("工单【"+item.CUSTOMERADDRESS+"】未返回坐标信息，无法参与规划")
						}
						return !!item.TARGET_POSITION
					}).map(function(item){
						item.point = {
							lng : utils.trim(item.TARGET_POSITION.split(",")[0]),
							lat : utils.trim(item.TARGET_POSITION.split(",")[1])
						}
						item.address = item.CUSTOMERADDRESS
						return item
					})
					return Promise.resolve(addressList)
				}.bind(this))
			},
			//保存路线规划结果
			saveRouteList : function(result){
				var url = "/ida40/mobileview/routeCorfirm.jhtml?LoginName="+this.oper
				var params = {
					json : result
				}
				return utils.post(url,params).then(function(){
					notify.success("规划结果已保存")
				})
			},
			//获取曾保存的路线规划
			initRouteList : function(){
				var url = "/ida40/mobileview/getRouteCorfirm.jhtml?LoginName="+this.oper
				return utils.get(url).then(function(result){
					if(!result || !result.length)return false
					try{
						result = JSON.parse(result)
						this.routeResultList = result
					}catch(e){
						notify.error(e)
					}
				}.bind(this))
			},
			init : function(){
				var map = this.$map = new BMap.Map("map")
				map.enableScrollWheelZoom(true)
				map.clearOverlays()
				/*
				var getPoint = function(address,index){
					return new Promise(function(resolve,reject){
						return new BMap.Geocoder().getPoint(address,function(point){
							if(!point)return reject(address,index)
							resolve({
								address : address,
								point : point
							})
						}.bind(this))
					}.bind(this))
				}.bind(this)
				*/
				//return Promise.all(this.getData().map(getPoint))
				return this.getData()
					.then(function(result){
						this.addressList = result
						result.forEach(function(point){
							this.markPoint(point)
						}.bind(this))
						this.initRouteList()
						/*
						if(store.get("routeResultList")){
							this.routeResultList = JSON.parse(store.get("routeResultList"))
							this.showRouteResult()
							return false
						}
						*/
					}.bind(this))
					.catch(console.error)
			},
			load : function(){
				return new Promise(function(resolve,reject){
					if("BMap" in window)return resolve()
					if(!this.ak)return reject(new Error("请指定百度地图的API KEY"))
					window._bdmap_init=function(){
						resolve()
						window._bdmap_init = null
					}
					var url = "http://api.map.baidu.com/api?v=2.0&ak="+this.ak+"&callback=_bdmap_init&"
					require([url])
				}.bind(this))
			},
			markPoint : function(point){
				var markPoint = new BMap.Point(point.point.lng,point.point.lat)
				var marker = new BMap.Marker(markPoint)
				var label = new BMap.Label(point.address,{offset:new BMap.Size(20,0)})
				marker.setLabel(label)
				this.$map.centerAndZoom(markPoint, 15)
				this.$map.addOverlay(marker)
			},
			showInfo : function(marker,info){	
				var infoWindow = new BMap.InfoWindow(info)
				marker.openInfoWindow(infoWindow)
			},
			getLocation : function(lng,lat){
				return new Promise(function(resolve,reject){
					this.load()
						.then(function(){
							var point = new BMap.Point(lng,lat)
							var geoc = new BMap.Geocoder()
							var timer = setTimeout(function(){
								reject("获取当前地址超时")
							},500)
							geoc.getLocation(point,function(rs){
								clearTimeout(timer)
								if(rs)
									resolve(rs)
								else
									reject()
							})
						})
						.catch(function(error){
							reject(error)
						})
				}.bind(this))
			},
			route : function(type){
				this.type = type||"duration"
				var addressList = this.addressList
				this.getRouteList(addressList[0],addressList.slice(1))
					.then(function(result){
					//	console.log(result.map(r=>r.address))
					//	store.set("routeResultList",JSON.stringify(result))
						this.saveRouteList(JSON.stringify(result))
						this.routeResultList = result
						this.showRouteResult()
						this.showList = true
					}.bind(this))
			},
			//将导航结果绘制到地图
			showRouteResult : function(){
				var map = this.$map
				map.clearOverlays()
				var resultList = JSON.parse(JSON.stringify(this.routeResultList))
			//	this.routeResultList.map(this.markPoint)
				resultList = resultList.map(r=>new BMap.Point(r.point.lng,r.point.lat))
				var startPoint = resultList[0]
				var endPoint = resultList[resultList.length-1]
				resultList.shift()
				resultList.pop()
				var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}})
				driving.search(startPoint, endPoint,{waypoints:resultList})
			},
			//计算一批地址得出导航信息
			getRouteList : function(start,endListOrigin){
				var count = 0
				var resultList = []
				var component = this
				var getRouteResult = this.getRouteResult
				return new Promise(function(resolve,reject){
					getRoutes(start,endListOrigin)
					function getRoutes(start,endList){
						count++
						resultList.push(start)
						if(endList.length===1){
							return getRouteResult(start,endList[0]).then(function(result){
								endList[0].route = result
								resultList.push(endList[0])
								component.message = ""
								return resolve(resultList)
							})
						}
						component.message = "正在计算途经点"+count+"/"+endListOrigin.length
						var tasks = endList.map(function(endPoint){
							return getRouteResult(start,endPoint)
						}.bind(this))
						return Promise.all(tasks).then(function(result){
							var arr = result.map(function(item){
								//智能规划===时间优先
								//距离优先，时间优先 开关在这里
								//计算优先级
								if(component.type=="distance")
									return item.distance
								if(component.type=="duration")
									return item.duration
								return item.duration
							})
							var index = arr.indexOf(Math.min.apply(null,arr))
							var list = []
							if(index===0){
								list = endList.slice(1)
							}else{
								list = endList.slice(0,index).concat(endList.slice(index+1))
							}
							endList[index].route = result[index]//距离上个点的时间和距离  单位秒与米
							return getRoutes(endList[index],list)
						}.bind(this))
					}
				}.bind(this))
			},
			getRouteResult : function(start,end){
				var map = this.$map
				var startPoint = new BMap.Point(start.point.lng,start.point.lat)
				var endPoint = new BMap.Point(end.point.lng,end.point.lat)
				return new Promise(function(resolve,reject){
					var route = new BMap.DrivingRoute(startPoint,{
						renderOptions: {},
						policy: BMAP_DRIVING_POLICY_LEAST_TIME
					})
					route.search(startPoint,endPoint)
					route.setSearchCompleteCallback(function(result){
						var plan = result.getPlan(0)
						var distance = plan.getDistance(false)//单位米
						var duration = plan.getDuration(false)//单位秒
						resolve({
							distance : distance,
							duration : duration
						})
					})
				})
			},
			reRouteByModifiedList : function(){
				this.saveRouteList(JSON.stringify(this.routeResultList))
				this.showRouteResult()
				this.showList = false
			},
			getSortableOptions : function(){
				return {
					animation: 150,
					filter:'.ignore',
					ghostClass: "sortable-ghost",
					handle : ".drag-handle",
					scroll : true,
					onFilter : function(event){
						if(event.newIndex===0)return false
						return true
					},
					onUpdate: function(event){
						if(event.newIndex===0){
							//刷新list，让操作复原
							this.routeResultList.push("")
							this.routeResultList.pop()
							return false
						}
						this.isListModified = true
						this.routeResultList.splice(event.newIndex, 0, this.routeResultList.splice(event.oldIndex, 1)[0])
					}.bind(this)
				}
			}
		}
	})
})