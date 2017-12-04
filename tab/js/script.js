function $(id){
	return typeof id==='string'?document.getElementById(id):id;
}

window.onload=function(){
  var lis=$('notice-tit').getElementsByTagName('li'),
      divs=$('notice-con').getElementsByTagName('div');

  if(lis.length!=divs.length) return;

  // 遍历所有的页签
  for(var i=0;i<lis.length;i++){
    lis[i].id=i;
    lis[i].onclick=function(){
      for(var j=0;j<lis.length;j++){
        lis[j].className='';
        divs[j].style.display='none';
      }
      lis[this.id].className='select';
      divs[this.id].style.display='block';
    }
    lis[i].onmouseover=function(){
      for(var j=0;j<lis.length;j++){
        lis[j].className='';
        divs[j].style.display='none';
      }
      lis[this.id].className='select';
      divs[this.id].style.display='block';
    }
  }
}