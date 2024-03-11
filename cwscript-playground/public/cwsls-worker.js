"use strict";(()=>{var vh=Object.defineProperty;var Wj=Object.getOwnPropertyDescriptor;var Bj=Object.getOwnPropertyNames;var Vj=Object.prototype.hasOwnProperty;var YS=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var zj=(t,e)=>()=>(t&&(e=t(t=0)),e);var d=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),Yj=(t,e)=>{for(var r in e)vh(t,r,{get:e[r],enumerable:!0})},Xj=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Bj(e))!Vj.call(t,i)&&i!==r&&vh(t,i,{get:()=>e[i],enumerable:!(n=Wj(e,i))||n.enumerable});return t};var XS=t=>Xj(vh({},"__esModule",{value:!0}),t);var qi=d(Rh=>{"use strict";Object.defineProperty(Rh,"__esModule",{value:!0});var Th;function _h(){if(Th===void 0)throw new Error("No runtime abstraction layer installed");return Th}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");Th=r}t.install=e})(_h||(_h={}));Rh.default=_h});var bh=d(Qu=>{"use strict";Object.defineProperty(Qu,"__esModule",{value:!0});Qu.Disposable=void 0;var Jj;(function(t){function e(r){return{dispose:r}}t.create=e})(Jj=Qu.Disposable||(Qu.Disposable={}))});var fo=d(co=>{"use strict";Object.defineProperty(co,"__esModule",{value:!0});co.Emitter=co.Event=void 0;var Qj=qi(),Zj;(function(t){let e={dispose(){}};t.None=function(){return e}})(Zj=co.Event||(co.Event={}));var Sh=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,a=this._callbacks.length;i<a;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let a=0,o=n.length;a<o;a++)try{r.push(n[a].apply(i[a],e))}catch(s){(0,Qj.default)().console.error(s)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},Hc=class t{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new Sh),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=t._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};co.Emitter=Hc;Hc._noop=function(){}});var JS=d(Kc=>{"use strict";Object.defineProperty(Kc,"__esModule",{value:!0});Kc.AbstractMessageBuffer=void 0;var eG=13,tG=10,rG=`\r
`,Ch=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let u=this._chunks[r];for(n=0;n<u.length;){switch(u[n]){case eG:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case tG:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=u.byteLength,r++}if(e!==4)return;let a=this._read(i+n),o=new Map,s=this.toString(a,"ascii").split(rG);if(s.length<2)return o;for(let u=0;u<s.length-2;u++){let l=s[u],c=l.indexOf(":");if(c===-1)throw new Error("Message header must separate key and value using :");let p=l.substr(0,c),h=l.substr(c+1).trim();o.set(p,h)}return o}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let a=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(a)}if(this._chunks[0].byteLength>e){let a=this._chunks[0],o=this.asNative(a,e);return this._chunks[0]=a.slice(e),this._totalLength-=e,o}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let a=this._chunks[i];if(a.byteLength>e){let o=a.slice(0,e);r.set(o,n),n+=e,this._chunks[i]=a.slice(e),this._totalLength-=e,e-=e}else r.set(a,n),n+=a.byteLength,this._chunks.shift(),this._totalLength-=a.byteLength,e-=a.byteLength}return r}};Kc.AbstractMessageBuffer=Ch});var e0=d(kh=>{"use strict";Object.defineProperty(kh,"__esModule",{value:!0});var QS=qi(),is=bh(),nG=fo(),iG=JS(),Wc=class t extends iG.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return t.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};Wc.emptyBuffer=new Uint8Array(0);var Ah=class{constructor(e){this.socket=e,this._onData=new nG.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,QS.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),is.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),is.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),is.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},Eh=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),is.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),is.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),is.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},aG=new TextEncoder,ZS=Object.freeze({messageBuffer:Object.freeze({create:t=>new Wc(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(aG.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new Ah(t),asWritableStream:t=>new Eh(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function Ph(){return ZS}(function(t){function e(){QS.default.install(ZS)}t.install=e})(Ph||(Ph={}));kh.default=Ph});var as=d(dr=>{"use strict";Object.defineProperty(dr,"__esModule",{value:!0});dr.stringArray=dr.array=dr.func=dr.error=dr.number=dr.string=dr.boolean=void 0;function oG(t){return t===!0||t===!1}dr.boolean=oG;function t0(t){return typeof t=="string"||t instanceof String}dr.string=t0;function sG(t){return typeof t=="number"||t instanceof Number}dr.number=sG;function uG(t){return t instanceof Error}dr.error=uG;function lG(t){return typeof t=="function"}dr.func=lG;function r0(t){return Array.isArray(t)}dr.array=r0;function cG(t){return r0(t)&&t.every(e=>t0(e))}dr.stringArray=cG});var Qh=d(ee=>{"use strict";Object.defineProperty(ee,"__esModule",{value:!0});ee.Message=ee.NotificationType9=ee.NotificationType8=ee.NotificationType7=ee.NotificationType6=ee.NotificationType5=ee.NotificationType4=ee.NotificationType3=ee.NotificationType2=ee.NotificationType1=ee.NotificationType0=ee.NotificationType=ee.RequestType9=ee.RequestType8=ee.RequestType7=ee.RequestType6=ee.RequestType5=ee.RequestType4=ee.RequestType3=ee.RequestType2=ee.RequestType1=ee.RequestType=ee.RequestType0=ee.AbstractMessageSignature=ee.ParameterStructures=ee.ResponseError=ee.ErrorCodes=void 0;var po=as(),n0;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(n0=ee.ErrorCodes||(ee.ErrorCodes={}));var wh=class t extends Error{constructor(e,r,n){super(r),this.code=po.number(e)?e:n0.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,t.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};ee.ResponseError=wh;var Gr=class t{constructor(e){this.kind=e}static is(e){return e===t.auto||e===t.byName||e===t.byPosition}toString(){return this.kind}};ee.ParameterStructures=Gr;Gr.auto=new Gr("auto");Gr.byPosition=new Gr("byPosition");Gr.byName=new Gr("byName");var lt=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return Gr.auto}};ee.AbstractMessageSignature=lt;var Nh=class extends lt{constructor(e){super(e,0)}};ee.RequestType0=Nh;var Dh=class extends lt{constructor(e,r=Gr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};ee.RequestType=Dh;var $h=class extends lt{constructor(e,r=Gr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};ee.RequestType1=$h;var Oh=class extends lt{constructor(e){super(e,2)}};ee.RequestType2=Oh;var Ih=class extends lt{constructor(e){super(e,3)}};ee.RequestType3=Ih;var xh=class extends lt{constructor(e){super(e,4)}};ee.RequestType4=xh;var Lh=class extends lt{constructor(e){super(e,5)}};ee.RequestType5=Lh;var qh=class extends lt{constructor(e){super(e,6)}};ee.RequestType6=qh;var Mh=class extends lt{constructor(e){super(e,7)}};ee.RequestType7=Mh;var Fh=class extends lt{constructor(e){super(e,8)}};ee.RequestType8=Fh;var jh=class extends lt{constructor(e){super(e,9)}};ee.RequestType9=jh;var Gh=class extends lt{constructor(e,r=Gr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};ee.NotificationType=Gh;var Uh=class extends lt{constructor(e){super(e,0)}};ee.NotificationType0=Uh;var Hh=class extends lt{constructor(e,r=Gr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};ee.NotificationType1=Hh;var Kh=class extends lt{constructor(e){super(e,2)}};ee.NotificationType2=Kh;var Wh=class extends lt{constructor(e){super(e,3)}};ee.NotificationType3=Wh;var Bh=class extends lt{constructor(e){super(e,4)}};ee.NotificationType4=Bh;var Vh=class extends lt{constructor(e){super(e,5)}};ee.NotificationType5=Vh;var zh=class extends lt{constructor(e){super(e,6)}};ee.NotificationType6=zh;var Yh=class extends lt{constructor(e){super(e,7)}};ee.NotificationType7=Yh;var Xh=class extends lt{constructor(e){super(e,8)}};ee.NotificationType8=Xh;var Jh=class extends lt{constructor(e){super(e,9)}};ee.NotificationType9=Jh;var fG;(function(t){function e(i){let a=i;return a&&po.string(a.method)&&(po.string(a.id)||po.number(a.id))}t.isRequest=e;function r(i){let a=i;return a&&po.string(a.method)&&i.id===void 0}t.isNotification=r;function n(i){let a=i;return a&&(a.result!==void 0||!!a.error)&&(po.string(a.id)||po.number(a.id)||a.id===null)}t.isResponse=n})(fG=ee.Message||(ee.Message={}))});var ey=d(Mi=>{"use strict";var i0;Object.defineProperty(Mi,"__esModule",{value:!0});Mi.LRUCache=Mi.LinkedMap=Mi.Touch=void 0;var Cr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(Cr=Mi.Touch||(Mi.Touch={}));var Bc=class{constructor(){this[i0]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=Cr.None){let n=this._map.get(e);if(n)return r!==Cr.None&&this.touch(n,r),n.value}set(e,r,n=Cr.None){let i=this._map.get(e);if(i)i.value=r,n!==Cr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case Cr.None:this.addItemLast(i);break;case Cr.First:this.addItemFirst(i);break;case Cr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(i0=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==Cr.First&&r!==Cr.Last)){if(r===Cr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===Cr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};Mi.LinkedMap=Bc;var Zh=class extends Bc{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=Cr.AsNew){return super.get(e,r)}peek(e){return super.get(e,Cr.None)}set(e,r){return super.set(e,r,Cr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};Mi.LRUCache=Zh});var iy=d(mo=>{"use strict";Object.defineProperty(mo,"__esModule",{value:!0});mo.CancellationTokenSource=mo.CancellationToken=void 0;var dG=qi(),pG=as(),ty=fo(),ry;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:ty.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:ty.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||pG.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(ry=mo.CancellationToken||(mo.CancellationToken={}));var mG=Object.freeze(function(t,e){let r=(0,dG.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),Vc=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?mG:(this._emitter||(this._emitter=new ty.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},ny=class{get token(){return this._token||(this._token=new Vc),this._token}cancel(){this._token?this._token.cancel():this._token=ry.Cancelled}dispose(){this._token?this._token instanceof Vc&&this._token.dispose():this._token=ry.None}};mo.CancellationTokenSource=ny});var a0=d(Fi=>{"use strict";Object.defineProperty(Fi,"__esModule",{value:!0});Fi.ReadableStreamMessageReader=Fi.AbstractMessageReader=Fi.MessageReader=void 0;var oy=qi(),os=as(),ay=fo(),hG;(function(t){function e(r){let n=r;return n&&os.func(n.listen)&&os.func(n.dispose)&&os.func(n.onError)&&os.func(n.onClose)&&os.func(n.onPartialMessage)}t.is=e})(hG=Fi.MessageReader||(Fi.MessageReader={}));var zc=class{constructor(){this.errorEmitter=new ay.Emitter,this.closeEmitter=new ay.Emitter,this.partialMessageEmitter=new ay.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${os.string(e.message)?e.message:"unknown"}`)}};Fi.AbstractMessageReader=zc;var sy;(function(t){function e(r){let n,i,a,o=new Map,s,u=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(a=r.contentDecoder,o.set(a.name,a)),r.contentDecoders!==void 0)for(let l of r.contentDecoders)o.set(l.name,l);if(r.contentTypeDecoder!==void 0&&(s=r.contentTypeDecoder,u.set(s.name,s)),r.contentTypeDecoders!==void 0)for(let l of r.contentTypeDecoders)u.set(l.name,l)}return s===void 0&&(s=(0,oy.default)().applicationJson.decoder,u.set(s.name,s)),{charset:n,contentDecoder:a,contentDecoders:o,contentTypeDecoder:s,contentTypeDecoders:u}}t.fromOptions=e})(sy||(sy={}));var uy=class extends zc{constructor(e,r){super(),this.readable=e,this.options=sy.fromOptions(r),this.buffer=(0,oy.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let a=i.get("Content-Length");if(!a)throw new Error("Header must provide a Content-Length property.");let o=parseInt(a);if(isNaN(o))throw new Error("Content-Length value must be a number.");this.nextMessageLength=o}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(a=>{this.callback(a)},a=>{this.fireError(a)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,oy.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};Fi.ReadableStreamMessageReader=uy});var o0=d(Yc=>{"use strict";Object.defineProperty(Yc,"__esModule",{value:!0});Yc.Semaphore=void 0;var yG=qi(),ly=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,yG.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};Yc.Semaphore=ly});var c0=d(ji=>{"use strict";Object.defineProperty(ji,"__esModule",{value:!0});ji.WriteableStreamMessageWriter=ji.AbstractMessageWriter=ji.MessageWriter=void 0;var s0=qi(),Zu=as(),gG=o0(),u0=fo(),vG="Content-Length: ",l0=`\r
`,TG;(function(t){function e(r){let n=r;return n&&Zu.func(n.dispose)&&Zu.func(n.onClose)&&Zu.func(n.onError)&&Zu.func(n.write)}t.is=e})(TG=ji.MessageWriter||(ji.MessageWriter={}));var Xc=class{constructor(){this.errorEmitter=new u0.Emitter,this.closeEmitter=new u0.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${Zu.string(e.message)?e.message:"unknown"}`)}};ji.AbstractMessageWriter=Xc;var cy;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,s0.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,s0.default)().applicationJson.encoder}}t.fromOptions=e})(cy||(cy={}));var fy=class extends Xc{constructor(e,r){super(),this.writable=e,this.options=cy.fromOptions(r),this.errorCount=0,this.writeSemaphore=new gG.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(vG,n.byteLength.toString(),l0),i.push(l0),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};ji.WriteableStreamMessageWriter=fy});var y0=d(ue=>{"use strict";Object.defineProperty(ue,"__esModule",{value:!0});ue.createMessageConnection=ue.ConnectionOptions=ue.CancellationStrategy=ue.CancellationSenderStrategy=ue.CancellationReceiverStrategy=ue.ConnectionStrategy=ue.ConnectionError=ue.ConnectionErrors=ue.LogTraceNotification=ue.SetTraceNotification=ue.TraceFormat=ue.TraceValues=ue.Trace=ue.NullLogger=ue.ProgressType=ue.ProgressToken=void 0;var f0=qi(),Wt=as(),fe=Qh(),d0=ey(),el=fo(),dy=iy(),rl;(function(t){t.type=new fe.NotificationType("$/cancelRequest")})(rl||(rl={}));var p0;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(p0=ue.ProgressToken||(ue.ProgressToken={}));var tl;(function(t){t.type=new fe.NotificationType("$/progress")})(tl||(tl={}));var py=class{constructor(){}};ue.ProgressType=py;var my;(function(t){function e(r){return Wt.func(r)}t.is=e})(my||(my={}));ue.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var We;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(We=ue.Trace||(ue.Trace={}));var _G;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(_G=ue.TraceValues||(ue.TraceValues={}));(function(t){function e(n){if(!Wt.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(We=ue.Trace||(ue.Trace={}));var xn;(function(t){t.Text="text",t.JSON="json"})(xn=ue.TraceFormat||(ue.TraceFormat={}));(function(t){function e(r){return Wt.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(xn=ue.TraceFormat||(ue.TraceFormat={}));var m0;(function(t){t.type=new fe.NotificationType("$/setTrace")})(m0=ue.SetTraceNotification||(ue.SetTraceNotification={}));var hy;(function(t){t.type=new fe.NotificationType("$/logTrace")})(hy=ue.LogTraceNotification||(ue.LogTraceNotification={}));var Jc;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(Jc=ue.ConnectionErrors||(ue.ConnectionErrors={}));var ss=class t extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,t.prototype)}};ue.ConnectionError=ss;var h0;(function(t){function e(r){let n=r;return n&&Wt.func(n.cancelUndispatched)}t.is=e})(h0=ue.ConnectionStrategy||(ue.ConnectionStrategy={}));var yy;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new dy.CancellationTokenSource}});function e(r){let n=r;return n&&Wt.func(n.createCancellationTokenSource)}t.is=e})(yy=ue.CancellationReceiverStrategy||(ue.CancellationReceiverStrategy={}));var gy;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(rl.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&Wt.func(n.sendCancellation)&&Wt.func(n.cleanup)}t.is=e})(gy=ue.CancellationSenderStrategy||(ue.CancellationSenderStrategy={}));var vy;(function(t){t.Message=Object.freeze({receiver:yy.Message,sender:gy.Message});function e(r){let n=r;return n&&yy.is(n.receiver)&&gy.is(n.sender)}t.is=e})(vy=ue.CancellationStrategy||(ue.CancellationStrategy={}));var RG;(function(t){function e(r){let n=r;return n&&(vy.is(n.cancellationStrategy)||h0.is(n.connectionStrategy))}t.is=e})(RG=ue.ConnectionOptions||(ue.ConnectionOptions={}));var Ln;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(Ln||(Ln={}));function bG(t,e,r,n){let i=r!==void 0?r:ue.NullLogger,a=0,o=0,s=0,u="2.0",l,c=new Map,p,h=new Map,R=new Map,y,A=new d0.LinkedMap,w=new Map,P=new Set,C=new Map,b=We.Off,x=xn.Text,G,Y=Ln.New,ce=new el.Emitter,Ke=new el.Emitter,we=new el.Emitter,W=new el.Emitter,I=new el.Emitter,H=n&&n.cancellationStrategy?n.cancellationStrategy:vy.Message;function X(E){if(E===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+E.toString()}function be(E){return E===null?"res-unknown-"+(++s).toString():"res-"+E.toString()}function he(){return"not-"+(++o).toString()}function le(E,v){fe.Message.isRequest(v)?E.set(X(v.id),v):fe.Message.isResponse(v)?E.set(be(v.id),v):E.set(he(),v)}function st(E){}function et(){return Y===Ln.Listening}function Ne(){return Y===Ln.Closed}function Tt(){return Y===Ln.Disposed}function Mr(){(Y===Ln.New||Y===Ln.Listening)&&(Y=Ln.Closed,Ke.fire(void 0))}function Dn(E){ce.fire([E,void 0,void 0])}function ga(E){ce.fire(E)}t.onClose(Mr),t.onError(Dn),e.onClose(Mr),e.onError(ga);function Ii(){y||A.size===0||(y=(0,f0.default)().timer.setImmediate(()=>{y=void 0,xi()}))}function xi(){if(A.size===0)return;let E=A.shift();try{fe.Message.isRequest(E)?va(E):fe.Message.isNotification(E)?_a(E):fe.Message.isResponse(E)?Ta(E):uo(E)}finally{Ii()}}let nr=E=>{try{if(fe.Message.isNotification(E)&&E.method===rl.type.method){let v=E.params.id,N=X(v),L=A.get(N);if(fe.Message.isRequest(L)){let ae=n?.connectionStrategy,oe=ae&&ae.cancelUndispatched?ae.cancelUndispatched(L,st):void 0;if(oe&&(oe.error!==void 0||oe.result!==void 0)){A.delete(N),C.delete(v),oe.id=L.id,ln(oe,E.method,Date.now()),e.write(oe).catch(()=>i.error("Sending response for canceled message failed."));return}}let U=C.get(v);if(U!==void 0){U.cancel(),fn(E);return}else P.add(v)}le(A,E)}finally{Ii()}};function va(E){if(Tt())return;function v(ne,J,ie){let se={jsonrpc:u,id:E.id};ne instanceof fe.ResponseError?se.error=ne.toJson():se.result=ne===void 0?null:ne,ln(se,J,ie),e.write(se).catch(()=>i.error("Sending response failed."))}function N(ne,J,ie){let se={jsonrpc:u,id:E.id,error:ne.toJson()};ln(se,J,ie),e.write(se).catch(()=>i.error("Sending response failed."))}function L(ne,J,ie){ne===void 0&&(ne=null);let se={jsonrpc:u,id:E.id,result:ne};ln(se,J,ie),e.write(se).catch(()=>i.error("Sending response failed."))}cn(E);let U=c.get(E.method),ae,oe;U&&(ae=U.type,oe=U.handler);let ye=Date.now();if(oe||l){let ne=E.id??String(Date.now()),J=H.receiver.createCancellationTokenSource(ne);E.id!==null&&P.has(E.id)&&J.cancel(),E.id!==null&&C.set(ne,J);try{let ie;if(oe)if(E.params===void 0){if(ae!==void 0&&ae.numberOfParams!==0){N(new fe.ResponseError(fe.ErrorCodes.InvalidParams,`Request ${E.method} defines ${ae.numberOfParams} params but received none.`),E.method,ye);return}ie=oe(J.token)}else if(Array.isArray(E.params)){if(ae!==void 0&&ae.parameterStructures===fe.ParameterStructures.byName){N(new fe.ResponseError(fe.ErrorCodes.InvalidParams,`Request ${E.method} defines parameters by name but received parameters by position`),E.method,ye);return}ie=oe(...E.params,J.token)}else{if(ae!==void 0&&ae.parameterStructures===fe.ParameterStructures.byPosition){N(new fe.ResponseError(fe.ErrorCodes.InvalidParams,`Request ${E.method} defines parameters by position but received parameters by name`),E.method,ye);return}ie=oe(E.params,J.token)}else l&&(ie=l(E.method,E.params,J.token));let se=ie;ie?se.then?se.then(Se=>{C.delete(ne),v(Se,E.method,ye)},Se=>{C.delete(ne),Se instanceof fe.ResponseError?N(Se,E.method,ye):Se&&Wt.string(Se.message)?N(new fe.ResponseError(fe.ErrorCodes.InternalError,`Request ${E.method} failed with message: ${Se.message}`),E.method,ye):N(new fe.ResponseError(fe.ErrorCodes.InternalError,`Request ${E.method} failed unexpectedly without providing any details.`),E.method,ye)}):(C.delete(ne),v(ie,E.method,ye)):(C.delete(ne),L(ie,E.method,ye))}catch(ie){C.delete(ne),ie instanceof fe.ResponseError?v(ie,E.method,ye):ie&&Wt.string(ie.message)?N(new fe.ResponseError(fe.ErrorCodes.InternalError,`Request ${E.method} failed with message: ${ie.message}`),E.method,ye):N(new fe.ResponseError(fe.ErrorCodes.InternalError,`Request ${E.method} failed unexpectedly without providing any details.`),E.method,ye)}}else N(new fe.ResponseError(fe.ErrorCodes.MethodNotFound,`Unhandled method ${E.method}`),E.method,ye)}function Ta(E){if(!Tt())if(E.id===null)E.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(E.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let v=E.id,N=w.get(v);if($n(E,N),N!==void 0){w.delete(v);try{if(E.error){let L=E.error;N.reject(new fe.ResponseError(L.code,L.message,L.data))}else if(E.result!==void 0)N.resolve(E.result);else throw new Error("Should never happen.")}catch(L){L.message?i.error(`Response handler '${N.method}' failed with message: ${L.message}`):i.error(`Response handler '${N.method}' failed unexpectedly.`)}}}}function _a(E){if(Tt())return;let v,N;if(E.method===rl.type.method){let L=E.params.id;P.delete(L),fn(E);return}else{let L=h.get(E.method);L&&(N=L.handler,v=L.type)}if(N||p)try{if(fn(E),N)if(E.params===void 0)v!==void 0&&v.numberOfParams!==0&&v.parameterStructures!==fe.ParameterStructures.byName&&i.error(`Notification ${E.method} defines ${v.numberOfParams} params but received none.`),N();else if(Array.isArray(E.params)){let L=E.params;E.method===tl.type.method&&L.length===2&&p0.is(L[0])?N({token:L[0],value:L[1]}):(v!==void 0&&(v.parameterStructures===fe.ParameterStructures.byName&&i.error(`Notification ${E.method} defines parameters by name but received parameters by position`),v.numberOfParams!==E.params.length&&i.error(`Notification ${E.method} defines ${v.numberOfParams} params but received ${L.length} arguments`)),N(...L))}else v!==void 0&&v.parameterStructures===fe.ParameterStructures.byPosition&&i.error(`Notification ${E.method} defines parameters by position but received parameters by name`),N(E.params);else p&&p(E.method,E.params)}catch(L){L.message?i.error(`Notification handler '${E.method}' failed with message: ${L.message}`):i.error(`Notification handler '${E.method}' failed unexpectedly.`)}else we.fire(E)}function uo(E){if(!E){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(E,null,4)}`);let v=E;if(Wt.string(v.id)||Wt.number(v.id)){let N=v.id,L=w.get(N);L&&L.reject(new Error("The received response has neither a result nor an error property."))}}function _t(E){if(E!=null)switch(b){case We.Verbose:return JSON.stringify(E,null,4);case We.Compact:return JSON.stringify(E);default:return}}function Vt(E){if(!(b===We.Off||!G))if(x===xn.Text){let v;(b===We.Verbose||b===We.Compact)&&E.params&&(v=`Params: ${_t(E.params)}

`),G.log(`Sending request '${E.method} - (${E.id})'.`,v)}else Fr("send-request",E)}function lo(E){if(!(b===We.Off||!G))if(x===xn.Text){let v;(b===We.Verbose||b===We.Compact)&&(E.params?v=`Params: ${_t(E.params)}

`:v=`No parameters provided.

`),G.log(`Sending notification '${E.method}'.`,v)}else Fr("send-notification",E)}function ln(E,v,N){if(!(b===We.Off||!G))if(x===xn.Text){let L;(b===We.Verbose||b===We.Compact)&&(E.error&&E.error.data?L=`Error data: ${_t(E.error.data)}

`:E.result?L=`Result: ${_t(E.result)}

`:E.error===void 0&&(L=`No result returned.

`)),G.log(`Sending response '${v} - (${E.id})'. Processing request took ${Date.now()-N}ms`,L)}else Fr("send-response",E)}function cn(E){if(!(b===We.Off||!G))if(x===xn.Text){let v;(b===We.Verbose||b===We.Compact)&&E.params&&(v=`Params: ${_t(E.params)}

`),G.log(`Received request '${E.method} - (${E.id})'.`,v)}else Fr("receive-request",E)}function fn(E){if(!(b===We.Off||!G||E.method===hy.type.method))if(x===xn.Text){let v;(b===We.Verbose||b===We.Compact)&&(E.params?v=`Params: ${_t(E.params)}

`:v=`No parameters provided.

`),G.log(`Received notification '${E.method}'.`,v)}else Fr("receive-notification",E)}function $n(E,v){if(!(b===We.Off||!G))if(x===xn.Text){let N;if((b===We.Verbose||b===We.Compact)&&(E.error&&E.error.data?N=`Error data: ${_t(E.error.data)}

`:E.result?N=`Result: ${_t(E.result)}

`:E.error===void 0&&(N=`No result returned.

`)),v){let L=E.error?` Request failed: ${E.error.message} (${E.error.code}).`:"";G.log(`Received response '${v.method} - (${E.id})' in ${Date.now()-v.timerStart}ms.${L}`,N)}else G.log(`Received response ${E.id} without active response promise.`,N)}else Fr("receive-response",E)}function Fr(E,v){if(!G||b===We.Off)return;let N={isLSPMessage:!0,type:E,message:v,timestamp:Date.now()};G.log(N)}function zt(){if(Ne())throw new ss(Jc.Closed,"Connection is closed.");if(Tt())throw new ss(Jc.Disposed,"Connection is disposed.")}function dn(){if(et())throw new ss(Jc.AlreadyListening,"Connection is already listening")}function Ra(){if(!et())throw new Error("Call listen() first.")}function br(E){return E===void 0?null:E}function fr(E){if(E!==null)return E}function kt(E){return E!=null&&!Array.isArray(E)&&typeof E=="object"}function jr(E,v){switch(E){case fe.ParameterStructures.auto:return kt(v)?fr(v):[br(v)];case fe.ParameterStructures.byName:if(!kt(v))throw new Error("Received parameters by name but param is not an object literal.");return fr(v);case fe.ParameterStructures.byPosition:return[br(v)];default:throw new Error(`Unknown parameter structure ${E.toString()}`)}}function Sr(E,v){let N,L=E.numberOfParams;switch(L){case 0:N=void 0;break;case 1:N=jr(E.parameterStructures,v[0]);break;default:N=[];for(let U=0;U<v.length&&U<L;U++)N.push(br(v[U]));if(v.length<L)for(let U=v.length;U<L;U++)N.push(null);break}return N}let Qr={sendNotification:(E,...v)=>{zt();let N,L;if(Wt.string(E)){N=E;let ae=v[0],oe=0,ye=fe.ParameterStructures.auto;fe.ParameterStructures.is(ae)&&(oe=1,ye=ae);let ne=v.length,J=ne-oe;switch(J){case 0:L=void 0;break;case 1:L=jr(ye,v[oe]);break;default:if(ye===fe.ParameterStructures.byName)throw new Error(`Received ${J} parameters for 'by Name' notification parameter structure.`);L=v.slice(oe,ne).map(ie=>br(ie));break}}else{let ae=v;N=E.method,L=Sr(E,ae)}let U={jsonrpc:u,method:N,params:L};return lo(U),e.write(U).catch(()=>i.error("Sending notification failed."))},onNotification:(E,v)=>{zt();let N;return Wt.func(E)?p=E:v&&(Wt.string(E)?(N=E,h.set(E,{type:void 0,handler:v})):(N=E.method,h.set(E.method,{type:E,handler:v}))),{dispose:()=>{N!==void 0?h.delete(N):p=void 0}}},onProgress:(E,v,N)=>{if(R.has(v))throw new Error(`Progress handler for token ${v} already registered`);return R.set(v,N),{dispose:()=>{R.delete(v)}}},sendProgress:(E,v,N)=>Qr.sendNotification(tl.type,{token:v,value:N}),onUnhandledProgress:W.event,sendRequest:(E,...v)=>{zt(),Ra();let N,L,U;if(Wt.string(E)){N=E;let ne=v[0],J=v[v.length-1],ie=0,se=fe.ParameterStructures.auto;fe.ParameterStructures.is(ne)&&(ie=1,se=ne);let Se=v.length;dy.CancellationToken.is(J)&&(Se=Se-1,U=J);let ut=Se-ie;switch(ut){case 0:L=void 0;break;case 1:L=jr(se,v[ie]);break;default:if(se===fe.ParameterStructures.byName)throw new Error(`Received ${ut} parameters for 'by Name' request parameter structure.`);L=v.slice(ie,Se).map(wt=>br(wt));break}}else{let ne=v;N=E.method,L=Sr(E,ne);let J=E.numberOfParams;U=dy.CancellationToken.is(ne[J])?ne[J]:void 0}let ae=a++,oe;return U&&(oe=U.onCancellationRequested(()=>{let ne=H.sender.sendCancellation(Qr,ae);return ne===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${ae}`),Promise.resolve()):ne.catch(()=>{i.log(`Sending cancellation messages for id ${ae} failed`)})})),new Promise((ne,J)=>{let ie={jsonrpc:u,id:ae,method:N,params:L},se=wt=>{ne(wt),H.sender.cleanup(ae),oe?.dispose()},Se=wt=>{J(wt),H.sender.cleanup(ae),oe?.dispose()},ut={method:N,timerStart:Date.now(),resolve:se,reject:Se};Vt(ie);try{e.write(ie).catch(()=>i.error("Sending request failed."))}catch(wt){ut.reject(new fe.ResponseError(fe.ErrorCodes.MessageWriteError,wt.message?wt.message:"Unknown reason")),ut=null}ut&&w.set(ae,ut)})},onRequest:(E,v)=>{zt();let N=null;return my.is(E)?(N=void 0,l=E):Wt.string(E)?(N=null,v!==void 0&&(N=E,c.set(E,{handler:v,type:void 0}))):v!==void 0&&(N=E.method,c.set(E.method,{type:E,handler:v})),{dispose:()=>{N!==null&&(N!==void 0?c.delete(N):l=void 0)}}},hasPendingResponse:()=>w.size>0,trace:async(E,v,N)=>{let L=!1,U=xn.Text;N!==void 0&&(Wt.boolean(N)?L=N:(L=N.sendNotification||!1,U=N.traceFormat||xn.Text)),b=E,x=U,b===We.Off?G=void 0:G=v,L&&!Ne()&&!Tt()&&await Qr.sendNotification(m0.type,{value:We.toString(E)})},onError:ce.event,onClose:Ke.event,onUnhandledNotification:we.event,onDispose:I.event,end:()=>{e.end()},dispose:()=>{if(Tt())return;Y=Ln.Disposed,I.fire(void 0);let E=new fe.ResponseError(fe.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let v of w.values())v.reject(E);w=new Map,C=new Map,P=new Set,A=new d0.LinkedMap,Wt.func(e.dispose)&&e.dispose(),Wt.func(t.dispose)&&t.dispose()},listen:()=>{zt(),dn(),Y=Ln.Listening,t.listen(nr)},inspect:()=>{(0,f0.default)().console.log("inspect")}};return Qr.onNotification(hy.type,E=>{if(b===We.Off||!G)return;let v=b===We.Verbose||b===We.Compact;G.log(E.message,v?E.verbose:void 0)}),Qr.onNotification(tl.type,E=>{let v=R.get(E.token);v?v(E.value):W.fire(E)}),Qr}ue.createMessageConnection=bG});var by=d(M=>{"use strict";Object.defineProperty(M,"__esModule",{value:!0});M.TraceFormat=M.TraceValues=M.Trace=M.ProgressType=M.ProgressToken=M.createMessageConnection=M.NullLogger=M.ConnectionOptions=M.ConnectionStrategy=M.WriteableStreamMessageWriter=M.AbstractMessageWriter=M.MessageWriter=M.ReadableStreamMessageReader=M.AbstractMessageReader=M.MessageReader=M.CancellationToken=M.CancellationTokenSource=M.Emitter=M.Event=M.Disposable=M.LRUCache=M.Touch=M.LinkedMap=M.ParameterStructures=M.NotificationType9=M.NotificationType8=M.NotificationType7=M.NotificationType6=M.NotificationType5=M.NotificationType4=M.NotificationType3=M.NotificationType2=M.NotificationType1=M.NotificationType0=M.NotificationType=M.ErrorCodes=M.ResponseError=M.RequestType9=M.RequestType8=M.RequestType7=M.RequestType6=M.RequestType5=M.RequestType4=M.RequestType3=M.RequestType2=M.RequestType1=M.RequestType0=M.RequestType=M.Message=M.RAL=void 0;M.CancellationStrategy=M.CancellationSenderStrategy=M.CancellationReceiverStrategy=M.ConnectionError=M.ConnectionErrors=M.LogTraceNotification=M.SetTraceNotification=void 0;var rt=Qh();Object.defineProperty(M,"Message",{enumerable:!0,get:function(){return rt.Message}});Object.defineProperty(M,"RequestType",{enumerable:!0,get:function(){return rt.RequestType}});Object.defineProperty(M,"RequestType0",{enumerable:!0,get:function(){return rt.RequestType0}});Object.defineProperty(M,"RequestType1",{enumerable:!0,get:function(){return rt.RequestType1}});Object.defineProperty(M,"RequestType2",{enumerable:!0,get:function(){return rt.RequestType2}});Object.defineProperty(M,"RequestType3",{enumerable:!0,get:function(){return rt.RequestType3}});Object.defineProperty(M,"RequestType4",{enumerable:!0,get:function(){return rt.RequestType4}});Object.defineProperty(M,"RequestType5",{enumerable:!0,get:function(){return rt.RequestType5}});Object.defineProperty(M,"RequestType6",{enumerable:!0,get:function(){return rt.RequestType6}});Object.defineProperty(M,"RequestType7",{enumerable:!0,get:function(){return rt.RequestType7}});Object.defineProperty(M,"RequestType8",{enumerable:!0,get:function(){return rt.RequestType8}});Object.defineProperty(M,"RequestType9",{enumerable:!0,get:function(){return rt.RequestType9}});Object.defineProperty(M,"ResponseError",{enumerable:!0,get:function(){return rt.ResponseError}});Object.defineProperty(M,"ErrorCodes",{enumerable:!0,get:function(){return rt.ErrorCodes}});Object.defineProperty(M,"NotificationType",{enumerable:!0,get:function(){return rt.NotificationType}});Object.defineProperty(M,"NotificationType0",{enumerable:!0,get:function(){return rt.NotificationType0}});Object.defineProperty(M,"NotificationType1",{enumerable:!0,get:function(){return rt.NotificationType1}});Object.defineProperty(M,"NotificationType2",{enumerable:!0,get:function(){return rt.NotificationType2}});Object.defineProperty(M,"NotificationType3",{enumerable:!0,get:function(){return rt.NotificationType3}});Object.defineProperty(M,"NotificationType4",{enumerable:!0,get:function(){return rt.NotificationType4}});Object.defineProperty(M,"NotificationType5",{enumerable:!0,get:function(){return rt.NotificationType5}});Object.defineProperty(M,"NotificationType6",{enumerable:!0,get:function(){return rt.NotificationType6}});Object.defineProperty(M,"NotificationType7",{enumerable:!0,get:function(){return rt.NotificationType7}});Object.defineProperty(M,"NotificationType8",{enumerable:!0,get:function(){return rt.NotificationType8}});Object.defineProperty(M,"NotificationType9",{enumerable:!0,get:function(){return rt.NotificationType9}});Object.defineProperty(M,"ParameterStructures",{enumerable:!0,get:function(){return rt.ParameterStructures}});var Ty=ey();Object.defineProperty(M,"LinkedMap",{enumerable:!0,get:function(){return Ty.LinkedMap}});Object.defineProperty(M,"LRUCache",{enumerable:!0,get:function(){return Ty.LRUCache}});Object.defineProperty(M,"Touch",{enumerable:!0,get:function(){return Ty.Touch}});var SG=bh();Object.defineProperty(M,"Disposable",{enumerable:!0,get:function(){return SG.Disposable}});var g0=fo();Object.defineProperty(M,"Event",{enumerable:!0,get:function(){return g0.Event}});Object.defineProperty(M,"Emitter",{enumerable:!0,get:function(){return g0.Emitter}});var v0=iy();Object.defineProperty(M,"CancellationTokenSource",{enumerable:!0,get:function(){return v0.CancellationTokenSource}});Object.defineProperty(M,"CancellationToken",{enumerable:!0,get:function(){return v0.CancellationToken}});var _y=a0();Object.defineProperty(M,"MessageReader",{enumerable:!0,get:function(){return _y.MessageReader}});Object.defineProperty(M,"AbstractMessageReader",{enumerable:!0,get:function(){return _y.AbstractMessageReader}});Object.defineProperty(M,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return _y.ReadableStreamMessageReader}});var Ry=c0();Object.defineProperty(M,"MessageWriter",{enumerable:!0,get:function(){return Ry.MessageWriter}});Object.defineProperty(M,"AbstractMessageWriter",{enumerable:!0,get:function(){return Ry.AbstractMessageWriter}});Object.defineProperty(M,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return Ry.WriteableStreamMessageWriter}});var pr=y0();Object.defineProperty(M,"ConnectionStrategy",{enumerable:!0,get:function(){return pr.ConnectionStrategy}});Object.defineProperty(M,"ConnectionOptions",{enumerable:!0,get:function(){return pr.ConnectionOptions}});Object.defineProperty(M,"NullLogger",{enumerable:!0,get:function(){return pr.NullLogger}});Object.defineProperty(M,"createMessageConnection",{enumerable:!0,get:function(){return pr.createMessageConnection}});Object.defineProperty(M,"ProgressToken",{enumerable:!0,get:function(){return pr.ProgressToken}});Object.defineProperty(M,"ProgressType",{enumerable:!0,get:function(){return pr.ProgressType}});Object.defineProperty(M,"Trace",{enumerable:!0,get:function(){return pr.Trace}});Object.defineProperty(M,"TraceValues",{enumerable:!0,get:function(){return pr.TraceValues}});Object.defineProperty(M,"TraceFormat",{enumerable:!0,get:function(){return pr.TraceFormat}});Object.defineProperty(M,"SetTraceNotification",{enumerable:!0,get:function(){return pr.SetTraceNotification}});Object.defineProperty(M,"LogTraceNotification",{enumerable:!0,get:function(){return pr.LogTraceNotification}});Object.defineProperty(M,"ConnectionErrors",{enumerable:!0,get:function(){return pr.ConnectionErrors}});Object.defineProperty(M,"ConnectionError",{enumerable:!0,get:function(){return pr.ConnectionError}});Object.defineProperty(M,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return pr.CancellationReceiverStrategy}});Object.defineProperty(M,"CancellationSenderStrategy",{enumerable:!0,get:function(){return pr.CancellationSenderStrategy}});Object.defineProperty(M,"CancellationStrategy",{enumerable:!0,get:function(){return pr.CancellationStrategy}});var CG=qi();M.RAL=CG.default});var ho=d(Zr=>{"use strict";var AG=Zr&&Zr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),EG=Zr&&Zr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&AG(e,t,r)};Object.defineProperty(Zr,"__esModule",{value:!0});Zr.createMessageConnection=Zr.BrowserMessageWriter=Zr.BrowserMessageReader=void 0;var PG=e0();PG.default.install();var us=by();EG(by(),Zr);var Sy=class extends us.AbstractMessageReader{constructor(e){super(),this._onData=new us.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};Zr.BrowserMessageReader=Sy;var Cy=class extends us.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};Zr.BrowserMessageWriter=Cy;function kG(t,e,r,n){return r===void 0&&(r=us.NullLogger),us.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,us.createMessageConnection)(t,e,r,n)}Zr.createMessageConnection=kG});var Ay=d((kye,T0)=>{"use strict";T0.exports=ho()});var yo=d((_0,Qc)=>{(function(t){if(typeof Qc=="object"&&typeof Qc.exports=="object"){var e=t(YS,_0);e!==void 0&&(Qc.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(g){function k(D){return typeof D=="string"}g.is=k})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(g){function k(D){return typeof D=="string"}g.is=k})(n=e.URI||(e.URI={}));var i;(function(g){g.MIN_VALUE=-2147483648,g.MAX_VALUE=2147483647;function k(D){return typeof D=="number"&&g.MIN_VALUE<=D&&D<=g.MAX_VALUE}g.is=k})(i=e.integer||(e.integer={}));var a;(function(g){g.MIN_VALUE=0,g.MAX_VALUE=2147483647;function k(D){return typeof D=="number"&&g.MIN_VALUE<=D&&D<=g.MAX_VALUE}g.is=k})(a=e.uinteger||(e.uinteger={}));var o;(function(g){function k(S,m){return S===Number.MAX_VALUE&&(S=a.MAX_VALUE),m===Number.MAX_VALUE&&(m=a.MAX_VALUE),{line:S,character:m}}g.create=k;function D(S){var m=S;return $.objectLiteral(m)&&$.uinteger(m.line)&&$.uinteger(m.character)}g.is=D})(o=e.Position||(e.Position={}));var s;(function(g){function k(S,m,O,j){if($.uinteger(S)&&$.uinteger(m)&&$.uinteger(O)&&$.uinteger(j))return{start:o.create(S,m),end:o.create(O,j)};if(o.is(S)&&o.is(m))return{start:S,end:m};throw new Error("Range#create called with invalid arguments[".concat(S,", ").concat(m,", ").concat(O,", ").concat(j,"]"))}g.create=k;function D(S){var m=S;return $.objectLiteral(m)&&o.is(m.start)&&o.is(m.end)}g.is=D})(s=e.Range||(e.Range={}));var u;(function(g){function k(S,m){return{uri:S,range:m}}g.create=k;function D(S){var m=S;return $.objectLiteral(m)&&s.is(m.range)&&($.string(m.uri)||$.undefined(m.uri))}g.is=D})(u=e.Location||(e.Location={}));var l;(function(g){function k(S,m,O,j){return{targetUri:S,targetRange:m,targetSelectionRange:O,originSelectionRange:j}}g.create=k;function D(S){var m=S;return $.objectLiteral(m)&&s.is(m.targetRange)&&$.string(m.targetUri)&&s.is(m.targetSelectionRange)&&(s.is(m.originSelectionRange)||$.undefined(m.originSelectionRange))}g.is=D})(l=e.LocationLink||(e.LocationLink={}));var c;(function(g){function k(S,m,O,j){return{red:S,green:m,blue:O,alpha:j}}g.create=k;function D(S){var m=S;return $.objectLiteral(m)&&$.numberRange(m.red,0,1)&&$.numberRange(m.green,0,1)&&$.numberRange(m.blue,0,1)&&$.numberRange(m.alpha,0,1)}g.is=D})(c=e.Color||(e.Color={}));var p;(function(g){function k(S,m){return{range:S,color:m}}g.create=k;function D(S){var m=S;return $.objectLiteral(m)&&s.is(m.range)&&c.is(m.color)}g.is=D})(p=e.ColorInformation||(e.ColorInformation={}));var h;(function(g){function k(S,m,O){return{label:S,textEdit:m,additionalTextEdits:O}}g.create=k;function D(S){var m=S;return $.objectLiteral(m)&&$.string(m.label)&&($.undefined(m.textEdit)||G.is(m))&&($.undefined(m.additionalTextEdits)||$.typedArray(m.additionalTextEdits,G.is))}g.is=D})(h=e.ColorPresentation||(e.ColorPresentation={}));var R;(function(g){g.Comment="comment",g.Imports="imports",g.Region="region"})(R=e.FoldingRangeKind||(e.FoldingRangeKind={}));var y;(function(g){function k(S,m,O,j,ge,Ct){var tt={startLine:S,endLine:m};return $.defined(O)&&(tt.startCharacter=O),$.defined(j)&&(tt.endCharacter=j),$.defined(ge)&&(tt.kind=ge),$.defined(Ct)&&(tt.collapsedText=Ct),tt}g.create=k;function D(S){var m=S;return $.objectLiteral(m)&&$.uinteger(m.startLine)&&$.uinteger(m.startLine)&&($.undefined(m.startCharacter)||$.uinteger(m.startCharacter))&&($.undefined(m.endCharacter)||$.uinteger(m.endCharacter))&&($.undefined(m.kind)||$.string(m.kind))}g.is=D})(y=e.FoldingRange||(e.FoldingRange={}));var A;(function(g){function k(S,m){return{location:S,message:m}}g.create=k;function D(S){var m=S;return $.defined(m)&&u.is(m.location)&&$.string(m.message)}g.is=D})(A=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var w;(function(g){g.Error=1,g.Warning=2,g.Information=3,g.Hint=4})(w=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var P;(function(g){g.Unnecessary=1,g.Deprecated=2})(P=e.DiagnosticTag||(e.DiagnosticTag={}));var C;(function(g){function k(D){var S=D;return $.objectLiteral(S)&&$.string(S.href)}g.is=k})(C=e.CodeDescription||(e.CodeDescription={}));var b;(function(g){function k(S,m,O,j,ge,Ct){var tt={range:S,message:m};return $.defined(O)&&(tt.severity=O),$.defined(j)&&(tt.code=j),$.defined(ge)&&(tt.source=ge),$.defined(Ct)&&(tt.relatedInformation=Ct),tt}g.create=k;function D(S){var m,O=S;return $.defined(O)&&s.is(O.range)&&$.string(O.message)&&($.number(O.severity)||$.undefined(O.severity))&&($.integer(O.code)||$.string(O.code)||$.undefined(O.code))&&($.undefined(O.codeDescription)||$.string((m=O.codeDescription)===null||m===void 0?void 0:m.href))&&($.string(O.source)||$.undefined(O.source))&&($.undefined(O.relatedInformation)||$.typedArray(O.relatedInformation,A.is))}g.is=D})(b=e.Diagnostic||(e.Diagnostic={}));var x;(function(g){function k(S,m){for(var O=[],j=2;j<arguments.length;j++)O[j-2]=arguments[j];var ge={title:S,command:m};return $.defined(O)&&O.length>0&&(ge.arguments=O),ge}g.create=k;function D(S){var m=S;return $.defined(m)&&$.string(m.title)&&$.string(m.command)}g.is=D})(x=e.Command||(e.Command={}));var G;(function(g){function k(O,j){return{range:O,newText:j}}g.replace=k;function D(O,j){return{range:{start:O,end:O},newText:j}}g.insert=D;function S(O){return{range:O,newText:""}}g.del=S;function m(O){var j=O;return $.objectLiteral(j)&&$.string(j.newText)&&s.is(j.range)}g.is=m})(G=e.TextEdit||(e.TextEdit={}));var Y;(function(g){function k(S,m,O){var j={label:S};return m!==void 0&&(j.needsConfirmation=m),O!==void 0&&(j.description=O),j}g.create=k;function D(S){var m=S;return $.objectLiteral(m)&&$.string(m.label)&&($.boolean(m.needsConfirmation)||m.needsConfirmation===void 0)&&($.string(m.description)||m.description===void 0)}g.is=D})(Y=e.ChangeAnnotation||(e.ChangeAnnotation={}));var ce;(function(g){function k(D){var S=D;return $.string(S)}g.is=k})(ce=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var Ke;(function(g){function k(O,j,ge){return{range:O,newText:j,annotationId:ge}}g.replace=k;function D(O,j,ge){return{range:{start:O,end:O},newText:j,annotationId:ge}}g.insert=D;function S(O,j){return{range:O,newText:"",annotationId:j}}g.del=S;function m(O){var j=O;return G.is(j)&&(Y.is(j.annotationId)||ce.is(j.annotationId))}g.is=m})(Ke=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var we;(function(g){function k(S,m){return{textDocument:S,edits:m}}g.create=k;function D(S){var m=S;return $.defined(m)&&Ne.is(m.textDocument)&&Array.isArray(m.edits)}g.is=D})(we=e.TextDocumentEdit||(e.TextDocumentEdit={}));var W;(function(g){function k(S,m,O){var j={kind:"create",uri:S};return m!==void 0&&(m.overwrite!==void 0||m.ignoreIfExists!==void 0)&&(j.options=m),O!==void 0&&(j.annotationId=O),j}g.create=k;function D(S){var m=S;return m&&m.kind==="create"&&$.string(m.uri)&&(m.options===void 0||(m.options.overwrite===void 0||$.boolean(m.options.overwrite))&&(m.options.ignoreIfExists===void 0||$.boolean(m.options.ignoreIfExists)))&&(m.annotationId===void 0||ce.is(m.annotationId))}g.is=D})(W=e.CreateFile||(e.CreateFile={}));var I;(function(g){function k(S,m,O,j){var ge={kind:"rename",oldUri:S,newUri:m};return O!==void 0&&(O.overwrite!==void 0||O.ignoreIfExists!==void 0)&&(ge.options=O),j!==void 0&&(ge.annotationId=j),ge}g.create=k;function D(S){var m=S;return m&&m.kind==="rename"&&$.string(m.oldUri)&&$.string(m.newUri)&&(m.options===void 0||(m.options.overwrite===void 0||$.boolean(m.options.overwrite))&&(m.options.ignoreIfExists===void 0||$.boolean(m.options.ignoreIfExists)))&&(m.annotationId===void 0||ce.is(m.annotationId))}g.is=D})(I=e.RenameFile||(e.RenameFile={}));var H;(function(g){function k(S,m,O){var j={kind:"delete",uri:S};return m!==void 0&&(m.recursive!==void 0||m.ignoreIfNotExists!==void 0)&&(j.options=m),O!==void 0&&(j.annotationId=O),j}g.create=k;function D(S){var m=S;return m&&m.kind==="delete"&&$.string(m.uri)&&(m.options===void 0||(m.options.recursive===void 0||$.boolean(m.options.recursive))&&(m.options.ignoreIfNotExists===void 0||$.boolean(m.options.ignoreIfNotExists)))&&(m.annotationId===void 0||ce.is(m.annotationId))}g.is=D})(H=e.DeleteFile||(e.DeleteFile={}));var X;(function(g){function k(D){var S=D;return S&&(S.changes!==void 0||S.documentChanges!==void 0)&&(S.documentChanges===void 0||S.documentChanges.every(function(m){return $.string(m.kind)?W.is(m)||I.is(m)||H.is(m):we.is(m)}))}g.is=k})(X=e.WorkspaceEdit||(e.WorkspaceEdit={}));var be=function(){function g(k,D){this.edits=k,this.changeAnnotations=D}return g.prototype.insert=function(k,D,S){var m,O;if(S===void 0?m=G.insert(k,D):ce.is(S)?(O=S,m=Ke.insert(k,D,S)):(this.assertChangeAnnotations(this.changeAnnotations),O=this.changeAnnotations.manage(S),m=Ke.insert(k,D,O)),this.edits.push(m),O!==void 0)return O},g.prototype.replace=function(k,D,S){var m,O;if(S===void 0?m=G.replace(k,D):ce.is(S)?(O=S,m=Ke.replace(k,D,S)):(this.assertChangeAnnotations(this.changeAnnotations),O=this.changeAnnotations.manage(S),m=Ke.replace(k,D,O)),this.edits.push(m),O!==void 0)return O},g.prototype.delete=function(k,D){var S,m;if(D===void 0?S=G.del(k):ce.is(D)?(m=D,S=Ke.del(k,D)):(this.assertChangeAnnotations(this.changeAnnotations),m=this.changeAnnotations.manage(D),S=Ke.del(k,m)),this.edits.push(S),m!==void 0)return m},g.prototype.add=function(k){this.edits.push(k)},g.prototype.all=function(){return this.edits},g.prototype.clear=function(){this.edits.splice(0,this.edits.length)},g.prototype.assertChangeAnnotations=function(k){if(k===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},g}(),he=function(){function g(k){this._annotations=k===void 0?Object.create(null):k,this._counter=0,this._size=0}return g.prototype.all=function(){return this._annotations},Object.defineProperty(g.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),g.prototype.manage=function(k,D){var S;if(ce.is(k)?S=k:(S=this.nextId(),D=k),this._annotations[S]!==void 0)throw new Error("Id ".concat(S," is already in use."));if(D===void 0)throw new Error("No annotation provided for id ".concat(S));return this._annotations[S]=D,this._size++,S},g.prototype.nextId=function(){return this._counter++,this._counter.toString()},g}(),le=function(){function g(k){var D=this;this._textEditChanges=Object.create(null),k!==void 0?(this._workspaceEdit=k,k.documentChanges?(this._changeAnnotations=new he(k.changeAnnotations),k.changeAnnotations=this._changeAnnotations.all(),k.documentChanges.forEach(function(S){if(we.is(S)){var m=new be(S.edits,D._changeAnnotations);D._textEditChanges[S.textDocument.uri]=m}})):k.changes&&Object.keys(k.changes).forEach(function(S){var m=new be(k.changes[S]);D._textEditChanges[S]=m})):this._workspaceEdit={}}return Object.defineProperty(g.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),g.prototype.getTextEditChange=function(k){if(Ne.is(k)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var D={uri:k.uri,version:k.version},S=this._textEditChanges[D.uri];if(!S){var m=[],O={textDocument:D,edits:m};this._workspaceEdit.documentChanges.push(O),S=new be(m,this._changeAnnotations),this._textEditChanges[D.uri]=S}return S}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var S=this._textEditChanges[k];if(!S){var m=[];this._workspaceEdit.changes[k]=m,S=new be(m),this._textEditChanges[k]=S}return S}},g.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new he,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},g.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},g.prototype.createFile=function(k,D,S){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var m;Y.is(D)||ce.is(D)?m=D:S=D;var O,j;if(m===void 0?O=W.create(k,S):(j=ce.is(m)?m:this._changeAnnotations.manage(m),O=W.create(k,S,j)),this._workspaceEdit.documentChanges.push(O),j!==void 0)return j},g.prototype.renameFile=function(k,D,S,m){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var O;Y.is(S)||ce.is(S)?O=S:m=S;var j,ge;if(O===void 0?j=I.create(k,D,m):(ge=ce.is(O)?O:this._changeAnnotations.manage(O),j=I.create(k,D,m,ge)),this._workspaceEdit.documentChanges.push(j),ge!==void 0)return ge},g.prototype.deleteFile=function(k,D,S){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var m;Y.is(D)||ce.is(D)?m=D:S=D;var O,j;if(m===void 0?O=H.create(k,S):(j=ce.is(m)?m:this._changeAnnotations.manage(m),O=H.create(k,S,j)),this._workspaceEdit.documentChanges.push(O),j!==void 0)return j},g}();e.WorkspaceChange=le;var st;(function(g){function k(S){return{uri:S}}g.create=k;function D(S){var m=S;return $.defined(m)&&$.string(m.uri)}g.is=D})(st=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var et;(function(g){function k(S,m){return{uri:S,version:m}}g.create=k;function D(S){var m=S;return $.defined(m)&&$.string(m.uri)&&$.integer(m.version)}g.is=D})(et=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var Ne;(function(g){function k(S,m){return{uri:S,version:m}}g.create=k;function D(S){var m=S;return $.defined(m)&&$.string(m.uri)&&(m.version===null||$.integer(m.version))}g.is=D})(Ne=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var Tt;(function(g){function k(S,m,O,j){return{uri:S,languageId:m,version:O,text:j}}g.create=k;function D(S){var m=S;return $.defined(m)&&$.string(m.uri)&&$.string(m.languageId)&&$.integer(m.version)&&$.string(m.text)}g.is=D})(Tt=e.TextDocumentItem||(e.TextDocumentItem={}));var Mr;(function(g){g.PlainText="plaintext",g.Markdown="markdown";function k(D){var S=D;return S===g.PlainText||S===g.Markdown}g.is=k})(Mr=e.MarkupKind||(e.MarkupKind={}));var Dn;(function(g){function k(D){var S=D;return $.objectLiteral(D)&&Mr.is(S.kind)&&$.string(S.value)}g.is=k})(Dn=e.MarkupContent||(e.MarkupContent={}));var ga;(function(g){g.Text=1,g.Method=2,g.Function=3,g.Constructor=4,g.Field=5,g.Variable=6,g.Class=7,g.Interface=8,g.Module=9,g.Property=10,g.Unit=11,g.Value=12,g.Enum=13,g.Keyword=14,g.Snippet=15,g.Color=16,g.File=17,g.Reference=18,g.Folder=19,g.EnumMember=20,g.Constant=21,g.Struct=22,g.Event=23,g.Operator=24,g.TypeParameter=25})(ga=e.CompletionItemKind||(e.CompletionItemKind={}));var Ii;(function(g){g.PlainText=1,g.Snippet=2})(Ii=e.InsertTextFormat||(e.InsertTextFormat={}));var xi;(function(g){g.Deprecated=1})(xi=e.CompletionItemTag||(e.CompletionItemTag={}));var nr;(function(g){function k(S,m,O){return{newText:S,insert:m,replace:O}}g.create=k;function D(S){var m=S;return m&&$.string(m.newText)&&s.is(m.insert)&&s.is(m.replace)}g.is=D})(nr=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var va;(function(g){g.asIs=1,g.adjustIndentation=2})(va=e.InsertTextMode||(e.InsertTextMode={}));var Ta;(function(g){function k(D){var S=D;return S&&($.string(S.detail)||S.detail===void 0)&&($.string(S.description)||S.description===void 0)}g.is=k})(Ta=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var _a;(function(g){function k(D){return{label:D}}g.create=k})(_a=e.CompletionItem||(e.CompletionItem={}));var uo;(function(g){function k(D,S){return{items:D||[],isIncomplete:!!S}}g.create=k})(uo=e.CompletionList||(e.CompletionList={}));var _t;(function(g){function k(S){return S.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}g.fromPlainText=k;function D(S){var m=S;return $.string(m)||$.objectLiteral(m)&&$.string(m.language)&&$.string(m.value)}g.is=D})(_t=e.MarkedString||(e.MarkedString={}));var Vt;(function(g){function k(D){var S=D;return!!S&&$.objectLiteral(S)&&(Dn.is(S.contents)||_t.is(S.contents)||$.typedArray(S.contents,_t.is))&&(D.range===void 0||s.is(D.range))}g.is=k})(Vt=e.Hover||(e.Hover={}));var lo;(function(g){function k(D,S){return S?{label:D,documentation:S}:{label:D}}g.create=k})(lo=e.ParameterInformation||(e.ParameterInformation={}));var ln;(function(g){function k(D,S){for(var m=[],O=2;O<arguments.length;O++)m[O-2]=arguments[O];var j={label:D};return $.defined(S)&&(j.documentation=S),$.defined(m)?j.parameters=m:j.parameters=[],j}g.create=k})(ln=e.SignatureInformation||(e.SignatureInformation={}));var cn;(function(g){g.Text=1,g.Read=2,g.Write=3})(cn=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var fn;(function(g){function k(D,S){var m={range:D};return $.number(S)&&(m.kind=S),m}g.create=k})(fn=e.DocumentHighlight||(e.DocumentHighlight={}));var $n;(function(g){g.File=1,g.Module=2,g.Namespace=3,g.Package=4,g.Class=5,g.Method=6,g.Property=7,g.Field=8,g.Constructor=9,g.Enum=10,g.Interface=11,g.Function=12,g.Variable=13,g.Constant=14,g.String=15,g.Number=16,g.Boolean=17,g.Array=18,g.Object=19,g.Key=20,g.Null=21,g.EnumMember=22,g.Struct=23,g.Event=24,g.Operator=25,g.TypeParameter=26})($n=e.SymbolKind||(e.SymbolKind={}));var Fr;(function(g){g.Deprecated=1})(Fr=e.SymbolTag||(e.SymbolTag={}));var zt;(function(g){function k(D,S,m,O,j){var ge={name:D,kind:S,location:{uri:O,range:m}};return j&&(ge.containerName=j),ge}g.create=k})(zt=e.SymbolInformation||(e.SymbolInformation={}));var dn;(function(g){function k(D,S,m,O){return O!==void 0?{name:D,kind:S,location:{uri:m,range:O}}:{name:D,kind:S,location:{uri:m}}}g.create=k})(dn=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var Ra;(function(g){function k(S,m,O,j,ge,Ct){var tt={name:S,detail:m,kind:O,range:j,selectionRange:ge};return Ct!==void 0&&(tt.children=Ct),tt}g.create=k;function D(S){var m=S;return m&&$.string(m.name)&&$.number(m.kind)&&s.is(m.range)&&s.is(m.selectionRange)&&(m.detail===void 0||$.string(m.detail))&&(m.deprecated===void 0||$.boolean(m.deprecated))&&(m.children===void 0||Array.isArray(m.children))&&(m.tags===void 0||Array.isArray(m.tags))}g.is=D})(Ra=e.DocumentSymbol||(e.DocumentSymbol={}));var br;(function(g){g.Empty="",g.QuickFix="quickfix",g.Refactor="refactor",g.RefactorExtract="refactor.extract",g.RefactorInline="refactor.inline",g.RefactorRewrite="refactor.rewrite",g.Source="source",g.SourceOrganizeImports="source.organizeImports",g.SourceFixAll="source.fixAll"})(br=e.CodeActionKind||(e.CodeActionKind={}));var fr;(function(g){g.Invoked=1,g.Automatic=2})(fr=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var kt;(function(g){function k(S,m,O){var j={diagnostics:S};return m!=null&&(j.only=m),O!=null&&(j.triggerKind=O),j}g.create=k;function D(S){var m=S;return $.defined(m)&&$.typedArray(m.diagnostics,b.is)&&(m.only===void 0||$.typedArray(m.only,$.string))&&(m.triggerKind===void 0||m.triggerKind===fr.Invoked||m.triggerKind===fr.Automatic)}g.is=D})(kt=e.CodeActionContext||(e.CodeActionContext={}));var jr;(function(g){function k(S,m,O){var j={title:S},ge=!0;return typeof m=="string"?(ge=!1,j.kind=m):x.is(m)?j.command=m:j.edit=m,ge&&O!==void 0&&(j.kind=O),j}g.create=k;function D(S){var m=S;return m&&$.string(m.title)&&(m.diagnostics===void 0||$.typedArray(m.diagnostics,b.is))&&(m.kind===void 0||$.string(m.kind))&&(m.edit!==void 0||m.command!==void 0)&&(m.command===void 0||x.is(m.command))&&(m.isPreferred===void 0||$.boolean(m.isPreferred))&&(m.edit===void 0||X.is(m.edit))}g.is=D})(jr=e.CodeAction||(e.CodeAction={}));var Sr;(function(g){function k(S,m){var O={range:S};return $.defined(m)&&(O.data=m),O}g.create=k;function D(S){var m=S;return $.defined(m)&&s.is(m.range)&&($.undefined(m.command)||x.is(m.command))}g.is=D})(Sr=e.CodeLens||(e.CodeLens={}));var Qr;(function(g){function k(S,m){return{tabSize:S,insertSpaces:m}}g.create=k;function D(S){var m=S;return $.defined(m)&&$.uinteger(m.tabSize)&&$.boolean(m.insertSpaces)}g.is=D})(Qr=e.FormattingOptions||(e.FormattingOptions={}));var E;(function(g){function k(S,m,O){return{range:S,target:m,data:O}}g.create=k;function D(S){var m=S;return $.defined(m)&&s.is(m.range)&&($.undefined(m.target)||$.string(m.target))}g.is=D})(E=e.DocumentLink||(e.DocumentLink={}));var v;(function(g){function k(S,m){return{range:S,parent:m}}g.create=k;function D(S){var m=S;return $.objectLiteral(m)&&s.is(m.range)&&(m.parent===void 0||g.is(m.parent))}g.is=D})(v=e.SelectionRange||(e.SelectionRange={}));var N;(function(g){g.namespace="namespace",g.type="type",g.class="class",g.enum="enum",g.interface="interface",g.struct="struct",g.typeParameter="typeParameter",g.parameter="parameter",g.variable="variable",g.property="property",g.enumMember="enumMember",g.event="event",g.function="function",g.method="method",g.macro="macro",g.keyword="keyword",g.modifier="modifier",g.comment="comment",g.string="string",g.number="number",g.regexp="regexp",g.operator="operator",g.decorator="decorator"})(N=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var L;(function(g){g.declaration="declaration",g.definition="definition",g.readonly="readonly",g.static="static",g.deprecated="deprecated",g.abstract="abstract",g.async="async",g.modification="modification",g.documentation="documentation",g.defaultLibrary="defaultLibrary"})(L=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var U;(function(g){function k(D){var S=D;return $.objectLiteral(S)&&(S.resultId===void 0||typeof S.resultId=="string")&&Array.isArray(S.data)&&(S.data.length===0||typeof S.data[0]=="number")}g.is=k})(U=e.SemanticTokens||(e.SemanticTokens={}));var ae;(function(g){function k(S,m){return{range:S,text:m}}g.create=k;function D(S){var m=S;return m!=null&&s.is(m.range)&&$.string(m.text)}g.is=D})(ae=e.InlineValueText||(e.InlineValueText={}));var oe;(function(g){function k(S,m,O){return{range:S,variableName:m,caseSensitiveLookup:O}}g.create=k;function D(S){var m=S;return m!=null&&s.is(m.range)&&$.boolean(m.caseSensitiveLookup)&&($.string(m.variableName)||m.variableName===void 0)}g.is=D})(oe=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var ye;(function(g){function k(S,m){return{range:S,expression:m}}g.create=k;function D(S){var m=S;return m!=null&&s.is(m.range)&&($.string(m.expression)||m.expression===void 0)}g.is=D})(ye=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ne;(function(g){function k(S,m){return{frameId:S,stoppedLocation:m}}g.create=k;function D(S){var m=S;return $.defined(m)&&s.is(S.stoppedLocation)}g.is=D})(ne=e.InlineValueContext||(e.InlineValueContext={}));var J;(function(g){g.Type=1,g.Parameter=2;function k(D){return D===1||D===2}g.is=k})(J=e.InlayHintKind||(e.InlayHintKind={}));var ie;(function(g){function k(S){return{value:S}}g.create=k;function D(S){var m=S;return $.objectLiteral(m)&&(m.tooltip===void 0||$.string(m.tooltip)||Dn.is(m.tooltip))&&(m.location===void 0||u.is(m.location))&&(m.command===void 0||x.is(m.command))}g.is=D})(ie=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var se;(function(g){function k(S,m,O){var j={position:S,label:m};return O!==void 0&&(j.kind=O),j}g.create=k;function D(S){var m=S;return $.objectLiteral(m)&&o.is(m.position)&&($.string(m.label)||$.typedArray(m.label,ie.is))&&(m.kind===void 0||J.is(m.kind))&&m.textEdits===void 0||$.typedArray(m.textEdits,G.is)&&(m.tooltip===void 0||$.string(m.tooltip)||Dn.is(m.tooltip))&&(m.paddingLeft===void 0||$.boolean(m.paddingLeft))&&(m.paddingRight===void 0||$.boolean(m.paddingRight))}g.is=D})(se=e.InlayHint||(e.InlayHint={}));var Se;(function(g){function k(D){var S=D;return $.objectLiteral(S)&&n.is(S.uri)&&$.string(S.name)}g.is=k})(Se=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var ut;(function(g){function k(O,j,ge,Ct){return new wt(O,j,ge,Ct)}g.create=k;function D(O){var j=O;return!!($.defined(j)&&$.string(j.uri)&&($.undefined(j.languageId)||$.string(j.languageId))&&$.uinteger(j.lineCount)&&$.func(j.getText)&&$.func(j.positionAt)&&$.func(j.offsetAt))}g.is=D;function S(O,j){for(var ge=O.getText(),Ct=m(j,function(ns,Uc){var zS=ns.range.start.line-Uc.range.start.line;return zS===0?ns.range.start.character-Uc.range.start.character:zS}),tt=ge.length,On=Ct.length-1;On>=0;On--){var In=Ct[On],Li=O.offsetAt(In.range.start),ke=O.offsetAt(In.range.end);if(ke<=tt)ge=ge.substring(0,Li)+In.newText+ge.substring(ke,ge.length);else throw new Error("Overlapping edit");tt=Li}return ge}g.applyEdits=S;function m(O,j){if(O.length<=1)return O;var ge=O.length/2|0,Ct=O.slice(0,ge),tt=O.slice(ge);m(Ct,j),m(tt,j);for(var On=0,In=0,Li=0;On<Ct.length&&In<tt.length;){var ke=j(Ct[On],tt[In]);ke<=0?O[Li++]=Ct[On++]:O[Li++]=tt[In++]}for(;On<Ct.length;)O[Li++]=Ct[On++];for(;In<tt.length;)O[Li++]=tt[In++];return O}})(ut=e.TextDocument||(e.TextDocument={}));var wt=function(){function g(k,D,S,m){this._uri=k,this._languageId=D,this._version=S,this._content=m,this._lineOffsets=void 0}return Object.defineProperty(g.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),g.prototype.getText=function(k){if(k){var D=this.offsetAt(k.start),S=this.offsetAt(k.end);return this._content.substring(D,S)}return this._content},g.prototype.update=function(k,D){this._content=k.text,this._version=D,this._lineOffsets=void 0},g.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var k=[],D=this._content,S=!0,m=0;m<D.length;m++){S&&(k.push(m),S=!1);var O=D.charAt(m);S=O==="\r"||O===`
`,O==="\r"&&m+1<D.length&&D.charAt(m+1)===`
`&&m++}S&&D.length>0&&k.push(D.length),this._lineOffsets=k}return this._lineOffsets},g.prototype.positionAt=function(k){k=Math.max(Math.min(k,this._content.length),0);var D=this.getLineOffsets(),S=0,m=D.length;if(m===0)return o.create(0,k);for(;S<m;){var O=Math.floor((S+m)/2);D[O]>k?m=O:S=O+1}var j=S-1;return o.create(j,k-D[j])},g.prototype.offsetAt=function(k){var D=this.getLineOffsets();if(k.line>=D.length)return this._content.length;if(k.line<0)return 0;var S=D[k.line],m=k.line+1<D.length?D[k.line+1]:this._content.length;return Math.max(Math.min(S+k.character,m),S)},Object.defineProperty(g.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),g}(),$;(function(g){var k=Object.prototype.toString;function D(ke){return typeof ke<"u"}g.defined=D;function S(ke){return typeof ke>"u"}g.undefined=S;function m(ke){return ke===!0||ke===!1}g.boolean=m;function O(ke){return k.call(ke)==="[object String]"}g.string=O;function j(ke){return k.call(ke)==="[object Number]"}g.number=j;function ge(ke,ns,Uc){return k.call(ke)==="[object Number]"&&ns<=ke&&ke<=Uc}g.numberRange=ge;function Ct(ke){return k.call(ke)==="[object Number]"&&-2147483648<=ke&&ke<=2147483647}g.integer=Ct;function tt(ke){return k.call(ke)==="[object Number]"&&0<=ke&&ke<=2147483647}g.uinteger=tt;function On(ke){return k.call(ke)==="[object Function]"}g.func=On;function In(ke){return ke!==null&&typeof ke=="object"}g.objectLiteral=In;function Li(ke,ns){return Array.isArray(ke)&&ke.every(ns)}g.typedArray=Li})($||($={}))})});var Rt=d(Ar=>{"use strict";Object.defineProperty(Ar,"__esModule",{value:!0});Ar.ProtocolNotificationType=Ar.ProtocolNotificationType0=Ar.ProtocolRequestType=Ar.ProtocolRequestType0=Ar.RegistrationType=Ar.MessageDirection=void 0;var ls=ho(),wG;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(wG=Ar.MessageDirection||(Ar.MessageDirection={}));var Ey=class{constructor(e){this.method=e}};Ar.RegistrationType=Ey;var Py=class extends ls.RequestType0{constructor(e){super(e)}};Ar.ProtocolRequestType0=Py;var ky=class extends ls.RequestType{constructor(e){super(e,ls.ParameterStructures.byName)}};Ar.ProtocolRequestType=ky;var wy=class extends ls.NotificationType0{constructor(e){super(e)}};Ar.ProtocolNotificationType0=wy;var Ny=class extends ls.NotificationType{constructor(e){super(e,ls.ParameterStructures.byName)}};Ar.ProtocolNotificationType=Ny});var Zc=d(Ot=>{"use strict";Object.defineProperty(Ot,"__esModule",{value:!0});Ot.objectLiteral=Ot.typedArray=Ot.stringArray=Ot.array=Ot.func=Ot.error=Ot.number=Ot.string=Ot.boolean=void 0;function NG(t){return t===!0||t===!1}Ot.boolean=NG;function R0(t){return typeof t=="string"||t instanceof String}Ot.string=R0;function DG(t){return typeof t=="number"||t instanceof Number}Ot.number=DG;function $G(t){return t instanceof Error}Ot.error=$G;function OG(t){return typeof t=="function"}Ot.func=OG;function b0(t){return Array.isArray(t)}Ot.array=b0;function IG(t){return b0(t)&&t.every(e=>R0(e))}Ot.stringArray=IG;function xG(t,e){return Array.isArray(t)&&t.every(e)}Ot.typedArray=xG;function LG(t){return t!==null&&typeof t=="object"}Ot.objectLiteral=LG});var C0=d(nl=>{"use strict";Object.defineProperty(nl,"__esModule",{value:!0});nl.ImplementationRequest=void 0;var S0=Rt(),qG;(function(t){t.method="textDocument/implementation",t.messageDirection=S0.MessageDirection.clientToServer,t.type=new S0.ProtocolRequestType(t.method)})(qG=nl.ImplementationRequest||(nl.ImplementationRequest={}))});var E0=d(il=>{"use strict";Object.defineProperty(il,"__esModule",{value:!0});il.TypeDefinitionRequest=void 0;var A0=Rt(),MG;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=A0.MessageDirection.clientToServer,t.type=new A0.ProtocolRequestType(t.method)})(MG=il.TypeDefinitionRequest||(il.TypeDefinitionRequest={}))});var P0=d(ba=>{"use strict";Object.defineProperty(ba,"__esModule",{value:!0});ba.DidChangeWorkspaceFoldersNotification=ba.WorkspaceFoldersRequest=void 0;var ef=Rt(),FG;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=ef.MessageDirection.serverToClient,t.type=new ef.ProtocolRequestType0(t.method)})(FG=ba.WorkspaceFoldersRequest||(ba.WorkspaceFoldersRequest={}));var jG;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=ef.MessageDirection.clientToServer,t.type=new ef.ProtocolNotificationType(t.method)})(jG=ba.DidChangeWorkspaceFoldersNotification||(ba.DidChangeWorkspaceFoldersNotification={}))});var w0=d(al=>{"use strict";Object.defineProperty(al,"__esModule",{value:!0});al.ConfigurationRequest=void 0;var k0=Rt(),GG;(function(t){t.method="workspace/configuration",t.messageDirection=k0.MessageDirection.serverToClient,t.type=new k0.ProtocolRequestType(t.method)})(GG=al.ConfigurationRequest||(al.ConfigurationRequest={}))});var N0=d(Sa=>{"use strict";Object.defineProperty(Sa,"__esModule",{value:!0});Sa.ColorPresentationRequest=Sa.DocumentColorRequest=void 0;var tf=Rt(),UG;(function(t){t.method="textDocument/documentColor",t.messageDirection=tf.MessageDirection.clientToServer,t.type=new tf.ProtocolRequestType(t.method)})(UG=Sa.DocumentColorRequest||(Sa.DocumentColorRequest={}));var HG;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=tf.MessageDirection.clientToServer,t.type=new tf.ProtocolRequestType(t.method)})(HG=Sa.ColorPresentationRequest||(Sa.ColorPresentationRequest={}))});var $0=d(ol=>{"use strict";Object.defineProperty(ol,"__esModule",{value:!0});ol.FoldingRangeRequest=void 0;var D0=Rt(),KG;(function(t){t.method="textDocument/foldingRange",t.messageDirection=D0.MessageDirection.clientToServer,t.type=new D0.ProtocolRequestType(t.method)})(KG=ol.FoldingRangeRequest||(ol.FoldingRangeRequest={}))});var I0=d(sl=>{"use strict";Object.defineProperty(sl,"__esModule",{value:!0});sl.DeclarationRequest=void 0;var O0=Rt(),WG;(function(t){t.method="textDocument/declaration",t.messageDirection=O0.MessageDirection.clientToServer,t.type=new O0.ProtocolRequestType(t.method)})(WG=sl.DeclarationRequest||(sl.DeclarationRequest={}))});var L0=d(ul=>{"use strict";Object.defineProperty(ul,"__esModule",{value:!0});ul.SelectionRangeRequest=void 0;var x0=Rt(),BG;(function(t){t.method="textDocument/selectionRange",t.messageDirection=x0.MessageDirection.clientToServer,t.type=new x0.ProtocolRequestType(t.method)})(BG=ul.SelectionRangeRequest||(ul.SelectionRangeRequest={}))});var q0=d(qn=>{"use strict";Object.defineProperty(qn,"__esModule",{value:!0});qn.WorkDoneProgressCancelNotification=qn.WorkDoneProgressCreateRequest=qn.WorkDoneProgress=void 0;var VG=ho(),rf=Rt(),zG;(function(t){t.type=new VG.ProgressType;function e(r){return r===t.type}t.is=e})(zG=qn.WorkDoneProgress||(qn.WorkDoneProgress={}));var YG;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=rf.MessageDirection.serverToClient,t.type=new rf.ProtocolRequestType(t.method)})(YG=qn.WorkDoneProgressCreateRequest||(qn.WorkDoneProgressCreateRequest={}));var XG;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=rf.MessageDirection.clientToServer,t.type=new rf.ProtocolNotificationType(t.method)})(XG=qn.WorkDoneProgressCancelNotification||(qn.WorkDoneProgressCancelNotification={}))});var M0=d(Mn=>{"use strict";Object.defineProperty(Mn,"__esModule",{value:!0});Mn.CallHierarchyOutgoingCallsRequest=Mn.CallHierarchyIncomingCallsRequest=Mn.CallHierarchyPrepareRequest=void 0;var cs=Rt(),JG;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=cs.MessageDirection.clientToServer,t.type=new cs.ProtocolRequestType(t.method)})(JG=Mn.CallHierarchyPrepareRequest||(Mn.CallHierarchyPrepareRequest={}));var QG;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=cs.MessageDirection.clientToServer,t.type=new cs.ProtocolRequestType(t.method)})(QG=Mn.CallHierarchyIncomingCallsRequest||(Mn.CallHierarchyIncomingCallsRequest={}));var ZG;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=cs.MessageDirection.clientToServer,t.type=new cs.ProtocolRequestType(t.method)})(ZG=Mn.CallHierarchyOutgoingCallsRequest||(Mn.CallHierarchyOutgoingCallsRequest={}))});var F0=d(It=>{"use strict";Object.defineProperty(It,"__esModule",{value:!0});It.SemanticTokensRefreshRequest=It.SemanticTokensRangeRequest=It.SemanticTokensDeltaRequest=It.SemanticTokensRequest=It.SemanticTokensRegistrationType=It.TokenFormat=void 0;var Gi=Rt(),eU;(function(t){t.Relative="relative"})(eU=It.TokenFormat||(It.TokenFormat={}));var nf;(function(t){t.method="textDocument/semanticTokens",t.type=new Gi.RegistrationType(t.method)})(nf=It.SemanticTokensRegistrationType||(It.SemanticTokensRegistrationType={}));var tU;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=Gi.MessageDirection.clientToServer,t.type=new Gi.ProtocolRequestType(t.method),t.registrationMethod=nf.method})(tU=It.SemanticTokensRequest||(It.SemanticTokensRequest={}));var rU;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=Gi.MessageDirection.clientToServer,t.type=new Gi.ProtocolRequestType(t.method),t.registrationMethod=nf.method})(rU=It.SemanticTokensDeltaRequest||(It.SemanticTokensDeltaRequest={}));var nU;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=Gi.MessageDirection.clientToServer,t.type=new Gi.ProtocolRequestType(t.method),t.registrationMethod=nf.method})(nU=It.SemanticTokensRangeRequest||(It.SemanticTokensRangeRequest={}));var iU;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=Gi.MessageDirection.clientToServer,t.type=new Gi.ProtocolRequestType0(t.method)})(iU=It.SemanticTokensRefreshRequest||(It.SemanticTokensRefreshRequest={}))});var G0=d(ll=>{"use strict";Object.defineProperty(ll,"__esModule",{value:!0});ll.ShowDocumentRequest=void 0;var j0=Rt(),aU;(function(t){t.method="window/showDocument",t.messageDirection=j0.MessageDirection.serverToClient,t.type=new j0.ProtocolRequestType(t.method)})(aU=ll.ShowDocumentRequest||(ll.ShowDocumentRequest={}))});var H0=d(cl=>{"use strict";Object.defineProperty(cl,"__esModule",{value:!0});cl.LinkedEditingRangeRequest=void 0;var U0=Rt(),oU;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=U0.MessageDirection.clientToServer,t.type=new U0.ProtocolRequestType(t.method)})(oU=cl.LinkedEditingRangeRequest||(cl.LinkedEditingRangeRequest={}))});var K0=d(bt=>{"use strict";Object.defineProperty(bt,"__esModule",{value:!0});bt.WillDeleteFilesRequest=bt.DidDeleteFilesNotification=bt.DidRenameFilesNotification=bt.WillRenameFilesRequest=bt.DidCreateFilesNotification=bt.WillCreateFilesRequest=bt.FileOperationPatternKind=void 0;var pn=Rt(),sU;(function(t){t.file="file",t.folder="folder"})(sU=bt.FileOperationPatternKind||(bt.FileOperationPatternKind={}));var uU;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=pn.MessageDirection.clientToServer,t.type=new pn.ProtocolRequestType(t.method)})(uU=bt.WillCreateFilesRequest||(bt.WillCreateFilesRequest={}));var lU;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=pn.MessageDirection.clientToServer,t.type=new pn.ProtocolNotificationType(t.method)})(lU=bt.DidCreateFilesNotification||(bt.DidCreateFilesNotification={}));var cU;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=pn.MessageDirection.clientToServer,t.type=new pn.ProtocolRequestType(t.method)})(cU=bt.WillRenameFilesRequest||(bt.WillRenameFilesRequest={}));var fU;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=pn.MessageDirection.clientToServer,t.type=new pn.ProtocolNotificationType(t.method)})(fU=bt.DidRenameFilesNotification||(bt.DidRenameFilesNotification={}));var dU;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=pn.MessageDirection.clientToServer,t.type=new pn.ProtocolNotificationType(t.method)})(dU=bt.DidDeleteFilesNotification||(bt.DidDeleteFilesNotification={}));var pU;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=pn.MessageDirection.clientToServer,t.type=new pn.ProtocolRequestType(t.method)})(pU=bt.WillDeleteFilesRequest||(bt.WillDeleteFilesRequest={}))});var B0=d(Fn=>{"use strict";Object.defineProperty(Fn,"__esModule",{value:!0});Fn.MonikerRequest=Fn.MonikerKind=Fn.UniquenessLevel=void 0;var W0=Rt(),mU;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(mU=Fn.UniquenessLevel||(Fn.UniquenessLevel={}));var hU;(function(t){t.$import="import",t.$export="export",t.local="local"})(hU=Fn.MonikerKind||(Fn.MonikerKind={}));var yU;(function(t){t.method="textDocument/moniker",t.messageDirection=W0.MessageDirection.clientToServer,t.type=new W0.ProtocolRequestType(t.method)})(yU=Fn.MonikerRequest||(Fn.MonikerRequest={}))});var V0=d(jn=>{"use strict";Object.defineProperty(jn,"__esModule",{value:!0});jn.TypeHierarchySubtypesRequest=jn.TypeHierarchySupertypesRequest=jn.TypeHierarchyPrepareRequest=void 0;var fs=Rt(),gU;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=fs.MessageDirection.clientToServer,t.type=new fs.ProtocolRequestType(t.method)})(gU=jn.TypeHierarchyPrepareRequest||(jn.TypeHierarchyPrepareRequest={}));var vU;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=fs.MessageDirection.clientToServer,t.type=new fs.ProtocolRequestType(t.method)})(vU=jn.TypeHierarchySupertypesRequest||(jn.TypeHierarchySupertypesRequest={}));var TU;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=fs.MessageDirection.clientToServer,t.type=new fs.ProtocolRequestType(t.method)})(TU=jn.TypeHierarchySubtypesRequest||(jn.TypeHierarchySubtypesRequest={}))});var z0=d(Ca=>{"use strict";Object.defineProperty(Ca,"__esModule",{value:!0});Ca.InlineValueRefreshRequest=Ca.InlineValueRequest=void 0;var af=Rt(),_U;(function(t){t.method="textDocument/inlineValue",t.messageDirection=af.MessageDirection.clientToServer,t.type=new af.ProtocolRequestType(t.method)})(_U=Ca.InlineValueRequest||(Ca.InlineValueRequest={}));var RU;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=af.MessageDirection.clientToServer,t.type=new af.ProtocolRequestType0(t.method)})(RU=Ca.InlineValueRefreshRequest||(Ca.InlineValueRefreshRequest={}))});var Y0=d(Gn=>{"use strict";Object.defineProperty(Gn,"__esModule",{value:!0});Gn.InlayHintRefreshRequest=Gn.InlayHintResolveRequest=Gn.InlayHintRequest=void 0;var ds=Rt(),bU;(function(t){t.method="textDocument/inlayHint",t.messageDirection=ds.MessageDirection.clientToServer,t.type=new ds.ProtocolRequestType(t.method)})(bU=Gn.InlayHintRequest||(Gn.InlayHintRequest={}));var SU;(function(t){t.method="inlayHint/resolve",t.messageDirection=ds.MessageDirection.clientToServer,t.type=new ds.ProtocolRequestType(t.method)})(SU=Gn.InlayHintResolveRequest||(Gn.InlayHintResolveRequest={}));var CU;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=ds.MessageDirection.clientToServer,t.type=new ds.ProtocolRequestType0(t.method)})(CU=Gn.InlayHintRefreshRequest||(Gn.InlayHintRefreshRequest={}))});var J0=d(ir=>{"use strict";Object.defineProperty(ir,"__esModule",{value:!0});ir.DiagnosticRefreshRequest=ir.WorkspaceDiagnosticRequest=ir.DocumentDiagnosticRequest=ir.DocumentDiagnosticReportKind=ir.DiagnosticServerCancellationData=void 0;var X0=ho(),AU=Zc(),ps=Rt(),EU;(function(t){function e(r){let n=r;return n&&AU.boolean(n.retriggerRequest)}t.is=e})(EU=ir.DiagnosticServerCancellationData||(ir.DiagnosticServerCancellationData={}));var PU;(function(t){t.Full="full",t.Unchanged="unchanged"})(PU=ir.DocumentDiagnosticReportKind||(ir.DocumentDiagnosticReportKind={}));var kU;(function(t){t.method="textDocument/diagnostic",t.messageDirection=ps.MessageDirection.clientToServer,t.type=new ps.ProtocolRequestType(t.method),t.partialResult=new X0.ProgressType})(kU=ir.DocumentDiagnosticRequest||(ir.DocumentDiagnosticRequest={}));var wU;(function(t){t.method="workspace/diagnostic",t.messageDirection=ps.MessageDirection.clientToServer,t.type=new ps.ProtocolRequestType(t.method),t.partialResult=new X0.ProgressType})(wU=ir.WorkspaceDiagnosticRequest||(ir.WorkspaceDiagnosticRequest={}));var NU;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=ps.MessageDirection.clientToServer,t.type=new ps.ProtocolRequestType0(t.method)})(NU=ir.DiagnosticRefreshRequest||(ir.DiagnosticRefreshRequest={}))});var eC=d(Oe=>{"use strict";Object.defineProperty(Oe,"__esModule",{value:!0});Oe.DidCloseNotebookDocumentNotification=Oe.DidSaveNotebookDocumentNotification=Oe.DidChangeNotebookDocumentNotification=Oe.NotebookCellArrayChange=Oe.DidOpenNotebookDocumentNotification=Oe.NotebookDocumentSyncRegistrationType=Oe.NotebookDocument=Oe.NotebookCell=Oe.ExecutionSummary=Oe.NotebookCellKind=void 0;var fl=yo(),Un=Zc(),ii=Rt(),Q0;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(Q0=Oe.NotebookCellKind||(Oe.NotebookCellKind={}));var Z0;(function(t){function e(i,a){let o={executionOrder:i};return(a===!0||a===!1)&&(o.success=a),o}t.create=e;function r(i){let a=i;return Un.objectLiteral(a)&&fl.uinteger.is(a.executionOrder)&&(a.success===void 0||Un.boolean(a.success))}t.is=r;function n(i,a){return i===a?!0:i==null||a===null||a===void 0?!1:i.executionOrder===a.executionOrder&&i.success===a.success}t.equals=n})(Z0=Oe.ExecutionSummary||(Oe.ExecutionSummary={}));var Dy;(function(t){function e(a,o){return{kind:a,document:o}}t.create=e;function r(a){let o=a;return Un.objectLiteral(o)&&Q0.is(o.kind)&&fl.DocumentUri.is(o.document)&&(o.metadata===void 0||Un.objectLiteral(o.metadata))}t.is=r;function n(a,o){let s=new Set;return a.document!==o.document&&s.add("document"),a.kind!==o.kind&&s.add("kind"),a.executionSummary!==o.executionSummary&&s.add("executionSummary"),(a.metadata!==void 0||o.metadata!==void 0)&&!i(a.metadata,o.metadata)&&s.add("metadata"),(a.executionSummary!==void 0||o.executionSummary!==void 0)&&!Z0.equals(a.executionSummary,o.executionSummary)&&s.add("executionSummary"),s}t.diff=n;function i(a,o){if(a===o)return!0;if(a==null||o===null||o===void 0||typeof a!=typeof o||typeof a!="object")return!1;let s=Array.isArray(a),u=Array.isArray(o);if(s!==u)return!1;if(s&&u){if(a.length!==o.length)return!1;for(let l=0;l<a.length;l++)if(!i(a[l],o[l]))return!1}if(Un.objectLiteral(a)&&Un.objectLiteral(o)){let l=Object.keys(a),c=Object.keys(o);if(l.length!==c.length||(l.sort(),c.sort(),!i(l,c)))return!1;for(let p=0;p<l.length;p++){let h=l[p];if(!i(a[h],o[h]))return!1}}return!0}})(Dy=Oe.NotebookCell||(Oe.NotebookCell={}));var DU;(function(t){function e(n,i,a,o){return{uri:n,notebookType:i,version:a,cells:o}}t.create=e;function r(n){let i=n;return Un.objectLiteral(i)&&Un.string(i.uri)&&fl.integer.is(i.version)&&Un.typedArray(i.cells,Dy.is)}t.is=r})(DU=Oe.NotebookDocument||(Oe.NotebookDocument={}));var dl;(function(t){t.method="notebookDocument/sync",t.messageDirection=ii.MessageDirection.clientToServer,t.type=new ii.RegistrationType(t.method)})(dl=Oe.NotebookDocumentSyncRegistrationType||(Oe.NotebookDocumentSyncRegistrationType={}));var $U;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=ii.MessageDirection.clientToServer,t.type=new ii.ProtocolNotificationType(t.method),t.registrationMethod=dl.method})($U=Oe.DidOpenNotebookDocumentNotification||(Oe.DidOpenNotebookDocumentNotification={}));var OU;(function(t){function e(n){let i=n;return Un.objectLiteral(i)&&fl.uinteger.is(i.start)&&fl.uinteger.is(i.deleteCount)&&(i.cells===void 0||Un.typedArray(i.cells,Dy.is))}t.is=e;function r(n,i,a){let o={start:n,deleteCount:i};return a!==void 0&&(o.cells=a),o}t.create=r})(OU=Oe.NotebookCellArrayChange||(Oe.NotebookCellArrayChange={}));var IU;(function(t){t.method="notebookDocument/didChange",t.messageDirection=ii.MessageDirection.clientToServer,t.type=new ii.ProtocolNotificationType(t.method),t.registrationMethod=dl.method})(IU=Oe.DidChangeNotebookDocumentNotification||(Oe.DidChangeNotebookDocumentNotification={}));var xU;(function(t){t.method="notebookDocument/didSave",t.messageDirection=ii.MessageDirection.clientToServer,t.type=new ii.ProtocolNotificationType(t.method),t.registrationMethod=dl.method})(xU=Oe.DidSaveNotebookDocumentNotification||(Oe.DidSaveNotebookDocumentNotification={}));var LU;(function(t){t.method="notebookDocument/didClose",t.messageDirection=ii.MessageDirection.clientToServer,t.type=new ii.ProtocolNotificationType(t.method),t.registrationMethod=dl.method})(LU=Oe.DidCloseNotebookDocumentNotification||(Oe.DidCloseNotebookDocumentNotification={}))});var lC=d(T=>{"use strict";Object.defineProperty(T,"__esModule",{value:!0});T.WorkspaceSymbolRequest=T.CodeActionResolveRequest=T.CodeActionRequest=T.DocumentSymbolRequest=T.DocumentHighlightRequest=T.ReferencesRequest=T.DefinitionRequest=T.SignatureHelpRequest=T.SignatureHelpTriggerKind=T.HoverRequest=T.CompletionResolveRequest=T.CompletionRequest=T.CompletionTriggerKind=T.PublishDiagnosticsNotification=T.WatchKind=T.RelativePattern=T.FileChangeType=T.DidChangeWatchedFilesNotification=T.WillSaveTextDocumentWaitUntilRequest=T.WillSaveTextDocumentNotification=T.TextDocumentSaveReason=T.DidSaveTextDocumentNotification=T.DidCloseTextDocumentNotification=T.DidChangeTextDocumentNotification=T.TextDocumentContentChangeEvent=T.DidOpenTextDocumentNotification=T.TextDocumentSyncKind=T.TelemetryEventNotification=T.LogMessageNotification=T.ShowMessageRequest=T.ShowMessageNotification=T.MessageType=T.DidChangeConfigurationNotification=T.ExitNotification=T.ShutdownRequest=T.InitializedNotification=T.InitializeErrorCodes=T.InitializeRequest=T.WorkDoneProgressOptions=T.TextDocumentRegistrationOptions=T.StaticRegistrationOptions=T.PositionEncodingKind=T.FailureHandlingKind=T.ResourceOperationKind=T.UnregistrationRequest=T.RegistrationRequest=T.DocumentSelector=T.NotebookCellTextDocumentFilter=T.NotebookDocumentFilter=T.TextDocumentFilter=void 0;T.TypeHierarchySubtypesRequest=T.TypeHierarchyPrepareRequest=T.MonikerRequest=T.MonikerKind=T.UniquenessLevel=T.WillDeleteFilesRequest=T.DidDeleteFilesNotification=T.WillRenameFilesRequest=T.DidRenameFilesNotification=T.WillCreateFilesRequest=T.DidCreateFilesNotification=T.FileOperationPatternKind=T.LinkedEditingRangeRequest=T.ShowDocumentRequest=T.SemanticTokensRegistrationType=T.SemanticTokensRefreshRequest=T.SemanticTokensRangeRequest=T.SemanticTokensDeltaRequest=T.SemanticTokensRequest=T.TokenFormat=T.CallHierarchyPrepareRequest=T.CallHierarchyOutgoingCallsRequest=T.CallHierarchyIncomingCallsRequest=T.WorkDoneProgressCancelNotification=T.WorkDoneProgressCreateRequest=T.WorkDoneProgress=T.SelectionRangeRequest=T.DeclarationRequest=T.FoldingRangeRequest=T.ColorPresentationRequest=T.DocumentColorRequest=T.ConfigurationRequest=T.DidChangeWorkspaceFoldersNotification=T.WorkspaceFoldersRequest=T.TypeDefinitionRequest=T.ImplementationRequest=T.ApplyWorkspaceEditRequest=T.ExecuteCommandRequest=T.PrepareRenameRequest=T.RenameRequest=T.PrepareSupportDefaultBehavior=T.DocumentOnTypeFormattingRequest=T.DocumentRangeFormattingRequest=T.DocumentFormattingRequest=T.DocumentLinkResolveRequest=T.DocumentLinkRequest=T.CodeLensRefreshRequest=T.CodeLensResolveRequest=T.CodeLensRequest=T.WorkspaceSymbolResolveRequest=void 0;T.DidCloseNotebookDocumentNotification=T.DidSaveNotebookDocumentNotification=T.DidChangeNotebookDocumentNotification=T.NotebookCellArrayChange=T.DidOpenNotebookDocumentNotification=T.NotebookDocumentSyncRegistrationType=T.NotebookDocument=T.NotebookCell=T.ExecutionSummary=T.NotebookCellKind=T.DiagnosticRefreshRequest=T.WorkspaceDiagnosticRequest=T.DocumentDiagnosticRequest=T.DocumentDiagnosticReportKind=T.DiagnosticServerCancellationData=T.InlayHintRefreshRequest=T.InlayHintResolveRequest=T.InlayHintRequest=T.InlineValueRefreshRequest=T.InlineValueRequest=T.TypeHierarchySupertypesRequest=void 0;var K=Rt(),tC=yo(),ar=Zc(),qU=C0();Object.defineProperty(T,"ImplementationRequest",{enumerable:!0,get:function(){return qU.ImplementationRequest}});var MU=E0();Object.defineProperty(T,"TypeDefinitionRequest",{enumerable:!0,get:function(){return MU.TypeDefinitionRequest}});var rC=P0();Object.defineProperty(T,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return rC.WorkspaceFoldersRequest}});Object.defineProperty(T,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return rC.DidChangeWorkspaceFoldersNotification}});var FU=w0();Object.defineProperty(T,"ConfigurationRequest",{enumerable:!0,get:function(){return FU.ConfigurationRequest}});var nC=N0();Object.defineProperty(T,"DocumentColorRequest",{enumerable:!0,get:function(){return nC.DocumentColorRequest}});Object.defineProperty(T,"ColorPresentationRequest",{enumerable:!0,get:function(){return nC.ColorPresentationRequest}});var jU=$0();Object.defineProperty(T,"FoldingRangeRequest",{enumerable:!0,get:function(){return jU.FoldingRangeRequest}});var GU=I0();Object.defineProperty(T,"DeclarationRequest",{enumerable:!0,get:function(){return GU.DeclarationRequest}});var UU=L0();Object.defineProperty(T,"SelectionRangeRequest",{enumerable:!0,get:function(){return UU.SelectionRangeRequest}});var $y=q0();Object.defineProperty(T,"WorkDoneProgress",{enumerable:!0,get:function(){return $y.WorkDoneProgress}});Object.defineProperty(T,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return $y.WorkDoneProgressCreateRequest}});Object.defineProperty(T,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return $y.WorkDoneProgressCancelNotification}});var Oy=M0();Object.defineProperty(T,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return Oy.CallHierarchyIncomingCallsRequest}});Object.defineProperty(T,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return Oy.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(T,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return Oy.CallHierarchyPrepareRequest}});var ms=F0();Object.defineProperty(T,"TokenFormat",{enumerable:!0,get:function(){return ms.TokenFormat}});Object.defineProperty(T,"SemanticTokensRequest",{enumerable:!0,get:function(){return ms.SemanticTokensRequest}});Object.defineProperty(T,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return ms.SemanticTokensDeltaRequest}});Object.defineProperty(T,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return ms.SemanticTokensRangeRequest}});Object.defineProperty(T,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return ms.SemanticTokensRefreshRequest}});Object.defineProperty(T,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return ms.SemanticTokensRegistrationType}});var HU=G0();Object.defineProperty(T,"ShowDocumentRequest",{enumerable:!0,get:function(){return HU.ShowDocumentRequest}});var KU=H0();Object.defineProperty(T,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return KU.LinkedEditingRangeRequest}});var go=K0();Object.defineProperty(T,"FileOperationPatternKind",{enumerable:!0,get:function(){return go.FileOperationPatternKind}});Object.defineProperty(T,"DidCreateFilesNotification",{enumerable:!0,get:function(){return go.DidCreateFilesNotification}});Object.defineProperty(T,"WillCreateFilesRequest",{enumerable:!0,get:function(){return go.WillCreateFilesRequest}});Object.defineProperty(T,"DidRenameFilesNotification",{enumerable:!0,get:function(){return go.DidRenameFilesNotification}});Object.defineProperty(T,"WillRenameFilesRequest",{enumerable:!0,get:function(){return go.WillRenameFilesRequest}});Object.defineProperty(T,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return go.DidDeleteFilesNotification}});Object.defineProperty(T,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return go.WillDeleteFilesRequest}});var Iy=B0();Object.defineProperty(T,"UniquenessLevel",{enumerable:!0,get:function(){return Iy.UniquenessLevel}});Object.defineProperty(T,"MonikerKind",{enumerable:!0,get:function(){return Iy.MonikerKind}});Object.defineProperty(T,"MonikerRequest",{enumerable:!0,get:function(){return Iy.MonikerRequest}});var xy=V0();Object.defineProperty(T,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return xy.TypeHierarchyPrepareRequest}});Object.defineProperty(T,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return xy.TypeHierarchySubtypesRequest}});Object.defineProperty(T,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return xy.TypeHierarchySupertypesRequest}});var iC=z0();Object.defineProperty(T,"InlineValueRequest",{enumerable:!0,get:function(){return iC.InlineValueRequest}});Object.defineProperty(T,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return iC.InlineValueRefreshRequest}});var Ly=Y0();Object.defineProperty(T,"InlayHintRequest",{enumerable:!0,get:function(){return Ly.InlayHintRequest}});Object.defineProperty(T,"InlayHintResolveRequest",{enumerable:!0,get:function(){return Ly.InlayHintResolveRequest}});Object.defineProperty(T,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return Ly.InlayHintRefreshRequest}});var pl=J0();Object.defineProperty(T,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return pl.DiagnosticServerCancellationData}});Object.defineProperty(T,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return pl.DocumentDiagnosticReportKind}});Object.defineProperty(T,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return pl.DocumentDiagnosticRequest}});Object.defineProperty(T,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return pl.WorkspaceDiagnosticRequest}});Object.defineProperty(T,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return pl.DiagnosticRefreshRequest}});var ai=eC();Object.defineProperty(T,"NotebookCellKind",{enumerable:!0,get:function(){return ai.NotebookCellKind}});Object.defineProperty(T,"ExecutionSummary",{enumerable:!0,get:function(){return ai.ExecutionSummary}});Object.defineProperty(T,"NotebookCell",{enumerable:!0,get:function(){return ai.NotebookCell}});Object.defineProperty(T,"NotebookDocument",{enumerable:!0,get:function(){return ai.NotebookDocument}});Object.defineProperty(T,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return ai.NotebookDocumentSyncRegistrationType}});Object.defineProperty(T,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return ai.DidOpenNotebookDocumentNotification}});Object.defineProperty(T,"NotebookCellArrayChange",{enumerable:!0,get:function(){return ai.NotebookCellArrayChange}});Object.defineProperty(T,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return ai.DidChangeNotebookDocumentNotification}});Object.defineProperty(T,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return ai.DidSaveNotebookDocumentNotification}});Object.defineProperty(T,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return ai.DidCloseNotebookDocumentNotification}});var aC;(function(t){function e(r){let n=r;return ar.string(n.language)||ar.string(n.scheme)||ar.string(n.pattern)}t.is=e})(aC=T.TextDocumentFilter||(T.TextDocumentFilter={}));var oC;(function(t){function e(r){let n=r;return ar.objectLiteral(n)&&(ar.string(n.notebookType)||ar.string(n.scheme)||ar.string(n.pattern))}t.is=e})(oC=T.NotebookDocumentFilter||(T.NotebookDocumentFilter={}));var sC;(function(t){function e(r){let n=r;return ar.objectLiteral(n)&&(ar.string(n.notebook)||oC.is(n.notebook))&&(n.language===void 0||ar.string(n.language))}t.is=e})(sC=T.NotebookCellTextDocumentFilter||(T.NotebookCellTextDocumentFilter={}));var uC;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!ar.string(n)&&!aC.is(n)&&!sC.is(n))return!1;return!0}t.is=e})(uC=T.DocumentSelector||(T.DocumentSelector={}));var WU;(function(t){t.method="client/registerCapability",t.messageDirection=K.MessageDirection.serverToClient,t.type=new K.ProtocolRequestType(t.method)})(WU=T.RegistrationRequest||(T.RegistrationRequest={}));var BU;(function(t){t.method="client/unregisterCapability",t.messageDirection=K.MessageDirection.serverToClient,t.type=new K.ProtocolRequestType(t.method)})(BU=T.UnregistrationRequest||(T.UnregistrationRequest={}));var VU;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(VU=T.ResourceOperationKind||(T.ResourceOperationKind={}));var zU;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(zU=T.FailureHandlingKind||(T.FailureHandlingKind={}));var YU;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(YU=T.PositionEncodingKind||(T.PositionEncodingKind={}));var XU;(function(t){function e(r){let n=r;return n&&ar.string(n.id)&&n.id.length>0}t.hasId=e})(XU=T.StaticRegistrationOptions||(T.StaticRegistrationOptions={}));var JU;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||uC.is(n.documentSelector))}t.is=e})(JU=T.TextDocumentRegistrationOptions||(T.TextDocumentRegistrationOptions={}));var QU;(function(t){function e(n){let i=n;return ar.objectLiteral(i)&&(i.workDoneProgress===void 0||ar.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&ar.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(QU=T.WorkDoneProgressOptions||(T.WorkDoneProgressOptions={}));var ZU;(function(t){t.method="initialize",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(ZU=T.InitializeRequest||(T.InitializeRequest={}));var eH;(function(t){t.unknownProtocolVersion=1})(eH=T.InitializeErrorCodes||(T.InitializeErrorCodes={}));var tH;(function(t){t.method="initialized",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolNotificationType(t.method)})(tH=T.InitializedNotification||(T.InitializedNotification={}));var rH;(function(t){t.method="shutdown",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType0(t.method)})(rH=T.ShutdownRequest||(T.ShutdownRequest={}));var nH;(function(t){t.method="exit",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolNotificationType0(t.method)})(nH=T.ExitNotification||(T.ExitNotification={}));var iH;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolNotificationType(t.method)})(iH=T.DidChangeConfigurationNotification||(T.DidChangeConfigurationNotification={}));var aH;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(aH=T.MessageType||(T.MessageType={}));var oH;(function(t){t.method="window/showMessage",t.messageDirection=K.MessageDirection.serverToClient,t.type=new K.ProtocolNotificationType(t.method)})(oH=T.ShowMessageNotification||(T.ShowMessageNotification={}));var sH;(function(t){t.method="window/showMessageRequest",t.messageDirection=K.MessageDirection.serverToClient,t.type=new K.ProtocolRequestType(t.method)})(sH=T.ShowMessageRequest||(T.ShowMessageRequest={}));var uH;(function(t){t.method="window/logMessage",t.messageDirection=K.MessageDirection.serverToClient,t.type=new K.ProtocolNotificationType(t.method)})(uH=T.LogMessageNotification||(T.LogMessageNotification={}));var lH;(function(t){t.method="telemetry/event",t.messageDirection=K.MessageDirection.serverToClient,t.type=new K.ProtocolNotificationType(t.method)})(lH=T.TelemetryEventNotification||(T.TelemetryEventNotification={}));var cH;(function(t){t.None=0,t.Full=1,t.Incremental=2})(cH=T.TextDocumentSyncKind||(T.TextDocumentSyncKind={}));var fH;(function(t){t.method="textDocument/didOpen",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolNotificationType(t.method)})(fH=T.DidOpenTextDocumentNotification||(T.DidOpenTextDocumentNotification={}));var dH;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(dH=T.TextDocumentContentChangeEvent||(T.TextDocumentContentChangeEvent={}));var pH;(function(t){t.method="textDocument/didChange",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolNotificationType(t.method)})(pH=T.DidChangeTextDocumentNotification||(T.DidChangeTextDocumentNotification={}));var mH;(function(t){t.method="textDocument/didClose",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolNotificationType(t.method)})(mH=T.DidCloseTextDocumentNotification||(T.DidCloseTextDocumentNotification={}));var hH;(function(t){t.method="textDocument/didSave",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolNotificationType(t.method)})(hH=T.DidSaveTextDocumentNotification||(T.DidSaveTextDocumentNotification={}));var yH;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(yH=T.TextDocumentSaveReason||(T.TextDocumentSaveReason={}));var gH;(function(t){t.method="textDocument/willSave",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolNotificationType(t.method)})(gH=T.WillSaveTextDocumentNotification||(T.WillSaveTextDocumentNotification={}));var vH;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(vH=T.WillSaveTextDocumentWaitUntilRequest||(T.WillSaveTextDocumentWaitUntilRequest={}));var TH;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolNotificationType(t.method)})(TH=T.DidChangeWatchedFilesNotification||(T.DidChangeWatchedFilesNotification={}));var _H;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(_H=T.FileChangeType||(T.FileChangeType={}));var RH;(function(t){function e(r){let n=r;return ar.objectLiteral(n)&&(tC.URI.is(n.baseUri)||tC.WorkspaceFolder.is(n.baseUri))&&ar.string(n.pattern)}t.is=e})(RH=T.RelativePattern||(T.RelativePattern={}));var bH;(function(t){t.Create=1,t.Change=2,t.Delete=4})(bH=T.WatchKind||(T.WatchKind={}));var SH;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=K.MessageDirection.serverToClient,t.type=new K.ProtocolNotificationType(t.method)})(SH=T.PublishDiagnosticsNotification||(T.PublishDiagnosticsNotification={}));var CH;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(CH=T.CompletionTriggerKind||(T.CompletionTriggerKind={}));var AH;(function(t){t.method="textDocument/completion",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(AH=T.CompletionRequest||(T.CompletionRequest={}));var EH;(function(t){t.method="completionItem/resolve",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(EH=T.CompletionResolveRequest||(T.CompletionResolveRequest={}));var PH;(function(t){t.method="textDocument/hover",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(PH=T.HoverRequest||(T.HoverRequest={}));var kH;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(kH=T.SignatureHelpTriggerKind||(T.SignatureHelpTriggerKind={}));var wH;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(wH=T.SignatureHelpRequest||(T.SignatureHelpRequest={}));var NH;(function(t){t.method="textDocument/definition",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(NH=T.DefinitionRequest||(T.DefinitionRequest={}));var DH;(function(t){t.method="textDocument/references",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(DH=T.ReferencesRequest||(T.ReferencesRequest={}));var $H;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})($H=T.DocumentHighlightRequest||(T.DocumentHighlightRequest={}));var OH;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(OH=T.DocumentSymbolRequest||(T.DocumentSymbolRequest={}));var IH;(function(t){t.method="textDocument/codeAction",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(IH=T.CodeActionRequest||(T.CodeActionRequest={}));var xH;(function(t){t.method="codeAction/resolve",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(xH=T.CodeActionResolveRequest||(T.CodeActionResolveRequest={}));var LH;(function(t){t.method="workspace/symbol",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(LH=T.WorkspaceSymbolRequest||(T.WorkspaceSymbolRequest={}));var qH;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(qH=T.WorkspaceSymbolResolveRequest||(T.WorkspaceSymbolResolveRequest={}));var MH;(function(t){t.method="textDocument/codeLens",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(MH=T.CodeLensRequest||(T.CodeLensRequest={}));var FH;(function(t){t.method="codeLens/resolve",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(FH=T.CodeLensResolveRequest||(T.CodeLensResolveRequest={}));var jH;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=K.MessageDirection.serverToClient,t.type=new K.ProtocolRequestType0(t.method)})(jH=T.CodeLensRefreshRequest||(T.CodeLensRefreshRequest={}));var GH;(function(t){t.method="textDocument/documentLink",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(GH=T.DocumentLinkRequest||(T.DocumentLinkRequest={}));var UH;(function(t){t.method="documentLink/resolve",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(UH=T.DocumentLinkResolveRequest||(T.DocumentLinkResolveRequest={}));var HH;(function(t){t.method="textDocument/formatting",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(HH=T.DocumentFormattingRequest||(T.DocumentFormattingRequest={}));var KH;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(KH=T.DocumentRangeFormattingRequest||(T.DocumentRangeFormattingRequest={}));var WH;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(WH=T.DocumentOnTypeFormattingRequest||(T.DocumentOnTypeFormattingRequest={}));var BH;(function(t){t.Identifier=1})(BH=T.PrepareSupportDefaultBehavior||(T.PrepareSupportDefaultBehavior={}));var VH;(function(t){t.method="textDocument/rename",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(VH=T.RenameRequest||(T.RenameRequest={}));var zH;(function(t){t.method="textDocument/prepareRename",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(zH=T.PrepareRenameRequest||(T.PrepareRenameRequest={}));var YH;(function(t){t.method="workspace/executeCommand",t.messageDirection=K.MessageDirection.clientToServer,t.type=new K.ProtocolRequestType(t.method)})(YH=T.ExecuteCommandRequest||(T.ExecuteCommandRequest={}));var XH;(function(t){t.method="workspace/applyEdit",t.messageDirection=K.MessageDirection.serverToClient,t.type=new K.ProtocolRequestType("workspace/applyEdit")})(XH=T.ApplyWorkspaceEditRequest||(T.ApplyWorkspaceEditRequest={}))});var fC=d(of=>{"use strict";Object.defineProperty(of,"__esModule",{value:!0});of.createProtocolConnection=void 0;var cC=ho();function JH(t,e,r,n){return cC.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,cC.createMessageConnection)(t,e,r,n)}of.createProtocolConnection=JH});var dC=d(Er=>{"use strict";var QH=Er&&Er.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),sf=Er&&Er.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&QH(e,t,r)};Object.defineProperty(Er,"__esModule",{value:!0});Er.LSPErrorCodes=Er.createProtocolConnection=void 0;sf(ho(),Er);sf(yo(),Er);sf(Rt(),Er);sf(lC(),Er);var ZH=fC();Object.defineProperty(Er,"createProtocolConnection",{enumerable:!0,get:function(){return ZH.createProtocolConnection}});var eK;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(eK=Er.LSPErrorCodes||(Er.LSPErrorCodes={}))});var xt=d(oi=>{"use strict";var tK=oi&&oi.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),pC=oi&&oi.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&tK(e,t,r)};Object.defineProperty(oi,"__esModule",{value:!0});oi.createProtocolConnection=void 0;var rK=Ay();pC(Ay(),oi);pC(dC(),oi);function nK(t,e,r,n){return(0,rK.createMessageConnection)(t,e,r,n)}oi.createProtocolConnection=nK});var My=d(Aa=>{"use strict";Object.defineProperty(Aa,"__esModule",{value:!0});Aa.SemanticTokensBuilder=Aa.SemanticTokensDiff=Aa.SemanticTokensFeature=void 0;var uf=xt(),iK=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(uf.SemanticTokensRefreshRequest.type),on:e=>{let r=uf.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=uf.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=uf.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Aa.SemanticTokensFeature=iK;var lf=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,a=r-1;for(;i>=n&&a>=n&&this.originalSequence[i]===this.modifiedSequence[a];)i--,a--;(i<n||a<n)&&(i++,a++);let o=i-n+1,s=this.modifiedSequence.slice(n,a+1);return s.length===1&&s[0]===this.originalSequence[i]?[{start:n,deleteCount:o-1}]:[{start:n,deleteCount:o,data:s}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Aa.SemanticTokensDiff=lf;var qy=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,a){let o=e,s=r;this._dataLen>0&&(o-=this._prevLine,o===0&&(s-=this._prevChar)),this._data[this._dataLen++]=o,this._data[this._dataLen++]=s,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=a,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new lf(this._prevData,this._data).computeDiff()}:this.build()}};Aa.SemanticTokensBuilder=qy});var jy=d(cf=>{"use strict";Object.defineProperty(cf,"__esModule",{value:!0});cf.TextDocuments=void 0;var vo=xt(),Fy=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new vo.Emitter,this._onDidOpen=new vo.Emitter,this._onDidClose=new vo.Emitter,this._onDidSave=new vo.Emitter,this._onWillSave=new vo.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=vo.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,a=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,a);let o=Object.freeze({document:a});this._onDidOpen.fire(o),this._onDidChangeContent.fire(o)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,a=n.contentChanges;if(a.length===0)return;let{version:o}=i;if(o==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let s=this._syncedDocuments.get(i.uri);s!==void 0&&(s=this._configuration.update(s,a,o),this._syncedDocuments.set(i.uri,s),this._onDidChangeContent.fire(Object.freeze({document:s})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let a=this._syncedDocuments.get(n.textDocument.uri);return a!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:a,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),vo.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};cf.TextDocuments=Fy});var Uy=d(hs=>{"use strict";Object.defineProperty(hs,"__esModule",{value:!0});hs.NotebookDocuments=hs.NotebookSyncFeature=void 0;var mn=xt(),mC=jy(),aK=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(mn.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(mn.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(mn.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(mn.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};hs.NotebookSyncFeature=aK;var ff=class t{onDidOpenTextDocument(e){return this.openHandler=e,mn.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,mn.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,mn.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return t.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return t.NULL_DISPOSE}onDidSaveTextDocument(){return t.NULL_DISPOSE}};ff.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var Gy=class{constructor(e){e instanceof mC.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new mC.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new mn.Emitter,this._onDidChange=new mn.Emitter,this._onDidSave=new mn.Emitter,this._onDidClose=new mn.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new ff,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let a of i.cellTextDocuments)r.openTextDocument({textDocument:a});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a===void 0)return;a.version=i.notebookDocument.version;let o=a.metadata,s=!1,u=i.change;u.metadata!==void 0&&(s=!0,a.metadata=u.metadata);let l=[],c=[],p=[],h=[];if(u.cells!==void 0){let P=u.cells;if(P.structure!==void 0){let C=P.structure.array;if(a.cells.splice(C.start,C.deleteCount,...C.cells!==void 0?C.cells:[]),P.structure.didOpen!==void 0)for(let b of P.structure.didOpen)r.openTextDocument({textDocument:b}),l.push(b.uri);if(P.structure.didClose)for(let b of P.structure.didClose)r.closeTextDocument({textDocument:b}),c.push(b.uri)}if(P.data!==void 0){let C=new Map(P.data.map(b=>[b.document,b]));for(let b=0;b<=a.cells.length;b++){let x=C.get(a.cells[b].document);if(x!==void 0){let G=a.cells.splice(b,1,x);if(p.push({old:G[0],new:x}),C.delete(x.document),C.size===0)break}}}if(P.textContent!==void 0)for(let C of P.textContent)r.changeTextDocument({textDocument:C.document,contentChanges:C.changes}),h.push(C.document.uri)}this.updateCellMap(a);let R={notebookDocument:a};s&&(R.metadata={old:o,new:a.metadata});let y=[];for(let P of l)y.push(this.getNotebookCell(P));let A=[];for(let P of c)A.push(this.getNotebookCell(P));let w=[];for(let P of h)w.push(this.getNotebookCell(P));(y.length>0||A.length>0||p.length>0||w.length>0)&&(R.cells={added:y,removed:A,changed:{data:p,textContent:w}}),(R.metadata!==void 0||R.cells!==void 0)&&this._onDidChange.fire(R)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);a!==void 0&&this._onDidSave.fire(a)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a!==void 0){this._onDidClose.fire(a);for(let o of i.cellTextDocuments)r.closeTextDocument({textDocument:o});this.notebookDocuments.delete(i.notebookDocument.uri);for(let o of a.cells)this.notebookCellMap.delete(o.document)}})),mn.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};hs.NotebookDocuments=Gy});var Hy=d(Lt=>{"use strict";Object.defineProperty(Lt,"__esModule",{value:!0});Lt.thenable=Lt.typedArray=Lt.stringArray=Lt.array=Lt.func=Lt.error=Lt.number=Lt.string=Lt.boolean=void 0;function oK(t){return t===!0||t===!1}Lt.boolean=oK;function hC(t){return typeof t=="string"||t instanceof String}Lt.string=hC;function sK(t){return typeof t=="number"||t instanceof Number}Lt.number=sK;function uK(t){return t instanceof Error}Lt.error=uK;function yC(t){return typeof t=="function"}Lt.func=yC;function gC(t){return Array.isArray(t)}Lt.array=gC;function lK(t){return gC(t)&&t.every(e=>hC(e))}Lt.stringArray=lK;function cK(t,e){return Array.isArray(t)&&t.every(e)}Lt.typedArray=cK;function fK(t){return t&&yC(t.then)}Lt.thenable=fK});var Ky=d(hn=>{"use strict";Object.defineProperty(hn,"__esModule",{value:!0});hn.generateUuid=hn.parse=hn.isUUID=hn.v4=hn.empty=void 0;var ml=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},hl=class t extends ml{constructor(){super([t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-","4",t._randomHex(),t._randomHex(),t._randomHex(),"-",t._oneOf(t._timeHighBits),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return t._oneOf(t._chars)}};hl._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];hl._timeHighBits=["8","9","a","b"];hn.empty=new ml("00000000-0000-0000-0000-000000000000");function vC(){return new hl}hn.v4=vC;var dK=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function TC(t){return dK.test(t)}hn.isUUID=TC;function pK(t){if(!TC(t))throw new Error("invalid uuid");return new ml(t)}hn.parse=pK;function mK(){return vC().asHex()}hn.generateUuid=mK});var _C=d(Pa=>{"use strict";Object.defineProperty(Pa,"__esModule",{value:!0});Pa.attachPartialResult=Pa.ProgressFeature=Pa.attachWorkDone=void 0;var Ea=xt(),hK=Ky(),To=class t{constructor(e,r){this._connection=e,this._token=r,t.Instances.set(this._token,this)}begin(e,r,n,i){let a={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress(Ea.WorkDoneProgress.type,this._token,a)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress(Ea.WorkDoneProgress.type,this._token,n)}done(){t.Instances.delete(this._token),this._connection.sendProgress(Ea.WorkDoneProgress.type,this._token,{kind:"end"})}};To.Instances=new Map;var df=class extends To{constructor(e,r){super(e,r),this._source=new Ea.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},yl=class{constructor(){}begin(){}report(){}done(){}},pf=class extends yl{constructor(){super(),this._source=new Ea.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function yK(t,e){if(e===void 0||e.workDoneToken===void 0)return new yl;let r=e.workDoneToken;return delete e.workDoneToken,new To(t,r)}Pa.attachWorkDone=yK;var gK=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(Ea.WorkDoneProgressCancelNotification.type,r=>{let n=To.Instances.get(r.token);(n instanceof df||n instanceof pf)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new yl:new To(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,hK.generateUuid)();return this.connection.sendRequest(Ea.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new df(this.connection,e))}else return Promise.resolve(new pf)}};Pa.ProgressFeature=gK;var Wy;(function(t){t.type=new Ea.ProgressType})(Wy||(Wy={}));var By=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(Wy.type,this._token,e)}};function vK(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new By(t,r)}Pa.attachPartialResult=vK});var RC=d(mf=>{"use strict";Object.defineProperty(mf,"__esModule",{value:!0});mf.ConfigurationFeature=void 0;var TK=xt(),_K=Hy(),RK=t=>class extends t{getConfiguration(e){return e?_K.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(TK.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};mf.ConfigurationFeature=RK});var bC=d(yf=>{"use strict";Object.defineProperty(yf,"__esModule",{value:!0});yf.WorkspaceFoldersFeature=void 0;var hf=xt(),bK=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new hf.Emitter,this.connection.onNotification(hf.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(hf.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(hf.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};yf.WorkspaceFoldersFeature=bK});var SC=d(gf=>{"use strict";Object.defineProperty(gf,"__esModule",{value:!0});gf.CallHierarchyFeature=void 0;var Vy=xt(),SK=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(Vy.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=Vy.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=Vy.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};gf.CallHierarchyFeature=SK});var CC=d(vf=>{"use strict";Object.defineProperty(vf,"__esModule",{value:!0});vf.ShowDocumentFeature=void 0;var CK=xt(),AK=t=>class extends t{showDocument(e){return this.connection.sendRequest(CK.ShowDocumentRequest.type,e)}};vf.ShowDocumentFeature=AK});var AC=d(Tf=>{"use strict";Object.defineProperty(Tf,"__esModule",{value:!0});Tf.FileOperationsFeature=void 0;var ys=xt(),EK=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(ys.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(ys.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(ys.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(ys.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(ys.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(ys.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};Tf.FileOperationsFeature=EK});var EC=d(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.LinkedEditingRangeFeature=void 0;var PK=xt(),kK=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(PK.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};_f.LinkedEditingRangeFeature=kK});var PC=d(Rf=>{"use strict";Object.defineProperty(Rf,"__esModule",{value:!0});Rf.TypeHierarchyFeature=void 0;var zy=xt(),wK=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(zy.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=zy.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=zy.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Rf.TypeHierarchyFeature=wK});var wC=d(bf=>{"use strict";Object.defineProperty(bf,"__esModule",{value:!0});bf.InlineValueFeature=void 0;var kC=xt(),NK=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(kC.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(kC.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};bf.InlineValueFeature=NK});var NC=d(Sf=>{"use strict";Object.defineProperty(Sf,"__esModule",{value:!0});Sf.InlayHintFeature=void 0;var Yy=xt(),DK=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Yy.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Yy.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(Yy.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};Sf.InlayHintFeature=DK});var DC=d(Cf=>{"use strict";Object.defineProperty(Cf,"__esModule",{value:!0});Cf.DiagnosticFeature=void 0;var gl=xt(),$K=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(gl.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(gl.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(gl.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(gl.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(gl.WorkspaceDiagnosticRequest.partialResult,r)))}}};Cf.DiagnosticFeature=$K});var $C=d(Af=>{"use strict";Object.defineProperty(Af,"__esModule",{value:!0});Af.MonikerFeature=void 0;var OK=xt(),IK=t=>class extends t{get moniker(){return{on:e=>{let r=OK.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Af.MonikerFeature=IK});var WC=d(De=>{"use strict";Object.defineProperty(De,"__esModule",{value:!0});De.createConnection=De.combineFeatures=De.combineNotebooksFeatures=De.combineLanguagesFeatures=De.combineWorkspaceFeatures=De.combineWindowFeatures=De.combineClientFeatures=De.combineTracerFeatures=De.combineTelemetryFeatures=De.combineConsoleFeatures=De._NotebooksImpl=De._LanguagesImpl=De.BulkUnregistration=De.BulkRegistration=De.ErrorMessageTracker=void 0;var V=xt(),yn=Hy(),Jy=Ky(),me=_C(),xK=RC(),LK=bC(),qK=SC(),MK=My(),FK=CC(),jK=AC(),GK=EC(),UK=PC(),HK=wC(),KK=NC(),WK=DC(),BK=Uy(),VK=$C();function Xy(t){if(t!==null)return t}var Qy=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};De.ErrorMessageTracker=Qy;var Ef=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(V.MessageType.Error,e)}warn(e){this.send(V.MessageType.Warning,e)}info(e){this.send(V.MessageType.Info,e)}log(e){this.send(V.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(V.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,V.RAL)().console.error("Sending log message failed")})}},Zy=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:V.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(V.ShowMessageRequest.type,n).then(Xy)}showWarningMessage(e,...r){let n={type:V.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(V.ShowMessageRequest.type,n).then(Xy)}showInformationMessage(e,...r){let n={type:V.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(V.ShowMessageRequest.type,n).then(Xy)}},OC=(0,FK.ShowDocumentFeature)((0,me.ProgressFeature)(Zy)),zK;(function(t){function e(){return new Pf}t.create=e})(zK=De.BulkRegistration||(De.BulkRegistration={}));var Pf=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=yn.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=Jy.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},YK;(function(t){function e(){return new vl(void 0,[])}t.create=e})(YK=De.BulkUnregistration||(De.BulkUnregistration={}));var vl=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(V.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=yn.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(V.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},a=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},kf=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof Pf?this.registerMany(e):e instanceof vl?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=yn.string(r)?r:r.method,a=Jy.generateUuid(),o={registrations:[{id:a,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(V.RegistrationRequest.type,o).then(s=>(e.add({id:a,method:i}),e),s=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(s)))}registerSingle2(e,r){let n=yn.string(e)?e:e.method,i=Jy.generateUuid(),a={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(V.RegistrationRequest.type,a).then(o=>V.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),o=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(o)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(V.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(V.RegistrationRequest.type,r).then(()=>new vl(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},eg=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(V.ApplyWorkspaceEditRequest.type,n)}},IC=(0,jK.FileOperationsFeature)((0,LK.WorkspaceFoldersFeature)((0,xK.ConfigurationFeature)(eg))),wf=class{constructor(){this._trace=V.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==V.Trace.Off&&this.connection.sendNotification(V.LogTraceNotification.type,{message:e,verbose:this._trace===V.Trace.Verbose?r:void 0}).catch(()=>{})}},Nf=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(V.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Df=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,me.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,me.attachPartialResult)(this.connection,r)}};De._LanguagesImpl=Df;var xC=(0,VK.MonikerFeature)((0,WK.DiagnosticFeature)((0,KK.InlayHintFeature)((0,HK.InlineValueFeature)((0,UK.TypeHierarchyFeature)((0,GK.LinkedEditingRangeFeature)((0,MK.SemanticTokensFeature)((0,qK.CallHierarchyFeature)(Df)))))))),$f=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,me.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,me.attachPartialResult)(this.connection,r)}};De._NotebooksImpl=$f;var LC=(0,BK.NotebookSyncFeature)($f);function qC(t,e){return function(r){return e(t(r))}}De.combineConsoleFeatures=qC;function MC(t,e){return function(r){return e(t(r))}}De.combineTelemetryFeatures=MC;function FC(t,e){return function(r){return e(t(r))}}De.combineTracerFeatures=FC;function jC(t,e){return function(r){return e(t(r))}}De.combineClientFeatures=jC;function GC(t,e){return function(r){return e(t(r))}}De.combineWindowFeatures=GC;function UC(t,e){return function(r){return e(t(r))}}De.combineWorkspaceFeatures=UC;function HC(t,e){return function(r){return e(t(r))}}De.combineLanguagesFeatures=HC;function KC(t,e){return function(r){return e(t(r))}}De.combineNotebooksFeatures=KC;function XK(t,e){function r(i,a,o){return i&&a?o(i,a):i||a}return{__brand:"features",console:r(t.console,e.console,qC),tracer:r(t.tracer,e.tracer,FC),telemetry:r(t.telemetry,e.telemetry,MC),client:r(t.client,e.client,jC),window:r(t.window,e.window,GC),workspace:r(t.workspace,e.workspace,UC),languages:r(t.languages,e.languages,HC),notebooks:r(t.notebooks,e.notebooks,KC)}}De.combineFeatures=XK;function JK(t,e,r){let n=r&&r.console?new(r.console(Ef)):new Ef,i=t(n);n.rawAttach(i);let a=r&&r.tracer?new(r.tracer(wf)):new wf,o=r&&r.telemetry?new(r.telemetry(Nf)):new Nf,s=r&&r.client?new(r.client(kf)):new kf,u=r&&r.window?new(r.window(OC)):new OC,l=r&&r.workspace?new(r.workspace(IC)):new IC,c=r&&r.languages?new(r.languages(xC)):new xC,p=r&&r.notebooks?new(r.notebooks(LC)):new LC,h=[n,a,o,s,u,l,c,p];function R(C){return C instanceof Promise?C:yn.thenable(C)?new Promise((b,x)=>{C.then(G=>b(G),G=>x(G))}):Promise.resolve(C)}let y,A,w,P={listen:()=>i.listen(),sendRequest:(C,...b)=>i.sendRequest(yn.string(C)?C:C.method,...b),onRequest:(C,b)=>i.onRequest(C,b),sendNotification:(C,b)=>{let x=yn.string(C)?C:C.method;return arguments.length===1?i.sendNotification(x):i.sendNotification(x,b)},onNotification:(C,b)=>i.onNotification(C,b),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:C=>(A=C,{dispose:()=>{A=void 0}}),onInitialized:C=>i.onNotification(V.InitializedNotification.type,C),onShutdown:C=>(y=C,{dispose:()=>{y=void 0}}),onExit:C=>(w=C,{dispose:()=>{w=void 0}}),get console(){return n},get telemetry(){return o},get tracer(){return a},get client(){return s},get window(){return u},get workspace(){return l},get languages(){return c},get notebooks(){return p},onDidChangeConfiguration:C=>i.onNotification(V.DidChangeConfigurationNotification.type,C),onDidChangeWatchedFiles:C=>i.onNotification(V.DidChangeWatchedFilesNotification.type,C),__textDocumentSync:void 0,onDidOpenTextDocument:C=>i.onNotification(V.DidOpenTextDocumentNotification.type,C),onDidChangeTextDocument:C=>i.onNotification(V.DidChangeTextDocumentNotification.type,C),onDidCloseTextDocument:C=>i.onNotification(V.DidCloseTextDocumentNotification.type,C),onWillSaveTextDocument:C=>i.onNotification(V.WillSaveTextDocumentNotification.type,C),onWillSaveTextDocumentWaitUntil:C=>i.onRequest(V.WillSaveTextDocumentWaitUntilRequest.type,C),onDidSaveTextDocument:C=>i.onNotification(V.DidSaveTextDocumentNotification.type,C),sendDiagnostics:C=>i.sendNotification(V.PublishDiagnosticsNotification.type,C),onHover:C=>i.onRequest(V.HoverRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),void 0)),onCompletion:C=>i.onRequest(V.CompletionRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),(0,me.attachPartialResult)(i,b))),onCompletionResolve:C=>i.onRequest(V.CompletionResolveRequest.type,C),onSignatureHelp:C=>i.onRequest(V.SignatureHelpRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),void 0)),onDeclaration:C=>i.onRequest(V.DeclarationRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),(0,me.attachPartialResult)(i,b))),onDefinition:C=>i.onRequest(V.DefinitionRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),(0,me.attachPartialResult)(i,b))),onTypeDefinition:C=>i.onRequest(V.TypeDefinitionRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),(0,me.attachPartialResult)(i,b))),onImplementation:C=>i.onRequest(V.ImplementationRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),(0,me.attachPartialResult)(i,b))),onReferences:C=>i.onRequest(V.ReferencesRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),(0,me.attachPartialResult)(i,b))),onDocumentHighlight:C=>i.onRequest(V.DocumentHighlightRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),(0,me.attachPartialResult)(i,b))),onDocumentSymbol:C=>i.onRequest(V.DocumentSymbolRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),(0,me.attachPartialResult)(i,b))),onWorkspaceSymbol:C=>i.onRequest(V.WorkspaceSymbolRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),(0,me.attachPartialResult)(i,b))),onWorkspaceSymbolResolve:C=>i.onRequest(V.WorkspaceSymbolResolveRequest.type,C),onCodeAction:C=>i.onRequest(V.CodeActionRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),(0,me.attachPartialResult)(i,b))),onCodeActionResolve:C=>i.onRequest(V.CodeActionResolveRequest.type,(b,x)=>C(b,x)),onCodeLens:C=>i.onRequest(V.CodeLensRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),(0,me.attachPartialResult)(i,b))),onCodeLensResolve:C=>i.onRequest(V.CodeLensResolveRequest.type,(b,x)=>C(b,x)),onDocumentFormatting:C=>i.onRequest(V.DocumentFormattingRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),void 0)),onDocumentRangeFormatting:C=>i.onRequest(V.DocumentRangeFormattingRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),void 0)),onDocumentOnTypeFormatting:C=>i.onRequest(V.DocumentOnTypeFormattingRequest.type,(b,x)=>C(b,x)),onRenameRequest:C=>i.onRequest(V.RenameRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),void 0)),onPrepareRename:C=>i.onRequest(V.PrepareRenameRequest.type,(b,x)=>C(b,x)),onDocumentLinks:C=>i.onRequest(V.DocumentLinkRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),(0,me.attachPartialResult)(i,b))),onDocumentLinkResolve:C=>i.onRequest(V.DocumentLinkResolveRequest.type,(b,x)=>C(b,x)),onDocumentColor:C=>i.onRequest(V.DocumentColorRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),(0,me.attachPartialResult)(i,b))),onColorPresentation:C=>i.onRequest(V.ColorPresentationRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),(0,me.attachPartialResult)(i,b))),onFoldingRanges:C=>i.onRequest(V.FoldingRangeRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),(0,me.attachPartialResult)(i,b))),onSelectionRanges:C=>i.onRequest(V.SelectionRangeRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),(0,me.attachPartialResult)(i,b))),onExecuteCommand:C=>i.onRequest(V.ExecuteCommandRequest.type,(b,x)=>C(b,x,(0,me.attachWorkDone)(i,b),void 0)),dispose:()=>i.dispose()};for(let C of h)C.attach(P);return i.onRequest(V.InitializeRequest.type,C=>{e.initialize(C),yn.string(C.trace)&&(a.trace=V.Trace.fromString(C.trace));for(let b of h)b.initialize(C.capabilities);if(A){let b=A(C,new V.CancellationTokenSource().token,(0,me.attachWorkDone)(i,C),void 0);return R(b).then(x=>{if(x instanceof V.ResponseError)return x;let G=x;G||(G={capabilities:{}});let Y=G.capabilities;Y||(Y={},G.capabilities=Y),Y.textDocumentSync===void 0||Y.textDocumentSync===null?Y.textDocumentSync=yn.number(P.__textDocumentSync)?P.__textDocumentSync:V.TextDocumentSyncKind.None:!yn.number(Y.textDocumentSync)&&!yn.number(Y.textDocumentSync.change)&&(Y.textDocumentSync.change=yn.number(P.__textDocumentSync)?P.__textDocumentSync:V.TextDocumentSyncKind.None);for(let ce of h)ce.fillServerCapabilities(Y);return G})}else{let b={capabilities:{textDocumentSync:V.TextDocumentSyncKind.None}};for(let x of h)x.fillServerCapabilities(b.capabilities);return b}}),i.onRequest(V.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,y)return y(new V.CancellationTokenSource().token)}),i.onNotification(V.ExitNotification.type,()=>{try{w&&w()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(V.SetTraceNotification.type,C=>{a.trace=V.Trace.fromString(C.value)}),P}De.createConnection=JK});var tg=d(or=>{"use strict";var QK=or&&or.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),BC=or&&or.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&QK(e,t,r)};Object.defineProperty(or,"__esModule",{value:!0});or.ProposedFeatures=or.NotebookDocuments=or.TextDocuments=or.SemanticTokensBuilder=void 0;var ZK=My();Object.defineProperty(or,"SemanticTokensBuilder",{enumerable:!0,get:function(){return ZK.SemanticTokensBuilder}});BC(xt(),or);var eW=jy();Object.defineProperty(or,"TextDocuments",{enumerable:!0,get:function(){return eW.TextDocuments}});var tW=Uy();Object.defineProperty(or,"NotebookDocuments",{enumerable:!0,get:function(){return tW.NotebookDocuments}});BC(WC(),or);var rW;(function(t){t.all={__brand:"features"}})(rW=or.ProposedFeatures||(or.ProposedFeatures={}))});var zC=d((xge,VC)=>{"use strict";VC.exports=xt()});var Fe=d(si=>{"use strict";var nW=si&&si.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),XC=si&&si.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&nW(e,t,r)};Object.defineProperty(si,"__esModule",{value:!0});si.createConnection=void 0;var Of=tg();XC(zC(),si);XC(tg(),si);var YC=!1,iW={initialize:t=>{},get shutdownReceived(){return YC},set shutdownReceived(t){YC=t},exit:t=>{}};function aW(t,e,r,n){let i,a,o,s;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),Of.ConnectionStrategy.is(t)||Of.ConnectionOptions.is(t)?s=t:(a=t,o=e,s=r);let u=l=>(0,Of.createProtocolConnection)(a,o,l,s);return(0,Of.createConnection)(u,iW,i)}si.createConnection=aW});var ig={};Yj(ig,{TextDocument:()=>rg});function ng(t,e){if(t.length<=1)return t;let r=t.length/2|0,n=t.slice(0,r),i=t.slice(r);ng(n,e),ng(i,e);let a=0,o=0,s=0;for(;a<n.length&&o<i.length;)e(n[a],i[o])<=0?t[s++]=n[a++]:t[s++]=i[o++];for(;a<n.length;)t[s++]=n[a++];for(;o<i.length;)t[s++]=i[o++];return t}function JC(t,e,r=0){let n=e?[r]:[];for(let i=0;i<t.length;i++){let a=t.charCodeAt(i);(a===13||a===10)&&(a===13&&i+1<t.length&&t.charCodeAt(i+1)===10&&i++,n.push(r+i+1))}return n}function QC(t){let e=t.start,r=t.end;return e.line>r.line||e.line===r.line&&e.character>r.character?{start:r,end:e}:t}function oW(t){let e=QC(t.range);return e!==t.range?{newText:t.newText,range:e}:t}var If,rg,ag=zj(()=>{"use strict";If=class t{constructor(e,r,n,i){this._uri=e,this._languageId=r,this._version=n,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let r=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(r,n)}return this._content}update(e,r){for(let n of e)if(t.isIncremental(n)){let i=QC(n.range),a=this.offsetAt(i.start),o=this.offsetAt(i.end);this._content=this._content.substring(0,a)+n.text+this._content.substring(o,this._content.length);let s=Math.max(i.start.line,0),u=Math.max(i.end.line,0),l=this._lineOffsets,c=JC(n.text,!1,a);if(u-s===c.length)for(let h=0,R=c.length;h<R;h++)l[h+s+1]=c[h];else c.length<1e4?l.splice(s+1,u-s,...c):this._lineOffsets=l=l.slice(0,s+1).concat(c,l.slice(u+1));let p=n.text.length-(o-a);if(p!==0)for(let h=s+1+c.length,R=l.length;h<R;h++)l[h]=l[h]+p}else if(t.isFull(n))this._content=n.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received");this._version=r}getLineOffsets(){return this._lineOffsets===void 0&&(this._lineOffsets=JC(this._content,!0)),this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let r=this.getLineOffsets(),n=0,i=r.length;if(i===0)return{line:0,character:e};for(;n<i;){let o=Math.floor((n+i)/2);r[o]>e?i=o:n=o+1}let a=n-1;return{line:a,character:e-r[a]}}offsetAt(e){let r=this.getLineOffsets();if(e.line>=r.length)return this._content.length;if(e.line<0)return 0;let n=r[e.line],i=e.line+1<r.length?r[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,i),n)}get lineCount(){return this.getLineOffsets().length}static isIncremental(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range!==void 0&&(r.rangeLength===void 0||typeof r.rangeLength=="number")}static isFull(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range===void 0&&r.rangeLength===void 0}};(function(t){function e(i,a,o,s){return new If(i,a,o,s)}t.create=e;function r(i,a,o){if(i instanceof If)return i.update(a,o),i;throw new Error("TextDocument.update: document must be created by TextDocument.create")}t.update=r;function n(i,a){let o=i.getText(),s=ng(a.map(oW),(c,p)=>{let h=c.range.start.line-p.range.start.line;return h===0?c.range.start.character-p.range.start.character:h}),u=0,l=[];for(let c of s){let p=i.offsetAt(c.range.start);if(p<u)throw new Error("Overlapping edit");p>u&&l.push(o.substring(u,p)),c.newText.length&&l.push(c.newText),u=i.offsetAt(c.range.end)}return l.push(o.substr(u)),l.join("")}t.applyEdits=n})(rg||(rg={}))});var mr=d(Yt=>{"use strict";Object.defineProperty(Yt,"__esModule",{value:!0});Yt.isRootCstNode=Yt.isLeafCstNode=Yt.isCompositeCstNode=Yt.AbstractAstReflection=Yt.isLinkingError=Yt.isAstNodeDescription=Yt.isReference=Yt.isAstNode=void 0;function sg(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}Yt.isAstNode=sg;function ZC(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}Yt.isReference=ZC;function sW(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}Yt.isAstNodeDescription=sW;function uW(t){return typeof t=="object"&&t!==null&&sg(t.container)&&ZC(t.reference)&&typeof t.message=="string"}Yt.isLinkingError=uW;var og=class{constructor(){this.subtypes={}}isInstance(e,r){return sg(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let a=this.computeIsSubtype(e,r);return n[r]=a,a}}};Yt.AbstractAstReflection=og;function eA(t){return typeof t=="object"&&t!==null&&"children"in t}Yt.isCompositeCstNode=eA;function lW(t){return typeof t=="object"&&t!==null&&"tokenType"in t}Yt.isLeafCstNode=lW;function cW(t){return eA(t)&&"fullText"in t}Yt.isRootCstNode=cW});var Xt=d(nt=>{"use strict";Object.defineProperty(nt,"__esModule",{value:!0});nt.Reduction=nt.TreeStreamImpl=nt.stream=nt.DONE_RESULT=nt.EMPTY_STREAM=nt.StreamImpl=void 0;var Ui=class t{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){return!!this.iterator().next().done}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new t(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return nt.DONE_RESULT})}join(e=","){let r=this.iterator(),n="",i,a=!1;do i=r.next(),i.done||(a&&(n+=e),n+=fW(i.value)),a=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,a=n.next();for(;!a.done;){if(i>=r&&a.value===e)return i;a=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new t(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?nt.DONE_RESULT:{done:!1,value:e(i)}})}filter(e){return new t(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return nt.DONE_RESULT})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,a=n.next();for(;!a.done;)i===void 0?i=a.value:i=e(i,a.value),a=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let a=this.recursiveReduce(e,r,n);return a===void 0?i.value:r(a,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new t(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let a=r.iterator.next();if(a.done)r.iterator=void 0;else return a}let{done:n,value:i}=this.nextFn(r.this);if(!n){let a=e(i);if(xf(a))r.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}}while(r.iterator);return nt.DONE_RESULT})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new t(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let o=n.iterator.next();if(o.done)n.iterator=void 0;else return o}let{done:i,value:a}=r.nextFn(n.this);if(!i)if(xf(a))n.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}while(n.iterator);return nt.DONE_RESULT})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new t(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new t(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?nt.DONE_RESULT:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let a=r?r(i):i;n.add(a)}return this.filter(i=>{let a=r?r(i):i;return!n.has(a)})}};nt.StreamImpl=Ui;function fW(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function xf(t){return!!t&&typeof t[Symbol.iterator]=="function"}nt.EMPTY_STREAM=new Ui(()=>{},()=>nt.DONE_RESULT);nt.DONE_RESULT=Object.freeze({done:!0,value:void 0});function dW(...t){if(t.length===1){let e=t[0];if(e instanceof Ui)return e;if(xf(e))return new Ui(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Ui(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:nt.DONE_RESULT)}return t.length>1?new Ui(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];xf(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return nt.DONE_RESULT}):nt.EMPTY_STREAM}nt.stream=dW;var ug=class extends Ui{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let o=i.iterators[i.iterators.length-1].next();if(o.done)i.iterators.pop();else return i.iterators.push(r(o.value)[Symbol.iterator]()),o}return nt.DONE_RESULT})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}};nt.TreeStreamImpl=ug;var pW;(function(t){function e(a){return a.reduce((o,s)=>o+s,0)}t.sum=e;function r(a){return a.reduce((o,s)=>o*s,0)}t.product=r;function n(a){return a.reduce((o,s)=>Math.min(o,s))}t.min=n;function i(a){return a.reduce((o,s)=>Math.max(o,s))}t.max=i})(pW=nt.Reduction||(nt.Reduction={}))});var ze=d(Te=>{"use strict";Object.defineProperty(Te,"__esModule",{value:!0});Te.getInteriorNodes=Te.getStartlineNode=Te.getNextNode=Te.getPreviousNode=Te.findLeafNodeAtOffset=Te.isCommentNode=Te.findCommentNode=Te.findDeclarationNodeAtOffset=Te.DefaultNameRegexp=Te.inRange=Te.compareRange=Te.RangeComparison=Te.toDocumentSegment=Te.tokenToRange=Te.isCstChildNode=Te.flattenCst=Te.streamCst=void 0;var gs=mr(),mW=Xt();function rA(t){return new mW.TreeStreamImpl(t,e=>(0,gs.isCompositeCstNode)(e)?e.children:[],{includeRoot:!0})}Te.streamCst=rA;function hW(t){return rA(t).filter(gs.isLeafCstNode)}Te.flattenCst=hW;function yW(t,e){for(;t.parent;)if(t=t.parent,t===e)return!0;return!1}Te.isCstChildNode=yW;function gW(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}Te.tokenToRange=gW;function vW(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}Te.toDocumentSegment=vW;var _o;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(_o=Te.RangeComparison||(Te.RangeComparison={}));function nA(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return _o.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return _o.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?_o.Inside:r?_o.OverlapBack:_o.OverlapFront}Te.compareRange=nA;function TW(t,e){return nA(t,e)>_o.After}Te.inRange=TW;Te.DefaultNameRegexp=/^[\w\p{L}]$/u;function _W(t,e,r=Te.DefaultNameRegexp){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return Lf(t,e)}}Te.findDeclarationNodeAtOffset=_W;function RW(t,e){if(t){let r=iA(t,!0);if(r&&lg(r,e))return r;if((0,gs.isRootCstNode)(t)){let n=t.children.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let a=t.children[i];if(lg(a,e))return a}}}}Te.findCommentNode=RW;function lg(t,e){return(0,gs.isLeafCstNode)(t)&&e.includes(t.tokenType.name)}Te.isCommentNode=lg;function Lf(t,e){if((0,gs.isLeafCstNode)(t))return t;if((0,gs.isCompositeCstNode)(t)){let r=0,n=t.children.length-1;for(;r<n;){let i=Math.floor((r+n)/2),a=t.children[i];if(a.offset>e)n=i-1;else if(a.end<=e)r=i+1;else return Lf(a,e)}if(r===n)return Lf(t.children[r],e)}}Te.findLeafNodeAtOffset=Lf;function iA(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(n===0)t=r;else{n--;let i=r.children[n];if(e||!i.hidden)return i}}}Te.getPreviousNode=iA;function bW(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(r.children.length-1===n)t=r;else{n++;let i=r.children[n];if(e||!i.hidden)return i}}}Te.getNextNode=bW;function SW(t){if(t.range.start.character===0)return t;let e=t.range.start.line,r=t,n;for(;t.parent;){let i=t.parent,a=n??i.children.indexOf(t);if(a===0?(t=i,n=void 0):(n=a-1,t=i.children[n]),t.range.start.line!==e)break;r=t}return r}Te.getStartlineNode=SW;function CW(t,e){let r=AW(t,e);return r?r.parent.children.slice(r.a+1,r.b):[]}Te.getInteriorNodes=CW;function AW(t,e){let r=tA(t),n=tA(e),i;for(let a=0;a<r.length&&a<n.length;a++){let o=r[a],s=n[a];if(o.parent===s.parent)i={parent:o.parent,a:o.index,b:s.index};else break}return i}function tA(t){let e=[];for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}});var ui=d((Tl,cg)=>{(function(t,e){if(typeof Tl=="object"&&typeof cg=="object")cg.exports=e();else if(typeof define=="function"&&define.amd)define([],e);else{var r=e();for(var n in r)(typeof Tl=="object"?Tl:t)[n]=r[n]}})(Tl,()=>(()=>{"use strict";var t={470:i=>{function a(u){if(typeof u!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(u))}function o(u,l){for(var c,p="",h=0,R=-1,y=0,A=0;A<=u.length;++A){if(A<u.length)c=u.charCodeAt(A);else{if(c===47)break;c=47}if(c===47){if(!(R===A-1||y===1))if(R!==A-1&&y===2){if(p.length<2||h!==2||p.charCodeAt(p.length-1)!==46||p.charCodeAt(p.length-2)!==46){if(p.length>2){var w=p.lastIndexOf("/");if(w!==p.length-1){w===-1?(p="",h=0):h=(p=p.slice(0,w)).length-1-p.lastIndexOf("/"),R=A,y=0;continue}}else if(p.length===2||p.length===1){p="",h=0,R=A,y=0;continue}}l&&(p.length>0?p+="/..":p="..",h=2)}else p.length>0?p+="/"+u.slice(R+1,A):p=u.slice(R+1,A),h=A-R-1;R=A,y=0}else c===46&&y!==-1?++y:y=-1}return p}var s={resolve:function(){for(var u,l="",c=!1,p=arguments.length-1;p>=-1&&!c;p--){var h;p>=0?h=arguments[p]:(u===void 0&&(u=process.cwd()),h=u),a(h),h.length!==0&&(l=h+"/"+l,c=h.charCodeAt(0)===47)}return l=o(l,!c),c?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(u){if(a(u),u.length===0)return".";var l=u.charCodeAt(0)===47,c=u.charCodeAt(u.length-1)===47;return(u=o(u,!l)).length!==0||l||(u="."),u.length>0&&c&&(u+="/"),l?"/"+u:u},isAbsolute:function(u){return a(u),u.length>0&&u.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var u,l=0;l<arguments.length;++l){var c=arguments[l];a(c),c.length>0&&(u===void 0?u=c:u+="/"+c)}return u===void 0?".":s.normalize(u)},relative:function(u,l){if(a(u),a(l),u===l||(u=s.resolve(u))===(l=s.resolve(l)))return"";for(var c=1;c<u.length&&u.charCodeAt(c)===47;++c);for(var p=u.length,h=p-c,R=1;R<l.length&&l.charCodeAt(R)===47;++R);for(var y=l.length-R,A=h<y?h:y,w=-1,P=0;P<=A;++P){if(P===A){if(y>A){if(l.charCodeAt(R+P)===47)return l.slice(R+P+1);if(P===0)return l.slice(R+P)}else h>A&&(u.charCodeAt(c+P)===47?w=P:P===0&&(w=0));break}var C=u.charCodeAt(c+P);if(C!==l.charCodeAt(R+P))break;C===47&&(w=P)}var b="";for(P=c+w+1;P<=p;++P)P!==p&&u.charCodeAt(P)!==47||(b.length===0?b+="..":b+="/..");return b.length>0?b+l.slice(R+w):(R+=w,l.charCodeAt(R)===47&&++R,l.slice(R))},_makeLong:function(u){return u},dirname:function(u){if(a(u),u.length===0)return".";for(var l=u.charCodeAt(0),c=l===47,p=-1,h=!0,R=u.length-1;R>=1;--R)if((l=u.charCodeAt(R))===47){if(!h){p=R;break}}else h=!1;return p===-1?c?"/":".":c&&p===1?"//":u.slice(0,p)},basename:function(u,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');a(u);var c,p=0,h=-1,R=!0;if(l!==void 0&&l.length>0&&l.length<=u.length){if(l.length===u.length&&l===u)return"";var y=l.length-1,A=-1;for(c=u.length-1;c>=0;--c){var w=u.charCodeAt(c);if(w===47){if(!R){p=c+1;break}}else A===-1&&(R=!1,A=c+1),y>=0&&(w===l.charCodeAt(y)?--y==-1&&(h=c):(y=-1,h=A))}return p===h?h=A:h===-1&&(h=u.length),u.slice(p,h)}for(c=u.length-1;c>=0;--c)if(u.charCodeAt(c)===47){if(!R){p=c+1;break}}else h===-1&&(R=!1,h=c+1);return h===-1?"":u.slice(p,h)},extname:function(u){a(u);for(var l=-1,c=0,p=-1,h=!0,R=0,y=u.length-1;y>=0;--y){var A=u.charCodeAt(y);if(A!==47)p===-1&&(h=!1,p=y+1),A===46?l===-1?l=y:R!==1&&(R=1):l!==-1&&(R=-1);else if(!h){c=y+1;break}}return l===-1||p===-1||R===0||R===1&&l===p-1&&l===c+1?"":u.slice(l,p)},format:function(u){if(u===null||typeof u!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof u);return function(l,c){var p=c.dir||c.root,h=c.base||(c.name||"")+(c.ext||"");return p?p===c.root?p+h:p+"/"+h:h}(0,u)},parse:function(u){a(u);var l={root:"",dir:"",base:"",ext:"",name:""};if(u.length===0)return l;var c,p=u.charCodeAt(0),h=p===47;h?(l.root="/",c=1):c=0;for(var R=-1,y=0,A=-1,w=!0,P=u.length-1,C=0;P>=c;--P)if((p=u.charCodeAt(P))!==47)A===-1&&(w=!1,A=P+1),p===46?R===-1?R=P:C!==1&&(C=1):R!==-1&&(C=-1);else if(!w){y=P+1;break}return R===-1||A===-1||C===0||C===1&&R===A-1&&R===y+1?A!==-1&&(l.base=l.name=y===0&&h?u.slice(1,A):u.slice(y,A)):(y===0&&h?(l.name=u.slice(1,R),l.base=u.slice(1,A)):(l.name=u.slice(y,R),l.base=u.slice(y,A)),l.ext=u.slice(R,A)),y>0?l.dir=u.slice(0,y-1):h&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};s.posix=s,i.exports=s},674:(i,a)=>{if(Object.defineProperty(a,"__esModule",{value:!0}),a.isWindows=void 0,typeof process=="object")a.isWindows=process.platform==="win32";else if(typeof navigator=="object"){let o=navigator.userAgent;a.isWindows=o.indexOf("Windows")>=0}},796:(i,a,o)=>{Object.defineProperty(a,"__esModule",{value:!0}),a.uriToFsPath=a.URI=void 0;let s=o(674),u=/^\w[\w\d+.-]*$/,l=/^\//,c=/^\/\//;function p(W,I){if(!W.scheme&&I)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${W.authority}", path: "${W.path}", query: "${W.query}", fragment: "${W.fragment}"}`);if(W.scheme&&!u.test(W.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(W.path){if(W.authority){if(!l.test(W.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(c.test(W.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let h="",R="/",y=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class A{static isUri(I){return I instanceof A||!!I&&typeof I.authority=="string"&&typeof I.fragment=="string"&&typeof I.path=="string"&&typeof I.query=="string"&&typeof I.scheme=="string"&&typeof I.fsPath=="string"&&typeof I.with=="function"&&typeof I.toString=="function"}scheme;authority;path;query;fragment;constructor(I,H,X,be,he,le=!1){typeof I=="object"?(this.scheme=I.scheme||h,this.authority=I.authority||h,this.path=I.path||h,this.query=I.query||h,this.fragment=I.fragment||h):(this.scheme=function(st,et){return st||et?st:"file"}(I,le),this.authority=H||h,this.path=function(st,et){switch(st){case"https":case"http":case"file":et?et[0]!==R&&(et=R+et):et=R}return et}(this.scheme,X||h),this.query=be||h,this.fragment=he||h,p(this,le))}get fsPath(){return G(this,!1)}with(I){if(!I)return this;let{scheme:H,authority:X,path:be,query:he,fragment:le}=I;return H===void 0?H=this.scheme:H===null&&(H=h),X===void 0?X=this.authority:X===null&&(X=h),be===void 0?be=this.path:be===null&&(be=h),he===void 0?he=this.query:he===null&&(he=h),le===void 0?le=this.fragment:le===null&&(le=h),H===this.scheme&&X===this.authority&&be===this.path&&he===this.query&&le===this.fragment?this:new P(H,X,be,he,le)}static parse(I,H=!1){let X=y.exec(I);return X?new P(X[2]||h,we(X[4]||h),we(X[5]||h),we(X[7]||h),we(X[9]||h),H):new P(h,h,h,h,h)}static file(I){let H=h;if(s.isWindows&&(I=I.replace(/\\/g,R)),I[0]===R&&I[1]===R){let X=I.indexOf(R,2);X===-1?(H=I.substring(2),I=R):(H=I.substring(2,X),I=I.substring(X)||R)}return new P("file",H,I,h,h)}static from(I){let H=new P(I.scheme,I.authority,I.path,I.query,I.fragment);return p(H,!0),H}toString(I=!1){return Y(this,I)}toJSON(){return this}static revive(I){if(I){if(I instanceof A)return I;{let H=new P(I);return H._formatted=I.external,H._fsPath=I._sep===w?I.fsPath:null,H}}return I}}a.URI=A;let w=s.isWindows?1:void 0;class P extends A{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=G(this,!1)),this._fsPath}toString(I=!1){return I?Y(this,!0):(this._formatted||(this._formatted=Y(this,!1)),this._formatted)}toJSON(){let I={$mid:1};return this._fsPath&&(I.fsPath=this._fsPath,I._sep=w),this._formatted&&(I.external=this._formatted),this.path&&(I.path=this.path),this.scheme&&(I.scheme=this.scheme),this.authority&&(I.authority=this.authority),this.query&&(I.query=this.query),this.fragment&&(I.fragment=this.fragment),I}}let C={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function b(W,I,H){let X,be=-1;for(let he=0;he<W.length;he++){let le=W.charCodeAt(he);if(le>=97&&le<=122||le>=65&&le<=90||le>=48&&le<=57||le===45||le===46||le===95||le===126||I&&le===47||H&&le===91||H&&le===93||H&&le===58)be!==-1&&(X+=encodeURIComponent(W.substring(be,he)),be=-1),X!==void 0&&(X+=W.charAt(he));else{X===void 0&&(X=W.substr(0,he));let st=C[le];st!==void 0?(be!==-1&&(X+=encodeURIComponent(W.substring(be,he)),be=-1),X+=st):be===-1&&(be=he)}}return be!==-1&&(X+=encodeURIComponent(W.substring(be))),X!==void 0?X:W}function x(W){let I;for(let H=0;H<W.length;H++){let X=W.charCodeAt(H);X===35||X===63?(I===void 0&&(I=W.substr(0,H)),I+=C[X]):I!==void 0&&(I+=W[H])}return I!==void 0?I:W}function G(W,I){let H;return H=W.authority&&W.path.length>1&&W.scheme==="file"?`//${W.authority}${W.path}`:W.path.charCodeAt(0)===47&&(W.path.charCodeAt(1)>=65&&W.path.charCodeAt(1)<=90||W.path.charCodeAt(1)>=97&&W.path.charCodeAt(1)<=122)&&W.path.charCodeAt(2)===58?I?W.path.substr(1):W.path[1].toLowerCase()+W.path.substr(2):W.path,s.isWindows&&(H=H.replace(/\//g,"\\")),H}function Y(W,I){let H=I?x:b,X="",{scheme:be,authority:he,path:le,query:st,fragment:et}=W;if(be&&(X+=be,X+=":"),(he||be==="file")&&(X+=R,X+=R),he){let Ne=he.indexOf("@");if(Ne!==-1){let Tt=he.substr(0,Ne);he=he.substr(Ne+1),Ne=Tt.lastIndexOf(":"),Ne===-1?X+=H(Tt,!1,!1):(X+=H(Tt.substr(0,Ne),!1,!1),X+=":",X+=H(Tt.substr(Ne+1),!1,!0)),X+="@"}he=he.toLowerCase(),Ne=he.lastIndexOf(":"),Ne===-1?X+=H(he,!1,!0):(X+=H(he.substr(0,Ne),!1,!0),X+=he.substr(Ne))}if(le){if(le.length>=3&&le.charCodeAt(0)===47&&le.charCodeAt(2)===58){let Ne=le.charCodeAt(1);Ne>=65&&Ne<=90&&(le=`/${String.fromCharCode(Ne+32)}:${le.substr(3)}`)}else if(le.length>=2&&le.charCodeAt(1)===58){let Ne=le.charCodeAt(0);Ne>=65&&Ne<=90&&(le=`${String.fromCharCode(Ne+32)}:${le.substr(2)}`)}X+=H(le,!0,!1)}return st&&(X+="?",X+=H(st,!1,!1)),et&&(X+="#",X+=I?et:b(et,!1,!1)),X}function ce(W){try{return decodeURIComponent(W)}catch{return W.length>3?W.substr(0,3)+ce(W.substr(3)):W}}a.uriToFsPath=G;let Ke=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function we(W){return W.match(Ke)?W.replace(Ke,I=>ce(I)):W}},679:function(i,a,o){var s=this&&this.__createBinding||(Object.create?function(y,A,w,P){P===void 0&&(P=w);var C=Object.getOwnPropertyDescriptor(A,w);C&&!("get"in C?!A.__esModule:C.writable||C.configurable)||(C={enumerable:!0,get:function(){return A[w]}}),Object.defineProperty(y,P,C)}:function(y,A,w,P){P===void 0&&(P=w),y[P]=A[w]}),u=this&&this.__setModuleDefault||(Object.create?function(y,A){Object.defineProperty(y,"default",{enumerable:!0,value:A})}:function(y,A){y.default=A}),l=this&&this.__importStar||function(y){if(y&&y.__esModule)return y;var A={};if(y!=null)for(var w in y)w!=="default"&&Object.prototype.hasOwnProperty.call(y,w)&&s(A,y,w);return u(A,y),A};Object.defineProperty(a,"__esModule",{value:!0}),a.Utils=void 0;let c=l(o(470)),p=c.posix||c,h="/";var R;(function(y){y.joinPath=function(A,...w){return A.with({path:p.join(A.path,...w)})},y.resolvePath=function(A,...w){let P=A.path,C=!1;P[0]!==h&&(P=h+P,C=!0);let b=p.resolve(P,...w);return C&&b[0]===h&&!A.authority&&(b=b.substring(1)),A.with({path:b})},y.dirname=function(A){if(A.path.length===0||A.path===h)return A;let w=p.dirname(A.path);return w.length===1&&w.charCodeAt(0)===46&&(w=""),A.with({path:w})},y.basename=function(A){return p.basename(A.path)},y.extname=function(A){return p.extname(A.path)}})(R||(a.Utils=R={}))}},e={};function r(i){var a=e[i];if(a!==void 0)return a.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,r),o.exports}var n={};return(()=>{var i=n;Object.defineProperty(i,"__esModule",{value:!0}),i.Utils=i.URI=void 0;let a=r(796);Object.defineProperty(i,"URI",{enumerable:!0,get:function(){return a.URI}});let o=r(679);Object.defineProperty(i,"Utils",{enumerable:!0,get:function(){return o.Utils}})})(),n})())});var _l=d(vs=>{"use strict";Object.defineProperty(vs,"__esModule",{value:!0});vs.eagerLoad=vs.inject=void 0;function EW(t,e,r,n){let i=[t,e,r,n].reduce(lA,{});return uA(i)}vs.inject=EW;var fg=Symbol("isProxy");function sA(t){if(t&&t[fg])for(let e of Object.values(t))sA(e);return t}vs.eagerLoad=sA;function uA(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>oA(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(oA(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),fg]});return r[fg]=!0,r}var aA=Symbol();function oA(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===aA)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/di/cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=aA;try{t[e]=typeof i=="function"?i(n):uA(i,n)}catch(a){throw t[e]=a instanceof Error?a:void 0,a}return t[e]}else return}function lA(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=lA(i,n):t[r]=n}}return t}});var Hn=d(qf=>{"use strict";Object.defineProperty(qf,"__esModule",{value:!0});qf.MultiMap=void 0;var Ts=Xt(),dg=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return Ts.Reduction.sum((0,Ts.stream)(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return(0,Ts.stream)(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return(0,Ts.stream)(this.map.keys())}values(){return(0,Ts.stream)(this.map.values()).flat()}entriesGroupedByKey(){return(0,Ts.stream)(this.map.entries())}};qf.MultiMap=dg});var je=d(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.isUnionType=_.UnionType=_.isTypeAttribute=_.TypeAttribute=_.isType=_.Type=_.isTerminalRule=_.TerminalRule=_.isSimpleType=_.SimpleType=_.isReturnType=_.ReturnType=_.isReferenceType=_.ReferenceType=_.isParserRule=_.ParserRule=_.isParameterReference=_.ParameterReference=_.isParameter=_.Parameter=_.isNegation=_.Negation=_.isNamedArgument=_.NamedArgument=_.isLiteralCondition=_.LiteralCondition=_.isInterface=_.Interface=_.isInferredType=_.InferredType=_.isGrammarImport=_.GrammarImport=_.isGrammar=_.Grammar=_.isDisjunction=_.Disjunction=_.isConjunction=_.Conjunction=_.isArrayType=_.ArrayType=_.isAbstractElement=_.AbstractElement=_.isTypeDefinition=_.TypeDefinition=_.isCondition=_.Condition=_.isAbstractType=_.AbstractType=_.isAbstractRule=_.AbstractRule=void 0;_.reflection=_.LangiumGrammarAstReflection=_.isWildcard=_.Wildcard=_.isUntilToken=_.UntilToken=_.isUnorderedGroup=_.UnorderedGroup=_.isTerminalRuleCall=_.TerminalRuleCall=_.isTerminalGroup=_.TerminalGroup=_.isTerminalAlternatives=_.TerminalAlternatives=_.isRuleCall=_.RuleCall=_.isRegexToken=_.RegexToken=_.isNegatedToken=_.NegatedToken=_.isKeyword=_.Keyword=_.isGroup=_.Group=_.isCrossReference=_.CrossReference=_.isCharacterRange=_.CharacterRange=_.isAssignment=_.Assignment=_.isAlternatives=_.Alternatives=_.isAction=_.Action=void 0;var PW=mr();_.AbstractRule="AbstractRule";function kW(t){return _.reflection.isInstance(t,_.AbstractRule)}_.isAbstractRule=kW;_.AbstractType="AbstractType";function wW(t){return _.reflection.isInstance(t,_.AbstractType)}_.isAbstractType=wW;_.Condition="Condition";function NW(t){return _.reflection.isInstance(t,_.Condition)}_.isCondition=NW;_.TypeDefinition="TypeDefinition";function DW(t){return _.reflection.isInstance(t,_.TypeDefinition)}_.isTypeDefinition=DW;_.AbstractElement="AbstractElement";function $W(t){return _.reflection.isInstance(t,_.AbstractElement)}_.isAbstractElement=$W;_.ArrayType="ArrayType";function OW(t){return _.reflection.isInstance(t,_.ArrayType)}_.isArrayType=OW;_.Conjunction="Conjunction";function IW(t){return _.reflection.isInstance(t,_.Conjunction)}_.isConjunction=IW;_.Disjunction="Disjunction";function xW(t){return _.reflection.isInstance(t,_.Disjunction)}_.isDisjunction=xW;_.Grammar="Grammar";function LW(t){return _.reflection.isInstance(t,_.Grammar)}_.isGrammar=LW;_.GrammarImport="GrammarImport";function qW(t){return _.reflection.isInstance(t,_.GrammarImport)}_.isGrammarImport=qW;_.InferredType="InferredType";function MW(t){return _.reflection.isInstance(t,_.InferredType)}_.isInferredType=MW;_.Interface="Interface";function FW(t){return _.reflection.isInstance(t,_.Interface)}_.isInterface=FW;_.LiteralCondition="LiteralCondition";function jW(t){return _.reflection.isInstance(t,_.LiteralCondition)}_.isLiteralCondition=jW;_.NamedArgument="NamedArgument";function GW(t){return _.reflection.isInstance(t,_.NamedArgument)}_.isNamedArgument=GW;_.Negation="Negation";function UW(t){return _.reflection.isInstance(t,_.Negation)}_.isNegation=UW;_.Parameter="Parameter";function HW(t){return _.reflection.isInstance(t,_.Parameter)}_.isParameter=HW;_.ParameterReference="ParameterReference";function KW(t){return _.reflection.isInstance(t,_.ParameterReference)}_.isParameterReference=KW;_.ParserRule="ParserRule";function WW(t){return _.reflection.isInstance(t,_.ParserRule)}_.isParserRule=WW;_.ReferenceType="ReferenceType";function BW(t){return _.reflection.isInstance(t,_.ReferenceType)}_.isReferenceType=BW;_.ReturnType="ReturnType";function VW(t){return _.reflection.isInstance(t,_.ReturnType)}_.isReturnType=VW;_.SimpleType="SimpleType";function zW(t){return _.reflection.isInstance(t,_.SimpleType)}_.isSimpleType=zW;_.TerminalRule="TerminalRule";function YW(t){return _.reflection.isInstance(t,_.TerminalRule)}_.isTerminalRule=YW;_.Type="Type";function XW(t){return _.reflection.isInstance(t,_.Type)}_.isType=XW;_.TypeAttribute="TypeAttribute";function JW(t){return _.reflection.isInstance(t,_.TypeAttribute)}_.isTypeAttribute=JW;_.UnionType="UnionType";function QW(t){return _.reflection.isInstance(t,_.UnionType)}_.isUnionType=QW;_.Action="Action";function ZW(t){return _.reflection.isInstance(t,_.Action)}_.isAction=ZW;_.Alternatives="Alternatives";function eB(t){return _.reflection.isInstance(t,_.Alternatives)}_.isAlternatives=eB;_.Assignment="Assignment";function tB(t){return _.reflection.isInstance(t,_.Assignment)}_.isAssignment=tB;_.CharacterRange="CharacterRange";function rB(t){return _.reflection.isInstance(t,_.CharacterRange)}_.isCharacterRange=rB;_.CrossReference="CrossReference";function nB(t){return _.reflection.isInstance(t,_.CrossReference)}_.isCrossReference=nB;_.Group="Group";function iB(t){return _.reflection.isInstance(t,_.Group)}_.isGroup=iB;_.Keyword="Keyword";function aB(t){return _.reflection.isInstance(t,_.Keyword)}_.isKeyword=aB;_.NegatedToken="NegatedToken";function oB(t){return _.reflection.isInstance(t,_.NegatedToken)}_.isNegatedToken=oB;_.RegexToken="RegexToken";function sB(t){return _.reflection.isInstance(t,_.RegexToken)}_.isRegexToken=sB;_.RuleCall="RuleCall";function uB(t){return _.reflection.isInstance(t,_.RuleCall)}_.isRuleCall=uB;_.TerminalAlternatives="TerminalAlternatives";function lB(t){return _.reflection.isInstance(t,_.TerminalAlternatives)}_.isTerminalAlternatives=lB;_.TerminalGroup="TerminalGroup";function cB(t){return _.reflection.isInstance(t,_.TerminalGroup)}_.isTerminalGroup=cB;_.TerminalRuleCall="TerminalRuleCall";function fB(t){return _.reflection.isInstance(t,_.TerminalRuleCall)}_.isTerminalRuleCall=fB;_.UnorderedGroup="UnorderedGroup";function dB(t){return _.reflection.isInstance(t,_.UnorderedGroup)}_.isUnorderedGroup=dB;_.UntilToken="UntilToken";function pB(t){return _.reflection.isInstance(t,_.UntilToken)}_.isUntilToken=pB;_.Wildcard="Wildcard";function mB(t){return _.reflection.isInstance(t,_.Wildcard)}_.isWildcard=mB;var Mf=class extends PW.AbstractAstReflection{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case _.Action:return this.isSubtype(_.AbstractElement,r)||this.isSubtype(_.AbstractType,r);case _.Alternatives:case _.Assignment:case _.CharacterRange:case _.CrossReference:case _.Group:case _.Keyword:case _.NegatedToken:case _.RegexToken:case _.RuleCall:case _.TerminalAlternatives:case _.TerminalGroup:case _.TerminalRuleCall:case _.UnorderedGroup:case _.UntilToken:case _.Wildcard:return this.isSubtype(_.AbstractElement,r);case _.ArrayType:case _.ReferenceType:case _.SimpleType:case _.UnionType:return this.isSubtype(_.TypeDefinition,r);case _.Conjunction:case _.Disjunction:case _.LiteralCondition:case _.Negation:case _.ParameterReference:return this.isSubtype(_.Condition,r);case _.Interface:case _.Type:return this.isSubtype(_.AbstractType,r);case _.ParserRule:return this.isSubtype(_.AbstractRule,r)||this.isSubtype(_.AbstractType,r);case _.TerminalRule:return this.isSubtype(_.AbstractRule,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return _.AbstractType;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return _.AbstractRule;case"Grammar:usedGrammars":return _.Grammar;case"NamedArgument:parameter":case"ParameterReference:parameter":return _.Parameter;case"TerminalRuleCall:rule":return _.TerminalRule;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}};_.LangiumGrammarAstReflection=Mf;_.reflection=new Mf});var Ie=d(dt=>{"use strict";Object.defineProperty(dt,"__esModule",{value:!0});dt.copyAstNode=dt.findLocalReferences=dt.streamReferences=dt.streamAst=dt.streamAllContents=dt.streamContents=dt.findRootNode=dt.getDocument=dt.hasContainerOfType=dt.getContainerOfType=dt.linkContentToContainer=void 0;var li=mr(),ka=Xt(),hB=ze();function cA(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{(0,li.isAstNode)(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):(0,li.isAstNode)(r)&&(r.$container=t,r.$containerProperty=e))}dt.linkContentToContainer=cA;function yB(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}dt.getContainerOfType=yB;function gB(t,e){let r=t;for(;r;){if(e(r))return!0;r=r.$container}return!1}dt.hasContainerOfType=gB;function fA(t){let r=dA(t).$document;if(!r)throw new Error("AST node has no document.");return r}dt.getDocument=fA;function dA(t){for(;t.$container;)t=t.$container;return t}dt.findRootNode=dA;function hg(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new ka.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let a=t[i];if((0,li.isAstNode)(a)){if(n.keyIndex++,pg(a,r))return{done:!1,value:a}}else if(Array.isArray(a)){for(;n.arrayIndex<a.length;){let o=n.arrayIndex++,s=a[o];if((0,li.isAstNode)(s)&&pg(s,r))return{done:!1,value:s}}n.arrayIndex=0}}n.keyIndex++}return ka.DONE_RESULT})}dt.streamContents=hg;function vB(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new ka.TreeStreamImpl(t,r=>hg(r,e))}dt.streamAllContents=vB;function pA(t,e){if(t){if(e?.range&&!pg(t,e.range))return new ka.TreeStreamImpl(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new ka.TreeStreamImpl(t,r=>hg(r,e),{includeRoot:!0})}dt.streamAst=pA;function pg(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?(0,hB.inRange)(n,e):!1}function mA(t){return new ka.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if((0,li.isReference)(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,a=n[i];if((0,li.isReference)(a))return{done:!1,value:{reference:a,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return ka.DONE_RESULT})}dt.streamReferences=mA;function TB(t,e=fA(t).parseResult.value){let r=[];return pA(e).forEach(n=>{mA(n).forEach(i=>{i.reference.ref===t&&r.push(i.reference)})}),(0,ka.stream)(r)}dt.findLocalReferences=TB;function mg(t,e){let r={$type:t.$type};for(let[n,i]of Object.entries(t))if(!n.startsWith("$"))if((0,li.isAstNode)(i))r[n]=mg(i,e);else if((0,li.isReference)(i))r[n]=e(r,n,i.$refNode,i.$refText);else if(Array.isArray(i)){let a=[];for(let o of i)(0,li.isAstNode)(o)?a.push(mg(o,e)):(0,li.isReference)(o)?a.push(e(r,n,o.$refNode,o.$refText)):a.push(o);r[n]=a}else r[n]=i;return cA(r),r}dt.copyAstNode=mg});var gA=d(Ff=>{"use strict";Object.defineProperty(Ff,"__esModule",{value:!0});Ff.getSourceRegion=void 0;var hA=Ie(),_B=Nt(),RB=Xt();function bB(t){var e,r;if(t){if("astNode"in t)return AB(t);if(Array.isArray(t))return t.reduce(yA,void 0);{let n=t,i=SB(n)?CB((r=(e=n?.root)===null||e===void 0?void 0:e.element)!==null&&r!==void 0?r:n?.element):void 0;return _s(n,i)}}else return}Ff.getSourceRegion=bB;function SB(t){return typeof t<"u"&&"element"in t&&"text"in t}function CB(t){try{return(0,hA.getDocument)(t).uri.toString()}catch{return}}function AB(t){var e,r;let{astNode:n,property:i,index:a}=t??{},o=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||o===void 0)){if(i===void 0)return _s(o,yg(n));{let s=u=>a!==void 0&&a>-1&&Array.isArray(n[i])?a<u.length?u[a]:void 0:u.reduce(yA,void 0);if(!((r=o.assignments)===null||r===void 0)&&r[i]){let u=s(o.assignments[i]);return u&&_s(u,yg(n))}else if(n.$cstNode){let u=s((0,_B.findNodesForProperty)(n.$cstNode,i));return u&&_s(u,yg(n))}else return}}}function yg(t){var e,r,n,i;return t.$cstNode?(r=(e=(0,hA.getDocument)(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new RB.TreeStreamImpl(t,a=>a.$container?[a.$container]:[]).find(a=>{var o;return(o=a.$textRegion)===null||o===void 0?void 0:o.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function _s(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e??(e=t.fileURI),e&&(i.fileURI=e),i}function yA(t,e){var r,n;if(t){if(!e)return t&&_s(t)}else return e&&_s(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,a=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,o=Math.min(t.offset,e.offset),s=Math.max(i,a),u=s-o,l={offset:o,end:s,length:u};if(t.range&&e.range&&(l.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let c=t.fileURI,p=e.fileURI,h=c&&p&&c!==p?`<unmergable text regions of ${c}, ${p}>`:c??p;l.fileURI=h}return l}});var bA=d(jf=>{"use strict";Object.defineProperty(jf,"__esModule",{value:!0});jf.processGeneratorNode=void 0;var Rl=Ro(),EB=gA(),gg=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[]}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=PB(e,this.currentPosition,n=>{var i,a;return(a=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||a===void 0?void 0:a.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function PB(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var a,o;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((a=n.children)===null||a===void 0?void 0:a.length)===0&&delete n.children,!((o=n.targetRegion)===null||o===void 0)&&o.length&&r(n),delete n.complete,n}};return n}function kB(t,e){let r=new gg(e),n=r.pushTraceRegion(void 0);vA(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,a=i?.targetRegion,o=n.targetRegion;return a&&i.sourceRegion&&a.offset===o.offset&&a.length===o.length?{text:r.content,trace:i}:{text:r.content,trace:n}}jf.processGeneratorNode=kB;function vA(t,e){typeof t=="string"?wB(t,e):t instanceof Rl.IndentNode?NB(t,e):t instanceof Rl.CompositeGeneratorNode?RA(t,e):t instanceof Rl.NewLineNode&&DB(t,e)}function TA(t,e){return typeof t=="string"?t.length!==0:t instanceof Rl.CompositeGeneratorNode?t.contents.some(r=>TA(r,e)):t instanceof Rl.NewLineNode?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function wB(t,e){t&&(e.pendingIndent&&_A(e,!1),e.append(t))}function _A(t,e){var r;let n="";for(let i of t.relevantIndents.filter(a=>a.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function RA(t,e){let r,n=(0,EB.getSourceRegion)(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)vA(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function NB(t,e){var r;if(TA(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),RA(t,e)}finally{e.decreaseIndent()}}}function DB(t,e){t.ifNotEmpty&&!$B(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&_A(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function $B(t){return t.trimStart()!==""}});var Gf=d(qt=>{"use strict";Object.defineProperty(qt,"__esModule",{value:!0});qt.normalizeEOL=qt.findIndentation=qt.NEWLINE_REGEXP=qt.SNLE=qt.expandToString=qt.expandToStringWithNL=void 0;var bl=Ro();function OB(t,...e){return SA(t,...e)+bl.EOL}qt.expandToStringWithNL=OB;function SA(t,...e){let r=e.reduce((o,s,u)=>{var l;return o+(s===void 0?qt.SNLE:xB((0,bl.toString)(s),o))+((l=t[u+1])!==null&&l!==void 0?l:"")},t[0]).split(qt.NEWLINE_REGEXP).filter(o=>o.trim()!==qt.SNLE).map(o=>o.replace(qt.SNLE,"").trimRight());r=r.length>1&&r[0].trim().length===0?r.slice(1):r,r=r.length!==0&&r[r.length-1].trimRight().length===0?r.slice(0,r.length-1):r;let a=CA(r);return r.map(o=>o.slice(a).trimRight()).join(bl.EOL)}qt.expandToString=SA;qt.SNLE=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__");qt.NEWLINE_REGEXP=/\r?\n/g;var IB=/\S|$/;function xB(t,e){let r=Math.max(0,e.length-e.lastIndexOf(`
`)-1),n=" ".repeat(r);return t.replace(qt.NEWLINE_REGEXP,bl.EOL+n)}function CA(t){let e=t.filter(n=>n.length>0).map(n=>n.search(IB)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}qt.findIndentation=CA;function LB(t){return t.replace(qt.NEWLINE_REGEXP,bl.EOL)}qt.normalizeEOL=LB});var _g=d(wa=>{"use strict";Object.defineProperty(wa,"__esModule",{value:!0});wa.expandTracedToNodeIf=wa.expandTracedToNode=wa.expandToNode=void 0;var Hf=Ro(),Tg=Gf();function AA(t,...e){let r=MB(t),n=FB(t,e,r);return GB(n)}wa.expandToNode=AA;function EA(t,e,r){return(n,...i)=>(0,Hf.traceToNode)(t,e,r)(AA(n,...i))}wa.expandTracedToNode=EA;function qB(t,e,r,n){return t?EA(typeof e=="function"?e():e,r,n):()=>{}}wa.expandTracedToNodeIf=qB;function MB(t){let e=t.join("_").split(Tg.NEWLINE_REGEXP),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(o=>o.length!==0);let a=(0,Tg.findIndentation)(i);return{indentation:a,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<a||!e[e.length-1].startsWith(i[0].substring(0,a)))}}}function FB(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:a}){let o=[];t.forEach((l,c)=>{o.push(...l.split(Tg.NEWLINE_REGEXP).map((p,h)=>h===0||p.length<r?p:p.substring(r)).reduce(c===0?(p,h,R)=>R===0?n?[]:[h]:R===1&&p.length===0?[h]:p.concat(Uf,h):(p,h,R)=>R===0?[h]:p.concat(Uf,h),[]).filter(p=>!(typeof p=="string"&&p.length===0)).concat((0,Hf.isGeneratorNode)(e[c])?e[c]:e[c]!==void 0?new Hf.CompositeGeneratorNode(String(e[c])):c<e.length?PA:[]))});let s=o.length,u=s!==0?o[s-1]:void 0;return(i||a)&&typeof u=="string"&&u.trim().length===0?n&&s!==1&&o[s-2]===Uf?o.slice(0,s-2):o.slice(0,s-1):o}var Uf={isNewLine:!0},PA={isUndefinedSegment:!0},vg=t=>t===Uf,jB=t=>t===PA;function GB(t){return t.reduce((r,n,i)=>jB(n)?r:vg(n)?{node:i===0||vg(t[i-1])||typeof t[i-1]=="string"?r.node.appendNewLine():r.node.appendNewLineIfNotEmpty()}:(()=>{var a;let o=(i===0||vg(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimLeft().length):"",s;return{node:r.indented?r.node:o.length!==0?r.node.indent({indentation:o,indentImmediately:!1,indentedChildren:u=>s=u.append(n)}):r.node.append(n),indented:s??((a=r.indented)===null||a===void 0?void 0:a.append(n))}})(),{node:new Hf.CompositeGeneratorNode}).node}});var Ro=d(Ge=>{"use strict";Object.defineProperty(Ge,"__esModule",{value:!0});Ge.NLEmpty=Ge.NL=Ge.NewLineNode=Ge.IndentNode=Ge.traceToNodeIf=Ge.traceToNode=Ge.CompositeGeneratorNode=Ge.toStringAndTrace=Ge.toString=Ge.isNewLineNode=Ge.isGeneratorNode=Ge.EOL=void 0;var UB=mr(),wA=bA(),kA=_g();Ge.EOL=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function NA(t){return t instanceof bo||t instanceof Sl||t instanceof So}Ge.isGeneratorNode=NA;function HB(t){return t instanceof So}Ge.isNewLineNode=HB;function KB(t,e){return NA(t)?(0,wA.processGeneratorNode)(t,e).text:String(t)}Ge.toString=KB;function WB(t,e){return(0,wA.processGeneratorNode)(t,e)}Ge.toStringAndTrace=WB;var bo=class t{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if((0,UB.isAstNode)(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append(Ge.NL)}appendNewLineIf(e){return e?this.append(Ge.NL):this}appendNewLineIfNotEmpty(){return this.append(Ge.NLEmpty)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append((0,kA.expandToNode)(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:a}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},o=new Sl(n,a,i);return this.contents.push(o),Array.isArray(r)?o.append(...r):r&&o.append(r),this}appendTraced(e,r,n){return i=>this.append(new t().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...a)=>this.append((0,kA.expandTracedToNode)(e,r,n)(i,...a))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};Ge.CompositeGeneratorNode=bo;function DA(t,e,r){return n=>n instanceof bo&&n.tracedSource===void 0?n.trace(t,e,r):new bo().trace(t,e,r).append(n)}Ge.traceToNode=DA;function BB(t,e,r,n){return t?DA(typeof e=="function"?e():e,r,n):()=>{}}Ge.traceToNodeIf=BB;var Sl=class extends bo{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}};Ge.IndentNode=Sl;var So=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??Ge.EOL,this.ifNotEmpty=r}};Ge.NewLineNode=So;Ge.NL=new So;Ge.NLEmpty=new So(void 0,!0)});var Ss=d(Ue=>{"use strict";Object.defineProperty(Ue,"__esModule",{value:!0});Ue.propertyTypeToString=Ue.isTypeAssignable=Ue.TypeResolutionError=Ue.InterfaceType=Ue.UnionType=Ue.isInterfaceType=Ue.isUnionType=Ue.isStringType=Ue.isPrimitiveType=Ue.isValueType=Ue.flattenPropertyUnion=Ue.isPropertyUnion=Ue.isArrayType=Ue.isReferenceType=void 0;var pt=Ro(),Rs=Cs();function Al(t){return"referenceType"in t}Ue.isReferenceType=Al;function El(t){return"elementType"in t}Ue.isArrayType=El;function Eo(t){return"types"in t}Ue.isPropertyUnion=Eo;function OA(t){if(Eo(t)){let e=[];for(let r of t.types)e.push(...OA(r));return e}else return[t]}Ue.flattenPropertyUnion=OA;function Cl(t){return"value"in t}Ue.isValueType=Cl;function bs(t){return"primitive"in t}Ue.isPrimitiveType=bs;function Kf(t){return"string"in t}Ue.isStringType=Kf;function bg(t){return t&&"type"in t}Ue.isUnionType=bg;function Eg(t){return t&&"properties"in t}Ue.isInterfaceType=Eg;var Sg=class{constructor(e,r){var n,i;this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.name=e,this.reflection=(n=r?.reflection)!==null&&n!==void 0?n:!1,this.declared=(i=r?.declared)!==null&&i!==void 0?i:!1}toAstTypesString(e){let r=new pt.CompositeGeneratorNode;return r.append(`export type ${this.name} = ${Ao(this.type,"AstType")};`,pt.NL),this.reflection&&e&&(r.append(pt.NL),LA(r,this.name)),(0,pt.toString)(r)}toDeclaredTypesString(e){let r=new pt.CompositeGeneratorNode;return r.append(`type ${Pg(this.name,e)} = ${Ao(this.type,"DeclaredType")};`,pt.NL),(0,pt.toString)(r)}};Ue.UnionType=Sg;var Cg=class t{get superProperties(){let e=new Map;for(let r of this.properties)e.set(r.name,r);for(let r of this.interfaceSuperTypes){let n=r.superProperties;for(let i of n)e.has(i.name)||e.set(i.name,i)}return Array.from(e.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e);return Array.from(e.values())}getSubTypeProperties(e,r){let n=Eg(e)?e.properties:[];for(let i of n)r.has(i.name)||r.set(i.name,i);for(let i of e.subTypes)this.getSubTypeProperties(i,r)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof t)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new pt.CompositeGeneratorNode,n=this.interfaceSuperTypes.map(a=>a.name),i=n.length>0?(0,Rs.distinctAndSorted)([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,pt.NL),r.indent(a=>{this.containerTypes.size>0&&a.append(`readonly $container: ${(0,Rs.distinctAndSorted)([...this.containerTypes].map(o=>o.name)).join(" | ")};`,pt.NL),this.typeNames.size>0&&a.append(`readonly $type: ${(0,Rs.distinctAndSorted)([...this.typeNames]).map(o=>`'${o}'`).join(" | ")};`,pt.NL),$A(a,this.properties,"AstType")}),r.append("}",pt.NL),e&&(r.append(pt.NL),LA(r,this.name)),(0,pt.toString)(r)}toDeclaredTypesString(e){let r=new pt.CompositeGeneratorNode,n=Pg(this.name,e),i=(0,Rs.distinctAndSorted)(this.interfaceSuperTypes.map(a=>a.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,pt.NL),r.indent(a=>$A(a,this.properties,"DeclaredType",e)),r.append("}",pt.NL),(0,pt.toString)(r)}};Ue.InterfaceType=Cg;var Ag=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};Ue.TypeResolutionError=Ag;function Co(t,e){return Eo(t)?t.types.every(r=>Co(r,e)):Eo(e)?e.types.some(r=>Co(t,r)):Al(t)?Al(e)&&Co(t.referenceType,e.referenceType):El(t)?El(e)&&Co(t.elementType,e.elementType):Cl(t)?bg(t.value)?Cl(e)&&e.value.name===t.value.name?!0:Co(t.value.type,e):Cl(e)?bg(e.value)?Co(t,e.value.type):IA(t.value,e.value,new Set):!1:bs(t)?bs(e)&&t.primitive===e.primitive:Kf(t)?bs(e)&&e.primitive==="string"||Kf(e)&&e.string===t.string:!1}Ue.isTypeAssignable=Co;function IA(t,e,r){if(r.has(t.name)||(r.add(t.name),t.name===e.name))return!0;for(let n of t.superTypes)if(Eg(n)&&IA(n,e,r))return!0;return!1}function Ao(t,e="AstType"){if(Al(t)){let r=Ao(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${Rg(t.referenceType,r)}`}else if(El(t)){let r=Ao(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${Rg(t.elementType,r)}[]`}else if(Eo(t)){let r=t.types.map(n=>Rg(n,Ao(n,e)));return(0,Rs.distinctAndSorted)(r).join(" | ")}else{if(Cl(t))return t.value.name;if(bs(t))return t.primitive;if(Kf(t))return`'${t.string}'`}throw new Error("Invalid type")}Ue.propertyTypeToString=Ao;function Rg(t,e){return Eo(t)&&(e=`(${e})`),e}function $A(t,e,r,n=new Set){function i(a){let o=r==="AstType"?a.name:Pg(a.name,n),s=a.optional&&!xA(a.type),u=Ao(a.type,r);return`${o}${s?"?":""}: ${u}`}(0,Rs.distinctAndSorted)(e,(a,o)=>a.name.localeCompare(o.name)).forEach(a=>t.append(i(a),pt.NL))}function xA(t){return El(t)?!0:Al(t)?!1:Eo(t)?t.types.every(e=>xA(e)):bs(t)?t.primitive==="boolean":!1}function LA(t,e){t.append(`export const ${e} = '${e}';`,pt.NL),t.append(pt.NL),t.append(`export function is${e}(item: unknown): item is ${e} {`,pt.NL),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,pt.NL)),t.append("}",pt.NL)}function Pg(t,e){return e.has(t)?`^${t}`:t}});var Cs=d(mt=>{"use strict";Object.defineProperty(mt,"__esModule",{value:!0});mt.findReferenceTypes=mt.hasBooleanType=mt.hasArrayType=mt.sortInterfacesTopologically=mt.mergeTypesAndInterfaces=mt.mergeInterfaces=mt.collectSuperTypes=mt.collectTypeHierarchy=mt.collectChildrenTypes=mt.distinctAndSorted=mt.collectAllPlainProperties=void 0;var Pl=Hn(),Hi=je(),Na=Ss();function VB(t){let e=new Pl.MultiMap;for(let r of t)e.addAll(r.name,r.properties);for(let r of t)for(let n of r.superTypes){let i=e.get(n);i&&e.addAll(r.name,i)}return e}mt.collectAllPlainProperties=VB;function zB(t,e){return Array.from(new Set(t)).sort(e)}mt.distinctAndSorted=zB;function qA(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(o=>{let s=r.getOrCreateDocument(o.sourceUri),u=n.getAstNode(s.parseResult.value,o.sourcePath);(0,Hi.isInterface)(u)?(i.add(u),qA(u,e,r,n).forEach(c=>i.add(c))):u&&(0,Hi.isType)(u.$container)&&i.add(u.$container)}),i}mt.collectChildrenTypes=qA;function YB(t){let e=new Pl.MultiMap,r=new Pl.MultiMap;for(let a of t){for(let o of a.superTypes)e.add(a.name,o.name),r.add(o.name,a.name);for(let o of a.subTypes)e.add(o.name,a.name),r.add(a.name,o.name)}let n=new Pl.MultiMap,i=new Pl.MultiMap;for(let[a,o]of Array.from(e.entriesGroupedByKey()).sort(([s],[u])=>s.localeCompare(u)))n.addAll(a,Array.from(new Set(o)));for(let[a,o]of Array.from(r.entriesGroupedByKey()).sort(([s],[u])=>s.localeCompare(u)))i.addAll(a,Array.from(new Set(o)));return{superTypes:n,subTypes:i}}mt.collectTypeHierarchy=YB;function kg(t){let e=new Set;if((0,Hi.isInterface)(t))e.add(t),t.superTypes.forEach(r=>{if((0,Hi.isInterface)(r.ref)){e.add(r.ref);let n=kg(r.ref);for(let i of n)e.add(i)}});else if((0,Hi.isType)(t)){let r=MA(t.type);for(let n of r){let i=kg(n);for(let a of i)e.add(a)}}return e}mt.collectSuperTypes=kg;function MA(t){var e;if((0,Hi.isUnionType)(t))return t.types.flatMap(r=>MA(r));if((0,Hi.isSimpleType)(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if((0,Hi.isType)(r)||(0,Hi.isInterface)(r))return[r]}return[]}function XB(t,e){return t.interfaces.concat(e.interfaces)}mt.mergeInterfaces=XB;function JB(t){return t.interfaces.concat(t.unions)}mt.mergeTypesAndInterfaces=JB;function QB(t){let e=t.sort((i,a)=>i.name.localeCompare(a.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(a=>i.value.superTypes.has(a.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(a=>a.nodes.includes(i)).forEach(a=>n.push(a)))}return r.map(i=>i.value)}mt.sortInterfacesTopologically=QB;function FA(t){return(0,Na.isPropertyUnion)(t)?t.types.some(e=>FA(e)):!!(0,Na.isArrayType)(t)}mt.hasArrayType=FA;function jA(t){return(0,Na.isPropertyUnion)(t)?t.types.some(e=>jA(e)):(0,Na.isPrimitiveType)(t)?t.primitive==="boolean":!1}mt.hasBooleanType=jA;function wg(t){if((0,Na.isPropertyUnion)(t))return t.types.flatMap(e=>wg(e));if((0,Na.isReferenceType)(t)){let e=t.referenceType;if((0,Na.isValueType)(e))return[e.value.name]}else if((0,Na.isArrayType)(t))return wg(t.elementType);return[]}mt.findReferenceTypes=wg});var Es=d(As=>{"use strict";Object.defineProperty(As,"__esModule",{value:!0});As.DefaultNameProvider=As.isNamed=void 0;var ZB=Nt();function GA(t){return typeof t.name=="string"}As.isNamed=GA;var Ng=class{getName(e){if(GA(e))return e.name}getNameNode(e){return(0,ZB.findNodeForProperty)(e.$cstNode,"name")}};As.DefaultNameProvider=Ng});var kl=d((UA,Wf)=>{(function(t,e){typeof define=="function"&&define.amd?define([],e):typeof Wf=="object"&&Wf.exports?Wf.exports=e():t.regexpToAst=e()})(typeof self<"u"?self:UA,function(){function t(){}t.prototype.saveState=function(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}},t.prototype.restoreState=function(y){this.idx=y.idx,this.input=y.input,this.groupIdx=y.groupIdx},t.prototype.pattern=function(y){this.idx=0,this.input=y,this.groupIdx=0,this.consumeChar("/");var A=this.disjunction();this.consumeChar("/");for(var w={type:"Flags",loc:{begin:this.idx,end:y.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};this.isRegExpFlag();)switch(this.popChar()){case"g":o(w,"global");break;case"i":o(w,"ignoreCase");break;case"m":o(w,"multiLine");break;case"u":o(w,"unicode");break;case"y":o(w,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:w,value:A,loc:this.loc(0)}},t.prototype.disjunction=function(){var y=[],A=this.idx;for(y.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),y.push(this.alternative());return{type:"Disjunction",value:y,loc:this.loc(A)}},t.prototype.alternative=function(){for(var y=[],A=this.idx;this.isTerm();)y.push(this.term());return{type:"Alternative",value:y,loc:this.loc(A)}},t.prototype.term=function(){return this.isAssertion()?this.assertion():this.atom()},t.prototype.assertion=function(){var y=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(y)};case"$":return{type:"EndAnchor",loc:this.loc(y)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(y)};case"B":return{type:"NonWordBoundary",loc:this.loc(y)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");var A;switch(this.popChar()){case"=":A="Lookahead";break;case"!":A="NegativeLookahead";break}s(A);var w=this.disjunction();return this.consumeChar(")"),{type:A,value:w,loc:this.loc(y)}}u()},t.prototype.quantifier=function(y){var A,w=this.idx;switch(this.popChar()){case"*":A={atLeast:0,atMost:1/0};break;case"+":A={atLeast:1,atMost:1/0};break;case"?":A={atLeast:0,atMost:1};break;case"{":var P=this.integerIncludingZero();switch(this.popChar()){case"}":A={atLeast:P,atMost:P};break;case",":var C;this.isDigit()?(C=this.integerIncludingZero(),A={atLeast:P,atMost:C}):A={atLeast:P,atMost:1/0},this.consumeChar("}");break}if(y===!0&&A===void 0)return;s(A);break}if(!(y===!0&&A===void 0))return s(A),this.peekChar(0)==="?"?(this.consumeChar("?"),A.greedy=!1):A.greedy=!0,A.type="Quantifier",A.loc=this.loc(w),A},t.prototype.atom=function(){var y,A=this.idx;switch(this.peekChar()){case".":y=this.dotAll();break;case"\\":y=this.atomEscape();break;case"[":y=this.characterClass();break;case"(":y=this.group();break}return y===void 0&&this.isPatternCharacter()&&(y=this.patternCharacter()),s(y),y.loc=this.loc(A),this.isQuantifier()&&(y.quantifier=this.quantifier()),y},t.prototype.dotAll=function(){return this.consumeChar("."),{type:"Set",complement:!0,value:[i(`
`),i("\r"),i("\u2028"),i("\u2029")]}},t.prototype.atomEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.decimalEscapeAtom=function(){var y=this.positiveInteger();return{type:"GroupBackReference",value:y}},t.prototype.characterClassEscape=function(){var y,A=!1;switch(this.popChar()){case"d":y=c;break;case"D":y=c,A=!0;break;case"s":y=h;break;case"S":y=h,A=!0;break;case"w":y=p;break;case"W":y=p,A=!0;break}return s(y),{type:"Set",value:y,complement:A}},t.prototype.controlEscapeAtom=function(){var y;switch(this.popChar()){case"f":y=i("\f");break;case"n":y=i(`
`);break;case"r":y=i("\r");break;case"t":y=i("	");break;case"v":y=i("\v");break}return s(y),{type:"Character",value:y}},t.prototype.controlLetterEscapeAtom=function(){this.consumeChar("c");var y=this.popChar();if(/[a-zA-Z]/.test(y)===!1)throw Error("Invalid ");var A=y.toUpperCase().charCodeAt(0)-64;return{type:"Character",value:A}},t.prototype.nulCharacterAtom=function(){return this.consumeChar("0"),{type:"Character",value:i("\0")}},t.prototype.hexEscapeSequenceAtom=function(){return this.consumeChar("x"),this.parseHexDigits(2)},t.prototype.regExpUnicodeEscapeSequenceAtom=function(){return this.consumeChar("u"),this.parseHexDigits(4)},t.prototype.identityEscapeAtom=function(){var y=this.popChar();return{type:"Character",value:i(y)}},t.prototype.classPatternCharacterAtom=function(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:var y=this.popChar();return{type:"Character",value:i(y)}}},t.prototype.characterClass=function(){var y=[],A=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),A=!0);this.isClassAtom();){var w=this.classAtom(),P=w.type==="Character";if(P&&this.isRangeDash()){this.consumeChar("-");var C=this.classAtom(),b=C.type==="Character";if(b){if(C.value<w.value)throw Error("Range out of order in character class");y.push({from:w.value,to:C.value})}else a(w.value,y),y.push(i("-")),a(C.value,y)}else a(w.value,y)}return this.consumeChar("]"),{type:"Set",complement:A,value:y}},t.prototype.classAtom=function(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}},t.prototype.classEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:i("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.group=function(){var y=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),y=!1;break;default:this.groupIdx++;break}var A=this.disjunction();this.consumeChar(")");var w={type:"Group",capturing:y,value:A};return y&&(w.idx=this.groupIdx),w},t.prototype.positiveInteger=function(){var y=this.popChar();if(n.test(y)===!1)throw Error("Expecting a positive integer");for(;r.test(this.peekChar(0));)y+=this.popChar();return parseInt(y,10)},t.prototype.integerIncludingZero=function(){var y=this.popChar();if(r.test(y)===!1)throw Error("Expecting an integer");for(;r.test(this.peekChar(0));)y+=this.popChar();return parseInt(y,10)},t.prototype.patternCharacter=function(){var y=this.popChar();switch(y){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:i(y)}}},t.prototype.isRegExpFlag=function(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}},t.prototype.isRangeDash=function(){return this.peekChar()==="-"&&this.isClassAtom(1)},t.prototype.isDigit=function(){return r.test(this.peekChar(0))},t.prototype.isClassAtom=function(y){switch(y===void 0&&(y=0),this.peekChar(y)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.isTerm=function(){return this.isAtom()||this.isAssertion()},t.prototype.isAtom=function(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}},t.prototype.isAssertion=function(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}},t.prototype.isQuantifier=function(){var y=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(y)}},t.prototype.isPatternCharacter=function(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.parseHexDigits=function(y){for(var A="",w=0;w<y;w++){var P=this.popChar();if(e.test(P)===!1)throw Error("Expecting a HexDecimal digits");A+=P}var C=parseInt(A,16);return{type:"Character",value:C}},t.prototype.peekChar=function(y){return y===void 0&&(y=0),this.input[this.idx+y]},t.prototype.popChar=function(){var y=this.peekChar(0);return this.consumeChar(),y},t.prototype.consumeChar=function(y){if(y!==void 0&&this.input[this.idx]!==y)throw Error("Expected: '"+y+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++},t.prototype.loc=function(y){return{begin:y,end:this.idx}};var e=/[0-9a-fA-F]/,r=/[0-9]/,n=/[1-9]/;function i(y){return y.charCodeAt(0)}function a(y,A){y.length!==void 0?y.forEach(function(w){A.push(w)}):A.push(y)}function o(y,A){if(y[A]===!0)throw"duplicate flag "+A;y[A]=!0}function s(y){if(y===void 0)throw Error("Internal Error - Should never get here!")}function u(){throw Error("Internal Error - Should never get here!")}var l,c=[];for(l=i("0");l<=i("9");l++)c.push(l);var p=[i("_")].concat(c);for(l=i("a");l<=i("z");l++)p.push(l);for(l=i("A");l<=i("Z");l++)p.push(l);var h=[i(" "),i("\f"),i(`
`),i("\r"),i("	"),i("\v"),i("	"),i("\xA0"),i("\u1680"),i("\u2000"),i("\u2001"),i("\u2002"),i("\u2003"),i("\u2004"),i("\u2005"),i("\u2006"),i("\u2007"),i("\u2008"),i("\u2009"),i("\u200A"),i("\u2028"),i("\u2029"),i("\u202F"),i("\u205F"),i("\u3000"),i("\uFEFF")];function R(){}return R.prototype.visitChildren=function(y){for(var A in y){var w=y[A];y.hasOwnProperty(A)&&(w.type!==void 0?this.visit(w):Array.isArray(w)&&w.forEach(function(P){this.visit(P)},this))}},R.prototype.visit=function(y){switch(y.type){case"Pattern":this.visitPattern(y);break;case"Flags":this.visitFlags(y);break;case"Disjunction":this.visitDisjunction(y);break;case"Alternative":this.visitAlternative(y);break;case"StartAnchor":this.visitStartAnchor(y);break;case"EndAnchor":this.visitEndAnchor(y);break;case"WordBoundary":this.visitWordBoundary(y);break;case"NonWordBoundary":this.visitNonWordBoundary(y);break;case"Lookahead":this.visitLookahead(y);break;case"NegativeLookahead":this.visitNegativeLookahead(y);break;case"Character":this.visitCharacter(y);break;case"Set":this.visitSet(y);break;case"Group":this.visitGroup(y);break;case"GroupBackReference":this.visitGroupBackReference(y);break;case"Quantifier":this.visitQuantifier(y);break}this.visitChildren(y)},R.prototype.visitPattern=function(y){},R.prototype.visitFlags=function(y){},R.prototype.visitDisjunction=function(y){},R.prototype.visitAlternative=function(y){},R.prototype.visitStartAnchor=function(y){},R.prototype.visitEndAnchor=function(y){},R.prototype.visitWordBoundary=function(y){},R.prototype.visitNonWordBoundary=function(y){},R.prototype.visitLookahead=function(y){},R.prototype.visitNegativeLookahead=function(y){},R.prototype.visitCharacter=function(y){},R.prototype.visitSet=function(y){},R.prototype.visitGroup=function(y){},R.prototype.visitGroupBackReference=function(y){},R.prototype.visitQuantifier=function(y){},{RegExpParser:t,BaseRegExpVisitor:R,VERSION:"0.5.0"}})});var ko=d(hr=>{"use strict";Object.defineProperty(hr,"__esModule",{value:!0});hr.partialRegex=hr.partialMatches=hr.getCaseInsensitivePattern=hr.escapeRegExp=hr.isWhitespaceRegExp=hr.isMultilineComment=hr.getTerminalParts=void 0;var HA=kl(),KA=new HA.RegExpParser,Dg=class extends HA.BaseRegExpVisitor{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=$g(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=!!`
`.match(n)}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},Po=new Dg;function eV(t){try{typeof t!="string"&&(t=t.source),t=`/${t}/`;let e=KA.pattern(t),r=[];for(let n of e.value.value)Po.reset(t),Po.visit(n),r.push({start:Po.startRegex,end:Po.endRegex});return r}catch{return[]}}hr.getTerminalParts=eV;function tV(t){try{return typeof t!="string"&&(t=t.source),t=`/${t}/`,Po.reset(t),Po.visit(KA.pattern(t)),Po.multiline}catch{return!1}}hr.isMultilineComment=tV;function rV(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}hr.isWhitespaceRegExp=rV;function $g(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}hr.escapeRegExp=$g;function nV(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:$g(e)).join("")}hr.getCaseInsensitivePattern=nV;function iV(t,e){let r=WA(t),n=e.match(r);return!!n&&n[0].length>0}hr.partialMatches=iV;function WA(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let a="",o;function s(l){a+=r.substr(n,l),n+=l}function u(l){a+="(?:"+r.substr(n,l)+"|$)",n+=l}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":u(3);break;case"x":u(4);break;case"u":e.unicode?r[n+2]==="{"?u(r.indexOf("}",n)-n+1):u(6):u(2);break;case"p":case"P":e.unicode?u(r.indexOf("}",n)-n+1):u(2);break;case"k":u(r.indexOf(">",n)-n+1);break;default:u(2);break}break;case"[":o=/\[(?:\\.|.)*?\]/g,o.lastIndex=n,o=o.exec(r)||[],u(o[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":s(1);break;case"{":o=/\{\d+,?\d*\}/g,o.lastIndex=n,o=o.exec(r),o?s(o[0].length):u(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":a+="(?:",n+=3,a+=i()+"|$)";break;case"=":a+="(?=",n+=3,a+=i()+")";break;case"!":o=n,n+=3,i(),a+=r.substr(o,n-o);break;case"<":switch(r[n+3]){case"=":case"!":o=n,n+=4,i(),a+=r.substr(o,n-o);break;default:s(r.indexOf(">",n)-n+1),a+=i()+"|$)";break}break}else s(1),a+=i()+"|$)";break;case")":return++n,a;default:u(1);break}return a}return new RegExp(i(),t.flags)}hr.partialRegex=WA});var Jt=d(ve=>{"use strict";var aV=ve&&ve.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),oV=ve&&ve.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),sV=ve&&ve.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&aV(e,t,r);return oV(e,t),e};Object.defineProperty(ve,"__esModule",{value:!0});ve.isPrimitiveType=ve.extractAssignments=ve.resolveTransitiveImports=ve.resolveImport=ve.resolveImportUri=ve.terminalRegex=ve.getRuleType=ve.getActionType=ve.getExplicitRuleType=ve.getTypeNameWithoutError=ve.getTypeName=ve.getActionAtElement=ve.isDataTypeRule=ve.isArrayOperator=ve.isArrayCardinality=ve.isOptionalCardinality=void 0;var xe=sV(je()),BA=ui(),Bf=Ie(),uV=Ss(),lV=ko();function cV(t){return t==="?"||t==="*"}ve.isOptionalCardinality=cV;function fV(t){return t==="*"||t==="+"}ve.isArrayCardinality=fV;function dV(t){return t==="+="}ve.isArrayOperator=dV;function xg(t){return VA(t,new Set)}ve.isDataTypeRule=xg;function VA(t,e){if(e.has(t))return!0;e.add(t);for(let r of(0,Bf.streamAllContents)(t))if(xe.isRuleCall(r)){if(!r.rule.ref||xe.isParserRule(r.rule.ref)&&!VA(r.rule.ref,e))return!1}else{if(xe.isAssignment(r))return!1;if(xe.isAction(r))return!1}return!!t.definition}function zA(t){let e=t.$container;if(xe.isGroup(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let a=r[i];if(xe.isAction(a))return a;{let o=(0,Bf.streamAllContents)(r[i]).find(xe.isAction);if(o)return o}}}if(xe.isAbstractElement(e))return zA(e)}ve.getActionAtElement=zA;function Lg(t){var e;if(xe.isParserRule(t))return xg(t)?t.name:(e=qg(t))!==null&&e!==void 0?e:t.name;if(xe.isInterface(t)||xe.isType(t)||xe.isReturnType(t))return t.name;if(xe.isAction(t)){let r=YA(t);if(r)return r}else if(xe.isInferredType(t))return t.name;throw new uV.TypeResolutionError("Cannot get name of Unknown Type",t.$cstNode)}ve.getTypeName=Lg;function pV(t){if(t)try{return Lg(t)}catch{return}}ve.getTypeNameWithoutError=pV;function qg(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(xe.isParserRule(e))return e.name;if(xe.isInterface(e)||xe.isType(e))return e.name}}}ve.getExplicitRuleType=qg;function YA(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return Lg(t.type.ref)}ve.getActionType=YA;function mV(t){var e,r,n;return xe.isTerminalRule(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":xg(t)?t.name:(n=qg(t))!==null&&n!==void 0?n:t.name}ve.getRuleType=mV;function XA(t){return wl(t.definition)}ve.terminalRegex=XA;var Mg=/[\s\S]/.source;function wl(t){if(xe.isTerminalAlternatives(t))return hV(t);if(xe.isTerminalGroup(t))return yV(t);if(xe.isCharacterRange(t))return TV(t);if(xe.isTerminalRuleCall(t)){let e=t.rule.ref;if(!e)throw new Error("Missing rule reference.");return Ki(XA(e),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(xe.isNegatedToken(t))return vV(t);if(xe.isUntilToken(t))return gV(t);if(xe.isRegexToken(t))return Ki(t.regex,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1});if(xe.isWildcard(t))return Ki(Mg,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}function hV(t){return Ki(t.elements.map(wl).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function yV(t){return Ki(t.elements.map(wl).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function gV(t){return Ki(`${Mg}*?${wl(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function vV(t){return Ki(`(?!${wl(t.terminal)})${Mg}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function TV(t){return t.right?Ki(`[${Og(t.left)}-${Og(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):Ki(Og(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function Og(t){return(0,lV.escapeRegExp)(t.value)}function Ki(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function JA(t){if(t.path===void 0||t.path.length===0)return;let e=BA.Utils.dirname((0,Bf.getDocument)(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),BA.Utils.resolvePath(e,r)}ve.resolveImportUri=JA;function Fg(t,e){let r=JA(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(xe.isGrammar(i))return i}}catch{}}ve.resolveImport=Fg;function _V(t,e){if(xe.isGrammarImport(e)){let r=Fg(t,e);if(r){let n=Ig(t,r);return n.push(r),n}return[]}else return Ig(t,e)}ve.resolveTransitiveImports=_V;function Ig(t,e,r=e,n=new Set,i=new Set){let a=(0,Bf.getDocument)(e);if(r!==e&&i.add(e),!n.has(a.uri)){n.add(a.uri);for(let o of e.imports){let s=Fg(t,o);s&&Ig(t,s,r,n,i)}}return Array.from(i)}function QA(t){return xe.isAssignment(t)?[t]:xe.isAlternatives(t)||xe.isGroup(t)||xe.isUnorderedGroup(t)?t.elements.flatMap(e=>QA(e)):[]}ve.extractAssignments=QA;var RV=["string","number","boolean","Date","bigint"];function bV(t){return RV.includes(t)}ve.isPrimitiveType=bV});var Jf=d(ht=>{"use strict";Object.defineProperty(ht,"__esModule",{value:!0});ht.flattenPlainType=ht.mergePropertyTypes=ht.plainToTypes=ht.isPlainStringType=ht.isPlainPrimitiveType=ht.isPlainValueType=ht.isPlainPropertyUnion=ht.isPlainArrayType=ht.isPlainReferenceType=ht.isPlainUnion=ht.isPlainInterface=void 0;var ZA=Ss();function SV(t){return!eE(t)}ht.isPlainInterface=SV;function eE(t){return"type"in t}ht.isPlainUnion=eE;function Vf(t){return"referenceType"in t}ht.isPlainReferenceType=Vf;function zf(t){return"elementType"in t}ht.isPlainArrayType=zf;function Gg(t){return"types"in t}ht.isPlainPropertyUnion=Gg;function Yf(t){return"value"in t}ht.isPlainValueType=Yf;function tE(t){return"primitive"in t}ht.isPlainPrimitiveType=tE;function rE(t){return"string"in t}ht.isPlainStringType=rE;function CV(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new ZA.InterfaceType(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new ZA.UnionType(n.name,{reflection:n.reflection,declared:n.declared});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let a of n.superTypes){let o=e.get(a)||r.get(a);o&&i.superTypes.add(o)}for(let a of n.subTypes){let o=e.get(a)||r.get(a);o&&i.subTypes.add(o)}for(let a of n.properties){let o=AV(a,e,r);i.properties.push(o)}}for(let n of t.unions){let i=r.get(n.name);i.type=Nl(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}ht.plainToTypes=CV;function AV(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:Nl(t.type,void 0,e,r)}}function Nl(t,e,r,n){if(zf(t))return{elementType:Nl(t.elementType,e,r,n)};if(Vf(t))return{referenceType:Nl(t.referenceType,void 0,r,n)};if(Gg(t))return{types:t.types.map(i=>Nl(i,e,r,n))};if(rE(t))return{string:t.string};if(tE(t))return{primitive:t.primitive};if(Yf(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function EV(t,e){let r=Xf(t),n=Xf(e);for(let i of n)PV(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}ht.mergePropertyTypes=EV;function PV(t,e){return t.some(r=>jg(r,e))}function jg(t,e){return zf(t)&&zf(e)?jg(t.elementType,e.elementType):Vf(t)&&Vf(e)?jg(t.referenceType,e.referenceType):Yf(t)&&Yf(e)?t.value===e.value:!1}function Xf(t){return Gg(t)?t.types.flatMap(e=>Xf(e)):[t]}ht.flattenPlainType=Xf});var lE=d(Qf=>{"use strict";Object.defineProperty(Qf,"__esModule",{value:!0});Qf.collectInferredTypes=void 0;var kV=Es(),Wg=Hn(),At=je(),Wi=Jt(),iE=Jf(),Ug=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let a=0;a<r.next.length;a++){let o=n[a],s=r.next[a];s.actionWithAssignment&&i.push({alt:nE(o),next:[]}),s.name!==void 0&&s.name!==o.name&&(s.actionWithAssignment?(o.properties=[],o.ruleCalls=[],o.super=[e.name],o.name=s.name):(o.super=[o.name,...o.ruleCalls],o.properties=[],o.ruleCalls=[],o.name=s.name)),o.properties.push(...s.properties),o.ruleCalls.push(...s.ruleCalls);let u={alt:o,next:s.children};u.next.length===0?(u.alt.super=u.alt.super.filter(l=>l!==u.alt.name),i.push(u)):i.push(...this.applyNext(e,u))}return uE(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(nE(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=wo();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function wV(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map(aE)}}function nE(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>aE(e))}}function aE(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function NV(t,e,r){let n=[],i={fragments:new Map};for(let u of t)n.push(...oE(i,u));let a=LV(n),o=qV(a),s=MV(a,o,r);for(let u of e){let l=DV(u);s.unions.push({name:u.name,reflection:!1,declared:!1,type:l,subTypes:new Set,superTypes:new Set})}return s}Qf.collectInferredTypes=NV;function DV(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=Hg(t.definition,r);return e?{primitive:"string"}:n}function Hg(t,e){var r,n,i;if(t.cardinality)return e();if((0,At.isAlternatives)(t))return{types:t.elements.map(a=>Hg(a,e))};if((0,At.isGroup)(t)||(0,At.isUnorderedGroup)(t))return t.elements.length!==1?e():Hg(t.elements[0],e);if((0,At.isRuleCall)(t)){let a=(r=t.rule)===null||r===void 0?void 0:r.ref;return a?(0,At.isTerminalRule)(a)?{primitive:(i=(n=a.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string"}:{value:a.name}:e()}else if((0,At.isKeyword)(t))return{string:t.value};return e()}function oE(t,e){let r=wo(e),n=new Ug(t,r);return e.definition&&Kg(n,n.root,e.definition),n.getTypes()}function wo(t){return{name:(0,At.isParserRule)(t)||(0,At.isAction)(t)?(0,Wi.getTypeNameWithoutError)(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function Kg(t,e,r){let n=(0,Wi.isOptionalCardinality)(r.cardinality);if((0,At.isAlternatives)(r)){let i=[];n&&i.push(t.connect(e,wo()));for(let a of r.elements){let o=t.connect(e,wo());i.push(Kg(t,o,a))}return t.merge(...i)}else if((0,At.isGroup)(r)||(0,At.isUnorderedGroup)(r)){let i=t.connect(e,wo()),a;n&&(a=t.connect(e,wo()));for(let o of r.elements)i=Kg(t,i,o);return a?t.merge(a,i):i}else{if((0,At.isAction)(r))return $V(t,e,r);(0,At.isAssignment)(r)?OV(e,r):(0,At.isRuleCall)(r)&&IV(t,e,r)}return e}function $V(t,e,r){var n;if(!t.hasLeafNode(e)){let a=wV(e);t.connect(e,a)}let i=t.connect(e,wo(r));if(r.type){let a=(n=r.type)===null||n===void 0?void 0:n.ref;a&&(0,kV.isNamed)(a)&&(i.name=a.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:No(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function OV(t,e){let r={types:new Set,reference:!1};sE(e.terminal,r);let n=No(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:(0,Wi.isOptionalCardinality)(e.cardinality),type:n,astNodes:new Set([e])})}function sE(t,e){if((0,At.isAlternatives)(t)||(0,At.isUnorderedGroup)(t)||(0,At.isGroup)(t))for(let r of t.elements)sE(r,e);else if((0,At.isKeyword)(t))e.types.add(`'${t.value}'`);else if((0,At.isRuleCall)(t)&&t.rule.ref)e.types.add((0,Wi.getRuleType)(t.rule.ref));else if((0,At.isCrossReference)(t)&&t.type.ref){let r=(0,Wi.getTypeNameWithoutError)(t.type.ref);r&&e.types.add(r),e.reference=!0}}function IV(t,e,r){let n=r.rule.ref;if((0,At.isParserRule)(n)&&n.fragment){let i=xV(n,t.context);(0,Wi.isOptionalCardinality)(r.cardinality)?e.properties.push(...i.map(a=>Object.assign(Object.assign({},a),{optional:!0}))):e.properties.push(...i)}else(0,At.isParserRule)(n)&&e.ruleCalls.push((0,Wi.getRuleType)(n))}function xV(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=(0,Wi.getTypeNameWithoutError)(t),a=oE(e,t).filter(o=>o.alt.name===i);return n.push(...a.flatMap(o=>o.alt.properties)),n}function LV(t){let e=new Map,r=[],n=uE(t).map(i=>i.alt);for(let i of n){let a={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(a.name,a),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(o=>{o!==a.name&&a.subTypes.add(o)}))}for(let i of r)for(let a of i.ruleCalls){let o=e.get(a);o&&o.name!==i.name&&o.superTypes.add(i.name)}return Array.from(e.values())}function uE(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new Wg.MultiMap),r=[];for(let[n,i]of e.entriesGroupedByKey()){let a=[],o=new Set,s={alt:{name:n,properties:a,ruleCalls:[],super:[]},next:[]};for(let u of i){let l=u.alt;s.alt.super.push(...l.super),s.next.push(...u.next);let c=l.properties;for(let p of c){let h=a.find(R=>R.name===p.name);h?(h.type=(0,iE.mergePropertyTypes)(h.type,p.type),p.astNodes.forEach(R=>h.astNodes.add(R))):a.push(Object.assign({},p))}l.ruleCalls.forEach(p=>o.add(p))}for(let u of i){let l=u.alt;if(l.ruleCalls.length===0)for(let c of a)l.properties.find(p=>p.name===c.name)||(c.optional=!0)}s.alt.ruleCalls=Array.from(o),r.push(s)}return r}function qV(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new Wg.MultiMap;for(let i of t)for(let a of i.superTypes)n.add(a,i.name);for(let[i,a]of n.entriesGroupedByKey())if(!e.has(i)){let o={declared:!1,name:i,reflection:!0,subTypes:new Set,superTypes:new Set,type:No(!1,!1,a)};r.push(o)}return r}function MV(t,e,r){let n=new Wg.MultiMap;for(let s of t)for(let u of s.superTypes)n.add(u,s.name);let i=new Set(r.interfaces.map(s=>s.name)),a={interfaces:[],unions:e},o=new Map(e.map(s=>[s.name,s]));for(let s of t){let u=new Set(n.get(s.name));if(s.properties.length===0&&u.size>0)if(i.has(s.name))s.abstract=!0,a.interfaces.push(s);else{let l=No(!1,!1,Array.from(u)),c=o.get(s.name);if(c)c.type=(0,iE.mergePropertyTypes)(c.type,l);else{let p={name:s.name,declared:!1,reflection:!0,subTypes:u,superTypes:s.superTypes,type:l};a.unions.push(p),o.set(s.name,p)}}else a.interfaces.push(s)}for(let s of a.interfaces)s.superTypes=new Set([...s.superTypes].filter(u=>!o.has(u)));return a}function No(t,e,r){if(t)return{elementType:No(!1,e,r)};if(e)return{referenceType:No(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:(0,Wi.isPrimitiveType)(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>No(!1,!1,[n]))}}});var Vg=d(ks=>{"use strict";Object.defineProperty(ks,"__esModule",{value:!0});ks.typeDefinitionToPropertyType=ks.collectDeclaredTypes=void 0;var Zf=je(),Bg=Jt();function FV(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let s of n.attributes)i.push({name:s.name,optional:s.isOptional,astNodes:new Set([s]),type:Ps(s.type)});let a=new Set;for(let s of n.superTypes)s.ref&&a.add((0,Bg.getTypeName)(s.ref));let o={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:a,subTypes:new Set};r.interfaces.push(o)}for(let n of e){let i={name:n.name,declared:!0,reflection:!0,type:Ps(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}ks.collectDeclaredTypes=FV;function Ps(t){if((0,Zf.isArrayType)(t))return{elementType:Ps(t.elementType)};if((0,Zf.isReferenceType)(t))return{referenceType:Ps(t.referenceType)};if((0,Zf.isUnionType)(t))return{types:t.types.map(Ps)};if((0,Zf.isSimpleType)(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=(0,Bg.getTypeNameWithoutError)(r);if(n)return(0,Bg.isPrimitiveType)(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}ks.typeDefinitionToPropertyType=Ps});var fE=d(ws=>{"use strict";Object.defineProperty(ws,"__esModule",{value:!0});ws.collectAllAstResources=ws.collectTypeResources=void 0;var jV=lE(),GV=Vg(),UV=Ie(),HV=je(),cE=Jt();function KV(t,e){let r=zg(t,e),n=(0,GV.collectDeclaredTypes)(r.interfaces,r.types),i=(0,jV.collectInferredTypes)(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}ws.collectTypeResources=KV;function zg(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let a=(0,UV.getDocument)(i);if(!r.has(a.uri)){r.add(a.uri);for(let o of i.rules)(0,HV.isParserRule)(o)&&!o.fragment&&((0,cE.isDataTypeRule)(o)?n.datatypeRules.push(o):n.parserRules.push(o));if(i.interfaces.forEach(o=>n.interfaces.push(o)),i.types.forEach(o=>n.types.push(o)),e){let o=i.imports.map(s=>(0,cE.resolveImport)(e,s)).filter(s=>s!==void 0);zg(o,e,r,n)}}}return n}ws.collectAllAstResources=zg});var Jg=d(ci=>{"use strict";Object.defineProperty(ci,"__esModule",{value:!0});ci.specifyAstNodeProperties=ci.createAstTypes=ci.collectValidationAst=ci.collectAst=void 0;var pE=Cs(),Bi=Ss(),mE=fE(),WV=Jf();function BV(t,e){let{inferred:r,declared:n}=(0,mE.collectTypeResources)(t,e);return ed(r,n)}ci.collectAst=BV;function VV(t,e){let{inferred:r,declared:n,astResources:i}=(0,mE.collectTypeResources)(t,e);return{astResources:i,inferred:ed(n,r),declared:ed(r,n)}}ci.collectValidationAst=VV;function ed(t,e){var r,n;let i={interfaces:(0,pE.sortInterfacesTopologically)(dE(...t.interfaces,...(r=e?.interfaces)!==null&&r!==void 0?r:[])),unions:dE(...t.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},a=(0,WV.plainToTypes)(i);return hE(a),a}ci.createAstTypes=ed;function dE(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function hE(t){let e=YV(t),r=Array.from(e.values());XV(r),JV(r),zV(e)}ci.specifyAstNodeProperties=hE;function zV(t){let e=Array.from(t.values()).filter(n=>n.subTypes.size===0),r=new Set;for(let n of e){r.add(n),n.typeNames.add(n.name);let i=Array.from(n.superTypes).map(a=>t.get(a.name)).filter(a=>a!==void 0);for(let a of i)n.typeNames.forEach(o=>a.typeNames.add(o));e.push(...i.filter(a=>!r.has(a)))}}function YV({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,a)=>(i.set(a.name,a),i),new Map),n=new Map;for(let i of e)n.set(i,Yg(i.type,new Set));for(let[i,a]of n)a&&r.delete(i.name);return r}function Yg(t,e){if(e.has(t))return!0;if(e.add(t),(0,Bi.isPropertyUnion)(t))return t.types.every(r=>Yg(r,e));if((0,Bi.isValueType)(t)){let r=t.value;return(0,Bi.isUnionType)(r)?Yg(r.type,e):!1}else return(0,Bi.isPrimitiveType)(t)||(0,Bi.isStringType)(t)}function XV(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function JV(t){let e=t.filter(Bi.isInterfaceType);for(let n of e){let i=n.properties.flatMap(a=>Xg(a.type,new Set));for(let a of i)a.containerTypes.add(n)}let r=QV(t);ZV(r)}function Xg(t,e){return(0,Bi.isPropertyUnion)(t)?t.types.flatMap(r=>Xg(r,e)):(0,Bi.isValueType)(t)?e.has(t.value)?[]:(e.add(t.value),[t.value]):(0,Bi.isArrayType)(t)?Xg(t.elementType,e):[]}function QV(t){function e(o){let s=[o];a.add(o);let u=[...i.subTypes.get(o.name),...i.superTypes.get(o.name)];for(let l of u){let c=r.get(l);c&&!a.has(c)&&s.push(...e(c))}return s}let r=new Map(t.map(o=>[o.name,o])),n=[],i=(0,pE.collectTypeHierarchy)(t),a=new Set;for(let o of t)a.has(o)||n.push(e(o));return n}function ZV(t){for(let e of t){let r=new Set;e.forEach(n=>n.containerTypes.forEach(i=>r.add(i))),e.forEach(n=>n.containerTypes=r)}}});var Zg=d(td=>{"use strict";Object.defineProperty(td,"__esModule",{value:!0});td.interpretAstReflection=void 0;var ez=mr(),tz=Hn(),rz=je(),nz=Jg(),Ns=Cs();function iz(t,e){let r;(0,rz.isGrammar)(t)?r=(0,nz.collectAst)(t,e):r=t;let n=r.interfaces.map(s=>s.name).concat(r.unions.map(s=>s.name)),i=az(r),a=oz(r),o=(0,Ns.collectTypeHierarchy)((0,Ns.mergeTypesAndInterfaces)(r)).superTypes;return new Qg({allTypes:n,references:i,metaData:a,superTypes:o})}td.interpretAstReflection=iz;var Qg=class extends ez.AbstractAstReflection{constructor(e){super(),this.allTypes=e.allTypes,this.references=e.references,this.metaData=e.metaData,this.superTypes=e.superTypes}getAllTypes(){return this.allTypes}getReferenceType(e){let r=`${e.container.$type}:${e.property}`,n=this.references.get(r);if(n)return n;throw new Error("Could not find reference type for "+r)}getTypeMetaData(e){var r;return(r=this.metaData.get(e))!==null&&r!==void 0?r:{name:e,mandatory:[]}}computeIsSubtype(e,r){let n=this.superTypes.get(e);for(let i of n)if(this.isSubtype(i,r))return!0;return!1}};function az(t){let e=new tz.MultiMap;for(let n of t.interfaces){for(let i of n.properties)for(let a of(0,Ns.findReferenceTypes)(i.type))e.add(n.name,[i.name,a]);for(let i of n.interfaceSuperTypes){let a=e.get(i.name);e.addAll(n.name,a)}}let r=new Map;for(let[n,[i,a]]of e)r.set(`${n}:${i}`,a);return r}function oz(t){let e=new Map;for(let r of t.interfaces){let n=r.superProperties,i=n.filter(o=>(0,Ns.hasArrayType)(o.type)),a=n.filter(o=>!(0,Ns.hasArrayType)(o.type)&&(0,Ns.hasBooleanType)(o.type));(i.length>0||a.length>0)&&e.set(r.name,{name:r.name,mandatory:sz(i,a)})}return e}function sz(t,e){let r=[],n=t.concat(e).sort((i,a)=>i.name.localeCompare(a.name));for(let i of n){let a=t.includes(i)?"array":"boolean";r.push({name:i.name,type:a})}return r}});var yE=d(nd=>{"use strict";Object.defineProperty(nd,"__esModule",{value:!0});nd.LangiumGrammarGrammar=void 0;var uz=Nt(),rd,lz=()=>rd??(rd=(0,uz.loadGrammarFromJson)(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "LangiumGrammar",
  "rules": [
    {
      "$type": "ParserRule",
      "name": "Grammar",
      "entry": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "isDeclared",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "grammar"
                }
              },
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@59"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "with"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "usedGrammars",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@0"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "usedGrammars",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@0"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "definesHiddenTokens",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "hidden"
                    }
                  },
                  {
                    "$type": "Keyword",
                    "value": "("
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Assignment",
                        "feature": "hiddenTokens",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@11"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      },
                      {
                        "$type": "Group",
                        "elements": [
                          {
                            "$type": "Keyword",
                            "value": ","
                          },
                          {
                            "$type": "Assignment",
                            "feature": "hiddenTokens",
                            "operator": "+=",
                            "terminal": {
                              "$type": "CrossReference",
                              "type": {
                                "$ref": "#/rules@11"
                              },
                              "terminal": {
                                "$type": "RuleCall",
                                "rule": {
                                  "$ref": "#/rules@59"
                                },
                                "arguments": []
                              },
                              "deprecatedSyntax": false
                            }
                          }
                        ],
                        "cardinality": "*"
                      }
                    ],
                    "cardinality": "?"
                  },
                  {
                    "$type": "Keyword",
                    "value": ")"
                  }
                ],
                "cardinality": "?"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "imports",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@12"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "rules",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@11"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "interfaces",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@1"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "types",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@10"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "+"
          }
        ]
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Interface",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "interface"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "extends"
              },
              {
                "$type": "Assignment",
                "feature": "superTypes",
                "operator": "+=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/types@0"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@59"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "superTypes",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/types@0"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@2"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SchemaType",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "attributes",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeAttribute",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@58"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "isOptional",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "?"
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeDefinition",
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@5"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UnionType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@6"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "UnionType"
                },
                "feature": "types",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "|"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "types",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@6"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArrayType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@7"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "ArrayType"
                },
                "feature": "elementType",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "["
              },
              {
                "$type": "Keyword",
                "value": "]"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReferenceType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@8"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "ReferenceType"
                }
              },
              {
                "$type": "Keyword",
                "value": "@"
              },
              {
                "$type": "Assignment",
                "feature": "referenceType",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SimpleType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@4"
                },
                "arguments": []
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "SimpleType"
                }
              },
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "typeRef",
                    "operator": "=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/types@0"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "primitiveType",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@9"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "stringType",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@60"
                      },
                      "arguments": []
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PrimitiveType",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "string"
          },
          {
            "$type": "Keyword",
            "value": "number"
          },
          {
            "$type": "Keyword",
            "value": "boolean"
          },
          {
            "$type": "Keyword",
            "value": "Date"
          },
          {
            "$type": "Keyword",
            "value": "bigint"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "type"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractRule",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@13"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@46"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "GrammarImport",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "import"
          },
          {
            "$type": "Assignment",
            "feature": "path",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParserRule",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "entry",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "entry"
                }
              },
              {
                "$type": "Assignment",
                "feature": "fragment",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "fragment"
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@15"
            },
            "arguments": []
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "wildcard",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "*"
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "returns"
                  },
                  {
                    "$type": "Alternatives",
                    "elements": [
                      {
                        "$type": "Assignment",
                        "feature": "returnType",
                        "operator": "=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/types@0"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      },
                      {
                        "$type": "Assignment",
                        "feature": "dataType",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@9"
                          },
                          "arguments": []
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "$type": "Assignment",
                "feature": "inferredType",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@14"
                  },
                  "arguments": [
                    {
                      "$type": "NamedArgument",
                      "value": {
                        "$type": "LiteralCondition",
                        "true": false
                      },
                      "calledByName": false
                    }
                  ]
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "definesHiddenTokens",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "hidden"
                }
              },
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "hiddenTokens",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@11"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "hiddenTokens",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@11"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "definition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@17"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "InferredType",
      "parameters": [
        {
          "$type": "Parameter",
          "name": "imperative"
        }
      ],
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "guardCondition": {
                  "$type": "ParameterReference",
                  "parameter": {
                    "$ref": "#/rules@14/parameters@0"
                  }
                },
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "infer"
                  }
                ]
              },
              {
                "$type": "Group",
                "guardCondition": {
                  "$type": "Negation",
                  "value": {
                    "$type": "ParameterReference",
                    "parameter": {
                      "$ref": "#/rules@14/parameters@0"
                    }
                  }
                },
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "infers"
                  }
                ]
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RuleNameAndParams",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "parameters",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@16"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "parameters",
                        "operator": "+=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@16"
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Keyword",
                "value": ">"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Parameter",
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@59"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Alternatives",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@18"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Alternatives"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "|"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "elements",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@18"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ConditionalBranch",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Group"
                }
              },
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Assignment",
                "feature": "guardCondition",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@29"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ">"
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@21"
                  },
                  "arguments": []
                },
                "cardinality": "+"
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UnorderedGroup",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "UnorderedGroup"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "&"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "elements",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@20"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Group",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@21"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Group"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@21"
                  },
                  "arguments": []
                },
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractTokenWithCardinality",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@37"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@24"
                },
                "arguments": []
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "cardinality",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "?"
                },
                {
                  "$type": "Keyword",
                  "value": "*"
                },
                {
                  "$type": "Keyword",
                  "value": "+"
                }
              ]
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Action",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Action"
            }
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "type",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/types@0"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@59"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "inferredType",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@14"
                  },
                  "arguments": [
                    {
                      "$type": "NamedArgument",
                      "value": {
                        "$type": "LiteralCondition",
                        "true": true
                      },
                      "calledByName": false
                    }
                  ]
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "."
              },
              {
                "$type": "Assignment",
                "feature": "feature",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@58"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "operator",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "="
                    },
                    {
                      "$type": "Keyword",
                      "value": "+="
                    }
                  ]
                }
              },
              {
                "$type": "Keyword",
                "value": "current"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractTerminal",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@43"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@44"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Keyword",
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@60"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RuleCall",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "rule",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@11"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@59"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Assignment",
                "feature": "arguments",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@27"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "arguments",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@27"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ">"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NamedArgument",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "parameter",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@16"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@59"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "calledByName",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "="
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@29"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LiteralCondition",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "true",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "true"
            }
          },
          {
            "$type": "Keyword",
            "value": "false"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Disjunction",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@30"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Disjunction"
                },
                "feature": "left",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "|"
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@30"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Conjunction",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@31"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Conjunction"
                },
                "feature": "left",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "&"
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@31"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Negation",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@32"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Negation"
                }
              },
              {
                "$type": "Keyword",
                "value": "!"
              },
              {
                "$type": "Assignment",
                "feature": "value",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@31"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Atom",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@34"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@33"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@28"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedCondition",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParameterReference",
      "definition": {
        "$type": "Assignment",
        "feature": "parameter",
        "operator": "=",
        "terminal": {
          "$type": "CrossReference",
          "type": {
            "$ref": "#/rules@16"
          },
          "terminal": {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@59"
            },
            "arguments": []
          },
          "deprecatedSyntax": false
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredicatedKeyword",
      "inferredType": {
        "$type": "InferredType",
        "name": "Keyword"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredicatedRuleCall",
      "inferredType": {
        "$type": "InferredType",
        "name": "RuleCall"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "rule",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@11"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@59"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Assignment",
                "feature": "arguments",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@27"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "arguments",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@27"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ">"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Assignment",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Assignment"
            }
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "feature",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@58"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "operator",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "+="
                },
                {
                  "$type": "Keyword",
                  "value": "="
                },
                {
                  "$type": "Keyword",
                  "value": "?="
                }
              ]
            }
          },
          {
            "$type": "Assignment",
            "feature": "terminal",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@38"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AssignableTerminal",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@41"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedAssignableElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AssignableAlternatives",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@38"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Alternatives"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "|"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "elements",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@38"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CrossReference",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "CrossReference"
            }
          },
          {
            "$type": "Keyword",
            "value": "["
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/types@0"
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "deprecatedSyntax",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "|"
                    }
                  },
                  {
                    "$type": "Keyword",
                    "value": ":"
                  }
                ]
              },
              {
                "$type": "Assignment",
                "feature": "terminal",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@42"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "]"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CrossReferenceableTerminal",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredicatedGroup",
      "inferredType": {
        "$type": "InferredType",
        "name": "Group"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "elements",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@17"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReturnType",
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "Alternatives",
          "elements": [
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@9"
              },
              "arguments": []
            },
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          ]
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalRule",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "hidden",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "hidden"
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "terminal"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "fragment",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "fragment"
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "name",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@59"
                      },
                      "arguments": []
                    }
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "name",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@59"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": "returns"
                      },
                      {
                        "$type": "Assignment",
                        "feature": "type",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@45"
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "cardinality": "?"
                  }
                ]
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "definition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@47"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalAlternatives",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@48"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "TerminalAlternatives"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Keyword",
                "value": "|"
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@48"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalGroup",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@49"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "TerminalGroup"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@49"
                  },
                  "arguments": []
                },
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@50"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "cardinality",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "?"
                },
                {
                  "$type": "Keyword",
                  "value": "*"
                },
                {
                  "$type": "Keyword",
                  "value": "+"
                }
              ]
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalTokenElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@57"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@52"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@51"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@53"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@54"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@55"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@56"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedTerminalElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "lookahead",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "?="
                },
                {
                  "$type": "Keyword",
                  "value": "?!"
                }
              ]
            },
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@47"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalRuleCall",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "TerminalRuleCall"
            }
          },
          {
            "$type": "Assignment",
            "feature": "rule",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@46"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@59"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NegatedToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "NegatedToken"
            }
          },
          {
            "$type": "Keyword",
            "value": "!"
          },
          {
            "$type": "Assignment",
            "feature": "terminal",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UntilToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "UntilToken"
            }
          },
          {
            "$type": "Keyword",
            "value": "->"
          },
          {
            "$type": "Assignment",
            "feature": "terminal",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RegexToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "RegexToken"
            }
          },
          {
            "$type": "Assignment",
            "feature": "regex",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@61"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Wildcard",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Wildcard"
            }
          },
          {
            "$type": "Keyword",
            "value": "."
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CharacterRange",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "CharacterRange"
            }
          },
          {
            "$type": "Assignment",
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ".."
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@25"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FeatureName",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "current"
          },
          {
            "$type": "Keyword",
            "value": "entry"
          },
          {
            "$type": "Keyword",
            "value": "extends"
          },
          {
            "$type": "Keyword",
            "value": "false"
          },
          {
            "$type": "Keyword",
            "value": "fragment"
          },
          {
            "$type": "Keyword",
            "value": "grammar"
          },
          {
            "$type": "Keyword",
            "value": "hidden"
          },
          {
            "$type": "Keyword",
            "value": "import"
          },
          {
            "$type": "Keyword",
            "value": "interface"
          },
          {
            "$type": "Keyword",
            "value": "returns"
          },
          {
            "$type": "Keyword",
            "value": "terminal"
          },
          {
            "$type": "Keyword",
            "value": "true"
          },
          {
            "$type": "Keyword",
            "value": "type"
          },
          {
            "$type": "Keyword",
            "value": "infer"
          },
          {
            "$type": "Keyword",
            "value": "infers"
          },
          {
            "$type": "Keyword",
            "value": "with"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@9"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@59"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\^?[_a-zA-Z][\\\\w_]*"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "RegexLiteral",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\s+"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\/"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\/[^\\\\n\\\\r]*"
      },
      "fragment": false
    }
  ],
  "types": [
    {
      "$type": "Type",
      "name": "AbstractType",
      "type": {
        "$type": "UnionType",
        "types": [
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@1"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@10"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@23/definition/elements@0"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@13"
            }
          }
        ]
      }
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "imports": [],
  "interfaces": [],
  "usedGrammars": []
}`));nd.LangiumGrammarGrammar=lz});var gE=d(gn=>{"use strict";Object.defineProperty(gn,"__esModule",{value:!0});gn.LangiumGrammarGeneratedModule=gn.LangiumGrammarGeneratedSharedModule=gn.LangiumGrammarParserConfig=gn.LangiumGrammarLanguageMetaData=void 0;var cz=je(),fz=yE();gn.LangiumGrammarLanguageMetaData={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1};gn.LangiumGrammarParserConfig={maxLookahead:3};gn.LangiumGrammarGeneratedSharedModule={AstReflection:()=>new cz.LangiumGrammarAstReflection};gn.LangiumGrammarGeneratedModule={Grammar:()=>(0,fz.LangiumGrammarGrammar)(),LanguageMetaData:()=>gn.LangiumGrammarLanguageMetaData,parser:{ParserConfig:()=>gn.LangiumGrammarParserConfig}}});var Ds=d(yr=>{"use strict";Object.defineProperty(yr,"__esModule",{value:!0});yr.stringArray=yr.array=yr.func=yr.error=yr.number=yr.string=yr.boolean=void 0;function dz(t){return t===!0||t===!1}yr.boolean=dz;function vE(t){return typeof t=="string"||t instanceof String}yr.string=vE;function pz(t){return typeof t=="number"||t instanceof Number}yr.number=pz;function mz(t){return t instanceof Error}yr.error=mz;function hz(t){return typeof t=="function"}yr.func=hz;function TE(t){return Array.isArray(t)}yr.array=TE;function yz(t){return TE(t)&&t.every(e=>vE(e))}yr.stringArray=yz});var Sv=d(te=>{"use strict";Object.defineProperty(te,"__esModule",{value:!0});te.Message=te.NotificationType9=te.NotificationType8=te.NotificationType7=te.NotificationType6=te.NotificationType5=te.NotificationType4=te.NotificationType3=te.NotificationType2=te.NotificationType1=te.NotificationType0=te.NotificationType=te.RequestType9=te.RequestType8=te.RequestType7=te.RequestType6=te.RequestType5=te.RequestType4=te.RequestType3=te.RequestType2=te.RequestType1=te.RequestType=te.RequestType0=te.AbstractMessageSignature=te.ParameterStructures=te.ResponseError=te.ErrorCodes=void 0;var Do=Ds(),_E;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(_E=te.ErrorCodes||(te.ErrorCodes={}));var ev=class t extends Error{constructor(e,r,n){super(r),this.code=Do.number(e)?e:_E.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,t.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};te.ResponseError=ev;var Ur=class t{constructor(e){this.kind=e}static is(e){return e===t.auto||e===t.byName||e===t.byPosition}toString(){return this.kind}};te.ParameterStructures=Ur;Ur.auto=new Ur("auto");Ur.byPosition=new Ur("byPosition");Ur.byName=new Ur("byName");var ct=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return Ur.auto}};te.AbstractMessageSignature=ct;var tv=class extends ct{constructor(e){super(e,0)}};te.RequestType0=tv;var rv=class extends ct{constructor(e,r=Ur.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};te.RequestType=rv;var nv=class extends ct{constructor(e,r=Ur.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};te.RequestType1=nv;var iv=class extends ct{constructor(e){super(e,2)}};te.RequestType2=iv;var av=class extends ct{constructor(e){super(e,3)}};te.RequestType3=av;var ov=class extends ct{constructor(e){super(e,4)}};te.RequestType4=ov;var sv=class extends ct{constructor(e){super(e,5)}};te.RequestType5=sv;var uv=class extends ct{constructor(e){super(e,6)}};te.RequestType6=uv;var lv=class extends ct{constructor(e){super(e,7)}};te.RequestType7=lv;var cv=class extends ct{constructor(e){super(e,8)}};te.RequestType8=cv;var fv=class extends ct{constructor(e){super(e,9)}};te.RequestType9=fv;var dv=class extends ct{constructor(e,r=Ur.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};te.NotificationType=dv;var pv=class extends ct{constructor(e){super(e,0)}};te.NotificationType0=pv;var mv=class extends ct{constructor(e,r=Ur.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};te.NotificationType1=mv;var hv=class extends ct{constructor(e){super(e,2)}};te.NotificationType2=hv;var yv=class extends ct{constructor(e){super(e,3)}};te.NotificationType3=yv;var gv=class extends ct{constructor(e){super(e,4)}};te.NotificationType4=gv;var vv=class extends ct{constructor(e){super(e,5)}};te.NotificationType5=vv;var Tv=class extends ct{constructor(e){super(e,6)}};te.NotificationType6=Tv;var _v=class extends ct{constructor(e){super(e,7)}};te.NotificationType7=_v;var Rv=class extends ct{constructor(e){super(e,8)}};te.NotificationType8=Rv;var bv=class extends ct{constructor(e){super(e,9)}};te.NotificationType9=bv;var gz;(function(t){function e(i){let a=i;return a&&Do.string(a.method)&&(Do.string(a.id)||Do.number(a.id))}t.isRequest=e;function r(i){let a=i;return a&&Do.string(a.method)&&i.id===void 0}t.isNotification=r;function n(i){let a=i;return a&&(a.result!==void 0||!!a.error)&&(Do.string(a.id)||Do.number(a.id)||a.id===null)}t.isResponse=n})(gz=te.Message||(te.Message={}))});var Av=d(Vi=>{"use strict";var RE;Object.defineProperty(Vi,"__esModule",{value:!0});Vi.LRUCache=Vi.LinkedMap=Vi.Touch=void 0;var Pr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(Pr=Vi.Touch||(Vi.Touch={}));var id=class{constructor(){this[RE]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=Pr.None){let n=this._map.get(e);if(n)return r!==Pr.None&&this.touch(n,r),n.value}set(e,r,n=Pr.None){let i=this._map.get(e);if(i)i.value=r,n!==Pr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case Pr.None:this.addItemLast(i);break;case Pr.First:this.addItemFirst(i);break;case Pr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(RE=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==Pr.First&&r!==Pr.Last)){if(r===Pr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===Pr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};Vi.LinkedMap=id;var Cv=class extends id{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=Pr.AsNew){return super.get(e,r)}peek(e){return super.get(e,Pr.None)}set(e,r){return super.set(e,r,Pr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};Vi.LRUCache=Cv});var bE=d(Dl=>{"use strict";Object.defineProperty(Dl,"__esModule",{value:!0});Dl.Disposable=void 0;var vz;(function(t){function e(r){return{dispose:r}}t.create=e})(vz=Dl.Disposable||(Dl.Disposable={}))});var Da=d(kv=>{"use strict";Object.defineProperty(kv,"__esModule",{value:!0});var Ev;function Pv(){if(Ev===void 0)throw new Error("No runtime abstraction layer installed");return Ev}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");Ev=r}t.install=e})(Pv||(Pv={}));kv.default=Pv});var $s=d($o=>{"use strict";Object.defineProperty($o,"__esModule",{value:!0});$o.Emitter=$o.Event=void 0;var Tz=Da(),_z;(function(t){let e={dispose(){}};t.None=function(){return e}})(_z=$o.Event||($o.Event={}));var wv=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,a=this._callbacks.length;i<a;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let a=0,o=n.length;a<o;a++)try{r.push(n[a].apply(i[a],e))}catch(s){(0,Tz.default)().console.error(s)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},ad=class t{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new wv),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=t._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};$o.Emitter=ad;ad._noop=function(){}});var sd=d(Oo=>{"use strict";Object.defineProperty(Oo,"__esModule",{value:!0});Oo.CancellationTokenSource=Oo.CancellationToken=void 0;var Rz=Da(),bz=Ds(),Nv=$s(),Dv;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Nv.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Nv.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||bz.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(Dv=Oo.CancellationToken||(Oo.CancellationToken={}));var Sz=Object.freeze(function(t,e){let r=(0,Rz.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),od=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?Sz:(this._emitter||(this._emitter=new Nv.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},$v=class{get token(){return this._token||(this._token=new od),this._token}cancel(){this._token?this._token.cancel():this._token=Dv.Cancelled}dispose(){this._token?this._token instanceof od&&this._token.dispose():this._token=Dv.None}};Oo.CancellationTokenSource=$v});var SE=d(Os=>{"use strict";Object.defineProperty(Os,"__esModule",{value:!0});Os.SharedArrayReceiverStrategy=Os.SharedArraySenderStrategy=void 0;var Cz=sd(),$l;(function(t){t.Continue=0,t.Cancelled=1})($l||($l={}));var Ov=class{constructor(){this.buffers=new Map}enableCancellation(e){if(e.id===null)return;let r=new SharedArrayBuffer(4),n=new Int32Array(r,0,1);n[0]=$l.Continue,this.buffers.set(e.id,r),e.$cancellationData=r}async sendCancellation(e,r){let n=this.buffers.get(r);if(n===void 0)return;let i=new Int32Array(n,0,1);Atomics.store(i,0,$l.Cancelled)}cleanup(e){this.buffers.delete(e)}dispose(){this.buffers.clear()}};Os.SharedArraySenderStrategy=Ov;var Iv=class{constructor(e){this.data=new Int32Array(e,0,1)}get isCancellationRequested(){return Atomics.load(this.data,0)===$l.Cancelled}get onCancellationRequested(){throw new Error("Cancellation over SharedArrayBuffer doesn't support cancellation events")}},xv=class{constructor(e){this.token=new Iv(e)}cancel(){}dispose(){}},Lv=class{constructor(){this.kind="request"}createCancellationTokenSource(e){let r=e.$cancellationData;return r===void 0?new Cz.CancellationTokenSource:new xv(r)}};Os.SharedArrayReceiverStrategy=Lv});var Mv=d(ud=>{"use strict";Object.defineProperty(ud,"__esModule",{value:!0});ud.Semaphore=void 0;var Az=Da(),qv=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,Az.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};ud.Semaphore=qv});var CE=d(zi=>{"use strict";Object.defineProperty(zi,"__esModule",{value:!0});zi.ReadableStreamMessageReader=zi.AbstractMessageReader=zi.MessageReader=void 0;var jv=Da(),Is=Ds(),Fv=$s(),Ez=Mv(),Pz;(function(t){function e(r){let n=r;return n&&Is.func(n.listen)&&Is.func(n.dispose)&&Is.func(n.onError)&&Is.func(n.onClose)&&Is.func(n.onPartialMessage)}t.is=e})(Pz=zi.MessageReader||(zi.MessageReader={}));var ld=class{constructor(){this.errorEmitter=new Fv.Emitter,this.closeEmitter=new Fv.Emitter,this.partialMessageEmitter=new Fv.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${Is.string(e.message)?e.message:"unknown"}`)}};zi.AbstractMessageReader=ld;var Gv;(function(t){function e(r){let n,i,a,o=new Map,s,u=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(a=r.contentDecoder,o.set(a.name,a)),r.contentDecoders!==void 0)for(let l of r.contentDecoders)o.set(l.name,l);if(r.contentTypeDecoder!==void 0&&(s=r.contentTypeDecoder,u.set(s.name,s)),r.contentTypeDecoders!==void 0)for(let l of r.contentTypeDecoders)u.set(l.name,l)}return s===void 0&&(s=(0,jv.default)().applicationJson.decoder,u.set(s.name,s)),{charset:n,contentDecoder:a,contentDecoders:o,contentTypeDecoder:s,contentTypeDecoders:u}}t.fromOptions=e})(Gv||(Gv={}));var Uv=class extends ld{constructor(e,r){super(),this.readable=e,this.options=Gv.fromOptions(r),this.buffer=(0,jv.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0,this.readSemaphore=new Ez.Semaphore(1)}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let n=this.buffer.tryReadHeaders(!0);if(!n)return;let i=n.get("content-length");if(!i){this.fireError(new Error("Header must provide a Content-Length property."));return}let a=parseInt(i);if(isNaN(a)){this.fireError(new Error("Content-Length value must be a number."));return}this.nextMessageLength=a}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1,this.readSemaphore.lock(async()=>{let n=this.options.contentDecoder!==void 0?await this.options.contentDecoder.decode(r):r,i=await this.options.contentTypeDecoder.decode(n,this.options);this.callback(i)}).catch(n=>{this.fireError(n)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,jv.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};zi.ReadableStreamMessageReader=Uv});var kE=d(Yi=>{"use strict";Object.defineProperty(Yi,"__esModule",{value:!0});Yi.WriteableStreamMessageWriter=Yi.AbstractMessageWriter=Yi.MessageWriter=void 0;var AE=Da(),Ol=Ds(),kz=Mv(),EE=$s(),wz="Content-Length: ",PE=`\r
`,Nz;(function(t){function e(r){let n=r;return n&&Ol.func(n.dispose)&&Ol.func(n.onClose)&&Ol.func(n.onError)&&Ol.func(n.write)}t.is=e})(Nz=Yi.MessageWriter||(Yi.MessageWriter={}));var cd=class{constructor(){this.errorEmitter=new EE.Emitter,this.closeEmitter=new EE.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${Ol.string(e.message)?e.message:"unknown"}`)}};Yi.AbstractMessageWriter=cd;var Hv;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,AE.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,AE.default)().applicationJson.encoder}}t.fromOptions=e})(Hv||(Hv={}));var Kv=class extends cd{constructor(e,r){super(),this.writable=e,this.options=Hv.fromOptions(r),this.errorCount=0,this.writeSemaphore=new kz.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(wz,n.byteLength.toString(),PE),i.push(PE),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};Yi.WriteableStreamMessageWriter=Kv});var wE=d(fd=>{"use strict";Object.defineProperty(fd,"__esModule",{value:!0});fd.AbstractMessageBuffer=void 0;var Dz=13,$z=10,Oz=`\r
`,Wv=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(e=!1){if(this._chunks.length===0)return;let r=0,n=0,i=0,a=0;e:for(;n<this._chunks.length;){let l=this._chunks[n];for(i=0;i<l.length;){switch(l[i]){case Dz:switch(r){case 0:r=1;break;case 2:r=3;break;default:r=0}break;case $z:switch(r){case 1:r=2;break;case 3:r=4,i++;break e;default:r=0}break;default:r=0}i++}a+=l.byteLength,n++}if(r!==4)return;let o=this._read(a+i),s=new Map,u=this.toString(o,"ascii").split(Oz);if(u.length<2)return s;for(let l=0;l<u.length-2;l++){let c=u[l],p=c.indexOf(":");if(p===-1)throw new Error("Message header must separate key and value using :");let h=c.substr(0,p),R=c.substr(p+1).trim();s.set(e?h.toLowerCase():h,R)}return s}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let a=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(a)}if(this._chunks[0].byteLength>e){let a=this._chunks[0],o=this.asNative(a,e);return this._chunks[0]=a.slice(e),this._totalLength-=e,o}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let a=this._chunks[i];if(a.byteLength>e){let o=a.slice(0,e);r.set(o,n),n+=e,this._chunks[i]=a.slice(e),this._totalLength-=e,e-=e}else r.set(a,n),n+=a.byteLength,this._chunks.shift(),this._totalLength-=a.byteLength,e-=a.byteLength}return r}};fd.AbstractMessageBuffer=Wv});var LE=d(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.createMessageConnection=Q.ConnectionOptions=Q.MessageStrategy=Q.CancellationStrategy=Q.CancellationSenderStrategy=Q.CancellationReceiverStrategy=Q.RequestCancellationReceiverStrategy=Q.IdCancellationReceiverStrategy=Q.ConnectionStrategy=Q.ConnectionError=Q.ConnectionErrors=Q.LogTraceNotification=Q.SetTraceNotification=Q.TraceFormat=Q.TraceValues=Q.Trace=Q.NullLogger=Q.ProgressType=Q.ProgressToken=void 0;var NE=Da(),St=Ds(),de=Sv(),DE=Av(),Il=$s(),Bv=sd(),Ll;(function(t){t.type=new de.NotificationType("$/cancelRequest")})(Ll||(Ll={}));var $E;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})($E=Q.ProgressToken||(Q.ProgressToken={}));var xl;(function(t){t.type=new de.NotificationType("$/progress")})(xl||(xl={}));var Vv=class{constructor(){}};Q.ProgressType=Vv;var zv;(function(t){function e(r){return St.func(r)}t.is=e})(zv||(zv={}));Q.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var Be;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(Be=Q.Trace||(Q.Trace={}));var Iz;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(Iz=Q.TraceValues||(Q.TraceValues={}));(function(t){function e(n){if(!St.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(Be=Q.Trace||(Q.Trace={}));var Kn;(function(t){t.Text="text",t.JSON="json"})(Kn=Q.TraceFormat||(Q.TraceFormat={}));(function(t){function e(r){return St.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(Kn=Q.TraceFormat||(Q.TraceFormat={}));var OE;(function(t){t.type=new de.NotificationType("$/setTrace")})(OE=Q.SetTraceNotification||(Q.SetTraceNotification={}));var Yv;(function(t){t.type=new de.NotificationType("$/logTrace")})(Yv=Q.LogTraceNotification||(Q.LogTraceNotification={}));var dd;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(dd=Q.ConnectionErrors||(Q.ConnectionErrors={}));var xs=class t extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,t.prototype)}};Q.ConnectionError=xs;var IE;(function(t){function e(r){let n=r;return n&&St.func(n.cancelUndispatched)}t.is=e})(IE=Q.ConnectionStrategy||(Q.ConnectionStrategy={}));var Qv;(function(t){function e(r){let n=r;return n&&(n.kind===void 0||n.kind==="id")&&St.func(n.createCancellationTokenSource)&&(n.dispose===void 0||St.func(n.dispose))}t.is=e})(Qv=Q.IdCancellationReceiverStrategy||(Q.IdCancellationReceiverStrategy={}));var xE;(function(t){function e(r){let n=r;return n&&n.kind==="request"&&St.func(n.createCancellationTokenSource)&&(n.dispose===void 0||St.func(n.dispose))}t.is=e})(xE=Q.RequestCancellationReceiverStrategy||(Q.RequestCancellationReceiverStrategy={}));var Xv;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Bv.CancellationTokenSource}});function e(r){return Qv.is(r)||xE.is(r)}t.is=e})(Xv=Q.CancellationReceiverStrategy||(Q.CancellationReceiverStrategy={}));var Jv;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(Ll.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&St.func(n.sendCancellation)&&St.func(n.cleanup)}t.is=e})(Jv=Q.CancellationSenderStrategy||(Q.CancellationSenderStrategy={}));var Zv;(function(t){t.Message=Object.freeze({receiver:Xv.Message,sender:Jv.Message});function e(r){let n=r;return n&&Xv.is(n.receiver)&&Jv.is(n.sender)}t.is=e})(Zv=Q.CancellationStrategy||(Q.CancellationStrategy={}));var eT;(function(t){function e(r){let n=r;return n&&St.func(n.handleMessage)}t.is=e})(eT=Q.MessageStrategy||(Q.MessageStrategy={}));var xz;(function(t){function e(r){let n=r;return n&&(Zv.is(n.cancellationStrategy)||IE.is(n.connectionStrategy)||eT.is(n.messageStrategy))}t.is=e})(xz=Q.ConnectionOptions||(Q.ConnectionOptions={}));var Wn;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(Wn||(Wn={}));function Lz(t,e,r,n){let i=r!==void 0?r:Q.NullLogger,a=0,o=0,s=0,u="2.0",l,c=new Map,p,h=new Map,R=new Map,y,A=new DE.LinkedMap,w=new Map,P=new Set,C=new Map,b=Be.Off,x=Kn.Text,G,Y=Wn.New,ce=new Il.Emitter,Ke=new Il.Emitter,we=new Il.Emitter,W=new Il.Emitter,I=new Il.Emitter,H=n&&n.cancellationStrategy?n.cancellationStrategy:Zv.Message;function X(v){if(v===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+v.toString()}function be(v){return v===null?"res-unknown-"+(++s).toString():"res-"+v.toString()}function he(){return"not-"+(++o).toString()}function le(v,N){de.Message.isRequest(N)?v.set(X(N.id),N):de.Message.isResponse(N)?v.set(be(N.id),N):v.set(he(),N)}function st(v){}function et(){return Y===Wn.Listening}function Ne(){return Y===Wn.Closed}function Tt(){return Y===Wn.Disposed}function Mr(){(Y===Wn.New||Y===Wn.Listening)&&(Y=Wn.Closed,Ke.fire(void 0))}function Dn(v){ce.fire([v,void 0,void 0])}function ga(v){ce.fire(v)}t.onClose(Mr),t.onError(Dn),e.onClose(Mr),e.onError(ga);function Ii(){y||A.size===0||(y=(0,NE.default)().timer.setImmediate(()=>{y=void 0,nr()}))}function xi(v){de.Message.isRequest(v)?Ta(v):de.Message.isNotification(v)?uo(v):de.Message.isResponse(v)?_a(v):_t(v)}function nr(){if(A.size===0)return;let v=A.shift();try{let N=n?.messageStrategy;eT.is(N)?N.handleMessage(v,xi):xi(v)}finally{Ii()}}let va=v=>{try{if(de.Message.isNotification(v)&&v.method===Ll.type.method){let N=v.params.id,L=X(N),U=A.get(L);if(de.Message.isRequest(U)){let oe=n?.connectionStrategy,ye=oe&&oe.cancelUndispatched?oe.cancelUndispatched(U,st):void 0;if(ye&&(ye.error!==void 0||ye.result!==void 0)){A.delete(L),C.delete(N),ye.id=U.id,cn(ye,v.method,Date.now()),e.write(ye).catch(()=>i.error("Sending response for canceled message failed."));return}}let ae=C.get(N);if(ae!==void 0){ae.cancel(),$n(v);return}else P.add(N)}le(A,v)}finally{Ii()}};function Ta(v){if(Tt())return;function N(J,ie,se){let Se={jsonrpc:u,id:v.id};J instanceof de.ResponseError?Se.error=J.toJson():Se.result=J===void 0?null:J,cn(Se,ie,se),e.write(Se).catch(()=>i.error("Sending response failed."))}function L(J,ie,se){let Se={jsonrpc:u,id:v.id,error:J.toJson()};cn(Se,ie,se),e.write(Se).catch(()=>i.error("Sending response failed."))}function U(J,ie,se){J===void 0&&(J=null);let Se={jsonrpc:u,id:v.id,result:J};cn(Se,ie,se),e.write(Se).catch(()=>i.error("Sending response failed."))}fn(v);let ae=c.get(v.method),oe,ye;ae&&(oe=ae.type,ye=ae.handler);let ne=Date.now();if(ye||l){let J=v.id??String(Date.now()),ie=Qv.is(H.receiver)?H.receiver.createCancellationTokenSource(J):H.receiver.createCancellationTokenSource(v);v.id!==null&&P.has(v.id)&&ie.cancel(),v.id!==null&&C.set(J,ie);try{let se;if(ye)if(v.params===void 0){if(oe!==void 0&&oe.numberOfParams!==0){L(new de.ResponseError(de.ErrorCodes.InvalidParams,`Request ${v.method} defines ${oe.numberOfParams} params but received none.`),v.method,ne);return}se=ye(ie.token)}else if(Array.isArray(v.params)){if(oe!==void 0&&oe.parameterStructures===de.ParameterStructures.byName){L(new de.ResponseError(de.ErrorCodes.InvalidParams,`Request ${v.method} defines parameters by name but received parameters by position`),v.method,ne);return}se=ye(...v.params,ie.token)}else{if(oe!==void 0&&oe.parameterStructures===de.ParameterStructures.byPosition){L(new de.ResponseError(de.ErrorCodes.InvalidParams,`Request ${v.method} defines parameters by position but received parameters by name`),v.method,ne);return}se=ye(v.params,ie.token)}else l&&(se=l(v.method,v.params,ie.token));let Se=se;se?Se.then?Se.then(ut=>{C.delete(J),N(ut,v.method,ne)},ut=>{C.delete(J),ut instanceof de.ResponseError?L(ut,v.method,ne):ut&&St.string(ut.message)?L(new de.ResponseError(de.ErrorCodes.InternalError,`Request ${v.method} failed with message: ${ut.message}`),v.method,ne):L(new de.ResponseError(de.ErrorCodes.InternalError,`Request ${v.method} failed unexpectedly without providing any details.`),v.method,ne)}):(C.delete(J),N(se,v.method,ne)):(C.delete(J),U(se,v.method,ne))}catch(se){C.delete(J),se instanceof de.ResponseError?N(se,v.method,ne):se&&St.string(se.message)?L(new de.ResponseError(de.ErrorCodes.InternalError,`Request ${v.method} failed with message: ${se.message}`),v.method,ne):L(new de.ResponseError(de.ErrorCodes.InternalError,`Request ${v.method} failed unexpectedly without providing any details.`),v.method,ne)}}else L(new de.ResponseError(de.ErrorCodes.MethodNotFound,`Unhandled method ${v.method}`),v.method,ne)}function _a(v){if(!Tt())if(v.id===null)v.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(v.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let N=v.id,L=w.get(N);if(Fr(v,L),L!==void 0){w.delete(N);try{if(v.error){let U=v.error;L.reject(new de.ResponseError(U.code,U.message,U.data))}else if(v.result!==void 0)L.resolve(v.result);else throw new Error("Should never happen.")}catch(U){U.message?i.error(`Response handler '${L.method}' failed with message: ${U.message}`):i.error(`Response handler '${L.method}' failed unexpectedly.`)}}}}function uo(v){if(Tt())return;let N,L;if(v.method===Ll.type.method){let U=v.params.id;P.delete(U),$n(v);return}else{let U=h.get(v.method);U&&(L=U.handler,N=U.type)}if(L||p)try{if($n(v),L)if(v.params===void 0)N!==void 0&&N.numberOfParams!==0&&N.parameterStructures!==de.ParameterStructures.byName&&i.error(`Notification ${v.method} defines ${N.numberOfParams} params but received none.`),L();else if(Array.isArray(v.params)){let U=v.params;v.method===xl.type.method&&U.length===2&&$E.is(U[0])?L({token:U[0],value:U[1]}):(N!==void 0&&(N.parameterStructures===de.ParameterStructures.byName&&i.error(`Notification ${v.method} defines parameters by name but received parameters by position`),N.numberOfParams!==v.params.length&&i.error(`Notification ${v.method} defines ${N.numberOfParams} params but received ${U.length} arguments`)),L(...U))}else N!==void 0&&N.parameterStructures===de.ParameterStructures.byPosition&&i.error(`Notification ${v.method} defines parameters by position but received parameters by name`),L(v.params);else p&&p(v.method,v.params)}catch(U){U.message?i.error(`Notification handler '${v.method}' failed with message: ${U.message}`):i.error(`Notification handler '${v.method}' failed unexpectedly.`)}else we.fire(v)}function _t(v){if(!v){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(v,null,4)}`);let N=v;if(St.string(N.id)||St.number(N.id)){let L=N.id,U=w.get(L);U&&U.reject(new Error("The received response has neither a result nor an error property."))}}function Vt(v){if(v!=null)switch(b){case Be.Verbose:return JSON.stringify(v,null,4);case Be.Compact:return JSON.stringify(v);default:return}}function lo(v){if(!(b===Be.Off||!G))if(x===Kn.Text){let N;(b===Be.Verbose||b===Be.Compact)&&v.params&&(N=`Params: ${Vt(v.params)}

`),G.log(`Sending request '${v.method} - (${v.id})'.`,N)}else zt("send-request",v)}function ln(v){if(!(b===Be.Off||!G))if(x===Kn.Text){let N;(b===Be.Verbose||b===Be.Compact)&&(v.params?N=`Params: ${Vt(v.params)}

`:N=`No parameters provided.

`),G.log(`Sending notification '${v.method}'.`,N)}else zt("send-notification",v)}function cn(v,N,L){if(!(b===Be.Off||!G))if(x===Kn.Text){let U;(b===Be.Verbose||b===Be.Compact)&&(v.error&&v.error.data?U=`Error data: ${Vt(v.error.data)}

`:v.result?U=`Result: ${Vt(v.result)}

`:v.error===void 0&&(U=`No result returned.

`)),G.log(`Sending response '${N} - (${v.id})'. Processing request took ${Date.now()-L}ms`,U)}else zt("send-response",v)}function fn(v){if(!(b===Be.Off||!G))if(x===Kn.Text){let N;(b===Be.Verbose||b===Be.Compact)&&v.params&&(N=`Params: ${Vt(v.params)}

`),G.log(`Received request '${v.method} - (${v.id})'.`,N)}else zt("receive-request",v)}function $n(v){if(!(b===Be.Off||!G||v.method===Yv.type.method))if(x===Kn.Text){let N;(b===Be.Verbose||b===Be.Compact)&&(v.params?N=`Params: ${Vt(v.params)}

`:N=`No parameters provided.

`),G.log(`Received notification '${v.method}'.`,N)}else zt("receive-notification",v)}function Fr(v,N){if(!(b===Be.Off||!G))if(x===Kn.Text){let L;if((b===Be.Verbose||b===Be.Compact)&&(v.error&&v.error.data?L=`Error data: ${Vt(v.error.data)}

`:v.result?L=`Result: ${Vt(v.result)}

`:v.error===void 0&&(L=`No result returned.

`)),N){let U=v.error?` Request failed: ${v.error.message} (${v.error.code}).`:"";G.log(`Received response '${N.method} - (${v.id})' in ${Date.now()-N.timerStart}ms.${U}`,L)}else G.log(`Received response ${v.id} without active response promise.`,L)}else zt("receive-response",v)}function zt(v,N){if(!G||b===Be.Off)return;let L={isLSPMessage:!0,type:v,message:N,timestamp:Date.now()};G.log(L)}function dn(){if(Ne())throw new xs(dd.Closed,"Connection is closed.");if(Tt())throw new xs(dd.Disposed,"Connection is disposed.")}function Ra(){if(et())throw new xs(dd.AlreadyListening,"Connection is already listening")}function br(){if(!et())throw new Error("Call listen() first.")}function fr(v){return v===void 0?null:v}function kt(v){if(v!==null)return v}function jr(v){return v!=null&&!Array.isArray(v)&&typeof v=="object"}function Sr(v,N){switch(v){case de.ParameterStructures.auto:return jr(N)?kt(N):[fr(N)];case de.ParameterStructures.byName:if(!jr(N))throw new Error("Received parameters by name but param is not an object literal.");return kt(N);case de.ParameterStructures.byPosition:return[fr(N)];default:throw new Error(`Unknown parameter structure ${v.toString()}`)}}function Qr(v,N){let L,U=v.numberOfParams;switch(U){case 0:L=void 0;break;case 1:L=Sr(v.parameterStructures,N[0]);break;default:L=[];for(let ae=0;ae<N.length&&ae<U;ae++)L.push(fr(N[ae]));if(N.length<U)for(let ae=N.length;ae<U;ae++)L.push(null);break}return L}let E={sendNotification:(v,...N)=>{dn();let L,U;if(St.string(v)){L=v;let oe=N[0],ye=0,ne=de.ParameterStructures.auto;de.ParameterStructures.is(oe)&&(ye=1,ne=oe);let J=N.length,ie=J-ye;switch(ie){case 0:U=void 0;break;case 1:U=Sr(ne,N[ye]);break;default:if(ne===de.ParameterStructures.byName)throw new Error(`Received ${ie} parameters for 'by Name' notification parameter structure.`);U=N.slice(ye,J).map(se=>fr(se));break}}else{let oe=N;L=v.method,U=Qr(v,oe)}let ae={jsonrpc:u,method:L,params:U};return ln(ae),e.write(ae).catch(oe=>{throw i.error("Sending notification failed."),oe})},onNotification:(v,N)=>{dn();let L;return St.func(v)?p=v:N&&(St.string(v)?(L=v,h.set(v,{type:void 0,handler:N})):(L=v.method,h.set(v.method,{type:v,handler:N}))),{dispose:()=>{L!==void 0?h.delete(L):p=void 0}}},onProgress:(v,N,L)=>{if(R.has(N))throw new Error(`Progress handler for token ${N} already registered`);return R.set(N,L),{dispose:()=>{R.delete(N)}}},sendProgress:(v,N,L)=>E.sendNotification(xl.type,{token:N,value:L}),onUnhandledProgress:W.event,sendRequest:(v,...N)=>{dn(),br();let L,U,ae;if(St.string(v)){L=v;let J=N[0],ie=N[N.length-1],se=0,Se=de.ParameterStructures.auto;de.ParameterStructures.is(J)&&(se=1,Se=J);let ut=N.length;Bv.CancellationToken.is(ie)&&(ut=ut-1,ae=ie);let wt=ut-se;switch(wt){case 0:U=void 0;break;case 1:U=Sr(Se,N[se]);break;default:if(Se===de.ParameterStructures.byName)throw new Error(`Received ${wt} parameters for 'by Name' request parameter structure.`);U=N.slice(se,ut).map($=>fr($));break}}else{let J=N;L=v.method,U=Qr(v,J);let ie=v.numberOfParams;ae=Bv.CancellationToken.is(J[ie])?J[ie]:void 0}let oe=a++,ye;ae&&(ye=ae.onCancellationRequested(()=>{let J=H.sender.sendCancellation(E,oe);return J===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${oe}`),Promise.resolve()):J.catch(()=>{i.log(`Sending cancellation messages for id ${oe} failed`)})}));let ne={jsonrpc:u,id:oe,method:L,params:U};return lo(ne),typeof H.sender.enableCancellation=="function"&&H.sender.enableCancellation(ne),new Promise(async(J,ie)=>{let se=wt=>{J(wt),H.sender.cleanup(oe),ye?.dispose()},Se=wt=>{ie(wt),H.sender.cleanup(oe),ye?.dispose()},ut={method:L,timerStart:Date.now(),resolve:se,reject:Se};try{await e.write(ne),w.set(oe,ut)}catch(wt){throw i.error("Sending request failed."),ut.reject(new de.ResponseError(de.ErrorCodes.MessageWriteError,wt.message?wt.message:"Unknown reason")),wt}})},onRequest:(v,N)=>{dn();let L=null;return zv.is(v)?(L=void 0,l=v):St.string(v)?(L=null,N!==void 0&&(L=v,c.set(v,{handler:N,type:void 0}))):N!==void 0&&(L=v.method,c.set(v.method,{type:v,handler:N})),{dispose:()=>{L!==null&&(L!==void 0?c.delete(L):l=void 0)}}},hasPendingResponse:()=>w.size>0,trace:async(v,N,L)=>{let U=!1,ae=Kn.Text;L!==void 0&&(St.boolean(L)?U=L:(U=L.sendNotification||!1,ae=L.traceFormat||Kn.Text)),b=v,x=ae,b===Be.Off?G=void 0:G=N,U&&!Ne()&&!Tt()&&await E.sendNotification(OE.type,{value:Be.toString(v)})},onError:ce.event,onClose:Ke.event,onUnhandledNotification:we.event,onDispose:I.event,end:()=>{e.end()},dispose:()=>{if(Tt())return;Y=Wn.Disposed,I.fire(void 0);let v=new de.ResponseError(de.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let N of w.values())N.reject(v);w=new Map,C=new Map,P=new Set,A=new DE.LinkedMap,St.func(e.dispose)&&e.dispose(),St.func(t.dispose)&&t.dispose()},listen:()=>{dn(),Ra(),Y=Wn.Listening,t.listen(va)},inspect:()=>{(0,NE.default)().console.log("inspect")}};return E.onNotification(Yv.type,v=>{if(b===Be.Off||!G)return;let N=b===Be.Verbose||b===Be.Compact;G.log(v.message,N?v.verbose:void 0)}),E.onNotification(xl.type,v=>{let N=R.get(v.token);N?N(v.value):W.fire(v)}),E}Q.createMessageConnection=Lz});var pd=d(q=>{"use strict";Object.defineProperty(q,"__esModule",{value:!0});q.ProgressType=q.ProgressToken=q.createMessageConnection=q.NullLogger=q.ConnectionOptions=q.ConnectionStrategy=q.AbstractMessageBuffer=q.WriteableStreamMessageWriter=q.AbstractMessageWriter=q.MessageWriter=q.ReadableStreamMessageReader=q.AbstractMessageReader=q.MessageReader=q.SharedArrayReceiverStrategy=q.SharedArraySenderStrategy=q.CancellationToken=q.CancellationTokenSource=q.Emitter=q.Event=q.Disposable=q.LRUCache=q.Touch=q.LinkedMap=q.ParameterStructures=q.NotificationType9=q.NotificationType8=q.NotificationType7=q.NotificationType6=q.NotificationType5=q.NotificationType4=q.NotificationType3=q.NotificationType2=q.NotificationType1=q.NotificationType0=q.NotificationType=q.ErrorCodes=q.ResponseError=q.RequestType9=q.RequestType8=q.RequestType7=q.RequestType6=q.RequestType5=q.RequestType4=q.RequestType3=q.RequestType2=q.RequestType1=q.RequestType0=q.RequestType=q.Message=q.RAL=void 0;q.MessageStrategy=q.CancellationStrategy=q.CancellationSenderStrategy=q.CancellationReceiverStrategy=q.ConnectionError=q.ConnectionErrors=q.LogTraceNotification=q.SetTraceNotification=q.TraceFormat=q.TraceValues=q.Trace=void 0;var it=Sv();Object.defineProperty(q,"Message",{enumerable:!0,get:function(){return it.Message}});Object.defineProperty(q,"RequestType",{enumerable:!0,get:function(){return it.RequestType}});Object.defineProperty(q,"RequestType0",{enumerable:!0,get:function(){return it.RequestType0}});Object.defineProperty(q,"RequestType1",{enumerable:!0,get:function(){return it.RequestType1}});Object.defineProperty(q,"RequestType2",{enumerable:!0,get:function(){return it.RequestType2}});Object.defineProperty(q,"RequestType3",{enumerable:!0,get:function(){return it.RequestType3}});Object.defineProperty(q,"RequestType4",{enumerable:!0,get:function(){return it.RequestType4}});Object.defineProperty(q,"RequestType5",{enumerable:!0,get:function(){return it.RequestType5}});Object.defineProperty(q,"RequestType6",{enumerable:!0,get:function(){return it.RequestType6}});Object.defineProperty(q,"RequestType7",{enumerable:!0,get:function(){return it.RequestType7}});Object.defineProperty(q,"RequestType8",{enumerable:!0,get:function(){return it.RequestType8}});Object.defineProperty(q,"RequestType9",{enumerable:!0,get:function(){return it.RequestType9}});Object.defineProperty(q,"ResponseError",{enumerable:!0,get:function(){return it.ResponseError}});Object.defineProperty(q,"ErrorCodes",{enumerable:!0,get:function(){return it.ErrorCodes}});Object.defineProperty(q,"NotificationType",{enumerable:!0,get:function(){return it.NotificationType}});Object.defineProperty(q,"NotificationType0",{enumerable:!0,get:function(){return it.NotificationType0}});Object.defineProperty(q,"NotificationType1",{enumerable:!0,get:function(){return it.NotificationType1}});Object.defineProperty(q,"NotificationType2",{enumerable:!0,get:function(){return it.NotificationType2}});Object.defineProperty(q,"NotificationType3",{enumerable:!0,get:function(){return it.NotificationType3}});Object.defineProperty(q,"NotificationType4",{enumerable:!0,get:function(){return it.NotificationType4}});Object.defineProperty(q,"NotificationType5",{enumerable:!0,get:function(){return it.NotificationType5}});Object.defineProperty(q,"NotificationType6",{enumerable:!0,get:function(){return it.NotificationType6}});Object.defineProperty(q,"NotificationType7",{enumerable:!0,get:function(){return it.NotificationType7}});Object.defineProperty(q,"NotificationType8",{enumerable:!0,get:function(){return it.NotificationType8}});Object.defineProperty(q,"NotificationType9",{enumerable:!0,get:function(){return it.NotificationType9}});Object.defineProperty(q,"ParameterStructures",{enumerable:!0,get:function(){return it.ParameterStructures}});var tT=Av();Object.defineProperty(q,"LinkedMap",{enumerable:!0,get:function(){return tT.LinkedMap}});Object.defineProperty(q,"LRUCache",{enumerable:!0,get:function(){return tT.LRUCache}});Object.defineProperty(q,"Touch",{enumerable:!0,get:function(){return tT.Touch}});var qz=bE();Object.defineProperty(q,"Disposable",{enumerable:!0,get:function(){return qz.Disposable}});var qE=$s();Object.defineProperty(q,"Event",{enumerable:!0,get:function(){return qE.Event}});Object.defineProperty(q,"Emitter",{enumerable:!0,get:function(){return qE.Emitter}});var ME=sd();Object.defineProperty(q,"CancellationTokenSource",{enumerable:!0,get:function(){return ME.CancellationTokenSource}});Object.defineProperty(q,"CancellationToken",{enumerable:!0,get:function(){return ME.CancellationToken}});var FE=SE();Object.defineProperty(q,"SharedArraySenderStrategy",{enumerable:!0,get:function(){return FE.SharedArraySenderStrategy}});Object.defineProperty(q,"SharedArrayReceiverStrategy",{enumerable:!0,get:function(){return FE.SharedArrayReceiverStrategy}});var rT=CE();Object.defineProperty(q,"MessageReader",{enumerable:!0,get:function(){return rT.MessageReader}});Object.defineProperty(q,"AbstractMessageReader",{enumerable:!0,get:function(){return rT.AbstractMessageReader}});Object.defineProperty(q,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return rT.ReadableStreamMessageReader}});var nT=kE();Object.defineProperty(q,"MessageWriter",{enumerable:!0,get:function(){return nT.MessageWriter}});Object.defineProperty(q,"AbstractMessageWriter",{enumerable:!0,get:function(){return nT.AbstractMessageWriter}});Object.defineProperty(q,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return nT.WriteableStreamMessageWriter}});var Mz=wE();Object.defineProperty(q,"AbstractMessageBuffer",{enumerable:!0,get:function(){return Mz.AbstractMessageBuffer}});var sr=LE();Object.defineProperty(q,"ConnectionStrategy",{enumerable:!0,get:function(){return sr.ConnectionStrategy}});Object.defineProperty(q,"ConnectionOptions",{enumerable:!0,get:function(){return sr.ConnectionOptions}});Object.defineProperty(q,"NullLogger",{enumerable:!0,get:function(){return sr.NullLogger}});Object.defineProperty(q,"createMessageConnection",{enumerable:!0,get:function(){return sr.createMessageConnection}});Object.defineProperty(q,"ProgressToken",{enumerable:!0,get:function(){return sr.ProgressToken}});Object.defineProperty(q,"ProgressType",{enumerable:!0,get:function(){return sr.ProgressType}});Object.defineProperty(q,"Trace",{enumerable:!0,get:function(){return sr.Trace}});Object.defineProperty(q,"TraceValues",{enumerable:!0,get:function(){return sr.TraceValues}});Object.defineProperty(q,"TraceFormat",{enumerable:!0,get:function(){return sr.TraceFormat}});Object.defineProperty(q,"SetTraceNotification",{enumerable:!0,get:function(){return sr.SetTraceNotification}});Object.defineProperty(q,"LogTraceNotification",{enumerable:!0,get:function(){return sr.LogTraceNotification}});Object.defineProperty(q,"ConnectionErrors",{enumerable:!0,get:function(){return sr.ConnectionErrors}});Object.defineProperty(q,"ConnectionError",{enumerable:!0,get:function(){return sr.ConnectionError}});Object.defineProperty(q,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return sr.CancellationReceiverStrategy}});Object.defineProperty(q,"CancellationSenderStrategy",{enumerable:!0,get:function(){return sr.CancellationSenderStrategy}});Object.defineProperty(q,"CancellationStrategy",{enumerable:!0,get:function(){return sr.CancellationStrategy}});Object.defineProperty(q,"MessageStrategy",{enumerable:!0,get:function(){return sr.MessageStrategy}});var Fz=Da();q.RAL=Fz.default});var GE=d(sT=>{"use strict";Object.defineProperty(sT,"__esModule",{value:!0});var fi=pd(),md=class t extends fi.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return t.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};md.emptyBuffer=new Uint8Array(0);var iT=class{constructor(e){this.socket=e,this._onData=new fi.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,fi.RAL)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),fi.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),fi.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),fi.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},aT=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),fi.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),fi.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),fi.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},jz=new TextEncoder,jE=Object.freeze({messageBuffer:Object.freeze({create:t=>new md(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(jz.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new iT(t),asWritableStream:t=>new aT(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function oT(){return jE}(function(t){function e(){fi.RAL.install(jE)}t.install=e})(oT||(oT={}));sT.default=oT});var cT=d(en=>{"use strict";var Gz=en&&en.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Uz=en&&en.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Gz(e,t,r)};Object.defineProperty(en,"__esModule",{value:!0});en.createMessageConnection=en.BrowserMessageWriter=en.BrowserMessageReader=void 0;var Hz=GE();Hz.default.install();var Ls=pd();Uz(pd(),en);var uT=class extends Ls.AbstractMessageReader{constructor(e){super(),this._onData=new Ls.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};en.BrowserMessageReader=uT;var lT=class extends Ls.AbstractMessageWriter{constructor(e){super(),this.port=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.port.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};en.BrowserMessageWriter=lT;function Kz(t,e,r,n){return r===void 0&&(r=Ls.NullLogger),Ls.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Ls.createMessageConnection)(t,e,r,n)}en.createMessageConnection=Kz});var Hr=d(Mt=>{"use strict";Object.defineProperty(Mt,"__esModule",{value:!0});Mt.Deferred=Mt.MutexLock=Mt.interruptAndCheck=Mt.isOperationCancelled=Mt.OperationCancelled=Mt.setInterruptionPeriod=Mt.startCancelableOperation=Mt.delayNextTick=void 0;var hd=cT();function UE(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}Mt.delayNextTick=UE;var fT=0,HE=10;function Wz(){return fT=Date.now(),new hd.CancellationTokenSource}Mt.startCancelableOperation=Wz;function Bz(t){HE=t}Mt.setInterruptionPeriod=Bz;Mt.OperationCancelled=Symbol("OperationCancelled");function KE(t){return t===Mt.OperationCancelled}Mt.isOperationCancelled=KE;async function Vz(t){if(t===hd.CancellationToken.None)return;let e=Date.now();if(e-fT>=HE&&(fT=e,await UE()),t.isCancellationRequested)throw Mt.OperationCancelled}Mt.interruptAndCheck=Vz;var dT=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new hd.CancellationTokenSource}lock(e){this.cancel();let r=new hd.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{KE(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};Mt.MutexLock=dT;var pT=class{constructor(){this.promise=new Promise((e,r)=>{this.resolve=n=>(e(n),this),this.reject=n=>(r(n),this)})}};Mt.Deferred=pT});var gd=d(yd=>{"use strict";Object.defineProperty(yd,"__esModule",{value:!0});yd.DefaultScopeComputation=void 0;var mT=cT(),WE=Ie(),zz=Hn(),BE=Hr(),hT=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=mT.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=WE.streamContents,i=mT.CancellationToken.None){let a=[];this.exportNode(e,a,r);for(let o of n(e))await(0,BE.interruptAndCheck)(i),this.exportNode(o,a,r);return a}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=mT.CancellationToken.None){let n=e.parseResult.value,i=new zz.MultiMap;for(let a of(0,WE.streamAllContents)(n))await(0,BE.interruptAndCheck)(r),this.processNode(a,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let a=this.nameProvider.getName(e);a&&n.add(i,this.descriptions.createDescription(e,a,r))}}};yd.DefaultScopeComputation=hT});var Td=d($a=>{"use strict";Object.defineProperty($a,"__esModule",{value:!0});$a.DefaultScopeProvider=$a.EMPTY_SCOPE=$a.StreamScope=void 0;var Yz=Ie(),vd=Xt(),qs=class{constructor(e,r,n){this.elements=e,this.outerScope=r,this.caseInsensitive=n?.caseInsensitive}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}};$a.StreamScope=qs;$a.EMPTY_SCOPE={getElement(){},getAllElements(){return vd.EMPTY_STREAM}};var yT=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=(0,Yz.getDocument)(e.container).precomputedScopes;if(i){let o=e.container;do{let s=i.get(o);s.length>0&&r.push((0,vd.stream)(s).filter(u=>this.reflection.isSubtype(u.type,n))),o=o.$container}while(o)}let a=this.getGlobalScope(n,e);for(let o=r.length-1;o>=0;o--)a=this.createScope(r[o],a);return a}createScope(e,r,n){return new qs((0,vd.stream)(e),r,n)}createScopeForNodes(e,r,n){let i=(0,vd.stream)(e).map(a=>{let o=this.nameProvider.getName(a);if(o)return this.descriptions.createDescription(a,o)}).nonNullable();return new qs(i,r,n)}getGlobalScope(e,r){return new qs(this.indexManager.allElements(e))}};$a.DefaultScopeProvider=yT});var Xi=d(Ms=>{"use strict";Object.defineProperty(Ms,"__esModule",{value:!0});Ms.relativeURI=Ms.equalURI=void 0;function Xz(t,e){return t?.toString()===e?.toString()}Ms.equalURI=Xz;function Jz(t,e){let r=t.path,n=e.path,i=r.split("/").filter(l=>l.length>0),a=n.split("/").filter(l=>l.length>0),o=0;for(;o<i.length&&i[o]===a[o];o++);let s="../".repeat(i.length-o),u=a.slice(o).join("/");return s+u}Ms.relativeURI=Jz});var YE=d(js=>{"use strict";Object.defineProperty(js,"__esModule",{value:!0});js.LangiumGrammarScopeComputation=js.LangiumGrammarScopeProvider=void 0;var Qz=gd(),gT=Td(),Fs=Ie(),VE=ze(),zE=Xt(),Zz=Xi(),vn=je(),vT=Jt(),TT=class extends gT.DefaultScopeProvider{constructor(e){super(e)}getScope(e){let r=this.reflection.getReferenceType(e);return r===vn.AbstractType?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=(0,Fs.getDocument)(r.container).precomputedScopes,a=(0,Fs.findRootNode)(r.container);if(i&&a){let s=i.get(a);s.length>0&&(n=(0,zE.stream)(s).filter(u=>u.type===vn.Interface||u.type===vn.Type))}let o=this.getGlobalScope(e,r);return n?this.createScope(n,o):o}getGlobalScope(e,r){let n=(0,Fs.getContainerOfType)(r.container,vn.isGrammar);if(!n)return gT.EMPTY_SCOPE;let i=(0,zE.stream)(n.imports).map(vT.resolveImportUri).nonNullable(),a=this.indexManager.allElements(e).filter(o=>i.some(s=>(0,Zz.equalURI)(o.documentUri,s)));return e===vn.AbstractType&&(a=a.filter(o=>o.type===vn.Interface||o.type===vn.Type)),new gT.StreamScope(a)}};js.LangiumGrammarScopeProvider=TT;var _T=class extends Qz.DefaultScopeComputation{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),(0,vn.isParserRule)(e)){if(!e.returnType&&!e.dataType){let a=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(a,a.name,n))}(0,Fs.streamAllContents)(e).forEach(a=>{if((0,vn.isAction)(a)&&a.inferredType){let o=(0,vT.getActionType)(a);o&&r.push(this.createInterfaceDescription(a,o,n))}})}}processNode(e,r,n){(0,vn.isReturnType)(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let a=e.$container;if(a&&(0,vn.isParserRule)(e)&&!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(a,this.createInterfaceDescription(o,o.name,r))}}processActionNode(e,r,n){let i=(0,Fs.findRootNode)(e);if(i&&(0,vn.isAction)(e)&&e.inferredType){let a=(0,vT.getActionType)(e);a&&n.add(i,this.createInterfaceDescription(e,a,r))}}createInterfaceDescription(e,r,n=(0,Fs.getDocument)(e)){var i;let a=(i=this.nameProvider.getNameNode(e))!==null&&i!==void 0?i:e.$cstNode;return{node:e,name:r,nameSegment:(0,VE.toDocumentSegment)(a),selectionSegment:(0,VE.toDocumentSegment)(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};js.LangiumGrammarScopeComputation=_T});var PT=d(wr=>{"use strict";var e2=wr&&wr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),t2=wr&&wr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),r2=wr&&wr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&e2(e,t,r);return t2(e,t),e};Object.defineProperty(wr,"__esModule",{value:!0});wr.LangiumGrammarValidator=wr.IssueCodes=wr.registerValidationChecks=void 0;var RT=yo(),Oa=Ie(),Ia=Hn(),bT=ze(),xa=Nt(),ST=Xt(),at=r2(je()),CT=je(),Qt=Jt(),n2=Vg(),AT=Jf();function i2(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion};e.register(n,r)}wr.registerValidationChecks=i2;var kr;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(kr=wr.IssueCodes||(wr.IssueCodes={}));var ET=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",code:kr.GrammarNameUppercase})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>at.isParserRule(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(a=>at.isParserRule(a)&&!(0,Qt.isDataTypeRule)(a));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",code:kr.EntryRuleTokenSyntax}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&(0,Qt.isDataTypeRule)(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>(0,ST.stream)(i.rules).filter(a=>!ql(a));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>(0,ST.stream)(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let a=new Ia.MultiMap;n(e).forEach(u=>a.add(u.name,u));for(let[,u]of a.entriesGroupedByKey())u.length>1&&u.forEach(l=>{r("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let o=new Set,s=(0,Qt.resolveTransitiveImports)(this.documents,e);for(let u of s)n(u).forEach(l=>o.add(l.name));for(let u of a.keys())o.has(u)&&a.get(u).forEach(c=>{r("error",`A ${i} with the name '${c.name}' already exists in an imported grammar.`,{node:c,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new Ia.MultiMap;for(let i of e.imports){let a=(0,Qt.resolveImport)(this.documents,i);a&&n.add(a,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((a,o)=>{o>0&&r("warning","The grammar is already being directly imported.",{node:a,tags:[RT.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let a of e.imports){let o=(0,Qt.resolveTransitiveImports)(this.documents,a);n.set(a,o)}let i=new Ia.MultiMap;for(let a of e.imports){let o=n.get(a);for(let s of e.imports){if(a===s)continue;let u=n.get(s),l=this.getDuplicateExportedRules(o,u);for(let c of l)i.add(a,c)}}for(let a of e.imports){let o=i.get(a);o.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+(0,ST.stream)(o).distinct().join(", "),{node:a,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(s=>!r.includes(s)).flatMap(s=>s.rules),a=r.flatMap(s=>s.rules),o=new Set;for(let s of i){let u=s.name;for(let l of a){let c=l.name;u===c&&o.add(l.name)}}return o}checkGrammarTypeInfer(e,r){var n,i,a;let o=new Set;for(let u of e.types)o.add(u.name);for(let u of e.interfaces)o.add(u.name);(0,Qt.resolveTransitiveImports)(this.documents,e).forEach(u=>{u.types.forEach(l=>o.add(l.name)),u.interfaces.forEach(l=>o.add(l.name))});for(let u of e.rules.filter(at.isParserRule)){if(ql(u))continue;let l=(0,Qt.isDataTypeRule)(u),c=!u.returnType&&!u.dataType,p=(0,Qt.getTypeNameWithoutError)(u);if(!l&&p&&o.has(p)===c){if((c||((n=u.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&u.inferredType===void 0)r("error",s(p,c),{node:u,property:"name",code:kr.MissingReturns});else if(c||((i=u.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let h=(0,xa.findNodeForKeyword)(u.inferredType.$cstNode,"infers");r("error",s(p,c),{node:u.inferredType,property:"name",code:kr.InvalidInfers,data:(0,bT.toDocumentSegment)(h)})}}else if(l&&c){let h=(0,xa.findNodeForKeyword)(u.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:u,property:"inferredType",code:kr.InvalidInfers,data:(0,bT.toDocumentSegment)(h)})}}for(let u of(0,Oa.streamAllContents)(e).filter(at.isAction)){let l=this.getActionType(u);if(l){let c=!!u.inferredType,p=(0,Qt.getTypeNameWithoutError)(u);if(u.type&&p&&o.has(p)===c){let h=c?(0,xa.findNodeForKeyword)(u.$cstNode,"infer"):(0,xa.findNodeForKeyword)(u.$cstNode,"{");r("error",s(p,c),{node:u,property:"type",code:c?kr.SuperfluousInfer:kr.MissingInfer,data:(0,bT.toDocumentSegment)(h)})}else if(l&&p&&o.has(p)&&c&&u.$cstNode){let h=(0,xa.findNodeForProperty)((a=u.inferredType)===null||a===void 0?void 0:a.$cstNode,"name"),R=(0,xa.findNodeForKeyword)(u.$cstNode,"{");h&&R&&r("error",`${p} is a declared type and cannot be redefined.`,{node:u,property:"type",code:kr.SuperfluousInfer,data:{start:R.range.end,end:h.range.start}})}}}function s(u,l){return l?`The type '${u}' is already explicitly declared and cannot be inferred.`:`The type '${u}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",code:kr.HiddenGrammarTokens})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=(0,Qt.terminalRegex)(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkUsedHiddenTerminalRule(e,r){let n=(0,Oa.getContainerOfType)(e,i=>at.isTerminalRule(i)||at.isParserRule(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;at.isTerminalRule(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;at.isTerminalRule(n)&&n.fragment&&(0,Oa.getContainerOfType)(e,at.isParserRule)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",code:kr.CrossRefTokenSyntax})}checkPackageImport(e,r){(0,Qt.resolveImport)(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",code:kr.UnnecessaryFileExtension})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,code:kr.UseRegexTokens})}}checkGrammarForUnusedRules(e,r){let n=(0,xa.getAllReachableRules)(e,!0);for(let i of e.rules)at.isTerminalRule(i)&&i.hidden||ql(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[RT.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new Ia.MultiMap,i=new Set;for(let l of e.rules)at.isTerminalRule(l)&&l.name&&n.add(l.name,l),at.isParserRule(l)&&(0,Oa.streamAllContents)(l).filter(at.isKeyword).forEach(p=>i.add(p.value));let a=new Ia.MultiMap,o=new Ia.MultiMap;for(let l of e.imports){let c=(0,Qt.resolveTransitiveImports)(this.documents,l);for(let p of c)for(let h of p.rules)at.isTerminalRule(h)&&h.name?a.add(h.name,l):at.isParserRule(h)&&h.name&&(0,Oa.streamAllContents)(h).filter(at.isKeyword).forEach(y=>o.add(y.value,l))}for(let l of n.values())if(i.has(l.name))r("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(o.has(l.name)){let c=o.get(l.name);r("error",`Terminal name clashes with imported keyword from "${c[0].path}".`,{node:l,property:"name"})}let s=new Ia.MultiMap;for(let l of i)for(let c of a.get(l))s.add(c,l);for(let[l,c]of s.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let u=new Ia.MultiMap;for(let[l,c]of a.entriesGroupedByKey()){let p=o.get(l);p.length>0&&c.filter(h=>!p.includes(h)).forEach(h=>u.add(h,l))}for(let[l,c]of u.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,r){if(e.name&&!ql(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",code:kr.RuleNameUppercase})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&a2.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){(0,Oa.getContainerOfType)(e,CT.isParserRule)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{(0,Qt.isOptionalCardinality)(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,code:kr.OptionalUnorderedGroup})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=(0,Oa.streamAllContents)(e).filter(at.isParameterReference);for(let a of n)i.some(o=>o.parameter.ref===a)||r("hint",`Parameter '${a.name}' is unused.`,{node:a,tags:[RT.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(ql(e))return;let n=e.dataType,i=(0,Qt.isDataTypeRule)(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:"dataType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&(0,CT.isRuleCall)(e.terminal)&&(0,CT.isParserRule)(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;(0,Oa.streamAllContents)(e.terminal).map(a=>at.isCrossReference(a)?"ref":"other").find(a=>n?a!==n:(n=a,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=(0,n2.typeDefinitionToPropertyType)(n.type),a=(0,AT.flattenPlainType)(i),o=!1,s=!1;for(let u of a)(0,AT.isPlainReferenceType)(u)?o=!0:(0,AT.isPlainReferenceType)(u)||(s=!0);o&&s&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!(0,Qt.isPrimitiveType)(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(at.isParserRule(n)){let i=n.parameters.length,a=e.arguments.length;i!==a&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${a}.`,{node:e})}else at.isTerminalRule(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!(0,xa.findNameAssignment)(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){at.isRuleCall(e.terminal)&&at.isParserRule(e.terminal.rule.ref)&&!(0,Qt.isDataTypeRule)(e.terminal.rule.ref)&&r("error","Parser rules cannot be used for cross references.",{node:e.terminal,property:"rule"})}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkFragmentsInTypes(e,r){var n,i;at.isParserRule((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){at.isSimpleType(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&at.isParserRule(e.ref)&&!(0,Qt.isDataTypeRule)(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=(0,Qt.getTypeNameWithoutError)(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&at.isCrossReference(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};wr.LangiumGrammarValidator=ET;function ql(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var a2=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"])});var bd=d(Bn=>{"use strict";Object.defineProperty(Bn,"__esModule",{value:!0});Bn.DocumentValidator=Bn.toDiagnosticSeverity=Bn.getDiagnosticRange=Bn.DefaultDocumentValidator=void 0;var Tn=Fe(),XE=Nt(),o2=Ie(),s2=ze(),_d=Hr(),kT=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r=Tn.CancellationToken.None){let n=e.parseResult,i=[];await(0,_d.interruptAndCheck)(r);for(let a of n.lexerErrors){let o={severity:Tn.DiagnosticSeverity.Error,range:{start:{line:a.line-1,character:a.column-1},end:{line:a.line-1,character:a.column+a.length-1}},message:a.message,code:Rd.LexingError,source:this.getSource()};i.push(o)}for(let a of n.parserErrors){let o;if(isNaN(a.token.startOffset)){if("previousToken"in a){let s=a.previousToken;if(isNaN(s.startOffset))o=Tn.Range.create(0,0,0,0);else{let u=Tn.Position.create(s.endLine-1,s.endColumn);o=Tn.Range.create(u,u)}}}else o=(0,s2.tokenToRange)(a.token);if(o){let s={severity:Tn.DiagnosticSeverity.Error,range:o,message:a.message,code:Rd.ParsingError,source:this.getSource()};i.push(s)}}for(let a of e.references){let o=a.error;if(o){let s={containerType:o.container.$type,property:o.property,refText:o.reference.$refText},u={node:o.container,property:o.property,index:o.index,code:Rd.LinkingError,data:s};i.push(this.toDiagnostic("error",o.message,u))}}try{i.push(...await this.validateAst(n.value,e,r))}catch(a){if((0,_d.isOperationCancelled)(a))throw a;console.error("An error occurred during validation:",a)}return await(0,_d.interruptAndCheck)(r),i}async validateAst(e,r,n=Tn.CancellationToken.None){let i=[],a=(o,s,u)=>{i.push(this.toDiagnostic(o,s,u))};return await Promise.all((0,o2.streamAst)(e).map(async o=>{await(0,_d.interruptAndCheck)(n);let s=this.validationRegistry.getChecks(o.$type);for(let u of s)await u(o,a,n)})),i}toDiagnostic(e,r,n){return{message:r,range:JE(n),severity:QE(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};Bn.DefaultDocumentValidator=kT;function JE(t){if(Tn.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=(0,XE.findNodeForProperty)(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=(0,XE.findNodeForKeyword)(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}Bn.getDiagnosticRange=JE;function QE(t){switch(t){case"error":return Tn.DiagnosticSeverity.Error;case"warning":return Tn.DiagnosticSeverity.Warning;case"info":return Tn.DiagnosticSeverity.Information;case"hint":return Tn.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}Bn.toDiagnosticSeverity=QE;var Rd;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(Rd=Bn.DocumentValidator||(Bn.DocumentValidator={}))});var nP=d(di=>{"use strict";var u2=di&&di.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),l2=di&&di.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),c2=di&&di.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&u2(e,t,r);return l2(e,t),e};Object.defineProperty(di,"__esModule",{value:!0});di.LangiumGrammarCodeActionProvider=void 0;var _n=Fe(),f2=ui(),ZE=Ie(),eP=ze(),d2=Nt(),tP=ko(),rP=Xi(),p2=bd(),wT=c2(je()),Rn=PT(),NT=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=a=>a&&n.push(a);for(let a of r.context.diagnostics)this.createCodeActions(a,e,i);return n}createCodeActions(e,r,n){switch(e.code){case Rn.IssueCodes.GrammarNameUppercase:case Rn.IssueCodes.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Rn.IssueCodes.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Rn.IssueCodes.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Rn.IssueCodes.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Rn.IssueCodes.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Rn.IssueCodes.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Rn.IssueCodes.MissingReturns:n(this.fixMissingReturns(e,r));break;case Rn.IssueCodes.InvalidInfers:case Rn.IssueCodes.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Rn.IssueCodes.MissingInfer:n(this.fixMissingInfer(e,r));break;case Rn.IssueCodes.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case p2.DocumentValidator.LinkingError:{let i=e.data;i&&i.containerType==="RuleCall"&&i.property==="rule"&&n(this.addNewRule(e,i,r)),i&&this.lookInGlobalScope(e,i,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:_n.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n){let i=r.textDocument.getText(n.range);return{title:`Correct ${i} usage`,kind:_n.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n)return{title:"Correct 'infer' usage",kind:_n.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.range.end,end:n.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){if(e.data)return{title:"Remove the 'infer' keyword",kind:_n.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.data,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:_n.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:_n.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:_n.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let a=(0,eP.findLeafNodeAtOffset)(i,n),o=(0,ZE.getContainerOfType)(a?.element,wT.isCharacterRange);if(o&&o.right&&o.$cstNode){let s=o.left.value,u=o.right.value;return{title:"Refactor into regular expression",kind:_n.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:o.$cstNode.range,newText:`/[${(0,tP.escapeRegExp)(s)}-${(0,tP.escapeRegExp)(u)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:_n.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,a=[],o=(0,d2.findNodeForProperty)(n.$cstNode,"definesHiddenTokens");if(o){let s=o.range.start,u=o.offset,l=n.$cstNode.text.indexOf(")",u)+1;a.push({newText:"",range:{start:s,end:r.textDocument.positionAt(l)}})}for(let s of i){let u=s.ref;if(u&&wT.isTerminalRule(u)&&!u.hidden&&u.$cstNode){let l=u.$cstNode.range.start;a.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:_n.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:a}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),a=n.parseResult.value.$cstNode;if(a){let o=(0,eP.findLeafNodeAtOffset)(a,i),s=(0,ZE.getContainerOfType)(o?.element,wT.isParserRule);if(s&&s.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:_n.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:s.$cstNode.range.end,end:s.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,a;let o={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},s=this.reflection.getReferenceType(o),u=this.indexManager.allElements(s).filter(h=>h.name===r.refText),l=[],c=-1,p=-1;for(let h of u){if((0,rP.equalURI)(h.documentUri,n.uri))continue;let R=m2(n.uri,h.documentUri),y,A="",w=n.parseResult.value,P=w.imports.find(C=>C.path&&R<C.path);if(P)y=(i=P.$cstNode)===null||i===void 0?void 0:i.range.start;else if(w.imports.length>0){let C=w.imports[w.imports.length-1].$cstNode.range.end;C&&(y={line:C.line+1,character:0})}else w.rules.length>0&&(y=(a=w.rules[0].$cstNode)===null||a===void 0?void 0:a.range.start,A=`
`);y&&((c<0||R.length<p)&&(c=l.length,p=R.length),l.push({title:`Add import to '${R}'`,kind:_n.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:y,end:y},newText:`import '${R}'
${A}`}]}}}))}return c>=0&&(l[c].isPreferred=!0),l}};di.LangiumGrammarCodeActionProvider=NT;function m2(t,e){let r=f2.Utils.dirname(t),n=(0,rP.relativeURI)(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}});var Cd=d(Sd=>{"use strict";Object.defineProperty(Sd,"__esModule",{value:!0});Sd.DefaultFoldingRangeProvider=void 0;var DT=Fe(),h2=Ie(),y2=ze(),$T=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let a=(0,h2.streamAllContents)(i).iterator(),o;do if(o=a.next(),!o.done){let s=o.value;this.shouldProcess(s)&&this.collectObjectFolding(e,s,r),this.shouldProcessContent(s)||a.prune()}while(!o.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let a=this.toFoldingRange(e,i);a&&n(a)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let a of(0,y2.flattenCst)(i))if(this.commentNames.includes(a.tokenType.name)){let o=this.toFoldingRange(e,a,DT.FoldingRangeKind.Comment);o&&n(o)}}}toFoldingRange(e,r,n){let i=r.range,a=i.start,o=i.end;if(!(o.line-a.line<2))return this.includeLastFoldingLine(r,n)||(o=e.textDocument.positionAt(e.textDocument.offsetAt({line:o.line,character:0})-1)),DT.FoldingRange.create(a.line,o.line,a.character,o.character,n)}includeLastFoldingLine(e,r){if(r===DT.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};Sd.DefaultFoldingRangeProvider=$T});var iP=d(Ad=>{"use strict";Object.defineProperty(Ad,"__esModule",{value:!0});Ad.LangiumGrammarFoldingRangeProvider=void 0;var g2=Cd(),v2=je(),OT=class extends g2.DefaultFoldingRangeProvider{shouldProcessContent(e){return!(0,v2.isParserRule)(e)}};Ad.LangiumGrammarFoldingRangeProvider=OT});var LT=d(Vn=>{"use strict";Object.defineProperty(Vn,"__esModule",{value:!0});Vn.Formatting=Vn.FormattingRegion=Vn.DefaultNodeFormatter=Vn.AbstractFormatter=void 0;var Ed=Nt(),IT=mr(),T2=Ie(),aP=ze(),Ml=Xt(),xT=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new Pd(e,this.collector)}formatDocument(e,r){return this.doDocumentFormat(e,r.options)}formatDocumentRange(e,r){return this.doDocumentFormat(e,r.options,r.range)}formatDocumentOnType(e,r){return this.doDocumentFormat(e,r.options,{start:{character:0,line:r.position.line},end:r.position})}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,a=(s,u,l)=>{var c,p;let h=this.nodeModeToKey(s,u),R=i.get(h),y=(c=l.options.priority)!==null&&c!==void 0?c:0,A=(p=R?.options.priority)!==null&&p!==void 0?p:0;(!R||A<=y)&&i.set(h,l)};this.collector=a,this.iterateAstFormatting(e,n);let o=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,o)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let a=n[n.length-1];if(a){let o=e.offsetAt(i.range.start),s=e.offsetAt(a.range.end);o<s&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=(0,T2.streamAllContents)(n).iterator(),a;do if(a=i.next(),!a.done){let o=a.value;this.insideRange(o.$cstNode.range,r)?this.format(o):i.prune()}while(!a.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let a={indentation:0,options:n,document:e.textDocument},o=[],u=this.iterateCstTree(e,a).iterator(),l,c;do if(c=u.next(),!c.done){let p=c.value,h=(0,IT.isLeafCstNode)(p),R=this.nodeModeToKey(p,"prepend"),y=r.get(R);if(r.delete(R),y){let P=this.createTextEdit(l,p,y,a);for(let C of P)C&&this.insideRange(C.range,i)&&this.isNecessary(C,e.textDocument)&&o.push(C)}let A=this.nodeModeToKey(p,"append"),w=r.get(A);if(r.delete(A),w){let P=(0,aP.getNextNode)(p);if(P){let C=this.createTextEdit(p,P,w,a);for(let b of C)b&&this.insideRange(b.range,i)&&this.isNecessary(b,e.textDocument)&&o.push(b)}}if(!y&&p.hidden){let P=this.createHiddenTextEdits(l,p,void 0,a);for(let C of P)C&&this.insideRange(C.range,i)&&this.isNecessary(C,e.textDocument)&&o.push(C)}h&&(l=p)}while(!c.done);return o}createHiddenTextEdits(e,r,n,i){var a;let o=r.range.start.line;if(e&&e.range.end.line===o)return[];let s=[],u={start:{character:0,line:o},end:r.range.start},l=i.document.getText(u),c=this.findFittingMove(u,(a=n?.moves)!==null&&a!==void 0?a:[],i),p=this.getExistingIndentationCharacterCount(l,i),R=this.getIndentationCharacterCount(i,c)-p;if(R===0)return[];let y="";R>0&&(y=(i.options.insertSpaces?" ":"	").repeat(R));let A=r.text.split(`
`);A[0]=l+A[0];for(let w=0;w<A.length;w++){let P=o+w,C={character:0,line:P};if(R>0)s.push({newText:y,range:{start:C,end:C}});else{let b=A[w],x=0;for(;x<b.length;x++){let G=b.charAt(x);if(G!==" "&&G!=="	")break}s.push({newText:"",range:{start:C,end:{line:P,character:Math.min(x,Math.abs(R))}}})}}return s}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var a;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let o={start:(a=e?.range.end)!==null&&a!==void 0?a:{character:0,line:0},end:r.range.start},s=this.findFittingMove(o,n.moves,i);if(!s)return[];let u=s.characters,l=s.lines,c=s.tabs,p=i.indentation;i.indentation+=c??0;let h=[];return u!==void 0?h.push(this.createSpaceTextEdit(o,u,n.options)):l!==void 0?h.push(this.createLineTextEdit(o,l,i,n.options)):c!==void 0&&h.push(this.createTabTextEdit(o,!!e,i)),(0,IT.isLeafCstNode)(r)&&(i.indentation=p),h}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let a=e.end.character-e.start.character;r=this.fitIntoOptions(r,a,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let a=e.end.line-e.start.line;r=this.fitIntoOptions(r,a,i);let s=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${s}`,range:e}}createTabTextEdit(e,r,n){let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),o=r?1:0,s=Math.max(e.end.line-e.start.line,o);return{newText:`${`
`.repeat(s)}${a}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let a of r){if(a.lines!==void 0&&i<=a.lines)return a;if(a.lines===void 0&&i===0)return a}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new Ml.TreeStreamImpl(i,a=>this.iterateCst(a,r)):Ml.EMPTY_STREAM}iterateCst(e,r){if(!(0,IT.isCompositeCstNode)(e))return Ml.EMPTY_STREAM;let n=r.indentation;return new Ml.StreamImpl(()=>({index:0}),i=>i.index<e.children.length?{done:!1,value:e.children[i.index++]}:(r.indentation=n,Ml.DONE_RESULT))}};Vn.AbstractFormatter=xT;var Pd=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new bn(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new bn(r,this.collector)}property(e,r){let n=(0,Ed.findNodeForProperty)(this.astNode.$cstNode,e,r);return new bn(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=(0,Ed.findNodesForProperty)(this.astNode.$cstNode,n);r.push(...i)}return new bn(r,this.collector)}keyword(e,r){let n=(0,Ed.findNodeForKeyword)(this.astNode.$cstNode,e,r);return new bn(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=(0,Ed.findNodesForKeyword)(this.astNode.$cstNode,n);r.push(...i)}return new bn(r,this.collector)}cst(e){return new bn([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new bn([],this.collector);let a=n[0],o=i[0];if(a.offset>o.offset){let s=a;a=o,o=s}return new bn((0,aP.getInteriorNodes)(a,o),this.collector)}};Vn.DefaultNodeFormatter=Pd;var bn=class t{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new t(this.nodes.slice(e,r),this.collector)}};Vn.FormattingRegion=bn;var _2;(function(t){function e(...c){return{options:{},moves:c.flatMap(p=>p.moves).sort(l)}}t.fit=e;function r(c){return i(0,c)}t.noSpace=r;function n(c){return i(1,c)}t.oneSpace=n;function i(c,p){return{options:p??{},moves:[{characters:c}]}}t.spaces=i;function a(c){return o(1,c)}t.newLine=a;function o(c,p){return{options:p??{},moves:[{lines:c}]}}t.newLines=o;function s(c){return{options:c??{},moves:[{tabs:1,lines:1}]}}t.indent=s;function u(c){return{options:c??{},moves:[{tabs:0}]}}t.noIndent=u;function l(c,p){var h,R,y,A,w,P;let C=(h=c.lines)!==null&&h!==void 0?h:0,b=(R=p.lines)!==null&&R!==void 0?R:0,x=(y=c.tabs)!==null&&y!==void 0?y:0,G=(A=p.tabs)!==null&&A!==void 0?A:0,Y=(w=c.characters)!==null&&w!==void 0?w:0,ce=(P=p.characters)!==null&&P!==void 0?P:0;return C<b?-1:C>b?1:x<G?-1:x>G?1:Y<ce?-1:Y>ce?1:0}})(_2=Vn.Formatting||(Vn.Formatting={}))});var oP=d(pi=>{"use strict";var R2=pi&&pi.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),b2=pi&&pi.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),S2=pi&&pi.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&R2(e,t,r);return b2(e,t),e};Object.defineProperty(pi,"__esModule",{value:!0});pi.LangiumGrammarFormatter=void 0;var qe=LT(),La=S2(je()),qT=class extends qe.AbstractFormatter{format(e){if(La.isCrossReference(e))this.getNodeFormatter(e).properties("type","terminal").surround(qe.Formatting.noSpace());else if(La.isParserRule(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(qe.Formatting.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(qe.Formatting.oneSpace()):r.property("name").append(qe.Formatting.noSpace()),r.properties("parameters").append(qe.Formatting.noSpace()),r.keywords(",").append(qe.Formatting.oneSpace()),r.keywords("<").append(qe.Formatting.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(qe.Formatting.noSpace()),r.interior(i,n).prepend(qe.Formatting.indent()),n.prepend(qe.Formatting.fit(qe.Formatting.noSpace(),qe.Formatting.newLine())),r.node(e).prepend(qe.Formatting.noIndent())}else if(La.isTerminalRule(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(qe.Formatting.oneSpace()),r.keyword("returns").append(qe.Formatting.oneSpace())),r.keywords("hidden","terminal","fragment").append(qe.Formatting.oneSpace()),r.keyword(":").prepend(qe.Formatting.noSpace()),r.keyword(";").prepend(qe.Formatting.fit(qe.Formatting.noSpace(),qe.Formatting.newLine())),r.node(e).prepend(qe.Formatting.noIndent())}else if(La.isAction(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(qe.Formatting.noSpace()),r.keywords(".","+=","=").surround(qe.Formatting.noSpace()),r.keyword("}").prepend(qe.Formatting.noSpace())}else if(La.isInferredType(e))this.getNodeFormatter(e).keywords("infer","infers").append(qe.Formatting.oneSpace());else if(La.isAssignment(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(qe.Formatting.noSpace());else if(La.isRuleCall(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(qe.Formatting.noSpace()),r.keyword(",").append(qe.Formatting.oneSpace()),r.properties("arguments").append(qe.Formatting.noSpace())}La.isAbstractElement(e)&&this.getNodeFormatter(e).property("cardinality").prepend(qe.Formatting.noSpace())}};pi.LangiumGrammarFormatter=qT});var Nd=d(Ft=>{"use strict";Object.defineProperty(Ft,"__esModule",{value:!0});Ft.SemanticTokensDecoder=Ft.AbstractSemanticTokenProvider=Ft.SemanticTokensBuilder=Ft.DefaultSemanticTokenOptions=Ft.AllSemanticTokenModifiers=Ft.AllSemanticTokenTypes=void 0;var Ce=Fe(),kd=Nt(),C2=Ie(),A2=Hr(),E2=ze();Ft.AllSemanticTokenTypes={[Ce.SemanticTokenTypes.class]:0,[Ce.SemanticTokenTypes.comment]:1,[Ce.SemanticTokenTypes.enum]:2,[Ce.SemanticTokenTypes.enumMember]:3,[Ce.SemanticTokenTypes.event]:4,[Ce.SemanticTokenTypes.function]:5,[Ce.SemanticTokenTypes.interface]:6,[Ce.SemanticTokenTypes.keyword]:7,[Ce.SemanticTokenTypes.macro]:8,[Ce.SemanticTokenTypes.method]:9,[Ce.SemanticTokenTypes.modifier]:10,[Ce.SemanticTokenTypes.namespace]:11,[Ce.SemanticTokenTypes.number]:12,[Ce.SemanticTokenTypes.operator]:13,[Ce.SemanticTokenTypes.parameter]:14,[Ce.SemanticTokenTypes.property]:15,[Ce.SemanticTokenTypes.regexp]:16,[Ce.SemanticTokenTypes.string]:17,[Ce.SemanticTokenTypes.struct]:18,[Ce.SemanticTokenTypes.type]:19,[Ce.SemanticTokenTypes.typeParameter]:20,[Ce.SemanticTokenTypes.variable]:21};Ft.AllSemanticTokenModifiers={[Ce.SemanticTokenModifiers.abstract]:1,[Ce.SemanticTokenModifiers.async]:2,[Ce.SemanticTokenModifiers.declaration]:4,[Ce.SemanticTokenModifiers.defaultLibrary]:8,[Ce.SemanticTokenModifiers.definition]:16,[Ce.SemanticTokenModifiers.deprecated]:32,[Ce.SemanticTokenModifiers.documentation]:64,[Ce.SemanticTokenModifiers.modification]:128,[Ce.SemanticTokenModifiers.readonly]:256,[Ce.SemanticTokenModifiers.static]:512};Ft.DefaultSemanticTokenOptions={legend:{tokenTypes:Object.keys(Ft.AllSemanticTokenTypes),tokenModifiers:Object.keys(Ft.AllSemanticTokenModifiers)},full:{delta:!0},range:!0};var wd=class extends Ce.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,a){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:a})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}};Ft.SemanticTokensBuilder=wd;var MT=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=Ce.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=Ce.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=Ce.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new wd;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,a=(0,C2.streamAst)(i,{range:this.currentRange}).iterator(),o;do if(o=a.next(),!o.done){await(0,A2.interruptAndCheck)(n);let s=o.value;this.highlightElement(s,r)==="prune"&&a.prune()}while(!o.done)}highlightToken(e){var r;let{range:n,type:i}=e,a=e.modifier;if(this.currentRange&&!(0,E2.inRange)(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let o=Ft.AllSemanticTokenTypes[i],s=0;if(a!==void 0){typeof a=="string"&&(a=[a]);for(let c of a){let p=Ft.AllSemanticTokenModifiers[c];s|=p}}let u=n.start.line,l=n.end.line;if(u===l){let c=n.start.character,p=n.end.character-c;this.currentTokensBuilder.push(u,c,p,o,s)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let c=n.start.character,p=this.currentDocument.textDocument.offsetAt(n.start),h=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(u,c,h-p,o,s)}else{let c=n.start,p=this.currentDocument.textDocument.offsetAt({line:u+1,character:0});this.currentTokensBuilder.push(c.line,c.character,p-c.character-1,o,s);for(let h=u+1;h<l;h++){let R=p;p=this.currentDocument.textDocument.offsetAt({line:h+1,character:0}),this.currentTokensBuilder.push(h,0,p-R-1,o,s)}this.currentTokensBuilder.push(l,0,n.end.character,o,s)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let a=(0,kd.findNodeForProperty)(e.node.$cstNode,e.property,e.index);a&&r.push(a)}else r.push(...(0,kd.findNodesForProperty)(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let a of r)this.highlightNode({node:a,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:a,modifier:o}=e,s=[];if(typeof a=="number"){let u=(0,kd.findNodeForKeyword)(r.$cstNode,n,a);u&&s.push(u)}else s.push(...(0,kd.findNodesForKeyword)(r.$cstNode,n));for(let u of s)this.highlightNode({node:u,type:i,modifier:o})}highlightNode(e){let{node:r,type:n,modifier:i}=e,a=r.range;this.highlightToken({range:a,type:n,modifier:i})}};Ft.AbstractSemanticTokenProvider=MT;var P2;(function(t){function e(n,i){let a=new Map;Object.entries(Ft.AllSemanticTokenTypes).forEach(([u,l])=>a.set(l,u));let o=0,s=0;return r(n.data,5).map(u=>{o+=u[0],u[0]!==0&&(s=0),s+=u[1];let l=u[2];return{offset:i.textDocument.offsetAt({line:o,character:s}),tokenType:a.get(u[3]),tokenModifiers:u[4],text:i.textDocument.getText({start:{line:o,character:s},end:{line:o,character:s+l}})}})}t.decode=e;function r(n,i){let a=[];for(let o=0;o<n.length;o+=i){let s=n.slice(o,o+i);a.push(s)}return a}})(P2=Ft.SemanticTokensDecoder||(Ft.SemanticTokensDecoder={}))});var sP=d(Dd=>{"use strict";Object.defineProperty(Dd,"__esModule",{value:!0});Dd.LangiumGrammarSemanticTokenProvider=void 0;var qa=Fe(),k2=Nd(),Ma=je(),FT=class extends k2.AbstractSemanticTokenProvider{highlightElement(e,r){var n;(0,Ma.isAssignment)(e)?r({node:e,property:"feature",type:qa.SemanticTokenTypes.property}):(0,Ma.isAction)(e)?e.feature&&r({node:e,property:"feature",type:qa.SemanticTokenTypes.property}):(0,Ma.isReturnType)(e)?r({node:e,property:"name",type:qa.SemanticTokenTypes.type}):(0,Ma.isSimpleType)(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:qa.SemanticTokenTypes.type}):(0,Ma.isParameter)(e)?r({node:e,property:"name",type:qa.SemanticTokenTypes.parameter}):(0,Ma.isParameterReference)(e)?r({node:e,property:"parameter",type:qa.SemanticTokenTypes.parameter}):(0,Ma.isRuleCall)(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:qa.SemanticTokenTypes.type}):(0,Ma.isTypeAttribute)(e)&&r({node:e,property:"name",type:qa.SemanticTokenTypes.property})}};Dd.LangiumGrammarSemanticTokenProvider=FT});var lP=d($d=>{"use strict";Object.defineProperty($d,"__esModule",{value:!0});$d.LangiumGrammarNameProvider=void 0;var w2=Es(),N2=Nt(),uP=je(),jT=class extends w2.DefaultNameProvider{getName(e){return(0,uP.isAssignment)(e)?e.feature:super.getName(e)}getNameNode(e){return(0,uP.isAssignment)(e)?(0,N2.findNodeForProperty)(e.$cstNode,"feature"):super.getNameNode(e)}};$d.LangiumGrammarNameProvider=jT});var Id=d(Od=>{"use strict";Object.defineProperty(Od,"__esModule",{value:!0});Od.DefaultReferences=void 0;var D2=Nt(),cP=mr(),Fa=Ie(),GT=ze(),fP=Xt(),$2=Xi(),UT=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=(0,D2.findAssignment)(e),n=e.element;if(r&&n){let i=n[r.feature];if((0,cP.isReference)(i))return i.ref;if(Array.isArray(i)){for(let a of i)if((0,cP.isReference)(a)&&a.$refNode&&a.$refNode.offset<=e.offset&&a.$refNode.end>=e.end)return a.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||(0,GT.isCstChildNode)(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){return r.onlyLocal?this.findLocalReferences(e,r.includeDeclaration):this.findGlobalReferences(e,r.includeDeclaration)}findGlobalReferences(e,r=!1){let n=[];if(r){let i=this.getReferenceToSelf(e);i&&n.push(i)}return n.push(...this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e))),(0,fP.stream)(n)}findLocalReferences(e,r=!1){let i=(0,Fa.getDocument)(e).parseResult.value,a=[];if(r){let o=this.getReferenceToSelf(e);o&&a.push(o)}return(0,Fa.streamAst)(i).forEach(o=>{(0,Fa.streamReferences)(o).forEach(({reference:s})=>{if(s.ref===e&&s.$refNode){let u=s.$refNode;a.push({sourceUri:(0,Fa.getDocument)(u.element).uri,sourcePath:this.nodeLocator.getAstNodePath(u.element),targetUri:(0,Fa.getDocument)(e).uri,targetPath:this.nodeLocator.getAstNodePath(e),segment:(0,GT.toDocumentSegment)(u),local:(0,$2.equalURI)((0,Fa.getDocument)(u.element).uri,(0,Fa.getDocument)(e).uri)})}})}),(0,fP.stream)(a)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=(0,Fa.getDocument)(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:(0,GT.toDocumentSegment)(r),local:!0}}}};Od.DefaultReferences=UT});var yP=d(Ld=>{"use strict";Object.defineProperty(Ld,"__esModule",{value:!0});Ld.LangiumGrammarReferences=void 0;var O2=Id(),gr=Ie(),dP=ze(),pP=Nt(),mP=Xt(),HT=Xi(),ur=je(),hP=Jt(),xd=Cs(),KT=class extends O2.DefaultReferences{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.element,n=(0,pP.findAssignment)(e);if(n&&n.feature==="feature"){if((0,ur.isAssignment)(r))return this.findAssignmentDeclaration(r);if((0,ur.isAction)(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findLocalReferences(e,r=!1){if((0,ur.isTypeAttribute)(e)){let i=(0,gr.getDocument)(e).parseResult.value;return this.findLocalReferencesToTypeAttribute(e,i,r)}else return super.findLocalReferences(e,r)}findGlobalReferences(e,r=!1){return(0,ur.isTypeAttribute)(e)?this.findReferencesToTypeAttribute(e,r):super.findGlobalReferences(e,r)}findLocalReferencesToTypeAttribute(e,r,n){let i=[],a=(0,gr.getContainerOfType)(e,ur.isInterface);if(a){let o=(0,xd.collectChildrenTypes)(a,this,this.documents,this.nodeLocator),s=[];if(o.forEach(u=>{let l=this.findLocalRulesWithReturnType(u,r);s.push(...l)}),(0,HT.equalURI)((0,gr.getDocument)(e).uri,(0,gr.getDocument)(r).uri)&&n){let u=this.getReferenceToSelf(e);u&&i.push(u)}s.forEach(u=>{let l=this.createReferencesToAttribute(u,e);i.push(...l)})}return(0,mP.stream)(i)}findReferencesToTypeAttribute(e,r){let n=[],i=(0,gr.getContainerOfType)(e,ur.isInterface);if(i){if(r){let s=this.getReferenceToSelf(e);s&&n.push(s)}let a=(0,xd.collectChildrenTypes)(i,this,this.documents,this.nodeLocator),o=[];a.forEach(s=>{let u=this.findRulesWithReturnType(s);o.push(...u)}),o.forEach(s=>{let u=this.createReferencesToAttribute(s,e);n.push(...u)})}return(0,mP.stream)(n)}createReferencesToAttribute(e,r){let n=[];if((0,ur.isParserRule)(e)){let i=(0,hP.extractAssignments)(e.definition).find(a=>a.feature===r.name);if(i?.$cstNode){let a=this.nameProvider.getNameNode(i);a&&n.push({sourceUri:(0,gr.getDocument)(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:(0,gr.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,dP.toDocumentSegment)(a),local:(0,HT.equalURI)((0,gr.getDocument)(i).uri,(0,gr.getDocument)(r).uri)})}}else{if(e.feature===r.name){let a=(0,pP.findNodeForProperty)(e.$cstNode,"feature");a&&n.push({sourceUri:(0,gr.getDocument)(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:(0,gr.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,dP.toDocumentSegment)(a),local:(0,HT.equalURI)((0,gr.getDocument)(e).uri,(0,gr.getDocument)(r).uri)})}let i=(0,gr.getContainerOfType)(e,ur.isParserRule);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=(0,gr.getContainerOfType)(e,ur.isParserRule),i=(0,hP.getActionAtElement)(e);if(i){let a=this.findActionDeclaration(i,e.feature);if(a)return a}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&((0,ur.isInterface)(n.returnType.ref)||(0,ur.isType)(n.returnType.ref))){let a=(0,xd.collectSuperTypes)(n.returnType.ref);for(let o of a){let s=o.attributes.find(u=>u.name===e.feature);if(s)return s}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,a=(0,xd.collectSuperTypes)(e.type.ref);for(let o of a){let s=o.attributes.find(u=>u.name===i);if(s)return s}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let a=this.documents.getOrCreateDocument(i.sourceUri),o=this.nodeLocator.getAstNode(a.parseResult.value,i.sourcePath);((0,ur.isParserRule)(o)||(0,ur.isAction)(o))&&r.push(o)}),r}findLocalRulesWithReturnType(e,r){let n=[];return(0,gr.streamAst)(r).filter(a=>{var o,s;return(0,ur.isParserRule)(a)&&((o=a.returnType)===null||o===void 0?void 0:o.ref)===e||(0,ur.isAction)(a)&&((s=a.type)===null||s===void 0?void 0:s.ref)===e}).forEach(a=>{((0,ur.isParserRule)(a)||(0,ur.isAction)(a))&&n.push(a)}),n}};Ld.LangiumGrammarReferences=KT});var VT=d(Sn=>{"use strict";var I2=Sn&&Sn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),x2=Sn&&Sn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),L2=Sn&&Sn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&I2(e,t,r);return x2(e,t),e};Object.defineProperty(Sn,"__esModule",{value:!0});Sn.findFirstFeatures=Sn.findNextFeatures=void 0;var vr=L2(je()),Ji=Jt(),q2=mr(),M2=Ie(),F2=Nt();function j2(t,e){let r={stacks:t,tokens:e};return G2(r),r.stacks.flat().forEach(i=>{i.property=void 0}),TP(r.stacks).map(i=>i[i.length-1])}Sn.findNextFeatures=j2;function WT(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,a=[],o=e.feature;if(n.has(o))return[];n.add(o);let s,u=o;for(;u.$container;)if(vr.isGroup(u.$container)){s=u.$container;break}else if(vr.isAbstractElement(u.$container))u=u.$container;else break;if((0,Ji.isArrayCardinality)(u.cardinality)){let l=Gs({next:{feature:u,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let c of l)i.add(c.feature);a.push(...l)}if(s){let l=s.elements.indexOf(u);l!==void 0&&l<s.elements.length-1&&a.push(...vP({feature:s,type:e.type,new:!1},l+1,r,n,i)),a.every(c=>(0,Ji.isOptionalCardinality)(c.feature.cardinality)||(0,Ji.isOptionalCardinality)(r.get(c.feature))||i.has(c.feature))&&a.push(...WT({next:{feature:s,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return a}function gP(t){return(0,q2.isAstNode)(t)&&(t={feature:t}),Gs({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}Sn.findFirstFeatures=gP;function Gs(t){var e,r,n;let{next:i,cardinalities:a,visited:o,plus:s}=t;if(i===void 0)return[];let{feature:u,type:l}=i;if(vr.isGroup(u)){if(o.has(u))return[];o.add(u)}if(vr.isGroup(u))return vP(i,0,a,o,s).map(c=>qd(c,u.cardinality,a));if(vr.isAlternatives(u)||vr.isUnorderedGroup(u))return u.elements.flatMap(c=>Gs({next:{feature:c,new:!1,type:l},cardinalities:a,visited:o,plus:s})).map(c=>qd(c,u.cardinality,a));if(vr.isAssignment(u)){let c={feature:u.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:u.feature};return Gs({next:c,cardinalities:a,visited:o,plus:s}).map(p=>qd(p,u.cardinality,a))}else{if(vr.isAction(u))return WT({next:{feature:u,new:!0,type:(0,Ji.getTypeName)(u),property:(r=i.property)!==null&&r!==void 0?r:u.feature},cardinalities:a,visited:o,plus:s});if(vr.isRuleCall(u)&&vr.isParserRule(u.rule.ref)){let c=u.rule.ref,p={feature:c.definition,new:!0,type:c.fragment?void 0:(n=(0,Ji.getExplicitRuleType)(c))!==null&&n!==void 0?n:c.name,property:i.property};return Gs({next:p,cardinalities:a,visited:o,plus:s}).map(h=>qd(h,u.cardinality,a))}else return[i]}}function qd(t,e,r){return r.set(t.feature,e),t}function vP(t,e,r,n,i){var a;let o=[],s;for(;e<t.feature.elements.length&&(s={feature:t.feature.elements[e++],new:!1,type:t.type},o.push(...Gs({next:s,cardinalities:r,visited:n,plus:i})),!!(0,Ji.isOptionalCardinality)((a=s.feature.cardinality)!==null&&a!==void 0?a:r.get(s.feature))););return o}function G2(t){for(let e of t.tokens){let r=TP(t.stacks,e);t.stacks=r}}function TP(t,e){let r=[];for(let n of t)r.push(...U2(n,e));return r}function U2(t,e){let r=new Map,n=new Set(t.map(a=>a.feature).filter(H2)),i=[];for(;t.length>0;){let a=t.pop(),o=WT({next:a,cardinalities:r,plus:n,visited:new Set}).filter(s=>e?BT(s.feature,e):!0);for(let s of o)i.push([...t,s]);if(!o.every(s=>(0,Ji.isOptionalCardinality)(s.feature.cardinality)||(0,Ji.isOptionalCardinality)(r.get(s.feature))))break}return i}function H2(t){if(t.cardinality==="+")return!0;let e=(0,M2.getContainerOfType)(t,vr.isAssignment);return!!(e&&e.cardinality==="+")}function BT(t,e){if(vr.isKeyword(t))return t.value===e.image;if(vr.isRuleCall(t))return K2(t.rule.ref,e);if(vr.isCrossReference(t)){let r=(0,F2.getCrossReferenceTerminal)(t);if(r)return BT(r,e)}return!1}function K2(t,e){return vr.isParserRule(t)?gP(t.definition).some(n=>BT(n.feature,e)):vr.isTerminalRule(t)?new RegExp((0,Ji.terminalRegex)(t)).test(e.image):!1}});var Fd=d(Cn=>{"use strict";var W2=Cn&&Cn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),B2=Cn&&Cn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),V2=Cn&&Cn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&W2(e,t,r);return B2(e,t),e};Object.defineProperty(Cn,"__esModule",{value:!0});Cn.DefaultCompletionProvider=Cn.mergeCompletionProviderOptions=void 0;var Fl=Fe(),jl=V2(je()),z2=Jt(),Y2=Ie(),X2=ze(),_P=Nt(),RP=Xt(),Md=VT();function J2(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}Cn.mergeCompletionProviderOptions=J2;var zT=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let i=e.parseResult.value.$cstNode;if(!i)return;let a=[],o=e.textDocument,s=o.getText(),u=o.offsetAt(r.position),l=P=>{let C=this.fillCompletionItem(o,u,P);C&&a.push(C)},c=(0,X2.findLeafNodeAtOffset)(i,this.backtrackToAnyToken(s,u)),p={document:e,textDocument:o,node:c?.element,offset:u,position:r.position};if(!c){let P=(0,_P.getEntryRule)(this.grammar);return await this.completionForRule(p,P,l),Fl.CompletionList.create(a,!0)}let h=this.backtrackToTokenStart(s,u),R=this.findFeaturesAt(o,h),y=[],A=this.canReparse()&&u!==h;A&&(y=this.findFeaturesAt(o,u));let w=P=>jl.isKeyword(P.feature)?P.feature.value:P.feature;return await Promise.all((0,RP.stream)(R).distinct(w).map(P=>this.completionFor(p,P,l))),A&&await Promise.all((0,RP.stream)(y).exclude(R,w).distinct(w).map(P=>this.completionFor(p,P,l))),Fl.CompletionList.create(a,!0)}canReparse(){return!1}findFeaturesAt(e,r){let n=e.getText({start:Fl.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),a=i.tokens;if(i.tokenIndex===0){let u=(0,_P.getEntryRule)(this.grammar),l=(0,Md.findFirstFeatures)({feature:u.definition,new:!0,type:(0,z2.getExplicitRuleType)(u)});return a.length>0?(a.shift(),(0,Md.findNextFeatures)(l.map(c=>[c]),a)):l}let o=[...a].splice(i.tokenIndex);return(0,Md.findNextFeatures)([i.elementStack.map(u=>({feature:u}))],o)}backtrackToAnyToken(e,r){for(r>=e.length&&(r=e.length-1);r>0&&/\s/.test(e.charAt(r));)r--;return r}backtrackToTokenStart(e,r){if(r<1)return r;let n=this.grammarConfig.nameRegexp,i=e.charAt(r-1);for(;r>0&&n.test(i);)r--,i=e.charAt(r-1);return r}async completionForRule(e,r,n){if(jl.isParserRule(r)){let i=(0,Md.findFirstFeatures)(r.definition);await Promise.all(i.map(a=>this.completionFor(e,a,n)))}}completionFor(e,r,n){if(jl.isKeyword(r.feature))return this.completionForKeyword(e,r.feature,n);if(jl.isCrossReference(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=(0,Y2.getContainerOfType)(r.feature,jl.isAssignment),a=e.node;if(i&&a){if(r.type&&(r.new||a.$type!==r.type)&&(a={$type:r.type,$container:a,$containerProperty:r.property}),!e)return;let o={reference:{},container:a,property:i.feature};try{let s=this.scopeProvider.getScope(o),u=new Set;s.getAllElements().forEach(l=>{!u.has(l.name)&&this.filterCrossReference(l)&&(n(this.createReferenceCompletionItem(l)),u.add(l.name))})}catch(s){console.error(s)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:Fl.CompletionItemKind.Reference,detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n({label:r.value,kind:Fl.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r,n){var i,a;let o;if(typeof n.label=="string")o=n.label;else if("node"in n){let c=this.nameProvider.getName(n.node);if(!c)return;o=c}else if("nodeDescription"in n)o=n.nodeDescription.name;else return;let s;typeof((i=n.textEdit)===null||i===void 0?void 0:i.newText)=="string"?s=n.textEdit.newText:typeof n.insertText=="string"?s=n.insertText:s=o;let u=(a=n.textEdit)!==null&&a!==void 0?a:this.buildCompletionTextEdit(e,r,o,s);return u?{additionalTextEdits:n.additionalTextEdits,command:n.command,commitCharacters:n.commitCharacters,data:n.data,detail:n.detail,documentation:n.documentation,filterText:n.filterText,insertText:n.insertText,insertTextFormat:n.insertTextFormat,insertTextMode:n.insertTextMode,kind:n.kind,labelDetails:n.labelDetails,preselect:n.preselect,sortText:n.sortText,tags:n.tags,textEditText:n.textEditText,textEdit:u,label:o}:void 0}buildCompletionTextEdit(e,r,n,i){let a=e.getText(),o=this.backtrackToTokenStart(a,r),s=a.substring(o,r);if(this.charactersFuzzyMatch(s,n)){let u=e.positionAt(o),l=e.positionAt(r);return{newText:i,range:{start:u,end:l}}}else return}isWordCharacterAt(e,r){return this.grammarConfig.nameRegexp.test(e.charAt(r))}charactersFuzzyMatch(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,a=0,o=r.length;for(let s=0;s<o;s++){let u=r.charCodeAt(s),l=e.charCodeAt(a);if((u===l||this.toUpperCharCode(u)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,u)),n&&a++,a===e.length))return!0;i=u}return!1}isWordTransition(e,r){return bP<=e&&e<=SP&&Q2<=r&&r<=Z2||e===CP&&r!==CP}toUpperCharCode(e){return bP<=e&&e<=SP?e-32:e}};Cn.DefaultCompletionProvider=zT;var bP=97,SP=122,Q2=65,Z2=90,CP=95});var JT=d(jd=>{"use strict";Object.defineProperty(jd,"__esModule",{value:!0});jd.AbstractCallHierarchyProvider=void 0;var e3=Fe(),AP=ui(),YT=ze(),XT=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=(0,YT.findDeclarationNodeAtOffset)(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclarationNode(i);if(a)return this.getCallHierarchyItems(a.element,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:e3.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(AP.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,YT.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findReferences(i.element,{includeDeclaration:!1,onlyLocal:!1});return this.getIncomingCalls(i.element,a)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(AP.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,YT.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.element)}};jd.AbstractCallHierarchyProvider=XT});var PP=d(EP=>{"use strict";Object.defineProperty(EP,"__esModule",{value:!0})});var wP=d(kP=>{"use strict";Object.defineProperty(kP,"__esModule",{value:!0})});var DP=d(NP=>{"use strict";Object.defineProperty(NP,"__esModule",{value:!0})});var ZT=d(Gd=>{"use strict";Object.defineProperty(Gd,"__esModule",{value:!0});Gd.DefaultDefinitionProvider=void 0;var t3=Fe(),r3=Ie(),n3=ze(),QT=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,a=(0,n3.findDeclarationNodeAtOffset)(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a)return this.collectLocationLinks(a,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[t3.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.element.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.element){let n=(0,r3.getDocument)(r.element);if(r&&n)return{source:e,target:r,targetDocument:n}}}};Gd.DefaultDefinitionProvider=QT});var t_=d(Ud=>{"use strict";Object.defineProperty(Ud,"__esModule",{value:!0});Ud.DefaultDocumentHighlightProvider=void 0;var i3=Fe(),a3=Ie(),o3=ze(),s3=Xi(),e_=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=(0,o3.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclaration(i);if(a){let o=[],u={onlyLocal:!0,includeDeclaration:(0,s3.equalURI)((0,a3.getDocument)(a).uri,e.uri)};return this.references.findReferences(a,u).forEach(l=>{o.push(this.createDocumentHighlight(l))}),o}}createDocumentHighlight(e){return i3.DocumentHighlight.create(e.segment.range)}};Ud.DefaultDocumentHighlightProvider=e_});var OP=d($P=>{"use strict";Object.defineProperty($P,"__esModule",{value:!0})});var n_=d(Hd=>{"use strict";Object.defineProperty(Hd,"__esModule",{value:!0});Hd.DefaultDocumentSymbolProvider=void 0;var u3=Fe(),l3=Ie(),r_=class{constructor(e){this.nameProvider=e.references.NameProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let a=this.nameProvider.getName(r);return[{kind:this.getSymbolKind(r.$type),name:a??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of(0,l3.streamContents)(r)){let a=this.getSymbol(e,i);n.push(...a)}if(n.length>0)return n}getSymbolKind(e){return u3.SymbolKind.Field}};Hd.DefaultDocumentSymbolProvider=r_});var IP=d(Kd=>{"use strict";Object.defineProperty(Kd,"__esModule",{value:!0});Kd.AbstractExecuteCommandHandler=void 0;var c3=Fe(),i_=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=c3.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};Kd.AbstractExecuteCommandHandler=i_});var o_=d(Us=>{"use strict";Object.defineProperty(Us,"__esModule",{value:!0});Us.MultilineCommentHoverProvider=Us.AstNodeHoverProvider=void 0;var f3=ze(),Wd=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let a=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(a){let o=e.textDocument.offsetAt(r.position),s=(0,f3.findDeclarationNodeAtOffset)(a,o,this.grammarConfig.nameRegexp);if(s&&s.offset+s.length>o){let u=this.references.findDeclaration(s);if(u)return this.getAstNodeHoverContent(u)}}}};Us.AstNodeHoverProvider=Wd;var a_=class extends Wd{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};Us.MultilineCommentHoverProvider=a_});var xP=d(Bd=>{"use strict";Object.defineProperty(Bd,"__esModule",{value:!0});Bd.AbstractGoToImplementationProvider=void 0;var d3=Fe(),p3=ze(),s_=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getImplementation(e,r,n=d3.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,p3.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToImplementationLocationLinks(o,n)}}}};Bd.AbstractGoToImplementationProvider=s_});var LP=d(Vd=>{"use strict";Object.defineProperty(Vd,"__esModule",{value:!0});Vd.AbstractInlayHintProvider=void 0;var m3=Fe(),h3=Ie(),y3=Hr(),u_=class{async getInlayHints(e,r,n=m3.CancellationToken.None){let i=e.parseResult.value,a=[],o=s=>a.push(s);for(let s of(0,h3.streamAst)(i,{range:r.range}))await(0,y3.interruptAndCheck)(n),this.computeInlayHint(s,o);return a}};Vd.AbstractInlayHintProvider=u_});var ja=d(Qi=>{"use strict";Object.defineProperty(Qi,"__esModule",{value:!0});Qi.DefaultLangiumDocuments=Qi.DefaultLangiumDocumentFactory=Qi.DocumentState=void 0;var g3=(ag(),XS(ig)),v3=ui(),T3=Xt(),Hs;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(Hs=Qi.DocumentState||(Qi.DocumentState={}));var l_=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??v3.URI.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let a;if(n)a={parseResult:e,uri:r,state:Hs.Parsed,references:[],textDocument:n};else{let o=this.createTextDocumentGetter(r,i);a={parseResult:e,uri:r,state:Hs.Parsed,references:[],get textDocument(){return o()}}}return e.value.$document=a,a}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e.state=Hs.Parsed,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=g3.TextDocument.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}};Qi.DefaultLangiumDocumentFactory=l_;var c_=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return(0,T3.stream)(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=Hs.Changed,n.references=[],n.precomputedScopes=void 0,n.diagnostics=[]),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=Hs.Changed,this.documentMap.delete(r)),n}};Qi.DefaultLangiumDocuments=c_});var d_=d(Ks=>{"use strict";Object.defineProperty(Ks,"__esModule",{value:!0});Ks.mergeSignatureHelpOptions=Ks.AbstractSignatureHelpProvider=void 0;var _3=Fe(),R3=ze(),f_=class{provideSignatureHelp(e,r,n=_3.CancellationToken.None){let a=e.parseResult.value.$cstNode;if(a){let o=(0,R3.findLeafNodeAtOffset)(a,e.textDocument.offsetAt(r.position));if(o)return this.getSignatureFromElement(o.element,n)}}get signatureHelpOptions(){return{triggerCharacters:["("],retriggerCharacters:[","]}}};Ks.AbstractSignatureHelpProvider=f_;function b3(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}Ks.mergeSignatureHelpOptions=b3});var h_=d(re=>{"use strict";Object.defineProperty(re,"__esModule",{value:!0});re.createRequestHandler=re.createServerRequestHandler=re.createCallHierarchyRequestHandler=re.addCallHierarchyHandler=re.addCodeLensHandler=re.addSignatureHelpHandler=re.addDocumentLinkHandler=re.addExecuteCommandHandler=re.addConfigurationChangeHandler=re.addSemanticTokenHandler=re.addInlayHintHandler=re.addRenameHandler=re.addFormattingHandler=re.addFoldingRangeHandler=re.addHoverHandler=re.addDocumentHighlightsHandler=re.addGoToDeclarationHandler=re.addGoToImplementationHandler=re.addGoToTypeDefinitionHandler=re.addGotoDefinitionHandler=re.addDocumentSymbolHandler=re.addCodeActionHandler=re.addFindReferencesHandler=re.addCompletionHandler=re.addDiagnosticsHandler=re.addDocumentsHandler=re.startLanguageServer=re.DefaultLanguageServer=void 0;var Io=Fe(),Gl=ui(),qP=_l(),S3=Hr(),C3=ja(),A3=Fd(),E3=Nd(),P3=d_(),p_=class{constructor(e){this.onInitializeEmitter=new Io.Emitter,this.onInitializedEmitter=new Io.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){(0,qP.eagerLoad)(this.services),this.services.ServiceRegistry.all.forEach(e=>(0,qP.eagerLoad)(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(I=>I.lsp.Formatter),a=n.map(I=>{var H;return(H=I.lsp.Formatter)===null||H===void 0?void 0:H.formatOnTypeOptions}).find(I=>!!I),o=this.hasService(I=>I.lsp.CodeActionProvider),s=this.hasService(I=>I.lsp.SemanticTokenProvider),u=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,l=this.services.lsp.DocumentLinkProvider,c=(0,P3.mergeSignatureHelpOptions)(n.map(I=>{var H;return(H=I.lsp.SignatureHelp)===null||H===void 0?void 0:H.signatureHelpOptions})),p=this.hasService(I=>I.lsp.TypeProvider),h=this.hasService(I=>I.lsp.ImplementationProvider),R=this.hasService(I=>I.lsp.CompletionProvider),y=(0,A3.mergeCompletionProviderOptions)(n.map(I=>{var H;return(H=I.lsp.CompletionProvider)===null||H===void 0?void 0:H.completionOptions})),A=this.hasService(I=>I.lsp.ReferencesProvider),w=this.hasService(I=>I.lsp.DocumentSymbolProvider),P=this.hasService(I=>I.lsp.DefinitionProvider),C=this.hasService(I=>I.lsp.DocumentHighlightProvider),b=this.hasService(I=>I.lsp.FoldingRangeProvider),x=this.hasService(I=>I.lsp.HoverProvider),G=this.hasService(I=>I.lsp.RenameProvider),Y=this.hasService(I=>I.lsp.CallHierarchyProvider),ce=this.services.lsp.CodeLensProvider,Ke=this.hasService(I=>I.lsp.DeclarationProvider),we=this.services.lsp.InlayHintProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:u&&{commands:u},textDocumentSync:Io.TextDocumentSyncKind.Incremental,completionProvider:R?y:void 0,referencesProvider:A,documentSymbolProvider:w,definitionProvider:P,typeDefinitionProvider:p,documentHighlightProvider:C,codeActionProvider:o,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:a,foldingRangeProvider:b,hoverProvider:x,renameProvider:G?{prepareProvider:!0}:void 0,semanticTokensProvider:s?E3.DefaultSemanticTokenOptions:void 0,signatureHelpProvider:c,implementationProvider:h,callHierarchyProvider:Y?{}:void 0,documentLinkProvider:l?{resolveProvider:!!l.resolveDocumentLink}:void 0,codeLensProvider:ce?{resolveProvider:!!ce.resolveCodeLens}:void 0,declarationProvider:Ke,inlayHintProvider:we?{resolveProvider:!!we.resolveInlayHint}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};re.DefaultLanguageServer=p_;function k3(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");MP(e,t),FP(e,t),jP(e,t),GP(e,t),HP(e,t),KP(e,t),WP(e,t),BP(e,t),zP(e,t),XP(e,t),JP(e,t),UP(e,t),QP(e,t),YP(e,t),ZP(e,t),ek(e,t),rk(e,t),ik(e,t),ok(e,t),ak(e,t),nk(e,t),tk(e,t),VP(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}re.startLanguageServer=k3;function MP(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(o,s){n.lock(u=>r.update(o,s,u))}e.workspace.TextDocuments.onDidChangeContent(o=>{i([Gl.URI.parse(o.document.uri)],[])}),t.onDidChangeWatchedFiles(o=>{let s=[],u=[];for(let l of o.changes){let c=Gl.URI.parse(l.uri);l.type===Io.FileChangeType.Deleted?u.push(c):s.push(c)}i(s,u)})}re.addDocumentsHandler=MP;function FP(t,e){e.workspace.DocumentBuilder.onBuildPhase(C3.DocumentState.Validated,async(n,i)=>{for(let a of n)if(a.diagnostics&&t.sendDiagnostics({uri:a.uri.toString(),diagnostics:a.diagnostics}),i.isCancellationRequested)return})}re.addDiagnosticsHandler=FP;function jP(t,e){t.onCompletion(lr((r,n,i,a)=>{var o;return(o=r.lsp.CompletionProvider)===null||o===void 0?void 0:o.getCompletion(n,i,a)},e))}re.addCompletionHandler=jP;function GP(t,e){t.onReferences(lr((r,n,i,a)=>{var o;return(o=r.lsp.ReferencesProvider)===null||o===void 0?void 0:o.findReferences(n,i,a)},e))}re.addFindReferencesHandler=GP;function UP(t,e){t.onCodeAction(lr((r,n,i,a)=>{var o;return(o=r.lsp.CodeActionProvider)===null||o===void 0?void 0:o.getCodeActions(n,i,a)},e))}re.addCodeActionHandler=UP;function HP(t,e){t.onDocumentSymbol(lr((r,n,i,a)=>{var o;return(o=r.lsp.DocumentSymbolProvider)===null||o===void 0?void 0:o.getSymbols(n,i,a)},e))}re.addDocumentSymbolHandler=HP;function KP(t,e){t.onDefinition(lr((r,n,i,a)=>{var o;return(o=r.lsp.DefinitionProvider)===null||o===void 0?void 0:o.getDefinition(n,i,a)},e))}re.addGotoDefinitionHandler=KP;function WP(t,e){t.onTypeDefinition(lr((r,n,i,a)=>{var o;return(o=r.lsp.TypeProvider)===null||o===void 0?void 0:o.getTypeDefinition(n,i,a)},e))}re.addGoToTypeDefinitionHandler=WP;function BP(t,e){t.onImplementation(lr((r,n,i,a)=>{var o;return(o=r.lsp.ImplementationProvider)===null||o===void 0?void 0:o.getImplementation(n,i,a)},e))}re.addGoToImplementationHandler=BP;function VP(t,e){t.onDeclaration(lr((r,n,i,a)=>{var o;return(o=r.lsp.DeclarationProvider)===null||o===void 0?void 0:o.getDeclaration(n,i,a)},e))}re.addGoToDeclarationHandler=VP;function zP(t,e){t.onDocumentHighlight(lr((r,n,i,a)=>{var o;return(o=r.lsp.DocumentHighlightProvider)===null||o===void 0?void 0:o.getDocumentHighlight(n,i,a)},e))}re.addDocumentHighlightsHandler=zP;function YP(t,e){t.onHover(lr((r,n,i,a)=>{var o;return(o=r.lsp.HoverProvider)===null||o===void 0?void 0:o.getHoverContent(n,i,a)},e))}re.addHoverHandler=YP;function XP(t,e){t.onFoldingRanges(lr((r,n,i,a)=>{var o;return(o=r.lsp.FoldingRangeProvider)===null||o===void 0?void 0:o.getFoldingRanges(n,i,a)},e))}re.addFoldingRangeHandler=XP;function JP(t,e){t.onDocumentFormatting(lr((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocument(n,i,a)},e)),t.onDocumentRangeFormatting(lr((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentRange(n,i,a)},e)),t.onDocumentOnTypeFormatting(lr((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentOnType(n,i,a)},e))}re.addFormattingHandler=JP;function QP(t,e){t.onRenameRequest(lr((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.rename(n,i,a)},e)),t.onPrepareRename(lr((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.prepareRename(n,i,a)},e))}re.addRenameHandler=QP;function ZP(t,e){var r;let n=e.lsp.InlayHintProvider;if(n){t.languages.inlayHint.on(Zi((a,o,s,u)=>n.getInlayHints(o,s,u),e));let i=(r=n.resolveInlayHint)===null||r===void 0?void 0:r.bind(n);i&&t.languages.inlayHint.resolve(async(a,o)=>{try{return await i(a,o)}catch(s){return xo(s)}})}}re.addInlayHintHandler=ZP;function ek(t,e){let r={data:[]};t.languages.semanticTokens.on(Zi((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,a,o):r,e)),t.languages.semanticTokens.onDelta(Zi((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,a,o):r,e)),t.languages.semanticTokens.onRange(Zi((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,a,o):r,e))}re.addSemanticTokenHandler=ek;function tk(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}re.addConfigurationChangeHandler=tk;function rk(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var a;try{return await r.executeCommand(n.command,(a=n.arguments)!==null&&a!==void 0?a:[],i)}catch(o){return xo(o)}})}re.addExecuteCommandHandler=rk;function nk(t,e){var r;let n=e.lsp.DocumentLinkProvider;if(n){t.onDocumentLinks(Zi((a,o,s,u)=>n.getDocumentLinks(o,s,u),e));let i=(r=n.resolveDocumentLink)===null||r===void 0?void 0:r.bind(n);i&&t.onDocumentLinkResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return xo(s)}})}}re.addDocumentLinkHandler=nk;function ik(t,e){t.onSignatureHelp(Zi((r,n,i,a)=>{var o;return(o=r.lsp.SignatureHelp)===null||o===void 0?void 0:o.provideSignatureHelp(n,i,a)},e))}re.addSignatureHelpHandler=ik;function ak(t,e){var r;let n=e.lsp.CodeLensProvider;if(n){t.onCodeLens(Zi((a,o,s,u)=>n.provideCodeLens(o,s,u),e));let i=(r=n.resolveCodeLens)===null||r===void 0?void 0:r.bind(n);i&&t.onCodeLensResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return xo(s)}})}}re.addCodeLensHandler=ak;function ok(t,e){t.languages.callHierarchy.onPrepare(Zi((r,n,i,a)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,a))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onIncomingCalls(m_((r,n,i)=>{var a;return r.lsp.CallHierarchyProvider&&(a=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&a!==void 0?a:null},e)),t.languages.callHierarchy.onOutgoingCalls(m_((r,n,i)=>{var a;return r.lsp.CallHierarchyProvider&&(a=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&a!==void 0?a:null},e))}re.addCallHierarchyHandler=ok;function m_(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let a=Gl.URI.parse(n.item.uri),o=r.getServices(a);if(!o){let s=`Could not find service instance for uri: '${a.toString()}'`;throw console.error(s),new Error(s)}try{return await t(o,n,i)}catch(s){return xo(s)}}}re.createCallHierarchyRequestHandler=m_;function Zi(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=Gl.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)throw console.error(`Could not find service instance for uri: '${o.toString()}'`),new Error;let u=r.getOrCreateDocument(o);if(!u)throw new Error;try{return await t(s,u,i,a)}catch(l){return xo(l)}}}re.createServerRequestHandler=Zi;function lr(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=Gl.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)return console.error(`Could not find service instance for uri: '${o.toString()}'`),null;let u=r.getOrCreateDocument(o);if(!u)return null;try{return await t(s,u,i,a)}catch(l){return xo(l)}}}re.createRequestHandler=lr;function xo(t){if((0,S3.isOperationCancelled)(t))return new Io.ResponseError(Io.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof Io.ResponseError)return t;throw t}});var g_=d(zd=>{"use strict";Object.defineProperty(zd,"__esModule",{value:!0});zd.DefaultReferencesProvider=void 0;var w3=Fe(),N3=ze(),y_=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=(0,N3.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],a=this.references.findDeclaration(e);if(a){let o={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(a,o).forEach(s=>{i.push(w3.Location.create(s.sourceUri.toString(),s.segment.range))})}return i}};zd.DefaultReferencesProvider=y_});var T_=d(Yd=>{"use strict";Object.defineProperty(Yd,"__esModule",{value:!0});Yd.DefaultRenameProvider=void 0;var D3=Fe(),$3=Es(),sk=ze(),v_=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let a=e.textDocument.offsetAt(r.position),o=(0,sk.findDeclarationNodeAtOffset)(i,a,this.grammarConfig.nameRegexp);if(!o)return;let s=this.references.findDeclaration(o);if(!s)return;let u={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(s,u).forEach(c=>{let p=D3.TextEdit.replace(c.segment.range,r.newName),h=c.sourceUri.toString();n[h]?n[h].push(p):n[h]=[p]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let a=(0,sk.findDeclarationNodeAtOffset)(n,i,this.grammarConfig.nameRegexp);if(!a)return;if(this.references.findDeclaration(a)||this.isNameNode(a))return a.range}}isNameNode(e){return e?.element&&(0,$3.isNamed)(e.element)&&e===this.nameProvider.getNameNode(e.element)}};Yd.DefaultRenameProvider=v_});var uk=d(Xd=>{"use strict";Object.defineProperty(Xd,"__esModule",{value:!0});Xd.AbstractTypeDefinitionProvider=void 0;var O3=Fe(),I3=ze(),__=class{constructor(e){this.references=e.references.References}getTypeDefinition(e,r,n=O3.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,I3.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position));if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToTypeLocationLinks(o,n)}}}};Xd.AbstractTypeDefinitionProvider=__});var R_=d(Ye=>{"use strict";var x3=Ye&&Ye.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Et=Ye&&Ye.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&x3(e,t,r)};Object.defineProperty(Ye,"__esModule",{value:!0});Et(Fd(),Ye);Et(VT(),Ye);Et(JT(),Ye);Et(PP(),Ye);Et(wP(),Ye);Et(DP(),Ye);Et(ZT(),Ye);Et(t_(),Ye);Et(OP(),Ye);Et(n_(),Ye);Et(IP(),Ye);Et(Cd(),Ye);Et(LT(),Ye);Et(o_(),Ye);Et(xP(),Ye);Et(LP(),Ye);Et(h_(),Ye);Et(g_(),Ye);Et(T_(),Ye);Et(Nd(),Ye);Et(d_(),Ye);Et(uk(),Ye)});var lk=d(Jd=>{"use strict";Object.defineProperty(Jd,"__esModule",{value:!0});Jd.LangiumGrammarDefinitionProvider=void 0;var b_=Fe(),L3=R_(),q3=Ie(),M3=Nt(),F3=je(),j3=Jt(),S_=class extends L3.DefaultDefinitionProvider{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,a,o,s,u;let l="path";if((0,F3.isGrammarImport)(e.element)&&((n=(0,M3.findAssignment)(e))===null||n===void 0?void 0:n.feature)===l){let c=(0,j3.resolveImport)(this.documents,e.element);if(c?.$document){let p=(i=this.findTargetObject(c))!==null&&i!==void 0?i:c,h=(o=(a=this.nameProvider.getNameNode(p))===null||a===void 0?void 0:a.range)!==null&&o!==void 0?o:b_.Range.create(0,0,0,0),R=(u=(s=p.$cstNode)===null||s===void 0?void 0:s.range)!==null&&u!==void 0?u:b_.Range.create(0,0,0,0);return[b_.LocationLink.create(c.$document.uri.toString(),R,h,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:(0,q3.streamContents)(e).head()}};Jd.LangiumGrammarDefinitionProvider=S_});var fk=d(Zd=>{"use strict";Object.defineProperty(Zd,"__esModule",{value:!0});Zd.LangiumGrammarCallHierarchyProvider=void 0;var ck=Fe(),G3=JT(),C_=Ie(),U3=ze(),Qd=je(),A_=class extends G3.AbstractCallHierarchyProvider{getIncomingCalls(e,r){if(!(0,Qd.isParserRule)(e))return;let n=new Map;if(r.forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!o.$cstNode)return;let s=(0,U3.findLeafNodeAtOffset)(o.$cstNode,i.segment.offset);if(!s)return;let u=(0,C_.getContainerOfType)(s.element,Qd.isParserRule);if(!u||!u.$cstNode)return;let l=this.nameProvider.getNameNode(u);if(!l)return;let c=i.sourceUri.toString(),p=c+"@"+l.text;n.has(p)?n.set(p,{parserRule:u.$cstNode,nameNode:l,targetNodes:[...n.get(p).targetNodes,s],docUri:c}):n.set(p,{parserRule:u.$cstNode,nameNode:l,targetNodes:[s],docUri:c})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:ck.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(a=>a.range)}))}getOutgoingCalls(e){if(!(0,Qd.isParserRule)(e))return;let r=(0,C_.streamAllContents)(e).filter(Qd.isRuleCall).toArray(),n=new Map;if(r.forEach(i=>{var a;let o=i.$cstNode;if(!o)return;let s=(a=i.rule.ref)===null||a===void 0?void 0:a.$cstNode;if(!s)return;let u=this.nameProvider.getNameNode(s.element);if(!u)return;let l=(0,C_.getDocument)(s.element).uri.toString(),c=l+"@"+u.text;n.has(c)?n.set(c,{refCstNode:s,to:u,from:[...n.get(c).from,o.range],docUri:l}):n.set(c,{refCstNode:s,to:u,from:[o.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:ck.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};Zd.LangiumGrammarCallHierarchyProvider=A_});var mk=d(rp=>{"use strict";Object.defineProperty(rp,"__esModule",{value:!0});rp.LangiumGrammarValidationResourcesCollector=void 0;var H3=Hn(),pk=Xt(),ep=je(),dk=Jt(),tp=Cs(),K3=Jg(),E_=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=(0,K3.collectValidationAst)(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,a=W3(e);for(let s of(0,tp.mergeTypesAndInterfaces)(r))i.set(s.name,{inferred:s,inferredNodes:a.get(s.name)});let o=(0,pk.stream)(e.interfaces).concat(e.types).reduce((s,u)=>s.set(u.name,u),new Map);for(let s of(0,tp.mergeTypesAndInterfaces)(n)){let u=o.get(s.name);if(u){let l=i.get(s.name);i.set(s.name,Object.assign(Object.assign({},l??{}),{declared:s,declaredNode:u}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=(0,tp.mergeInterfaces)(e,r),a=new Map(i.map(o=>[o.name,o]));for(let o of(0,tp.mergeInterfaces)(e,r))n.set(o.name,this.addSuperProperties(o,a,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let a of e.superTypes){let o=r.get(a.name);o&&i.push(...this.addSuperProperties(o,r,n))}return i}};rp.LangiumGrammarValidationResourcesCollector=E_;function W3({parserRules:t,datatypeRules:e}){let r=new H3.MultiMap;(0,pk.stream)(t).concat(e).forEach(i=>r.add((0,dk.getRuleType)(i),i));function n(i){if((0,ep.isAction)(i)){let a=(0,dk.getActionType)(i);a&&r.add(a,i)}((0,ep.isAlternatives)(i)||(0,ep.isGroup)(i)||(0,ep.isUnorderedGroup)(i))&&i.elements.forEach(a=>n(a))}return t.forEach(i=>n(i.definition)),r}});var hk=d(Ga=>{"use strict";Object.defineProperty(Ga,"__esModule",{value:!0});Ga.isInferredAndDeclared=Ga.isInferred=Ga.isDeclared=void 0;function B3(t){return t&&"declared"in t}Ga.isDeclared=B3;function V3(t){return t&&"inferred"in t}Ga.isInferred=V3;function z3(t){return t&&"inferred"in t&&"declared"in t}Ga.isInferredAndDeclared=z3});var yk=d(An=>{"use strict";var Y3=An&&An.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),X3=An&&An.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),J3=An&&An.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&Y3(e,t,r);return X3(e,t),e};Object.defineProperty(An,"__esModule",{value:!0});An.LangiumGrammarTypesValidator=An.registerTypeValidationChecks=void 0;var Ws=J3(je()),Q3=Hn(),Z3=Jt(),jt=Ss(),P_=hk();function e4(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency]};e.register(n,r)}An.registerTypeValidationChecks=e4;var k_=class{checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let a of i.typeToValidationInfo.values())if((0,P_.isDeclared)(a)&&(0,jt.isInterfaceType)(a.declared)&&Ws.isInterface(a.declaredNode)){let o=a;r4(o,r),n4(o,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let a of i.typeToValidationInfo.values())(0,P_.isInferred)(a)&&a.inferred instanceof jt.InterfaceType&&t4(a.inferred,r),(0,P_.isInferredAndDeclared)(a)&&o4(a,r)}checkActionIsNotUnionType(e,r){Ws.isType(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};An.LangiumGrammarTypesValidator=k_;function t4(t,e){t.properties.forEach(r=>{var n;let i=(0,jt.flattenPropertyUnion)(r.type);if(i.length>1){let a=s=>(0,jt.isReferenceType)(s)?"ref":"other",o=a(i[0]);if(i.slice(1).some(s=>a(s)!==o)){let s=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;s&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:s})}}})}function r4({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&((0,jt.isUnionType)(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function n4({declared:t,declaredNode:e},r){let n=t.properties.reduce((o,s)=>o.add(s.name,s),new Q3.MultiMap);for(let[o,s]of n.entriesGroupedByKey())if(s.length>1)for(let u of s)r("error",`Cannot have two properties with the same name '${o}'.`,{node:Array.from(u.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let o=0;o<i.length;o++)for(let s=o+1;s<i.length;s++){let u=i[o],l=i[s],c=(0,jt.isInterfaceType)(u)?u.superProperties:[],p=(0,jt.isInterfaceType)(l)?l.superProperties:[],h=i4(c,p);h.length>0&&r("error",`Cannot simultaneously inherit from '${u}' and '${l}'. Their ${h.map(R=>"'"+R+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let a=new Set;for(let o of i){let s=(0,jt.isInterfaceType)(o)?o.superProperties:[];for(let u of s)a.add(u.name)}for(let o of t.properties)if(a.has(o.name)){let s=e.attributes.find(u=>u.name===o.name);s&&r("error",`Cannot redeclare property '${o.name}'. It is already inherited from another interface.`,{node:s,property:"name"})}}function i4(t,e){let r=[];for(let n of t){let i=e.find(a=>a.name===n.name);i&&!a4(n,i)&&r.push(n.name)}return r}function a4(t,e){return(0,jt.isTypeAssignable)(t.type,e.type)&&(0,jt.isTypeAssignable)(e.type,t.type)}function o4(t,e){let{inferred:r,declared:n,declaredNode:i,inferredNodes:a}=t,o=n.name,s=c=>p=>a.forEach(h=>e("error",`${p}${c?` ${c}`:""}.`,h?.inferredType?{node:h?.inferredType,property:"name"}:{node:h,property:Ws.isAction(h)?"type":"name"})),u=(c,p)=>c.forEach(h=>e("error",p,{node:h,property:Ws.isAssignment(h)||Ws.isAction(h)?"feature":"name"})),l=c=>{a.forEach(p=>{Ws.isParserRule(p)&&(0,Z3.extractAssignments)(p.definition).find(R=>R.feature===c)===void 0&&e("error",`Property '${c}' is missing in a rule '${p.name}', but is required in type '${o}'.`,{node:p,property:"parameters"})})};if((0,jt.isUnionType)(r)&&(0,jt.isUnionType)(n))s4(r.type,n.type,s(`in a rule that returns type '${o}'`));else if((0,jt.isInterfaceType)(r)&&(0,jt.isInterfaceType)(n))u4(r,n,s(`in a rule that returns type '${o}'`),u,l);else{let c=`Inferred and declared versions of type '${o}' both have to be interfaces or unions.`;s()(c),e("error",c,{node:i,property:"name"})}}function s4(t,e,r){(0,jt.isTypeAssignable)(t,e)||r(`Cannot assign type '${(0,jt.propertyTypeToString)(t,"DeclaredType")}' to '${(0,jt.propertyTypeToString)(e,"DeclaredType")}'`)}function u4(t,e,r,n,i){let a=new Set(t.properties.map(l=>l.name)),o=new Map(t.allProperties.map(l=>[l.name,l])),s=new Map(e.superProperties.map(l=>[l.name,l]));for(let[l,c]of o.entries()){let p=s.get(l);if(p){let h=(0,jt.propertyTypeToString)(c.type,"DeclaredType"),R=(0,jt.propertyTypeToString)(p.type,"DeclaredType");if(!(0,jt.isTypeAssignable)(c.type,p.type)){let A=`The assigned type '${h}' is not compatible with the declared property '${l}' of type '${R}'.`;n(c.astNodes,A)}!p.optional&&c.optional&&i(l)}else a.has(l)&&n(c.astNodes,`A property '${l}' is not expected.`)}let u=new Set;for(let[l,c]of s.entries())!o.get(l)&&!c.optional&&u.add(l);if(u.size>0){let l=u.size>1?"Properties":"A property",c=u.size>1?"are expected":"is expected",p=Array.from(u).map(h=>`'${h}'`).sort().join(", ");r(`${l} ${p} ${c}.`)}}});var w_=d(Lo=>{"use strict";Object.defineProperty(Lo,"__esModule",{value:!0});Lo.createLangiumGrammarServices=Lo.LangiumGrammarModule=void 0;var gk=np(),vk=_l(),Tk=gE(),_k=YE(),Rk=PT(),l4=nP(),c4=iP(),f4=oP(),d4=sP(),p4=lP(),m4=yP(),h4=lk(),y4=fk(),g4=mk(),bk=yk(),v4=Hr(),T4=ja();Lo.LangiumGrammarModule={validation:{LangiumGrammarValidator:t=>new Rk.LangiumGrammarValidator(t),ValidationResourcesCollector:t=>new g4.LangiumGrammarValidationResourcesCollector(t),LangiumGrammarTypesValidator:()=>new bk.LangiumGrammarTypesValidator},lsp:{FoldingRangeProvider:t=>new c4.LangiumGrammarFoldingRangeProvider(t),CodeActionProvider:t=>new l4.LangiumGrammarCodeActionProvider(t),SemanticTokenProvider:t=>new d4.LangiumGrammarSemanticTokenProvider(t),Formatter:()=>new f4.LangiumGrammarFormatter,DefinitionProvider:t=>new h4.LangiumGrammarDefinitionProvider(t),CallHierarchyProvider:t=>new y4.LangiumGrammarCallHierarchyProvider(t)},references:{ScopeComputation:t=>new _k.LangiumGrammarScopeComputation(t),ScopeProvider:t=>new _k.LangiumGrammarScopeProvider(t),References:t=>new m4.LangiumGrammarReferences(t),NameProvider:()=>new p4.LangiumGrammarNameProvider}};function _4(t,e){let r=(0,vk.inject)((0,gk.createDefaultSharedModule)(t),Tk.LangiumGrammarGeneratedSharedModule,e),n=(0,vk.inject)((0,gk.createDefaultModule)({shared:r}),Tk.LangiumGrammarGeneratedModule,Lo.LangiumGrammarModule);return R4(r,n),r.ServiceRegistry.register(n),(0,Rk.registerValidationChecks)(n),(0,bk.registerTypeValidationChecks)(n),{shared:r,grammar:n}}Lo.createLangiumGrammarServices=_4;function R4(t,e){t.workspace.DocumentBuilder.onBuildPhase(T4.DocumentState.IndexedReferences,async(n,i)=>{for(let a of n){await(0,v4.interruptAndCheck)(i);let o=e.validation.ValidationResourcesCollector,s=a.parseResult.value;a.validationResources=o.collectValidationResources(s)}})}});var N_=d(Bs=>{"use strict";Object.defineProperty(Bs,"__esModule",{value:!0});Bs.EmptyFileSystem=Bs.EmptyFileSystemProvider=void 0;var ip=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}};Bs.EmptyFileSystemProvider=ip;Bs.EmptyFileSystem={fileSystemProvider:()=>new ip}});var Nt=d(Ae=>{"use strict";var b4=Ae&&Ae.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),S4=Ae&&Ae.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),C4=Ae&&Ae.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&b4(e,t,r);return S4(e,t),e};Object.defineProperty(Ae,"__esModule",{value:!0});Ae.createServicesForGrammar=Ae.loadGrammarFromJson=Ae.findNameAssignment=Ae.findAssignment=Ae.findNodesForKeywordInternal=Ae.findNodeForKeyword=Ae.findNodesForKeyword=Ae.findNodeForProperty=Ae.findNodesForProperty=Ae.isCommentTerminal=Ae.getCrossReferenceTerminal=Ae.getAllReachableRules=Ae.getHiddenRules=Ae.getEntryRule=void 0;var Ak=ui(),Sk=np(),Ck=_l(),A4=Zg(),Nr=C4(je()),E4=Jt(),Ek=w_(),P4=mr(),Vs=Ie(),k4=ze(),D_=N_();function Pk(t){return t.rules.find(e=>Nr.isParserRule(e)&&e.entry)}Ae.getEntryRule=Pk;function kk(t){return t.rules.filter(e=>Nr.isTerminalRule(e)&&e.hidden)}Ae.getHiddenRules=kk;function w4(t,e){let r=new Set,n=Pk(t);if(!n)return new Set(t.rules);let i=[n].concat(kk(t));for(let o of i)wk(o,r,e);let a=new Set;for(let o of t.rules)(r.has(o.name)||Nr.isTerminalRule(o)&&o.hidden)&&a.add(o);return a}Ae.getAllReachableRules=w4;function wk(t,e,r){e.add(t.name),(0,Vs.streamAllContents)(t).forEach(n=>{if(Nr.isRuleCall(n)||r&&Nr.isTerminalRuleCall(n)){let i=n.rule.ref;i&&!e.has(i.name)&&wk(i,e,r)}})}function N4(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=Nk(t.type.ref);return e?.terminal}}Ae.getCrossReferenceTerminal=N4;function D4(t){return t.hidden&&!" ".match((0,E4.terminalRegex)(t))}Ae.isCommentTerminal=D4;function $4(t,e){return!t||!e?[]:$_(t,e,t.element,!0)}Ae.findNodesForProperty=$4;function O4(t,e,r){if(!t||!e)return;let n=$_(t,e,t.element,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}Ae.findNodeForProperty=O4;function $_(t,e,r,n){if(!n){let i=(0,Vs.getContainerOfType)(t.feature,Nr.isAssignment);if(i&&i.feature===e)return[t]}return(0,P4.isCompositeCstNode)(t)&&t.element===r?t.children.flatMap(i=>$_(i,e,r,!1)):[]}function I4(t,e){return t?O_(t,e,t?.element):[]}Ae.findNodesForKeyword=I4;function x4(t,e,r){if(!t)return;let n=O_(t,e,t?.element);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}Ae.findNodeForKeyword=x4;function O_(t,e,r){if(t.element!==r)return[];if(Nr.isKeyword(t.feature)&&t.feature.value===e)return[t];let n=(0,k4.streamCst)(t).iterator(),i,a=[];do if(i=n.next(),!i.done){let o=i.value;o.element===r?Nr.isKeyword(o.feature)&&o.feature.value===e&&a.push(o):n.prune()}while(!i.done);return a}Ae.findNodesForKeywordInternal=O_;function L4(t){var e;let r=t.element;for(;r===((e=t.parent)===null||e===void 0?void 0:e.element);){let n=(0,Vs.getContainerOfType)(t.feature,Nr.isAssignment);if(n)return n;t=t.parent}}Ae.findAssignment=L4;function Nk(t){return Nr.isInferredType(t)&&(t=t.$container),Dk(t,new Map)}Ae.findNameAssignment=Nk;function Dk(t,e){var r;function n(i,a){let o;return(0,Vs.getContainerOfType)(i,Nr.isAssignment)||(o=Dk(a,e)),e.set(t,o),o}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of(0,Vs.streamAllContents)(t)){if(Nr.isAssignment(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(Nr.isRuleCall(i)&&Nr.isParserRule(i.rule.ref))return n(i,i.rule.ref);if(Nr.isSimpleType(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function q4(t){var e;let r=(0,Ek.createLangiumGrammarServices)(D_.EmptyFileSystem).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,Ak.URI.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}Ae.loadGrammarFromJson=q4;async function M4(t){var e,r,n,i,a,o;let s=(e=t.grammarServices)!==null&&e!==void 0?e:(0,Ek.createLangiumGrammarServices)(D_.EmptyFileSystem).grammar,u=Ak.URI.parse("memory:///grammar.langium"),l=s.shared.workspace.LangiumDocumentFactory,c=typeof t.grammar=="string"?l.fromString(t.grammar,u):(0,Vs.getDocument)(t.grammar),p=c.parseResult.value;await s.shared.workspace.DocumentBuilder.build([c],{validationChecks:"none"});let R=(r=t.parserConfig)!==null&&r!==void 0?r:{skipValidations:!1},y=(n=t.languageMetaData)!==null&&n!==void 0?n:{caseInsensitive:!1,fileExtensions:[`.${(a=(i=p.name)===null||i===void 0?void 0:i.toLowerCase())!==null&&a!==void 0?a:"unknown"}`],languageId:(o=p.name)!==null&&o!==void 0?o:"UNKNOWN"},A={AstReflection:()=>(0,A4.interpretAstReflection)(p)},w={Grammar:()=>p,LanguageMetaData:()=>y,parser:{ParserConfig:()=>R}},P=(0,Ck.inject)((0,Sk.createDefaultSharedModule)(D_.EmptyFileSystem),A,t.sharedModule),C=(0,Ck.inject)((0,Sk.createDefaultModule)({shared:P}),w,t.module);return P.ServiceRegistry.register(C),C}Ae.createServicesForGrammar=M4});var I_=d(ap=>{"use strict";Object.defineProperty(ap,"__esModule",{value:!0});ap.createGrammarConfig=void 0;var F4=ze(),j4=Nt(),G4=ko(),U4=je(),H4=Jt();function K4(t){let e=[],r=t.Grammar;for(let n of r.rules)(0,U4.isTerminalRule)(n)&&(0,j4.isCommentTerminal)(n)&&(0,G4.isMultilineComment)((0,H4.terminalRegex)(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:F4.DefaultNameRegexp}}ap.createGrammarConfig=K4});var x_=d(op=>{"use strict";Object.defineProperty(op,"__esModule",{value:!0});op.VERSION=void 0;op.VERSION="10.4.2"});var zs=d((vTe,$k)=>{var W4=Object.prototype;function B4(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||W4;return t===r}$k.exports=B4});var L_=d((TTe,Ok)=>{function V4(t,e){return function(r){return t(e(r))}}Ok.exports=V4});var xk=d((_Te,Ik)=>{var z4=L_(),Y4=z4(Object.keys,Object);Ik.exports=Y4});var q_=d((RTe,Lk)=>{var X4=zs(),J4=xk(),Q4=Object.prototype,Z4=Q4.hasOwnProperty;function e8(t){if(!X4(t))return J4(t);var e=[];for(var r in Object(t))Z4.call(t,r)&&r!="constructor"&&e.push(r);return e}Lk.exports=e8});var M_=d((bTe,qk)=>{var t8=typeof global=="object"&&global&&global.Object===Object&&global;qk.exports=t8});var zn=d((STe,Mk)=>{var r8=M_(),n8=typeof self=="object"&&self&&self.Object===Object&&self,i8=r8||n8||Function("return this")();Mk.exports=i8});var qo=d((CTe,Fk)=>{var a8=zn(),o8=a8.Symbol;Fk.exports=o8});var Hk=d((ATe,Uk)=>{var jk=qo(),Gk=Object.prototype,s8=Gk.hasOwnProperty,u8=Gk.toString,Ul=jk?jk.toStringTag:void 0;function l8(t){var e=s8.call(t,Ul),r=t[Ul];try{t[Ul]=void 0;var n=!0}catch{}var i=u8.call(t);return n&&(e?t[Ul]=r:delete t[Ul]),i}Uk.exports=l8});var Wk=d((ETe,Kk)=>{var c8=Object.prototype,f8=c8.toString;function d8(t){return f8.call(t)}Kk.exports=d8});var Ua=d((PTe,zk)=>{var Bk=qo(),p8=Hk(),m8=Wk(),h8="[object Null]",y8="[object Undefined]",Vk=Bk?Bk.toStringTag:void 0;function g8(t){return t==null?t===void 0?y8:h8:Vk&&Vk in Object(t)?p8(t):m8(t)}zk.exports=g8});var Yn=d((kTe,Yk)=>{function v8(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}Yk.exports=v8});var Ys=d((wTe,Xk)=>{var T8=Ua(),_8=Yn(),R8="[object AsyncFunction]",b8="[object Function]",S8="[object GeneratorFunction]",C8="[object Proxy]";function A8(t){if(!_8(t))return!1;var e=T8(t);return e==b8||e==S8||e==R8||e==C8}Xk.exports=A8});var Qk=d((NTe,Jk)=>{var E8=zn(),P8=E8["__core-js_shared__"];Jk.exports=P8});var tw=d((DTe,ew)=>{var F_=Qk(),Zk=function(){var t=/[^.]+$/.exec(F_&&F_.keys&&F_.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function k8(t){return!!Zk&&Zk in t}ew.exports=k8});var j_=d(($Te,rw)=>{var w8=Function.prototype,N8=w8.toString;function D8(t){if(t!=null){try{return N8.call(t)}catch{}try{return t+""}catch{}}return""}rw.exports=D8});var iw=d((OTe,nw)=>{var $8=Ys(),O8=tw(),I8=Yn(),x8=j_(),L8=/[\\^$.*+?()[\]{}|]/g,q8=/^\[object .+?Constructor\]$/,M8=Function.prototype,F8=Object.prototype,j8=M8.toString,G8=F8.hasOwnProperty,U8=RegExp("^"+j8.call(G8).replace(L8,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function H8(t){if(!I8(t)||O8(t))return!1;var e=$8(t)?U8:q8;return e.test(x8(t))}nw.exports=H8});var ow=d((ITe,aw)=>{function K8(t,e){return t?.[e]}aw.exports=K8});var Ha=d((xTe,sw)=>{var W8=iw(),B8=ow();function V8(t,e){var r=B8(t,e);return W8(r)?r:void 0}sw.exports=V8});var lw=d((LTe,uw)=>{var z8=Ha(),Y8=zn(),X8=z8(Y8,"DataView");uw.exports=X8});var sp=d((qTe,cw)=>{var J8=Ha(),Q8=zn(),Z8=J8(Q8,"Map");cw.exports=Z8});var dw=d((MTe,fw)=>{var e9=Ha(),t9=zn(),r9=e9(t9,"Promise");fw.exports=r9});var G_=d((FTe,pw)=>{var n9=Ha(),i9=zn(),a9=n9(i9,"Set");pw.exports=a9});var hw=d((jTe,mw)=>{var o9=Ha(),s9=zn(),u9=o9(s9,"WeakMap");mw.exports=u9});var Js=d((GTe,bw)=>{var U_=lw(),H_=sp(),K_=dw(),W_=G_(),B_=hw(),Rw=Ua(),Xs=j_(),yw="[object Map]",l9="[object Object]",gw="[object Promise]",vw="[object Set]",Tw="[object WeakMap]",_w="[object DataView]",c9=Xs(U_),f9=Xs(H_),d9=Xs(K_),p9=Xs(W_),m9=Xs(B_),Mo=Rw;(U_&&Mo(new U_(new ArrayBuffer(1)))!=_w||H_&&Mo(new H_)!=yw||K_&&Mo(K_.resolve())!=gw||W_&&Mo(new W_)!=vw||B_&&Mo(new B_)!=Tw)&&(Mo=function(t){var e=Rw(t),r=e==l9?t.constructor:void 0,n=r?Xs(r):"";if(n)switch(n){case c9:return _w;case f9:return yw;case d9:return gw;case p9:return vw;case m9:return Tw}return e});bw.exports=Mo});var Xn=d((UTe,Sw)=>{function h9(t){return t!=null&&typeof t=="object"}Sw.exports=h9});var Aw=d((HTe,Cw)=>{var y9=Ua(),g9=Xn(),v9="[object Arguments]";function T9(t){return g9(t)&&y9(t)==v9}Cw.exports=T9});var Hl=d((KTe,kw)=>{var Ew=Aw(),_9=Xn(),Pw=Object.prototype,R9=Pw.hasOwnProperty,b9=Pw.propertyIsEnumerable,S9=Ew(function(){return arguments}())?Ew:function(t){return _9(t)&&R9.call(t,"callee")&&!b9.call(t,"callee")};kw.exports=S9});var Ve=d((WTe,ww)=>{var C9=Array.isArray;ww.exports=C9});var up=d((BTe,Nw)=>{var A9=9007199254740991;function E9(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=A9}Nw.exports=E9});var Jn=d((VTe,Dw)=>{var P9=Ys(),k9=up();function w9(t){return t!=null&&k9(t.length)&&!P9(t)}Dw.exports=w9});var Ow=d((zTe,$w)=>{function N9(){return!1}$w.exports=N9});var Wl=d((Kl,Qs)=>{var D9=zn(),$9=Ow(),Lw=typeof Kl=="object"&&Kl&&!Kl.nodeType&&Kl,Iw=Lw&&typeof Qs=="object"&&Qs&&!Qs.nodeType&&Qs,O9=Iw&&Iw.exports===Lw,xw=O9?D9.Buffer:void 0,I9=xw?xw.isBuffer:void 0,x9=I9||$9;Qs.exports=x9});var Mw=d((YTe,qw)=>{var L9=Ua(),q9=up(),M9=Xn(),F9="[object Arguments]",j9="[object Array]",G9="[object Boolean]",U9="[object Date]",H9="[object Error]",K9="[object Function]",W9="[object Map]",B9="[object Number]",V9="[object Object]",z9="[object RegExp]",Y9="[object Set]",X9="[object String]",J9="[object WeakMap]",Q9="[object ArrayBuffer]",Z9="[object DataView]",e6="[object Float32Array]",t6="[object Float64Array]",r6="[object Int8Array]",n6="[object Int16Array]",i6="[object Int32Array]",a6="[object Uint8Array]",o6="[object Uint8ClampedArray]",s6="[object Uint16Array]",u6="[object Uint32Array]",ft={};ft[e6]=ft[t6]=ft[r6]=ft[n6]=ft[i6]=ft[a6]=ft[o6]=ft[s6]=ft[u6]=!0;ft[F9]=ft[j9]=ft[Q9]=ft[G9]=ft[Z9]=ft[U9]=ft[H9]=ft[K9]=ft[W9]=ft[B9]=ft[V9]=ft[z9]=ft[Y9]=ft[X9]=ft[J9]=!1;function l6(t){return M9(t)&&q9(t.length)&&!!ft[L9(t)]}qw.exports=l6});var Zs=d((XTe,Fw)=>{function c6(t){return function(e){return t(e)}}Fw.exports=c6});var zl=d((Bl,eu)=>{var f6=M_(),jw=typeof Bl=="object"&&Bl&&!Bl.nodeType&&Bl,Vl=jw&&typeof eu=="object"&&eu&&!eu.nodeType&&eu,d6=Vl&&Vl.exports===jw,V_=d6&&f6.process,p6=function(){try{var t=Vl&&Vl.require&&Vl.require("util").types;return t||V_&&V_.binding&&V_.binding("util")}catch{}}();eu.exports=p6});var lp=d((JTe,Hw)=>{var m6=Mw(),h6=Zs(),Gw=zl(),Uw=Gw&&Gw.isTypedArray,y6=Uw?h6(Uw):m6;Hw.exports=y6});var tn=d((QTe,Kw)=>{var g6=q_(),v6=Js(),T6=Hl(),_6=Ve(),R6=Jn(),b6=Wl(),S6=zs(),C6=lp(),A6="[object Map]",E6="[object Set]",P6=Object.prototype,k6=P6.hasOwnProperty;function w6(t){if(t==null)return!0;if(R6(t)&&(_6(t)||typeof t=="string"||typeof t.splice=="function"||b6(t)||C6(t)||T6(t)))return!t.length;var e=v6(t);if(e==A6||e==E6)return!t.size;if(S6(t))return!g6(t).length;for(var r in t)if(k6.call(t,r))return!1;return!0}Kw.exports=w6});var tu=d((ZTe,Ww)=>{function N6(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}Ww.exports=N6});var Vw=d((e_e,Bw)=>{function D6(){this.__data__=[],this.size=0}Bw.exports=D6});var ru=d((t_e,zw)=>{function $6(t,e){return t===e||t!==t&&e!==e}zw.exports=$6});var Yl=d((r_e,Yw)=>{var O6=ru();function I6(t,e){for(var r=t.length;r--;)if(O6(t[r][0],e))return r;return-1}Yw.exports=I6});var Jw=d((n_e,Xw)=>{var x6=Yl(),L6=Array.prototype,q6=L6.splice;function M6(t){var e=this.__data__,r=x6(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():q6.call(e,r,1),--this.size,!0}Xw.exports=M6});var Zw=d((i_e,Qw)=>{var F6=Yl();function j6(t){var e=this.__data__,r=F6(e,t);return r<0?void 0:e[r][1]}Qw.exports=j6});var tN=d((a_e,eN)=>{var G6=Yl();function U6(t){return G6(this.__data__,t)>-1}eN.exports=U6});var nN=d((o_e,rN)=>{var H6=Yl();function K6(t,e){var r=this.__data__,n=H6(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}rN.exports=K6});var Xl=d((s_e,iN)=>{var W6=Vw(),B6=Jw(),V6=Zw(),z6=tN(),Y6=nN();function nu(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}nu.prototype.clear=W6;nu.prototype.delete=B6;nu.prototype.get=V6;nu.prototype.has=z6;nu.prototype.set=Y6;iN.exports=nu});var oN=d((u_e,aN)=>{var X6=Xl();function J6(){this.__data__=new X6,this.size=0}aN.exports=J6});var uN=d((l_e,sN)=>{function Q6(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}sN.exports=Q6});var cN=d((c_e,lN)=>{function Z6(t){return this.__data__.get(t)}lN.exports=Z6});var dN=d((f_e,fN)=>{function e7(t){return this.__data__.has(t)}fN.exports=e7});var Jl=d((d_e,pN)=>{var t7=Ha(),r7=t7(Object,"create");pN.exports=r7});var yN=d((p_e,hN)=>{var mN=Jl();function n7(){this.__data__=mN?mN(null):{},this.size=0}hN.exports=n7});var vN=d((m_e,gN)=>{function i7(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}gN.exports=i7});var _N=d((h_e,TN)=>{var a7=Jl(),o7="__lodash_hash_undefined__",s7=Object.prototype,u7=s7.hasOwnProperty;function l7(t){var e=this.__data__;if(a7){var r=e[t];return r===o7?void 0:r}return u7.call(e,t)?e[t]:void 0}TN.exports=l7});var bN=d((y_e,RN)=>{var c7=Jl(),f7=Object.prototype,d7=f7.hasOwnProperty;function p7(t){var e=this.__data__;return c7?e[t]!==void 0:d7.call(e,t)}RN.exports=p7});var CN=d((g_e,SN)=>{var m7=Jl(),h7="__lodash_hash_undefined__";function y7(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=m7&&e===void 0?h7:e,this}SN.exports=y7});var EN=d((v_e,AN)=>{var g7=yN(),v7=vN(),T7=_N(),_7=bN(),R7=CN();function iu(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}iu.prototype.clear=g7;iu.prototype.delete=v7;iu.prototype.get=T7;iu.prototype.has=_7;iu.prototype.set=R7;AN.exports=iu});var wN=d((T_e,kN)=>{var PN=EN(),b7=Xl(),S7=sp();function C7(){this.size=0,this.__data__={hash:new PN,map:new(S7||b7),string:new PN}}kN.exports=C7});var DN=d((__e,NN)=>{function A7(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}NN.exports=A7});var Ql=d((R_e,$N)=>{var E7=DN();function P7(t,e){var r=t.__data__;return E7(e)?r[typeof e=="string"?"string":"hash"]:r.map}$N.exports=P7});var IN=d((b_e,ON)=>{var k7=Ql();function w7(t){var e=k7(this,t).delete(t);return this.size-=e?1:0,e}ON.exports=w7});var LN=d((S_e,xN)=>{var N7=Ql();function D7(t){return N7(this,t).get(t)}xN.exports=D7});var MN=d((C_e,qN)=>{var $7=Ql();function O7(t){return $7(this,t).has(t)}qN.exports=O7});var jN=d((A_e,FN)=>{var I7=Ql();function x7(t,e){var r=I7(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}FN.exports=x7});var cp=d((E_e,GN)=>{var L7=wN(),q7=IN(),M7=LN(),F7=MN(),j7=jN();function au(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}au.prototype.clear=L7;au.prototype.delete=q7;au.prototype.get=M7;au.prototype.has=F7;au.prototype.set=j7;GN.exports=au});var HN=d((P_e,UN)=>{var G7=Xl(),U7=sp(),H7=cp(),K7=200;function W7(t,e){var r=this.__data__;if(r instanceof G7){var n=r.__data__;if(!U7||n.length<K7-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new H7(n)}return r.set(t,e),this.size=r.size,this}UN.exports=W7});var fp=d((k_e,KN)=>{var B7=Xl(),V7=oN(),z7=uN(),Y7=cN(),X7=dN(),J7=HN();function ou(t){var e=this.__data__=new B7(t);this.size=e.size}ou.prototype.clear=V7;ou.prototype.delete=z7;ou.prototype.get=Y7;ou.prototype.has=X7;ou.prototype.set=J7;KN.exports=ou});var BN=d((w_e,WN)=>{var Q7="__lodash_hash_undefined__";function Z7(t){return this.__data__.set(t,Q7),this}WN.exports=Z7});var zN=d((N_e,VN)=>{function e5(t){return this.__data__.has(t)}VN.exports=e5});var pp=d((D_e,YN)=>{var t5=cp(),r5=BN(),n5=zN();function dp(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new t5;++e<r;)this.add(t[e])}dp.prototype.add=dp.prototype.push=r5;dp.prototype.has=n5;YN.exports=dp});var z_=d(($_e,XN)=>{function i5(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}XN.exports=i5});var mp=d((O_e,JN)=>{function a5(t,e){return t.has(e)}JN.exports=a5});var Y_=d((I_e,QN)=>{var o5=pp(),s5=z_(),u5=mp(),l5=1,c5=2;function f5(t,e,r,n,i,a){var o=r&l5,s=t.length,u=e.length;if(s!=u&&!(o&&u>s))return!1;var l=a.get(t),c=a.get(e);if(l&&c)return l==e&&c==t;var p=-1,h=!0,R=r&c5?new o5:void 0;for(a.set(t,e),a.set(e,t);++p<s;){var y=t[p],A=e[p];if(n)var w=o?n(A,y,p,e,t,a):n(y,A,p,t,e,a);if(w!==void 0){if(w)continue;h=!1;break}if(R){if(!s5(e,function(P,C){if(!u5(R,C)&&(y===P||i(y,P,r,n,a)))return R.push(C)})){h=!1;break}}else if(!(y===A||i(y,A,r,n,a))){h=!1;break}}return a.delete(t),a.delete(e),h}QN.exports=f5});var X_=d((x_e,ZN)=>{var d5=zn(),p5=d5.Uint8Array;ZN.exports=p5});var tD=d((L_e,eD)=>{function m5(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}eD.exports=m5});var hp=d((q_e,rD)=>{function h5(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}rD.exports=h5});var sD=d((M_e,oD)=>{var nD=qo(),iD=X_(),y5=ru(),g5=Y_(),v5=tD(),T5=hp(),_5=1,R5=2,b5="[object Boolean]",S5="[object Date]",C5="[object Error]",A5="[object Map]",E5="[object Number]",P5="[object RegExp]",k5="[object Set]",w5="[object String]",N5="[object Symbol]",D5="[object ArrayBuffer]",$5="[object DataView]",aD=nD?nD.prototype:void 0,J_=aD?aD.valueOf:void 0;function O5(t,e,r,n,i,a,o){switch(r){case $5:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case D5:return!(t.byteLength!=e.byteLength||!a(new iD(t),new iD(e)));case b5:case S5:case E5:return y5(+t,+e);case C5:return t.name==e.name&&t.message==e.message;case P5:case w5:return t==e+"";case A5:var s=v5;case k5:var u=n&_5;if(s||(s=T5),t.size!=e.size&&!u)return!1;var l=o.get(t);if(l)return l==e;n|=R5,o.set(t,e);var c=g5(s(t),s(e),n,i,a,o);return o.delete(t),c;case N5:if(J_)return J_.call(t)==J_.call(e)}return!1}oD.exports=O5});var yp=d((F_e,uD)=>{function I5(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}uD.exports=I5});var Q_=d((j_e,lD)=>{var x5=yp(),L5=Ve();function q5(t,e,r){var n=e(t);return L5(t)?n:x5(n,r(t))}lD.exports=q5});var gp=d((G_e,cD)=>{function M5(t,e){for(var r=-1,n=t==null?0:t.length,i=0,a=[];++r<n;){var o=t[r];e(o,r,t)&&(a[i++]=o)}return a}cD.exports=M5});var Z_=d((U_e,fD)=>{function F5(){return[]}fD.exports=F5});var vp=d((H_e,pD)=>{var j5=gp(),G5=Z_(),U5=Object.prototype,H5=U5.propertyIsEnumerable,dD=Object.getOwnPropertySymbols,K5=dD?function(t){return t==null?[]:(t=Object(t),j5(dD(t),function(e){return H5.call(t,e)}))}:G5;pD.exports=K5});var hD=d((K_e,mD)=>{function W5(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}mD.exports=W5});var Zl=d((W_e,yD)=>{var B5=9007199254740991,V5=/^(?:0|[1-9]\d*)$/;function z5(t,e){var r=typeof t;return e=e??B5,!!e&&(r=="number"||r!="symbol"&&V5.test(t))&&t>-1&&t%1==0&&t<e}yD.exports=z5});var eR=d((B_e,gD)=>{var Y5=hD(),X5=Hl(),J5=Ve(),Q5=Wl(),Z5=Zl(),eY=lp(),tY=Object.prototype,rY=tY.hasOwnProperty;function nY(t,e){var r=J5(t),n=!r&&X5(t),i=!r&&!n&&Q5(t),a=!r&&!n&&!i&&eY(t),o=r||n||i||a,s=o?Y5(t.length,String):[],u=s.length;for(var l in t)(e||rY.call(t,l))&&!(o&&(l=="length"||i&&(l=="offset"||l=="parent")||a&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||Z5(l,u)))&&s.push(l);return s}gD.exports=nY});var rn=d((V_e,vD)=>{var iY=eR(),aY=q_(),oY=Jn();function sY(t){return oY(t)?iY(t):aY(t)}vD.exports=sY});var tR=d((z_e,TD)=>{var uY=Q_(),lY=vp(),cY=rn();function fY(t){return uY(t,cY,lY)}TD.exports=fY});var bD=d((Y_e,RD)=>{var _D=tR(),dY=1,pY=Object.prototype,mY=pY.hasOwnProperty;function hY(t,e,r,n,i,a){var o=r&dY,s=_D(t),u=s.length,l=_D(e),c=l.length;if(u!=c&&!o)return!1;for(var p=u;p--;){var h=s[p];if(!(o?h in e:mY.call(e,h)))return!1}var R=a.get(t),y=a.get(e);if(R&&y)return R==e&&y==t;var A=!0;a.set(t,e),a.set(e,t);for(var w=o;++p<u;){h=s[p];var P=t[h],C=e[h];if(n)var b=o?n(C,P,h,e,t,a):n(P,C,h,t,e,a);if(!(b===void 0?P===C||i(P,C,r,n,a):b)){A=!1;break}w||(w=h=="constructor")}if(A&&!w){var x=t.constructor,G=e.constructor;x!=G&&"constructor"in t&&"constructor"in e&&!(typeof x=="function"&&x instanceof x&&typeof G=="function"&&G instanceof G)&&(A=!1)}return a.delete(t),a.delete(e),A}RD.exports=hY});var ND=d((X_e,wD)=>{var rR=fp(),yY=Y_(),gY=sD(),vY=bD(),SD=Js(),CD=Ve(),AD=Wl(),TY=lp(),_Y=1,ED="[object Arguments]",PD="[object Array]",Tp="[object Object]",RY=Object.prototype,kD=RY.hasOwnProperty;function bY(t,e,r,n,i,a){var o=CD(t),s=CD(e),u=o?PD:SD(t),l=s?PD:SD(e);u=u==ED?Tp:u,l=l==ED?Tp:l;var c=u==Tp,p=l==Tp,h=u==l;if(h&&AD(t)){if(!AD(e))return!1;o=!0,c=!1}if(h&&!c)return a||(a=new rR),o||TY(t)?yY(t,e,r,n,i,a):gY(t,e,u,r,n,i,a);if(!(r&_Y)){var R=c&&kD.call(t,"__wrapped__"),y=p&&kD.call(e,"__wrapped__");if(R||y){var A=R?t.value():t,w=y?e.value():e;return a||(a=new rR),i(A,w,r,n,a)}}return h?(a||(a=new rR),vY(t,e,r,n,i,a)):!1}wD.exports=bY});var nR=d((J_e,OD)=>{var SY=ND(),DD=Xn();function $D(t,e,r,n,i){return t===e?!0:t==null||e==null||!DD(t)&&!DD(e)?t!==t&&e!==e:SY(t,e,r,n,$D,i)}OD.exports=$D});var xD=d((Q_e,ID)=>{var CY=fp(),AY=nR(),EY=1,PY=2;function kY(t,e,r,n){var i=r.length,a=i,o=!n;if(t==null)return!a;for(t=Object(t);i--;){var s=r[i];if(o&&s[2]?s[1]!==t[s[0]]:!(s[0]in t))return!1}for(;++i<a;){s=r[i];var u=s[0],l=t[u],c=s[1];if(o&&s[2]){if(l===void 0&&!(u in t))return!1}else{var p=new CY;if(n)var h=n(l,c,u,t,e,p);if(!(h===void 0?AY(c,l,EY|PY,n,p):h))return!1}}return!0}ID.exports=kY});var iR=d((Z_e,LD)=>{var wY=Yn();function NY(t){return t===t&&!wY(t)}LD.exports=NY});var MD=d((eRe,qD)=>{var DY=iR(),$Y=rn();function OY(t){for(var e=$Y(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,DY(i)]}return e}qD.exports=OY});var aR=d((tRe,FD)=>{function IY(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}FD.exports=IY});var GD=d((rRe,jD)=>{var xY=xD(),LY=MD(),qY=aR();function MY(t){var e=LY(t);return e.length==1&&e[0][2]?qY(e[0][0],e[0][1]):function(r){return r===t||xY(r,t,e)}}jD.exports=MY});var su=d((nRe,UD)=>{var FY=Ua(),jY=Xn(),GY="[object Symbol]";function UY(t){return typeof t=="symbol"||jY(t)&&FY(t)==GY}UD.exports=UY});var _p=d((iRe,HD)=>{var HY=Ve(),KY=su(),WY=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,BY=/^\w*$/;function VY(t,e){if(HY(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||KY(t)?!0:BY.test(t)||!WY.test(t)||e!=null&&t in Object(e)}HD.exports=VY});var BD=d((aRe,WD)=>{var KD=cp(),zY="Expected a function";function oR(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(zY);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],a=r.cache;if(a.has(i))return a.get(i);var o=t.apply(this,n);return r.cache=a.set(i,o)||a,o};return r.cache=new(oR.Cache||KD),r}oR.Cache=KD;WD.exports=oR});var zD=d((oRe,VD)=>{var YY=BD(),XY=500;function JY(t){var e=YY(t,function(n){return r.size===XY&&r.clear(),n}),r=e.cache;return e}VD.exports=JY});var XD=d((sRe,YD)=>{var QY=zD(),ZY=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,eX=/\\(\\)?/g,tX=QY(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(ZY,function(r,n,i,a){e.push(i?a.replace(eX,"$1"):n||r)}),e});YD.exports=tX});var r$=d((uRe,t$)=>{var JD=qo(),rX=tu(),nX=Ve(),iX=su(),aX=1/0,QD=JD?JD.prototype:void 0,ZD=QD?QD.toString:void 0;function e$(t){if(typeof t=="string")return t;if(nX(t))return rX(t,e$)+"";if(iX(t))return ZD?ZD.call(t):"";var e=t+"";return e=="0"&&1/t==-aX?"-0":e}t$.exports=e$});var sR=d((lRe,n$)=>{var oX=r$();function sX(t){return t==null?"":oX(t)}n$.exports=sX});var ec=d((cRe,i$)=>{var uX=Ve(),lX=_p(),cX=XD(),fX=sR();function dX(t,e){return uX(t)?t:lX(t,e)?[t]:cX(fX(t))}i$.exports=dX});var uu=d((fRe,a$)=>{var pX=su(),mX=1/0;function hX(t){if(typeof t=="string"||pX(t))return t;var e=t+"";return e=="0"&&1/t==-mX?"-0":e}a$.exports=hX});var Rp=d((dRe,o$)=>{var yX=ec(),gX=uu();function vX(t,e){e=yX(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[gX(e[r++])];return r&&r==n?t:void 0}o$.exports=vX});var u$=d((pRe,s$)=>{var TX=Rp();function _X(t,e,r){var n=t==null?void 0:TX(t,e);return n===void 0?r:n}s$.exports=_X});var c$=d((mRe,l$)=>{function RX(t,e){return t!=null&&e in Object(t)}l$.exports=RX});var uR=d((hRe,f$)=>{var bX=ec(),SX=Hl(),CX=Ve(),AX=Zl(),EX=up(),PX=uu();function kX(t,e,r){e=bX(e,t);for(var n=-1,i=e.length,a=!1;++n<i;){var o=PX(e[n]);if(!(a=t!=null&&r(t,o)))break;t=t[o]}return a||++n!=i?a:(i=t==null?0:t.length,!!i&&EX(i)&&AX(o,i)&&(CX(t)||SX(t)))}f$.exports=kX});var p$=d((yRe,d$)=>{var wX=c$(),NX=uR();function DX(t,e){return t!=null&&NX(t,e,wX)}d$.exports=DX});var h$=d((gRe,m$)=>{var $X=nR(),OX=u$(),IX=p$(),xX=_p(),LX=iR(),qX=aR(),MX=uu(),FX=1,jX=2;function GX(t,e){return xX(t)&&LX(e)?qX(MX(t),e):function(r){var n=OX(r,t);return n===void 0&&n===e?IX(r,t):$X(e,n,FX|jX)}}m$.exports=GX});var Fo=d((vRe,y$)=>{function UX(t){return t}y$.exports=UX});var v$=d((TRe,g$)=>{function HX(t){return function(e){return e?.[t]}}g$.exports=HX});var _$=d((_Re,T$)=>{var KX=Rp();function WX(t){return function(e){return KX(e,t)}}T$.exports=WX});var b$=d((RRe,R$)=>{var BX=v$(),VX=_$(),zX=_p(),YX=uu();function XX(t){return zX(t)?BX(YX(t)):VX(t)}R$.exports=XX});var En=d((bRe,S$)=>{var JX=GD(),QX=h$(),ZX=Fo(),eJ=Ve(),tJ=b$();function rJ(t){return typeof t=="function"?t:t==null?ZX:typeof t=="object"?eJ(t)?QX(t[0],t[1]):JX(t):tJ(t)}S$.exports=rJ});var A$=d((SRe,C$)=>{function nJ(t){return function(e,r,n){for(var i=-1,a=Object(e),o=n(e),s=o.length;s--;){var u=o[t?s:++i];if(r(a[u],u,a)===!1)break}return e}}C$.exports=nJ});var P$=d((CRe,E$)=>{var iJ=A$(),aJ=iJ();E$.exports=aJ});var w$=d((ARe,k$)=>{var oJ=P$(),sJ=rn();function uJ(t,e){return t&&oJ(t,e,sJ)}k$.exports=uJ});var D$=d((ERe,N$)=>{var lJ=Jn();function cJ(t,e){return function(r,n){if(r==null)return r;if(!lJ(r))return t(r,n);for(var i=r.length,a=e?i:-1,o=Object(r);(e?a--:++a<i)&&n(o[a],a,o)!==!1;);return r}}N$.exports=cJ});var Ka=d((PRe,$$)=>{var fJ=w$(),dJ=D$(),pJ=dJ(fJ);$$.exports=pJ});var I$=d((kRe,O$)=>{var mJ=Ka(),hJ=Jn();function yJ(t,e){var r=-1,n=hJ(t)?Array(t.length):[];return mJ(t,function(i,a,o){n[++r]=e(i,a,o)}),n}O$.exports=yJ});var Zt=d((wRe,x$)=>{var gJ=tu(),vJ=En(),TJ=I$(),_J=Ve();function RJ(t,e){var r=_J(t)?gJ:TJ;return r(t,vJ(e,3))}x$.exports=RJ});var lR=d((NRe,L$)=>{function bJ(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}L$.exports=bJ});var M$=d((DRe,q$)=>{var SJ=Fo();function CJ(t){return typeof t=="function"?t:SJ}q$.exports=CJ});var er=d(($Re,F$)=>{var AJ=lR(),EJ=Ka(),PJ=M$(),kJ=Ve();function wJ(t,e){var r=kJ(t)?AJ:EJ;return r(t,PJ(e))}F$.exports=wJ});var G$=d((ORe,j$)=>{var NJ=tu();function DJ(t,e){return NJ(e,function(r){return t[r]})}j$.exports=DJ});var mi=d((IRe,U$)=>{var $J=G$(),OJ=rn();function IJ(t){return t==null?[]:$J(t,OJ(t))}U$.exports=IJ});var K$=d((xRe,H$)=>{var xJ=Object.prototype,LJ=xJ.hasOwnProperty;function qJ(t,e){return t!=null&&LJ.call(t,e)}H$.exports=qJ});var nn=d((LRe,W$)=>{var MJ=K$(),FJ=uR();function jJ(t,e){return t!=null&&FJ(t,e,MJ)}W$.exports=jJ});var cR=d((qRe,B$)=>{var GJ=Ha(),UJ=function(){try{var t=GJ(Object,"defineProperty");return t({},"",{}),t}catch{}}();B$.exports=UJ});var bp=d((MRe,z$)=>{var V$=cR();function HJ(t,e,r){e=="__proto__"&&V$?V$(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}z$.exports=HJ});var tc=d((FRe,Y$)=>{var KJ=bp(),WJ=ru(),BJ=Object.prototype,VJ=BJ.hasOwnProperty;function zJ(t,e,r){var n=t[e];(!(VJ.call(t,e)&&WJ(n,r))||r===void 0&&!(e in t))&&KJ(t,e,r)}Y$.exports=zJ});var lu=d((jRe,X$)=>{var YJ=tc(),XJ=bp();function JJ(t,e,r,n){var i=!r;r||(r={});for(var a=-1,o=e.length;++a<o;){var s=e[a],u=n?n(r[s],t[s],s,r,t):void 0;u===void 0&&(u=t[s]),i?XJ(r,s,u):YJ(r,s,u)}return r}X$.exports=JJ});var Q$=d((GRe,J$)=>{var QJ=lu(),ZJ=rn();function eQ(t,e){return t&&QJ(e,ZJ(e),t)}J$.exports=eQ});var eO=d((URe,Z$)=>{function tQ(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}Z$.exports=tQ});var rO=d((HRe,tO)=>{var rQ=Yn(),nQ=zs(),iQ=eO(),aQ=Object.prototype,oQ=aQ.hasOwnProperty;function sQ(t){if(!rQ(t))return iQ(t);var e=nQ(t),r=[];for(var n in t)n=="constructor"&&(e||!oQ.call(t,n))||r.push(n);return r}tO.exports=sQ});var rc=d((KRe,nO)=>{var uQ=eR(),lQ=rO(),cQ=Jn();function fQ(t){return cQ(t)?uQ(t,!0):lQ(t)}nO.exports=fQ});var aO=d((WRe,iO)=>{var dQ=lu(),pQ=rc();function mQ(t,e){return t&&dQ(e,pQ(e),t)}iO.exports=mQ});var cO=d((nc,cu)=>{var hQ=zn(),lO=typeof nc=="object"&&nc&&!nc.nodeType&&nc,oO=lO&&typeof cu=="object"&&cu&&!cu.nodeType&&cu,yQ=oO&&oO.exports===lO,sO=yQ?hQ.Buffer:void 0,uO=sO?sO.allocUnsafe:void 0;function gQ(t,e){if(e)return t.slice();var r=t.length,n=uO?uO(r):new t.constructor(r);return t.copy(n),n}cu.exports=gQ});var dO=d((BRe,fO)=>{function vQ(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}fO.exports=vQ});var mO=d((VRe,pO)=>{var TQ=lu(),_Q=vp();function RQ(t,e){return TQ(t,_Q(t),e)}pO.exports=RQ});var fR=d((zRe,hO)=>{var bQ=L_(),SQ=bQ(Object.getPrototypeOf,Object);hO.exports=SQ});var dR=d((YRe,yO)=>{var CQ=yp(),AQ=fR(),EQ=vp(),PQ=Z_(),kQ=Object.getOwnPropertySymbols,wQ=kQ?function(t){for(var e=[];t;)CQ(e,EQ(t)),t=AQ(t);return e}:PQ;yO.exports=wQ});var vO=d((XRe,gO)=>{var NQ=lu(),DQ=dR();function $Q(t,e){return NQ(t,DQ(t),e)}gO.exports=$Q});var pR=d((JRe,TO)=>{var OQ=Q_(),IQ=dR(),xQ=rc();function LQ(t){return OQ(t,xQ,IQ)}TO.exports=LQ});var RO=d((QRe,_O)=>{var qQ=Object.prototype,MQ=qQ.hasOwnProperty;function FQ(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&MQ.call(t,"index")&&(r.index=t.index,r.input=t.input),r}_O.exports=FQ});var Sp=d((ZRe,SO)=>{var bO=X_();function jQ(t){var e=new t.constructor(t.byteLength);return new bO(e).set(new bO(t)),e}SO.exports=jQ});var AO=d((ebe,CO)=>{var GQ=Sp();function UQ(t,e){var r=e?GQ(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}CO.exports=UQ});var PO=d((tbe,EO)=>{var HQ=/\w*$/;function KQ(t){var e=new t.constructor(t.source,HQ.exec(t));return e.lastIndex=t.lastIndex,e}EO.exports=KQ});var $O=d((rbe,DO)=>{var kO=qo(),wO=kO?kO.prototype:void 0,NO=wO?wO.valueOf:void 0;function WQ(t){return NO?Object(NO.call(t)):{}}DO.exports=WQ});var IO=d((nbe,OO)=>{var BQ=Sp();function VQ(t,e){var r=e?BQ(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}OO.exports=VQ});var LO=d((ibe,xO)=>{var zQ=Sp(),YQ=AO(),XQ=PO(),JQ=$O(),QQ=IO(),ZQ="[object Boolean]",eZ="[object Date]",tZ="[object Map]",rZ="[object Number]",nZ="[object RegExp]",iZ="[object Set]",aZ="[object String]",oZ="[object Symbol]",sZ="[object ArrayBuffer]",uZ="[object DataView]",lZ="[object Float32Array]",cZ="[object Float64Array]",fZ="[object Int8Array]",dZ="[object Int16Array]",pZ="[object Int32Array]",mZ="[object Uint8Array]",hZ="[object Uint8ClampedArray]",yZ="[object Uint16Array]",gZ="[object Uint32Array]";function vZ(t,e,r){var n=t.constructor;switch(e){case sZ:return zQ(t);case ZQ:case eZ:return new n(+t);case uZ:return YQ(t,r);case lZ:case cZ:case fZ:case dZ:case pZ:case mZ:case hZ:case yZ:case gZ:return QQ(t,r);case tZ:return new n;case rZ:case aZ:return new n(t);case nZ:return XQ(t);case iZ:return new n;case oZ:return JQ(t)}}xO.exports=vZ});var FO=d((abe,MO)=>{var TZ=Yn(),qO=Object.create,_Z=function(){function t(){}return function(e){if(!TZ(e))return{};if(qO)return qO(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}();MO.exports=_Z});var GO=d((obe,jO)=>{var RZ=FO(),bZ=fR(),SZ=zs();function CZ(t){return typeof t.constructor=="function"&&!SZ(t)?RZ(bZ(t)):{}}jO.exports=CZ});var HO=d((sbe,UO)=>{var AZ=Js(),EZ=Xn(),PZ="[object Map]";function kZ(t){return EZ(t)&&AZ(t)==PZ}UO.exports=kZ});var VO=d((ube,BO)=>{var wZ=HO(),NZ=Zs(),KO=zl(),WO=KO&&KO.isMap,DZ=WO?NZ(WO):wZ;BO.exports=DZ});var YO=d((lbe,zO)=>{var $Z=Js(),OZ=Xn(),IZ="[object Set]";function xZ(t){return OZ(t)&&$Z(t)==IZ}zO.exports=xZ});var ZO=d((cbe,QO)=>{var LZ=YO(),qZ=Zs(),XO=zl(),JO=XO&&XO.isSet,MZ=JO?qZ(JO):LZ;QO.exports=MZ});var iI=d((fbe,nI)=>{var FZ=fp(),jZ=lR(),GZ=tc(),UZ=Q$(),HZ=aO(),KZ=cO(),WZ=dO(),BZ=mO(),VZ=vO(),zZ=tR(),YZ=pR(),XZ=Js(),JZ=RO(),QZ=LO(),ZZ=GO(),eee=Ve(),tee=Wl(),ree=VO(),nee=Yn(),iee=ZO(),aee=rn(),oee=rc(),see=1,uee=2,lee=4,eI="[object Arguments]",cee="[object Array]",fee="[object Boolean]",dee="[object Date]",pee="[object Error]",tI="[object Function]",mee="[object GeneratorFunction]",hee="[object Map]",yee="[object Number]",rI="[object Object]",gee="[object RegExp]",vee="[object Set]",Tee="[object String]",_ee="[object Symbol]",Ree="[object WeakMap]",bee="[object ArrayBuffer]",See="[object DataView]",Cee="[object Float32Array]",Aee="[object Float64Array]",Eee="[object Int8Array]",Pee="[object Int16Array]",kee="[object Int32Array]",wee="[object Uint8Array]",Nee="[object Uint8ClampedArray]",Dee="[object Uint16Array]",$ee="[object Uint32Array]",ot={};ot[eI]=ot[cee]=ot[bee]=ot[See]=ot[fee]=ot[dee]=ot[Cee]=ot[Aee]=ot[Eee]=ot[Pee]=ot[kee]=ot[hee]=ot[yee]=ot[rI]=ot[gee]=ot[vee]=ot[Tee]=ot[_ee]=ot[wee]=ot[Nee]=ot[Dee]=ot[$ee]=!0;ot[pee]=ot[tI]=ot[Ree]=!1;function Cp(t,e,r,n,i,a){var o,s=e&see,u=e&uee,l=e&lee;if(r&&(o=i?r(t,n,i,a):r(t)),o!==void 0)return o;if(!nee(t))return t;var c=eee(t);if(c){if(o=JZ(t),!s)return WZ(t,o)}else{var p=XZ(t),h=p==tI||p==mee;if(tee(t))return KZ(t,s);if(p==rI||p==eI||h&&!i){if(o=u||h?{}:ZZ(t),!s)return u?VZ(t,HZ(o,t)):BZ(t,UZ(o,t))}else{if(!ot[p])return i?t:{};o=QZ(t,p,s)}}a||(a=new FZ);var R=a.get(t);if(R)return R;a.set(t,o),iee(t)?t.forEach(function(w){o.add(Cp(w,e,r,w,t,a))}):ree(t)&&t.forEach(function(w,P){o.set(P,Cp(w,e,r,P,t,a))});var y=l?u?YZ:zZ:u?oee:aee,A=c?void 0:y(t);return jZ(A||t,function(w,P){A&&(P=w,w=t[P]),GZ(o,P,Cp(w,e,r,P,t,a))}),o}nI.exports=Cp});var ea=d((dbe,aI)=>{var Oee=iI(),Iee=4;function xee(t){return Oee(t,Iee)}aI.exports=xee});var oI=d(fu=>{"use strict";Object.defineProperty(fu,"__esModule",{value:!0});fu.PRINT_WARNING=fu.PRINT_ERROR=void 0;function Lee(t){console&&console.error&&console.error("Error: ".concat(t))}fu.PRINT_ERROR=Lee;function qee(t){console&&console.warn&&console.warn("Warning: ".concat(t))}fu.PRINT_WARNING=qee});var sI=d(Ap=>{"use strict";Object.defineProperty(Ap,"__esModule",{value:!0});Ap.timer=void 0;function Mee(t){var e=new Date().getTime(),r=t(),n=new Date().getTime(),i=n-e;return{time:i,value:r}}Ap.timer=Mee});var uI=d((exports,module)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.toFastProperties=void 0;function toFastProperties(toBecomeFast){function FakeConstructor(){}FakeConstructor.prototype=toBecomeFast;var fakeInstance=new FakeConstructor;function fakeAccess(){return typeof fakeInstance.bar}return fakeAccess(),fakeAccess(),toBecomeFast;eval(toBecomeFast)}exports.toFastProperties=toFastProperties});var du=d(hi=>{"use strict";Object.defineProperty(hi,"__esModule",{value:!0});hi.toFastProperties=hi.timer=hi.PRINT_ERROR=hi.PRINT_WARNING=void 0;var lI=oI();Object.defineProperty(hi,"PRINT_WARNING",{enumerable:!0,get:function(){return lI.PRINT_WARNING}});Object.defineProperty(hi,"PRINT_ERROR",{enumerable:!0,get:function(){return lI.PRINT_ERROR}});var Fee=sI();Object.defineProperty(hi,"timer",{enumerable:!0,get:function(){return Fee.timer}});var jee=uI();Object.defineProperty(hi,"toFastProperties",{enumerable:!0,get:function(){return jee.toFastProperties}})});var Ep=d((ybe,cI)=>{function Gee(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var a=Array(i);++n<i;)a[n]=t[n+e];return a}cI.exports=Gee});var dI=d((gbe,fI)=>{var Uee=/\s/;function Hee(t){for(var e=t.length;e--&&Uee.test(t.charAt(e)););return e}fI.exports=Hee});var mI=d((vbe,pI)=>{var Kee=dI(),Wee=/^\s+/;function Bee(t){return t&&t.slice(0,Kee(t)+1).replace(Wee,"")}pI.exports=Bee});var vI=d((Tbe,gI)=>{var Vee=mI(),hI=Yn(),zee=su(),yI=NaN,Yee=/^[-+]0x[0-9a-f]+$/i,Xee=/^0b[01]+$/i,Jee=/^0o[0-7]+$/i,Qee=parseInt;function Zee(t){if(typeof t=="number")return t;if(zee(t))return yI;if(hI(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=hI(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=Vee(t);var r=Xee.test(t);return r||Jee.test(t)?Qee(t.slice(2),r?2:8):Yee.test(t)?yI:+t}gI.exports=Zee});var RI=d((_be,_I)=>{var ete=vI(),TI=1/0,tte=17976931348623157e292;function rte(t){if(!t)return t===0?t:0;if(t=ete(t),t===TI||t===-TI){var e=t<0?-1:1;return e*tte}return t===t?t:0}_I.exports=rte});var pu=d((Rbe,bI)=>{var nte=RI();function ite(t){var e=nte(t),r=e%1;return e===e?r?e-r:e:0}bI.exports=ite});var Pp=d((bbe,SI)=>{var ate=Ep(),ote=pu();function ste(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:ote(e),ate(t,e<0?0:e,n)):[]}SI.exports=ste});var ic=d((Sbe,CI)=>{var ute=Ua(),lte=Ve(),cte=Xn(),fte="[object String]";function dte(t){return typeof t=="string"||!lte(t)&&cte(t)&&ute(t)==fte}CI.exports=dte});var EI=d((Cbe,AI)=>{var pte=Ua(),mte=Xn(),hte="[object RegExp]";function yte(t){return mte(t)&&pte(t)==hte}AI.exports=yte});var mR=d((Abe,wI)=>{var gte=EI(),vte=Zs(),PI=zl(),kI=PI&&PI.isRegExp,Tte=kI?vte(kI):gte;wI.exports=Tte});var $I=d((Ebe,DI)=>{var _te=tc(),Rte=ec(),bte=Zl(),NI=Yn(),Ste=uu();function Cte(t,e,r,n){if(!NI(t))return t;e=Rte(e,t);for(var i=-1,a=e.length,o=a-1,s=t;s!=null&&++i<a;){var u=Ste(e[i]),l=r;if(u==="__proto__"||u==="constructor"||u==="prototype")return t;if(i!=o){var c=s[u];l=n?n(c,u,s):void 0,l===void 0&&(l=NI(c)?c:bte(e[i+1])?[]:{})}_te(s,u,l),s=s[u]}return t}DI.exports=Cte});var II=d((Pbe,OI)=>{var Ate=Rp(),Ete=$I(),Pte=ec();function kte(t,e,r){for(var n=-1,i=e.length,a={};++n<i;){var o=e[n],s=Ate(t,o);r(s,o)&&Ete(a,Pte(o,t),s)}return a}OI.exports=kte});var hR=d((kbe,xI)=>{var wte=tu(),Nte=En(),Dte=II(),$te=pR();function Ote(t,e){if(t==null)return{};var r=wte($te(t),function(n){return[n]});return e=Nte(e),Dte(t,r,function(n,i){return e(n,i[0])})}xI.exports=Ote});var qI=d((wbe,LI)=>{function Ite(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}LI.exports=Ite});var jI=d((Nbe,FI)=>{var xte=qI(),MI=Math.max;function Lte(t,e,r){return e=MI(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,a=MI(n.length-e,0),o=Array(a);++i<a;)o[i]=n[e+i];i=-1;for(var s=Array(e+1);++i<e;)s[i]=n[i];return s[e]=r(o),xte(t,this,s)}}FI.exports=Lte});var UI=d((Dbe,GI)=>{function qte(t){return function(){return t}}GI.exports=qte});var WI=d(($be,KI)=>{var Mte=UI(),HI=cR(),Fte=Fo(),jte=HI?function(t,e){return HI(t,"toString",{configurable:!0,enumerable:!1,value:Mte(e),writable:!0})}:Fte;KI.exports=jte});var VI=d((Obe,BI)=>{var Gte=800,Ute=16,Hte=Date.now;function Kte(t){var e=0,r=0;return function(){var n=Hte(),i=Ute-(n-r);if(r=n,i>0){if(++e>=Gte)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}BI.exports=Kte});var YI=d((Ibe,zI)=>{var Wte=WI(),Bte=VI(),Vte=Bte(Wte);zI.exports=Vte});var kp=d((xbe,XI)=>{var zte=Fo(),Yte=jI(),Xte=YI();function Jte(t,e){return Xte(Yte(t,e,zte),t+"")}XI.exports=Jte});var ac=d((Lbe,JI)=>{var Qte=ru(),Zte=Jn(),ere=Zl(),tre=Yn();function rre(t,e,r){if(!tre(r))return!1;var n=typeof e;return(n=="number"?Zte(r)&&ere(e,r.length):n=="string"&&e in r)?Qte(r[e],t):!1}JI.exports=rre});var ZI=d((qbe,QI)=>{var nre=kp(),ire=ac();function are(t){return nre(function(e,r){var n=-1,i=r.length,a=i>1?r[i-1]:void 0,o=i>2?r[2]:void 0;for(a=t.length>3&&typeof a=="function"?(i--,a):void 0,o&&ire(r[0],r[1],o)&&(a=i<3?void 0:a,i=1),e=Object(e);++n<i;){var s=r[n];s&&t(e,s,n,a)}return e})}QI.exports=are});var oc=d((Mbe,ex)=>{var ore=tc(),sre=lu(),ure=ZI(),lre=Jn(),cre=zs(),fre=rn(),dre=Object.prototype,pre=dre.hasOwnProperty,mre=ure(function(t,e){if(cre(e)||lre(e)){sre(e,fre(e),t);return}for(var r in e)pre.call(e,r)&&ore(t,r,e[r])});ex.exports=mre});var Np=d(Le=>{"use strict";var ta=Le&&Le.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),mu=Le&&Le.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Le,"__esModule",{value:!0});Le.serializeProduction=Le.serializeGrammar=Le.Terminal=Le.Alternation=Le.RepetitionWithSeparator=Le.Repetition=Le.RepetitionMandatoryWithSeparator=Le.RepetitionMandatory=Le.Option=Le.Alternative=Le.Rule=Le.NonTerminal=Le.AbstractProduction=void 0;var tx=mu(Zt()),hre=mu(er()),yR=mu(ic()),yre=mu(mR()),yi=mu(hR()),gi=mu(oc());function gre(t){return vre(t)?t.LABEL:t.name}function vre(t){return(0,yR.default)(t.LABEL)&&t.LABEL!==""}var vi=function(){function t(e){this._definition=e}return Object.defineProperty(t.prototype,"definition",{get:function(){return this._definition},set:function(e){this._definition=e},enumerable:!1,configurable:!0}),t.prototype.accept=function(e){e.visit(this),(0,hre.default)(this.definition,function(r){r.accept(e)})},t}();Le.AbstractProduction=vi;var rx=function(t){ta(e,t);function e(r){var n=t.call(this,[])||this;return n.idx=1,(0,gi.default)(n,(0,yi.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this.referencedRule!==void 0?this.referencedRule.definition:[]},set:function(r){},enumerable:!1,configurable:!0}),e.prototype.accept=function(r){r.visit(this)},e}(vi);Le.NonTerminal=rx;var nx=function(t){ta(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.orgText="",(0,gi.default)(n,(0,yi.default)(r,function(i){return i!==void 0})),n}return e}(vi);Le.Rule=nx;var ix=function(t){ta(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.ignoreAmbiguities=!1,(0,gi.default)(n,(0,yi.default)(r,function(i){return i!==void 0})),n}return e}(vi);Le.Alternative=ix;var ax=function(t){ta(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,gi.default)(n,(0,yi.default)(r,function(i){return i!==void 0})),n}return e}(vi);Le.Option=ax;var ox=function(t){ta(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,gi.default)(n,(0,yi.default)(r,function(i){return i!==void 0})),n}return e}(vi);Le.RepetitionMandatory=ox;var sx=function(t){ta(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,gi.default)(n,(0,yi.default)(r,function(i){return i!==void 0})),n}return e}(vi);Le.RepetitionMandatoryWithSeparator=sx;var ux=function(t){ta(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,gi.default)(n,(0,yi.default)(r,function(i){return i!==void 0})),n}return e}(vi);Le.Repetition=ux;var lx=function(t){ta(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,gi.default)(n,(0,yi.default)(r,function(i){return i!==void 0})),n}return e}(vi);Le.RepetitionWithSeparator=lx;var cx=function(t){ta(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,n.ignoreAmbiguities=!1,n.hasPredicates=!1,(0,gi.default)(n,(0,yi.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this._definition},set:function(r){this._definition=r},enumerable:!1,configurable:!0}),e}(vi);Le.Alternation=cx;var wp=function(){function t(e){this.idx=1,(0,gi.default)(this,(0,yi.default)(e,function(r){return r!==void 0}))}return t.prototype.accept=function(e){e.visit(this)},t}();Le.Terminal=wp;function Tre(t){return(0,tx.default)(t,sc)}Le.serializeGrammar=Tre;function sc(t){function e(a){return(0,tx.default)(a,sc)}if(t instanceof rx){var r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return(0,yR.default)(t.label)&&(r.label=t.label),r}else{if(t instanceof ix)return{type:"Alternative",definition:e(t.definition)};if(t instanceof ax)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof ox)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof sx)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:sc(new wp({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof lx)return{type:"RepetitionWithSeparator",idx:t.idx,separator:sc(new wp({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof ux)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof cx)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof wp){var n={type:"Terminal",name:t.terminalType.name,label:gre(t.terminalType),idx:t.idx};(0,yR.default)(t.label)&&(n.terminalLabel=t.label);var i=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(n.pattern=(0,yre.default)(i)?i.source:i),n}else{if(t instanceof nx)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}Le.serializeProduction=sc});var fx=d(Dp=>{"use strict";Object.defineProperty(Dp,"__esModule",{value:!0});Dp.GAstVisitor=void 0;var Ti=Np(),_re=function(){function t(){}return t.prototype.visit=function(e){var r=e;switch(r.constructor){case Ti.NonTerminal:return this.visitNonTerminal(r);case Ti.Alternative:return this.visitAlternative(r);case Ti.Option:return this.visitOption(r);case Ti.RepetitionMandatory:return this.visitRepetitionMandatory(r);case Ti.RepetitionMandatoryWithSeparator:return this.visitRepetitionMandatoryWithSeparator(r);case Ti.RepetitionWithSeparator:return this.visitRepetitionWithSeparator(r);case Ti.Repetition:return this.visitRepetition(r);case Ti.Alternation:return this.visitAlternation(r);case Ti.Terminal:return this.visitTerminal(r);case Ti.Rule:return this.visitRule(r);default:throw Error("non exhaustive match")}},t.prototype.visitNonTerminal=function(e){},t.prototype.visitAlternative=function(e){},t.prototype.visitOption=function(e){},t.prototype.visitRepetition=function(e){},t.prototype.visitRepetitionMandatory=function(e){},t.prototype.visitRepetitionMandatoryWithSeparator=function(e){},t.prototype.visitRepetitionWithSeparator=function(e){},t.prototype.visitAlternation=function(e){},t.prototype.visitTerminal=function(e){},t.prototype.visitRule=function(e){},t}();Dp.GAstVisitor=_re});var px=d((Gbe,dx)=>{var Rre=Ka();function bre(t,e){var r;return Rre(t,function(n,i,a){return r=e(n,i,a),!r}),!!r}dx.exports=bre});var $p=d((Ube,mx)=>{var Sre=z_(),Cre=En(),Are=px(),Ere=Ve(),Pre=ac();function kre(t,e,r){var n=Ere(t)?Sre:Are;return r&&Pre(t,e,r)&&(e=void 0),n(t,Cre(e,3))}mx.exports=kre});var yx=d((Hbe,hx)=>{function wre(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}hx.exports=wre});var vx=d((Kbe,gx)=>{var Nre=Ka();function Dre(t,e){var r=!0;return Nre(t,function(n,i,a){return r=!!e(n,i,a),r}),r}gx.exports=Dre});var uc=d((Wbe,Tx)=>{var $re=yx(),Ore=vx(),Ire=En(),xre=Ve(),Lre=ac();function qre(t,e,r){var n=xre(t)?$re:Ore;return r&&Lre(t,e,r)&&(e=void 0),n(t,Ire(e,3))}Tx.exports=qre});var gR=d((Bbe,_x)=>{function Mre(t,e,r,n){for(var i=t.length,a=r+(n?1:-1);n?a--:++a<i;)if(e(t[a],a,t))return a;return-1}_x.exports=Mre});var bx=d((Vbe,Rx)=>{function Fre(t){return t!==t}Rx.exports=Fre});var Cx=d((zbe,Sx)=>{function jre(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}Sx.exports=jre});var Op=d((Ybe,Ax)=>{var Gre=gR(),Ure=bx(),Hre=Cx();function Kre(t,e,r){return e===e?Hre(t,e,r):Gre(t,Ure,r)}Ax.exports=Kre});var ra=d((Xbe,Ex)=>{var Wre=Op(),Bre=Jn(),Vre=ic(),zre=pu(),Yre=mi(),Xre=Math.max;function Jre(t,e,r,n){t=Bre(t)?t:Yre(t),r=r&&!n?zre(r):0;var i=t.length;return r<0&&(r=Xre(i+r,0)),Vre(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&Wre(t,e,r)>-1}Ex.exports=Jre});var Px=d(Pn=>{"use strict";var TR=Pn&&Pn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Pn,"__esModule",{value:!0});Pn.getProductionDslName=Pn.isBranchingProd=Pn.isOptionalProd=Pn.isSequenceProd=void 0;var Qre=TR($p()),Zre=TR(uc()),ene=TR(ra()),yt=Np();function tne(t){return t instanceof yt.Alternative||t instanceof yt.Option||t instanceof yt.Repetition||t instanceof yt.RepetitionMandatory||t instanceof yt.RepetitionMandatoryWithSeparator||t instanceof yt.RepetitionWithSeparator||t instanceof yt.Terminal||t instanceof yt.Rule}Pn.isSequenceProd=tne;function vR(t,e){e===void 0&&(e=[]);var r=t instanceof yt.Option||t instanceof yt.Repetition||t instanceof yt.RepetitionWithSeparator;return r?!0:t instanceof yt.Alternation?(0,Qre.default)(t.definition,function(n){return vR(n,e)}):t instanceof yt.NonTerminal&&(0,ene.default)(e,t)?!1:t instanceof yt.AbstractProduction?(t instanceof yt.NonTerminal&&e.push(t),(0,Zre.default)(t.definition,function(n){return vR(n,e)})):!1}Pn.isOptionalProd=vR;function rne(t){return t instanceof yt.Alternation}Pn.isBranchingProd=rne;function nne(t){if(t instanceof yt.NonTerminal)return"SUBRULE";if(t instanceof yt.Option)return"OPTION";if(t instanceof yt.Alternation)return"OR";if(t instanceof yt.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof yt.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof yt.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof yt.Repetition)return"MANY";if(t instanceof yt.Terminal)return"CONSUME";throw Error("non exhaustive match")}Pn.getProductionDslName=nne});var Dt=d(Ee=>{"use strict";Object.defineProperty(Ee,"__esModule",{value:!0});Ee.isSequenceProd=Ee.isBranchingProd=Ee.isOptionalProd=Ee.getProductionDslName=Ee.GAstVisitor=Ee.serializeProduction=Ee.serializeGrammar=Ee.Alternative=Ee.Alternation=Ee.RepetitionWithSeparator=Ee.RepetitionMandatoryWithSeparator=Ee.RepetitionMandatory=Ee.Repetition=Ee.Option=Ee.NonTerminal=Ee.Terminal=Ee.Rule=void 0;var kn=Np();Object.defineProperty(Ee,"Rule",{enumerable:!0,get:function(){return kn.Rule}});Object.defineProperty(Ee,"Terminal",{enumerable:!0,get:function(){return kn.Terminal}});Object.defineProperty(Ee,"NonTerminal",{enumerable:!0,get:function(){return kn.NonTerminal}});Object.defineProperty(Ee,"Option",{enumerable:!0,get:function(){return kn.Option}});Object.defineProperty(Ee,"Repetition",{enumerable:!0,get:function(){return kn.Repetition}});Object.defineProperty(Ee,"RepetitionMandatory",{enumerable:!0,get:function(){return kn.RepetitionMandatory}});Object.defineProperty(Ee,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return kn.RepetitionMandatoryWithSeparator}});Object.defineProperty(Ee,"RepetitionWithSeparator",{enumerable:!0,get:function(){return kn.RepetitionWithSeparator}});Object.defineProperty(Ee,"Alternation",{enumerable:!0,get:function(){return kn.Alternation}});Object.defineProperty(Ee,"Alternative",{enumerable:!0,get:function(){return kn.Alternative}});Object.defineProperty(Ee,"serializeGrammar",{enumerable:!0,get:function(){return kn.serializeGrammar}});Object.defineProperty(Ee,"serializeProduction",{enumerable:!0,get:function(){return kn.serializeProduction}});var ine=fx();Object.defineProperty(Ee,"GAstVisitor",{enumerable:!0,get:function(){return ine.GAstVisitor}});var Ip=Px();Object.defineProperty(Ee,"getProductionDslName",{enumerable:!0,get:function(){return Ip.getProductionDslName}});Object.defineProperty(Ee,"isOptionalProd",{enumerable:!0,get:function(){return Ip.isOptionalProd}});Object.defineProperty(Ee,"isBranchingProd",{enumerable:!0,get:function(){return Ip.isBranchingProd}});Object.defineProperty(Ee,"isSequenceProd",{enumerable:!0,get:function(){return Ip.isSequenceProd}})});var xp=d(hu=>{"use strict";var Nx=hu&&hu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(hu,"__esModule",{value:!0});hu.RestWalker=void 0;var ane=Nx(Pp()),kx=Nx(er()),Kr=Dt(),one=function(){function t(){}return t.prototype.walk=function(e,r){var n=this;r===void 0&&(r=[]),(0,kx.default)(e.definition,function(i,a){var o=(0,ane.default)(e.definition,a+1);if(i instanceof Kr.NonTerminal)n.walkProdRef(i,o,r);else if(i instanceof Kr.Terminal)n.walkTerminal(i,o,r);else if(i instanceof Kr.Alternative)n.walkFlat(i,o,r);else if(i instanceof Kr.Option)n.walkOption(i,o,r);else if(i instanceof Kr.RepetitionMandatory)n.walkAtLeastOne(i,o,r);else if(i instanceof Kr.RepetitionMandatoryWithSeparator)n.walkAtLeastOneSep(i,o,r);else if(i instanceof Kr.RepetitionWithSeparator)n.walkManySep(i,o,r);else if(i instanceof Kr.Repetition)n.walkMany(i,o,r);else if(i instanceof Kr.Alternation)n.walkOr(i,o,r);else throw Error("non exhaustive match")})},t.prototype.walkTerminal=function(e,r,n){},t.prototype.walkProdRef=function(e,r,n){},t.prototype.walkFlat=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkOption=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkAtLeastOne=function(e,r,n){var i=[new Kr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkAtLeastOneSep=function(e,r,n){var i=wx(e,r,n);this.walk(e,i)},t.prototype.walkMany=function(e,r,n){var i=[new Kr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkManySep=function(e,r,n){var i=wx(e,r,n);this.walk(e,i)},t.prototype.walkOr=function(e,r,n){var i=this,a=r.concat(n);(0,kx.default)(e.definition,function(o){var s=new Kr.Alternative({definition:[o]});i.walk(s,a)})},t}();hu.RestWalker=one;function wx(t,e,r){var n=[new Kr.Option({definition:[new Kr.Terminal({terminalType:t.separator})].concat(t.definition)})],i=n.concat(e,r);return i}});var Ix=d((eSe,Ox)=>{var Dx=qo(),sne=Hl(),une=Ve(),$x=Dx?Dx.isConcatSpreadable:void 0;function lne(t){return une(t)||sne(t)||!!($x&&t&&t[$x])}Ox.exports=lne});var Lp=d((tSe,Lx)=>{var cne=yp(),fne=Ix();function xx(t,e,r,n,i){var a=-1,o=t.length;for(r||(r=fne),i||(i=[]);++a<o;){var s=t[a];e>0&&r(s)?e>1?xx(s,e-1,r,n,i):cne(i,s):n||(i[i.length]=s)}return i}Lx.exports=xx});var Qn=d((rSe,qx)=>{var dne=Lp();function pne(t){var e=t==null?0:t.length;return e?dne(t,1):[]}qx.exports=pne});var _R=d((nSe,Mx)=>{var mne=Op();function hne(t,e){var r=t==null?0:t.length;return!!r&&mne(t,e,0)>-1}Mx.exports=hne});var RR=d((iSe,Fx)=>{function yne(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}Fx.exports=yne});var qp=d((aSe,jx)=>{function gne(){}jx.exports=gne});var Ux=d((oSe,Gx)=>{var bR=G_(),vne=qp(),Tne=hp(),_ne=1/0,Rne=bR&&1/Tne(new bR([,-0]))[1]==_ne?function(t){return new bR(t)}:vne;Gx.exports=Rne});var SR=d((sSe,Hx)=>{var bne=pp(),Sne=_R(),Cne=RR(),Ane=mp(),Ene=Ux(),Pne=hp(),kne=200;function wne(t,e,r){var n=-1,i=Sne,a=t.length,o=!0,s=[],u=s;if(r)o=!1,i=Cne;else if(a>=kne){var l=e?null:Ene(t);if(l)return Pne(l);o=!1,i=Ane,u=new bne}else u=e?[]:s;e:for(;++n<a;){var c=t[n],p=e?e(c):c;if(c=r||c!==0?c:0,o&&p===p){for(var h=u.length;h--;)if(u[h]===p)continue e;e&&u.push(p),s.push(c)}else i(u,p,r)||(u!==s&&u.push(p),s.push(c))}return s}Hx.exports=wne});var Mp=d((uSe,Kx)=>{var Nne=SR();function Dne(t){return t&&t.length?Nne(t):[]}Kx.exports=Dne});var ER=d(wn=>{"use strict";var AR=wn&&wn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(wn,"__esModule",{value:!0});wn.firstForTerminal=wn.firstForBranching=wn.firstForSequence=wn.first=void 0;var $ne=AR(Qn()),Bx=AR(Mp()),One=AR(Zt()),Wx=Dt(),CR=Dt();function Fp(t){if(t instanceof Wx.NonTerminal)return Fp(t.referencedRule);if(t instanceof Wx.Terminal)return Yx(t);if((0,CR.isSequenceProd)(t))return Vx(t);if((0,CR.isBranchingProd)(t))return zx(t);throw Error("non exhaustive match")}wn.first=Fp;function Vx(t){for(var e=[],r=t.definition,n=0,i=r.length>n,a,o=!0;i&&o;)a=r[n],o=(0,CR.isOptionalProd)(a),e=e.concat(Fp(a)),n=n+1,i=r.length>n;return(0,Bx.default)(e)}wn.firstForSequence=Vx;function zx(t){var e=(0,One.default)(t.definition,function(r){return Fp(r)});return(0,Bx.default)((0,$ne.default)(e))}wn.firstForBranching=zx;function Yx(t){return[t.terminalType]}wn.firstForTerminal=Yx});var PR=d(jp=>{"use strict";Object.defineProperty(jp,"__esModule",{value:!0});jp.IN=void 0;jp.IN="_~IN~_"});var eL=d(Wr=>{"use strict";var Ine=Wr&&Wr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Xx=Wr&&Wr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Wr,"__esModule",{value:!0});Wr.buildInProdFollowPrefix=Wr.buildBetweenProdsFollowPrefix=Wr.computeAllProdsFollows=Wr.ResyncFollowsWalker=void 0;var xne=xp(),Lne=ER(),qne=Xx(er()),Mne=Xx(oc()),Jx=PR(),Fne=Dt(),Qx=function(t){Ine(e,t);function e(r){var n=t.call(this)||this;return n.topProd=r,n.follows={},n}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.follows},e.prototype.walkTerminal=function(r,n,i){},e.prototype.walkProdRef=function(r,n,i){var a=Zx(r.referencedRule,r.idx)+this.topProd.name,o=n.concat(i),s=new Fne.Alternative({definition:o}),u=(0,Lne.first)(s);this.follows[a]=u},e}(xne.RestWalker);Wr.ResyncFollowsWalker=Qx;function jne(t){var e={};return(0,qne.default)(t,function(r){var n=new Qx(r).startWalking();(0,Mne.default)(e,n)}),e}Wr.computeAllProdsFollows=jne;function Zx(t,e){return t.name+e+Jx.IN}Wr.buildBetweenProdsFollowPrefix=Zx;function Gne(t){var e=t.terminalType.name;return e+t.idx+Jx.IN}Wr.buildInProdFollowPrefix=Gne});var jo=d((dSe,tL)=>{function Une(t){return t===void 0}tL.exports=Une});var nL=d((pSe,rL)=>{function Hne(t){return t&&t.length?t[0]:void 0}rL.exports=Hne});var yu=d((mSe,iL)=>{iL.exports=nL()});var lc=d((hSe,aL)=>{function Kne(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var a=t[e];a&&(i[n++]=a)}return i}aL.exports=Kne});var kR=d((ySe,oL)=>{var Wne=Ka();function Bne(t,e){var r=[];return Wne(t,function(n,i,a){e(n,i,a)&&r.push(n)}),r}oL.exports=Bne});var uL=d((gSe,sL)=>{var Vne="Expected a function";function zne(t){if(typeof t!="function")throw new TypeError(Vne);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}sL.exports=zne});var Gp=d((vSe,lL)=>{var Yne=gp(),Xne=kR(),Jne=En(),Qne=Ve(),Zne=uL();function eie(t,e){var r=Qne(t)?Yne:Xne;return r(t,Zne(Jne(e,3)))}lL.exports=eie});var fL=d((TSe,cL)=>{var tie=pp(),rie=_R(),nie=RR(),iie=tu(),aie=Zs(),oie=mp(),sie=200;function uie(t,e,r,n){var i=-1,a=rie,o=!0,s=t.length,u=[],l=e.length;if(!s)return u;r&&(e=iie(e,aie(r))),n?(a=nie,o=!1):e.length>=sie&&(a=oie,o=!1,e=new tie(e));e:for(;++i<s;){var c=t[i],p=r==null?c:r(c);if(c=n||c!==0?c:0,o&&p===p){for(var h=l;h--;)if(e[h]===p)continue e;u.push(c)}else a(e,p,n)||u.push(c)}return u}cL.exports=uie});var pL=d((_Se,dL)=>{var lie=Jn(),cie=Xn();function fie(t){return cie(t)&&lie(t)}dL.exports=fie});var Up=d((RSe,hL)=>{var die=fL(),pie=Lp(),mie=kp(),mL=pL(),hie=mie(function(t,e){return mL(t)?die(t,pie(e,1,mL,!0)):[]});hL.exports=hie});var gL=d((bSe,yL)=>{var yie=Op(),gie=pu(),vie=Math.max;function Tie(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:gie(r);return i<0&&(i=vie(n+i,0)),yie(t,e,i)}yL.exports=Tie});var TL=d((SSe,vL)=>{var _ie=En(),Rie=Jn(),bie=rn();function Sie(t){return function(e,r,n){var i=Object(e);if(!Rie(e)){var a=_ie(r,3);e=bie(e),r=function(s){return a(i[s],s,i)}}var o=t(e,r,n);return o>-1?i[a?e[o]:o]:void 0}}vL.exports=Sie});var RL=d((CSe,_L)=>{var Cie=gR(),Aie=En(),Eie=pu(),Pie=Math.max;function kie(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Eie(r);return i<0&&(i=Pie(n+i,0)),Cie(t,Aie(e,3),i)}_L.exports=kie});var Hp=d((ASe,bL)=>{var wie=TL(),Nie=RL(),Die=wie(Nie);bL.exports=Die});var cc=d((ESe,SL)=>{var $ie=gp(),Oie=kR(),Iie=En(),xie=Ve();function Lie(t,e){var r=xie(t)?$ie:Oie;return r(t,Iie(e,3))}SL.exports=Lie});var wR=d((PSe,AL)=>{var qie=kp(),Mie=ru(),Fie=ac(),jie=rc(),CL=Object.prototype,Gie=CL.hasOwnProperty,Uie=qie(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&Fie(e[0],e[1],i)&&(n=1);++r<n;)for(var a=e[r],o=jie(a),s=-1,u=o.length;++s<u;){var l=o[s],c=t[l];(c===void 0||Mie(c,CL[l])&&!Gie.call(t,l))&&(t[l]=a[l])}return t});AL.exports=Uie});var PL=d((kSe,EL)=>{function Hie(t,e,r,n){var i=-1,a=t==null?0:t.length;for(n&&a&&(r=t[++i]);++i<a;)r=e(r,t[i],i,t);return r}EL.exports=Hie});var wL=d((wSe,kL)=>{function Kie(t,e,r,n,i){return i(t,function(a,o,s){r=n?(n=!1,a):e(r,a,o,s)}),r}kL.exports=Kie});var na=d((NSe,NL)=>{var Wie=PL(),Bie=Ka(),Vie=En(),zie=wL(),Yie=Ve();function Xie(t,e,r){var n=Yie(t)?Wie:zie,i=arguments.length<3;return n(t,Vie(e,4),r,i,Bie)}NL.exports=Xie});var Wp=d(gu=>{"use strict";Object.defineProperty(gu,"__esModule",{value:!0});gu.clearRegExpParserCache=gu.getRegExpAst=void 0;var Jie=kl(),Kp={},Qie=new Jie.RegExpParser;function Zie(t){var e=t.toString();if(Kp.hasOwnProperty(e))return Kp[e];var r=Qie.pattern(e);return Kp[e]=r,r}gu.getRegExpAst=Zie;function eae(){Kp={}}gu.clearRegExpParserCache=eae});var LL=d(Tr=>{"use strict";var tae=Tr&&Tr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),vu=Tr&&Tr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Tr,"__esModule",{value:!0});Tr.canMatchCharCode=Tr.firstCharOptimizedIndices=Tr.getOptimizedStartCodesIndices=Tr.failedOptimizationPrefixMsg=void 0;var OL=kl(),rae=vu(Ve()),nae=vu(uc()),iae=vu(er()),NR=vu(Hp()),aae=vu(mi()),$R=vu(ra()),DL=du(),IL=Wp(),ia=OR(),xL="Complement Sets are not supported for first char optimization";Tr.failedOptimizationPrefixMsg=`Unable to use "first char" lexer optimizations:
`;function oae(t,e){e===void 0&&(e=!1);try{var r=(0,IL.getRegExpAst)(t),n=Vp(r.value,{},r.flags.ignoreCase);return n}catch(a){if(a.message===xL)e&&(0,DL.PRINT_WARNING)("".concat(Tr.failedOptimizationPrefixMsg)+"	Unable to optimize: < ".concat(t.toString(),` >
`)+`	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{var i="";e&&(i=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),(0,DL.PRINT_ERROR)("".concat(Tr.failedOptimizationPrefixMsg,`
`)+"	Failed parsing: < ".concat(t.toString(),` >
`)+"	Using the regexp-to-ast library version: ".concat(OL.VERSION,`
`)+"	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues"+i)}}return[]}Tr.getOptimizedStartCodesIndices=oae;function Vp(t,e,r){switch(t.type){case"Disjunction":for(var n=0;n<t.value.length;n++)Vp(t.value[n],e,r);break;case"Alternative":for(var i=t.value,n=0;n<i.length;n++){var a=i[n];switch(a.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}var o=a;switch(o.type){case"Character":Bp(o.value,e,r);break;case"Set":if(o.complement===!0)throw Error(xL);(0,iae.default)(o.value,function(l){if(typeof l=="number")Bp(l,e,r);else{var c=l;if(r===!0)for(var p=c.from;p<=c.to;p++)Bp(p,e,r);else{for(var p=c.from;p<=c.to&&p<ia.minOptimizationVal;p++)Bp(p,e,r);if(c.to>=ia.minOptimizationVal)for(var h=c.from>=ia.minOptimizationVal?c.from:ia.minOptimizationVal,R=c.to,y=(0,ia.charCodeToOptimizedIndex)(h),A=(0,ia.charCodeToOptimizedIndex)(R),w=y;w<=A;w++)e[w]=w}}});break;case"Group":Vp(o.value,e,r);break;default:throw Error("Non Exhaustive Match")}var s=o.quantifier!==void 0&&o.quantifier.atLeast===0;if(o.type==="Group"&&DR(o)===!1||o.type!=="Group"&&s===!1)break}break;default:throw Error("non exhaustive match!")}return(0,aae.default)(e)}Tr.firstCharOptimizedIndices=Vp;function Bp(t,e,r){var n=(0,ia.charCodeToOptimizedIndex)(t);e[n]=n,r===!0&&sae(t,e)}function sae(t,e){var r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){var i=(0,ia.charCodeToOptimizedIndex)(n.charCodeAt(0));e[i]=i}else{var a=r.toLowerCase();if(a!==r){var i=(0,ia.charCodeToOptimizedIndex)(a.charCodeAt(0));e[i]=i}}}function $L(t,e){return(0,NR.default)(t.value,function(r){if(typeof r=="number")return(0,$R.default)(e,r);var n=r;return(0,NR.default)(e,function(i){return n.from<=i&&i<=n.to})!==void 0})}function DR(t){var e=t.quantifier;return e&&e.atLeast===0?!0:t.value?(0,rae.default)(t.value)?(0,nae.default)(t.value,DR):DR(t.value):!1}var uae=function(t){tae(e,t);function e(r){var n=t.call(this)||this;return n.targetCharCodes=r,n.found=!1,n}return e.prototype.visitChildren=function(r){if(this.found!==!0){switch(r.type){case"Lookahead":this.visitLookahead(r);return;case"NegativeLookahead":this.visitNegativeLookahead(r);return}t.prototype.visitChildren.call(this,r)}},e.prototype.visitCharacter=function(r){(0,$R.default)(this.targetCharCodes,r.value)&&(this.found=!0)},e.prototype.visitSet=function(r){r.complement?$L(r,this.targetCharCodes)===void 0&&(this.found=!0):$L(r,this.targetCharCodes)!==void 0&&(this.found=!0)},e}(OL.BaseRegExpVisitor);function lae(t,e){if(e instanceof RegExp){var r=(0,IL.getRegExpAst)(e),n=new uae(t);return n.visit(r),n.found}else return(0,NR.default)(e,function(i){return(0,$R.default)(t,i.charCodeAt(0))})!==void 0}Tr.canMatchCharCode=lae});var OR=d(z=>{"use strict";var FL=z&&z.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Pt=z&&z.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(z,"__esModule",{value:!0});z.charCodeToOptimizedIndex=z.minOptimizationVal=z.buildLineBreakIssueMessage=z.LineTerminatorOptimizedTester=z.isShortPattern=z.isCustomPattern=z.cloneEmptyGroups=z.performWarningRuntimeChecks=z.performRuntimeChecks=z.addStickyFlag=z.addStartOfInput=z.findUnreachablePatterns=z.findModesThatDoNotExist=z.findInvalidGroupType=z.findDuplicatePatterns=z.findUnsupportedFlags=z.findStartOfInputAnchor=z.findEmptyMatchRegExps=z.findEndOfInputAnchor=z.findInvalidPatterns=z.findMissingPatterns=z.validatePatterns=z.analyzeTokenTypes=z.enableSticky=z.disableSticky=z.SUPPORT_STICKY=z.MODES=z.DEFAULT_MODE=void 0;var jL=kl(),Xe=fc(),cae=Pt(yu()),GL=Pt(tn()),UL=Pt(lc()),Yp=Pt(Ve()),fae=Pt(mi()),dae=Pt(Qn()),HL=Pt(Gp()),KL=Pt(Up()),qL=Pt(gL()),gt=Pt(Zt()),aa=Pt(er()),oa=Pt(ic()),Jp=Pt(Ys()),xR=Pt(jo()),pae=Pt(Hp()),_r=Pt(nn()),mae=Pt(rn()),Wa=Pt(mR()),_i=Pt(cc()),hae=Pt(wR()),Xp=Pt(na()),Qp=Pt(ra()),ML=du(),Tu=LL(),WL=Wp(),Go="PATTERN";z.DEFAULT_MODE="defaultMode";z.MODES="modes";z.SUPPORT_STICKY=typeof new RegExp("(?:)").sticky=="boolean";function yae(){z.SUPPORT_STICKY=!1}z.disableSticky=yae;function gae(){z.SUPPORT_STICKY=!0}z.enableSticky=gae;function vae(t,e){e=(0,hae.default)(e,{useSticky:z.SUPPORT_STICKY,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:function(C,b){return b()}});var r=e.tracer;r("initCharCodeToOptimizedIndexMap",function(){kae()});var n;r("Reject Lexer.NA",function(){n=(0,HL.default)(t,function(C){return C[Go]===Xe.Lexer.NA})});var i=!1,a;r("Transform Patterns",function(){i=!1,a=(0,gt.default)(n,function(C){var b=C[Go];if((0,Wa.default)(b)){var x=b.source;return x.length===1&&x!=="^"&&x!=="$"&&x!=="."&&!b.ignoreCase?x:x.length===2&&x[0]==="\\"&&!(0,Qp.default)(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],x[1])?x[1]:e.useSticky?qR(b):LR(b)}else{if((0,Jp.default)(b))return i=!0,{exec:b};if(typeof b=="object")return i=!0,b;if(typeof b=="string"){if(b.length===1)return b;var G=b.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),Y=new RegExp(G);return e.useSticky?qR(Y):LR(Y)}else throw Error("non exhaustive match")}})});var o,s,u,l,c;r("misc mapping",function(){o=(0,gt.default)(n,function(C){return C.tokenTypeIdx}),s=(0,gt.default)(n,function(C){var b=C.GROUP;if(b!==Xe.Lexer.SKIPPED){if((0,oa.default)(b))return b;if((0,xR.default)(b))return!1;throw Error("non exhaustive match")}}),u=(0,gt.default)(n,function(C){var b=C.LONGER_ALT;if(b){var x=(0,Yp.default)(b)?(0,gt.default)(b,function(G){return(0,qL.default)(n,G)}):[(0,qL.default)(n,b)];return x}}),l=(0,gt.default)(n,function(C){return C.PUSH_MODE}),c=(0,gt.default)(n,function(C){return(0,_r.default)(C,"POP_MODE")})});var p;r("Line Terminator Handling",function(){var C=aq(e.lineTerminatorCharacters);p=(0,gt.default)(n,function(b){return!1}),e.positionTracking!=="onlyOffset"&&(p=(0,gt.default)(n,function(b){return(0,_r.default)(b,"LINE_BREAKS")?!!b.LINE_BREAKS:nq(b,C)===!1&&(0,Tu.canMatchCharCode)(C,b.PATTERN)}))});var h,R,y,A;r("Misc Mapping #2",function(){h=(0,gt.default)(n,FR),R=(0,gt.default)(a,rq),y=(0,Xp.default)(n,function(C,b){var x=b.GROUP;return(0,oa.default)(x)&&x!==Xe.Lexer.SKIPPED&&(C[x]=[]),C},{}),A=(0,gt.default)(a,function(C,b){return{pattern:a[b],longerAlt:u[b],canLineTerminator:p[b],isCustom:h[b],short:R[b],group:s[b],push:l[b],pop:c[b],tokenTypeIdx:o[b],tokenType:n[b]}})});var w=!0,P=[];return e.safeMode||r("First Char Optimization",function(){P=(0,Xp.default)(n,function(C,b,x){if(typeof b.PATTERN=="string"){var G=b.PATTERN.charCodeAt(0),Y=MR(G);IR(C,Y,A[x])}else if((0,Yp.default)(b.START_CHARS_HINT)){var ce;(0,aa.default)(b.START_CHARS_HINT,function(we){var W=typeof we=="string"?we.charCodeAt(0):we,I=MR(W);ce!==I&&(ce=I,IR(C,I,A[x]))})}else if((0,Wa.default)(b.PATTERN))if(b.PATTERN.unicode)w=!1,e.ensureOptimizations&&(0,ML.PRINT_ERROR)("".concat(Tu.failedOptimizationPrefixMsg)+"	Unable to analyze < ".concat(b.PATTERN.toString(),` > pattern.
`)+`	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{var Ke=(0,Tu.getOptimizedStartCodesIndices)(b.PATTERN,e.ensureOptimizations);(0,GL.default)(Ke)&&(w=!1),(0,aa.default)(Ke,function(we){IR(C,we,A[x])})}else e.ensureOptimizations&&(0,ML.PRINT_ERROR)("".concat(Tu.failedOptimizationPrefixMsg)+"	TokenType: <".concat(b.name,`> is using a custom token pattern without providing <start_chars_hint> parameter.
`)+`	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),w=!1;return C},[])}),{emptyGroups:y,patternIdxToConfig:A,charCodeToPatternIdxToConfig:P,hasCustom:i,canBeOptimized:w}}z.analyzeTokenTypes=vae;function Tae(t,e){var r=[],n=BL(t);r=r.concat(n.errors);var i=VL(n.valid),a=i.valid;return r=r.concat(i.errors),r=r.concat(_ae(a)),r=r.concat(ZL(a)),r=r.concat(eq(a,e)),r=r.concat(tq(a)),r}z.validatePatterns=Tae;function _ae(t){var e=[],r=(0,_i.default)(t,function(n){return(0,Wa.default)(n[Go])});return e=e.concat(zL(r)),e=e.concat(XL(r)),e=e.concat(JL(r)),e=e.concat(QL(r)),e=e.concat(YL(r)),e}function BL(t){var e=(0,_i.default)(t,function(i){return!(0,_r.default)(i,Go)}),r=(0,gt.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:Xe.LexerDefinitionErrorType.MISSING_PATTERN,tokenTypes:[i]}}),n=(0,KL.default)(t,e);return{errors:r,valid:n}}z.findMissingPatterns=BL;function VL(t){var e=(0,_i.default)(t,function(i){var a=i[Go];return!(0,Wa.default)(a)&&!(0,Jp.default)(a)&&!(0,_r.default)(a,"exec")&&!(0,oa.default)(a)}),r=(0,gt.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:Xe.LexerDefinitionErrorType.INVALID_PATTERN,tokenTypes:[i]}}),n=(0,KL.default)(t,e);return{errors:r,valid:n}}z.findInvalidPatterns=VL;var Rae=/[^\\][$]/;function zL(t){var e=function(i){FL(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitEndAnchor=function(o){this.found=!0},a}(jL.BaseRegExpVisitor),r=(0,_i.default)(t,function(i){var a=i.PATTERN;try{var o=(0,WL.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return Rae.test(a.source)}}),n=(0,gt.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:Xe.LexerDefinitionErrorType.EOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}z.findEndOfInputAnchor=zL;function YL(t){var e=(0,_i.default)(t,function(n){var i=n.PATTERN;return i.test("")}),r=(0,gt.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:Xe.LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,tokenTypes:[n]}});return r}z.findEmptyMatchRegExps=YL;var bae=/[^\\[][\^]|^\^/;function XL(t){var e=function(i){FL(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitStartAnchor=function(o){this.found=!0},a}(jL.BaseRegExpVisitor),r=(0,_i.default)(t,function(i){var a=i.PATTERN;try{var o=(0,WL.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return bae.test(a.source)}}),n=(0,gt.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:Xe.LexerDefinitionErrorType.SOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}z.findStartOfInputAnchor=XL;function JL(t){var e=(0,_i.default)(t,function(n){var i=n[Go];return i instanceof RegExp&&(i.multiline||i.global)}),r=(0,gt.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:Xe.LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}});return r}z.findUnsupportedFlags=JL;function QL(t){var e=[],r=(0,gt.default)(t,function(a){return(0,Xp.default)(t,function(o,s){return a.PATTERN.source===s.PATTERN.source&&!(0,Qp.default)(e,s)&&s.PATTERN!==Xe.Lexer.NA&&(e.push(s),o.push(s)),o},[])});r=(0,UL.default)(r);var n=(0,_i.default)(r,function(a){return a.length>1}),i=(0,gt.default)(n,function(a){var o=(0,gt.default)(a,function(u){return u.name}),s=(0,cae.default)(a).PATTERN;return{message:"The same RegExp pattern ->".concat(s,"<-")+"has been used in all of the following Token Types: ".concat(o.join(", ")," <-"),type:Xe.LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,tokenTypes:a}});return i}z.findDuplicatePatterns=QL;function ZL(t){var e=(0,_i.default)(t,function(n){if(!(0,_r.default)(n,"GROUP"))return!1;var i=n.GROUP;return i!==Xe.Lexer.SKIPPED&&i!==Xe.Lexer.NA&&!(0,oa.default)(i)}),r=(0,gt.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:Xe.LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}});return r}z.findInvalidGroupType=ZL;function eq(t,e){var r=(0,_i.default)(t,function(i){return i.PUSH_MODE!==void 0&&!(0,Qp.default)(e,i.PUSH_MODE)}),n=(0,gt.default)(r,function(i){var a="Token Type: ->".concat(i.name,"<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->").concat(i.PUSH_MODE,"<-")+"which does not exist";return{message:a,type:Xe.LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}});return n}z.findModesThatDoNotExist=eq;function tq(t){var e=[],r=(0,Xp.default)(t,function(n,i,a){var o=i.PATTERN;return o===Xe.Lexer.NA||((0,oa.default)(o)?n.push({str:o,idx:a,tokenType:i}):(0,Wa.default)(o)&&Cae(o)&&n.push({str:o.source,idx:a,tokenType:i})),n},[]);return(0,aa.default)(t,function(n,i){(0,aa.default)(r,function(a){var o=a.str,s=a.idx,u=a.tokenType;if(i<s&&Sae(o,n.PATTERN)){var l="Token: ->".concat(u.name,`<- can never be matched.
`)+"Because it appears AFTER the Token Type ->".concat(n.name,"<-")+`in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:l,type:Xe.LexerDefinitionErrorType.UNREACHABLE_PATTERN,tokenTypes:[n,u]})}})}),e}z.findUnreachablePatterns=tq;function Sae(t,e){if((0,Wa.default)(e)){var r=e.exec(t);return r!==null&&r.index===0}else{if((0,Jp.default)(e))return e(t,0,[],{});if((0,_r.default)(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function Cae(t){var e=[".","\\","[","]","|","^","$","(",")","?","*","+","{"];return(0,pae.default)(e,function(r){return t.source.indexOf(r)!==-1})===void 0}function LR(t){var e=t.ignoreCase?"i":"";return new RegExp("^(?:".concat(t.source,")"),e)}z.addStartOfInput=LR;function qR(t){var e=t.ignoreCase?"iy":"y";return new RegExp("".concat(t.source),e)}z.addStickyFlag=qR;function Aae(t,e,r){var n=[];return(0,_r.default)(t,z.DEFAULT_MODE)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+z.DEFAULT_MODE+`> property in its definition
`,type:Xe.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),(0,_r.default)(t,z.MODES)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+z.MODES+`> property in its definition
`,type:Xe.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),(0,_r.default)(t,z.MODES)&&(0,_r.default)(t,z.DEFAULT_MODE)&&!(0,_r.default)(t.modes,t.defaultMode)&&n.push({message:"A MultiMode Lexer cannot be initialized with a ".concat(z.DEFAULT_MODE,": <").concat(t.defaultMode,">")+`which does not exist
`,type:Xe.LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),(0,_r.default)(t,z.MODES)&&(0,aa.default)(t.modes,function(i,a){(0,aa.default)(i,function(o,s){if((0,xR.default)(o))n.push({message:"A Lexer cannot be initialized using an undefined Token Type. Mode:"+"<".concat(a,"> at index: <").concat(s,`>
`),type:Xe.LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if((0,_r.default)(o,"LONGER_ALT")){var u=(0,Yp.default)(o.LONGER_ALT)?o.LONGER_ALT:[o.LONGER_ALT];(0,aa.default)(u,function(l){!(0,xR.default)(l)&&!(0,Qp.default)(i,l)&&n.push({message:"A MultiMode Lexer cannot be initialized with a longer_alt <".concat(l.name,"> on token <").concat(o.name,"> outside of mode <").concat(a,`>
`),type:Xe.LexerDefinitionErrorType.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}z.performRuntimeChecks=Aae;function Eae(t,e,r){var n=[],i=!1,a=(0,UL.default)((0,dae.default)((0,fae.default)(t.modes))),o=(0,HL.default)(a,function(u){return u[Go]===Xe.Lexer.NA}),s=aq(r);return e&&(0,aa.default)(o,function(u){var l=nq(u,s);if(l!==!1){var c=iq(u,l),p={message:c,type:l.issue,tokenType:u};n.push(p)}else(0,_r.default)(u,"LINE_BREAKS")?u.LINE_BREAKS===!0&&(i=!0):(0,Tu.canMatchCharCode)(s,u.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:Xe.LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS}),n}z.performWarningRuntimeChecks=Eae;function Pae(t){var e={},r=(0,mae.default)(t);return(0,aa.default)(r,function(n){var i=t[n];if((0,Yp.default)(i))e[n]=[];else throw Error("non exhaustive match")}),e}z.cloneEmptyGroups=Pae;function FR(t){var e=t.PATTERN;if((0,Wa.default)(e))return!1;if((0,Jp.default)(e))return!0;if((0,_r.default)(e,"exec"))return!0;if((0,oa.default)(e))return!1;throw Error("non exhaustive match")}z.isCustomPattern=FR;function rq(t){return(0,oa.default)(t)&&t.length===1?t.charCodeAt(0):!1}z.isShortPattern=rq;z.LineTerminatorOptimizedTester={test:function(t){for(var e=t.length,r=this.lastIndex;r<e;r++){var n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function nq(t,e){if((0,_r.default)(t,"LINE_BREAKS"))return!1;if((0,Wa.default)(t.PATTERN)){try{(0,Tu.canMatchCharCode)(e,t.PATTERN)}catch(r){return{issue:Xe.LexerDefinitionErrorType.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if((0,oa.default)(t.PATTERN))return!1;if(FR(t))return{issue:Xe.LexerDefinitionErrorType.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function iq(t,e){if(e.issue===Xe.LexerDefinitionErrorType.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	 Root cause: ".concat(e.errMsg,`.
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";if(e.issue===Xe.LexerDefinitionErrorType.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";throw Error("non exhaustive match")}z.buildLineBreakIssueMessage=iq;function aq(t){var e=(0,gt.default)(t,function(r){return(0,oa.default)(r)?r.charCodeAt(0):r});return e}function IR(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}z.minOptimizationVal=256;var zp=[];function MR(t){return t<z.minOptimizationVal?t:zp[t]}z.charCodeToOptimizedIndex=MR;function kae(){if((0,GL.default)(zp)){zp=new Array(65536);for(var t=0;t<65536;t++)zp[t]=t>255?255+~~(t/255):t}}});var Zp=d((ISe,oq)=>{function wae(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}oq.exports=wae});var Ho=d(_e=>{"use strict";var Ri=_e&&_e.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(_e,"__esModule",{value:!0});_e.isTokenType=_e.hasExtendingTokensTypesMapProperty=_e.hasExtendingTokensTypesProperty=_e.hasCategoriesProperty=_e.hasShortKeyProperty=_e.singleAssignCategoriesToksMap=_e.assignCategoriesMapProp=_e.assignCategoriesTokensProp=_e.assignTokenDefaultProps=_e.expandCategories=_e.augmentTokenTypes=_e.tokenIdxToClass=_e.tokenShortNameIdx=_e.tokenStructuredMatcherNoCategories=_e.tokenStructuredMatcher=void 0;var Nae=Ri(tn()),Dae=Ri(lc()),$ae=Ri(Ve()),Oae=Ri(Qn()),Iae=Ri(Up()),xae=Ri(Zt()),Uo=Ri(er()),dc=Ri(nn()),Lae=Ri(ra()),qae=Ri(ea());function Mae(t,e){var r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}_e.tokenStructuredMatcher=Mae;function Fae(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}_e.tokenStructuredMatcherNoCategories=Fae;_e.tokenShortNameIdx=1;_e.tokenIdxToClass={};function jae(t){var e=sq(t);uq(e),cq(e),lq(e),(0,Uo.default)(e,function(r){r.isParent=r.categoryMatches.length>0})}_e.augmentTokenTypes=jae;function sq(t){for(var e=(0,qae.default)(t),r=t,n=!0;n;){r=(0,Dae.default)((0,Oae.default)((0,xae.default)(r,function(a){return a.CATEGORIES})));var i=(0,Iae.default)(r,e);e=e.concat(i),(0,Nae.default)(i)?n=!1:r=i}return e}_e.expandCategories=sq;function uq(t){(0,Uo.default)(t,function(e){fq(e)||(_e.tokenIdxToClass[_e.tokenShortNameIdx]=e,e.tokenTypeIdx=_e.tokenShortNameIdx++),jR(e)&&!(0,$ae.default)(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),jR(e)||(e.CATEGORIES=[]),dq(e)||(e.categoryMatches=[]),pq(e)||(e.categoryMatchesMap={})})}_e.assignTokenDefaultProps=uq;function lq(t){(0,Uo.default)(t,function(e){e.categoryMatches=[],(0,Uo.default)(e.categoryMatchesMap,function(r,n){e.categoryMatches.push(_e.tokenIdxToClass[n].tokenTypeIdx)})})}_e.assignCategoriesTokensProp=lq;function cq(t){(0,Uo.default)(t,function(e){GR([],e)})}_e.assignCategoriesMapProp=cq;function GR(t,e){(0,Uo.default)(t,function(r){e.categoryMatchesMap[r.tokenTypeIdx]=!0}),(0,Uo.default)(e.CATEGORIES,function(r){var n=t.concat(e);(0,Lae.default)(n,r)||GR(n,r)})}_e.singleAssignCategoriesToksMap=GR;function fq(t){return(0,dc.default)(t,"tokenTypeIdx")}_e.hasShortKeyProperty=fq;function jR(t){return(0,dc.default)(t,"CATEGORIES")}_e.hasCategoriesProperty=jR;function dq(t){return(0,dc.default)(t,"categoryMatches")}_e.hasExtendingTokensTypesProperty=dq;function pq(t){return(0,dc.default)(t,"categoryMatchesMap")}_e.hasExtendingTokensTypesMapProperty=pq;function Gae(t){return(0,dc.default)(t,"tokenTypeIdx")}_e.isTokenType=Gae});var UR=d(em=>{"use strict";Object.defineProperty(em,"__esModule",{value:!0});em.defaultLexerErrorProvider=void 0;em.defaultLexerErrorProvider={buildUnableToPopLexerModeMessage:function(t){return"Unable to pop Lexer Mode after encountering Token ->".concat(t.image,"<- The Mode Stack is empty")},buildUnexpectedCharactersMessage:function(t,e,r,n,i){return"unexpected character: ->".concat(t.charAt(e),"<- at offset: ").concat(e,",")+" skipped ".concat(r," characters.")}}});var fc=d(ua=>{"use strict";var an=ua&&ua.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ua,"__esModule",{value:!0});ua.Lexer=ua.LexerDefinitionErrorType=void 0;var sa=OR(),HR=an(qp()),tm=an(tn()),Uae=an(Ve()),Hae=an(Zp()),Kae=an(Gp()),mq=an(Zt()),KR=an(er()),Wae=an(rn()),Bae=an(jo()),hq=an(Fo()),yq=an(oc()),Vae=an(na()),gq=an(ea()),WR=du(),zae=Ho(),Yae=UR(),Xae=Wp(),Jae;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(Jae=ua.LexerDefinitionErrorType||(ua.LexerDefinitionErrorType={}));var pc={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:Yae.defaultLexerErrorProvider,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(pc);var Qae=function(){function t(e,r){r===void 0&&(r=pc);var n=this;if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=function(a,o){if(n.traceInitPerf===!0){n.traceInitIndent++;var s=new Array(n.traceInitIndent+1).join("	");n.traceInitIndent<n.traceInitMaxIdent&&console.log("".concat(s,"--> <").concat(a,">"));var u=(0,WR.timer)(o),l=u.time,c=u.value,p=l>10?console.warn:console.log;return n.traceInitIndent<n.traceInitMaxIdent&&p("".concat(s,"<-- <").concat(a,"> time: ").concat(l,"ms")),n.traceInitIndent--,c}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=(0,yq.default)({},pc,r);var i=this.config.traceInitPerf;i===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof i=="number"&&(this.traceInitMaxIdent=i,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",function(){var a,o=!0;n.TRACE_INIT("Lexer Config handling",function(){if(n.config.lineTerminatorsPattern===pc.lineTerminatorsPattern)n.config.lineTerminatorsPattern=sa.LineTerminatorOptimizedTester;else if(n.config.lineTerminatorCharacters===pc.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');n.trackStartLines=/full|onlyStart/i.test(n.config.positionTracking),n.trackEndLines=/full/i.test(n.config.positionTracking),(0,Uae.default)(e)?a={modes:{defaultMode:(0,gq.default)(e)},defaultMode:sa.DEFAULT_MODE}:(o=!1,a=(0,gq.default)(e))}),n.config.skipValidations===!1&&(n.TRACE_INIT("performRuntimeChecks",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,sa.performRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))}),n.TRACE_INIT("performWarningRuntimeChecks",function(){n.lexerDefinitionWarning=n.lexerDefinitionWarning.concat((0,sa.performWarningRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))})),a.modes=a.modes?a.modes:{},(0,KR.default)(a.modes,function(c,p){a.modes[p]=(0,Kae.default)(c,function(h){return(0,Bae.default)(h)})});var s=(0,Wae.default)(a.modes);if((0,KR.default)(a.modes,function(c,p){n.TRACE_INIT("Mode: <".concat(p,"> processing"),function(){if(n.modes.push(p),n.config.skipValidations===!1&&n.TRACE_INIT("validatePatterns",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,sa.validatePatterns)(c,s))}),(0,tm.default)(n.lexerDefinitionErrors)){(0,zae.augmentTokenTypes)(c);var h;n.TRACE_INIT("analyzeTokenTypes",function(){h=(0,sa.analyzeTokenTypes)(c,{lineTerminatorCharacters:n.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:n.TRACE_INIT})}),n.patternIdxToConfig[p]=h.patternIdxToConfig,n.charCodeToPatternIdxToConfig[p]=h.charCodeToPatternIdxToConfig,n.emptyGroups=(0,yq.default)({},n.emptyGroups,h.emptyGroups),n.hasCustom=h.hasCustom||n.hasCustom,n.canModeBeOptimized[p]=h.canBeOptimized}})}),n.defaultMode=a.defaultMode,!(0,tm.default)(n.lexerDefinitionErrors)&&!n.config.deferDefinitionErrorsHandling){var u=(0,mq.default)(n.lexerDefinitionErrors,function(c){return c.message}),l=u.join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+l)}(0,KR.default)(n.lexerDefinitionWarning,function(c){(0,WR.PRINT_WARNING)(c.message)}),n.TRACE_INIT("Choosing sub-methods implementations",function(){if(sa.SUPPORT_STICKY?(n.chopInput=hq.default,n.match=n.matchWithTest):(n.updateLastIndex=HR.default,n.match=n.matchWithExec),o&&(n.handleModes=HR.default),n.trackStartLines===!1&&(n.computeNewColumn=hq.default),n.trackEndLines===!1&&(n.updateTokenEndLineColumnLocation=HR.default),/full/i.test(n.config.positionTracking))n.createTokenInstance=n.createFullToken;else if(/onlyStart/i.test(n.config.positionTracking))n.createTokenInstance=n.createStartOnlyToken;else if(/onlyOffset/i.test(n.config.positionTracking))n.createTokenInstance=n.createOffsetOnlyToken;else throw Error('Invalid <positionTracking> config option: "'.concat(n.config.positionTracking,'"'));n.hasCustom?(n.addToken=n.addTokenUsingPush,n.handlePayload=n.handlePayloadWithCustom):(n.addToken=n.addTokenUsingMemberAccess,n.handlePayload=n.handlePayloadNoCustom)}),n.TRACE_INIT("Failed Optimization Warnings",function(){var c=(0,Vae.default)(n.canModeBeOptimized,function(p,h,R){return h===!1&&p.push(R),p},[]);if(r.ensureOptimizations&&!(0,tm.default)(c))throw Error("Lexer Modes: < ".concat(c.join(", "),` > cannot be optimized.
`)+`	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),n.TRACE_INIT("clearRegExpParserCache",function(){(0,Xae.clearRegExpParserCache)()}),n.TRACE_INIT("toFastProperties",function(){(0,WR.toFastProperties)(n)})})}return t.prototype.tokenize=function(e,r){if(r===void 0&&(r=this.defaultMode),!(0,tm.default)(this.lexerDefinitionErrors)){var n=(0,mq.default)(this.lexerDefinitionErrors,function(a){return a.message}),i=n.join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)},t.prototype.tokenizeInternal=function(e,r){var n=this,i,a,o,s,u,l,c,p,h,R,y,A,w,P,C,b,x=e,G=x.length,Y=0,ce=0,Ke=this.hasCustom?0:Math.floor(e.length/10),we=new Array(Ke),W=[],I=this.trackStartLines?1:void 0,H=this.trackStartLines?1:void 0,X=(0,sa.cloneEmptyGroups)(this.emptyGroups),be=this.trackStartLines,he=this.config.lineTerminatorsPattern,le=0,st=[],et=[],Ne=[],Tt=[];Object.freeze(Tt);var Mr;function Dn(){return st}function ga(kt){var jr=(0,sa.charCodeToOptimizedIndex)(kt),Sr=et[jr];return Sr===void 0?Tt:Sr}var Ii=function(kt){if(Ne.length===1&&kt.tokenType.PUSH_MODE===void 0){var jr=n.config.errorMessageProvider.buildUnableToPopLexerModeMessage(kt);W.push({offset:kt.startOffset,line:kt.startLine,column:kt.startColumn,length:kt.image.length,message:jr})}else{Ne.pop();var Sr=(0,Hae.default)(Ne);st=n.patternIdxToConfig[Sr],et=n.charCodeToPatternIdxToConfig[Sr],le=st.length;var Qr=n.canModeBeOptimized[Sr]&&n.config.safeMode===!1;et&&Qr?Mr=ga:Mr=Dn}};function xi(kt){Ne.push(kt),et=this.charCodeToPatternIdxToConfig[kt],st=this.patternIdxToConfig[kt],le=st.length,le=st.length;var jr=this.canModeBeOptimized[kt]&&this.config.safeMode===!1;et&&jr?Mr=ga:Mr=Dn}xi.call(this,r);for(var nr,va=this.config.recoveryEnabled;Y<G;){l=null;var Ta=x.charCodeAt(Y),_a=Mr(Ta),uo=_a.length;for(i=0;i<uo;i++){nr=_a[i];var _t=nr.pattern;c=null;var Vt=nr.short;if(Vt!==!1?Ta===Vt&&(l=_t):nr.isCustom===!0?(b=_t.exec(x,Y,we,X),b!==null?(l=b[0],b.payload!==void 0&&(c=b.payload)):l=null):(this.updateLastIndex(_t,Y),l=this.match(_t,e,Y)),l!==null){if(u=nr.longerAlt,u!==void 0){var lo=u.length;for(o=0;o<lo;o++){var ln=st[u[o]],cn=ln.pattern;if(p=null,ln.isCustom===!0?(b=cn.exec(x,Y,we,X),b!==null?(s=b[0],b.payload!==void 0&&(p=b.payload)):s=null):(this.updateLastIndex(cn,Y),s=this.match(cn,e,Y)),s&&s.length>l.length){l=s,c=p,nr=ln;break}}}break}}if(l!==null){if(h=l.length,R=nr.group,R!==void 0&&(y=nr.tokenTypeIdx,A=this.createTokenInstance(l,Y,y,nr.tokenType,I,H,h),this.handlePayload(A,c),R===!1?ce=this.addToken(we,ce,A):X[R].push(A)),e=this.chopInput(e,h),Y=Y+h,H=this.computeNewColumn(H,h),be===!0&&nr.canLineTerminator===!0){var fn=0,$n=void 0,Fr=void 0;he.lastIndex=0;do $n=he.test(l),$n===!0&&(Fr=he.lastIndex-1,fn++);while($n===!0);fn!==0&&(I=I+fn,H=h-Fr,this.updateTokenEndLineColumnLocation(A,R,Fr,fn,I,H,h))}this.handleModes(nr,Ii,xi,A)}else{for(var zt=Y,dn=I,Ra=H,br=va===!1;br===!1&&Y<G;)for(e=this.chopInput(e,1),Y++,a=0;a<le;a++){var fr=st[a],_t=fr.pattern,Vt=fr.short;if(Vt!==!1?x.charCodeAt(Y)===Vt&&(br=!0):fr.isCustom===!0?br=_t.exec(x,Y,we,X)!==null:(this.updateLastIndex(_t,Y),br=_t.exec(e)!==null),br===!0)break}if(w=Y-zt,C=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(x,zt,w,dn,Ra),W.push({offset:zt,line:dn,column:Ra,length:w,message:C}),va===!1)break}}return this.hasCustom||(we.length=ce),{tokens:we,groups:X,errors:W}},t.prototype.handleModes=function(e,r,n,i){if(e.pop===!0){var a=e.push;r(i),a!==void 0&&n.call(this,a)}else e.push!==void 0&&n.call(this,e.push)},t.prototype.chopInput=function(e,r){return e.substring(r)},t.prototype.updateLastIndex=function(e,r){e.lastIndex=r},t.prototype.updateTokenEndLineColumnLocation=function(e,r,n,i,a,o,s){var u,l;r!==void 0&&(u=n===s-1,l=u?-1:0,i===1&&u===!0||(e.endLine=a+l,e.endColumn=o-1+-l))},t.prototype.computeNewColumn=function(e,r){return e+r},t.prototype.createOffsetOnlyToken=function(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}},t.prototype.createStartOnlyToken=function(e,r,n,i,a,o){return{image:e,startOffset:r,startLine:a,startColumn:o,tokenTypeIdx:n,tokenType:i}},t.prototype.createFullToken=function(e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:r+s-1,startLine:a,endLine:a,startColumn:o,endColumn:o+s-1,tokenTypeIdx:n,tokenType:i}},t.prototype.addTokenUsingPush=function(e,r,n){return e.push(n),r},t.prototype.addTokenUsingMemberAccess=function(e,r,n){return e[r]=n,r++,r},t.prototype.handlePayloadNoCustom=function(e,r){},t.prototype.handlePayloadWithCustom=function(e,r){r!==null&&(e.payload=r)},t.prototype.matchWithTest=function(e,r,n){var i=e.test(r);return i===!0?r.substring(n,e.lastIndex):null},t.prototype.matchWithExec=function(e,r){var n=e.exec(r);return n!==null?n[0]:null},t.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.",t.NA=/NOT_APPLICABLE/,t}();ua.Lexer=Qae});var Ko=d(Bt=>{"use strict";var BR=Bt&&Bt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Bt,"__esModule",{value:!0});Bt.tokenMatcher=Bt.createTokenInstance=Bt.EOF=Bt.createToken=Bt.hasTokenLabel=Bt.tokenName=Bt.tokenLabel=void 0;var Zae=BR(ic()),la=BR(nn()),eoe=BR(jo()),toe=fc(),VR=Ho();function roe(t){return Eq(t)?t.LABEL:t.name}Bt.tokenLabel=roe;function noe(t){return t.name}Bt.tokenName=noe;function Eq(t){return(0,Zae.default)(t.LABEL)&&t.LABEL!==""}Bt.hasTokenLabel=Eq;var ioe="parent",vq="categories",Tq="label",_q="group",Rq="push_mode",bq="pop_mode",Sq="longer_alt",Cq="line_breaks",Aq="start_chars_hint";function Pq(t){return aoe(t)}Bt.createToken=Pq;function aoe(t){var e=t.pattern,r={};if(r.name=t.name,(0,eoe.default)(e)||(r.PATTERN=e),(0,la.default)(t,ioe))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return(0,la.default)(t,vq)&&(r.CATEGORIES=t[vq]),(0,VR.augmentTokenTypes)([r]),(0,la.default)(t,Tq)&&(r.LABEL=t[Tq]),(0,la.default)(t,_q)&&(r.GROUP=t[_q]),(0,la.default)(t,bq)&&(r.POP_MODE=t[bq]),(0,la.default)(t,Rq)&&(r.PUSH_MODE=t[Rq]),(0,la.default)(t,Sq)&&(r.LONGER_ALT=t[Sq]),(0,la.default)(t,Cq)&&(r.LINE_BREAKS=t[Cq]),(0,la.default)(t,Aq)&&(r.START_CHARS_HINT=t[Aq]),r}Bt.EOF=Pq({name:"EOF",pattern:toe.Lexer.NA});(0,VR.augmentTokenTypes)([Bt.EOF]);function ooe(t,e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:a,startColumn:o,endColumn:s,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}Bt.createTokenInstance=ooe;function soe(t,e){return(0,VR.tokenStructuredMatcher)(t,e)}Bt.tokenMatcher=soe});var Ru=d(Zn=>{"use strict";var XR=Zn&&Zn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Zn,"__esModule",{value:!0});Zn.defaultGrammarValidatorErrorProvider=Zn.defaultGrammarResolverErrorProvider=Zn.defaultParserErrorProvider=void 0;var _u=Ko(),YR=XR(yu()),Ba=XR(Zt()),uoe=XR(na()),zR=Dt(),kq=Dt();Zn.defaultParserErrorProvider={buildMismatchTokenMessage:function(t){var e=t.expected,r=t.actual,n=t.previous,i=t.ruleName,a=(0,_u.hasTokenLabel)(e),o=a?"--> ".concat((0,_u.tokenLabel)(e)," <--"):"token of type --> ".concat(e.name," <--"),s="Expecting ".concat(o," but found --> '").concat(r.image,"' <--");return s},buildNotAllInputParsedMessage:function(t){var e=t.firstRedundant,r=t.ruleName;return"Redundant input, expecting EOF but found: "+e.image},buildNoViableAltMessage:function(t){var e=t.expectedPathsPerAlt,r=t.actual,n=t.previous,i=t.customUserDescription,a=t.ruleName,o="Expecting: ",s=(0,YR.default)(r).image,u=`
but found: '`+s+"'";if(i)return o+i+u;var l=(0,uoe.default)(e,function(R,y){return R.concat(y)},[]),c=(0,Ba.default)(l,function(R){return"[".concat((0,Ba.default)(R,function(y){return(0,_u.tokenLabel)(y)}).join(", "),"]")}),p=(0,Ba.default)(c,function(R,y){return"  ".concat(y+1,". ").concat(R)}),h=`one of these possible Token sequences:
`.concat(p.join(`
`));return o+h+u},buildEarlyExitMessage:function(t){var e=t.expectedIterationPaths,r=t.actual,n=t.customUserDescription,i=t.ruleName,a="Expecting: ",o=(0,YR.default)(r).image,s=`
but found: '`+o+"'";if(n)return a+n+s;var u=(0,Ba.default)(e,function(c){return"[".concat((0,Ba.default)(c,function(p){return(0,_u.tokenLabel)(p)}).join(","),"]")}),l=`expecting at least one iteration which starts with one of these possible Token sequences::
  `+"<".concat(u.join(" ,"),">");return a+l+s}};Object.freeze(Zn.defaultParserErrorProvider);Zn.defaultGrammarResolverErrorProvider={buildRuleNotFoundError:function(t,e){var r="Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-";return r}};Zn.defaultGrammarValidatorErrorProvider={buildDuplicateFoundError:function(t,e){function r(c){return c instanceof zR.Terminal?c.terminalType.name:c instanceof zR.NonTerminal?c.nonTerminalName:""}var n=t.name,i=(0,YR.default)(e),a=i.idx,o=(0,kq.getProductionDslName)(i),s=r(i),u=a>0,l="->".concat(o).concat(u?a:"","<- ").concat(s?"with argument: ->".concat(s,"<-"):"",`
                  appears more than once (`).concat(e.length," times) in the top level rule: ->").concat(n,`<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `);return l=l.replace(/[ \t]+/g," "),l=l.replace(/\s\s+/g,`
`),l},buildNamespaceConflictError:function(t){var e=`Namespace conflict found in grammar.
`+"The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <".concat(t.name,`>.
`)+`To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;return e},buildAlternationPrefixAmbiguityError:function(t){var e=(0,Ba.default)(t.prefixPath,function(i){return(0,_u.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous alternatives: <".concat(t.ambiguityIndices.join(" ,"),`> due to common lookahead prefix
`)+"in <OR".concat(r,"> inside <").concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`)+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;return n},buildAlternationAmbiguityError:function(t){var e=(0,Ba.default)(t.prefixPath,function(i){return(0,_u.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous Alternatives Detected: <".concat(t.ambiguityIndices.join(" ,"),"> in <OR").concat(r,">")+" inside <".concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`);return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError:function(t){var e=(0,kq.getProductionDslName)(t.repetition);t.repetition.idx!==0&&(e+=t.repetition.idx);var r="The repetition <".concat(e,"> within Rule <").concat(t.topLevelRule.name,`> can never consume any tokens.
`)+"This could lead to an infinite loop.";return r},buildTokenNameError:function(t){return"deprecated"},buildEmptyAlternationError:function(t){var e="Ambiguous empty alternative: <".concat(t.emptyChoiceIdx+1,">")+" in <OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
`)+"Only the last alternative may be an empty alternative.";return e},buildTooManyAlternativesError:function(t){var e=`An Alternation cannot have more than 256 alternatives:
`+"<OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
 has `).concat(t.alternation.definition.length+1," alternatives.");return e},buildLeftRecursionError:function(t){var e=t.topLevelRule.name,r=(0,Ba.default)(t.leftRecursionPath,function(a){return a.name}),n="".concat(e," --> ").concat(r.concat([e]).join(" --> ")),i=`Left Recursion found in grammar.
`+"rule: <".concat(e,`> can be invoked from itself (directly or indirectly)
`)+`without consuming any Tokens. The grammar path that causes this is: 
 `.concat(n,`
`)+` To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;return i},buildInvalidRuleNameError:function(t){return"deprecated"},buildDuplicateRuleNameError:function(t){var e;t.topLevelRule instanceof zR.Rule?e=t.topLevelRule.name:e=t.topLevelRule;var r="Duplicate definition, rule: ->".concat(e,"<- is already defined in the grammar: ->").concat(t.grammarName,"<-");return r}}});var Dq=d(bi=>{"use strict";var loe=bi&&bi.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),wq=bi&&bi.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(bi,"__esModule",{value:!0});bi.GastRefResolverVisitor=bi.resolveGrammar=void 0;var coe=Br(),foe=wq(er()),doe=wq(mi()),poe=Dt();function moe(t,e){var r=new Nq(t,e);return r.resolveRefs(),r.errors}bi.resolveGrammar=moe;var Nq=function(t){loe(e,t);function e(r,n){var i=t.call(this)||this;return i.nameToTopRule=r,i.errMsgProvider=n,i.errors=[],i}return e.prototype.resolveRefs=function(){var r=this;(0,foe.default)((0,doe.default)(this.nameToTopRule),function(n){r.currTopLevel=n,n.accept(r)})},e.prototype.visitNonTerminal=function(r){var n=this.nameToTopRule[r.nonTerminalName];if(n)r.referencedRule=n;else{var i=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,r);this.errors.push({message:i,type:coe.ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:r.nonTerminalName})}},e}(poe.GAstVisitor);bi.GastRefResolverVisitor=Nq});var Oq=d((GSe,$q)=>{function hoe(t,e,r,n){for(var i=-1,a=t==null?0:t.length;++i<a;){var o=t[i];e(n,o,r(o),t)}return n}$q.exports=hoe});var xq=d((USe,Iq)=>{var yoe=Ka();function goe(t,e,r,n){return yoe(t,function(i,a,o){e(n,i,r(i),o)}),n}Iq.exports=goe});var qq=d((HSe,Lq)=>{var voe=Oq(),Toe=xq(),_oe=En(),Roe=Ve();function boe(t,e){return function(r,n){var i=Roe(r)?voe:Toe,a=e?e():{};return i(r,t,_oe(n,2),a)}}Lq.exports=boe});var JR=d((KSe,Mq)=>{var Soe=bp(),Coe=qq(),Aoe=Object.prototype,Eoe=Aoe.hasOwnProperty,Poe=Coe(function(t,e,r){Eoe.call(t,r)?t[r].push(e):Soe(t,r,[e])});Mq.exports=Poe});var rm=d((WSe,Fq)=>{var koe=Lp(),woe=Zt();function Noe(t,e){return koe(woe(t,e),1)}Fq.exports=Noe});var nm=d((BSe,jq)=>{var Doe=Ep(),$oe=pu();function Ooe(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:$oe(e),e=n-e,Doe(t,0,e<0?0:e)):[]}jq.exports=Ooe});var hc=d(vt=>{"use strict";var Bo=vt&&vt.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Vo=vt&&vt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(vt,"__esModule",{value:!0});vt.nextPossibleTokensAfter=vt.possiblePathsFrom=vt.NextTerminalAfterAtLeastOneSepWalker=vt.NextTerminalAfterAtLeastOneWalker=vt.NextTerminalAfterManySepWalker=vt.NextTerminalAfterManyWalker=vt.AbstractNextTerminalAfterProductionWalker=vt.NextAfterTokenWalker=vt.AbstractNextPossibleTokensWalker=void 0;var Uq=xp(),am=Vo(yu()),im=Vo(tn()),Gq=Vo(nm()),Dr=Vo(Pp()),Ioe=Vo(Zp()),xoe=Vo(er()),Wo=Vo(ea()),Loe=ER(),Re=Dt(),Hq=function(t){Bo(e,t);function e(r,n){var i=t.call(this)||this;return i.topProd=r,i.path=n,i.possibleTokTypes=[],i.nextProductionName="",i.nextProductionOccurrence=0,i.found=!1,i.isAtEndOfPath=!1,i}return e.prototype.startWalking=function(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=(0,Wo.default)(this.path.ruleStack).reverse(),this.occurrenceStack=(0,Wo.default)(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes},e.prototype.walk=function(r,n){n===void 0&&(n=[]),this.found||t.prototype.walk.call(this,r,n)},e.prototype.walkProdRef=function(r,n,i){if(r.referencedRule.name===this.nextProductionName&&r.idx===this.nextProductionOccurrence){var a=n.concat(i);this.updateExpectedNext(),this.walk(r.referencedRule,a)}},e.prototype.updateExpectedNext=function(){(0,im.default)(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())},e}(Uq.RestWalker);vt.AbstractNextPossibleTokensWalker=Hq;var qoe=function(t){Bo(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.path=n,i.nextTerminalName="",i.nextTerminalOccurrence=0,i.nextTerminalName=i.path.lastTok.name,i.nextTerminalOccurrence=i.path.lastTokOccurrence,i}return e.prototype.walkTerminal=function(r,n,i){if(this.isAtEndOfPath&&r.terminalType.name===this.nextTerminalName&&r.idx===this.nextTerminalOccurrence&&!this.found){var a=n.concat(i),o=new Re.Alternative({definition:a});this.possibleTokTypes=(0,Loe.first)(o),this.found=!0}},e}(Hq);vt.NextAfterTokenWalker=qoe;var mc=function(t){Bo(e,t);function e(r,n){var i=t.call(this)||this;return i.topRule=r,i.occurrence=n,i.result={token:void 0,occurrence:void 0,isEndOfRule:void 0},i}return e.prototype.startWalking=function(){return this.walk(this.topRule),this.result},e}(Uq.RestWalker);vt.AbstractNextTerminalAfterProductionWalker=mc;var Moe=function(t){Bo(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkMany=function(r,n,i){if(r.idx===this.occurrence){var a=(0,am.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof Re.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkMany.call(this,r,n,i)},e}(mc);vt.NextTerminalAfterManyWalker=Moe;var Foe=function(t){Bo(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkManySep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,am.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof Re.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkManySep.call(this,r,n,i)},e}(mc);vt.NextTerminalAfterManySepWalker=Foe;var joe=function(t){Bo(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOne=function(r,n,i){if(r.idx===this.occurrence){var a=(0,am.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof Re.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOne.call(this,r,n,i)},e}(mc);vt.NextTerminalAfterAtLeastOneWalker=joe;var Goe=function(t){Bo(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOneSep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,am.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof Re.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOneSep.call(this,r,n,i)},e}(mc);vt.NextTerminalAfterAtLeastOneSepWalker=Goe;function Kq(t,e,r){r===void 0&&(r=[]),r=(0,Wo.default)(r);var n=[],i=0;function a(l){return l.concat((0,Dr.default)(t,i+1))}function o(l){var c=Kq(a(l),e,r);return n.concat(c)}for(;r.length<e&&i<t.length;){var s=t[i];if(s instanceof Re.Alternative)return o(s.definition);if(s instanceof Re.NonTerminal)return o(s.definition);if(s instanceof Re.Option)n=o(s.definition);else if(s instanceof Re.RepetitionMandatory){var u=s.definition.concat([new Re.Repetition({definition:s.definition})]);return o(u)}else if(s instanceof Re.RepetitionMandatoryWithSeparator){var u=[new Re.Alternative({definition:s.definition}),new Re.Repetition({definition:[new Re.Terminal({terminalType:s.separator})].concat(s.definition)})];return o(u)}else if(s instanceof Re.RepetitionWithSeparator){var u=s.definition.concat([new Re.Repetition({definition:[new Re.Terminal({terminalType:s.separator})].concat(s.definition)})]);n=o(u)}else if(s instanceof Re.Repetition){var u=s.definition.concat([new Re.Repetition({definition:s.definition})]);n=o(u)}else{if(s instanceof Re.Alternation)return(0,xoe.default)(s.definition,function(l){(0,im.default)(l.definition)===!1&&(n=o(l.definition))}),n;if(s instanceof Re.Terminal)r.push(s.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:(0,Dr.default)(t,i)}),n}vt.possiblePathsFrom=Kq;function Uoe(t,e,r,n){var i="EXIT_NONE_TERMINAL",a=[i],o="EXIT_ALTERNATIVE",s=!1,u=e.length,l=u-n-1,c=[],p=[];for(p.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!(0,im.default)(p);){var h=p.pop();if(h===o){s&&(0,Ioe.default)(p).idx<=l&&p.pop();continue}var R=h.def,y=h.idx,A=h.ruleStack,w=h.occurrenceStack;if(!(0,im.default)(R)){var P=R[0];if(P===i){var C={idx:y,def:(0,Dr.default)(R),ruleStack:(0,Gq.default)(A),occurrenceStack:(0,Gq.default)(w)};p.push(C)}else if(P instanceof Re.Terminal)if(y<u-1){var b=y+1,x=e[b];if(r(x,P.terminalType)){var C={idx:b,def:(0,Dr.default)(R),ruleStack:A,occurrenceStack:w};p.push(C)}}else if(y===u-1)c.push({nextTokenType:P.terminalType,nextTokenOccurrence:P.idx,ruleStack:A,occurrenceStack:w}),s=!0;else throw Error("non exhaustive match");else if(P instanceof Re.NonTerminal){var G=(0,Wo.default)(A);G.push(P.nonTerminalName);var Y=(0,Wo.default)(w);Y.push(P.idx);var C={idx:y,def:P.definition.concat(a,(0,Dr.default)(R)),ruleStack:G,occurrenceStack:Y};p.push(C)}else if(P instanceof Re.Option){var ce={idx:y,def:(0,Dr.default)(R),ruleStack:A,occurrenceStack:w};p.push(ce),p.push(o);var Ke={idx:y,def:P.definition.concat((0,Dr.default)(R)),ruleStack:A,occurrenceStack:w};p.push(Ke)}else if(P instanceof Re.RepetitionMandatory){var we=new Re.Repetition({definition:P.definition,idx:P.idx}),W=P.definition.concat([we],(0,Dr.default)(R)),C={idx:y,def:W,ruleStack:A,occurrenceStack:w};p.push(C)}else if(P instanceof Re.RepetitionMandatoryWithSeparator){var I=new Re.Terminal({terminalType:P.separator}),we=new Re.Repetition({definition:[I].concat(P.definition),idx:P.idx}),W=P.definition.concat([we],(0,Dr.default)(R)),C={idx:y,def:W,ruleStack:A,occurrenceStack:w};p.push(C)}else if(P instanceof Re.RepetitionWithSeparator){var ce={idx:y,def:(0,Dr.default)(R),ruleStack:A,occurrenceStack:w};p.push(ce),p.push(o);var I=new Re.Terminal({terminalType:P.separator}),H=new Re.Repetition({definition:[I].concat(P.definition),idx:P.idx}),W=P.definition.concat([H],(0,Dr.default)(R)),Ke={idx:y,def:W,ruleStack:A,occurrenceStack:w};p.push(Ke)}else if(P instanceof Re.Repetition){var ce={idx:y,def:(0,Dr.default)(R),ruleStack:A,occurrenceStack:w};p.push(ce),p.push(o);var H=new Re.Repetition({definition:P.definition,idx:P.idx}),W=P.definition.concat([H],(0,Dr.default)(R)),Ke={idx:y,def:W,ruleStack:A,occurrenceStack:w};p.push(Ke)}else if(P instanceof Re.Alternation)for(var X=P.definition.length-1;X>=0;X--){var be=P.definition[X],he={idx:y,def:be.definition.concat((0,Dr.default)(R)),ruleStack:A,occurrenceStack:w};p.push(he),p.push(o)}else if(P instanceof Re.Alternative)p.push({idx:y,def:P.definition.concat((0,Dr.default)(R)),ruleStack:A,occurrenceStack:w});else if(P instanceof Re.Rule)p.push(Hoe(P,y,A,w));else throw Error("non exhaustive match")}}return c}vt.nextPossibleTokensAfter=Uoe;function Hoe(t,e,r,n){var i=(0,Wo.default)(r);i.push(t.name);var a=(0,Wo.default)(n);return a.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:a}}});var bu=d($e=>{"use strict";var zq=$e&&$e.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Xo=$e&&$e.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty($e,"__esModule",{value:!0});$e.areTokenCategoriesNotUsed=$e.isStrictPrefixOfPath=$e.containsPath=$e.getLookaheadPathsForOptionalProd=$e.getLookaheadPathsForOr=$e.lookAheadSequenceFromAlternatives=$e.buildSingleAlternativeLookaheadFunction=$e.buildAlternativesLookAheadFunc=$e.buildLookaheadFuncForOptionalProd=$e.buildLookaheadFuncForOr=$e.getLookaheadPaths=$e.getProdType=$e.PROD_TYPE=void 0;var ZR=Xo(tn()),Yq=Xo(Qn()),Yo=Xo(uc()),om=Xo(Zt()),zo=Xo(er()),Wq=Xo(nn()),Xq=Xo(na()),Bq=hc(),Koe=xp(),sm=Ho(),Va=Dt(),Woe=Dt(),Gt;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(Gt=$e.PROD_TYPE||($e.PROD_TYPE={}));function Jq(t){if(t instanceof Va.Option||t==="Option")return Gt.OPTION;if(t instanceof Va.Repetition||t==="Repetition")return Gt.REPETITION;if(t instanceof Va.RepetitionMandatory||t==="RepetitionMandatory")return Gt.REPETITION_MANDATORY;if(t instanceof Va.RepetitionMandatoryWithSeparator||t==="RepetitionMandatoryWithSeparator")return Gt.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof Va.RepetitionWithSeparator||t==="RepetitionWithSeparator")return Gt.REPETITION_WITH_SEPARATOR;if(t instanceof Va.Alternation||t==="Alternation")return Gt.ALTERNATION;throw Error("non exhaustive match")}$e.getProdType=Jq;function Boe(t){var e=t.occurrence,r=t.rule,n=t.prodType,i=t.maxLookahead,a=Jq(n);return a===Gt.ALTERNATION?tb(e,r,i):rb(e,r,a,i)}$e.getLookaheadPaths=Boe;function Voe(t,e,r,n,i,a){var o=tb(t,e,r),s=nb(o)?sm.tokenStructuredMatcherNoCategories:sm.tokenStructuredMatcher;return a(o,n,s,i)}$e.buildLookaheadFuncForOr=Voe;function zoe(t,e,r,n,i,a){var o=rb(t,e,i,r),s=nb(o)?sm.tokenStructuredMatcherNoCategories:sm.tokenStructuredMatcher;return a(o[0],s,n)}$e.buildLookaheadFuncForOptionalProd=zoe;function Yoe(t,e,r,n){var i=t.length,a=(0,Yo.default)(t,function(u){return(0,Yo.default)(u,function(l){return l.length===1})});if(e)return function(u){for(var l=(0,om.default)(u,function(b){return b.GATE}),c=0;c<i;c++){var p=t[c],h=p.length,R=l[c];if(!(R!==void 0&&R.call(this)===!1))e:for(var y=0;y<h;y++){for(var A=p[y],w=A.length,P=0;P<w;P++){var C=this.LA(P+1);if(r(C,A[P])===!1)continue e}return c}}};if(a&&!n){var o=(0,om.default)(t,function(u){return(0,Yq.default)(u)}),s=(0,Xq.default)(o,function(u,l,c){return(0,zo.default)(l,function(p){(0,Wq.default)(u,p.tokenTypeIdx)||(u[p.tokenTypeIdx]=c),(0,zo.default)(p.categoryMatches,function(h){(0,Wq.default)(u,h)||(u[h]=c)})}),u},{});return function(){var u=this.LA(1);return s[u.tokenTypeIdx]}}else return function(){for(var u=0;u<i;u++){var l=t[u],c=l.length;e:for(var p=0;p<c;p++){for(var h=l[p],R=h.length,y=0;y<R;y++){var A=this.LA(y+1);if(r(A,h[y])===!1)continue e}return u}}}}$e.buildAlternativesLookAheadFunc=Yoe;function Xoe(t,e,r){var n=(0,Yo.default)(t,function(l){return l.length===1}),i=t.length;if(n&&!r){var a=(0,Yq.default)(t);if(a.length===1&&(0,ZR.default)(a[0].categoryMatches)){var o=a[0],s=o.tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===s}}else{var u=(0,Xq.default)(a,function(l,c,p){return l[c.tokenTypeIdx]=!0,(0,zo.default)(c.categoryMatches,function(h){l[h]=!0}),l},[]);return function(){var l=this.LA(1);return u[l.tokenTypeIdx]===!0}}}else return function(){e:for(var l=0;l<i;l++){for(var c=t[l],p=c.length,h=0;h<p;h++){var R=this.LA(h+1);if(e(R,c[h])===!1)continue e}return!0}return!1}}$e.buildSingleAlternativeLookaheadFunction=Xoe;var Joe=function(t){zq(e,t);function e(r,n,i){var a=t.call(this)||this;return a.topProd=r,a.targetOccurrence=n,a.targetProdType=i,a}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.restDef},e.prototype.checkIsTarget=function(r,n,i,a){return r.idx===this.targetOccurrence&&this.targetProdType===n?(this.restDef=i.concat(a),!0):!1},e.prototype.walkOption=function(r,n,i){this.checkIsTarget(r,Gt.OPTION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOne=function(r,n,i){this.checkIsTarget(r,Gt.REPETITION_MANDATORY,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOneSep=function(r,n,i){this.checkIsTarget(r,Gt.REPETITION_MANDATORY_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkMany=function(r,n,i){this.checkIsTarget(r,Gt.REPETITION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkManySep=function(r,n,i){this.checkIsTarget(r,Gt.REPETITION_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e}(Koe.RestWalker),Qq=function(t){zq(e,t);function e(r,n,i){var a=t.call(this)||this;return a.targetOccurrence=r,a.targetProdType=n,a.targetRef=i,a.result=[],a}return e.prototype.checkIsTarget=function(r,n){r.idx===this.targetOccurrence&&this.targetProdType===n&&(this.targetRef===void 0||r===this.targetRef)&&(this.result=r.definition)},e.prototype.visitOption=function(r){this.checkIsTarget(r,Gt.OPTION)},e.prototype.visitRepetition=function(r){this.checkIsTarget(r,Gt.REPETITION)},e.prototype.visitRepetitionMandatory=function(r){this.checkIsTarget(r,Gt.REPETITION_MANDATORY)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.checkIsTarget(r,Gt.REPETITION_MANDATORY_WITH_SEPARATOR)},e.prototype.visitRepetitionWithSeparator=function(r){this.checkIsTarget(r,Gt.REPETITION_WITH_SEPARATOR)},e.prototype.visitAlternation=function(r){this.checkIsTarget(r,Gt.ALTERNATION)},e}(Woe.GAstVisitor);function Vq(t){for(var e=new Array(t),r=0;r<t;r++)e[r]=[];return e}function QR(t){for(var e=[""],r=0;r<t.length;r++){for(var n=t[r],i=[],a=0;a<e.length;a++){var o=e[a];i.push(o+"_"+n.tokenTypeIdx);for(var s=0;s<n.categoryMatches.length;s++){var u="_"+n.categoryMatches[s];i.push(o+u)}}e=i}return e}function Qoe(t,e,r){for(var n=0;n<t.length;n++)if(n!==r)for(var i=t[n],a=0;a<e.length;a++){var o=e[a];if(i[o]===!0)return!1}return!0}function eb(t,e){for(var r=(0,om.default)(t,function(c){return(0,Bq.possiblePathsFrom)([c],1)}),n=Vq(r.length),i=(0,om.default)(r,function(c){var p={};return(0,zo.default)(c,function(h){var R=QR(h.partialPath);(0,zo.default)(R,function(y){p[y]=!0})}),p}),a=r,o=1;o<=e;o++){var s=a;a=Vq(s.length);for(var u=function(c){for(var p=s[c],h=0;h<p.length;h++){var R=p[h].partialPath,y=p[h].suffixDef,A=QR(R),w=Qoe(i,A,c);if(w||(0,ZR.default)(y)||R.length===e){var P=n[c];if(Zq(P,R)===!1){P.push(R);for(var C=0;C<A.length;C++){var b=A[C];i[c][b]=!0}}}else{var x=(0,Bq.possiblePathsFrom)(y,o+1,R);a[c]=a[c].concat(x),(0,zo.default)(x,function(G){var Y=QR(G.partialPath);(0,zo.default)(Y,function(ce){i[c][ce]=!0})})}}},l=0;l<s.length;l++)u(l)}return n}$e.lookAheadSequenceFromAlternatives=eb;function tb(t,e,r,n){var i=new Qq(t,Gt.ALTERNATION,n);return e.accept(i),eb(i.result,r)}$e.getLookaheadPathsForOr=tb;function rb(t,e,r,n){var i=new Qq(t,r);e.accept(i);var a=i.result,o=new Joe(e,t,r),s=o.startWalking(),u=new Va.Alternative({definition:a}),l=new Va.Alternative({definition:s});return eb([u,l],n)}$e.getLookaheadPathsForOptionalProd=rb;function Zq(t,e){e:for(var r=0;r<t.length;r++){var n=t[r];if(n.length===e.length){for(var i=0;i<n.length;i++){var a=e[i],o=n[i],s=a===o||o.categoryMatchesMap[a.tokenTypeIdx]!==void 0;if(s===!1)continue e}return!0}}return!1}$e.containsPath=Zq;function Zoe(t,e){return t.length<e.length&&(0,Yo.default)(t,function(r,n){var i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}$e.isStrictPrefixOfPath=Zoe;function nb(t){return(0,Yo.default)(t,function(e){return(0,Yo.default)(e,function(r){return(0,Yo.default)(r,function(n){return(0,ZR.default)(n.categoryMatches)})})})}$e.areTokenCategoriesNotUsed=nb});var vc=d(Pe=>{"use strict";var ab=Pe&&Pe.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),ib=Pe&&Pe.__assign||function(){return ib=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},ib.apply(this,arguments)},tr=Pe&&Pe.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Pe,"__esModule",{value:!0});Pe.checkPrefixAlternativesAmbiguities=Pe.validateSomeNonEmptyLookaheadPath=Pe.validateTooManyAlts=Pe.RepetitionCollector=Pe.validateAmbiguousAlternationAlternatives=Pe.validateEmptyOrAlternative=Pe.getFirstNoneTerminal=Pe.validateNoLeftRecursion=Pe.validateRuleIsOverridden=Pe.validateRuleDoesNotAlreadyExist=Pe.OccurrenceValidationCollector=Pe.identifyProductionForDuplicates=Pe.validateGrammar=Pe.validateLookahead=void 0;var eM=tr(yu()),um=tr(tn()),ese=tr(Pp()),tM=tr(Qn()),tse=tr(cc()),rse=tr(Gp()),nse=tr(Up()),za=tr(Zt()),gc=tr(er()),ise=tr(JR()),ob=tr(na()),ase=tr(hR()),ose=tr(mi()),sb=tr(ra()),ca=tr(rm()),sse=tr(ea()),ti=Br(),ub=Dt(),Su=bu(),use=hc(),ei=Dt(),lb=Dt(),lse=tr(nm()),cse=tr(lc()),fse=Ho();function dse(t){var e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return(0,za.default)(e,function(r){return ib({type:ti.ParserDefinitionErrorType.CUSTOM_LOOKAHEAD_VALIDATION},r)})}Pe.validateLookahead=dse;function pse(t,e,r,n){var i=(0,ca.default)(t,function(u){return mse(u,r)}),a=_se(t,e,r),o=(0,ca.default)(t,function(u){return uM(u,r)}),s=(0,ca.default)(t,function(u){return aM(u,t,n,r)});return i.concat(a,o,s)}Pe.validateGrammar=pse;function mse(t,e){var r=new iM;t.accept(r);var n=r.allProductions,i=(0,ise.default)(n,rM),a=(0,ase.default)(i,function(s){return s.length>1}),o=(0,za.default)((0,ose.default)(a),function(s){var u=(0,eM.default)(s),l=e.buildDuplicateFoundError(t,s),c=(0,ub.getProductionDslName)(u),p={message:l,type:ti.ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:c,occurrence:u.idx},h=nM(u);return h&&(p.parameter=h),p});return o}function rM(t){return"".concat((0,ub.getProductionDslName)(t),"_#_").concat(t.idx,"_#_").concat(nM(t))}Pe.identifyProductionForDuplicates=rM;function nM(t){return t instanceof ei.Terminal?t.terminalType.name:t instanceof ei.NonTerminal?t.nonTerminalName:""}var iM=function(t){ab(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitNonTerminal=function(r){this.allProductions.push(r)},e.prototype.visitOption=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e.prototype.visitAlternation=function(r){this.allProductions.push(r)},e.prototype.visitTerminal=function(r){this.allProductions.push(r)},e}(lb.GAstVisitor);Pe.OccurrenceValidationCollector=iM;function aM(t,e,r,n){var i=[],a=(0,ob.default)(e,function(s,u){return u.name===t.name?s+1:s},0);if(a>1){var o=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:o,type:ti.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}Pe.validateRuleDoesNotAlreadyExist=aM;function hse(t,e,r){var n=[],i;return(0,sb.default)(e,t)||(i="Invalid rule override, rule: ->".concat(t,"<- cannot be overridden in the grammar: ->").concat(r,"<-")+"as it is not defined in any of the super grammars ",n.push({message:i,type:ti.ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,ruleName:t})),n}Pe.validateRuleIsOverridden=hse;function oM(t,e,r,n){n===void 0&&(n=[]);var i=[],a=yc(e.definition);if((0,um.default)(a))return[];var o=t.name,s=(0,sb.default)(a,t);s&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:ti.ParserDefinitionErrorType.LEFT_RECURSION,ruleName:o});var u=(0,nse.default)(a,n.concat([t])),l=(0,ca.default)(u,function(c){var p=(0,sse.default)(n);return p.push(c),oM(t,c,r,p)});return i.concat(l)}Pe.validateNoLeftRecursion=oM;function yc(t){var e=[];if((0,um.default)(t))return e;var r=(0,eM.default)(t);if(r instanceof ei.NonTerminal)e.push(r.referencedRule);else if(r instanceof ei.Alternative||r instanceof ei.Option||r instanceof ei.RepetitionMandatory||r instanceof ei.RepetitionMandatoryWithSeparator||r instanceof ei.RepetitionWithSeparator||r instanceof ei.Repetition)e=e.concat(yc(r.definition));else if(r instanceof ei.Alternation)e=(0,tM.default)((0,za.default)(r.definition,function(o){return yc(o.definition)}));else if(!(r instanceof ei.Terminal))throw Error("non exhaustive match");var n=(0,ub.isOptionalProd)(r),i=t.length>1;if(n&&i){var a=(0,ese.default)(t);return e.concat(yc(a))}else return e}Pe.getFirstNoneTerminal=yc;var cb=function(t){ab(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.alternations=[],r}return e.prototype.visitAlternation=function(r){this.alternations.push(r)},e}(lb.GAstVisitor);function yse(t,e){var r=new cb;t.accept(r);var n=r.alternations,i=(0,ca.default)(n,function(a){var o=(0,lse.default)(a.definition);return(0,ca.default)(o,function(s,u){var l=(0,use.nextPossibleTokensAfter)([s],[],fse.tokenStructuredMatcher,1);return(0,um.default)(l)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:a,emptyChoiceIdx:u}),type:ti.ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:a.idx,alternative:u+1}]:[]})});return i}Pe.validateEmptyOrAlternative=yse;function gse(t,e,r){var n=new cb;t.accept(n);var i=n.alternations;i=(0,rse.default)(i,function(o){return o.ignoreAmbiguities===!0});var a=(0,ca.default)(i,function(o){var s=o.idx,u=o.maxLookahead||e,l=(0,Su.getLookaheadPathsForOr)(s,t,u,o),c=Tse(l,o,t,r),p=lM(l,o,t,r);return c.concat(p)});return a}Pe.validateAmbiguousAlternationAlternatives=gse;var sM=function(t){ab(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e}(lb.GAstVisitor);Pe.RepetitionCollector=sM;function uM(t,e){var r=new cb;t.accept(r);var n=r.alternations,i=(0,ca.default)(n,function(a){return a.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:a}),type:ti.ParserDefinitionErrorType.TOO_MANY_ALTS,ruleName:t.name,occurrence:a.idx}]:[]});return i}Pe.validateTooManyAlts=uM;function vse(t,e,r){var n=[];return(0,gc.default)(t,function(i){var a=new sM;i.accept(a);var o=a.allProductions;(0,gc.default)(o,function(s){var u=(0,Su.getProdType)(s),l=s.maxLookahead||e,c=s.idx,p=(0,Su.getLookaheadPathsForOptionalProd)(c,i,u,l),h=p[0];if((0,um.default)((0,tM.default)(h))){var R=r.buildEmptyRepetitionError({topLevelRule:i,repetition:s});n.push({message:R,type:ti.ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}Pe.validateSomeNonEmptyLookaheadPath=vse;function Tse(t,e,r,n){var i=[],a=(0,ob.default)(t,function(s,u,l){return e.definition[l].ignoreAmbiguities===!0||(0,gc.default)(u,function(c){var p=[l];(0,gc.default)(t,function(h,R){l!==R&&(0,Su.containsPath)(h,c)&&e.definition[R].ignoreAmbiguities!==!0&&p.push(R)}),p.length>1&&!(0,Su.containsPath)(i,c)&&(i.push(c),s.push({alts:p,path:c}))}),s},[]),o=(0,za.default)(a,function(s){var u=(0,za.default)(s.alts,function(c){return c+1}),l=n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:u,prefixPath:s.path});return{message:l,type:ti.ParserDefinitionErrorType.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:s.alts}});return o}function lM(t,e,r,n){var i=(0,ob.default)(t,function(o,s,u){var l=(0,za.default)(s,function(c){return{idx:u,path:c}});return o.concat(l)},[]),a=(0,cse.default)((0,ca.default)(i,function(o){var s=e.definition[o.idx];if(s.ignoreAmbiguities===!0)return[];var u=o.idx,l=o.path,c=(0,tse.default)(i,function(h){return e.definition[h.idx].ignoreAmbiguities!==!0&&h.idx<u&&(0,Su.isStrictPrefixOfPath)(h.path,l)}),p=(0,za.default)(c,function(h){var R=[h.idx+1,u+1],y=e.idx===0?"":e.idx,A=n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:R,prefixPath:h.path});return{message:A,type:ti.ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:y,alternatives:R}});return p}));return a}Pe.checkPrefixAlternativesAmbiguities=lM;function _se(t,e,r){var n=[],i=(0,za.default)(e,function(a){return a.name});return(0,gc.default)(t,function(a){var o=a.name;if((0,sb.default)(i,o)){var s=r.buildNamespaceConflictError(a);n.push({message:s,type:ti.ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:o})}}),n}});var pM=d(Ya=>{"use strict";var cM=Ya&&Ya.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ya,"__esModule",{value:!0});Ya.validateGrammar=Ya.resolveGrammar=void 0;var Rse=cM(er()),fM=cM(wR()),bse=Dq(),Sse=vc(),dM=Ru();function Cse(t){var e=(0,fM.default)(t,{errMsgProvider:dM.defaultGrammarResolverErrorProvider}),r={};return(0,Rse.default)(t.rules,function(n){r[n.name]=n}),(0,bse.resolveGrammar)(r,e.errMsgProvider)}Ya.resolveGrammar=Cse;function Ase(t){return t=(0,fM.default)(t,{errMsgProvider:dM.defaultGrammarValidatorErrorProvider}),(0,Sse.validateGrammar)(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}Ya.validateGrammar=Ase});var Cu=d(Rr=>{"use strict";var Tc=Rr&&Rr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ese=Rr&&Rr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Rr,"__esModule",{value:!0});Rr.EarlyExitException=Rr.NotAllInputParsedException=Rr.NoViableAltException=Rr.MismatchedTokenException=Rr.isRecognitionException=void 0;var Pse=Ese(ra()),mM="MismatchedTokenException",hM="NoViableAltException",yM="EarlyExitException",gM="NotAllInputParsedException",vM=[mM,hM,yM,gM];Object.freeze(vM);function kse(t){return(0,Pse.default)(vM,t.name)}Rr.isRecognitionException=kse;var lm=function(t){Tc(e,t);function e(r,n){var i=this.constructor,a=t.call(this,r)||this;return a.token=n,a.resyncedTokens=[],Object.setPrototypeOf(a,i.prototype),Error.captureStackTrace&&Error.captureStackTrace(a,a.constructor),a}return e}(Error),wse=function(t){Tc(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=mM,a}return e}(lm);Rr.MismatchedTokenException=wse;var Nse=function(t){Tc(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=hM,a}return e}(lm);Rr.NoViableAltException=Nse;var Dse=function(t){Tc(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.name=gM,i}return e}(lm);Rr.NotAllInputParsedException=Dse;var $se=function(t){Tc(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=yM,a}return e}(lm);Rr.EarlyExitException=$se});var db=d(Ut=>{"use strict";var Ose=Ut&&Ut.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Xa=Ut&&Ut.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ut,"__esModule",{value:!0});Ut.attemptInRepetitionRecovery=Ut.Recoverable=Ut.InRuleRecoveryException=Ut.IN_RULE_RECOVERY_EXCEPTION=Ut.EOF_FOLLOW_KEY=void 0;var _c=Ko(),Ise=Xa(tn()),TM=Xa(nm()),xse=Xa(Qn()),fb=Xa(Zt()),_M=Xa(Hp()),Lse=Xa(nn()),qse=Xa(ra()),Mse=Xa(ea()),Fse=Cu(),jse=PR(),Gse=Br();Ut.EOF_FOLLOW_KEY={};Ut.IN_RULE_RECOVERY_EXCEPTION="InRuleRecoveryException";var RM=function(t){Ose(e,t);function e(r){var n=t.call(this,r)||this;return n.name=Ut.IN_RULE_RECOVERY_EXCEPTION,n}return e}(Error);Ut.InRuleRecoveryException=RM;var Use=function(){function t(){}return t.prototype.initRecoverable=function(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=(0,Lse.default)(e,"recoveryEnabled")?e.recoveryEnabled:Gse.DEFAULT_PARSER_CONFIG.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=bM)},t.prototype.getTokenToInsert=function(e){var r=(0,_c.createTokenInstance)(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r},t.prototype.canTokenTypeBeInsertedInRecovery=function(e){return!0},t.prototype.canTokenTypeBeDeletedInRecovery=function(e){return!0},t.prototype.tryInRepetitionRecovery=function(e,r,n,i){for(var a=this,o=this.findReSyncTokenType(),s=this.exportLexerState(),u=[],l=!1,c=this.LA(1),p=this.LA(1),h=function(){var R=a.LA(0),y=a.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:c,previous:R,ruleName:a.getCurrRuleFullName()}),A=new Fse.MismatchedTokenException(y,c,a.LA(0));A.resyncedTokens=(0,TM.default)(u),a.SAVE_ERROR(A)};!l;)if(this.tokenMatcher(p,i)){h();return}else if(n.call(this)){h(),e.apply(this,r);return}else this.tokenMatcher(p,o)?l=!0:(p=this.SKIP_TOKEN(),this.addToResyncTokens(p,u));this.importLexerState(s)},t.prototype.shouldInRepetitionRecoveryBeTried=function(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))},t.prototype.getFollowsForInRuleRecovery=function(e,r){var n=this.getCurrentGrammarPath(e,r),i=this.getNextPossibleTokenTypes(n);return i},t.prototype.tryInRuleRecovery=function(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r)){var n=this.getTokenToInsert(e);return n}if(this.canRecoverWithSingleTokenDeletion(e)){var i=this.SKIP_TOKEN();return this.consumeToken(),i}throw new RM("sad sad panda")},t.prototype.canPerformInRuleRecovery=function(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)},t.prototype.canRecoverWithSingleTokenInsertion=function(e,r){var n=this;if(!this.canTokenTypeBeInsertedInRecovery(e)||(0,Ise.default)(r))return!1;var i=this.LA(1),a=(0,_M.default)(r,function(o){return n.tokenMatcher(i,o)})!==void 0;return a},t.prototype.canRecoverWithSingleTokenDeletion=function(e){if(!this.canTokenTypeBeDeletedInRecovery(e))return!1;var r=this.tokenMatcher(this.LA(2),e);return r},t.prototype.isInCurrentRuleReSyncSet=function(e){var r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return(0,qse.default)(n,e)},t.prototype.findReSyncTokenType=function(){for(var e=this.flattenFollowSet(),r=this.LA(1),n=2;;){var i=(0,_M.default)(e,function(a){var o=(0,_c.tokenMatcher)(r,a);return o});if(i!==void 0)return i;r=this.LA(n),n++}},t.prototype.getCurrFollowKey=function(){if(this.RULE_STACK.length===1)return Ut.EOF_FOLLOW_KEY;var e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}},t.prototype.buildFullFollowKeyStack=function(){var e=this,r=this.RULE_STACK,n=this.RULE_OCCURRENCE_STACK;return(0,fb.default)(r,function(i,a){return a===0?Ut.EOF_FOLLOW_KEY:{ruleName:e.shortRuleNameToFullName(i),idxInCallingRule:n[a],inRule:e.shortRuleNameToFullName(r[a-1])}})},t.prototype.flattenFollowSet=function(){var e=this,r=(0,fb.default)(this.buildFullFollowKeyStack(),function(n){return e.getFollowSetFromFollowKey(n)});return(0,xse.default)(r)},t.prototype.getFollowSetFromFollowKey=function(e){if(e===Ut.EOF_FOLLOW_KEY)return[_c.EOF];var r=e.ruleName+e.idxInCallingRule+jse.IN+e.inRule;return this.resyncFollows[r]},t.prototype.addToResyncTokens=function(e,r){return this.tokenMatcher(e,_c.EOF)||r.push(e),r},t.prototype.reSyncTo=function(e){for(var r=[],n=this.LA(1);this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return(0,TM.default)(r)},t.prototype.attemptInRepetitionRecovery=function(e,r,n,i,a,o,s){},t.prototype.getCurrentGrammarPath=function(e,r){var n=this.getHumanReadableRuleStack(),i=(0,Mse.default)(this.RULE_OCCURRENCE_STACK),a={ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r};return a},t.prototype.getHumanReadableRuleStack=function(){var e=this;return(0,fb.default)(this.RULE_STACK,function(r){return e.shortRuleNameToFullName(r)})},t}();Ut.Recoverable=Use;function bM(t,e,r,n,i,a,o){var s=this.getKeyForAutomaticLookahead(n,i),u=this.firstAfterRepMap[s];if(u===void 0){var l=this.getCurrRuleFullName(),c=this.getGAstProductions()[l],p=new a(c,i);u=p.startWalking(),this.firstAfterRepMap[s]=u}var h=u.token,R=u.occurrence,y=u.isEndOfRule;this.RULE_STACK.length===1&&y&&h===void 0&&(h=_c.EOF,R=1),!(h===void 0||R===void 0)&&this.shouldInRepetitionRecoveryBeTried(h,R,o)&&this.tryInRepetitionRecovery(t,e,r,h)}Ut.attemptInRepetitionRecovery=bM});var cm=d(Me=>{"use strict";Object.defineProperty(Me,"__esModule",{value:!0});Me.getKeyForAutomaticLookahead=Me.AT_LEAST_ONE_SEP_IDX=Me.MANY_SEP_IDX=Me.AT_LEAST_ONE_IDX=Me.MANY_IDX=Me.OPTION_IDX=Me.OR_IDX=Me.BITS_FOR_ALT_IDX=Me.BITS_FOR_RULE_IDX=Me.BITS_FOR_OCCURRENCE_IDX=Me.BITS_FOR_METHOD_TYPE=void 0;Me.BITS_FOR_METHOD_TYPE=4;Me.BITS_FOR_OCCURRENCE_IDX=8;Me.BITS_FOR_RULE_IDX=12;Me.BITS_FOR_ALT_IDX=8;Me.OR_IDX=1<<Me.BITS_FOR_OCCURRENCE_IDX;Me.OPTION_IDX=2<<Me.BITS_FOR_OCCURRENCE_IDX;Me.MANY_IDX=3<<Me.BITS_FOR_OCCURRENCE_IDX;Me.AT_LEAST_ONE_IDX=4<<Me.BITS_FOR_OCCURRENCE_IDX;Me.MANY_SEP_IDX=5<<Me.BITS_FOR_OCCURRENCE_IDX;Me.AT_LEAST_ONE_SEP_IDX=6<<Me.BITS_FOR_OCCURRENCE_IDX;function Hse(t,e,r){return r|e|t}Me.getKeyForAutomaticLookahead=Hse;var ZSe=32-Me.BITS_FOR_ALT_IDX});var mb=d(Ja=>{"use strict";var fm=Ja&&Ja.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))},SM=Ja&&Ja.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ja,"__esModule",{value:!0});Ja.LLkLookaheadStrategy=void 0;var pb=SM(rm()),Kse=SM(tn()),dm=Ru(),Wse=Br(),pm=vc(),Rc=bu(),Bse=function(){function t(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:Wse.DEFAULT_PARSER_CONFIG.maxLookahead}return t.prototype.validate=function(e){var r=this.validateNoLeftRecursion(e.rules);if((0,Kse.default)(r)){var n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),a=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead),o=fm(fm(fm(fm([],r,!0),n,!0),i,!0),a,!0);return o}return r},t.prototype.validateNoLeftRecursion=function(e){return(0,pb.default)(e,function(r){return(0,pm.validateNoLeftRecursion)(r,r,dm.defaultGrammarValidatorErrorProvider)})},t.prototype.validateEmptyOrAlternatives=function(e){return(0,pb.default)(e,function(r){return(0,pm.validateEmptyOrAlternative)(r,dm.defaultGrammarValidatorErrorProvider)})},t.prototype.validateAmbiguousAlternationAlternatives=function(e,r){return(0,pb.default)(e,function(n){return(0,pm.validateAmbiguousAlternationAlternatives)(n,r,dm.defaultGrammarValidatorErrorProvider)})},t.prototype.validateSomeNonEmptyLookaheadPath=function(e,r){return(0,pm.validateSomeNonEmptyLookaheadPath)(e,r,dm.defaultGrammarValidatorErrorProvider)},t.prototype.buildLookaheadForAlternation=function(e){return(0,Rc.buildLookaheadFuncForOr)(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,Rc.buildAlternativesLookAheadFunc)},t.prototype.buildLookaheadForOptional=function(e){return(0,Rc.buildLookaheadFuncForOptionalProd)(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,(0,Rc.getProdType)(e.prodType),Rc.buildSingleAlternativeLookaheadFunction)},t}();Ja.LLkLookaheadStrategy=Bse});var PM=d(Si=>{"use strict";var Vse=Si&&Si.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),AM=Si&&Si.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Si,"__esModule",{value:!0});Si.collectMethods=Si.LooksAhead=void 0;var Jo=AM(er()),hb=AM(nn()),CM=Br(),fa=cm(),zse=Dt(),Au=Dt(),Yse=mb(),Xse=function(){function t(){}return t.prototype.initLooksAhead=function(e){this.dynamicTokensEnabled=(0,hb.default)(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:CM.DEFAULT_PARSER_CONFIG.dynamicTokensEnabled,this.maxLookahead=(0,hb.default)(e,"maxLookahead")?e.maxLookahead:CM.DEFAULT_PARSER_CONFIG.maxLookahead,this.lookaheadStrategy=(0,hb.default)(e,"lookaheadStrategy")?e.lookaheadStrategy:new Yse.LLkLookaheadStrategy({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map},t.prototype.preComputeLookaheadFunctions=function(e){var r=this;(0,Jo.default)(e,function(n){r.TRACE_INIT("".concat(n.name," Rule Lookahead"),function(){var i=EM(n),a=i.alternation,o=i.repetition,s=i.option,u=i.repetitionMandatory,l=i.repetitionMandatoryWithSeparator,c=i.repetitionWithSeparator;(0,Jo.default)(a,function(p){var h=p.idx===0?"":p.idx;r.TRACE_INIT("".concat((0,Au.getProductionDslName)(p)).concat(h),function(){var R=r.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:p.idx,rule:n,maxLookahead:p.maxLookahead||r.maxLookahead,hasPredicates:p.hasPredicates,dynamicTokensEnabled:r.dynamicTokensEnabled}),y=(0,fa.getKeyForAutomaticLookahead)(r.fullRuleNameToShort[n.name],fa.OR_IDX,p.idx);r.setLaFuncCache(y,R)})}),(0,Jo.default)(o,function(p){r.computeLookaheadFunc(n,p.idx,fa.MANY_IDX,"Repetition",p.maxLookahead,(0,Au.getProductionDslName)(p))}),(0,Jo.default)(s,function(p){r.computeLookaheadFunc(n,p.idx,fa.OPTION_IDX,"Option",p.maxLookahead,(0,Au.getProductionDslName)(p))}),(0,Jo.default)(u,function(p){r.computeLookaheadFunc(n,p.idx,fa.AT_LEAST_ONE_IDX,"RepetitionMandatory",p.maxLookahead,(0,Au.getProductionDslName)(p))}),(0,Jo.default)(l,function(p){r.computeLookaheadFunc(n,p.idx,fa.AT_LEAST_ONE_SEP_IDX,"RepetitionMandatoryWithSeparator",p.maxLookahead,(0,Au.getProductionDslName)(p))}),(0,Jo.default)(c,function(p){r.computeLookaheadFunc(n,p.idx,fa.MANY_SEP_IDX,"RepetitionWithSeparator",p.maxLookahead,(0,Au.getProductionDslName)(p))})})})},t.prototype.computeLookaheadFunc=function(e,r,n,i,a,o){var s=this;this.TRACE_INIT("".concat(o).concat(r===0?"":r),function(){var u=s.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:a||s.maxLookahead,dynamicTokensEnabled:s.dynamicTokensEnabled,prodType:i}),l=(0,fa.getKeyForAutomaticLookahead)(s.fullRuleNameToShort[e.name],n,r);s.setLaFuncCache(l,u)})},t.prototype.getKeyForAutomaticLookahead=function(e,r){var n=this.getLastExplicitRuleShortName();return(0,fa.getKeyForAutomaticLookahead)(n,e,r)},t.prototype.getLaFuncFromCache=function(e){return this.lookAheadFuncsCache.get(e)},t.prototype.setLaFuncCache=function(e,r){this.lookAheadFuncsCache.set(e,r)},t}();Si.LooksAhead=Xse;var Jse=function(t){Vse(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]},r}return e.prototype.reset=function(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}},e.prototype.visitOption=function(r){this.dslMethods.option.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.dslMethods.repetitionWithSeparator.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.dslMethods.repetitionMandatory.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.dslMethods.repetitionMandatoryWithSeparator.push(r)},e.prototype.visitRepetition=function(r){this.dslMethods.repetition.push(r)},e.prototype.visitAlternation=function(r){this.dslMethods.alternation.push(r)},e}(zse.GAstVisitor),mm=new Jse;function EM(t){mm.reset(),t.accept(mm);var e=mm.dslMethods;return mm.reset(),e}Si.collectMethods=EM});var kM=d(Ci=>{"use strict";Object.defineProperty(Ci,"__esModule",{value:!0});Ci.addNoneTerminalToCst=Ci.addTerminalToCst=Ci.setNodeLocationFull=Ci.setNodeLocationOnlyOffset=void 0;function Qse(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}Ci.setNodeLocationOnlyOffset=Qse;function Zse(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}Ci.setNodeLocationFull=Zse;function eue(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}Ci.addTerminalToCst=eue;function tue(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}Ci.addNoneTerminalToCst=tue});var wM=d(hm=>{"use strict";Object.defineProperty(hm,"__esModule",{value:!0});hm.defineNameProp=void 0;var rue="name";function nue(t,e){Object.defineProperty(t,rue,{enumerable:!1,configurable:!0,writable:!1,value:e})}hm.defineNameProp=nue});var LM=d(cr=>{"use strict";var da=cr&&cr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(cr,"__esModule",{value:!0});cr.validateMissingCstMethods=cr.validateVisitor=cr.CstVisitorDefinitionError=cr.createBaseVisitorConstructorWithDefaults=cr.createBaseSemanticVisitorConstructor=cr.defaultVisit=void 0;var iue=da(tn()),aue=da(lc()),oue=da(Ve()),NM=da(Zt()),sue=da(er()),uue=da(cc()),lue=da(rn()),cue=da(Ys()),fue=da(jo()),DM=wM();function $M(t,e){for(var r=(0,lue.default)(t),n=r.length,i=0;i<n;i++)for(var a=r[i],o=t[a],s=o.length,u=0;u<s;u++){var l=o[u];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}cr.defaultVisit=$M;function due(t,e){var r=function(){};(0,DM.defineNameProp)(r,t+"BaseSemantics");var n={visit:function(i,a){if((0,oue.default)(i)&&(i=i[0]),!(0,fue.default)(i))return this[i.name](i.children,a)},validateVisitor:function(){var i=IM(this,e);if(!(0,iue.default)(i)){var a=(0,NM.default)(i,function(o){return o.msg});throw Error("Errors Detected in CST Visitor <".concat(this.constructor.name,`>:
	`)+"".concat(a.join(`

`).replace(/\n/g,`
	`)))}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}cr.createBaseSemanticVisitorConstructor=due;function pue(t,e,r){var n=function(){};(0,DM.defineNameProp)(n,t+"BaseSemanticsWithDefaults");var i=Object.create(r.prototype);return(0,sue.default)(e,function(a){i[a]=$M}),n.prototype=i,n.prototype.constructor=n,n}cr.createBaseVisitorConstructorWithDefaults=pue;var OM;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(OM=cr.CstVisitorDefinitionError||(cr.CstVisitorDefinitionError={}));function IM(t,e){var r=xM(t,e);return r}cr.validateVisitor=IM;function xM(t,e){var r=(0,uue.default)(e,function(i){return(0,cue.default)(t[i])===!1}),n=(0,NM.default)(r,function(i){return{msg:"Missing visitor method: <".concat(i,"> on ").concat(t.constructor.name," CST Visitor."),type:OM.MISSING_METHOD,methodName:i}});return(0,aue.default)(n)}cr.validateMissingCstMethods=xM});var jM=d(Pu=>{"use strict";var ym=Pu&&Pu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Pu,"__esModule",{value:!0});Pu.TreeBuilder=void 0;var Eu=kM(),$r=ym(qp()),mue=ym(nn()),qM=ym(rn()),MM=ym(jo()),FM=LM(),hue=Br(),yue=function(){function t(){}return t.prototype.initTreeBuilder=function(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=(0,mue.default)(e,"nodeLocationTracking")?e.nodeLocationTracking:hue.DEFAULT_PARSER_CONFIG.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=$r.default,this.cstFinallyStateUpdate=$r.default,this.cstPostTerminal=$r.default,this.cstPostNonTerminal=$r.default,this.cstPostRule=$r.default;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Eu.setNodeLocationFull,this.setNodeLocationFromNode=Eu.setNodeLocationFull,this.cstPostRule=$r.default,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=$r.default,this.setNodeLocationFromNode=$r.default,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Eu.setNodeLocationOnlyOffset,this.setNodeLocationFromNode=Eu.setNodeLocationOnlyOffset,this.cstPostRule=$r.default,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=$r.default,this.setNodeLocationFromNode=$r.default,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=$r.default,this.setNodeLocationFromNode=$r.default,this.cstPostRule=$r.default,this.setInitialNodeLocation=$r.default;else throw Error('Invalid <nodeLocationTracking> config option: "'.concat(e.nodeLocationTracking,'"'))},t.prototype.setInitialNodeLocationOnlyOffsetRecovery=function(e){e.location={startOffset:NaN,endOffset:NaN}},t.prototype.setInitialNodeLocationOnlyOffsetRegular=function(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}},t.prototype.setInitialNodeLocationFullRecovery=function(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.setInitialNodeLocationFullRegular=function(e){var r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.cstInvocationStateUpdate=function(e){var r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)},t.prototype.cstFinallyStateUpdate=function(){this.CST_STACK.pop()},t.prototype.cstPostRuleFull=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)},t.prototype.cstPostRuleOnlyOffset=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN},t.prototype.cstPostTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,Eu.addTerminalToCst)(n,r,e),this.setNodeLocationFromToken(n.location,r)},t.prototype.cstPostNonTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,Eu.addNoneTerminalToCst)(n,r,e),this.setNodeLocationFromNode(n.location,e.location)},t.prototype.getBaseCstVisitorConstructor=function(){if((0,MM.default)(this.baseCstVisitorConstructor)){var e=(0,FM.createBaseSemanticVisitorConstructor)(this.className,(0,qM.default)(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor},t.prototype.getBaseCstVisitorConstructorWithDefaults=function(){if((0,MM.default)(this.baseCstVisitorWithDefaultsConstructor)){var e=(0,FM.createBaseVisitorConstructorWithDefaults)(this.className,(0,qM.default)(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor},t.prototype.getLastExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-1]},t.prototype.getPreviousExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-2]},t.prototype.getLastExplicitRuleOccurrenceIndex=function(){var e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]},t}();Pu.TreeBuilder=yue});var UM=d(gm=>{"use strict";Object.defineProperty(gm,"__esModule",{value:!0});gm.LexerAdapter=void 0;var GM=Br(),gue=function(){function t(){}return t.prototype.initLexerAdapter=function(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1},Object.defineProperty(t.prototype,"input",{get:function(){return this.tokVector},set:function(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length},enumerable:!1,configurable:!0}),t.prototype.SKIP_TOKEN=function(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):GM.END_OF_FILE},t.prototype.LA=function(e){var r=this.currIdx+e;return r<0||this.tokVectorLength<=r?GM.END_OF_FILE:this.tokVector[r]},t.prototype.consumeToken=function(){this.currIdx++},t.prototype.exportLexerState=function(){return this.currIdx},t.prototype.importLexerState=function(e){this.currIdx=e},t.prototype.resetLexerState=function(){this.currIdx=-1},t.prototype.moveToTerminatedState=function(){this.currIdx=this.tokVector.length-1},t.prototype.getLexerPosition=function(){return this.exportLexerState()},t}();gm.LexerAdapter=gue});var KM=d(ku=>{"use strict";var HM=ku&&ku.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ku,"__esModule",{value:!0});ku.RecognizerApi=void 0;var vue=HM(mi()),Tue=HM(ra()),_ue=Cu(),yb=Br(),Rue=Ru(),bue=vc(),Sue=Dt(),Cue=function(){function t(){}return t.prototype.ACTION=function(e){return e.call(this)},t.prototype.consume=function(e,r,n){return this.consumeInternal(r,e,n)},t.prototype.subrule=function(e,r,n){return this.subruleInternal(r,e,n)},t.prototype.option=function(e,r){return this.optionInternal(r,e)},t.prototype.or=function(e,r){return this.orInternal(r,e)},t.prototype.many=function(e,r){return this.manyInternal(e,r)},t.prototype.atLeastOne=function(e,r){return this.atLeastOneInternal(e,r)},t.prototype.CONSUME=function(e,r){return this.consumeInternal(e,0,r)},t.prototype.CONSUME1=function(e,r){return this.consumeInternal(e,1,r)},t.prototype.CONSUME2=function(e,r){return this.consumeInternal(e,2,r)},t.prototype.CONSUME3=function(e,r){return this.consumeInternal(e,3,r)},t.prototype.CONSUME4=function(e,r){return this.consumeInternal(e,4,r)},t.prototype.CONSUME5=function(e,r){return this.consumeInternal(e,5,r)},t.prototype.CONSUME6=function(e,r){return this.consumeInternal(e,6,r)},t.prototype.CONSUME7=function(e,r){return this.consumeInternal(e,7,r)},t.prototype.CONSUME8=function(e,r){return this.consumeInternal(e,8,r)},t.prototype.CONSUME9=function(e,r){return this.consumeInternal(e,9,r)},t.prototype.SUBRULE=function(e,r){return this.subruleInternal(e,0,r)},t.prototype.SUBRULE1=function(e,r){return this.subruleInternal(e,1,r)},t.prototype.SUBRULE2=function(e,r){return this.subruleInternal(e,2,r)},t.prototype.SUBRULE3=function(e,r){return this.subruleInternal(e,3,r)},t.prototype.SUBRULE4=function(e,r){return this.subruleInternal(e,4,r)},t.prototype.SUBRULE5=function(e,r){return this.subruleInternal(e,5,r)},t.prototype.SUBRULE6=function(e,r){return this.subruleInternal(e,6,r)},t.prototype.SUBRULE7=function(e,r){return this.subruleInternal(e,7,r)},t.prototype.SUBRULE8=function(e,r){return this.subruleInternal(e,8,r)},t.prototype.SUBRULE9=function(e,r){return this.subruleInternal(e,9,r)},t.prototype.OPTION=function(e){return this.optionInternal(e,0)},t.prototype.OPTION1=function(e){return this.optionInternal(e,1)},t.prototype.OPTION2=function(e){return this.optionInternal(e,2)},t.prototype.OPTION3=function(e){return this.optionInternal(e,3)},t.prototype.OPTION4=function(e){return this.optionInternal(e,4)},t.prototype.OPTION5=function(e){return this.optionInternal(e,5)},t.prototype.OPTION6=function(e){return this.optionInternal(e,6)},t.prototype.OPTION7=function(e){return this.optionInternal(e,7)},t.prototype.OPTION8=function(e){return this.optionInternal(e,8)},t.prototype.OPTION9=function(e){return this.optionInternal(e,9)},t.prototype.OR=function(e){return this.orInternal(e,0)},t.prototype.OR1=function(e){return this.orInternal(e,1)},t.prototype.OR2=function(e){return this.orInternal(e,2)},t.prototype.OR3=function(e){return this.orInternal(e,3)},t.prototype.OR4=function(e){return this.orInternal(e,4)},t.prototype.OR5=function(e){return this.orInternal(e,5)},t.prototype.OR6=function(e){return this.orInternal(e,6)},t.prototype.OR7=function(e){return this.orInternal(e,7)},t.prototype.OR8=function(e){return this.orInternal(e,8)},t.prototype.OR9=function(e){return this.orInternal(e,9)},t.prototype.MANY=function(e){this.manyInternal(0,e)},t.prototype.MANY1=function(e){this.manyInternal(1,e)},t.prototype.MANY2=function(e){this.manyInternal(2,e)},t.prototype.MANY3=function(e){this.manyInternal(3,e)},t.prototype.MANY4=function(e){this.manyInternal(4,e)},t.prototype.MANY5=function(e){this.manyInternal(5,e)},t.prototype.MANY6=function(e){this.manyInternal(6,e)},t.prototype.MANY7=function(e){this.manyInternal(7,e)},t.prototype.MANY8=function(e){this.manyInternal(8,e)},t.prototype.MANY9=function(e){this.manyInternal(9,e)},t.prototype.MANY_SEP=function(e){this.manySepFirstInternal(0,e)},t.prototype.MANY_SEP1=function(e){this.manySepFirstInternal(1,e)},t.prototype.MANY_SEP2=function(e){this.manySepFirstInternal(2,e)},t.prototype.MANY_SEP3=function(e){this.manySepFirstInternal(3,e)},t.prototype.MANY_SEP4=function(e){this.manySepFirstInternal(4,e)},t.prototype.MANY_SEP5=function(e){this.manySepFirstInternal(5,e)},t.prototype.MANY_SEP6=function(e){this.manySepFirstInternal(6,e)},t.prototype.MANY_SEP7=function(e){this.manySepFirstInternal(7,e)},t.prototype.MANY_SEP8=function(e){this.manySepFirstInternal(8,e)},t.prototype.MANY_SEP9=function(e){this.manySepFirstInternal(9,e)},t.prototype.AT_LEAST_ONE=function(e){this.atLeastOneInternal(0,e)},t.prototype.AT_LEAST_ONE1=function(e){return this.atLeastOneInternal(1,e)},t.prototype.AT_LEAST_ONE2=function(e){this.atLeastOneInternal(2,e)},t.prototype.AT_LEAST_ONE3=function(e){this.atLeastOneInternal(3,e)},t.prototype.AT_LEAST_ONE4=function(e){this.atLeastOneInternal(4,e)},t.prototype.AT_LEAST_ONE5=function(e){this.atLeastOneInternal(5,e)},t.prototype.AT_LEAST_ONE6=function(e){this.atLeastOneInternal(6,e)},t.prototype.AT_LEAST_ONE7=function(e){this.atLeastOneInternal(7,e)},t.prototype.AT_LEAST_ONE8=function(e){this.atLeastOneInternal(8,e)},t.prototype.AT_LEAST_ONE9=function(e){this.atLeastOneInternal(9,e)},t.prototype.AT_LEAST_ONE_SEP=function(e){this.atLeastOneSepFirstInternal(0,e)},t.prototype.AT_LEAST_ONE_SEP1=function(e){this.atLeastOneSepFirstInternal(1,e)},t.prototype.AT_LEAST_ONE_SEP2=function(e){this.atLeastOneSepFirstInternal(2,e)},t.prototype.AT_LEAST_ONE_SEP3=function(e){this.atLeastOneSepFirstInternal(3,e)},t.prototype.AT_LEAST_ONE_SEP4=function(e){this.atLeastOneSepFirstInternal(4,e)},t.prototype.AT_LEAST_ONE_SEP5=function(e){this.atLeastOneSepFirstInternal(5,e)},t.prototype.AT_LEAST_ONE_SEP6=function(e){this.atLeastOneSepFirstInternal(6,e)},t.prototype.AT_LEAST_ONE_SEP7=function(e){this.atLeastOneSepFirstInternal(7,e)},t.prototype.AT_LEAST_ONE_SEP8=function(e){this.atLeastOneSepFirstInternal(8,e)},t.prototype.AT_LEAST_ONE_SEP9=function(e){this.atLeastOneSepFirstInternal(9,e)},t.prototype.RULE=function(e,r,n){if(n===void 0&&(n=yb.DEFAULT_RULE_CONFIG),(0,Tue.default)(this.definedRulesNames,e)){var i=Rue.defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),a={message:i,type:yb.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(a)}this.definedRulesNames.push(e);var o=this.defineRule(e,r,n);return this[e]=o,o},t.prototype.OVERRIDE_RULE=function(e,r,n){n===void 0&&(n=yb.DEFAULT_RULE_CONFIG);var i=(0,bue.validateRuleIsOverridden)(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);var a=this.defineRule(e,r,n);return this[e]=a,a},t.prototype.BACKTRACK=function(e,r){return function(){this.isBackTrackingStack.push(1);var n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if((0,_ue.isRecognitionException)(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}},t.prototype.getGAstProductions=function(){return this.gastProductionsCache},t.prototype.getSerializedGastProductions=function(){return(0,Sue.serializeGrammar)((0,vue.default)(this.gastProductionsCache))},t}();ku.RecognizerApi=Cue});var QM=d(Nu=>{"use strict";var Ai=Nu&&Nu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Nu,"__esModule",{value:!0});Nu.RecognizerEngine=void 0;var WM=Ai(tn()),gb=Ai(Ve()),vb=Ai(Qn()),BM=Ai(uc()),Aue=Ai(Mp()),Eue=Ai(Yn()),bc=Ai(nn()),Sc=Ai(mi()),VM=Ai(na()),zM=Ai(ea()),on=cm(),vm=Cu(),YM=bu(),wu=hc(),XM=Br(),Pue=db(),JM=Ko(),Cc=Ho(),kue=function(){function t(){}return t.prototype.initRecognizerEngine=function(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=Cc.tokenStructuredMatcherNoCategories,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},(0,bc.default)(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if((0,gb.default)(e)){if((0,WM.default)(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if((0,gb.default)(e))this.tokensMap=(0,VM.default)(e,function(s,u){return s[u.name]=u,s},{});else if((0,bc.default)(e,"modes")&&(0,BM.default)((0,vb.default)((0,Sc.default)(e.modes)),Cc.isTokenType)){var n=(0,vb.default)((0,Sc.default)(e.modes)),i=(0,Aue.default)(n);this.tokensMap=(0,VM.default)(i,function(s,u){return s[u.name]=u,s},{})}else if((0,Eue.default)(e))this.tokensMap=(0,zM.default)(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=JM.EOF;var a=(0,bc.default)(e,"modes")?(0,vb.default)((0,Sc.default)(e.modes)):(0,Sc.default)(e),o=(0,BM.default)(a,function(s){return(0,WM.default)(s.categoryMatches)});this.tokenMatcher=o?Cc.tokenStructuredMatcherNoCategories:Cc.tokenStructuredMatcher,(0,Cc.augmentTokenTypes)((0,Sc.default)(this.tokensMap))},t.prototype.defineRule=function(e,r,n){if(this.selfAnalysisDone)throw Error("Grammar rule <".concat(e,`> may not be defined after the 'performSelfAnalysis' method has been called'
`)+"Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");var i=(0,bc.default)(n,"resyncEnabled")?n.resyncEnabled:XM.DEFAULT_RULE_CONFIG.resyncEnabled,a=(0,bc.default)(n,"recoveryValueFunc")?n.recoveryValueFunc:XM.DEFAULT_RULE_CONFIG.recoveryValueFunc,o=this.ruleShortNameIdx<<on.BITS_FOR_METHOD_TYPE+on.BITS_FOR_OCCURRENCE_IDX;this.ruleShortNameIdx++,this.shortRuleNameToFull[o]=e,this.fullRuleNameToShort[e]=o;var s;this.outputCst===!0?s=function(){for(var c=[],p=0;p<arguments.length;p++)c[p]=arguments[p];try{this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c);var h=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(h),h}catch(R){return this.invokeRuleCatch(R,i,a)}finally{this.ruleFinallyStateUpdate()}}:s=function(){for(var c=[],p=0;p<arguments.length;p++)c[p]=arguments[p];try{return this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c)}catch(h){return this.invokeRuleCatch(h,i,a)}finally{this.ruleFinallyStateUpdate()}};var u=Object.assign(s,{ruleName:e,originalGrammarAction:r});return u},t.prototype.invokeRuleCatch=function(e,r,n){var i=this.RULE_STACK.length===1,a=r&&!this.isBackTracking()&&this.recoveryEnabled;if((0,vm.isRecognitionException)(e)){var o=e;if(a){var s=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(s))if(o.resyncedTokens=this.reSyncTo(s),this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];return u.recoveredNode=!0,u}else return n();else{if(this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];u.recoveredNode=!0,o.partialCstResult=u}throw o}}else{if(i)return this.moveToTerminatedState(),n();throw o}}else throw e},t.prototype.optionInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(on.OPTION_IDX,r);return this.optionInternalLogic(e,r,n)},t.prototype.optionInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;var s=e.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=e;if(a.call(this)===!0)return o.call(this)},t.prototype.atLeastOneInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(on.AT_LEAST_ONE_IDX,e);return this.atLeastOneInternalLogic(e,r,n)},t.prototype.atLeastOneInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;if(a.call(this)===!0)for(var l=this.doSingleRepetition(o);a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);else throw this.raiseEarlyExitException(e,YM.PROD_TYPE.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],a,on.AT_LEAST_ONE_IDX,e,wu.NextTerminalAfterAtLeastOneWalker)},t.prototype.atLeastOneSepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(on.AT_LEAST_ONE_SEP_IDX,e);this.atLeastOneSepFirstInternalLogic(e,r,n)},t.prototype.atLeastOneSepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,wu.NextTerminalAfterAtLeastOneSepWalker],u,on.AT_LEAST_ONE_SEP_IDX,e,wu.NextTerminalAfterAtLeastOneSepWalker)}else throw this.raiseEarlyExitException(e,YM.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)},t.prototype.manyInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(on.MANY_IDX,e);return this.manyInternalLogic(e,r,n)},t.prototype.manyInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;for(var l=!0;a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],a,on.MANY_IDX,e,wu.NextTerminalAfterManyWalker,l)},t.prototype.manySepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(on.MANY_SEP_IDX,e);this.manySepFirstInternalLogic(e,r,n)},t.prototype.manySepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,wu.NextTerminalAfterManySepWalker],u,on.MANY_SEP_IDX,e,wu.NextTerminalAfterManySepWalker)}},t.prototype.repetitionSepSecondInternal=function(e,r,n,i,a){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,a],n,on.AT_LEAST_ONE_SEP_IDX,e,a)},t.prototype.doSingleRepetition=function(e){var r=this.getLexerPosition();e.call(this);var n=this.getLexerPosition();return n>r},t.prototype.orInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(on.OR_IDX,r),i=(0,gb.default)(e)?e:e.DEF,a=this.getLaFuncFromCache(n),o=a.call(this,i);if(o!==void 0){var s=i[o];return s.ALT.call(this)}this.raiseNoAltException(r,e.ERR_MSG)},t.prototype.ruleFinallyStateUpdate=function(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){var e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new vm.NotAllInputParsedException(r,e))}},t.prototype.subruleInternal=function(e,r,n){var i;try{var a=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,a),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}},t.prototype.subruleInternalError=function(e,r,n){throw(0,vm.isRecognitionException)(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e},t.prototype.consumeInternal=function(e,r,n){var i;try{var a=this.LA(1);this.tokenMatcher(a,e)===!0?(this.consumeToken(),i=a):this.consumeInternalError(e,a,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i},t.prototype.consumeInternalError=function(e,r,n){var i,a=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:a,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new vm.MismatchedTokenException(i,r,a))},t.prototype.consumeInternalRecovery=function(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){var i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(a){throw a.name===Pue.IN_RULE_RECOVERY_EXCEPTION?n:a}}else throw n},t.prototype.saveRecogState=function(){var e=this.errors,r=(0,zM.default)(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}},t.prototype.reloadRecogState=function(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK},t.prototype.ruleInvocationStateUpdate=function(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)},t.prototype.isBackTracking=function(){return this.isBackTrackingStack.length!==0},t.prototype.getCurrRuleFullName=function(){var e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]},t.prototype.shortRuleNameToFullName=function(e){return this.shortRuleNameToFull[e]},t.prototype.isAtEndOfInput=function(){return this.tokenMatcher(this.LA(1),JM.EOF)},t.prototype.reset=function(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]},t}();Nu.RecognizerEngine=kue});var r1=d(Du=>{"use strict";var t1=Du&&Du.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Du,"__esModule",{value:!0});Du.ErrorHandler=void 0;var Tb=Cu(),wue=t1(nn()),ZM=t1(ea()),e1=bu(),Nue=Br(),Due=function(){function t(){}return t.prototype.initErrorHandler=function(e){this._errors=[],this.errorMessageProvider=(0,wue.default)(e,"errorMessageProvider")?e.errorMessageProvider:Nue.DEFAULT_PARSER_CONFIG.errorMessageProvider},t.prototype.SAVE_ERROR=function(e){if((0,Tb.isRecognitionException)(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:(0,ZM.default)(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")},Object.defineProperty(t.prototype,"errors",{get:function(){return(0,ZM.default)(this._errors)},set:function(e){this._errors=e},enumerable:!1,configurable:!0}),t.prototype.raiseEarlyExitException=function(e,r,n){for(var i=this.getCurrRuleFullName(),a=this.getGAstProductions()[i],o=(0,e1.getLookaheadPathsForOptionalProd)(e,a,r,this.maxLookahead),s=o[0],u=[],l=1;l<=this.maxLookahead;l++)u.push(this.LA(l));var c=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:s,actual:u,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new Tb.EarlyExitException(c,this.LA(1),this.LA(0)))},t.prototype.raiseNoAltException=function(e,r){for(var n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],a=(0,e1.getLookaheadPathsForOr)(e,i,this.maxLookahead),o=[],s=1;s<=this.maxLookahead;s++)o.push(this.LA(s));var u=this.LA(0),l=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:a,actual:o,previous:u,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new Tb.NoViableAltException(l,this.LA(1),u))},t}();Du.ErrorHandler=Due});var a1=d($u=>{"use strict";var i1=$u&&$u.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty($u,"__esModule",{value:!0});$u.ContentAssist=void 0;var n1=hc(),$ue=i1(yu()),Oue=i1(jo()),Iue=function(){function t(){}return t.prototype.initContentAssist=function(){},t.prototype.computeContentAssist=function(e,r){var n=this.gastProductionsCache[e];if((0,Oue.default)(n))throw Error("Rule ->".concat(e,"<- does not exist in this grammar."));return(0,n1.nextPossibleTokensAfter)([n],r,this.tokenMatcher,this.maxLookahead)},t.prototype.getNextPossibleTokenTypes=function(e){var r=(0,$ue.default)(e.ruleStack),n=this.getGAstProductions(),i=n[r],a=new n1.NextAfterTokenWalker(i,e).startWalking();return a},t}();$u.ContentAssist=Iue});var m1=d(Ou=>{"use strict";var Iu=Ou&&Ou.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ou,"__esModule",{value:!0});Ou.GastRecorder=void 0;var Tm=Iu(Zp()),xue=Iu(Ve()),Lue=Iu($p()),que=Iu(er()),l1=Iu(Ys()),Ec=Iu(nn()),Ei=Dt(),Mue=fc(),c1=Ho(),f1=Ko(),Fue=Br(),jue=cm(),Rm={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(Rm);var o1=!0,s1=Math.pow(2,jue.BITS_FOR_OCCURRENCE_IDX)-1,d1=(0,f1.createToken)({name:"RECORDING_PHASE_TOKEN",pattern:Mue.Lexer.NA});(0,c1.augmentTokenTypes)([d1]);var p1=(0,f1.createTokenInstance)(d1,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(p1);var Gue={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},Uue=function(){function t(){}return t.prototype.initGastRecorder=function(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1},t.prototype.enableRecording=function(){var e=this;this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",function(){for(var r=function(i){var a=i>0?i:"";e["CONSUME".concat(a)]=function(o,s){return this.consumeInternalRecord(o,i,s)},e["SUBRULE".concat(a)]=function(o,s){return this.subruleInternalRecord(o,i,s)},e["OPTION".concat(a)]=function(o){return this.optionInternalRecord(o,i)},e["OR".concat(a)]=function(o){return this.orInternalRecord(o,i)},e["MANY".concat(a)]=function(o){this.manyInternalRecord(i,o)},e["MANY_SEP".concat(a)]=function(o){this.manySepFirstInternalRecord(i,o)},e["AT_LEAST_ONE".concat(a)]=function(o){this.atLeastOneInternalRecord(i,o)},e["AT_LEAST_ONE_SEP".concat(a)]=function(o){this.atLeastOneSepFirstInternalRecord(i,o)}},n=0;n<10;n++)r(n);e.consume=function(i,a,o){return this.consumeInternalRecord(a,i,o)},e.subrule=function(i,a,o){return this.subruleInternalRecord(a,i,o)},e.option=function(i,a){return this.optionInternalRecord(a,i)},e.or=function(i,a){return this.orInternalRecord(a,i)},e.many=function(i,a){this.manyInternalRecord(i,a)},e.atLeastOne=function(i,a){this.atLeastOneInternalRecord(i,a)},e.ACTION=e.ACTION_RECORD,e.BACKTRACK=e.BACKTRACK_RECORD,e.LA=e.LA_RECORD})},t.prototype.disableRecording=function(){var e=this;this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",function(){for(var r=e,n=0;n<10;n++){var i=n>0?n:"";delete r["CONSUME".concat(i)],delete r["SUBRULE".concat(i)],delete r["OPTION".concat(i)],delete r["OR".concat(i)],delete r["MANY".concat(i)],delete r["MANY_SEP".concat(i)],delete r["AT_LEAST_ONE".concat(i)],delete r["AT_LEAST_ONE_SEP".concat(i)]}delete r.consume,delete r.subrule,delete r.option,delete r.or,delete r.many,delete r.atLeastOne,delete r.ACTION,delete r.BACKTRACK,delete r.LA})},t.prototype.ACTION_RECORD=function(e){},t.prototype.BACKTRACK_RECORD=function(e,r){return function(){return!0}},t.prototype.LA_RECORD=function(e){return Fue.END_OF_FILE},t.prototype.topLevelRuleRecord=function(e,r){try{var n=new Ei.Rule({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(i){if(i.KNOWN_RECORDER_ERROR!==!0)try{i.message=i.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw i}throw i}},t.prototype.optionInternalRecord=function(e,r){return Ac.call(this,Ei.Option,e,r)},t.prototype.atLeastOneInternalRecord=function(e,r){Ac.call(this,Ei.RepetitionMandatory,r,e)},t.prototype.atLeastOneSepFirstInternalRecord=function(e,r){Ac.call(this,Ei.RepetitionMandatoryWithSeparator,r,e,o1)},t.prototype.manyInternalRecord=function(e,r){Ac.call(this,Ei.Repetition,r,e)},t.prototype.manySepFirstInternalRecord=function(e,r){Ac.call(this,Ei.RepetitionWithSeparator,r,e,o1)},t.prototype.orInternalRecord=function(e,r){return Hue.call(this,e,r)},t.prototype.subruleInternalRecord=function(e,r,n){if(_m(r),!e||(0,Ec.default)(e,"ruleName")===!1){var i=new Error("<SUBRULE".concat(u1(r),"> argument is invalid")+" expecting a Parser method reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,Tm.default)(this.recordingProdStack),o=e.ruleName,s=new Ei.NonTerminal({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return a.definition.push(s),this.outputCst?Gue:Rm},t.prototype.consumeInternalRecord=function(e,r,n){if(_m(r),!(0,c1.hasShortKeyProperty)(e)){var i=new Error("<CONSUME".concat(u1(r),"> argument is invalid")+" expecting a TokenType reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,Tm.default)(this.recordingProdStack),o=new Ei.Terminal({idx:r,terminalType:e,label:n?.LABEL});return a.definition.push(o),p1},t}();Ou.GastRecorder=Uue;function Ac(t,e,r,n){n===void 0&&(n=!1),_m(r);var i=(0,Tm.default)(this.recordingProdStack),a=(0,l1.default)(e)?e:e.DEF,o=new t({definition:[],idx:r});return n&&(o.separator=e.SEP),(0,Ec.default)(e,"MAX_LOOKAHEAD")&&(o.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(o),a.call(this),i.definition.push(o),this.recordingProdStack.pop(),Rm}function Hue(t,e){var r=this;_m(e);var n=(0,Tm.default)(this.recordingProdStack),i=(0,xue.default)(t)===!1,a=i===!1?t:t.DEF,o=new Ei.Alternation({definition:[],idx:e,ignoreAmbiguities:i&&t.IGNORE_AMBIGUITIES===!0});(0,Ec.default)(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);var s=(0,Lue.default)(a,function(u){return(0,l1.default)(u.GATE)});return o.hasPredicates=s,n.definition.push(o),(0,que.default)(a,function(u){var l=new Ei.Alternative({definition:[]});o.definition.push(l),(0,Ec.default)(u,"IGNORE_AMBIGUITIES")?l.ignoreAmbiguities=u.IGNORE_AMBIGUITIES:(0,Ec.default)(u,"GATE")&&(l.ignoreAmbiguities=!0),r.recordingProdStack.push(l),u.ALT.call(r),r.recordingProdStack.pop()}),Rm}function u1(t){return t===0?"":"".concat(t)}function _m(t){if(t<0||t>s1){var e=new Error("Invalid DSL Method idx value: <".concat(t,`>
	`)+"Idx value must be a none negative value smaller than ".concat(s1+1));throw e.KNOWN_RECORDER_ERROR=!0,e}}});var h1=d(xu=>{"use strict";var Kue=xu&&xu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(xu,"__esModule",{value:!0});xu.PerformanceTracer=void 0;var Wue=Kue(nn()),Bue=du(),Vue=Br(),zue=function(){function t(){}return t.prototype.initPerformanceTracer=function(e){if((0,Wue.default)(e,"traceInitPerf")){var r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=Vue.DEFAULT_PARSER_CONFIG.traceInitPerf;this.traceInitIndent=-1},t.prototype.TRACE_INIT=function(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;var n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log("".concat(n,"--> <").concat(e,">"));var i=(0,Bue.timer)(r),a=i.time,o=i.value,s=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s("".concat(n,"<-- <").concat(e,"> time: ").concat(a,"ms")),this.traceInitIndent--,o}else return r()},t}();xu.PerformanceTracer=zue});var y1=d(bm=>{"use strict";Object.defineProperty(bm,"__esModule",{value:!0});bm.applyMixins=void 0;function Yue(t,e){e.forEach(function(r){var n=r.prototype;Object.getOwnPropertyNames(n).forEach(function(i){if(i!=="constructor"){var a=Object.getOwnPropertyDescriptor(n,i);a&&(a.get||a.set)?Object.defineProperty(t.prototype,i,a):t.prototype[i]=r.prototype[i]}})})}bm.applyMixins=Yue});var Br=d(Je=>{"use strict";var _1=Je&&Je.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Lu=Je&&Je.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Je,"__esModule",{value:!0});Je.EmbeddedActionsParser=Je.CstParser=Je.Parser=Je.EMPTY_ALT=Je.ParserDefinitionErrorType=Je.DEFAULT_RULE_CONFIG=Je.DEFAULT_PARSER_CONFIG=Je.END_OF_FILE=void 0;var _b=Lu(tn()),Xue=Lu(Zt()),Jue=Lu(er()),Qa=Lu(mi()),g1=Lu(nn()),R1=Lu(ea()),Que=du(),Zue=eL(),v1=Ko(),b1=Ru(),T1=pM(),ele=db(),tle=PM(),rle=jM(),nle=UM(),ile=KM(),ale=QM(),ole=r1(),sle=a1(),ule=m1(),lle=h1(),cle=y1(),fle=vc();Je.END_OF_FILE=(0,v1.createTokenInstance)(v1.EOF,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(Je.END_OF_FILE);Je.DEFAULT_PARSER_CONFIG=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:b1.defaultParserErrorProvider,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1});Je.DEFAULT_RULE_CONFIG=Object.freeze({recoveryValueFunc:function(){},resyncEnabled:!0});var dle;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(dle=Je.ParserDefinitionErrorType||(Je.ParserDefinitionErrorType={}));function ple(t){return t===void 0&&(t=void 0),function(){return t}}Je.EMPTY_ALT=ple;var Sm=function(){function t(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;var n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),(0,g1.default)(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=(0,g1.default)(r,"skipValidations")?r.skipValidations:Je.DEFAULT_PARSER_CONFIG.skipValidations}return t.performSelfAnalysis=function(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")},t.prototype.performSelfAnalysis=function(){var e=this;this.TRACE_INIT("performSelfAnalysis",function(){var r;e.selfAnalysisDone=!0;var n=e.className;e.TRACE_INIT("toFastProps",function(){(0,Que.toFastProperties)(e)}),e.TRACE_INIT("Grammar Recording",function(){try{e.enableRecording(),(0,Jue.default)(e.definedRulesNames,function(a){var o=e[a],s=o.originalGrammarAction,u;e.TRACE_INIT("".concat(a," Rule"),function(){u=e.topLevelRuleRecord(a,s)}),e.gastProductionsCache[a]=u})}finally{e.disableRecording()}});var i=[];if(e.TRACE_INIT("Grammar Resolving",function(){i=(0,T1.resolveGrammar)({rules:(0,Qa.default)(e.gastProductionsCache)}),e.definitionErrors=e.definitionErrors.concat(i)}),e.TRACE_INIT("Grammar Validations",function(){if((0,_b.default)(i)&&e.skipValidations===!1){var a=(0,T1.validateGrammar)({rules:(0,Qa.default)(e.gastProductionsCache),tokenTypes:(0,Qa.default)(e.tokensMap),errMsgProvider:b1.defaultGrammarValidatorErrorProvider,grammarName:n}),o=(0,fle.validateLookahead)({lookaheadStrategy:e.lookaheadStrategy,rules:(0,Qa.default)(e.gastProductionsCache),tokenTypes:(0,Qa.default)(e.tokensMap),grammarName:n});e.definitionErrors=e.definitionErrors.concat(a,o)}}),(0,_b.default)(e.definitionErrors)&&(e.recoveryEnabled&&e.TRACE_INIT("computeAllProdsFollows",function(){var a=(0,Zue.computeAllProdsFollows)((0,Qa.default)(e.gastProductionsCache));e.resyncFollows=a}),e.TRACE_INIT("ComputeLookaheadFunctions",function(){var a,o;(o=(a=e.lookaheadStrategy).initialize)===null||o===void 0||o.call(a,{rules:(0,Qa.default)(e.gastProductionsCache)}),e.preComputeLookaheadFunctions((0,Qa.default)(e.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!(0,_b.default)(e.definitionErrors))throw r=(0,Xue.default)(e.definitionErrors,function(a){return a.message}),new Error(`Parser Definition Errors detected:
 `.concat(r.join(`
-------------------------------
`)))})},t.DEFER_DEFINITION_ERRORS_HANDLING=!1,t}();Je.Parser=Sm;(0,cle.applyMixins)(Sm,[ele.Recoverable,tle.LooksAhead,rle.TreeBuilder,nle.LexerAdapter,ale.RecognizerEngine,ile.RecognizerApi,ole.ErrorHandler,sle.ContentAssist,ule.GastRecorder,lle.PerformanceTracer]);var mle=function(t){_1(e,t);function e(r,n){n===void 0&&(n=Je.DEFAULT_PARSER_CONFIG);var i=(0,R1.default)(n);return i.outputCst=!0,t.call(this,r,i)||this}return e}(Sm);Je.CstParser=mle;var hle=function(t){_1(e,t);function e(r,n){n===void 0&&(n=Je.DEFAULT_PARSER_CONFIG);var i=(0,R1.default)(n);return i.outputCst=!1,t.call(this,r,i)||this}return e}(Sm);Je.EmbeddedActionsParser=hle});var C1=d(Za=>{"use strict";var yle=Za&&Za.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),qu=Za&&Za.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Za,"__esModule",{value:!0});Za.buildModel=void 0;var S1=Dt(),Pc=qu(Zt()),gle=qu(Qn()),vle=qu(mi()),Tle=qu($p()),_le=qu(JR()),Rle=qu(oc());function ble(t){var e=new Sle,r=(0,vle.default)(t);return(0,Pc.default)(r,function(n){return e.visitRule(n)})}Za.buildModel=ble;var Sle=function(t){yle(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.visitRule=function(r){var n=this.visitEach(r.definition),i=(0,_le.default)(n,function(o){return o.propertyName}),a=(0,Pc.default)(i,function(o,s){var u=!(0,Tle.default)(o,function(c){return!c.canBeNull}),l=o[0].type;return o.length>1&&(l=(0,Pc.default)(o,function(c){return c.type})),{name:s,type:l,optional:u}});return{name:r.name,properties:a}},e.prototype.visitAlternative=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitOption=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetition=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetitionMandatory=function(r){return this.visitEach(r.definition)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){return this.visitEach(r.definition).concat({propertyName:r.separator.name,canBeNull:!0,type:Cm(r.separator)})},e.prototype.visitRepetitionWithSeparator=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0}).concat({propertyName:r.separator.name,canBeNull:!0,type:Cm(r.separator)})},e.prototype.visitAlternation=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitTerminal=function(r){return[{propertyName:r.label||r.terminalType.name,canBeNull:!1,type:Cm(r)}]},e.prototype.visitNonTerminal=function(r){return[{propertyName:r.label||r.nonTerminalName,canBeNull:!1,type:Cm(r)}]},e.prototype.visitEachAndOverrideWith=function(r,n){return(0,Pc.default)(this.visitEach(r),function(i){return(0,Rle.default)({},i,n)})},e.prototype.visitEach=function(r){var n=this;return(0,gle.default)((0,Pc.default)(r,function(i){return n.visit(i)}))},e}(S1.GAstVisitor);function Cm(t){return t instanceof S1.NonTerminal?{kind:"rule",name:t.referencedRule.name}:{kind:"token"}}});var E1=d((g0e,A1)=>{var Cle=Ep();function Ale(t,e,r){var n=t.length;return r=r===void 0?n:r,!e&&r>=n?t:Cle(t,e,r)}A1.exports=Ale});var Rb=d((v0e,P1)=>{var Ele="\\ud800-\\udfff",Ple="\\u0300-\\u036f",kle="\\ufe20-\\ufe2f",wle="\\u20d0-\\u20ff",Nle=Ple+kle+wle,Dle="\\ufe0e\\ufe0f",$le="\\u200d",Ole=RegExp("["+$le+Ele+Nle+Dle+"]");function Ile(t){return Ole.test(t)}P1.exports=Ile});var w1=d((T0e,k1)=>{function xle(t){return t.split("")}k1.exports=xle});var q1=d((_0e,L1)=>{var N1="\\ud800-\\udfff",Lle="\\u0300-\\u036f",qle="\\ufe20-\\ufe2f",Mle="\\u20d0-\\u20ff",Fle=Lle+qle+Mle,jle="\\ufe0e\\ufe0f",Gle="["+N1+"]",bb="["+Fle+"]",Sb="\\ud83c[\\udffb-\\udfff]",Ule="(?:"+bb+"|"+Sb+")",D1="[^"+N1+"]",$1="(?:\\ud83c[\\udde6-\\uddff]){2}",O1="[\\ud800-\\udbff][\\udc00-\\udfff]",Hle="\\u200d",I1=Ule+"?",x1="["+jle+"]?",Kle="(?:"+Hle+"(?:"+[D1,$1,O1].join("|")+")"+x1+I1+")*",Wle=x1+I1+Kle,Ble="(?:"+[D1+bb+"?",bb,$1,O1,Gle].join("|")+")",Vle=RegExp(Sb+"(?="+Sb+")|"+Ble+Wle,"g");function zle(t){return t.match(Vle)||[]}L1.exports=zle});var F1=d((R0e,M1)=>{var Yle=w1(),Xle=Rb(),Jle=q1();function Qle(t){return Xle(t)?Jle(t):Yle(t)}M1.exports=Qle});var G1=d((b0e,j1)=>{var Zle=E1(),ece=Rb(),tce=F1(),rce=sR();function nce(t){return function(e){e=rce(e);var r=ece(e)?tce(e):void 0,n=r?r[0]:e.charAt(0),i=r?Zle(r,1).join(""):e.slice(1);return n[t]()+i}}j1.exports=nce});var H1=d((S0e,U1)=>{var ice=G1(),ace=ice("toUpperCase");U1.exports=ace});var V1=d(Mu=>{"use strict";var Fu=Mu&&Mu.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Mu,"__esModule",{value:!0});Mu.genDts=void 0;var oce=Fu(Qn()),sce=Fu(Ve()),Am=Fu(Zt()),uce=Fu(na()),lce=Fu(Mp()),W1=Fu(H1());function cce(t,e){var r=[];return r=r.concat('import type { CstNode, ICstVisitor, IToken } from "chevrotain";'),r=r.concat((0,oce.default)((0,Am.default)(t,function(n){return fce(n)}))),e.includeVisitorInterface&&(r=r.concat(hce(e.visitorInterfaceName,t))),r.join(`

`)+`
`}Mu.genDts=cce;function fce(t){var e=dce(t),r=pce(t);return[e,r]}function dce(t){var e=B1(t.name),r=Cb(t.name);return"export interface ".concat(e,` extends CstNode {
  name: "`).concat(t.name,`";
  children: `).concat(r,`;
}`)}function pce(t){var e=Cb(t.name);return"export type ".concat(e,` = {
  `).concat((0,Am.default)(t.properties,function(r){return mce(r)}).join(`
  `),`
};`)}function mce(t){var e=gce(t.type);return"".concat(t.name).concat(t.optional?"?":"",": ").concat(e,"[];")}function hce(t,e){return"export interface ".concat(t,`<IN, OUT> extends ICstVisitor<IN, OUT> {
  `).concat((0,Am.default)(e,function(r){return yce(r)}).join(`
  `),`
}`)}function yce(t){var e=Cb(t.name);return"".concat(t.name,"(children: ").concat(e,", param?: IN): OUT;")}function gce(t){if((0,sce.default)(t)){var e=(0,lce.default)((0,Am.default)(t,function(n){return K1(n)})),r=(0,uce.default)(e,function(n,i){return n+" | "+i});return"("+r+")"}else return K1(t)}function K1(t){return t.kind==="token"?"IToken":B1(t.name)}function B1(t){return(0,W1.default)(t)+"CstNode"}function Cb(t){return(0,W1.default)(t)+"CstChildren"}});var z1=d(ju=>{"use strict";var Em=ju&&ju.__assign||function(){return Em=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},Em.apply(this,arguments)};Object.defineProperty(ju,"__esModule",{value:!0});ju.generateCstDts=void 0;var vce=C1(),Tce=V1(),_ce={includeVisitorInterface:!0,visitorInterfaceName:"ICstNodeVisitor"};function Rce(t,e){var r=Em(Em({},_ce),e),n=(0,vce.buildModel)(t);return(0,Tce.genDts)(n,r)}ju.generateCstDts=Rce});var X1=d(Pm=>{"use strict";Object.defineProperty(Pm,"__esModule",{value:!0});Pm.createSyntaxDiagramsCode=void 0;var Y1=x_();function bce(t,e){var r=e===void 0?{}:e,n=r.resourceBase,i=n===void 0?"https://unpkg.com/chevrotain@".concat(Y1.VERSION,"/diagrams/"):n,a=r.css,o=a===void 0?"https://unpkg.com/chevrotain@".concat(Y1.VERSION,"/diagrams/diagrams.css"):a,s=`
<!-- This is a generated file -->
<!DOCTYPE html>
<meta charset="utf-8">
<style>
  body {
    background-color: hsl(30, 20%, 95%)
  }
</style>

`,u=`
<link rel='stylesheet' href='`.concat(o,`'>
`),l=`
<script src='`.concat(i,`vendor/railroad-diagrams.js'><\/script>
<script src='`).concat(i,`src/diagrams_builder.js'><\/script>
<script src='`).concat(i,`src/diagrams_behavior.js'><\/script>
<script src='`).concat(i,`src/main.js'><\/script>
`),c=`
<div id="diagrams" align="center"></div>    
`,p=`
<script>
    window.serializedGrammar = `.concat(JSON.stringify(t,null,"  "),`;
<\/script>
`),h=`
<script>
    var diagramsDiv = document.getElementById("diagrams");
    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);
<\/script>
`;return s+u+l+c+p+h}Pm.createSyntaxDiagramsCode=bce});var Qo=d(B=>{"use strict";Object.defineProperty(B,"__esModule",{value:!0});B.Parser=B.createSyntaxDiagramsCode=B.clearCache=B.generateCstDts=B.GAstVisitor=B.serializeProduction=B.serializeGrammar=B.Terminal=B.Rule=B.RepetitionWithSeparator=B.RepetitionMandatoryWithSeparator=B.RepetitionMandatory=B.Repetition=B.Option=B.NonTerminal=B.Alternative=B.Alternation=B.defaultLexerErrorProvider=B.NoViableAltException=B.NotAllInputParsedException=B.MismatchedTokenException=B.isRecognitionException=B.EarlyExitException=B.defaultParserErrorProvider=B.LLkLookaheadStrategy=B.getLookaheadPaths=B.tokenName=B.tokenMatcher=B.tokenLabel=B.EOF=B.createTokenInstance=B.createToken=B.LexerDefinitionErrorType=B.Lexer=B.EMPTY_ALT=B.ParserDefinitionErrorType=B.EmbeddedActionsParser=B.CstParser=B.VERSION=void 0;var Sce=x_();Object.defineProperty(B,"VERSION",{enumerable:!0,get:function(){return Sce.VERSION}});var km=Br();Object.defineProperty(B,"CstParser",{enumerable:!0,get:function(){return km.CstParser}});Object.defineProperty(B,"EmbeddedActionsParser",{enumerable:!0,get:function(){return km.EmbeddedActionsParser}});Object.defineProperty(B,"ParserDefinitionErrorType",{enumerable:!0,get:function(){return km.ParserDefinitionErrorType}});Object.defineProperty(B,"EMPTY_ALT",{enumerable:!0,get:function(){return km.EMPTY_ALT}});var J1=fc();Object.defineProperty(B,"Lexer",{enumerable:!0,get:function(){return J1.Lexer}});Object.defineProperty(B,"LexerDefinitionErrorType",{enumerable:!0,get:function(){return J1.LexerDefinitionErrorType}});var Gu=Ko();Object.defineProperty(B,"createToken",{enumerable:!0,get:function(){return Gu.createToken}});Object.defineProperty(B,"createTokenInstance",{enumerable:!0,get:function(){return Gu.createTokenInstance}});Object.defineProperty(B,"EOF",{enumerable:!0,get:function(){return Gu.EOF}});Object.defineProperty(B,"tokenLabel",{enumerable:!0,get:function(){return Gu.tokenLabel}});Object.defineProperty(B,"tokenMatcher",{enumerable:!0,get:function(){return Gu.tokenMatcher}});Object.defineProperty(B,"tokenName",{enumerable:!0,get:function(){return Gu.tokenName}});var Cce=bu();Object.defineProperty(B,"getLookaheadPaths",{enumerable:!0,get:function(){return Cce.getLookaheadPaths}});var Ace=mb();Object.defineProperty(B,"LLkLookaheadStrategy",{enumerable:!0,get:function(){return Ace.LLkLookaheadStrategy}});var Ece=Ru();Object.defineProperty(B,"defaultParserErrorProvider",{enumerable:!0,get:function(){return Ece.defaultParserErrorProvider}});var kc=Cu();Object.defineProperty(B,"EarlyExitException",{enumerable:!0,get:function(){return kc.EarlyExitException}});Object.defineProperty(B,"isRecognitionException",{enumerable:!0,get:function(){return kc.isRecognitionException}});Object.defineProperty(B,"MismatchedTokenException",{enumerable:!0,get:function(){return kc.MismatchedTokenException}});Object.defineProperty(B,"NotAllInputParsedException",{enumerable:!0,get:function(){return kc.NotAllInputParsedException}});Object.defineProperty(B,"NoViableAltException",{enumerable:!0,get:function(){return kc.NoViableAltException}});var Pce=UR();Object.defineProperty(B,"defaultLexerErrorProvider",{enumerable:!0,get:function(){return Pce.defaultLexerErrorProvider}});var Pi=Dt();Object.defineProperty(B,"Alternation",{enumerable:!0,get:function(){return Pi.Alternation}});Object.defineProperty(B,"Alternative",{enumerable:!0,get:function(){return Pi.Alternative}});Object.defineProperty(B,"NonTerminal",{enumerable:!0,get:function(){return Pi.NonTerminal}});Object.defineProperty(B,"Option",{enumerable:!0,get:function(){return Pi.Option}});Object.defineProperty(B,"Repetition",{enumerable:!0,get:function(){return Pi.Repetition}});Object.defineProperty(B,"RepetitionMandatory",{enumerable:!0,get:function(){return Pi.RepetitionMandatory}});Object.defineProperty(B,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return Pi.RepetitionMandatoryWithSeparator}});Object.defineProperty(B,"RepetitionWithSeparator",{enumerable:!0,get:function(){return Pi.RepetitionWithSeparator}});Object.defineProperty(B,"Rule",{enumerable:!0,get:function(){return Pi.Rule}});Object.defineProperty(B,"Terminal",{enumerable:!0,get:function(){return Pi.Terminal}});var Ab=Dt();Object.defineProperty(B,"serializeGrammar",{enumerable:!0,get:function(){return Ab.serializeGrammar}});Object.defineProperty(B,"serializeProduction",{enumerable:!0,get:function(){return Ab.serializeProduction}});Object.defineProperty(B,"GAstVisitor",{enumerable:!0,get:function(){return Ab.GAstVisitor}});var kce=z1();Object.defineProperty(B,"generateCstDts",{enumerable:!0,get:function(){return kce.generateCstDts}});function wce(){console.warn(`The clearCache function was 'soft' removed from the Chevrotain API.
	 It performs no action other than printing this message.
	 Please avoid using it as it will be completely removed in the future`)}B.clearCache=wce;var Nce=X1();Object.defineProperty(B,"createSyntaxDiagramsCode",{enumerable:!0,get:function(){return Nce.createSyntaxDiagramsCode}});var Dce=function(){function t(){throw new Error(`The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	
See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_7-0-0`)}return t}();B.Parser=Dce});var nF=d(Z=>{"use strict";var Q1=Z&&Z.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Z,"__esModule",{value:!0});Z.createATN=Z.RuleTransition=Z.EpsilonTransition=Z.AtomTransition=Z.AbstractTransition=Z.ATN_LOOP_END=Z.ATN_PLUS_LOOP_BACK=Z.ATN_STAR_LOOP_ENTRY=Z.ATN_STAR_LOOP_BACK=Z.ATN_BLOCK_END=Z.ATN_RULE_STOP=Z.ATN_TOKEN_START=Z.ATN_STAR_BLOCK_START=Z.ATN_PLUS_BLOCK_START=Z.ATN_RULE_START=Z.ATN_BASIC=Z.ATN_INVALID_TYPE=Z.buildATNKey=void 0;var Z1=Q1(Zt()),$ce=Q1(cc()),Vr=Qo();function Nc(t,e,r){return`${t.name}_${e}_${r}`}Z.buildATNKey=Nc;Z.ATN_INVALID_TYPE=0;Z.ATN_BASIC=1;Z.ATN_RULE_START=2;Z.ATN_PLUS_BLOCK_START=4;Z.ATN_STAR_BLOCK_START=5;Z.ATN_TOKEN_START=6;Z.ATN_RULE_STOP=7;Z.ATN_BLOCK_END=8;Z.ATN_STAR_LOOP_BACK=9;Z.ATN_STAR_LOOP_ENTRY=10;Z.ATN_PLUS_LOOP_BACK=11;Z.ATN_LOOP_END=12;var Uu=class{constructor(e){this.target=e}isEpsilon(){return!1}};Z.AbstractTransition=Uu;var wm=class extends Uu{constructor(e,r){super(e),this.tokenType=r}};Z.AtomTransition=wm;var Nm=class extends Uu{constructor(e){super(e)}isEpsilon(){return!0}};Z.EpsilonTransition=Nm;var wc=class extends Uu{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};Z.RuleTransition=wc;function Oce(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};Ice(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],a=Zo(e,i,i);a!==void 0&&Wce(e,i,a)}return e}Z.createATN=Oce;function Ice(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],a=rr(t,i,void 0,{type:Z.ATN_RULE_START}),o=rr(t,i,void 0,{type:Z.ATN_RULE_STOP});a.stop=o,t.ruleToStartState.set(i,a),t.ruleToStopState.set(i,o)}}function eF(t,e,r){return r instanceof Vr.Terminal?Eb(t,e,r.terminalType,r):r instanceof Vr.NonTerminal?Kce(t,e,r):r instanceof Vr.Alternation?Fce(t,e,r):r instanceof Vr.Option?jce(t,e,r):r instanceof Vr.Repetition?xce(t,e,r):r instanceof Vr.RepetitionWithSeparator?Lce(t,e,r):r instanceof Vr.RepetitionMandatory?qce(t,e,r):r instanceof Vr.RepetitionMandatoryWithSeparator?Mce(t,e,r):Zo(t,e,r)}function xce(t,e,r){let n=rr(t,e,r,{type:Z.ATN_STAR_BLOCK_START});eo(t,n);let i=Hu(t,e,n,r,Zo(t,e,r));return rF(t,e,r,i)}function Lce(t,e,r){let n=rr(t,e,r,{type:Z.ATN_STAR_BLOCK_START});eo(t,n);let i=Hu(t,e,n,r,Zo(t,e,r)),a=Eb(t,e,r.separator,r);return rF(t,e,r,i,a)}function qce(t,e,r){let n=rr(t,e,r,{type:Z.ATN_PLUS_BLOCK_START});eo(t,n);let i=Hu(t,e,n,r,Zo(t,e,r));return tF(t,e,r,i)}function Mce(t,e,r){let n=rr(t,e,r,{type:Z.ATN_PLUS_BLOCK_START});eo(t,n);let i=Hu(t,e,n,r,Zo(t,e,r)),a=Eb(t,e,r.separator,r);return tF(t,e,r,i,a)}function Fce(t,e,r){let n=rr(t,e,r,{type:Z.ATN_BASIC});eo(t,n);let i=(0,Z1.default)(r.definition,o=>eF(t,e,o));return Hu(t,e,n,r,...i)}function jce(t,e,r){let n=rr(t,e,r,{type:Z.ATN_BASIC});eo(t,n);let i=Hu(t,e,n,r,Zo(t,e,r));return Gce(t,e,r,i)}function Zo(t,e,r){let n=(0,$ce.default)((0,Z1.default)(r.definition,i=>eF(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:Hce(t,n)}function tF(t,e,r,n,i){let a=n.left,o=n.right,s=rr(t,e,r,{type:Z.ATN_PLUS_LOOP_BACK});eo(t,s);let u=rr(t,e,r,{type:Z.ATN_LOOP_END});return a.loopback=s,u.loopback=s,t.decisionMap[Nc(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=s,Ht(o,s),i===void 0?(Ht(s,a),Ht(s,u)):(Ht(s,u),Ht(s,i.left),Ht(i.right,a)),{left:a,right:u}}function rF(t,e,r,n,i){let a=n.left,o=n.right,s=rr(t,e,r,{type:Z.ATN_STAR_LOOP_ENTRY});eo(t,s);let u=rr(t,e,r,{type:Z.ATN_LOOP_END}),l=rr(t,e,r,{type:Z.ATN_STAR_LOOP_BACK});return s.loopback=l,u.loopback=l,Ht(s,a),Ht(s,u),Ht(o,l),i!==void 0?(Ht(l,u),Ht(l,i.left),Ht(i.right,a)):Ht(l,s),t.decisionMap[Nc(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=s,{left:s,right:u}}function Gce(t,e,r,n){let i=n.left,a=n.right;return Ht(i,a),t.decisionMap[Nc(e,"Option",r.idx)]=i,n}function eo(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function Hu(t,e,r,n,...i){let a=rr(t,e,n,{type:Z.ATN_BLOCK_END,start:r});r.end=a;for(let s of i)s!==void 0?(Ht(r,s.left),Ht(s.right,a)):Ht(r,a);let o={left:r,right:a};return t.decisionMap[Nc(e,Uce(n),n.idx)]=r,o}function Uce(t){if(t instanceof Vr.Alternation)return"Alternation";if(t instanceof Vr.Option)return"Option";if(t instanceof Vr.Repetition)return"Repetition";if(t instanceof Vr.RepetitionWithSeparator)return"RepetitionWithSeparator";if(t instanceof Vr.RepetitionMandatory)return"RepetitionMandatory";if(t instanceof Vr.RepetitionMandatoryWithSeparator)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function Hce(t,e){let r=e.length;for(let a=0;a<r-1;a++){let o=e[a],s;o.left.transitions.length===1&&(s=o.left.transitions[0]);let u=s instanceof wc,l=s,c=e[a+1].left;o.left.type===Z.ATN_BASIC&&o.right.type===Z.ATN_BASIC&&s!==void 0&&(u&&l.followState===o.right||s.target===o.right)?(u?l.followState=c:s.target=c,Bce(t,o.right)):Ht(o.right,c)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function Eb(t,e,r,n){let i=rr(t,e,n,{type:Z.ATN_BASIC}),a=rr(t,e,n,{type:Z.ATN_BASIC});return Pb(i,new wm(a,r)),{left:i,right:a}}function Kce(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),a=rr(t,e,r,{type:Z.ATN_BASIC}),o=rr(t,e,r,{type:Z.ATN_BASIC}),s=new wc(i,n,o);return Pb(a,s),{left:a,right:o}}function Wce(t,e,r){let n=t.ruleToStartState.get(e);Ht(n,r.left);let i=t.ruleToStopState.get(e);return Ht(r.right,i),{left:n,right:i}}function Ht(t,e){let r=new Nm(e);Pb(t,r)}function rr(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function Pb(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function Bce(t,e){t.states.splice(t.states.indexOf(e),1)}});var aF=d(ki=>{"use strict";var Vce=ki&&ki.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ki,"__esModule",{value:!0});ki.getATNConfigKey=ki.ATNConfigSet=ki.DFA_ERROR=void 0;var zce=Vce(Zt());ki.DFA_ERROR={};var kb=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=iF(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return(0,zce.default)(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};ki.ATNConfigSet=kb;function iF(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}ki.getATNConfigKey=iF});var sF=d((N0e,oF)=>{var Yce=su();function Xce(t,e,r){for(var n=-1,i=t.length;++n<i;){var a=t[n],o=e(a);if(o!=null&&(s===void 0?o===o&&!Yce(o):r(o,s)))var s=o,u=a}return u}oF.exports=Xce});var lF=d((D0e,uF)=>{function Jce(t,e){return t<e}uF.exports=Jce});var fF=d(($0e,cF)=>{var Qce=sF(),Zce=lF(),efe=Fo();function tfe(t){return t&&t.length?Qce(t,efe,Zce):void 0}cF.exports=tfe});var pF=d((O0e,dF)=>{var rfe=En(),nfe=SR();function ife(t,e){return t&&t.length?nfe(t,rfe(e,2)):[]}dF.exports=ife});var _F=d(Ku=>{"use strict";var ro=Ku&&Ku.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ku,"__esModule",{value:!0});Ku.LLStarLookaheadStrategy=void 0;var sn=Qo(),ri=nF(),to=aF(),afe=ro(fF()),ofe=ro(rm()),sfe=ro(pF()),Dc=ro(Zt()),ufe=ro(Qn()),wb=ro(er()),lfe=ro(tn()),mF=ro(na());function cfe(t,e){let r={};return n=>{let i=n.toString(),a=r[i];return a!==void 0||(a={atnStartState:t,decision:e,states:{}},r[i]=a),a}}var Dm=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},hF=new Dm,Db=class extends sn.LLkLookaheadStrategy{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=(0,ri.createATN)(e.rules),this.dfas=ffe(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,ri.buildATNKey)(n,"Alternation",r),c=this.atn.decisionMap[u].decision,p=(0,Dc.default)((0,sn.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),h=>(0,Dc.default)(h,R=>R[0]));if(yF(p,!1)&&!a){let h=(0,mF.default)(p,(R,y,A)=>((0,wb.default)(y,w=>{w&&(R[w.tokenTypeIdx]=A,(0,wb.default)(w.categoryMatches,P=>{R[P]=A}))}),R),{});return i?function(R){var y;let A=this.LA(1),w=h[A.tokenTypeIdx];if(R!==void 0&&w!==void 0){let P=(y=R[w])===null||y===void 0?void 0:y.GATE;if(P!==void 0&&P.call(this)===!1)return}return w}:function(){let R=this.LA(1);return h[R.tokenTypeIdx]}}else return i?function(h){let R=new Dm,y=h===void 0?0:h.length;for(let w=0;w<y;w++){let P=h?.[w].GATE;R.set(w,P===void 0||P.call(this))}let A=Nb.call(this,o,c,R,s);return typeof A=="number"?A:void 0}:function(){let h=Nb.call(this,o,c,hF,s);return typeof h=="number"?h:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,ri.buildATNKey)(n,i,r),c=this.atn.decisionMap[u].decision,p=(0,Dc.default)((0,sn.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:i,rule:n}),h=>(0,Dc.default)(h,R=>R[0]));if(yF(p)&&p[0][0]&&!a){let h=p[0],R=(0,ufe.default)(h);if(R.length===1&&(0,lfe.default)(R[0].categoryMatches)){let A=R[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===A}}else{let y=(0,mF.default)(R,(A,w)=>(w!==void 0&&(A[w.tokenTypeIdx]=!0,(0,wb.default)(w.categoryMatches,P=>{A[P]=!0})),A),{});return function(){let A=this.LA(1);return y[A.tokenTypeIdx]===!0}}}return function(){let h=Nb.call(this,o,c,hF,s);return typeof h=="object"?!1:h===0}}};Ku.LLStarLookaheadStrategy=Db;function yF(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let a of n){if(a===void 0){if(e)break;return!1}let o=[a.tokenTypeIdx].concat(a.categoryMatches);for(let s of o)if(r.has(s)){if(!i.has(s))return!1}else r.add(s),i.add(s)}}return!0}function ffe(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=cfe(t.decisionStates[n],n);return r}function Nb(t,e,r,n){let i=t[e](r),a=i.start;if(a===void 0){let s=bfe(i.atnStartState);a=TF(i,vF(s)),i.start=a}return dfe.apply(this,[i,a,r,n])}function dfe(t,e,r,n){let i=e,a=1,o=[],s=this.LA(a++);for(;;){let u=vfe(i,s);if(u===void 0&&(u=pfe.apply(this,[t,i,s,a,r,n])),u===to.DFA_ERROR)return gfe(o,i,s);if(u.isAcceptState===!0)return u.prediction;i=u,o.push(s),s=this.LA(a++)}}function pfe(t,e,r,n,i,a){let o=Tfe(e.configs,r,i);if(o.size===0)return gF(t,e,r,to.DFA_ERROR),to.DFA_ERROR;let s=vF(o),u=Rfe(o,i);if(u!==void 0)s.isAcceptState=!0,s.prediction=u,s.configs.uniqueAlt=u;else if(Efe(o)){let l=(0,afe.default)(o.alts);s.isAcceptState=!0,s.prediction=l,s.configs.uniqueAlt=l,mfe.apply(this,[t,n,o.alts,a])}return s=gF(t,e,r,s),s}function mfe(t,e,r,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let a=t.atnStartState,o=a.rule,s=a.production,u=hfe({topLevelRule:o,ambiguityIndices:r,production:s,prefixPath:i});n(u)}function hfe(t){let e=(0,Dc.default)(t.prefixPath,i=>(0,sn.tokenLabel)(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${yfe(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function yfe(t){if(t instanceof sn.NonTerminal)return"SUBRULE";if(t instanceof sn.Option)return"OPTION";if(t instanceof sn.Alternation)return"OR";if(t instanceof sn.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof sn.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof sn.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof sn.Repetition)return"MANY";if(t instanceof sn.Terminal)return"CONSUME";throw Error("non exhaustive match")}function gfe(t,e,r){let n=(0,ofe.default)(e.configs.elements,a=>a.state.transitions),i=(0,sfe.default)(n.filter(a=>a instanceof ri.AtomTransition).map(a=>a.tokenType),a=>a.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function vfe(t,e){return t.edges[e.tokenTypeIdx]}function Tfe(t,e,r){let n=new to.ATNConfigSet,i=[];for(let o of t.elements){if(r.is(o.alt)===!1)continue;if(o.state.type===ri.ATN_RULE_STOP){i.push(o);continue}let s=o.state.transitions.length;for(let u=0;u<s;u++){let l=o.state.transitions[u],c=_fe(l,e);c!==void 0&&n.add({state:c,alt:o.alt,stack:o.stack})}}let a;if(i.length===0&&n.size===1&&(a=n),a===void 0){a=new to.ATNConfigSet;for(let o of n.elements)$m(o,a)}if(i.length>0&&!Cfe(a))for(let o of i)a.add(o);return a}function _fe(t,e){if(t instanceof ri.AtomTransition&&(0,sn.tokenMatcher)(e,t.tokenType))return t.target}function Rfe(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function vF(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function gF(t,e,r,n){return n=TF(t,n),e.edges[r.tokenTypeIdx]=n,n}function TF(t,e){if(e===to.DFA_ERROR)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function bfe(t){let e=new to.ATNConfigSet,r=t.transitions.length;for(let n=0;n<r;n++){let a={state:t.transitions[n].target,alt:n,stack:[]};$m(a,e)}return e}function $m(t,e){let r=t.state;if(r.type===ri.ATN_RULE_STOP){if(t.stack.length>0){let i=[...t.stack],o={state:i.pop(),alt:t.alt,stack:i};$m(o,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let a=r.transitions[i],o=Sfe(t,a);o!==void 0&&$m(o,e)}}function Sfe(t,e){if(e instanceof ri.EpsilonTransition)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof ri.RuleTransition){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function Cfe(t){for(let e of t.elements)if(e.state.type===ri.ATN_RULE_STOP)return!0;return!1}function Afe(t){for(let e of t.elements)if(e.state.type!==ri.ATN_RULE_STOP)return!1;return!0}function Efe(t){if(Afe(t))return!0;let e=Pfe(t.elements);return kfe(e)&&!wfe(e)}function Pfe(t){let e=new Map;for(let r of t){let n=(0,to.getATNConfigKey)(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function kfe(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function wfe(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}});var RF=d(Om=>{"use strict";Object.defineProperty(Om,"__esModule",{value:!0});Om.LLStarLookaheadStrategy=void 0;var Nfe=_F();Object.defineProperty(Om,"LLStarLookaheadStrategy",{enumerable:!0,get:function(){return Nfe.LLStarLookaheadStrategy}})});var Ib=d(Nn=>{"use strict";Object.defineProperty(Nn,"__esModule",{value:!0});Nn.RootCstNodeImpl=Nn.CompositeCstNodeImpl=Nn.LeafCstNodeImpl=Nn.AbstractCstNode=Nn.CstNodeBuilder=void 0;var bF=yo(),Dfe=mr(),SF=ze(),$b=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new Im(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new Ic;return r.feature=e,r.root=this.rootNode,this.current.children.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new Oc(e.startOffset,e.image.length,(0,SF.tokenToRange)(e),e.tokenType,!1);return n.feature=r,n.root=this.rootNode,this.current.children.push(n),n}removeNode(e){let r=e.parent;if(r){let n=r.children.indexOf(e);n>=0&&r.children.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.element=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.children.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new Oc(r.startOffset,r.image.length,(0,SF.tokenToRange)(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let a=0;a<e.children.length;a++){let o=e.children[a],{offset:s,end:u}=o;if((0,Dfe.isCompositeCstNode)(o)&&n>s&&i<u){this.addHiddenToken(o,r);return}else if(i<=s){e.children.splice(a,0,r);return}}e.children.push(r)}};Nn.CstNodeBuilder=$b;var $c=class{get hidden(){return!1}get element(){var e,r;let n=typeof((e=this._element)===null||e===void 0?void 0:e.$type)=="string"?this._element:(r=this.parent)===null||r===void 0?void 0:r.element;if(!n)throw new Error("This node has no associated AST element");return n}set element(e){this._element=e}get text(){return this.root.fullText.substring(this.offset,this.end)}};Nn.AbstractCstNode=$c;var Oc=class extends $c{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,a=!1){super(),this._hidden=a,this._offset=e,this._tokenType=i,this._length=r,this._range=n}};Nn.LeafCstNodeImpl=Oc;var Ic=class extends $c{constructor(){super(...arguments),this.children=new Ob(this)}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:bF.Position.create(0,0),end:bF.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.children)if(!e.hidden)return e;return this.children[0]}get lastNonHiddenNode(){for(let e=this.children.length-1;e>=0;e--){let r=this.children[e];if(!r.hidden)return r}return this.children[this.children.length-1]}};Nn.CompositeCstNodeImpl=Ic;var Ob=class t extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,t.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.parent=this.parent}},Im=class extends Ic{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};Nn.RootCstNodeImpl=Im});var Mm=d(Or=>{"use strict";Object.defineProperty(Or,"__esModule",{value:!0});Or.LangiumCompletionParser=Or.LangiumParserErrorMessageProvider=Or.LangiumParser=Or.AbstractLangiumParser=Or.DatatypeSymbol=void 0;var Lm=Qo(),$fe=RF(),xm=je(),CF=Jt(),AF=Ie(),Ofe=Ib();Or.DatatypeSymbol=Symbol("Datatype");function xb(t){return t.$type===Or.DatatypeSymbol}var EF="\u200B",PF=t=>t.endsWith(EF)?t:t+EF,xc=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new Mb(r,e.parser.ParserConfig)}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}};Or.AbstractLangiumParser=xc;var Lb=class extends xc{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new Ofe.CstNodeBuilder,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:(0,CF.isDataTypeRule)(e)?Or.DatatypeSymbol:(0,CF.getTypeName)(e),i=this.wrapper.DEFINE_RULE(PF(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let a={$type:e};this.stack.push(a),e===Or.DatatypeSymbol&&(a.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let a=this.nodeBuilder.buildLeafNode(i,n),{assignment:o,isCrossRef:s}=this.getAssignment(n),u=this.current;if(o){let l=(0,xm.isKeyword)(n)?i.image:this.converter.convert(i.image,a);this.assign(o.operator,o.feature,l,a,s)}else if(xb(u)){let l=i.image;(0,xm.isKeyword)(n)||(l=this.converter.convert(l,a).toString()),u.value+=l}}}subrule(e,r,n,i){let a;this.isRecording()||(a=this.nodeBuilder.buildCompositeNode(n));let o=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&a&&a.length>0&&this.performSubruleAssignment(o,n,a)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:a}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,a);else if(!i){let o=this.current;if(xb(o))o.value+=e.toString();else{let s=e.$type,u=this.assignWithoutOverride(e,o);s&&(u.$type=s);let l=u;this.stack.pop(),this.stack.push(l)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let a=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(a)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return(0,AF.linkContentToContainer)(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),xb(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=(0,AF.getContainerOfType)(e,xm.isAssignment);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?(0,xm.isCrossReference)(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,a){let o=this.current,s;switch(a&&typeof n=="string"?s=this.linker.buildReference(o,r,i,n):s=n,e){case"=":{o[r]=s;break}case"?=":{o[r]=!0;break}case"+=":Array.isArray(o[r])||(o[r]=[]),o[r].push(s)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let a=e[n];a===void 0?e[n]=i:Array.isArray(a)&&Array.isArray(i)&&(i.push(...a),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}};Or.LangiumParser=Lb;var qm=class{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}buildNoViableAltMessage(e){return Lm.defaultParserErrorProvider.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return Lm.defaultParserErrorProvider.buildEarlyExitMessage(e)}};Or.LangiumParserErrorMessageProvider=qm;var qb=class extends xc{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(PF(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}};Or.LangiumCompletionParser=qb;var Ife={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new qm},Mb=class extends Lm.EmbeddedActionsParser{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},Ife),{lookaheadStrategy:n?new Lm.LLkLookaheadStrategy({maxLookahead:r.maxLookahead}):new $fe.LLStarLookaheadStrategy}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}}});var jb=d(Wu=>{"use strict";Object.defineProperty(Wu,"__esModule",{value:!0});Wu.assertUnreachable=Wu.ErrorWithLocation=void 0;var Fb=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};Wu.ErrorWithLocation=Fb;function xfe(t){throw new Error("Error! The input value was not handled.")}Wu.assertUnreachable=xfe});var Ub=d(jm=>{"use strict";Object.defineProperty(jm,"__esModule",{value:!0});jm.createParser=void 0;var kF=Qo(),Qe=je(),Lc=jb(),Lfe=Xt(),wF=Jt(),NF=Nt();function qfe(t,e,r){return Mfe({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}jm.createParser=qfe;function Mfe(t,e){let r=(0,NF.getAllReachableRules)(e,!1),n=(0,Lfe.stream)(e.rules).filter(Qe.isParserRule).filter(i=>r.has(i));for(let i of n){let a=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});a.rules.set(i.name,t.parser.rule(i,es(a,i.definition)))}}function es(t,e,r=!1){let n;if((0,Qe.isKeyword)(e))n=Wfe(t,e);else if((0,Qe.isAction)(e))n=Ffe(t,e);else if((0,Qe.isAssignment)(e))n=es(t,e.terminal);else if((0,Qe.isCrossReference)(e))n=DF(t,e);else if((0,Qe.isRuleCall)(e))n=jfe(t,e);else if((0,Qe.isAlternatives)(e))n=Ufe(t,e);else if((0,Qe.isUnorderedGroup)(e))n=Hfe(t,e);else if((0,Qe.isGroup)(e))n=Kfe(t,e);else throw new Lc.ErrorWithLocation(e.$cstNode,`Unexpected element type: ${e.$type}`);return $F(t,r?void 0:Fm(e),n,e.cardinality)}function Ffe(t,e){let r=(0,wF.getTypeName)(e);return()=>t.parser.action(r,e)}function jfe(t,e){let r=e.rule.ref;if((0,Qe.isParserRule)(r)){let n=t.subrule++,i=e.arguments.length>0?Gfe(r,e.arguments):()=>({});return a=>t.parser.subrule(n,OF(t,r),e,i(a))}else if((0,Qe.isTerminalRule)(r)){let n=t.consume++,i=Gb(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)(0,Lc.assertUnreachable)(r);else throw new Lc.ErrorWithLocation(e.$cstNode,`Undefined rule type: ${e.$type}`)}function Gfe(t,e){let r=e.map(n=>pa(n.value));return n=>{let i={};for(let a=0;a<r.length;a++){let o=t.parameters[a],s=r[a];i[o.name]=s(n)}return i}}function pa(t){if((0,Qe.isDisjunction)(t)){let e=pa(t.left),r=pa(t.right);return n=>e(n)||r(n)}else if((0,Qe.isConjunction)(t)){let e=pa(t.left),r=pa(t.right);return n=>e(n)&&r(n)}else if((0,Qe.isNegation)(t)){let e=pa(t.value);return r=>!e(r)}else if((0,Qe.isParameterReference)(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if((0,Qe.isLiteralCondition)(t)){let e=!!t.true;return()=>e}(0,Lc.assertUnreachable)(t)}function Ufe(t,e){if(e.elements.length===1)return es(t,e.elements[0]);{let r=[];for(let i of e.elements){let a={ALT:es(t,i,!0)},o=Fm(i);o&&(a.GATE=pa(o)),r.push(a)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(a=>{let o={ALT:()=>a.ALT(i)},s=a.GATE;return s&&(o.GATE=()=>s(i)),o}))}}function Hfe(t,e){if(e.elements.length===1)return es(t,e.elements[0]);let r=[];for(let s of e.elements){let u={ALT:es(t,s,!0)},l=Fm(s);l&&(u.GATE=pa(l)),r.push(u)}let n=t.or++,i=(s,u)=>{let l=u.getRuleStack().join("-");return`uGroup_${s}_${l}`},a=s=>t.parser.alternatives(n,r.map((u,l)=>{let c={ALT:()=>!0},p=t.parser;c.ALT=()=>{if(u.ALT(s),!p.isRecording()){let R=i(n,p);p.unorderedGroups.get(R)||p.unorderedGroups.set(R,[]);let y=p.unorderedGroups.get(R);typeof y?.[l]>"u"&&(y[l]=!0)}};let h=u.GATE;return h?c.GATE=()=>h(s):c.GATE=()=>{let R=p.unorderedGroups.get(i(n,p));return!R?.[l]},c})),o=$F(t,Fm(e),a,"*");return s=>{o(s),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function Kfe(t,e){let r=e.elements.map(n=>es(t,n));return n=>r.forEach(i=>i(n))}function Fm(t){if((0,Qe.isGroup)(t))return t.guardCondition}function DF(t,e,r=e.terminal){if(r)if((0,Qe.isRuleCall)(r)&&(0,Qe.isParserRule)(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,OF(t,r.rule.ref),e,i)}else if((0,Qe.isRuleCall)(r)&&(0,Qe.isTerminalRule)(r.rule.ref)){let n=t.consume++,i=Gb(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if((0,Qe.isKeyword)(r)){let n=t.consume++,i=Gb(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=(0,NF.findNameAssignment)(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+(0,wF.getTypeName)(e.type.ref));return DF(t,e,i)}}function Wfe(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function $F(t,e,r,n){let i=e&&pa(e);if(!n)if(i){let a=t.or++;return o=>t.parser.alternatives(a,[{ALT:()=>r(o),GATE:()=>i(o)},{ALT:(0,kF.EMPTY_ALT)(),GATE:()=>!i(o)}])}else return r;if(n==="*"){let a=t.many++;return o=>t.parser.many(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else if(n==="+"){let a=t.many++;if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>t.parser.atLeastOne(a,{DEF:()=>r(s)}),GATE:()=>i(s)},{ALT:(0,kF.EMPTY_ALT)(),GATE:()=>!i(s)}])}else return o=>t.parser.atLeastOne(a,{DEF:()=>r(o)})}else if(n==="?"){let a=t.optional++;return o=>t.parser.optional(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else(0,Lc.assertUnreachable)(n)}function OF(t,e){let r=Bfe(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function Bfe(t,e){if((0,Qe.isParserRule)(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!(0,Qe.isParserRule)(n);)((0,Qe.isGroup)(n)||(0,Qe.isAlternatives)(n)||(0,Qe.isUnorderedGroup)(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function Gb(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}});var Hb=d(Gm=>{"use strict";Object.defineProperty(Gm,"__esModule",{value:!0});Gm.createCompletionParser=void 0;var Vfe=Mm(),zfe=Ub();function Yfe(t){let e=t.Grammar,r=t.parser.Lexer,n=new Vfe.LangiumCompletionParser(t);return(0,zfe.createParser)(e,n,r.definition),n.finalize(),n}Gm.createCompletionParser=Yfe});var Kb=d(Bu=>{"use strict";Object.defineProperty(Bu,"__esModule",{value:!0});Bu.prepareLangiumParser=Bu.createLangiumParser=void 0;var Xfe=Mm(),Jfe=Ub();function Qfe(t){let e=IF(t);return e.finalize(),e}Bu.createLangiumParser=Qfe;function IF(t){let e=t.Grammar,r=t.parser.Lexer,n=new Xfe.LangiumParser(t);return(0,Jfe.createParser)(e,n,r.definition)}Bu.prepareLangiumParser=IF});var Vb=d(Hm=>{"use strict";Object.defineProperty(Hm,"__esModule",{value:!0});Hm.DefaultTokenBuilder=void 0;var Zfe=Qo(),Wb=je(),ede=Jt(),tde=Ie(),rde=Nt(),Um=ko(),nde=Xt(),Bb=class{buildTokens(e,r){let n=(0,nde.stream)((0,rde.getAllReachableRules)(e,!1)),i=this.buildTerminalTokens(n),a=this.buildKeywordTokens(n,i,r);return i.forEach(o=>{let s=o.PATTERN;typeof s=="object"&&s&&"test"in s&&(0,Um.isWhitespaceRegExp)(s)?a.unshift(o):a.push(o)}),a}buildTerminalTokens(e){return e.filter(Wb.isTerminalRule).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=(0,ede.terminalRegex)(e),n={name:e.name,PATTERN:new RegExp(r)};return e.hidden&&(n.GROUP=(0,Um.isWhitespaceRegExp)(r)?Zfe.Lexer.SKIPPED:"hidden"),n}buildKeywordTokens(e,r,n){return e.filter(Wb.isParserRule).flatMap(i=>(0,tde.streamAllContents)(i).filter(Wb.isKeyword)).distinct(i=>i.value).toArray().sort((i,a)=>a.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,!!n?.caseInsensitive))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp((0,Um.getCaseInsensitivePattern)(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let a=i?.PATTERN;return a?.source&&(0,Um.partialMatches)("^"+a.source+"$",e.value)&&n.push(i),n},[])}};Hm.DefaultTokenBuilder=Bb});var Yb=d(Kt=>{"use strict";Object.defineProperty(Kt,"__esModule",{value:!0});Kt.convertBoolean=Kt.convertNumber=Kt.convertDate=Kt.convertBigint=Kt.convertInt=Kt.convertID=Kt.convertRegexLiteral=Kt.convertString=Kt.DefaultValueConverter=void 0;var xF=je(),ide=Jt(),ade=Nt(),zb=class{convert(e,r){let n=r.feature;if((0,xF.isCrossReference)(n)&&(n=(0,ade.getCrossReferenceTerminal)(n)),(0,xF.isRuleCall)(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return FF(r);case"STRING":return LF(r);case"ID":return MF(r);case"REGEXLITERAL":return qF(r)}switch((i=(0,ide.getRuleType)(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return UF(r);case"boolean":return HF(r);case"bigint":return jF(r);case"date":return GF(r);default:return r}}};Kt.DefaultValueConverter=zb;function LF(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=ode(i)}else e+=n}return e}Kt.convertString=LF;function ode(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function qF(t){return t.substring(1,t.length-1)}Kt.convertRegexLiteral=qF;function MF(t){return t.charAt(0)==="^"?t.substring(1):t}Kt.convertID=MF;function FF(t){return parseInt(t)}Kt.convertInt=FF;function jF(t){return BigInt(t)}Kt.convertBigint=jF;function GF(t){return new Date(t)}Kt.convertDate=GF;function UF(t){return Number(t)}Kt.convertNumber=UF;function HF(t){return t.toLowerCase()==="true"}Kt.convertBoolean=HF});var Qb=d(Wm=>{"use strict";Object.defineProperty(Wm,"__esModule",{value:!0});Wm.DefaultLinker=void 0;var sde=Fe(),Vu=mr(),Km=Ie(),ude=Hr(),Xb=ja(),Jb=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=sde.CancellationToken.None){for(let n of(0,Km.streamAst)(e.parseResult.value))await(0,ude.interruptAndCheck)(r),(0,Km.streamReferences)(n).forEach(i=>this.doLink(i,e));e.state=Xb.DocumentState.Linked}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if((0,Vu.isLinkingError)(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let a=this.loadAstNode(i);n._ref=a??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let a=this,o={$refNode:n,$refText:i,get ref(){var s;if((0,Vu.isAstNode)(this._ref))return this._ref;if((0,Vu.isAstNodeDescription)(this._nodeDescription)){let u=a.loadAstNode(this._nodeDescription);this._ref=u??a.createLinkingError({reference:o,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let u=a.getLinkedNode({reference:o,container:e,property:r});if(u.error&&(0,Km.getDocument)(e).state<Xb.DocumentState.ComputedScopes)return;this._ref=(s=u.node)!==null&&s!==void 0?s:u.error,this._nodeDescription=u.descr}return(0,Vu.isAstNode)(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return(0,Vu.isLinkingError)(this._ref)?this._ref:void 0}};return o}getLinkedNode(e){try{let r=this.getCandidate(e);if((0,Vu.isLinkingError)(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=(0,Km.getDocument)(e.container);n.state<Xb.DocumentState.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};Wm.DefaultLinker=Jb});var eS=d(Bm=>{"use strict";Object.defineProperty(Bm,"__esModule",{value:!0});Bm.DefaultJsonSerializer=void 0;var qc=mr(),lde=Ie(),cde=Nt();function KF(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var Zb=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}serialize(e,r){let n=r?.replacer,i=(o,s)=>this.replacer(o,s,r);return JSON.stringify(e,n?(o,s)=>n(o,s,i):i,r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:a}={}){var o,s,u;if(!this.ignoreProperties.has(e))if((0,qc.isReference)(r)){let l=r.ref,c=n?r.$refText:void 0;return l?{$refText:c,$ref:"#"+(l&&this.astNodeLocator.getAstNodePath(l))}:{$refText:c,$error:(s=(o=r.error)===null||o===void 0?void 0:o.message)!==null&&s!==void 0?s:"Could not resolve reference"}}else{let l;if(a&&(0,qc.isAstNode)(r)&&(l=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&l?.$textRegion))try{l.$textRegion.documentURI=(0,lde.getDocument)(r).uri.toString()}catch{}return i&&!e&&(0,qc.isAstNode)(r)&&(l??(l=Object.assign({},r)),l.$sourceText=(u=r.$cstNode)===null||u===void 0?void 0:u.text),l??r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(a=>!a.startsWith("$")).forEach(a=>{let o=(0,cde.findNodesForProperty)(e.$cstNode,a).map(r);o.length!==0&&(i[a]=o)}),e}}linkNode(e,r,n,i,a){for(let[s,u]of Object.entries(e))if(Array.isArray(u))for(let l=0;l<u.length;l++){let c=u[l];KF(c)?u[l]=this.reviveReference(e,s,r,c):(0,qc.isAstNode)(c)&&this.linkNode(c,r,e,s,l)}else KF(u)?e[s]=this.reviveReference(e,s,r,u):(0,qc.isAstNode)(u)&&this.linkNode(u,r,e,s);let o=e;o.$container=n,o.$containerProperty=i,o.$containerIndex=a}reviveReference(e,r,n,i){let a=i.$refText;if(i.$ref){let o=this.getRefNode(n,i.$ref);return a||(a=this.nameProvider.getName(o)),{$refText:a??"",ref:o}}else if(i.$error){let o={$refText:a??""};return o.error={container:e,property:r,message:i.$error,reference:o},o}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};Bm.DefaultJsonSerializer=Zb});var rS=d(Vm=>{"use strict";Object.defineProperty(Vm,"__esModule",{value:!0});Vm.DefaultServiceRegistry=void 0;var fde=ui(),tS=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=fde.Utils.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};Vm.DefaultServiceRegistry=tS});var iS=d(zm=>{"use strict";Object.defineProperty(zm,"__esModule",{value:!0});zm.ValidationRegistry=void 0;var dde=Hn(),pde=Hr(),nS=class{constructor(e){this.validationChecks=new dde.MultiMap,this.reflection=e.shared.AstReflection}register(e,r=this){for(let[n,i]of Object.entries(e)){let a=i;if(Array.isArray(a))for(let o of a)this.doRegister(n,this.wrapValidationException(o,r));else typeof a=="function"&&this.doRegister(n,this.wrapValidationException(a,r))}}wrapValidationException(e,r){return async(n,i,a)=>{try{await e.call(r,n,i,a)}catch(o){if((0,pde.isOperationCancelled)(o))throw o;console.error("An error occurred during validation:",o);let s=o instanceof Error?o.message:String(o);o instanceof Error&&o.stack&&console.error(o.stack),i("error","An error occurred during validation: "+s,{node:n})}}}doRegister(e,r){for(let n of this.reflection.getAllTypes())this.reflection.isSubtype(n,e)&&this.validationChecks.add(n,r)}getChecks(e){return this.validationChecks.get(e)}};zm.ValidationRegistry=nS});var uS=d(zu=>{"use strict";Object.defineProperty(zu,"__esModule",{value:!0});zu.DefaultReferenceDescriptionProvider=zu.DefaultAstNodeDescriptionProvider=void 0;var mde=Fe(),hde=mr(),Ym=Ie(),aS=ze(),yde=Hr(),gde=Xi(),oS=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=(0,Ym.getDocument)(e)){var i;r??(r=this.nameProvider.getName(e));let a=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${a} has no name.`);let o=(i=this.nameProvider.getNameNode(e))!==null&&i!==void 0?i:e.$cstNode;return{node:e,name:r,nameSegment:(0,aS.toDocumentSegment)(o),selectionSegment:(0,aS.toDocumentSegment)(e.$cstNode),type:e.$type,documentUri:n.uri,path:a}}};zu.DefaultAstNodeDescriptionProvider=oS;var sS=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=mde.CancellationToken.None){let n=[],i=e.parseResult.value;for(let a of(0,Ym.streamAst)(i))await(0,yde.interruptAndCheck)(r),(0,Ym.streamReferences)(a).filter(o=>!(0,hde.isLinkingError)(o)).forEach(o=>{let s=this.createDescription(o);s&&n.push(s)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=(0,Ym.getDocument)(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:(0,aS.toDocumentSegment)(n),local:(0,gde.equalURI)(r.documentUri,i)}}};zu.DefaultReferenceDescriptionProvider=sS});var cS=d(Xm=>{"use strict";Object.defineProperty(Xm,"__esModule",{value:!0});Xm.DefaultAstNodeLocator=void 0;var lS=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,a)=>{if(!i||a.length===0)return i;let o=a.indexOf(this.indexSeparator);if(o>0){let s=a.substring(0,o),u=parseInt(a.substring(o+1)),l=i[s];return l?.[u]}return i[a]},e)}};Xm.DefaultAstNodeLocator=lS});var dS=d(Jm=>{"use strict";Object.defineProperty(Jm,"__esModule",{value:!0});Jm.DefaultConfigurationProvider=void 0;var vde=xt(),fS=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(vde.DidChangeConfigurationNotification.type,{section:i.map(a=>this.toSectionName(a.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,a)=>{this.updateSectionConfiguration(i.section,n[a])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};Jm.DefaultConfigurationProvider=fS});var hS=d(Zm=>{"use strict";Object.defineProperty(Zm,"__esModule",{value:!0});Zm.DefaultDocumentBuilder=void 0;var Qm=Fe(),Tde=Hn(),pS=Hr(),wi=ja(),mS=class{constructor(e){this.updateListeners=[],this.buildPhaseListeners=new Tde.MultiMap,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=Qm.CancellationToken.None){await this.buildDocuments(e,r,n)}async update(e,r,n=Qm.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s);this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s);for(let s of this.updateListeners)s(e,r);await(0,pS.interruptAndCheck)(n);let i=e.map(s=>this.langiumDocuments.getOrCreateDocument(s)),a=this.collectDocuments(i,r),o={validationChecks:"all"};await this.buildDocuments(a,o,n)}onUpdate(e){return this.updateListeners.push(e),Qm.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}collectDocuments(e,r){let n=e.map(o=>o.uri).concat(r),i=this.indexManager.getAffectedDocuments(n).toArray();i.forEach(o=>{this.serviceRegistry.getServices(o.uri).references.Linker.unlink(o),o.state=Math.min(o.state,wi.DocumentState.ComputedScopes)});let a=new Set([...e,...i,...this.langiumDocuments.all.filter(o=>o.state<wi.DocumentState.Validated)]);return Array.from(a)}async buildDocuments(e,r,n){await this.runCancelable(e,wi.DocumentState.Parsed,n,a=>this.langiumDocumentFactory.update(a)),await this.runCancelable(e,wi.DocumentState.IndexedContent,n,a=>this.indexManager.updateContent(a,n)),await this.runCancelable(e,wi.DocumentState.ComputedScopes,n,a=>this.computeScopes(a,n)),await this.runCancelable(e,wi.DocumentState.Linked,n,a=>this.serviceRegistry.getServices(a.uri).references.Linker.link(a,n)),await this.runCancelable(e,wi.DocumentState.IndexedReferences,n,a=>this.indexManager.updateReferences(a,n));let i=e.filter(a=>this.shouldValidate(a,r));await this.runCancelable(i,wi.DocumentState.Validated,n,a=>this.validate(a,n))}async runCancelable(e,r,n,i){let a=e.filter(o=>o.state<r);for(let o of a)await(0,pS.interruptAndCheck)(n),await i(o);await this.notifyBuildPhase(a,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),Qm.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let a of i)await(0,pS.interruptAndCheck)(n),await a(e,n)}async computeScopes(e,r){let n=this.serviceRegistry.getServices(e.uri).references.ScopeComputation;e.precomputedScopes=await n.computeLocalScopes(e,r),e.state=wi.DocumentState.ComputedScopes}shouldValidate(e,r){return r.validationChecks==="all"}async validate(e,r){let i=await this.serviceRegistry.getServices(e.uri).validation.DocumentValidator.validateDocument(e,r);e.diagnostics=i,e.state=wi.DocumentState.Validated}};Zm.DefaultDocumentBuilder=mS});var TS=d(eh=>{"use strict";Object.defineProperty(eh,"__esModule",{value:!0});eh.DefaultIndexManager=void 0;var WF=Fe(),_de=Ie(),yS=Xt(),gS=Xi(),BF=ja(),vS=class{constructor(e){this.simpleIndex=new Map,this.referenceIndex=new Map,this.globalScopeCache=new Map,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection,this.langiumDocuments=()=>e.workspace.LangiumDocuments}findAllReferences(e,r){let n=(0,_de.getDocument)(e).uri,i=[];return this.referenceIndex.forEach(a=>{a.forEach(o=>{(0,gS.equalURI)(o.targetUri,n)&&o.targetPath===r&&i.push(o)})}),(0,yS.stream)(i)}allElements(e=""){this.globalScopeCache.has("")||this.globalScopeCache.set("",Array.from(this.simpleIndex.values()).flat());let r=this.globalScopeCache.get(e);if(r)return(0,yS.stream)(r);{let n=this.globalScopeCache.get("").filter(i=>this.astReflection.isSubtype(i.type,e));return this.globalScopeCache.set(e,n),(0,yS.stream)(n)}}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.referenceIndex.delete(n),this.globalScopeCache.clear()}}async updateContent(e,r=WF.CancellationToken.None){this.globalScopeCache.clear();let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let a of i)a.node=void 0;this.simpleIndex.set(e.uri.toString(),i),e.state=BF.DocumentState.IndexedContent}async updateReferences(e,r=WF.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i),e.state=BF.DocumentState.IndexedReferences}getAffectedDocuments(e){return this.langiumDocuments().all.filter(r=>{if(e.some(n=>(0,gS.equalURI)(r.uri,n)))return!1;for(let n of e)if(this.isAffected(r,n))return!0;return!1})}isAffected(e,r){let n=r.toString(),i=e.uri.toString();if(e.references.some(o=>o.error!==void 0))return!0;let a=this.referenceIndex.get(i);return a?a.filter(o=>!o.local).some(o=>(0,gS.equalURI)(o.targetUri,n)):!1}};eh.DefaultIndexManager=vS});var bS=d(th=>{"use strict";Object.defineProperty(th,"__esModule",{value:!0});th.DefaultWorkspaceManager=void 0;var Rde=Fe(),_S=ui(),bde=Hr(),RS=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=Rde.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(o=>o.LanguageMetaData.fileExtensions),i=[],a=o=>{i.push(o),this.langiumDocuments.hasDocument(o.uri)||this.langiumDocuments.addDocument(o)};await this.loadAdditionalDocuments(e,a),await Promise.all(e.map(o=>[o,this.getRootFolder(o)]).map(async o=>this.traverseFolder(...o,n,a))),await(0,bde.interruptAndCheck)(r),await this.documentBuilder.build(i,void 0,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return _S.URI.parse(e.uri)}async traverseFolder(e,r,n,i){let a=await this.fileSystemProvider.readDirectory(r);await Promise.all(a.map(async o=>{if(this.includeEntry(e,o,n)){if(o.isDirectory)await this.traverseFolder(e,o.uri,n,i);else if(o.isFile){let s=this.langiumDocuments.getOrCreateDocument(o.uri);i(s)}}}))}includeEntry(e,r,n){let i=_S.Utils.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let a=_S.Utils.extname(r.uri);return n.includes(a)}return!1}};th.DefaultWorkspaceManager=RS});var ES=d(Ni=>{"use strict";Object.defineProperty(Ni,"__esModule",{value:!0});Ni.isTokenTypeDictionary=Ni.isIMultiModeLexerDefinition=Ni.isTokenTypeArray=Ni.DefaultLexer=void 0;var Sde=Qo(),SS=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=CS(r)?Object.values(r):r;this.chevrotainLexer=new Sde.Lexer(n)}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(CS(e))return e;let r=AS(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};Ni.DefaultLexer=SS;function VF(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}Ni.isTokenTypeArray=VF;function AS(t){return t&&"modes"in t&&"defaultMode"in t}Ni.isIMultiModeLexerDefinition=AS;function CS(t){return!VF(t)&&!AS(t)}Ni.isTokenTypeDictionary=CS});var NS=d(Yu=>{"use strict";Object.defineProperty(Yu,"__esModule",{value:!0});Yu.isJSDoc=Yu.parseJSDoc=void 0;var He=Fe(),Cde=ui(),Ade=Gf(),Ede=ko();function Pde(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=He.Position.create(0,0));let a=XF(t),o=wS(n),s=Nde({lines:a,position:i,options:o});return xde({index:0,tokens:s,position:i})}Yu.parseJSDoc=Pde;function kde(t,e){let r=wS(e),n=XF(t);if(n.length===0)return!1;let i=n[0],a=n[n.length-1],o=r.start,s=r.end;return!!o?.exec(i)&&!!s?.exec(a)}Yu.isJSDoc=kde;function XF(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(Ade.NEWLINE_REGEXP)}var zF=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,wde=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function Nde(t){var e,r,n;let i=[],a=t.position.line,o=t.position.character;for(let s=0;s<t.lines.length;s++){let u=s===0,l=s===t.lines.length-1,c=t.lines[s],p=0;if(u&&t.options.start){let R=(e=t.options.start)===null||e===void 0?void 0:e.exec(c);R&&(p=R.index+R[0].length)}else{let R=(r=t.options.line)===null||r===void 0?void 0:r.exec(c);R&&(p=R.index+R[0].length)}if(l){let R=(n=t.options.end)===null||n===void 0?void 0:n.exec(c);R&&(c=c.substring(0,R.index))}if(c=c.substring(0,Ide(c)),kS(c,0)>=c.length){if(i.length>0){let R=He.Position.create(a,o);i.push({type:"break",content:"",range:He.Range.create(R,R)})}}else{zF.lastIndex=p;let R=zF.exec(c);if(R){let y=R[0],A=R[1],w=He.Position.create(a,o+p),P=He.Position.create(a,o+p+y.length);i.push({type:"tag",content:A,range:He.Range.create(w,P)}),p+=y.length,p=kS(c,p)}if(p<c.length){let y=c.substring(p),A=Array.from(y.matchAll(wde));i.push(...Dde(A,y,a,o+p))}}a++,o=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function Dde(t,e,r,n){let i=[];if(t.length===0){let a=He.Position.create(r,n),o=He.Position.create(r,n+e.length);i.push({type:"text",content:e,range:He.Range.create(a,o)})}else{let a=0;for(let s of t){let u=s.index,l=e.substring(a,u);l.length>0&&i.push({type:"text",content:e.substring(a,u),range:He.Range.create(He.Position.create(r,a+n),He.Position.create(r,u+n))});let c=l.length+1,p=s[1];if(i.push({type:"inline-tag",content:p,range:He.Range.create(He.Position.create(r,a+c+n),He.Position.create(r,a+c+p.length+n))}),c+=p.length,s.length===4){c+=s[2].length;let h=s[3];i.push({type:"text",content:h,range:He.Range.create(He.Position.create(r,a+c+n),He.Position.create(r,a+c+h.length+n))})}else i.push({type:"text",content:"",range:He.Range.create(He.Position.create(r,a+c+n),He.Position.create(r,a+c+n))});a=u+s[0].length}let o=e.substring(a);o.length>0&&i.push({type:"text",content:o,range:He.Range.create(He.Position.create(r,a+n),He.Position.create(r,a+n+o.length))})}return i}var $de=/\S/,Ode=/\s*$/;function kS(t,e){let r=t.substring(e).match($de);return r?e+r.index:t.length}function Ide(t){let e=t.match(Ode);if(e&&typeof e.index=="number")return e.index}function xde(t){var e,r,n,i;let a=He.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new rh([],He.Range.create(a,a));let o=[];for(;t.index<t.tokens.length;){let l=Lde(t,o[o.length-1]);l&&o.push(l)}let s=(r=(e=o[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:a,u=(i=(n=o[o.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:a;return new rh(o,He.Range.create(s,u))}function Lde(t,e){let r=t.tokens[t.index];if(r.type==="tag")return QF(t,!1);if(r.type==="text"||r.type==="inline-tag")return JF(t);qde(r,e),t.index++}function qde(t,e){if(e){let r=new nh("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function JF(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(Mde(t)),n=e,e=t.tokens[t.index];return new Fc(i,He.Range.create(r.range.start,n.range.end))}function Mde(t){return t.tokens[t.index].type==="inline-tag"?QF(t,!0):ZF(t)}function QF(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let a=ZF(t);return new Mc(n,new Fc([a],a.range),e,He.Range.create(r.range.start,a.range.end))}else{let a=JF(t);return new Mc(n,a,e,He.Range.create(r.range.start,a.range.end))}else{let a=r.range;return new Mc(n,new Fc([],a),e,a)}}function ZF(t){let e=t.tokens[t.index++];return new nh(e.content,e.range)}function wS(t){if(!t)return wS({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:PS(e,!0),end:PS(r,!1),line:PS(n,!0)}}function PS(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?(0,Ede.escapeRegExp)(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var rh=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=YF(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=YF(r)+i}return r.trim()}},Mc=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let a=Fde(this.name,r,e??{});if(typeof a=="string")return a}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function Fde(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let a=e.indexOf(" "),o=e;if(a>0){let u=kS(e,a);o=e.substring(u),e=e.substring(0,a)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(o=`\`${o}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,o))!==null&&i!==void 0?i:jde(e,o)}}function jde(t,e){try{return Cde.URI.parse(t,!0),`[${e}](${t})`}catch{return t}}var Fc=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],a=this.inlines[n+1];r+=i.toMarkdown(e),a&&a.range.start.line>i.range.start.line&&(r+=`
`)}return r}},nh=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function YF(t){return t.endsWith(`
`)?`
`:`

`}});var tj=d(ih=>{"use strict";Object.defineProperty(ih,"__esModule",{value:!0});ih.JSDocDocumentationProvider=void 0;var Gde=mr(),Ude=Ie(),Hde=ze(),ej=NS(),DS=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.grammarConfig=e.parser.GrammarConfig}getDocumentation(e){let r=(0,Hde.findCommentNode)(e.$cstNode,this.grammarConfig.multilineCommentRules);if((0,Gde.isLeafCstNode)(r)&&(0,ej.isJSDoc)(r))return(0,ej.parseJSDoc)(r).toMarkdown({renderLink:(i,a)=>this.documentationLinkRenderer(e,i,a)})}documentationLinkRenderer(e,r,n){var i;let a=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(a&&a.nameSegment){let o=a.nameSegment.range.start.line+1,s=a.nameSegment.range.start.character+1,u=a.documentUri.with({fragment:`L${o},${s}`});return`[${n}](${u.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=(0,Ude.getDocument)(e).precomputedScopes;if(!i)return;let a=e;do{let s=i.get(a).find(u=>u.name===r);if(s)return s;a=a.$container}while(a)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};ih.JSDocDocumentationProvider=DS});var $S=d(no=>{"use strict";var Kde=no&&no.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),rj=no&&no.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Kde(e,t,r)};Object.defineProperty(no,"__esModule",{value:!0});rj(tj(),no);rj(NS(),no)});var np=d(Xu=>{"use strict";Object.defineProperty(Xu,"__esModule",{value:!0});Xu.createDefaultSharedModule=Xu.createDefaultModule=void 0;var Wde=Fe(),Bde=(ag(),XS(ig)),Vde=I_(),zde=Hb(),Yde=Fd(),Xde=t_(),Jde=n_(),Qde=Cd(),Zde=ZT(),epe=o_(),tpe=h_(),rpe=g_(),npe=T_(),ipe=Kb(),ape=Vb(),ope=Yb(),spe=Qb(),upe=Es(),lpe=Id(),cpe=gd(),fpe=Td(),dpe=eS(),ppe=rS(),mpe=Hr(),hpe=bd(),ype=iS(),nj=uS(),gpe=cS(),vpe=dS(),Tpe=hS(),ij=ja(),_pe=TS(),Rpe=bS(),bpe=ES(),Spe=$S();function Cpe(t){return{documentation:{DocumentationProvider:e=>new Spe.JSDocDocumentationProvider(e)},parser:{GrammarConfig:e=>(0,Vde.createGrammarConfig)(e),LangiumParser:e=>(0,ipe.createLangiumParser)(e),CompletionParser:e=>(0,zde.createCompletionParser)(e),ValueConverter:()=>new ope.DefaultValueConverter,TokenBuilder:()=>new ape.DefaultTokenBuilder,Lexer:e=>new bpe.DefaultLexer(e)},lsp:{CompletionProvider:e=>new Yde.DefaultCompletionProvider(e),DocumentSymbolProvider:e=>new Jde.DefaultDocumentSymbolProvider(e),HoverProvider:e=>new epe.MultilineCommentHoverProvider(e),FoldingRangeProvider:e=>new Qde.DefaultFoldingRangeProvider(e),ReferencesProvider:e=>new rpe.DefaultReferencesProvider(e),DefinitionProvider:e=>new Zde.DefaultDefinitionProvider(e),DocumentHighlightProvider:e=>new Xde.DefaultDocumentHighlightProvider(e),RenameProvider:e=>new npe.DefaultRenameProvider(e)},workspace:{AstNodeLocator:()=>new gpe.DefaultAstNodeLocator,AstNodeDescriptionProvider:e=>new nj.DefaultAstNodeDescriptionProvider(e),ReferenceDescriptionProvider:e=>new nj.DefaultReferenceDescriptionProvider(e)},references:{Linker:e=>new spe.DefaultLinker(e),NameProvider:()=>new upe.DefaultNameProvider,ScopeProvider:e=>new fpe.DefaultScopeProvider(e),ScopeComputation:e=>new cpe.DefaultScopeComputation(e),References:e=>new lpe.DefaultReferences(e)},serializer:{JsonSerializer:e=>new dpe.DefaultJsonSerializer(e)},validation:{DocumentValidator:e=>new hpe.DefaultDocumentValidator(e),ValidationRegistry:e=>new ype.ValidationRegistry(e)},shared:()=>t.shared}}Xu.createDefaultModule=Cpe;function Ape(t){return{ServiceRegistry:()=>new ppe.DefaultServiceRegistry,lsp:{Connection:()=>t.connection,LanguageServer:e=>new tpe.DefaultLanguageServer(e)},workspace:{LangiumDocuments:e=>new ij.DefaultLangiumDocuments(e),LangiumDocumentFactory:e=>new ij.DefaultLangiumDocumentFactory(e),DocumentBuilder:e=>new Tpe.DefaultDocumentBuilder(e),TextDocuments:()=>new Wde.TextDocuments(Bde.TextDocument),IndexManager:e=>new _pe.DefaultIndexManager(e),WorkspaceManager:e=>new Rpe.DefaultWorkspaceManager(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new mpe.MutexLock,ConfigurationProvider:e=>new vpe.DefaultConfigurationProvider(e)}}}Xu.createDefaultSharedModule=Ape});var oj=d(aj=>{"use strict";Object.defineProperty(aj,"__esModule",{value:!0})});var lj=d(io=>{"use strict";Object.defineProperty(io,"__esModule",{value:!0});io.joinTracedToNodeIf=io.joinTracedToNode=io.joinToNode=void 0;var OS=Ro();function sj(t,e=String,{filter:r,prefix:n,suffix:i,separator:a,appendNewLineIfNotEmpty:o}={}){return Ppe(t,(s,u,l,c)=>{if(r&&!r(u,l,c))return s;let p=e(u,l,c);return(s??(s=new OS.CompositeGeneratorNode)).append(n&&n(u,l,c)).append(p).append(i&&i(u,l,c)).appendIf(!c&&p!==void 0,a).appendNewLineIfNotEmptyIf(!s.isEmpty()&&!!o)})}io.joinToNode=sj;function uj(t,e){return(r,n=String,i)=>(0,OS.traceToNode)(t,e)(sj(r,t&&e?(a,o,s)=>(0,OS.traceToNode)(t,e,o)(n(a,o,s)):n,i))}io.joinTracedToNode=uj;function Epe(t,e,r){return t?uj(typeof e=="function"?e():e,r):()=>{}}io.joinTracedToNodeIf=Epe;function Ppe(t,e,r){let n=t[Symbol.iterator](),i=n.next(),a=0,o=r;for(;!i.done;){let s=n.next();o=e(o,i.value,a,!!s.done),i=s,a++}return o}});var cj=d(Ir=>{"use strict";var kpe=Ir&&Ir.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),IS=Ir&&Ir.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&kpe(e,t,r)};Object.defineProperty(Ir,"__esModule",{value:!0});Ir.normalizeEOL=Ir.expandToStringWithNL=Ir.expandToString=void 0;IS(Ro(),Ir);IS(lj(),Ir);IS(_g(),Ir);var xS=Gf();Object.defineProperty(Ir,"expandToString",{enumerable:!0,get:function(){return xS.expandToString}});Object.defineProperty(Ir,"expandToStringWithNL",{enumerable:!0,get:function(){return xS.expandToStringWithNL}});Object.defineProperty(Ir,"normalizeEOL",{enumerable:!0,get:function(){return xS.normalizeEOL}})});var dj=d(fj=>{"use strict";Object.defineProperty(fj,"__esModule",{value:!0})});var pj=d(Di=>{"use strict";var wpe=Di&&Di.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),ah=Di&&Di.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&wpe(e,t,r)};Object.defineProperty(Di,"__esModule",{value:!0});ah(Zg(),Di);ah(I_(),Di);ah(w_(),Di);ah(dj(),Di)});var hj=d(mj=>{"use strict";Object.defineProperty(mj,"__esModule",{value:!0})});var yj=d(zr=>{"use strict";var Npe=zr&&zr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),ao=zr&&zr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Npe(e,t,r)};Object.defineProperty(zr,"__esModule",{value:!0});ao(Hb(),zr);ao(Ib(),zr);ao(Kb(),zr);ao(Mm(),zr);ao(ES(),zr);ao(hj(),zr);ao(Vb(),zr);ao(Yb(),zr)});var gj=d(ni=>{"use strict";var Dpe=ni&&ni.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),jc=ni&&ni.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Dpe(e,t,r)};Object.defineProperty(ni,"__esModule",{value:!0});jc(Qb(),ni);jc(Es(),ni);jc(Id(),ni);jc(gd(),ni);jc(Td(),ni)});var vj=d(ts=>{"use strict";var $pe=ts&&ts.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Ope=ts&&ts.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&$pe(e,t,r)};Object.defineProperty(ts,"__esModule",{value:!0});Ope(eS(),ts)});var Tj=d(xr=>{"use strict";var Ipe=xr&&xr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),ma=xr&&xr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Ipe(e,t,r)};Object.defineProperty(xr,"__esModule",{value:!0});ma(Ie(),xr);ma(Hn(),xr);ma(ze(),xr);ma(jb(),xr);ma(Nt(),xr);ma(Hr(),xr);ma(ko(),xr);ma(Xt(),xr);ma(Xi(),xr)});var Rj=d(oo=>{"use strict";var xpe=oo&&oo.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),_j=oo&&oo.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&xpe(e,t,r)};Object.defineProperty(oo,"__esModule",{value:!0});_j(bd(),oo);_j(iS(),oo)});var bj=d(Yr=>{"use strict";var Lpe=Yr&&Yr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),so=Yr&&Yr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Lpe(e,t,r)};Object.defineProperty(Yr,"__esModule",{value:!0});so(uS(),Yr);so(cS(),Yr);so(dS(),Yr);so(hS(),Yr);so(ja(),Yr);so(N_(),Yr);so(TS(),Yr);so(bS(),Yr)});var un=d(Ze=>{"use strict";var Sj=Ze&&Ze.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),qpe=Ze&&Ze.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),Lr=Ze&&Ze.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Sj(e,t,r)},Mpe=Ze&&Ze.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&Sj(e,t,r);return qpe(e,t),e};Object.defineProperty(Ze,"__esModule",{value:!0});Ze.GrammarAST=void 0;Lr(np(),Ze);Lr(_l(),Ze);Lr(rS(),Ze);Lr(oj(),Ze);Lr(mr(),Ze);Lr($S(),Ze);Lr(cj(),Ze);Lr(pj(),Ze);Lr(R_(),Ze);Lr(yj(),Ze);Lr(gj(),Ze);Lr(vj(),Ze);Lr(Tj(),Ze);Lr(Rj(),Ze);Lr(bj(),Ze);var Fpe=Mpe(je());Ze.GrammarAST=Fpe});var Aj=d((vCe,Cj)=>{"use strict";Cj.exports=Fe()});var Gc=d(f=>{"use strict";Object.defineProperty(f,"__esModule",{value:!0});f.isEventDefn=f.EventDefn=f.isErrorDefn=f.ErrorDefn=f.isEnumVariantUnitDefn=f.EnumVariantUnitDefn=f.isEnumVariantTupleDefn=f.EnumVariantTupleDefn=f.isEnumVariantStructDefn=f.EnumVariantStructDefn=f.isEnumDefn=f.EnumDefn=f.isEmitStmt=f.EmitStmt=f.isDecLiteral=f.DecLiteral=f.isContractDefn=f.ContractDefn=f.isConstStmt=f.ConstStmt=f.isCatchClause=f.CatchClause=f.isBoolLiteral=f.BoolLiteral=f.isBlock=f.Block=f.isAssignStmt=f.AssignStmt=f.isAssignOp=f.AssignOp=f.isArg=f.Arg=f.isTypeExprAtom=f.TypeExprAtom=f.isTypeExpr=f.TypeExpr=f.isStmt=f.Stmt=f.isStateDefn=f.StateDefn=f.isNamedItem=f.NamedItem=f.isLiteral=f.Literal=f.isEnumVariantDefn=f.EnumVariantDefn=f.isDefn=f.Defn=f.isContractMemberDefn=f.ContractMemberDefn=void 0;f.isQueryTupleDefn=f.QueryTupleDefn=f.isQueryDefn=f.QueryDefn=f.isParam=f.Param=f.isNoneLiteral=f.NoneLiteral=f.isMemberAssignStmt=f.MemberAssignStmt=f.isLetStmt=f.LetStmt=f.isIntLiteral=f.IntLiteral=f.isInterfaceDefn=f.InterfaceDefn=f.isInstantiateStmt=f.InstantiateStmt=f.isInstantiateDefn=f.InstantiateDefn=f.isIndexAssignStmt=f.IndexAssignStmt=f.isImportStmt=f.ImportStmt=f.isIfStmt=f.IfStmt=f.isIDENTList=f.IDENTList=f.isForStmt=f.ForStmt=f.isFnDefn=f.FnDefn=f.isFieldAssign=f.FieldAssign=f.isField=f.Field=f.isFailStmt=f.FailStmt=f.isFailExpr=f.FailExpr=f.isExprStmt=f.ExprStmt=f.isExpr=f.Expr=f.isExecTupleDefn=f.ExecTupleDefn=f.isExecStmt=f.ExecStmt=f.isExecDefn=f.ExecDefn=void 0;f.reflection=f.CwScriptAstReflection=f.isShortTryExpr=f.ShortTryExpr=f.isMemberCallExpr=f.MemberCallExpr=f.isBinOpExpr=f.BinOpExpr=f.isUnitDefn=f.UnitDefn=f.isTypeVar=f.TypeVar=f.isTypeRef=f.TypeRef=f.isTypeParam=f.TypeParam=f.isTypeArg=f.TypeArg=f.isTypeAliasDefn=f.TypeAliasDefn=f.isTupleParam=f.TupleParam=f.isTupleField=f.TupleField=f.isTupleDefn=f.TupleDefn=f.isTryCatchElseStmt=f.TryCatchElseStmt=f.isStructDefn=f.StructDefn=f.isStringLiteral=f.StringLiteral=f.isStateMapDefn=f.StateMapDefn=f.isStateItemDefn=f.StateItemDefn=f.isStateBlockDefn=f.StateBlockDefn=f.isSourceFile=f.SourceFile=f.isReturnStmt=f.ReturnStmt=f.isReturnExpr=f.ReturnExpr=void 0;var jpe=un();f.ContractMemberDefn="ContractMemberDefn";function Gpe(t){return f.reflection.isInstance(t,f.ContractMemberDefn)}f.isContractMemberDefn=Gpe;f.Defn="Defn";function Upe(t){return f.reflection.isInstance(t,f.Defn)}f.isDefn=Upe;f.EnumVariantDefn="EnumVariantDefn";function Hpe(t){return f.reflection.isInstance(t,f.EnumVariantDefn)}f.isEnumVariantDefn=Hpe;f.Literal="Literal";function Kpe(t){return f.reflection.isInstance(t,f.Literal)}f.isLiteral=Kpe;f.NamedItem="NamedItem";function Wpe(t){return f.reflection.isInstance(t,f.NamedItem)}f.isNamedItem=Wpe;f.StateDefn="StateDefn";function Bpe(t){return f.reflection.isInstance(t,f.StateDefn)}f.isStateDefn=Bpe;f.Stmt="Stmt";function Vpe(t){return f.reflection.isInstance(t,f.Stmt)}f.isStmt=Vpe;f.TypeExpr="TypeExpr";function zpe(t){return f.reflection.isInstance(t,f.TypeExpr)}f.isTypeExpr=zpe;f.TypeExprAtom="TypeExprAtom";function Ype(t){return f.reflection.isInstance(t,f.TypeExprAtom)}f.isTypeExprAtom=Ype;f.Arg="Arg";function Xpe(t){return f.reflection.isInstance(t,f.Arg)}f.isArg=Xpe;f.AssignOp="AssignOp";function Jpe(t){return f.reflection.isInstance(t,f.AssignOp)}f.isAssignOp=Jpe;f.AssignStmt="AssignStmt";function Qpe(t){return f.reflection.isInstance(t,f.AssignStmt)}f.isAssignStmt=Qpe;f.Block="Block";function Zpe(t){return f.reflection.isInstance(t,f.Block)}f.isBlock=Zpe;f.BoolLiteral="BoolLiteral";function eme(t){return f.reflection.isInstance(t,f.BoolLiteral)}f.isBoolLiteral=eme;f.CatchClause="CatchClause";function tme(t){return f.reflection.isInstance(t,f.CatchClause)}f.isCatchClause=tme;f.ConstStmt="ConstStmt";function rme(t){return f.reflection.isInstance(t,f.ConstStmt)}f.isConstStmt=rme;f.ContractDefn="ContractDefn";function nme(t){return f.reflection.isInstance(t,f.ContractDefn)}f.isContractDefn=nme;f.DecLiteral="DecLiteral";function ime(t){return f.reflection.isInstance(t,f.DecLiteral)}f.isDecLiteral=ime;f.EmitStmt="EmitStmt";function ame(t){return f.reflection.isInstance(t,f.EmitStmt)}f.isEmitStmt=ame;f.EnumDefn="EnumDefn";function ome(t){return f.reflection.isInstance(t,f.EnumDefn)}f.isEnumDefn=ome;f.EnumVariantStructDefn="EnumVariantStructDefn";function sme(t){return f.reflection.isInstance(t,f.EnumVariantStructDefn)}f.isEnumVariantStructDefn=sme;f.EnumVariantTupleDefn="EnumVariantTupleDefn";function ume(t){return f.reflection.isInstance(t,f.EnumVariantTupleDefn)}f.isEnumVariantTupleDefn=ume;f.EnumVariantUnitDefn="EnumVariantUnitDefn";function lme(t){return f.reflection.isInstance(t,f.EnumVariantUnitDefn)}f.isEnumVariantUnitDefn=lme;f.ErrorDefn="ErrorDefn";function cme(t){return f.reflection.isInstance(t,f.ErrorDefn)}f.isErrorDefn=cme;f.EventDefn="EventDefn";function fme(t){return f.reflection.isInstance(t,f.EventDefn)}f.isEventDefn=fme;f.ExecDefn="ExecDefn";function dme(t){return f.reflection.isInstance(t,f.ExecDefn)}f.isExecDefn=dme;f.ExecStmt="ExecStmt";function pme(t){return f.reflection.isInstance(t,f.ExecStmt)}f.isExecStmt=pme;f.ExecTupleDefn="ExecTupleDefn";function mme(t){return f.reflection.isInstance(t,f.ExecTupleDefn)}f.isExecTupleDefn=mme;f.Expr="Expr";function hme(t){return f.reflection.isInstance(t,f.Expr)}f.isExpr=hme;f.ExprStmt="ExprStmt";function yme(t){return f.reflection.isInstance(t,f.ExprStmt)}f.isExprStmt=yme;f.FailExpr="FailExpr";function gme(t){return f.reflection.isInstance(t,f.FailExpr)}f.isFailExpr=gme;f.FailStmt="FailStmt";function vme(t){return f.reflection.isInstance(t,f.FailStmt)}f.isFailStmt=vme;f.Field="Field";function Tme(t){return f.reflection.isInstance(t,f.Field)}f.isField=Tme;f.FieldAssign="FieldAssign";function _me(t){return f.reflection.isInstance(t,f.FieldAssign)}f.isFieldAssign=_me;f.FnDefn="FnDefn";function Rme(t){return f.reflection.isInstance(t,f.FnDefn)}f.isFnDefn=Rme;f.ForStmt="ForStmt";function bme(t){return f.reflection.isInstance(t,f.ForStmt)}f.isForStmt=bme;f.IDENTList="IDENTList";function Sme(t){return f.reflection.isInstance(t,f.IDENTList)}f.isIDENTList=Sme;f.IfStmt="IfStmt";function Cme(t){return f.reflection.isInstance(t,f.IfStmt)}f.isIfStmt=Cme;f.ImportStmt="ImportStmt";function Ame(t){return f.reflection.isInstance(t,f.ImportStmt)}f.isImportStmt=Ame;f.IndexAssignStmt="IndexAssignStmt";function Eme(t){return f.reflection.isInstance(t,f.IndexAssignStmt)}f.isIndexAssignStmt=Eme;f.InstantiateDefn="InstantiateDefn";function Pme(t){return f.reflection.isInstance(t,f.InstantiateDefn)}f.isInstantiateDefn=Pme;f.InstantiateStmt="InstantiateStmt";function kme(t){return f.reflection.isInstance(t,f.InstantiateStmt)}f.isInstantiateStmt=kme;f.InterfaceDefn="InterfaceDefn";function wme(t){return f.reflection.isInstance(t,f.InterfaceDefn)}f.isInterfaceDefn=wme;f.IntLiteral="IntLiteral";function Nme(t){return f.reflection.isInstance(t,f.IntLiteral)}f.isIntLiteral=Nme;f.LetStmt="LetStmt";function Dme(t){return f.reflection.isInstance(t,f.LetStmt)}f.isLetStmt=Dme;f.MemberAssignStmt="MemberAssignStmt";function $me(t){return f.reflection.isInstance(t,f.MemberAssignStmt)}f.isMemberAssignStmt=$me;f.NoneLiteral="NoneLiteral";function Ome(t){return f.reflection.isInstance(t,f.NoneLiteral)}f.isNoneLiteral=Ome;f.Param="Param";function Ime(t){return f.reflection.isInstance(t,f.Param)}f.isParam=Ime;f.QueryDefn="QueryDefn";function xme(t){return f.reflection.isInstance(t,f.QueryDefn)}f.isQueryDefn=xme;f.QueryTupleDefn="QueryTupleDefn";function Lme(t){return f.reflection.isInstance(t,f.QueryTupleDefn)}f.isQueryTupleDefn=Lme;f.ReturnExpr="ReturnExpr";function qme(t){return f.reflection.isInstance(t,f.ReturnExpr)}f.isReturnExpr=qme;f.ReturnStmt="ReturnStmt";function Mme(t){return f.reflection.isInstance(t,f.ReturnStmt)}f.isReturnStmt=Mme;f.SourceFile="SourceFile";function Fme(t){return f.reflection.isInstance(t,f.SourceFile)}f.isSourceFile=Fme;f.StateBlockDefn="StateBlockDefn";function jme(t){return f.reflection.isInstance(t,f.StateBlockDefn)}f.isStateBlockDefn=jme;f.StateItemDefn="StateItemDefn";function Gme(t){return f.reflection.isInstance(t,f.StateItemDefn)}f.isStateItemDefn=Gme;f.StateMapDefn="StateMapDefn";function Ume(t){return f.reflection.isInstance(t,f.StateMapDefn)}f.isStateMapDefn=Ume;f.StringLiteral="StringLiteral";function Hme(t){return f.reflection.isInstance(t,f.StringLiteral)}f.isStringLiteral=Hme;f.StructDefn="StructDefn";function Kme(t){return f.reflection.isInstance(t,f.StructDefn)}f.isStructDefn=Kme;f.TryCatchElseStmt="TryCatchElseStmt";function Wme(t){return f.reflection.isInstance(t,f.TryCatchElseStmt)}f.isTryCatchElseStmt=Wme;f.TupleDefn="TupleDefn";function Bme(t){return f.reflection.isInstance(t,f.TupleDefn)}f.isTupleDefn=Bme;f.TupleField="TupleField";function Vme(t){return f.reflection.isInstance(t,f.TupleField)}f.isTupleField=Vme;f.TupleParam="TupleParam";function zme(t){return f.reflection.isInstance(t,f.TupleParam)}f.isTupleParam=zme;f.TypeAliasDefn="TypeAliasDefn";function Yme(t){return f.reflection.isInstance(t,f.TypeAliasDefn)}f.isTypeAliasDefn=Yme;f.TypeArg="TypeArg";function Xme(t){return f.reflection.isInstance(t,f.TypeArg)}f.isTypeArg=Xme;f.TypeParam="TypeParam";function Jme(t){return f.reflection.isInstance(t,f.TypeParam)}f.isTypeParam=Jme;f.TypeRef="TypeRef";function Qme(t){return f.reflection.isInstance(t,f.TypeRef)}f.isTypeRef=Qme;f.TypeVar="TypeVar";function Zme(t){return f.reflection.isInstance(t,f.TypeVar)}f.isTypeVar=Zme;f.UnitDefn="UnitDefn";function ehe(t){return f.reflection.isInstance(t,f.UnitDefn)}f.isUnitDefn=ehe;f.BinOpExpr="BinOpExpr";function the(t){return f.reflection.isInstance(t,f.BinOpExpr)}f.isBinOpExpr=the;f.MemberCallExpr="MemberCallExpr";function rhe(t){return f.reflection.isInstance(t,f.MemberCallExpr)}f.isMemberCallExpr=rhe;f.ShortTryExpr="ShortTryExpr";function nhe(t){return f.reflection.isInstance(t,f.ShortTryExpr)}f.isShortTryExpr=nhe;var oh=class extends jpe.AbstractAstReflection{getAllTypes(){return["Arg","AssignOp","AssignStmt","BinOpExpr","Block","BoolLiteral","CatchClause","ConstStmt","ContractDefn","ContractMemberDefn","DecLiteral","Defn","EmitStmt","EnumDefn","EnumVariantDefn","EnumVariantStructDefn","EnumVariantTupleDefn","EnumVariantUnitDefn","ErrorDefn","EventDefn","ExecDefn","ExecStmt","ExecTupleDefn","Expr","ExprStmt","FailExpr","FailStmt","Field","FieldAssign","FnDefn","ForStmt","IDENTList","IfStmt","ImportStmt","IndexAssignStmt","InstantiateDefn","InstantiateStmt","IntLiteral","InterfaceDefn","LetStmt","Literal","MemberAssignStmt","MemberCallExpr","NamedItem","NoneLiteral","Param","QueryDefn","QueryTupleDefn","ReturnExpr","ReturnStmt","ShortTryExpr","SourceFile","StateBlockDefn","StateDefn","StateItemDefn","StateMapDefn","Stmt","StringLiteral","StructDefn","TryCatchElseStmt","TupleDefn","TupleField","TupleParam","TypeAliasDefn","TypeArg","TypeExpr","TypeExprAtom","TypeParam","TypeRef","TypeVar","UnitDefn"]}computeIsSubtype(e,r){switch(e){case f.AssignStmt:case f.Defn:case f.EmitStmt:case f.ExecStmt:case f.ExprStmt:case f.FailStmt:case f.ForStmt:case f.IfStmt:case f.ImportStmt:case f.IndexAssignStmt:case f.InstantiateStmt:case f.MemberAssignStmt:case f.ReturnStmt:case f.TryCatchElseStmt:return this.isSubtype(f.Stmt,r);case f.BinOpExpr:case f.MemberCallExpr:case f.ShortTryExpr:return this.isSubtype(f.Expr,r);case f.BoolLiteral:case f.DecLiteral:case f.IntLiteral:case f.NoneLiteral:case f.StringLiteral:return this.isSubtype(f.Literal,r);case f.ConstStmt:case f.LetStmt:return this.isSubtype(f.NamedItem,r)||this.isSubtype(f.Stmt,r);case f.ContractDefn:return this.isSubtype(f.Defn,r)||this.isSubtype(f.NamedItem,r);case f.EnumDefn:case f.ErrorDefn:case f.EventDefn:case f.ExecDefn:case f.ExecTupleDefn:case f.FnDefn:case f.InstantiateDefn:case f.QueryDefn:case f.QueryTupleDefn:case f.StateBlockDefn:case f.StructDefn:case f.TupleDefn:case f.TypeAliasDefn:case f.UnitDefn:return this.isSubtype(f.ContractMemberDefn,r)||this.isSubtype(f.Defn,r)||this.isSubtype(f.NamedItem,r);case f.EnumVariantStructDefn:case f.EnumVariantTupleDefn:case f.EnumVariantUnitDefn:return this.isSubtype(f.EnumVariantDefn,r);case f.InterfaceDefn:return this.isSubtype(f.Defn,r);case f.Param:return this.isSubtype(f.NamedItem,r);case f.StateItemDefn:case f.StateMapDefn:return this.isSubtype(f.StateDefn,r);case f.TypeExprAtom:return this.isSubtype(f.TypeExpr,r);case f.TypeRef:case f.TypeVar:return this.isSubtype(f.TypeExprAtom,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"ContractDefn:base":case"TypeRef:contract":return f.ContractDefn;case"ContractDefn:interfaces":case"InterfaceDefn:base":case"TypeRef:interfaceTy":return f.InterfaceDefn;case"MemberCallExpr:element":return f.NamedItem;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Block":return{name:"Block",mandatory:[{name:"stmts",type:"array"}]};case"ContractDefn":return{name:"ContractDefn",mandatory:[{name:"interfaces",type:"array"},{name:"members",type:"array"}]};case"EnumDefn":return{name:"EnumDefn",mandatory:[{name:"typeParams",type:"array"},{name:"variants",type:"array"}]};case"EnumVariantStructDefn":return{name:"EnumVariantStructDefn",mandatory:[{name:"fields",type:"array"},{name:"params",type:"array"}]};case"EnumVariantTupleDefn":return{name:"EnumVariantTupleDefn",mandatory:[{name:"fields",type:"array"}]};case"ErrorDefn":return{name:"ErrorDefn",mandatory:[{name:"params",type:"array"},{name:"typeParams",type:"array"}]};case"EventDefn":return{name:"EventDefn",mandatory:[{name:"params",type:"array"},{name:"typeParams",type:"array"}]};case"ExecDefn":return{name:"ExecDefn",mandatory:[{name:"params",type:"array"},{name:"typeParams",type:"array"}]};case"ExecTupleDefn":return{name:"ExecTupleDefn",mandatory:[{name:"params",type:"array"},{name:"typeParams",type:"array"}]};case"Expr":return{name:"Expr",mandatory:[{name:"args",type:"array"},{name:"catchClauses",type:"array"},{name:"explicitCall",type:"boolean"}]};case"Field":return{name:"Field",mandatory:[{name:"optional",type:"boolean"}]};case"FnDefn":return{name:"FnDefn",mandatory:[{name:"params",type:"array"},{name:"typeParams",type:"array"}]};case"IDENTList":return{name:"IDENTList",mandatory:[{name:"elems",type:"array"}]};case"InstantiateDefn":return{name:"InstantiateDefn",mandatory:[{name:"params",type:"array"},{name:"typeParams",type:"array"}]};case"InterfaceDefn":return{name:"InterfaceDefn",mandatory:[{name:"members",type:"array"}]};case"Param":return{name:"Param",mandatory:[{name:"optional",type:"boolean"}]};case"QueryDefn":return{name:"QueryDefn",mandatory:[{name:"params",type:"array"},{name:"typeParams",type:"array"}]};case"QueryTupleDefn":return{name:"QueryTupleDefn",mandatory:[{name:"params",type:"array"},{name:"typeParams",type:"array"}]};case"SourceFile":return{name:"SourceFile",mandatory:[{name:"stmts",type:"array"}]};case"StateBlockDefn":return{name:"StateBlockDefn",mandatory:[{name:"stateFields",type:"array"}]};case"StructDefn":return{name:"StructDefn",mandatory:[{name:"fields",type:"array"},{name:"typeParams",type:"array"}]};case"TupleDefn":return{name:"TupleDefn",mandatory:[{name:"fields",type:"array"},{name:"typeParams",type:"array"}]};case"TypeAliasDefn":return{name:"TypeAliasDefn",mandatory:[{name:"typeParams",type:"array"}]};case"UnitDefn":return{name:"UnitDefn",mandatory:[{name:"typeParams",type:"array"}]};case"MemberCallExpr":return{name:"MemberCallExpr",mandatory:[{name:"args",type:"array"},{name:"explicitCall",type:"boolean"}]};default:return{name:e,mandatory:[]}}}};f.CwScriptAstReflection=oh;f.reflection=new oh});var Ej=d(uh=>{"use strict";Object.defineProperty(uh,"__esModule",{value:!0});uh.CWScriptGrammar=void 0;var ihe=un(),sh,ahe=()=>sh??(sh=(0,ihe.loadGrammarFromJson)(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "CWScript",
  "rules": [
    {
      "$type": "ParserRule",
      "name": "SourceFile",
      "entry": true,
      "definition": {
        "$type": "Assignment",
        "feature": "stmts",
        "operator": "+=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@1"
          },
          "arguments": []
        },
        "cardinality": "*"
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Stmt",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@4"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@5"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@3"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@6"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@7"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@8"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@9"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@11"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@10"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@14"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@15"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@16"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@13"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@12"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@18"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ContractMemberDefn",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@21"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@24"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@30"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@31"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@32"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@42"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@41"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@43"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@44"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@45"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Defn",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@21"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@24"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@30"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@31"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@32"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@42"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@41"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@43"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@44"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@45"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ImportStmt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "import"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "items",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@86"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "}"
          },
          {
            "$type": "Keyword",
            "value": "from"
          },
          {
            "$type": "Assignment",
            "feature": "src",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@67"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LetStmt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "let"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ":"
              },
              {
                "$type": "Assignment",
                "feature": "ty",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@74"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ConstStmt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "const"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ":"
              },
              {
                "$type": "Assignment",
                "feature": "ty",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@74"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AssignStmt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "op",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@99"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "MemberAssignStmt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "obj",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "."
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "op",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@99"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "IndexAssignStmt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "obj",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "["
          },
          {
            "$type": "Assignment",
            "feature": "index",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "]"
          },
          {
            "$type": "Assignment",
            "feature": "op",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@99"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TryCatchElseStmt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "expr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@62"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "IfStmt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "expr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@61"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReturnStmt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "expr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@64"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FailStmt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "expr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@65"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ForStmt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "for"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "in"
          },
          {
            "$type": "Assignment",
            "feature": "iter",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "body",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@98"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ExecStmt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "exec!"
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "InstantiateStmt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "instantiate!"
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EmitStmt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "emit!"
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ExprStmt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ContractDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "contract"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "extends"
              },
              {
                "$type": "Assignment",
                "feature": "base",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@19"
                  },
                  "deprecatedSyntax": false
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "implements"
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "interfaces",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@20"
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "interfaces",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@20"
                          },
                          "deprecatedSyntax": false
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ]
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@97"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "InterfaceDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "interface"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "extends"
              },
              {
                "$type": "Assignment",
                "feature": "base",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@20"
                  },
                  "deprecatedSyntax": false
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@97"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StructDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "struct"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@93"
            },
            "arguments": [],
            "cardinality": "?"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@94"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@88"
                },
                "arguments": []
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TupleDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "tuple"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@93"
            },
            "arguments": [],
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@90"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UnitDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "unit"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@93"
            },
            "arguments": [],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EnumDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "enum"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@93"
            },
            "arguments": [],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": "}"
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EnumVariantDefnList",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "variants",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@26"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "variants",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@26"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ",",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EnumVariantDefn",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@27"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@28"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EnumVariantTupleDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@90"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EnumVariantStructDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@94"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@87"
                },
                "arguments": []
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EnumVariantUnitDefn",
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@108"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeAliasDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "type"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@93"
            },
            "arguments": [],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "ty",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@74"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FnDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "fn"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "InstantiateDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "#instantiate"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@93"
            },
            "arguments": [],
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@87"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@33"
            },
            "arguments": [],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "body",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@98"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReturnType",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "->"
          },
          {
            "$type": "Assignment",
            "feature": "returnTy",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@74"
              },
              "arguments": []
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FnSignature",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@93"
            },
            "arguments": [],
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@87"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@33"
            },
            "arguments": [],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TupleFnSignature",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@93"
            },
            "arguments": [],
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@89"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@33"
            },
            "arguments": [],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TupleFnSignatureAndBody",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "body",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@98"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FnSignatureAndBody",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@34"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "body",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@98"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StructSignature",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@93"
            },
            "arguments": [],
            "cardinality": "?"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@91"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@87"
                },
                "arguments": []
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ExecDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "exec"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ExecTupleDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "exec"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "QueryDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "query"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "QueryTupleDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "query"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ErrorDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "error"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@38"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EventDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "event"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@38"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StateBlockDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@104"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "stateFields",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StateDefn",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@47"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@48"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StateItemDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "ty",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@74"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StateMapDefn",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "["
          },
          {
            "$type": "Assignment",
            "feature": "indexTy",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@74"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "]"
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "ty",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@74"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Expr",
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@50"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ShortTryExpr",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@51"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "ShortTryExpr"
                },
                "feature": "lhs",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "??"
              },
              {
                "$type": "Assignment",
                "feature": "rhs",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@51"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "OrExpr",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@52"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "BinOpExpr"
                },
                "feature": "lhs",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "op",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "or"
                }
              },
              {
                "$type": "Assignment",
                "feature": "rhs",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@52"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AndExpr",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@53"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "BinOpExpr"
                },
                "feature": "lhs",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "op",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "and"
                }
              },
              {
                "$type": "Assignment",
                "feature": "rhs",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@53"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EqExpr",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@54"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "BinOpExpr"
                },
                "feature": "lhs",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "op",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "="
                    },
                    {
                      "$type": "Keyword",
                      "value": "!="
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "rhs",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@54"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "InExpr",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@55"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "BinOpExpr"
                },
                "feature": "lhs",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "op",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "in"
                }
              },
              {
                "$type": "Assignment",
                "feature": "rhs",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@55"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AddExpr",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@56"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "BinOpExpr"
                },
                "feature": "lhs",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "op",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "+"
                    },
                    {
                      "$type": "Keyword",
                      "value": "-"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "rhs",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@56"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "MulExpr",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@59"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "BinOpExpr"
                },
                "feature": "lhs",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "op",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "*"
                    },
                    {
                      "$type": "Keyword",
                      "value": "/"
                    },
                    {
                      "$type": "Keyword",
                      "value": "%"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "rhs",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@59"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LiteralExpr",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@66"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FeatureCallExpr",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "MemberCallExpr"
            }
          },
          {
            "$type": "Assignment",
            "feature": "element",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/types@0"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@108"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@84"
            },
            "arguments": [],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "MemberCallExpr",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@60"
                },
                "arguments": []
              },
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Action",
                        "inferredType": {
                          "$type": "InferredType",
                          "name": "MemberCallExpr"
                        },
                        "feature": "previous",
                        "operator": "="
                      },
                      {
                        "$type": "Group",
                        "elements": [
                          {
                            "$type": "Keyword",
                            "value": "."
                          },
                          {
                            "$type": "Assignment",
                            "feature": "element",
                            "operator": "=",
                            "terminal": {
                              "$type": "CrossReference",
                              "type": {
                                "$ref": "#/types@0"
                              },
                              "terminal": {
                                "$type": "RuleCall",
                                "rule": {
                                  "$ref": "#/rules@108"
                                },
                                "arguments": []
                              },
                              "deprecatedSyntax": false
                            }
                          },
                          {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@84"
                            },
                            "arguments": [],
                            "cardinality": "?"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@84"
                    },
                    "arguments": []
                  }
                ],
                "cardinality": "*"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@107"
                },
                "arguments": []
              },
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Action",
                        "inferredType": {
                          "$type": "InferredType",
                          "name": "MemberCallExpr"
                        },
                        "feature": "previous",
                        "operator": "="
                      },
                      {
                        "$type": "Group",
                        "elements": [
                          {
                            "$type": "Keyword",
                            "value": "."
                          },
                          {
                            "$type": "Assignment",
                            "feature": "element",
                            "operator": "=",
                            "terminal": {
                              "$type": "CrossReference",
                              "type": {
                                "$ref": "#/types@0"
                              },
                              "terminal": {
                                "$type": "RuleCall",
                                "rule": {
                                  "$ref": "#/rules@108"
                                },
                                "arguments": []
                              },
                              "deprecatedSyntax": false
                            }
                          },
                          {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@84"
                            },
                            "arguments": [],
                            "cardinality": "?"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@84"
                    },
                    "arguments": []
                  }
                ],
                "cardinality": "*"
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Primary",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@49"
                },
                "arguments": []
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ]
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@57"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@58"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "IfExpr",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "if"
          },
          {
            "$type": "Assignment",
            "feature": "thenBody",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@98"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@49"
                  },
                  "arguments": []
                }
              ]
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "else"
              },
              {
                "$type": "Assignment",
                "feature": "elseBody",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@98"
                      },
                      "arguments": []
                    },
                    {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@49"
                      },
                      "arguments": []
                    }
                  ]
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TryCatchElseExpr",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expr"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "try"
          },
          {
            "$type": "Assignment",
            "feature": "tryBody",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@98"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@49"
                  },
                  "arguments": []
                }
              ]
            }
          },
          {
            "$type": "Assignment",
            "feature": "catchClauses",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@63"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "else"
              },
              {
                "$type": "Assignment",
                "feature": "elseBody",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@98"
                      },
                      "arguments": []
                    },
                    {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@49"
                      },
                      "arguments": []
                    }
                  ]
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CatchClause",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "catch"
          },
          {
            "$type": "Assignment",
            "feature": "ty",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@74"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "body",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@98"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReturnExpr",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "return"
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FailExpr",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "fail!"
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Literal",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@67"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@68"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@69"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@70"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@71"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StringLiteral",
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@102"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "DecLiteral",
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@109"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "IntLiteral",
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@110"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BoolLiteral",
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@101"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NoneLiteral",
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "Keyword",
          "value": "None"
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeExprAtom",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@73"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@75"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeRef",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "contract",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@19"
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Assignment",
            "feature": "interfaceTy",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@20"
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Assignment",
            "feature": "builtin",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "None"
                },
                {
                  "$type": "Keyword",
                  "value": "String"
                },
                {
                  "$type": "Keyword",
                  "value": "Int"
                },
                {
                  "$type": "Keyword",
                  "value": "Dec"
                },
                {
                  "$type": "Keyword",
                  "value": "Bool"
                },
                {
                  "$type": "Keyword",
                  "value": "List"
                }
              ]
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeExpr",
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@72"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeVar",
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@106"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeParam",
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@75"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Param",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "optional",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "?"
            },
            "cardinality": "?"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ":"
              },
              {
                "$type": "Assignment",
                "feature": "ty",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@74"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TupleParam",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "ty",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@74"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "as"
              },
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@108"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TupleField",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "ty",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@74"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "as"
              },
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@108"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Field",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "optional",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "?"
            },
            "cardinality": "?"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ":"
              },
              {
                "$type": "Assignment",
                "feature": "ty",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@74"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FieldAssign",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ":"
              },
              {
                "$type": "Assignment",
                "feature": "value",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@49"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Arg",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@108"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": "="
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeArg",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@75"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": "="
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@74"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ExplicitCallArgs",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "explicitCall",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "("
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "args",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@82"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "args",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@82"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeArgs",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "["
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "args",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@83"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "args",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@83"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "]"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "IDENTList",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "elems",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@108"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "elems",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@108"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenParamList",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "params",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@77"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "params",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@77"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenFieldList",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "fields",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@80"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "fields",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@80"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TupleParamList",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "(["
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "params",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@78"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "params",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@78"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "])"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TupleFieldList",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "(["
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "fields",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@79"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "fields",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@79"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "])"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BraceParamList",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "params",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@77"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "params",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@77"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ",",
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BarParamList",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "|"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "params",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@77"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "params",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@77"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "|"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BrackTypeParamList",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "["
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "typeParams",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@76"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "typeParams",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@76"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "]"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BraceFieldList",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "fields",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@80"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "fields",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@80"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ",",
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ExprList",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "exprs",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@49"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "exprs",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@49"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ],
        "cardinality": "*"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeExprList",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "typeExprs",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@74"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ","
              },
              {
                "$type": "Assignment",
                "feature": "typeExprs",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@74"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ],
        "cardinality": "*"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ContractBlock",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "members",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@2"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Block",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "stmts",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AssignOp",
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "Alternatives",
          "elements": [
            {
              "$type": "Keyword",
              "value": "="
            },
            {
              "$type": "Keyword",
              "value": "+="
            },
            {
              "$type": "Keyword",
              "value": "-="
            },
            {
              "$type": "Keyword",
              "value": "*="
            },
            {
              "$type": "Keyword",
              "value": "/="
            },
            {
              "$type": "Keyword",
              "value": "%="
            }
          ]
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\s+"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "name": "BOOLEAN",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "true"
            }
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "false"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "definition": {
        "$type": "TerminalRuleCall",
        "rule": {
          "$ref": "#/rules@103"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "DQ_STRING",
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "\\""
            }
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@105"
            },
            "cardinality": "*"
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "\\""
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STATE",
      "definition": {
        "$type": "RegexToken",
        "regex": "state(?!\\\\w)"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "fragment": true,
      "name": "DQ_CHAR",
      "definition": {
        "$type": "RegexToken",
        "regex": "[^\\"\\\\\\\\]|(\\\\\\\\.)"
      },
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "PERCENT_NAME",
      "definition": {
        "$type": "RegexToken",
        "regex": "%[_a-zA-z][\\\\w_]*"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "DOLLAR_IDENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "(\\\\$state|\\\\$env|\\\\$)(?!\\\\w)"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "IDENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "#?[_a-zA-z][\\\\w_]*!?"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "DECIMAL",
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@111"
            }
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "."
            }
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@111"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "INTEGER",
      "definition": {
        "$type": "TerminalRuleCall",
        "rule": {
          "$ref": "#/rules@111"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "fragment": true,
      "name": "DEC_DIGITS",
      "definition": {
        "$type": "RegexToken",
        "regex": "[0-9](['_']?[0-9])*"
      },
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\*[\\\\s\\\\'s']*?\\\\*\\\\/"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\/[^\\\\n\\\\r]*"
      },
      "fragment": false
    }
  ],
  "types": [
    {
      "$type": "Type",
      "name": "NamedItem",
      "type": {
        "$type": "UnionType",
        "types": [
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@5"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@6"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@19"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@21"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@22"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@23"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@24"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@30"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@31"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@32"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@40"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@39"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@42"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@41"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@43"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@44"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@45"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@77"
            }
          }
        ]
      }
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "imports": [],
  "interfaces": [],
  "usedGrammars": []
}`));uh.CWScriptGrammar=ahe});var Pj=d(ha=>{"use strict";Object.defineProperty(ha,"__esModule",{value:!0});ha.CWScriptGeneratedModule=ha.CwScriptGeneratedSharedModule=ha.CWScriptLanguageMetaData=void 0;var ohe=Gc(),she=Ej();ha.CWScriptLanguageMetaData={languageId:"cwscript",fileExtensions:[".cws"],caseInsensitive:!1};ha.CwScriptGeneratedSharedModule={AstReflection:()=>new ohe.CwScriptAstReflection};ha.CWScriptGeneratedModule={Grammar:()=>(0,she.CWScriptGrammar)(),LanguageMetaData:()=>ha.CWScriptLanguageMetaData,parser:{}}});var kj=d(Ju=>{"use strict";Object.defineProperty(Ju,"__esModule",{value:!0});Ju.CWScriptValidator=Ju.registerValidationChecks=void 0;function uhe(t){let e=t.validation.ValidationRegistry,r=t.validation.CWScriptValidator,n={};e.register(n,r)}Ju.registerValidationChecks=uhe;var LS=class{};Ju.CWScriptValidator=LS});var wj=d(lh=>{"use strict";Object.defineProperty(lh,"__esModule",{value:!0});lh.CWScriptDocumentSymbolProvider=void 0;var lhe=un(),Xr=Fe(),qS=class extends lhe.DefaultDocumentSymbolProvider{getSymbolKind(e){switch(e){case"ContractDefn":return Xr.SymbolKind.Class;case"InterfaceDefn":return Xr.SymbolKind.Interface;case"FnDefn":return Xr.SymbolKind.Function;case"TypeAliasDefn":return Xr.SymbolKind.Interface;case"EnumDefn":return Xr.SymbolKind.Enum;case"StructDefn":return Xr.SymbolKind.Struct;case"UnitDefn":return Xr.SymbolKind.Interface;case"ErrorDefn":return Xr.SymbolKind.Struct;case"EventDefn":return Xr.SymbolKind.Struct;case"Param":return Xr.SymbolKind.Field;case"Field":return Xr.SymbolKind.Field;case"InstantiateDefn":case"ExecDefn":case"ExecTupleDefn":case"QueryDefn":case"QueryTupleDefn":return Xr.SymbolKind.Method;case"LetStmt":return Xr.SymbolKind.Variable;case"ConstStmt":return Xr.SymbolKind.Constant}return super.getSymbolKind(e)}};lh.CWScriptDocumentSymbolProvider=qS});var Nj=d(pe=>{"use strict";Object.defineProperty(pe,"__esModule",{value:!0});pe.typeVar=pe.enumVariantUnit=pe.enumVariantTuple=pe.enumVariantStruct=pe.enumType=pe.listType=pe.unitType=pe.tupfield=pe.tupleType=pe.structType=pe.field=pe.eventType=pe.errorType=pe.interfaceType=pe.contractType=pe.fnParam=pe.fnType=pe.decType=pe.intType=pe.stringType=pe.boolType=pe.noneType=void 0;function che(){return{$kind:"None"}}pe.noneType=che;function fhe(){return{$kind:"Bool"}}pe.boolType=fhe;function dhe(){return{$kind:"String"}}pe.stringType=dhe;function phe(){return{$kind:"Int"}}pe.intType=phe;function mhe(){return{$kind:"Dec"}}pe.decType=mhe;function hhe(t,e,r){return{$kind:"Fn",fallible:t,params:e,returnTy:r}}pe.fnType=hhe;function yhe(t,e,r){return{name:t,optional:e,ty:r}}pe.fnParam=yhe;function ghe(t,e){return{$kind:"Contract",name:t,ast:e}}pe.contractType=ghe;function vhe(t,e){return{$kind:"Interface",name:t,ast:e}}pe.interfaceType=vhe;function The(t,e,r){return{$kind:"Error",name:t,message:e,ast:r}}pe.errorType=The;function _he(t,e,r){return{$kind:"Event",name:t,fields:e,ast:r}}pe.eventType=_he;function Rhe(t,e,r){return{name:t,optional:e,ty:r}}pe.field=Rhe;function bhe(t,e,r){return{$kind:"Struct",name:t,fields:e,ast:r}}pe.structType=bhe;function She(t,e){return{$kind:"Tuple",fields:t,ast:e}}pe.tupleType=She;function Che(t,e){return{ty:t,label:e}}pe.tupfield=Che;function Ahe(t,e){return{$kind:"Unit",name:t,ast:e}}pe.unitType=Ahe;function Ehe(t){return{$kind:"List",elementTy:t}}pe.listType=Ehe;function Phe(t,e,r){return{$kind:"Enum",name:t,variants:e,ast:r}}pe.enumType=Phe;function khe(t,e,r){return{name:t,fields:e,ast:r}}pe.enumVariantStruct=khe;function whe(t,e,r){return{name:t,fields:e,ast:r}}pe.enumVariantTuple=whe;function Nhe(t,e){return{name:t,ast:e}}pe.enumVariantUnit=Nhe;function Dhe(t,e){return{$kind:"TypeVar",name:t,ast:e}}pe.typeVar=Dhe});var MS=d(Jr=>{"use strict";var $he=Jr&&Jr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Ohe=Jr&&Jr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),Ihe=Jr&&Jr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&$he(e,t,r);return Ohe(e,t),e};Object.defineProperty(Jr,"__esModule",{value:!0});Jr.inferMemberCall=Jr.inferType=Jr.getContractChain=void 0;var qr=Ihe(Gc()),$t=Nj();function xhe(t){var e;let r=new Set,n=t;for(;n&&!r.has(n);)r.add(n),n=(e=n.base)===null||e===void 0?void 0:e.ref;return Array.from(r)}Jr.getContractChain=xhe;function ya(t,e){let r;if(!t)throw new Error("Cannot infer type of undefined node.");if(e.set(t,(0,$t.errorType)("TypeInferenceError","Cannot infer type of undefined node.")),qr.isStringLiteral(t))r=(0,$t.stringType)();else if(qr.isDecLiteral(t))r=(0,$t.decType)();else if(qr.isIntLiteral(t))r=(0,$t.intType)();else if(qr.isNoneLiteral(t))r=(0,$t.stringType)();else if(qr.isBoolLiteral(t))r=(0,$t.boolType)();else if(qr.isFnDefn(t)){let n=ya(t.returnTy,e),i=t.params.map(o=>(0,$t.fnParam)(o.name,o.optional,ya(o.ty,e))),a=t.name.endsWith("!");r=(0,$t.fnType)(a,i,n)}else qr.isMemberCallExpr(t)?(r=Dj(t,e),t.explicitCall&&r.$kind==="Fn"&&(r=r.returnTy)):qr.isLetStmt(t)||qr.isConstStmt(t)?t.ty?r=ya(t.ty,e):t.value?r=ya(t.value,e):r=(0,$t.errorType)("TypeInferenceError","Failed to infer type of let/const"):qr.isParam(t)||qr.isField(t)?r=ya(t.ty,e):qr.isContractDefn(t)?r=(0,$t.contractType)(t.name,t):qr.isBinOpExpr(t)?r=(0,$t.errorType)("TypeInferenceError","Cannot infer type of binary op yet"):qr.isTypeRef(t)?r=Lhe(t,e):qr.isStmt(t)&&(r=(0,$t.noneType)());return r||(r=(0,$t.errorType)("TypeInferenceError",`Failed to infer type of ${t.$type}`)),e.set(t,r),r}Jr.inferType=ya;function Dj(t,e){var r;let n=(r=t.element)===null||r===void 0?void 0:r.ref;return n?ya(n,e):t.previous?ya(t.previous,e):(0,$t.errorType)("TypeInferenceError","Cannot infer type of member call")}Jr.inferMemberCall=Dj;function Lhe(t,e){if(t.builtin){let{builtin:r}=t;if(r==="Int")return(0,$t.intType)();if(r==="String")return(0,$t.stringType)();if(r==="Bool")return(0,$t.boolType)();if(r==="None")return(0,$t.noneType)()}else if(t.contract){if(t.contract.ref)return(0,$t.contractType)(t.contract.ref.name,t.contract.ref)}else if(t.interfaceTy&&t.interfaceTy.ref)return(0,$t.interfaceType)(t.interfaceTy.ref.name,t.interfaceTy.ref);return(0,$t.errorType)("TypeInferenceError","Failed to infer type")}});var $j=d($i=>{"use strict";var qhe=$i&&$i.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Mhe=$i&&$i.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),Fhe=$i&&$i.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&qhe(e,t,r);return Mhe(e,t),e};Object.defineProperty($i,"__esModule",{value:!0});$i.CWScriptHoverProvider=void 0;var jhe=un(),FS=Fhe(Gc()),Ghe=MS();function jS(t){return{contents:{language:"cwscript",kind:"markdown",value:t}}}var GS=class extends jhe.MultilineCommentHoverProvider{getAstNodeHoverContent(e){if(FS.isFnDefn(e))return jS(`fn ${e.name}(${e.params.map(r=>r.name).join(", ")}) -> ${e.returnTy?e.returnTy.$type:"None"}`);if(FS.isParam(e))return jS(`${e.ty.$type}`);if(FS.isLetStmt(e))return jS((0,Ghe.inferType)(e.value,new Map).$kind)}};$i.CWScriptHoverProvider=GS});var Oj=d(ch=>{"use strict";Object.defineProperty(ch,"__esModule",{value:!0});ch.CWScriptFoldingRangeProvider=void 0;var Uhe=un(),US=class extends Uhe.DefaultFoldingRangeProvider{shouldProcess(e){return!0}};ch.CWScriptFoldingRangeProvider=US});var Ij=d(dh=>{"use strict";Object.defineProperty(dh,"__esModule",{value:!0});dh.CWScriptSemanticTokenProvider=void 0;var Hhe=un(),F=yo(),fh=class t extends Hhe.AbstractSemanticTokenProvider{highlightIn(e,r){for(let[n,i]of Object.entries(r))if(n==="$keywords")for(let[a,o]of Object.entries(i))if(typeof o=="string")this.highlightKeyword({node:e,keyword:a,type:o});else if(Array.isArray(o)){let[s,u,l]=o;this.highlightKeyword({node:e,keyword:a,type:s,modifier:u,index:l})}else{let{type:s,modifier:u,index:l}=o;this.highlightKeyword({node:e,keyword:a,type:s,modifier:u,index:l})}else{let a=n.substring(1);if(typeof i=="string")this.highlightProperty({node:e,property:a,type:i});else if(Array.isArray(i)){let[o,s]=i;this.highlightProperty({node:e,property:a,type:o,modifier:s})}else{let{type:o,modifier:s}=i;this.highlightProperty({node:e,property:a,type:o,modifier:s})}}}highlightElement(e,r){let n=t.HIGHLIGHT_TABLE[e.$type];n&&(typeof n=="string"?this.highlightNode({node:e.$cstNode,type:n}):typeof n=="object"&&this.highlightIn(e,n))}};dh.CWScriptSemanticTokenProvider=fh;fh.HIGHLIGHT_TABLE={ContractDefn:{".name":[F.SemanticTokenTypes.class,F.SemanticTokenModifiers.definition],$keywords:{contract:F.SemanticTokenTypes.keyword,extends:F.SemanticTokenTypes.keyword,implements:F.SemanticTokenTypes.keyword}},InterfaceDefn:{".name":[F.SemanticTokenTypes.interface,F.SemanticTokenModifiers.definition],$keywords:{interface:F.SemanticTokenTypes.keyword,extends:F.SemanticTokenTypes.keyword}},Param:{".name":F.SemanticTokenTypes.parameter,".ty":F.SemanticTokenTypes.type,$keywords:{"?":F.SemanticTokenTypes.modifier}},TupleParam:{".name":F.SemanticTokenTypes.parameter,".ty":F.SemanticTokenTypes.type,$keywords:{as:F.SemanticTokenTypes.modifier}},TupleField:{".name":F.SemanticTokenTypes.property,".ty":F.SemanticTokenTypes.type,$keywords:{as:F.SemanticTokenTypes.keyword}},Field:{".name":F.SemanticTokenTypes.property,".ty":F.SemanticTokenTypes.type,$keywords:{"?":F.SemanticTokenTypes.modifier}},FnDefn:{".name":F.SemanticTokenTypes.function,".ty":F.SemanticTokenTypes.type,$keywords:{fn:F.SemanticTokenTypes.keyword,"!":F.SemanticTokenTypes.function,"->":F.SemanticTokenTypes.operator}},Arg:{".name":F.SemanticTokenTypes.parameter,$keywords:{"=":F.SemanticTokenTypes.operator}},TypeAliasDefn:{".name":F.SemanticTokenTypes.type,".ty":F.SemanticTokenTypes.type,$keywords:{type:F.SemanticTokenTypes.keyword,"=":F.SemanticTokenTypes.operator}},ExecDefn:{".name":F.SemanticTokenTypes.method,".returnTy":F.SemanticTokenTypes.type,$keywords:{exec:F.SemanticTokenTypes.keyword,"!":F.SemanticTokenTypes.function,"->":F.SemanticTokenTypes.operator}},ExecTupleDefn:{".name":F.SemanticTokenTypes.method,".returnTy":F.SemanticTokenTypes.type,$keywords:{exec:F.SemanticTokenTypes.keyword,"!":F.SemanticTokenTypes.function,"->":F.SemanticTokenTypes.operator,"([":F.SemanticTokenTypes.operator,"])":F.SemanticTokenTypes.operator}},QueryDefn:{".name":F.SemanticTokenTypes.method,".returnTy":F.SemanticTokenTypes.type,$keywords:{query:F.SemanticTokenTypes.keyword,"!":F.SemanticTokenTypes.function,"->":F.SemanticTokenTypes.operator}},QueryTupleDefn:{".name":F.SemanticTokenTypes.method,".returnTy":F.SemanticTokenTypes.type,$keywords:{query:F.SemanticTokenTypes.keyword,"!":F.SemanticTokenTypes.function,"->":F.SemanticTokenTypes.operator,"([":F.SemanticTokenTypes.operator,"])":F.SemanticTokenTypes.operator}},StructDefn:{".name":F.SemanticTokenTypes.struct,$keywords:{struct:F.SemanticTokenTypes.keyword}},TupleDefn:{".name":F.SemanticTokenTypes.struct,$keywords:{tuple:F.SemanticTokenTypes.keyword,"([":F.SemanticTokenTypes.operator,"])":F.SemanticTokenTypes.operator}},UnitDefn:{".name":F.SemanticTokenTypes.type},TypeVar:{".name":F.SemanticTokenTypes.typeParameter},EnumDefn:{".name":F.SemanticTokenTypes.enum,$keywords:{enum:F.SemanticTokenTypes.keyword}},EnumVariantStructDefn:{".name":F.SemanticTokenTypes.enumMember},EnumVariantTupleDefn:{".name":F.SemanticTokenTypes.enumMember,$keywords:{"([":F.SemanticTokenTypes.operator,"])":F.SemanticTokenTypes.operator}},EnumVariantUnitDefn:{".name":F.SemanticTokenTypes.enumMember},IntLiteral:F.SemanticTokenTypes.number,DecLiteral:F.SemanticTokenTypes.number,StringLiteral:F.SemanticTokenTypes.string,AssignOp:F.SemanticTokenTypes.operator,FailExpr:{$keywords:{fail:F.SemanticTokenTypes.keyword}},ReturnExpr:{$keywords:{return:F.SemanticTokenTypes.keyword}},ForStmt:{$keywords:{for:F.SemanticTokenTypes.keyword,in:F.SemanticTokenTypes.keyword}},TryCatchElseStmt:{$keywords:{try:F.SemanticTokenTypes.keyword,catch:F.SemanticTokenTypes.keyword,else:F.SemanticTokenTypes.keyword}},IfStmt:{$keywords:{if:F.SemanticTokenTypes.keyword,else:F.SemanticTokenTypes.keyword}},LetStmt:{".ty":F.SemanticTokenTypes.type,$keywords:{let:F.SemanticTokenTypes.keyword,":":F.SemanticTokenTypes.operator,"=":F.SemanticTokenTypes.operator}},ConstStmt:{".ty":F.SemanticTokenTypes.type,$keywords:{const:F.SemanticTokenTypes.keyword,":":F.SemanticTokenTypes.operator,"=":F.SemanticTokenTypes.operator}},BoolLiteral:F.SemanticTokenTypes.type,NoneLiteral:F.SemanticTokenTypes.type,StateItemDefn:{".name":F.SemanticTokenTypes.property,".ty":F.SemanticTokenTypes.type,$keywords:{":":F.SemanticTokenTypes.operator}},StateMapDefn:{".name":F.SemanticTokenTypes.property,".indexTy":F.SemanticTokenTypes.type,".ty":F.SemanticTokenTypes.type,$keywords:{":":F.SemanticTokenTypes.operator}},StateBlockDefn:{$keywords:{state:F.SemanticTokenTypes.keyword}},ErrorDefn:{".name":F.SemanticTokenTypes.struct,$keywords:{error:F.SemanticTokenTypes.keyword}},EventDefn:{".name":F.SemanticTokenTypes.event,$keywords:{event:F.SemanticTokenTypes.keyword}},EmitStmt:{$keywords:{"emit!":F.SemanticTokenTypes.keyword}},MemberAssignStmt:{$keywords:{".":F.SemanticTokenTypes.operator,":":F.SemanticTokenTypes.operator}},IndexAssignStmt:{$keywords:{"[":F.SemanticTokenTypes.operator,"]":F.SemanticTokenTypes.operator,":":F.SemanticTokenTypes.operator}},InstantiateStmt:{$keywords:{"instantiate!":F.SemanticTokenTypes.keyword}},ExecStmt:{$keywords:{"exec!":F.SemanticTokenTypes.keyword}}}});var xj=d(ph=>{"use strict";Object.defineProperty(ph,"__esModule",{value:!0});ph.CWScriptSignatureHelpProvider=void 0;var Khe=un(),HS=class extends Khe.AbstractSignatureHelpProvider{getSignatureFromElement(e,r){return{signatures:[]}}};ph.CWScriptSignatureHelpProvider=HS});var qj=d(Oi=>{"use strict";var Whe=Oi&&Oi.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Bhe=Oi&&Oi.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),Vhe=Oi&&Oi.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&Whe(e,t,r);return Bhe(e,t),e};Object.defineProperty(Oi,"__esModule",{value:!0});Oi.CWScriptScopeProvider=void 0;var mh=un(),zhe=Vhe(Gc()),Lj=MS(),KS=class extends mh.DefaultScopeProvider{getScope(e){if(e.property==="element"){if(e.reference.$refText==="$"){let a=(0,mh.getContainerOfType)(e.container,zhe.isContractDefn);return a?this.scopeContractMembers(a):mh.EMPTY_SCOPE}let n=e.container.previous;if(!n)return super.getScope(e);let i=(0,Lj.inferType)(n,new Map);return i.$kind==="Contract"?this.scopeContractMembers(i.ast):mh.EMPTY_SCOPE}return super.getScope(e)}scopeContractMembers(e){let r=(0,Lj.getContractChain)(e).flatMap(i=>i.members);return this.createScopeForNodes(r)}};Oi.CWScriptScopeProvider=KS});var Mj=d(hh=>{"use strict";Object.defineProperty(hh,"__esModule",{value:!0});hh.CWScriptReferences=void 0;var Yhe=un(),WS=class extends Yhe.DefaultReferences{findDeclaration(e){return super.findDeclaration(e)}};hh.CWScriptReferences=WS});var Fj=d(yh=>{"use strict";Object.defineProperty(yh,"__esModule",{value:!0});yh.CWScriptTypeDefinitionProvider=void 0;var Xhe=un(),BS=class extends Xhe.AbstractTypeDefinitionProvider{collectGoToTypeLocationLinks(e,r){return[]}};yh.CWScriptTypeDefinitionProvider=BS});var Uj=d(rs=>{"use strict";Object.defineProperty(rs,"__esModule",{value:!0});rs.createCWScriptServices=rs.CWScriptModule=void 0;var gh=un(),jj=Pj(),Gj=kj(),Jhe=wj(),Qhe=$j(),Zhe=Oj(),eye=Ij(),tye=xj(),rye=qj(),nye=Mj(),iye=Fj();rs.CWScriptModule={validation:{CWScriptValidator:()=>new Gj.CWScriptValidator},references:{References:t=>new nye.CWScriptReferences(t),ScopeProvider:t=>new rye.CWScriptScopeProvider(t)},lsp:{TypeProvider:t=>new iye.CWScriptTypeDefinitionProvider(t),HoverProvider:t=>new Qhe.CWScriptHoverProvider(t),DocumentSymbolProvider:t=>new Jhe.CWScriptDocumentSymbolProvider(t),SignatureHelp:t=>new tye.CWScriptSignatureHelpProvider,SemanticTokenProvider:t=>new eye.CWScriptSemanticTokenProvider(t),FoldingRangeProvider:t=>new Zhe.CWScriptFoldingRangeProvider(t)}};function aye(t){let e=(0,gh.inject)((0,gh.createDefaultSharedModule)(t),jj.CwScriptGeneratedSharedModule),r=(0,gh.inject)((0,gh.createDefaultModule)({shared:e}),jj.CWScriptGeneratedModule,rs.CWScriptModule);return e.ServiceRegistry.register(r),(0,Gj.registerValidationChecks)(r),{shared:e,CWScript:r}}rs.createCWScriptServices=aye});var fye=d(Kj=>{Object.defineProperty(Kj,"__esModule",{value:!0});var Hj=un(),VS=Aj(),oye=Uj(),sye=new VS.BrowserMessageReader(self),uye=new VS.BrowserMessageWriter(self),lye=(0,VS.createConnection)(sye,uye),{shared:cye,CWScript:ICe}=(0,oye.createCWScriptServices)(Object.assign({connection:lye},Hj.EmptyFileSystem));(0,Hj.startLanguageServer)(cye)});fye();})();
