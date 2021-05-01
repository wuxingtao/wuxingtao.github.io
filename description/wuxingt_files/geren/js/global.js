// jQuery.noConflict()
var nn=0;
var nt=9;
var nVr=null;

var pn=0;
var pt=3;
var pTr=null;
var pTi=3000;
pic=function(s){
   if(s!=pn){
/*   	for(var i=1;i<pt;i++){
   		$("#pi"+i+">small").hide();
      }
*/  		
 /*    $("#pi"+pn).removeClass("iPrnOn");
       $("#pi"+s).addClass("iPrnOn")
       $("#pi"+s+">small").fadeIn("slow");
*/
       $("#pp"+pn).fadeOut("slow");
       $("#pp"+s).fadeIn("slow");
       pn=s;
   }
}

pia=function(){
  if(pn<pt){
  	pic(pn+1);
  }
  else{
  	pic(1);
  }
}

$(function(){
pic(1);
pTr=setInterval(function(){pia()},pTi);
$("#iPrs").mouseover(function(){
	clearTimeout(pTr);
	pTr=null;
});   

$("#iPrs").mouseout(function(){
   pTr=setInterval(function(){pia()},pTi);
});

$("#wuxingt").animate({left:"50%"},1000);
})