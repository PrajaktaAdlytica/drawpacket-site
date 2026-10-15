import React from 'react';
import {Img,staticFile} from 'remotion';
import {Surface,C,move,useScene} from './shared';
export function Brand(){const {f,fps,mobile}=useScene();return <Surface style={{clipPath:`inset(0 ${move(f,0,.4*fps,50,0)}%)`}}><div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:42,translate:`0 ${move(f,.1*fps,.6*fps,24,0)}px`}}><Img src={staticFile('brand/logos/drawpacket-horizontal-white.svg')} style={{width:mobile?830:1080}}/><div style={{fontSize:mobile?34:42,color:C.chalk,opacity:move(f,.2*fps,.6*fps),textAlign:'center'}}>Evidence in view. Decisions with people.</div></div></Surface>}
