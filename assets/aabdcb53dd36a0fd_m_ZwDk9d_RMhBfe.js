"use strict";this.default_AccountsSignInUi=this.default_AccountsSignInUi||{};(function(_){var window=this;
try{
_.l("ZwDk9d");
var Nz=function(){_.Vs.call(this)};_.K(Nz,_.Pt);Nz.Ca=_.Pt.Ca;Nz.prototype.T4=function(a){return _.qg(this,{ib:{W5:_.Tl}}).then(function(b){var c=window._wjdd,d=window._wjdc;return!c&&d?new _.Bj(function(e){window._wjdc=function(f){d(f);e(sWa(f,b,a))}}):sWa(c,b,a)})};var sWa=function(a,b,c){return(a=a&&a[c])?a:b.ib.W5.T4(c)};
Nz.prototype.aa=function(a,b){var c=_.Xwa(b).Nn;if(c.startsWith("$")){var d=_.dqa.get(a);_.Cp[b]&&(d||(d={},_.dqa.set(a,d)),d[c]=_.Cp[b],delete _.Cp[b],_.Wwa--);if(d)if(a=d[c])b=_.vg(a);else throw Error("Sb`"+b);else b=null}else b=null;return b};_.Jt(_.Sia,Nz);
_.m();
_.l("SNUn3");
_.rWa=new _.Cn(_.Ria);
_.m();
_.l("RMhBfe");
var tWa=function(a){var b=_.Twa(a);return b?new _.Bj(function(c,d){var e=function(){b=_.Twa(a);var f=_.bja(a,b);f?c(f.getAttribute("jsdata")):window.document.readyState=="complete"?(f=["Unable to find deferred jsdata with id: "+b],a.hasAttribute("jscontroller")&&f.push("jscontroller: "+a.getAttribute("jscontroller")),a.hasAttribute("jsmodel")&&f.push("jsmodel: "+a.getAttribute("jsmodel")),d(Error(f.join("\n")))):_.bn(e,50)};_.bn(e,50)}):_.vg(a.getAttribute("jsdata"))},uWa=function(a){var b=_.Twa(a);
return b?!_.bja(a,b):!1},vWa=function(a,b){a=_.WDa(a,b);return a.length==0?null:a[0].ctor},wWa=function(){return Object.values(_.us).reduce(function(a,b){return a+Object.keys(b).length},0)},xWa=function(){return Object.entries(_.us).reduce(function(a,b){var c=_.n(b);b=c.next().value;c=c.next().value;for(var d in c)a+="$$XID:"+b+"$$ -> $$XID:"+(d+"$$\n");return a},"")};_.Oh(_.Ria);var yWa=function(a){_.Vs.call(this);this.aa=a.Ga.W5;this.ue=null},Oz,AWa,BWa;_.K(yWa,_.Pt);yWa.Ca=function(){return{Ga:{W5:_.rWa}}};yWa.prototype.resolve=function(a,b,c,d){d=d===void 0?!1:d;a=Oz(this,a,b,0);return c!==void 0?a.then(function(e){return _.zWa?_.Hd(e):_.td(e)}):a.then(function(e){return d?_.Hd(e):e.clone()})};
Oz=function(a,b,c,d,e,f,g){for(var h={};b&&b.getAttribute;h={S3:void 0}){if(uWa(b))return tWa(b).then(function(){return Oz(a,b,c,d,e,f,g)});var p=_.rFa(b);h.S3=_.Lh(c);if(g){var q=_.wa(p,g);q!=-1&&(p=p.slice(0,q))}q=p.pop();if(d==0)for(;q;){f=q;e=_.qFa(q);if(h.S3==e.Gb)break;q=p.pop();if(!q)return _.Cj(Error("Wd`"+h.S3+"`"+e.Gb))}if(h=a.aa.aa(b,f))return h;h=b;b=b.parentElement||null;if(q&&(p=AWa(a,q,p,h,b,c,d,e,f)))return p}return _.Cj(Error("Xd`"+f+"`"+(e&&e.Gb)+"`"+wWa()+"`"+xWa()))};
AWa=function(a,b,c,d,e,f,g,h,p){if(g++==0){if(h.Nn)return a.aa.T4(h.Nn).then(function(t){return t?_.aEa(t,f):c.length>0?AWa(a,c.pop(),c,d,e,f,g,h,p):Oz(a,e,f,g,h,p)})}else if(b=_.qFa(b),b.Nn&&h.Nn!=b.Nn){var q=vWa(b.Gb,h.Gb);q||h.Gb!=b.Gb||h.id!=b.id||(q=f);if(q)return BWa(a,d,p,h,q).then(function(t){return t?t:c.length>0?AWa(this,c.pop(),c,d,e,f,g,h,p):Oz(this,e,f,g,h,p)},null,a)}return c.length>0?AWa(a,c.pop(),c,d,e,f,g,h,p):Oz(a,e,f,g,h,p)};
BWa=function(a,b,c,d,e){return Oz(a,b,e,0,void 0,void 0,c).then(function(f){return _.vs(f,d.h7,d.Gb)})};_.zWa=!1;_.Jt(_.Oia,yWa);

_.m();
}catch(e){_._DumpException(e)}
}).call(this,this.default_AccountsSignInUi);
// Google Inc.
