import React from 'react';
import {AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/fonts';

loadFont({family:'Cycle',url:staticFile('brand/fonts/display.woff2')});
loadFont({family:'DM',url:staticFile('brand/fonts/dm.woff2')});
loadFont({family:'Mono',url:staticFile('brand/fonts/mono.woff2')});
export const C={ox:'#642A37',wine:'#321C26',chalk:'#F5F5F1',lilac:'#DFDBE8',ink:'#252225',amber:'#F6DFBA'};
export const ease={extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.22,1,.36,1)};
export const move=(f,a,b,from=0,to=1)=>interpolate(f,[a,b],[from,to],ease);
export function useScene(){const f=useCurrentFrame();const {fps,width,height}=useVideoConfig();return {f,fps,w:width,h:height,mobile:width<height};}
export const type={fontFamily:'Cycle',fontWeight:400,lineHeight:.94,letterSpacing:'-.015em'};
export const mono={fontFamily:'Mono',fontSize:24,letterSpacing:3,lineHeight:1.5};
export function Surface({children,style}){return <AbsoluteFill style={{background:C.ox,color:C.chalk,fontFamily:'DM',overflow:'hidden',...style}}>{children}</AbsoluteFill>}
export function Disclosure(){const {mobile}=useScene();return <div style={{position:'absolute',bottom:mobile?76:62,left:mobile?80:110,...mono,fontSize:mobile?22:20,letterSpacing:2,color:'inherit'}}>DEMO — SYNTHETIC DATA · CONCEPT PREVIEW</div>}
export function VerticalReveal({children,delay=0}){const {f,fps}=useScene();return <AbsoluteFill style={{clipPath:`inset(0 ${move(f,delay*fps,(delay+.55)*fps,50,0)}%)`}}>{children}</AbsoluteFill>}
