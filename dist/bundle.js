(()=>{var p=e=>new Promise((s,a)=>{let n=new Image;n.onload=()=>s(n),n.src=e});function I(e,s){let a=e.dataset.maxWidth?parseInt(e.dataset.maxWidth):500,n=e.dataset.maxHeight?parseInt(e.dataset.maxHeight):500,l=e.dataset.quality?parseInt(e.dataset.quality):90,h=e.dataset.format?e.dataset.format:"webp",x=e.dataset.fit?e.dataset.fit:"fit",m=e.dataset.preview,f=m?document.querySelector(m):null,g=new FileReader;g.onload=H=>{Promise.all([p(H.target.result)]).then(r=>{let c=document.createElement("canvas"),w=c.getContext("2d");if(x==="fit"){let t=r[0].width,d=r[0].height,o=t,i=d;t>a&&(o=a,i=d*a/t),i>n&&(i=n,o=t*n/d),c.width=o,c.height=i,w.drawImage(r[0],0,0,o,i)}else{c.width=a,c.height=n;let t=Math.max(a/r[0].width,n/r[0].height),d=r[0].width*t,o=r[0].height*t,i=(d-a)/2,L=(o-n)/2;w.drawImage(r[0],-i,-L,d,o)}function E(t){if(f){let i=URL.createObjectURL(t);f.src=i}let d=new File([t],"image."+t.type?.replace("image/","")||"jpg",{type:t.type,lastModified:Date.now()}),o=new DataTransfer;o.items.add(d),e.files=o.files}c.toBlob(t=>{if(!t)throw new Error("Failed to create blob for image");t.type==="image/png"&&h==="webp"&&c.toBlob(d=>{if(!d)throw new Error("Failed to create blob for image");E(d)},"image/jpeg",l/100),E(t)},`image/${h}`,l/100)})},g.readAsDataURL(e.files[0])}document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll("input[data-format], input[data-max-width], input[data-max-height], input[data-quality]").forEach(e=>{e.addEventListener("change",s=>{I(e,s)})})});var v=new MutationObserver(e=>{e.forEach(s=>{if(s.addedNodes.length&&s.addedNodes[0].nodeName==="INPUT"){let a=s.addedNodes[0];(a.dataset.format||a.dataset.maxWidth||a.dataset.maxHeight||a.dataset.quality)&&a.addEventListener("change",n=>{I(a,n)})}})});})();
//# sourceMappingURL=bundle.js.map