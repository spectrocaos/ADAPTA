"use strict";this.default_AccountsSignInUi=this.default_AccountsSignInUi||{};(function(_){var window=this;
try{
_.l("P6sQOc");
var Acb=function(a,b,c,d,e,f){this.wa=a;this.Fa=b;this.Da=c;this.Ja=d;this.Qa=e;this.da=f||null;this.Aa=Date.now();this.aa=0;this.fa=zcb(this)},Bcb=function(a){var b={};_.Na(a.mZ(),function(e){b[e]=!0});var c=a.b5(),d=a.k5();return new Acb(a.DW(),_.Vh(c.getSeconds())*1E3,a.wY(),_.Vh(d.getSeconds())*1E3,b)},zcb=function(a){if(a.da){var b=Date.now()-a.Aa;return a.da(a.aa+1,b)}return Math.random()*Math.min(a.Fa*Math.pow(a.Da,a.aa),a.Ja)},Ccb=function(a,b){return a.aa>=a.wa?!1:b!=null?!!a.Qa[b]:!0};var Dcb=new _.Gn("retryConfigOverrides"),Ecb=function(){this.aa=_.gg(_.xcb);this.da=_.gg(_.ycb);var a=_.gg(_.vcb);this.fetch=a.fetch.bind(a)};
Ecb.prototype.Ht=function(a,b){if(this.da.getType(a.Ge())!==1)return _.Rn(a);var c=this.aa.T7,d=a.Bg(Dcb),e=null;if(d){e={};if(d.gDa)for(var f=_.n(d.gDa),g=f.next();!g.done;g=f.next())e[g.value]=!0;else if(c)for(f=_.n(c.mZ()),g=f.next();!g.done;g=f.next())e[g.value]=!0;var h=1,p=0;f=Infinity;g=2;if(c){h=c.DW()||h;var q,t=(q=c.Axa())==null?void 0:q.getSeconds();p=_.Vh(c.Hxa().getSeconds())*1E3;f=t!=null?_.Vh(t)*1E3:f;g=c.wY()||g}var u,v,w,z;c=(u=d.eOa)!=null?u:h;u=(v=d.ANa)!=null?v:p;v=(w=d.rLa)!=
null?w:g;w=(z=d.fOa)!=null?z:f;e=new Acb(c,u,v,w,e,d.qLa)}else c&&(e=Bcb(c));return e&&Ccb(e)?_.yHa(a,Fcb(this,a,b,e)):_.Rn(a)};
var Fcb=function(a,b,c,d){return c.then(function(e){return e},function(e){if("function"==typeof _.Eg&&e instanceof _.Eg){if(!e.status||!Ccb(d,e.status.Sc()))throw e;}else if("function"==typeof _.Rr&&e instanceof _.Rr)switch(e.da){case 103:case 7:case 10:case 101:case 105:case 408:case 425:case 429:case 502:case 503:case 504:break;default:throw e;}if(d&&!Ccb(d))return _.Cj(e);var f=d.fa;return(new _.Bj(function(g){setTimeout(g,f)})).then(function(){if(!Ccb(d))throw Error("te`"+d.wa);++d.aa;d.fa=zcb(d);
b=b.Ww(_.$qa,d.aa);return Fcb(a,b,a.fetch(b),d)})})};_.Kt(Ecb,_.z7a);
_.m();
}catch(e){_._DumpException(e)}
}).call(this,this.default_AccountsSignInUi);
// Google Inc.
