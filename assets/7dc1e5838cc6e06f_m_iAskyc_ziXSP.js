"use strict";this.default_AccountsSignInUi=this.default_AccountsSignInUi||{};(function(_){var window=this;
try{
_.l("iAskyc");
_.FY=function(a){_.Vs.call(this);this.window=a.Ga.window.get();this.Bc=a.Ga.Bc};_.K(_.FY,_.Pt);_.FY.Ca=function(){return{Ga:{window:_.Rt,Bc:_.RB}}};_.k=_.FY.prototype;_.k.addRecoveryContactToDependentKeychain=function(){};_.k.Tq=function(){};_.k.addEncryptionRecoveryMethod=function(){};_.k.setClaimantKey=function(){};_.k.createRetrievalPacket=function(){};_.k.getDomainsNeedingRetrieval=function(){};_.k.addConnectedAccountMember=function(){};_.GY=function(a){return(a==null?void 0:a.Yp)||function(){}};
_.HY=function(a){return(a==null?void 0:a.R_)||function(){}};_.IY=function(a){return(a==null?void 0:a.fs)||function(){}};_.unc=function(a){return new Map(Array.from(a,function(b){var c=_.n(b);b=c.next().value;c=c.next().value;return[b,c.map(function(d){return{epoch:d.epoch,key:new Uint8Array(d.key)}})]}))};_.vnc=function(a){setTimeout(function(){throw a;},0)};_.FY.prototype.Y0=function(){return!0};
_.JY=function(a,b,c,d){c=c===void 0?"":c;a.Bc.El(305,_.DB(new _.CB,b),d,void 0,void 0,_.lY(new _.EB,_.kY(new _.jY,c)))};_.Jt(_.Eo,_.FY);
_.m();
_.l("ziXSP");
var iZ=function(a){_.FY.call(this,a.Ta)};_.K(iZ,_.FY);iZ.Ca=_.FY.Ca;iZ.prototype.Tq=function(a,b,c){var d;if((d=this.window.chrome)==null?0:d.setClientEncryptionKeys)_.GY(c)(),this.window.chrome.setClientEncryptionKeys(_.IY(c),a,b);else{var e;((e=this.window.chrome)==null?0:e.setSyncEncryptionKeys)?(_.GY(c)(),d=dpc(b),b=b.get(_.WY()),this.window.chrome.setSyncEncryptionKeys(_.IY(c),a,d,b[b.length-1].epoch)):_.HY(c)()}};
iZ.prototype.addEncryptionRecoveryMethod=function(a,b,c,d,e){if(!(b.length>0)||b.includes(_.WY())){var f;(f=this.window.chrome)!=null&&f.addTrustedSyncEncryptionRecoveryMethod?(_.GY(e)(),this.window.chrome.addTrustedSyncEncryptionRecoveryMethod(_.IY(e),a,_.XY(c),d)):_.HY(e)()}};
iZ.prototype.addRecoveryContactToDependentKeychain=function(a,b,c,d){var e;(e=this.window.chrome)!=null&&e.addRecoveryContactToDependentKeychain?(_.GY(c)(),this.window.chrome.addRecoveryContactToDependentKeychain(_.IY(c),a,b,d)):_.HY(c)()};iZ.prototype.Y0=function(){var a;return!((a=this.window.chrome)==null||!a.setClientEncryptionKeys)};var dpc=function(a){return a.get(_.WY()).map(function(b){return b.key})};_.Jt(_.VYa,iZ);
_.m();
}catch(e){_._DumpException(e)}
}).call(this,this.default_AccountsSignInUi);
// Google Inc.
