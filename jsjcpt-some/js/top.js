$(document).ready(function () {
    topList("",{},function(json){
        if(!json.length){
            return false;
        }else{
            $.each(json,function(){
                $("#top_list").append("<span class='link'>"+ this.item +"</span>");
            });
        }
    });

    newsList("",{},function(json){
        if(!json.length){
            return false;
        }else{
            $("#news_list").append("<span class='msg_num'>("+ json[0].news+")</span>");
        }
    });
    //一、二级菜单
    menuList("menu.json",{
        "parentModuleId" : ""
    },function(json){
        if(!json.length){
            return false;
        }else{
            //限制数量(测试用)
            var result = [];
            for (var i = 0; i < 10; i++) {
                result.push(json[i])
            };

            $.each(result,function(){
                $("#menu1").append("<li id="+ this.moduleId +"><a href="+ this.moduleUrl +" class='parent'><span>"+ this.moduleName +"</span></a></li>");
                //根据一级id查询二级
                var parentId = this.moduleId;
                menuList("menu.json",{
                    "parentModuleId" : parentId
                },function(json){
                    if(!json.length){
                        return false;
                    }else{
                        $("#"+parentId).append("<div class='arrow_top' style='display:none;'><ul></ul></div>");
                        $.each(json,function(){
                            //查询是否有三级
                            var childId = this.moduleId;
                            menuList("menu.json",{
                                "parentModuleId" : childId
                            },function(jsonchild){
                                console.log(json)
                                if(!jsonchild.length){
                                    $("#"+parentId).children("div.arrow_top").find("ul").append("<li id="+ this.moduleId +"><a href="+ this.moduleUrl +"><span>"+ this.moduleName +"</span></a></li>");
                                }else{
                                    $("#"+parentId).children("div.arrow_top").find("ul").append("<li id="+ this.moduleId +"><a href='javascript:;'' class='parent nav_sec'><span>"+ this.moduleName +"</span></a></li>");
                                }
                            });
                        });
                    }
                });
            });
        }
    });

    $("body").delegate("#menu>ul>li","mouseenter",function(){
        $(this).children("div.arrow_top").toggle(100);
    });
    $("body").delegate("#menu>ul>li","mouseleave",function(){
        $(this).children("div.arrow_top").toggle(100); 
    });
    $("body").delegate("#menu>ul>li>div>ul>li","mouseenter",function(){
        $(this).children("div.arrow_left").toggle(100);
    });
    $("body").delegate("#menu>ul>li>div>ul>li","mouseleave",function(){
        $(this).children("div.arrow_left").toggle(100);
    });
    var pid = [];
        var paId = $("#menu>ul>li>div>ul>li");
        console.log(paId)
    $("body").delegate("#menu>ul>li>div>ul>li","mouseenter",function(){
        var parentId = $(this).children("div.arrow_left").find("li").context.id;
        if(parentId in pid){
            return false;
        }else{
            pid.push(parentId)
        }
        console.log(pid)
        if(1){
            menuList("menu.json",{
                "parentModuleId" : parentId
            },function(json){
                if(!json.length){
                    return false;
                }else{
                    $("#"+parentId).append("<div class='arrow_left navbar_thi' style='display:none;'><ul></ul></div>");
                    $.each(json,function(){
                        $("#"+parentId).children("div.arrow_left").find("ul").append("<li class='nav_inline' id="+ this.moduleId +"><a href="+ this.moduleUrl +" class='not_next'><span>"+ this.moduleName +"</span></a></li>");
                    });
                }
            });
        }
    });
});

function topList(url,param,callback){
    $.ajax({
        url : url,
        data : param,
        cache : false,
        success : function(data){
            data = [{"item":"获取得到--->"},{"item":"注销"},{"item":"修改密码"},{"item":"论坛首页"},{"item":"草稿箱"},{"item":"待办箱(网络)"},{"item":"监控箱(网络)"},{"item":"APP下载"},{"item":"更多"}];
            callback && callback(data);
        }
    });
}

function newsList(url,param,callback){
    $.ajax({
        url : url,
        data :param,
        cache : false,
        success : function(data){
            data = [{"news":"获取得到--->13"}];
            callback && callback(data);
        }
    });
}

