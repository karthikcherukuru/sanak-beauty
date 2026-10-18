'use client';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, OrbitControls } from '@react-three/drei';
import { Component, Suspense, useRef, useState, type ReactNode, type ComponentRef } from 'react';
import { RotateCcw, RotateCw, Minus, Plus } from 'lucide-react';
import type { Product } from '@/data/products';
import { ProductModel } from './product-models';
class SceneBoundary extends Component<{children: ReactNode; fallback: ReactNode},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed?this.props.fallback:this.props.children;}
}
export default function Viewer({product, fallback}: {product:Product; fallback:ReactNode}) {
  const [rotation,setRotation]=useState(0);
  const [zoom,setZoom]=useState(1);
  const controls=useRef<ComponentRef<typeof OrbitControls>>(null);
  const [lost,setLost]=useState(false);
  function resetView(){controls.current?.reset();setRotation(0);setZoom(1);}
  return <div className="viewer" role="group" aria-label={`Interactive 3D ${product.name}`}><div className="canvas-area" tabIndex={0} aria-label="3D product. Use left and right arrow keys to rotate; plus and minus to zoom; Home to reset." onKeyDown={e=>{if(['ArrowLeft','ArrowRight','+','-','Home'].includes(e.key))e.preventDefault();if(e.key==='ArrowLeft')setRotation(r=>r-.3);if(e.key==='ArrowRight')setRotation(r=>r+.3);if(e.key==='+')setZoom(z=>Math.min(1.35,z+.1));if(e.key==='-')setZoom(z=>Math.max(.7,z-.1));if(e.key==='Home')resetView();}}>
    {lost?fallback:<SceneBoundary fallback={fallback}><Canvas shadows dpr={[1,1.5]} frameloop="demand" camera={{position:[0,1.1,5.7],fov:35}} gl={{antialias:true,alpha:true,powerPreference:'low-power'}} fallback={fallback} onCreated={({gl})=>{gl.domElement.addEventListener('webglcontextlost',()=>setLost(true),{once:true});}}><ambientLight intensity={.6}/><directionalLight position={[3,5,3]} intensity={3.2} castShadow shadow-mapSize={[512,512]}/><directionalLight position={[-4,2,1]} intensity={1.8} color="#ffe5d4"/><Suspense fallback={null}><Environment resolution={128}><Lightformer intensity={3} position={[0,3,3]} scale={[5,5,1]}/><Lightformer intensity={5} position={[-3,1,1]} rotation={[0,Math.PI/2,0]} scale={[2,5,1]}/><Lightformer intensity={2} position={[3,2,0]} rotation={[0,-Math.PI/2,0]} scale={[2,4,1]}/></Environment><group key={product.id} rotation={[0,rotation,0]} scale={zoom}><ProductModel family={product.family} color={product.color}/></group><ContactShadows key={`${product.id}-${rotation}-${zoom}`} position={[0,-1.23,0]} opacity={.27} scale={6} blur={2.5} far={4} resolution={256} frames={1}/></Suspense><OrbitControls ref={controls} makeDefault enablePan={false} enableZoom={false} minPolarAngle={Math.PI/4} maxPolarAngle={Math.PI/1.8} enableDamping dampingFactor={.1} rotateSpeed={.65}/></Canvas></SceneBoundary>}
  </div><div className="viewer-controls"><button className="icon-button" aria-label="Rotate product left" onClick={()=>setRotation(r=>r-.45)}><RotateCcw size={17}/></button><button className="icon-button" aria-label="Rotate product right" onClick={()=>setRotation(r=>r+.45)}><RotateCw size={17}/></button><span/><button className="icon-button" aria-label="Zoom out" disabled={zoom<=.7} onClick={()=>setZoom(z=>Math.max(.7,z-.1))}><Minus size={16}/></button><button className="icon-button" aria-label="Zoom in" disabled={zoom>=1.35} onClick={()=>setZoom(z=>Math.min(1.35,z+.1))}><Plus size={16}/></button><button className="reset-view" onClick={resetView}>Reset view</button></div></div>;
}
