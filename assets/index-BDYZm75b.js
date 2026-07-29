const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-Cfmm1VRG.js","assets/rolldown-runtime-CNC7AqOf.js","assets/animation-vendor-Cs4fhWZj.js","assets/react-vendor-Cn7Ycgnj.js","assets/icons-vendor-tnsXJBe7.js","assets/ThreeViewer-Bx6Tc1oy.js","assets/three-vendor-CZzJKA1y.js","assets/Skills-DtXUL6oZ.js","assets/Projects-w852TBWe.js","assets/Certificates-BQHsqxWb.js","assets/Contact-BuryDtK3.js"])))=>i.map(i=>d[i]);
import{a as e}from"./rolldown-runtime-CNC7AqOf.js";import{a as t,i as n}from"./animation-vendor-Cs4fhWZj.js";import{a as r,i,n as a,o,r as s,t as c}from"./react-vendor-Cn7Ycgnj.js";import{D as l,T as u,f as d,h as f,l as p,v as m,w as h,x as g}from"./icons-vendor-tnsXJBe7.js";import{_,d as v,g as y,h as b,l as x,o as S,p as C,v as w,y as T}from"./three-vendor-CZzJKA1y.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var E=o(),D=e(t(),1),O=n(),k=`
precision highp float;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,A=`
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;

const vec3 BLACK = vec3(0.0);
const vec3 PINK  = vec3(233.0, 71.0, 245.0) / 255.0;
const vec3 BLUE  = vec3(47.0,  75.0, 162.0) / 255.0;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  vec3 col = vec3(0.0);

  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;

  col += mix(BLUE, BLACK, smoothstep(0.0, 1.0, abs(m)));
  col += mix(PINK, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
  return col * 0.5;
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) {
    return baseColor;
  }

  vec3 gradientColor;
  
  if (lineGradientCount == 1) {
    gradientColor = lineGradient[0];
  } else {
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(lineGradientCount - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int idx2 = min(idx + 1, lineGradientCount - 1);

    vec3 c1 = lineGradient[idx];
    vec3 c2 = lineGradient[idx2];
    
    gradientColor = mix(c1, c2, f);
  }
  
  return gradientColor * 0.5;
}

  float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;

  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius); // radial falloff around cursor
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  
  if (parallax) {
    baseUv += parallaxOffset;
  }

  vec3 col = vec3(0.0);

  vec3 b = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }
  
  if (enableBottom) {
    for (int i = 0; i < bottomLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < middleLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv,
        mouseUv,
        interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < topLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.1;
    }
  }

  fragColor = vec4(col, max(max(col.r, col.g), col.b));
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`,j=8;function M(e){let t=e.trim();t.startsWith(`#`)&&(t=t.slice(1));let n=255,r=255,i=255;return t.length===3?(n=parseInt(t[0]+t[0],16),r=parseInt(t[1]+t[1],16),i=parseInt(t[2]+t[2],16)):t.length===6&&(n=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16)),new w(n/255,r/255,i/255)}function N({linesGradient:e,enabledWaves:t=[`top`,`middle`,`bottom`],lineCount:n=[6],lineDistance:r=[5],topWavePosition:i,middleWavePosition:a,bottomWavePosition:o={x:2,y:-.7,rotate:-1},animationSpeed:s=1,interactive:c=!0,bendRadius:l=5,bendStrength:u=-.5,mouseDamping:d=.05,parallax:f=!0,parallaxStrength:p=.2,mixBlendMode:m=`screen`}){let h=(0,D.useRef)(null),g=(0,D.useRef)(new _(-1e3,-1e3)),E=(0,D.useRef)(new _(-1e3,-1e3)),N=(0,D.useRef)(0),P=(0,D.useRef)(0),F=(0,D.useRef)(new _(0,0)),I=(0,D.useRef)(new _(0,0)),L=e=>typeof n==`number`?n:t.includes(e)?n[t.indexOf(e)]??6:0,R=e=>typeof r==`number`?r:t.includes(e)?r[t.indexOf(e)]??.1:.1,z=t.includes(`top`)?L(`top`):0,B=t.includes(`middle`)?L(`middle`):0,V=t.includes(`bottom`)?L(`bottom`):0,H=t.includes(`top`)?R(`top`)*.01:.01,U=t.includes(`middle`)?R(`middle`)*.01:.01,W=t.includes(`bottom`)?R(`bottom`)*.01:.01;return(0,D.useEffect)(()=>{let n=h.current;if(!n)return;let r=!0,m=new b,D=new v(-1,1,1,-1,0,1);D.position.z=1;let O=new T({antialias:!0,alpha:!0});O.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),O.domElement.style.width=`100%`,O.domElement.style.height=`100%`,n.appendChild(O.domElement);let L={iTime:{value:0},iResolution:{value:new w(1,1,1)},animationSpeed:{value:s},enableTop:{value:t.includes(`top`)},enableMiddle:{value:t.includes(`middle`)},enableBottom:{value:t.includes(`bottom`)},topLineCount:{value:z},middleLineCount:{value:B},bottomLineCount:{value:V},topLineDistance:{value:H},middleLineDistance:{value:U},bottomLineDistance:{value:W},topWavePosition:{value:new w(i?.x??10,i?.y??.5,i?.rotate??-.4)},middleWavePosition:{value:new w(a?.x??5,a?.y??0,a?.rotate??.2)},bottomWavePosition:{value:new w(o?.x??2,o?.y??-.7,o?.rotate??.4)},iMouse:{value:new _(-1e3,-1e3)},interactive:{value:c},bendRadius:{value:l},bendStrength:{value:u},bendInfluence:{value:0},parallax:{value:f},parallaxStrength:{value:p},parallaxOffset:{value:new _(0,0)},lineGradient:{value:Array.from({length:j},()=>new w(1,1,1))},lineGradientCount:{value:0}};if(e&&e.length>0){let t=e.slice(0,j);L.lineGradientCount.value=t.length,t.forEach((e,t)=>{let n=M(e);L.lineGradient.value[t].set(n.x,n.y,n.z)})}let R=new y({uniforms:L,vertexShader:k,fragmentShader:A}),G=new C(2,2),K=new x(G,R);m.add(K);let q=new S,J=()=>{if(!r)return;let e=n.clientWidth||1,t=n.clientHeight||1;O.setSize(e,t,!1);let i=O.domElement.width,a=O.domElement.height;L.iResolution.value.set(i,a,1)};J();let Y=typeof ResizeObserver<`u`?new ResizeObserver(()=>{r&&J()}):null;Y&&Y.observe(n);let X=e=>{let t=O.domElement.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,i=O.getPixelRatio();if(g.current.set(n*i,(t.height-r)*i),N.current=1,f){let e=t.width/2,i=t.height/2,a=(n-e)/t.width,o=-(r-i)/t.height;F.current.set(a*p,o*p)}},Z=()=>{N.current=0};c&&(O.domElement.addEventListener(`pointermove`,X),O.domElement.addEventListener(`pointerleave`,Z));let Q=0,$=()=>{r&&(L.iTime.value=q.getElapsedTime(),c&&(E.current.lerp(g.current,d),L.iMouse.value.copy(E.current),P.current+=(N.current-P.current)*d,L.bendInfluence.value=P.current),f&&(I.current.lerp(F.current,d),L.parallaxOffset.value.copy(I.current)),O.render(m,D),Q=requestAnimationFrame($))};return $(),()=>{r=!1,cancelAnimationFrame(Q),Y&&Y.disconnect(),c&&(O.domElement.removeEventListener(`pointermove`,X),O.domElement.removeEventListener(`pointerleave`,Z)),G.dispose(),R.dispose(),O.dispose(),O.forceContextLoss(),O.domElement.parentElement&&O.domElement.parentElement.removeChild(O.domElement)}},[e,t,n,r,i,a,o,s,c,l,u,d,f,p]),(0,O.jsx)(`div`,{ref:h,className:`relative w-full h-full overflow-hidden floating-lines-container`,style:{mixBlendMode:m}})}var P=(0,D.createContext)(),F=({children:e})=>{let[t,n]=(0,D.useState)(()=>{let e=localStorage.getItem(`portfolio_theme`);return e===null||e===`dark`});return(0,D.useEffect)(()=>{t?(document.documentElement.classList.add(`dark`),localStorage.setItem(`portfolio_theme`,`dark`)):(document.documentElement.classList.remove(`dark`),localStorage.setItem(`portfolio_theme`,`light`))},[t]),(0,O.jsx)(P.Provider,{value:{isDark:t,toggleTheme:()=>n(e=>!e)},children:e})},I=()=>(0,D.useContext)(P),L=({children:e})=>{let{isDark:t,toggleTheme:n}=I();return(0,O.jsxs)(`div`,{className:`min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-salmon selection:text-white overflow-x-hidden relative transition-colors duration-300`,children:[(0,O.jsx)(`div`,{className:`fixed inset-0 pointer-events-none z-0 opacity-60`,children:(0,O.jsx)(N,{linesGradient:t?[`#1e3a8a`,`#3b82f6`,`#60a5fa`]:[`#ffffff`,`#f9f9f9`,`#ffe4e1`],animationSpeed:1.5,parallax:!0,interactive:!0})}),(0,O.jsx)(`nav`,{className:`sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border transition-colors duration-300`,children:(0,O.jsx)(`div`,{className:`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`,children:(0,O.jsxs)(`div`,{className:`flex items-center justify-between h-16`,children:[(0,O.jsx)(`div`,{className:`flex-shrink-0`,children:(0,O.jsxs)(a,{to:`/`,className:`text-xl font-bold tracking-tighter hover:text-salmon transition-colors`,children:[`Guilherme`,(0,O.jsx)(`span`,{className:`text-salmon`,children:`.`}),`Martins`]})}),(0,O.jsxs)(`div`,{className:`hidden md:flex items-center space-x-4`,children:[(0,O.jsx)(`div`,{className:`ml-10 flex items-baseline space-x-6`,children:[{name:`Home`,path:`/`,icon:(0,O.jsx)(m,{className:`w-5 h-5`})},{name:`Skills`,path:`/skills`,icon:(0,O.jsx)(h,{className:`w-5 h-5`})},{name:`Projects`,path:`/projects`,icon:(0,O.jsx)(u,{className:`w-5 h-5`})},{name:`Certificates`,path:`/certificates`,icon:(0,O.jsx)(l,{className:`w-5 h-5`})},{name:`Contact`,path:`/contact`,icon:(0,O.jsx)(f,{className:`w-5 h-5`})}].map(e=>(0,O.jsxs)(a,{to:e.path,className:`flex items-center gap-2 text-muted-foreground hover:text-salmon hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-all`,children:[e.icon,e.name]},e.name))}),(0,O.jsx)(`button`,{onClick:n,className:`p-2 ml-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors`,"aria-label":`Alternar Tema`,children:t?(0,O.jsx)(p,{className:`w-5 h-5`}):(0,O.jsx)(d,{className:`w-5 h-5`})})]}),(0,O.jsx)(`div`,{className:`md:hidden flex items-center gap-2`,children:(0,O.jsx)(`button`,{onClick:n,className:`p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300`,children:t?(0,O.jsx)(p,{className:`w-5 h-5`}):(0,O.jsx)(d,{className:`w-5 h-5`})})})]})})}),(0,O.jsx)(`main`,{className:`flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full relative z-10`,children:e}),(0,O.jsx)(`footer`,{className:`border-t border-border py-8 text-center text-muted-foreground text-sm relative z-10 transition-colors duration-300 bg-background/50`,children:(0,O.jsxs)(`div`,{className:`max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4`,children:[(0,O.jsxs)(`p`,{children:[`© `,new Date().getFullYear(),` Guilherme Martins. Todos os direitos reservados.`]}),(0,O.jsxs)(`a`,{href:`/Curriculo_Guilherme_Martins_Coelho_Vilmar.pdf`,download:`Curriculo_Guilherme_Martins.pdf`,target:`_blank`,rel:`noopener noreferrer`,className:`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-salmon hover:text-white dark:hover:bg-salmon dark:hover:text-white text-gray-700 dark:text-gray-300 text-xs font-semibold border border-gray-200 dark:border-gray-700 transition-all duration-300 shadow-sm`,children:[(0,O.jsx)(g,{className:`w-4 h-4`}),(0,O.jsx)(`span`,{children:`Baixar Currículo (PDF)`})]})]})})]})},R=({sparkColor:e=`#fff`,sparkSize:t=10,sparkRadius:n=15,sparkCount:r=8,duration:i=400,easing:a=`ease-out`,extraScale:o=1,children:s})=>{let c=(0,D.useRef)(null),l=(0,D.useRef)([]),u=(0,D.useRef)(null);(0,D.useEffect)(()=>{let e=c.current;if(!e)return;let t=e.parentElement;if(!t)return;let n,r=()=>{let{width:n,height:r}=t.getBoundingClientRect();(e.width!==n||e.height!==r)&&(e.width=n,e.height=r)},i=new ResizeObserver(()=>{clearTimeout(n),n=setTimeout(r,100)});return i.observe(t),r(),()=>{i.disconnect(),clearTimeout(n)}},[]);let d=(0,D.useCallback)(e=>{switch(a){case`linear`:return e;case`ease-in`:return e*e;case`ease-in-out`:return e<.5?2*e*e:-1+(4-2*e)*e;default:return e*(2-e)}},[a]);return(0,D.useEffect)(()=>{let r=c.current;if(!r)return;let a=r.getContext(`2d`),s,f=c=>{u.current||=c,a.clearRect(0,0,r.width,r.height),l.current=l.current.filter(r=>{let s=c-r.startTime;if(s>=i)return!1;let l=s/i,u=d(l),f=u*n*o,p=t*(1-u),m=r.x+f*Math.cos(r.angle),h=r.y+f*Math.sin(r.angle),g=r.x+(f+p)*Math.cos(r.angle),_=r.y+(f+p)*Math.sin(r.angle);return a.strokeStyle=e,a.lineWidth=2,a.beginPath(),a.moveTo(m,h),a.lineTo(g,_),a.stroke(),!0}),s=requestAnimationFrame(f)};return s=requestAnimationFrame(f),()=>{cancelAnimationFrame(s)}},[e,t,n,r,i,d,o]),(0,O.jsxs)(`div`,{style:{position:`relative`,width:`100%`,height:`100%`},onClick:e=>{let t=c.current;if(!t)return;let n=t.getBoundingClientRect(),i=e.clientX-n.left,a=e.clientY-n.top,o=performance.now(),s=Array.from({length:r},(e,t)=>({x:i,y:a,angle:2*Math.PI*t/r,startTime:o}));l.current.push(...s)},children:[(0,O.jsx)(`canvas`,{ref:c,style:{width:`100%`,height:`100%`,display:`block`,userSelect:`none`,position:`absolute`,top:0,left:0,pointerEvents:`none`}}),s]})},z=(0,D.lazy)(()=>r(()=>import(`./Home-Cfmm1VRG.js`),__vite__mapDeps([0,1,2,3,4,5,6]))),B=(0,D.lazy)(()=>r(()=>import(`./Skills-DtXUL6oZ.js`),__vite__mapDeps([7,2,1,4]))),V=(0,D.lazy)(()=>r(()=>import(`./Projects-w852TBWe.js`),__vite__mapDeps([8,1,2,4,5,6]))),H=(0,D.lazy)(()=>r(()=>import(`./Certificates-BQHsqxWb.js`),__vite__mapDeps([9,1,2,4]))),U=(0,D.lazy)(()=>r(()=>import(`./Contact-BuryDtK3.js`),__vite__mapDeps([10,2,1,4])));function W(){return(0,O.jsx)(`div`,{className:`flex items-center justify-center min-h-[60vh]`,children:(0,O.jsx)(`div`,{className:`w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin`})})}function G(){let{isDark:e}=I();return(0,O.jsx)(c,{children:(0,O.jsx)(R,{sparkColor:e?`#3b82f6`:`#C07C88`,sparkSize:15,sparkRadius:25,sparkCount:12,duration:600,extraScale:1.2,children:(0,O.jsx)(L,{children:(0,O.jsx)(D.Suspense,{fallback:(0,O.jsx)(W,{}),children:(0,O.jsxs)(i,{children:[(0,O.jsx)(s,{path:`/`,element:(0,O.jsx)(z,{})}),(0,O.jsx)(s,{path:`/skills`,element:(0,O.jsx)(B,{})}),(0,O.jsx)(s,{path:`/projects`,element:(0,O.jsx)(V,{})}),(0,O.jsx)(s,{path:`/certificates`,element:(0,O.jsx)(H,{})}),(0,O.jsx)(s,{path:`/contact`,element:(0,O.jsx)(U,{})})]})})})})})}function K(){return(0,O.jsx)(F,{children:(0,O.jsx)(G,{})})}(0,E.createRoot)(document.getElementById(`app`)).render((0,O.jsx)(D.StrictMode,{children:(0,O.jsx)(K,{})}));export{I as t};