function menuList(url,param,callback){
    var result = [];
    $.ajax({
        url : url,
        data : param,
        success : function(data){
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                if(data[i].parentModuleId == param.parentModuleId){
                    var json = {
                        moduleId : data[i].moduleId || "",
                        parentModuleId : data[i].parentModuleId || "",
                        moduleName : data[i].moduleName || "",
                        moduleUrl : data[i].moduleUrl || "#",
                        applicationId : data[i].applicationId || ""
                    }
                    result.push(json) 
                }
            };
            callback && callback(result);
        }
    });  
}






new Vue({
        el: '#top',
        data : function(){
            return {
                topLists : [],
                newLists : [],
                menuLists : [],
                menuList : []
            }
        },
        ready : function(){
            this.topList("",[])
            this.newList("",[])
            var result = []
            var self = this
            $.ajax({
                url : "menu.json",
                data : {},
                success : function(data){
                    data = JSON.parse(data);
                    for (var i = 0; i < data.length; i++) {
                        var json = {
                            moduleId : data[i].moduleId || "",
                            parentModuleId : data[i].parentModuleId || "",
                            moduleName : data[i].moduleName || "",
                            moduleUrl : data[i].moduleUrl || "#",
                            applicationId : data[i].applicationId || ""
                        }
                        result.push(json)
                    };
                    self.$data.menuList = result;           
                }
            })
            this.init()
        },
        methods : {
            init : function(){
                this.menuLists = [this.getChildren()]
            },
            //将数据格式化为树形
            getChildren : function(root){
                if(!root)root = ""
                console.log(this.$data.menuList)
                return menu.filter(row=>{
                    return row.parentModuleId === root
                })
            },
            // moveOnLi: function (that) {
            //     var parentId = that.rows.moduleId
            //     this.menuList("menu.json",{
            //         "parentModuleId" : parentId
            //     },function(json){
            //         if(!json.length){
            //             return false;
            //         }else{
            //             this.menu2Lists = json;
            //             console.log(this.menu2Lists)
            //         }
            //     });
            // },
            // menu1List : function(){
            //     var self = this
            //     this.menuList("menu.json",{
            //         "parentModuleId" : ""
            //     },function(json){
            //         if(!json.length){
            //             return false;
            //         }else{
            //             //限制数量(测试用)
            //             var result = [];
            //             for (var i = 0; i < 10; i++) {
            //                 result.push(json[i])
            //             };
                        
            //             self.$data.menu1Lists = result;
            //             console.log(self.$data.menu1Lists)
            //         }
            //     });
            // },
            topList : function (url,param) {
                $.ajax({
                    url : url,
                    data : param,
                    success : function(data){
                        data = [{"item":"注销"},{"item":"修改密码"},{"item":"论坛首页"},{"item":"草稿箱"},{"item":"待办箱(网络)"},{"item":"监控箱(网络)"},{"item":"APP下载"},{"item":"更多"}];
                        this.topLists = data;
                    }.bind(this)
                })
            },
            newList : function (url,param) {
                var self = this
                $.ajax({
                    url : url,
                    data :param,
                    success : function(data){
                        data = [{"news":"获取得到--->13"}];
                        self.$data.newLists = data;
                    }
                });
            },
            menuList : function (url,param,callback) {
                var result = [];
                $.ajax({
                    url : url,
                    data : param,
                    success : function(data){
                        data = JSON.parse(data);
                        for (var i = 0; i < data.length; i++) {
                            if(data[i].parentModuleId == param.parentModuleId){
                                var json = {
                                    moduleId : data[i].moduleId || "",
                                    parentModuleId : data[i].parentModuleId || "",
                                    moduleName : data[i].moduleName || "",
                                    moduleUrl : data[i].moduleUrl || "#",
                                    applicationId : data[i].applicationId || ""
                                }
                                result.push(json) 
                            }
                        };
                        callback && callback(result);
                    }
                });
            }
        }
    })
    // $("body").delegate("#menu>ul>li","click",function(){
    //     $(this).children("div.arrow_top").toggle(100);
    // });
    // $("body").delegate("#menu>ul>li","mouseleave",function(){
    //     $(this).children("div.arrow_top").hide(); 
    // });
    // $("body").delegate("#menu>ul>li>div>ul>li","click",function(){
    //     $(this).children("div.arrow_left").toggle(100);
    // });
    // $("body").delegate("#menu>ul>li>div>ul>li","mouseleave",function(){
    //     $(this).children("div.arrow_left").hide();
    // });