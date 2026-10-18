import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('out');
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{
  try{
    const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file=resolve(root,'.'+path);
    if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
    try{if((await stat(file)).isDirectory())file=resolve(file,'index.html');}catch{file=resolve(root,'404.html');res.statusCode=404;}
    const data=await readFile(file);res.setHeader('Content-Type',mime[extname(file)]||'application/octet-stream');res.end(data);
  }catch{res.writeHead(500);res.end('Unable to load this page.');}
});
server.listen(3000,'127.0.0.1',()=>process.stdout.write('Sanak Beauty preview: http://127.0.0.1:3000\n'));
