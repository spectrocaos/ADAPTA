"use strict";this.default_AccountsSignInUi=this.default_AccountsSignInUi||{};(function(_){var window=this;
try{
_.l("Wt6vjf");
var gHa=function(){var a=_.Dr();return _.Ik(a,1)},Et=function(a){this.Ea=_.r(a,0,Et.messageId)};_.K(Et,_.x);Et.prototype.Ma=function(){return _.Qk(this,1,_.Dc)};Et.prototype.Xa=function(a){return _.el(this,1,a,_.Dc)};Et.messageId="f.bo";var Ft=function(){_.Af.call(this)};_.K(Ft,_.Af);Ft.prototype.Fc=function(){this.x6=!1;hHa(this);_.Af.prototype.Fc.call(this)};Ft.prototype.aa=function(){iHa(this);if(this.gN)return jHa(this),!1;if(!this.z8)return Gt(this),!0;this.dispatchEvent("m");if(!this.j2)return Gt(this),!0;this.w_?(this.dispatchEvent("o"),Gt(this)):jHa(this);return!1};
var kHa=function(a){var b=new _.kf(a.tja);a.f3!=null&&_.dh(b,"authuser",a.f3);return b},jHa=function(a){a.gN=!0;var b=kHa(a),c="rt=r&f_uid="+_.hf(a.j2);_.Yn(b,(0,_.Bf)(a.fa,a),"POST",c)};
Ft.prototype.fa=function(a){a=a.target;iHa(this);if(a.isSuccess()){this.yX=0;if(this.w_)this.gN=!1,this.dispatchEvent("o");else if(this.z8)this.dispatchEvent("p");else{try{var b=_.$n(a),c=JSON.parse(b.substring(b.indexOf("\n")));var d=(new Et(c[0])).Ma()}catch(e){_.Ng(e);this.dispatchEvent("q");lHa(this);return}this.gN=!1;d?this.dispatchEvent("n"):this.dispatchEvent("o")}Gt(this)}else{if(a.getStatus()!=0){b="";try{b=_.$n(a)}catch(e){}d=a.getStatus()<500;a=Error("sd`"+a.getStatus()+"`"+kHa(this).toString()+
"`"+String(a.UL)+"`"+b);d&&_.Ng(a);this.dispatchEvent("q")}lHa(this)}};var iHa=function(a){var b=_.Dt.get(window.location.protocol=="https:"?"SAPISID":"APISID","");a.w_=a.sX!==""&&b==="";a.z8=a.sX!=b;a.sX=b},lHa=function(a){a.w_||(a.gN=!0,a.yX=Math.min((a.yX||3)*2,60),Gt(a))},Gt=function(a){if(a.x6||a.gN)hHa(a),a.O0=window.setTimeout((0,_.Bf)(a.aa,a),Math.max(3,a.yX)*1E3)},hHa=function(a){a.O0&&(window.clearTimeout(a.O0),a.O0=0)};_.k=Ft.prototype;_.k.ue=null;_.k.yX=0;_.k.O0=0;_.k.sX=null;_.k.w_=!1;
_.k.z8=!1;_.k.f3=null;_.k.tja="/_/idv/";_.k.j2="";_.k.x6=!1;_.k.gN=!1;_.Kf(_.Sva,Ft);_.Gb().nn(function(a){var b=new Ft;_.rp(a,_.Sva,b);if(gHa()){a=gHa();var c=_.Vg("WZsZ1e").string(null);b.j2=a;c!==void 0&&(b.sX=c);a=_.Er();a.lastIndexOf("/",0)==0||(a="/"+a);b.tja=a+"/idv/";(a=_.PBa(_.Dr()))&&_.Vg("gGcLoe").bool(!1)&&(b.f3=a);b.x6=!0;b.aa()}});
_.m();
_.l("hhhU8");
var OWa;new _.Bj(function(a){OWa=a});_.MQa();_.Fg(function(){OWa()});
_.m();
_.l("FCpbqb");
_.Gb().nn(function(a){_.$f(_.Gg(_.Hva,a))});
_.m();
_.l("WhJNk");
var eWa=new Date(1262304E6),fWa=new Date(12779424E5),gWa=new Date(129384E7),hWa=function(a,b){b?a.push(Math.round((b-eWa.getTime())/6E4)):a.push(null)},iWa=function(a,b,c){a.push(b.getTimezoneOffset()/15+56);a:{var d=b.getTimezoneOffset();var e=c.getTimezoneOffset();if(d!=e)for(b=b.getTime()/6E4,c=c.getTime()/6E4;b<=c;){var f=(b>>1)+(c>>1),g=f*6E4,h=(new Date(g+3E4)).getTimezoneOffset();if((new Date(g-3E4)).getTimezoneOffset()!=h){d=g;break a}if(h==d)b=f+1;else if(h==e)c=f-1;else break}d=null}hWa(a,
d)};var jWa=function(a){_.Vs.call(this);this.aa=a.Ga.window;var b=b===void 0?!1:b;if(!_.xg(_.Vg("xn5OId"),!1)&&_.Dt.isEnabled()&&(_.Dt.get("OTZ")===void 0||b)){a=_.Dt.set;b=[];var c=new Date;hWa(b,c.getTime());b.push(c.getTimezoneOffset()/15+56);iWa(b,eWa,fWa);iWa(b,fWa,gWa);b=b.join("_");a.call(_.Dt,"OTZ",b,{maxAge:2592E3,path:"/",domain:void 0,secure:this.aa.get().location.protocol==="https:"})}};_.K(jWa,_.Pt);jWa.Ca=function(){return{Ga:{window:_.Rt}}};_.Jt(_.Hva,jWa);
_.m();
}catch(e){_._DumpException(e)}
}).call(this,this.default_AccountsSignInUi);
// Google Inc.
