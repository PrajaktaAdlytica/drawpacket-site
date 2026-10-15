import React from 'react';
import {AbsoluteFill,Composition,Folder,Sequence,registerRoot,useVideoConfig} from 'remotion';
import {Datum} from './Datum';
import {Month} from './Month';
import {Evidence} from './Evidence';
import {OpenDecision} from './OpenDecision';
import {Brand} from './Brand';
import {Handoff} from './Handoff';
function ReviewAperture(){const {fps}=useVideoConfig();return <AbsoluteFill style={{background:'#642A37'}}>
 <Sequence name="Datum" durationInFrames={1.5*fps} premountFor={fps}><Datum/></Sequence>
 <Sequence name="The month" from={.8*fps} durationInFrames={2*fps} premountFor={fps}><Month/></Sequence>
 <Sequence name="The evidence" from={2.2*fps} durationInFrames={1.9*fps} premountFor={fps}><Evidence/></Sequence>
 <Sequence name="The open decision" from={3.6*fps} durationInFrames={2*fps} premountFor={fps}><OpenDecision/></Sequence>
 <Sequence name="DrawPacket" from={5.2*fps} durationInFrames={1.5*fps} premountFor={fps}><Brand/></Sequence>
 <Sequence name="Open onto the hero" from={6.2*fps} durationInFrames={.8*fps} premountFor={fps}><Handoff/></Sequence>
</AbsoluteFill>}
const Root = () => <>
 <Composition id="ReviewAperture" component={ReviewAperture} width={1920} height={1080} fps={30} durationInFrames={210}/>
 <Composition id="ReviewApertureMobile" component={ReviewAperture} width={1080} height={1350} fps={30} durationInFrames={210}/>
 <Folder name="Scenes">
 <Composition id="Datum" component={Datum} width={1920} height={1080} fps={30} durationInFrames={45}/>
 <Composition id="Month" component={Month} width={1920} height={1080} fps={30} durationInFrames={60}/>
 <Composition id="Evidence" component={Evidence} width={1920} height={1080} fps={30} durationInFrames={57}/>
 <Composition id="OpenDecision" component={OpenDecision} width={1920} height={1080} fps={30} durationInFrames={60}/>
 <Composition id="Brand" component={Brand} width={1920} height={1080} fps={30} durationInFrames={45}/>
 <Composition id="Handoff" component={Handoff} width={1920} height={1080} fps={30} durationInFrames={24}/>
 </Folder>
</>;
registerRoot(Root);
