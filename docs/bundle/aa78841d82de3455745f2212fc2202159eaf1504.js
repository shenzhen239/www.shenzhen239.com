(function(){var DOCTYPES,Lemoncup,METHODS,REGULAR_TAGS,SELF_CLOSING_TAGS,fn1,fn2,i,j,lemoncup,len,len1,tag,slice=[].slice,indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1};DOCTYPES={5:"<!DOCTYPE html>"};REGULAR_TAGS="a abbr address article aside audio b bdi bdo blockquote body button canvas caption cite code colgroup datalist dd del details dfn div dl dt em fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup html i iframe ins kbd label legend li main map mark menu meter nav noscript object ol optgroup option output p pre progress q rp rt ruby s samp script section select small span strong sub summary sup style svg table tbody td textarea tfoot th thead time title tr u ul video".split(" ");SELF_CLOSING_TAGS="area base br col command embed hr img input keygen link meta param source track wbr".split(" ");METHODS="comment doctype _escape ie normalizeArgs raw render tag text".split(" ");Lemoncup=function(){function Lemoncup(){this._html=null;this._data=[]}Lemoncup.prototype.clear=function(){return this._data=[]};Lemoncup.prototype.attrOrder=["id","class"];Lemoncup.prototype.resetBuffer=function(html){var previous;if(html==null){html=null}previous=this._html;this._html=html;return previous};Lemoncup.prototype.render=function(){var args,fn,html,name,previous,template;template=arguments[0],args=2<=arguments.length?slice.call(arguments,1):[];for(name in lemoncup){fn=lemoncup[name];if(typeof global!=="undefined"&&global!==null){global[name]=fn}if(typeof window!=="undefined"&&window!==null){window[name]=fn}}previous=this.resetBuffer("");try{template.apply(null,args)}finally{html=this.resetBuffer(previous)}for(name in lemoncup){fn=lemoncup[name];if(typeof global!=="undefined"&&global!==null){delete global[name]}if(typeof window!=="undefined"&&window!==null){delete window[name]}}return html};Lemoncup.prototype.renderAttr=function(name,value){var k,ref,v;if(value==null){return" "+name}if(value===false){return""}if(value===true){value=name}if(name==="data"&&typeof value==="object"){return function(){var results;results=[];for(k in value){v=value[k];results.push(this.renderAttr("data-"+k,v))}return results}.call(this).join("")}if(name==="class"&&typeof value==="object"){value=function(){var results;results=[];for(k in value){v=value[k];if(v){results.push(""+k)}}return results}().join(" ");if(value===""){return""}}if(name==="style"&&typeof value==="object"){value=function(){var results;results=[];for(k in value){v=value[k];results.push(k+":"+v)}return results}().join(";");if(value===""){return""}}if(name[0]==="$"){name="lemon-on:"+name.replace("$","")}if(name==="on"&&typeof value==="object"){return function(){var results;results=[];for(k in value){v=value[k];results.push(this.renderAttr("lemon-on:"+k,v))}return results}.call(this).join("")}if(name[0]==="_"){name="lemon-bind:"+name.replace("_","")}if(name==="bind"&&typeof value==="object"){return function(){var results;results=[];for(k in value){v=value[k];results.push(this.renderAttr("lemon-bind:"+k,v))}return results}.call(this).join("")}if(name==="ref"){name="lemon-ref"}if((ref=typeof value)==="function"||ref==="object"||name==="lemon-data"){this._data.push(value);value=this._data.length-1}return" "+name+"="+this._quote(this._escape(value.toString()))};Lemoncup.prototype.renderAttrs=function(obj){var i,len,name,ref,result,value;result="";ref=this.attrOrder;for(i=0,len=ref.length;i<len;i++){name=ref[i];if(name in obj){result+=this.renderAttr(name,obj[name])}}for(name in obj){value=obj[name];if(indexOf.call(this.attrOrder,name)>=0){continue}result+=this.renderAttr(name,value)}return result};Lemoncup.prototype.renderContents=function(){var contents,rest,result;contents=arguments[0],rest=2<=arguments.length?slice.call(arguments,1):[];if(contents==null){}else if(typeof contents==="function"){result=contents.apply(this,rest);if(typeof result==="string"){return this.text(result)}}else{return this.text(contents)}};Lemoncup.prototype.isSelector=function(string){var ref;return string.length>1&&((ref=string.charAt(0))==="#"||ref===".")};Lemoncup.prototype.parseSelector=function(selector){var classes,i,id,klass,len,ref,ref1,token;id=null;classes=[];ref=selector.split(".");for(i=0,len=ref.length;i<len;i++){token=ref[i];token=token.trim();if(id){classes.push(token)}else{ref1=token.split("#"),klass=ref1[0],id=ref1[1];if(klass!==""){classes.push(token)}}}return{id:id,classes:classes}};Lemoncup.prototype.normalizeArgs=function(args){var arg,attrs,classes,contents,i,id,index,len,parsedSelector,selector;attrs={};selector=null;contents=null;for(index=i=0,len=args.length;i<len;index=++i){arg=args[index];if(arg!=null){switch(typeof arg){case"string":if(index===0&&this.isSelector(arg)){selector=arg;parsedSelector=this.parseSelector(arg)}else{contents=arg}break;case"function":case"number":case"boolean":contents=arg;break;case"object":if(arg.constructor===Object){attrs=arg}else{contents=arg}break;default:contents=arg}}}if(parsedSelector!=null){id=parsedSelector.id,classes=parsedSelector.classes;if(id!=null){attrs.id=id}if(classes!=null?classes.length:void 0){if(attrs["class"]){classes.push(attrs["class"])}attrs["class"]=classes.join(" ")}}return{attrs:attrs,contents:contents,selector:selector}};Lemoncup.prototype.tag=function(){var args,attrs,contents,ref,tagName;tagName=arguments[0],args=2<=arguments.length?slice.call(arguments,1):[];ref=this.normalizeArgs(args),attrs=ref.attrs,contents=ref.contents;this.raw("<"+tagName+this.renderAttrs(attrs)+">");this.renderContents(contents);return this.raw("</"+tagName+">")};Lemoncup.prototype.selfClosingTag=function(){var args,attrs,contents,ref,tag;tag=arguments[0],args=2<=arguments.length?slice.call(arguments,1):[];ref=this.normalizeArgs(args),attrs=ref.attrs,contents=ref.contents;return this.raw("<"+tag+this.renderAttrs(attrs)+" />")};Lemoncup.prototype.comment=function(text){return this.raw("\x3c!--"+this._escape(text)+"--\x3e")};Lemoncup.prototype.doctype=function(type){if(type==null){type=5}return this.raw(DOCTYPES[type])};Lemoncup.prototype.ie=function(condition,contents){this.raw("\x3c!--[if "+this._escape(condition)+"]>");this.renderContents(contents);return this.raw("<![endif]--\x3e")};Lemoncup.prototype.text=function(s){this._html+=s!=null&&this._escape(s.toString())||"";return null};Lemoncup.prototype.raw=function(s){if(s==null){return}this._html+=s;return null};Lemoncup.prototype._escape=function(text){return text.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")};Lemoncup.prototype._quote=function(value){return'"'+value+'"'};Lemoncup.prototype.bind=function(){var i,len,method,methods,results;methods=[].concat(METHODS,REGULAR_TAGS,SELF_CLOSING_TAGS);results=[];for(i=0,len=methods.length;i<len;i++){method=methods[i];results.push(this[method]=this[method].bind(this))}return results};return Lemoncup}();fn1=function(tag){return Lemoncup.prototype[tag]=function(){var args;args=1<=arguments.length?slice.call(arguments,0):[];return this.tag.apply(this,[tag].concat(slice.call(args)))}};for(i=0,len=REGULAR_TAGS.length;i<len;i++){tag=REGULAR_TAGS[i];fn1(tag)}fn2=function(tag){return Lemoncup.prototype[tag]=function(){var args;args=1<=arguments.length?slice.call(arguments,0):[];return this.selfClosingTag.apply(this,[tag].concat(slice.call(args)))}};for(j=0,len1=SELF_CLOSING_TAGS.length;j<len1;j++){tag=SELF_CLOSING_TAGS[j];fn2(tag)}lemoncup=new Lemoncup;lemoncup.bind();if(typeof module!=="undefined"&&module!==null?module.exports:void 0){global.lemoncup=lemoncup;module.exports=lemoncup}else{window.lemoncup=lemoncup}}).call(this);!function(a){var n;Array.prototype.indexOf||(Array.prototype.indexOf=function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1}),a.indexOf=Array.prototype.indexOf,"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(e,t){"use strict";if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),r=1;r<arguments.length;r++){var o=arguments[r];if(null!=o)for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(n[i]=o[i])}return n},writable:!0,configurable:!0}),n=0,a.requestAnimationFrame||(a.requestAnimationFrame=function(e){var t=+new Date;return n=Math.max(n+16,t),a.setTimeout(function(){e(+new Date)},n-t)}),null==a.lemon&&(a.lemon={}),null==a.site&&(a.site={}),null==a.page&&(a.page={}),null==lemon.Components&&(lemon.Components={}),null==lemon.Specs&&(lemon.Specs={});var l=[].slice;lemon.Component=function(){function e(e,t,n){var r,o,i,s,l,a,u,h,c,p,f,d,m;if(!(this instanceof lemon.Component)){for(u in r={},t)d=t[u],"id"!==u&&"class"!==u||(r[u]=d),"style"!==u&&"data"!==u&&"on"!==u&&"bind"!==u&&"$"!==(p=u[0])&&"_"!==p||(r[u]=d,delete t[u]);return r["lemon-component"]=e.package+"."+e.name,n&&(r["lemon-contents"]=n),r["lemon-data"]=t,void tag(e.element||"div",r)}for(u in e=Object.assign({},this._defaults,e))d=e[u],this["_"+u]=d;for(c in this._hook("beforeCreate"),this._data=Object.assign({},e.data,t),this._contents=n||e.contents||function(){},null==this._id&&(this._id=this._data.id),null==this._class&&(this._class=this._data.class),this._uid=this._id||this._data.id||lemon.uid(),this._ref=this._data.ref,Object.defineProperty(this,"el",{get:function(){return this._el}}),null==(lemon.Components[this._uid]=this)._ref&&(this._ref=this._uid),this.el&&("function"==typeof(o=this.el).setAttribute&&o.setAttribute("lemon-uid",this._uid),this._ref&&"function"==typeof(i=this.el).setAttribute&&i.setAttribute("lemon-ref",this._ref),this._id&&"function"==typeof(s=this.el).setAttribute&&s.setAttribute("id",this._id),this._class&&lemon.addClass(this.el,this._class)),f=this._methods)l=f[c],null==this[c]&&(this[c]=l.bind(this));for(h in this._children=[],this._refs={},this._listeners=[],this._data)this._observe(h);for(h in a=function(e){var t;return t=m,Object.defineProperty(t,e,{get:function(){return t._apply(t._computed[e])}}),Object.defineProperty(m._data,e,{get:function(){return t._apply(t._computed[e])}})},(m=this)._computed)a(h);this._hook("created")}return e.prototype._defaults={class:"",computed:{},contents:null,data:{},lifecycle:{},methods:{},mounted:!1,routes:{},template:function(){},watch:{}},e.prototype._addEventListener=function(e,t,n){var r,o,i,s,l;for(n||(e=(i=[this.el,e,t])[0],t=i[1],n=i[2]),r=0,o=(s=this._listeners).length;r<o;r++)if((l=s[r])[0]===e&&l[1]===t)return;return this._listeners.push([e,t,n]),e.addEventListener(t,n)},e.prototype._apply=function(e,t){return"string"==typeof e?this._methods[e]?this._methods[e].apply(this,t):this._warn(e+" is not defined"):"function"!=typeof e||e.apply(this,t)},e.prototype._bind=function(o,i,s){var l,a,u,e,t,n,h,r;for(e in null==i&&(i=""),null==s&&(s={}),i&&(i="='"+i+"'"),t=[],n={src:function(e,t){return e.setAttribute("src",t)},href:function(e,t){return e.setAttribute("href",t)},text:function(e,t){return e.textContent=""+t},html:function(e,t){return e.innerHTML=""+t},on:(r=this,function(e,t,n){return e.innerHTML="",r._bindListRule(e,[t],n)}),list:this._bindListRule.bind(this)})a=n[e],l="lemon-bind:"+e,t.push(function(){var e,t,n,r;for(r=[],e=0,t=(n=this._find(o,"["+l.replace(":","\\:")+i+"]")).length;e<t;e++)u=n[e],h=this[u.getAttribute(l)],r.push(a(u,h,s));return r}.call(this));return t},e.prototype._bindListRule=function(o,e,t){var n,i,r,s,l,a,u,h,c,p,f,d,m,_,y,v,g,b,C,A,w,L,E,O,R,j;switch(null==t&&(t={}),g=t.method,n=t.args,R=o.getAttribute("lemon-bind:template"),s=o.getAttribute("lemon-bind:component"),u=lemoncup._data[R]||lemoncup._data[s],l=this._data,j=R?function(e){var t,n,r;return n=e.fn,r=e.item,t=e.data,div({"lemon-data":r},function(){return n(r,t)})}:function(e){return(0,e.fn)(e.item,e.data)},g){case"pop":if(o.lastChild)return o.removeChild(o.lastChild);break;case"push":case void 0:for(g||(o.innerHTML=null),w=[],h=0,d=(b=n||e).length;h<d;h++)c=b[h],a=this._render({data:{fn:u,item:c,data:l},el:o,method:"append",template:j}),w.push(this._hydrate(a));return w;case"reverse":for(L=[],p=0,m=(C=o.children).length;p<m;p++)a=C[p],L.push(o.insertBefore(a,o.firstChild));return L;case"shift":if(o.firstChild)return o.removeChild(o.firstChild);break;case"sort":for(u=n[0]||function(e,t){return e<t?-1:1},E=[],f=0,_=(r=(r=function(){var e,t,n,r;for(r=[],e=0,t=(n=o.children).length;e<t;e++)i=n[e],r.push(i);return r}()).sort(function(e,t){var n,r;return n=lemoncup._data[e.getAttribute("lemon-data")],r=lemoncup._data[t.getAttribute("lemon-data")],u(n,r)})).length;f<_;f++)i=r[f],E.push(o.appendChild(i));return E;case"splice":return 0===n[0]&&1===n.length?o.innerHTML="":this._warn("splice not supported");case"unshift":for(O=[],v=0,y=(A=n.reverse()).length;v<y;v++)c=A[v],a=this._render({data:{fn:u,item:c,data:l},el:o,method:"prepend",template:j}),O.push(this._hydrate(a));return O}},e.prototype._destroy=function(){var e,t,n,r;for(this._hook("beforeDestroy"),lemon.off("url_change",this._onUrlChange),this._removeEventListeners(),e=0,t=(n=this._children).length;e<t;e++)n[e]._destroy();return delete lemon.Components[this._uid],null!=(r=this.el.parentNode)&&r.removeChild(this.el),this._hook("destroyed")},e.prototype._find=function(e,t){var n,r,o,i,s,l,a,u;for("string"==typeof e&&(e=(u=[this.el,e])[0],t=u[1]),l=[],o=0,s=(r=e.querySelectorAll(t)).length;o<s;o++){for(i=!0,a=(n=r[o]).parentNode;a!==e;){if(a.getAttribute("lemon-component")){i=!1;break}a=a.parentNode}i&&l.push(n)}return l},e.prototype._hook=function(e){return this._apply(this._lifecycle[e])},e.prototype._hydrate=function(e,t){var n,r,o,i,s,l,a,u,h,c,p,f,d,m,_,y,v,g,b,C,A,w,L,E;for(null==t&&(t={}),null==e&&(e=this.el),i=0,u=(C=lemon.browser_events).length;i<u;i++)for(l="lemon-on:"+(r=C[i]),g=this._find(e,"["+l.replace(":","\\:")+"]"),o=function(i){return function(r,e,o){return i.addEventListener(r,e,function(e){var t,n;return n=r.getAttribute(o),t=lemoncup._data[n]||i[n],i._apply(t,[e])})}}(this),s=0,h=g.length;s<h;s++)o(v=g[s],r,l);for(a=0,c=(A=this._find(e,"[lemon-component]")).length;a<c;a++)v=A[a],(n=lemon.loadElement(v,t))._parent=this,n&&this._children.push(n);for(_=0,p=(w=this._find(e,"[lemon-ref]")).length;_<p;_++)b=(v=w[_]).getAttribute("lemon-ref"),E=v.getAttribute("lemon-uid"),this._refs[b]=E?lemon.get(E):v,this[b]=this._refs[b];for(this._bind(e,null,t),L=[],y=0,f=(m=this._find(e,"a[href^='/'],a[href^='?'],a[href^='#']")).length;y<f;y++)d=m[y],L.push(function(e){return function(t){return e.addEventListener(t,"click",function(e){return e.preventDefault(),lemon.route(t.getAttribute("href"))})}}(this)(d));return L},e.prototype._mount=function(e){return null==e&&(e={}),null==e.render&&(e.render=!0),""===this.el.innerHTML&&(e.render=!0),this._hook("beforeMount"),this._removeEventListeners(),e.render&&this._render({el:this.el,template:this._template,data:this._data,contents:this._contents}),this._hydrate(this.el,e),this._hook("mounted"),this._startRouter(),this._mounted=!0},e.prototype._observe=function(t){if(Object.defineProperty(this,t,{get:function(){return this._data[t]},set:function(e){if(this._data[t]!==e)return this._data[t]=e,this._apply(this._watch[t],[e]),this._bind(this.el,t),Array.isArray(e)?this._observeArray(t):void 0}}),Array.isArray(this._data[t]))return this._observeArray(t)},e.prototype._observeArray=function(r){var o;if(!this._data[r]._observer)return o=this,Object.defineProperty(this._data[r],"_observer",{enumerable:!1,value:function(e){var t,n;return n=e.method,t=e.args,o._bind(o.el,r,{method:n,args:t})}})},e.prototype._removeEventListeners=function(){var e,t,n,r,o,i,s;for(n=0,r=(s=this._listeners).length;n<r;n++)e=(o=s[n])[0],i=o[1],t=o[2],e.removeEventListener(i,t);return this._listeners=[]},e.prototype._render=function(e){var t,n,r,o,i,s;return r=e.el,i=e.method,s=e.template,n=e.data,t=e.contents,o=lemoncup.render(s,n,t),lemon.updateDOMElement(r,i,o)},e.prototype._startRouter=function(){var t,e;if(!this._onUrlChange&&0!==function(){var e;for(t in e=[],this._routes)e.push(t);return e}.call(this).length)return e=function(){var e;if(e=lemon.checkRoutes(this._routes))return this._apply(e.action,[e])},this._onUrlChange=e.bind(this),lemon.on("url_change",this._onUrlChange),this._onUrlChange()},e.prototype._warn=function(){return console.warn.apply(console,["["+this._package+"."+this._name+"]"].concat(l.call(arguments)))},e.prototype.addEventListener=function(){return this._addEventListener.apply(this,arguments)},e.prototype.find=function(){return this._find.apply(this,arguments)},e.prototype.findOne=function(){return this._find.apply(this,arguments)[0]},e.prototype.hydrate=function(){return this._hydrate.apply(this,arguments)},e.prototype.mount=function(){return this._mount.apply(this,arguments)},e.prototype.render=function(){return this._render.apply(this,arguments)},e.prototype.warn=function(){return this._warn.apply(this,arguments)},e}(),lemon.addClass=function(e,t){var n,r,o,i,s;if(e){for(s=[],r=0,o=(i=t.split(" ")).length;r<o;r++)n=i[r],e.classList?s.push(e.classList.add(n)):s.push(e.className+=" "+n);return s}},lemon.ajax=function(e,n){var t,r,o,i,s,l,a,u,h;for(o in t=e.data,r=e.headers,i=e.method,s=e.qs,a=e.timeout,u=e.url,null==i&&(i="GET"),null==r&&(r={}),"object"==typeof t&&(r["Content-Type"]="application/json",t=JSON.stringify(t)),l=new XMLHttpRequest,s&&(u+="?"+function(){var e;for(o in e=[],s)h=s[o],e.push(encodeURI(o+"="+h));return e}().join("&")),a&&(l.timeout=a,l.ontimeout=function(e){return n(e)}),l.open(i,u),r)h=r[o],l.setRequestHeader(o,h);return l.onreadystatechange=function(){var e,t;return 4===l.readyState&&200<=l.status&&l.status<400?(e=l.responseText,(null!=(t=l.getResponseHeader("Content-Type"))?t.match(/json/):void 0)&&(e=JSON.parse(e)),n(null,e)):4===l.readyState?n({status:l.status,error:l.statusText}):void 0},l.onerror=function(e){return n(e)},l.send(t)};var e,i;l=[].slice;for(t=function(n){var r;return r=Array.prototype[n],Array.prototype[n]=function(){var e,t;return e=1<=arguments.length?l.call(arguments,0):[],t=r.apply(this,arguments),"function"==typeof this._observer&&this._observer({method:n,args:e}),t}},r=0,o=(e=["push","pop","shift","unshift","splice","sort","reverse"]).length;r<o;r++)t(e[r]);for(i in lemon.bodyHeight=function(){var e,t;return e=document.body,t=document.documentElement,Math.max.apply(Math,[e.scrollHeight,e.offsetHeight,t.clientHeight,t.scrollHeight,t.offsetHeight])},lemon.browser_events=[],document)"function"!=typeof document[i]&&"on"===(null!=i?i.substring(0,2):void 0)&&(lemon.browser_events[lemon.browser_events.length]=i.replace("on",""));lemon.checkRoute=function(e){var t,n,r,o,i,s,l,a,u,h,c,p,f,d,m,_,y,v,g,b,C,A,w,L,E,O,R,j;if(n=location.href,t=location.hash,d=location.pathname,O=(O=location.search).replace("?",""),t=t.replace("#",""),d=d.replace(/.\/$/,""),"/"!==(e=(e=e.replace(/\*$/,"*rest")).replace(/\/$/,""))[0]&&(e="/"+e),v=/\/\((.*?)\)(\/|\b)/g,g=/\/\((.*?)\):(\w+)/g,b=/\/[:](\w+)/g,C=/\/[*](\w+)/g,y=/[{}?.,\\\^$#\s]/g,p=[],_=(_=(_=(_=(_=(_=e).replace(y,"\\$&")).replace(v,function(e,t,n){return"/(?:"+t+")"+(n||"")})).replace(g,function(e,t,n){return p.push(n),"/("+t+")"})).replace(b,function(e,t){return p.push(t),"/([^/]*)"})).replace(C,function(e,t){return p.push(t),"/?(.*)"}),!(c=(_=new RegExp("^"+_+"$")).exec(d)))return null;for(f={},r=o=0,A=p.length;0<=A?o<A:A<o;r=0<=A?++o:--o)s=p[r],j=c[r+1],f[s]=j;for(m={},l=0,a=(w=O.split("&")).length;l<a;l++)for(h=0,u=(L=w[l].split("=")).length;h<u;h++)i=(E=L[h])[0],null!=(R=E[1])&&(m[i]=R);return{pathname:d,params:f,query:m,hash:t,href:n,search:O}},lemon.checkRoutes=function(e){var t,n,r;for(n in e)if(t=e[n],r=lemon.checkRoute(n))return r.action=t,r.pattern=n,r;return null},lemon.copy=function(e){var t,n,r,o,i;if(null===e||"object"!=typeof e)return e;if(e instanceof Date)return new Date(e.getTime());if(e instanceof RegExp)return new RegExp(e);if(e.nodeType)return e;if(Array.isArray(e)){for(t=[],n=0,o=e.length;n<o;n++)i=e[n],t.push(lemon.copy(i));return t}if(e instanceof Object){for(r in t={},e)i=e[r],t[r]=lemon.copy(i);return t}return null},lemon.define=function(e){var r,o,t;return t=e.split("."),o=t[0],r=t[1],null==a[o]&&(a[o]={}),a[o][r]=function(e,t){var n;return n=lemon.Specs[o+"."+r],this instanceof a[o][r]?new lemon.Component(n,e,t):lemon.Component(n,e,t)}};var t,r,o,s;l=[].slice;if(lemon.events={},lemon.emit=function(){var e,t,n,r,o,i,s;for(t=arguments[0],e=2<=arguments.length?l.call(arguments,1):[],s=[],r=0,o=(i=lemon.events[t]||[]).length;r<o;r++)n=i[r],s.push(n.apply(null,e));return s},lemon.on=function(e,t){var n;return null==(n=lemon.events)[e]&&(n[e]=[]),lemon.events[e].push(t)},lemon.once=function(t,n){var e,r;return null==(e=lemon.events)[t]&&(e[t]=[]),r=function(){var e;return e=1<=arguments.length?l.call(arguments,0):[],lemon.off(t,r),n.apply(null,e)},lemon.events[t].push(r)},lemon.off=function(e,t){var n;return null==t&&(t=null),null==(n=lemon.events)[e]&&(n[e]=[]),lemon.events[e]=lemon.events[e].filter(function(e){return null!==t&&e!==t})},lemon.get=function(e){return lemon.Components[e]},lemon.hasClass=function(e,t){if(e)return e.classList?e.classList.contains(t):new RegExp("(^| )"+t+"( |$)","gi").test(e.className)},"undefined"!=typeof history&&null!==history?history.pushState:void 0){for(t=function(e){var t;return t=history[e],history[e]=function(){var e;return e=t.apply(history,arguments),lemon.updatePageData(),lemon.emit("url_change",page),e}},r=0,o=(s=["pushState","replaceState"]).length;r<o;r++)t(s[r]);a.addEventListener("popstate",function(e){return lemon.updatePageData(),lemon.emit("url_change",page)})}lemon.init=function(){var e,t,n;for(t in e=(null!=(n=page.data)?n._render:void 0)||!1,lemon.updatePageData(),lemon.Specs)lemon.define(t);return new lemon.Component({id:"document",el:document})._hydrate(document,{render:e})},lemon.loadElement=function(e,t){var n,r,o,i,s,l,a;if(!e._component)return i=e.getAttribute("lemon-component"),l=e.getAttribute("lemon-data"),s=e.getAttribute("lemon-contents"),(a=lemon.Specs[i])?((a=lemon.copy(a)).el=e,o=lemoncup._data[l],r=lemoncup._data[s],(n=new lemon.Component(a,o,r)).mount(t),e._component=n):console.warn(i+" is not a defined component")},lemon.offset=function(e){var t;return(t=e.getBoundingClientRect())._top=Math.max(0,t.top),t._bottom=Math.max(0,a.innerHeight-t.top-t.height),t},lemon.removeClass=function(e,t){var n,r,o,i,s,l;if(e){for(l=[],r=0,o=(s=t.split(" ")).length;r<o;r++)n=s[r],e.classList?l.push(e.classList.remove(n)):(i=new RegExp("(^|\\b)"+n+"(\\b|$)","gi"),l.push(e.className=e.className.replace(i," ")));return l}},lemon.route=function(e){var t,n;if(n=location.pathname,t=location.href,e!==n&&e!==t)return history.pushState?history.pushState(null,null,e):document.location=e,!1},lemon.scrollTo=function(e,r,t){var o,i,s,l;return null==r&&(r=800),null==t&&(t=20),l=a.scrollY,o=e.getBoundingClientRect().top-t,i=null,s=function(e){var t,n;if(null==i&&(i=e),n=e-i,t=(t=Math.min(n/r,1))<.5?4*Math.pow(t,3):(t-1)*(2*t-2)*(2*t-2)+1,a.scrollTo(0,l+o*t),n<r)return a.requestAnimationFrame(s)},a.requestAnimationFrame(s)},lemon.toggleClass=function(e,t){if(e)return lemon.hasClass(e,t)?lemon.removeClass(e,t):lemon.addClass(e,t)},lemon.uid=function(){return"_"+ ++lemon.uid.n},lemon.uid.n=0,lemon.updateDOMElement=function(e,t,n){var r;switch(t){case"append":return(r=document.createElement("div")).innerHTML=n,e.appendChild(r.firstChild),e.lastChild;case"prepend":return(r=document.createElement("div")).innerHTML=n,e.insertBefore(r.firstChild,e.firstChild),e.firstChild;default:return e.innerHTML=n,e}},lemon.updatePageData=function(){var e,t,n,r,o;return e=(o=lemon.checkRoute("*")).hash,t=o.href,r=o.query,n=o.pathname,page.data=site.data[n],page.hash=e,page.href=t,page.markdown=site.markdown[n],page.pathname=n,page.query=r},function(){var e,t,n,r,o;for(o=[],e=0,t=(r=["resize","scroll"]).length;e<t;e++)n=r[e],o.push(function(t){var n,r;return r=!1,n=i,a.addEventListener(t,function(e){if(n=e,!r)return r=!0,a.requestAnimationFrame(function(){return lemon.emit(t,n),r=!1})})}(n))}()}(window);
if(!window['lemon']){window['lemon']={}};if(!window['site']){window['site']={}}; lemoncup._data = [{id:'app',class:''}]; lemon.Specs = {"lemon.Router":{package:'lemon',name:'Router',data:{init:true,prev:{},beforeRoute:function(n,a){return(null!=n?n.pathname:void 0)!==(null!=a?a.pathname:void 0)},routed:function(){}},methods:{onRoute:function(){var t,i,e,o;if(e=this._data.routes||this._data,t=lemon.checkRoutes(e),i=this.prev,this.prev=t,this.init)return this.init=!1;if(t){if(!1===("function"==typeof this.beforeRoute?this.beforeRoute(t,i):void 0))return;return setTimeout((o=this,function(){return o.mount(),"function"==typeof o.routed?o.routed(t):void 0}),0)}}},routes:{"/*":'onRoute'},template:function(n){var o,e;return e=n.routes||n,null!=(o=lemon.checkRoutes(e))?o.action(o):void 0},hash:'2fe5f76bc3e5a625c28f08e54039875ef0859d08'},"site.App":{package:'site',name:'App',id:'app',template:function(n){return div(function(){return"Shenzhen239"})},hash:'c9b6f612c1a61b90b3ca1c59b7689e3dceb8617c'}}; window.site = {data:{"/":{}},hostname:'www.shenzhen239.com',markdown:{},name:'Shenzhen239 website',origin:'http://www.shenzhen239.com',protocol:undefined,App:function(){site.App.apply(null,arguments)}}; window.page = {data:{},href:'http://www.shenzhen239.com/',markdown:undefined,pathname:'/',query:{},url:'http://www.shenzhen239.com/'}; lemon.init();