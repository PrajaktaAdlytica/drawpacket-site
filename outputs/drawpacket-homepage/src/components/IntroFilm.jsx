import {useEffect, useRef, useState} from 'react';
import {Icon} from './UI';
import './intro-film.css';

/** The intro is a normal document chapter, never a gate to the homepage. */
export default function IntroFilm({reduced, onContinue, onVisibilityChange}) {
  const section=useRef(null), video=useRef(null), manuallyPaused=useRef(false), finished=useRef(false);
  const [format,setFormat]=useState(null), [systemReduced,setSystemReduced]=useState(false);
  const [playing,setPlaying]=useState(false), [ended,setEnded]=useState(false), [light,setLight]=useState(false), [error,setError]=useState(false);
  const [progress,setProgress]=useState(0), [inView,setInView]=useState(true);
  const staticMode=reduced||systemReduced;
  useEffect(()=>{
    const size=matchMedia('(min-width: 900px)'), motion=matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>{setFormat(size.matches?'desktop':'mobile');setSystemReduced(motion.matches);};
    update(); size.addEventListener('change',update); motion.addEventListener('change',update);
    return()=>{size.removeEventListener('change',update);motion.removeEventListener('change',update);};
  },[]);
  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>setInView(entry.isIntersecting&&entry.intersectionRatio>.35),{threshold:[0,.35,.6]});
    observer.observe(section.current); return()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    onVisibilityChange?.(inView);
    return()=>onVisibilityChange?.(false);
  },[inView,onVisibilityChange]);
  useEffect(()=>{
    finished.current=false;manuallyPaused.current=false;
    setPlaying(false);setEnded(false);setProgress(0);setLight(false);setError(false);
  },[format,staticMode]);
  useEffect(()=>{
    const el=video.current;
    if(!el||staticMode||!format)return;
    const sync=()=>{
      if(!inView||document.hidden||manuallyPaused.current||finished.current){el.pause();return;}
      el.play().catch(()=>setPlaying(false));
    };
    sync(); document.addEventListener('visibilitychange',sync);
    return()=>{el.pause();document.removeEventListener('visibilitychange',sync);};
  },[format,staticMode,inView]);
  function togglePlayback(){
    const el=video.current;if(!el)return;
    if(!el.paused){manuallyPaused.current=true;el.pause();return;}
    manuallyPaused.current=false;
    if(error){el.load();setError(false);}
    if(finished.current){el.currentTime=0;finished.current=false;setEnded(false);setLight(false);}
    el.play().catch(()=>setPlaying(false));
  }
  function continueToHero(e){
    manuallyPaused.current=true;video.current?.pause();onContinue(e,'opening');
    document.getElementById('hero-title')?.focus({preventScroll:true});
  }
  function finishIntro(){
    if(finished.current)return;
    finished.current=true;setEnded(true);setPlaying(false);setProgress(1);setLight(true);
    requestAnimationFrame(()=>{
      onContinue(null,'opening');
      document.getElementById('hero-title')?.focus({preventScroll:true});
    });
  }
  const label=error?'Retry intro':ended?'Replay intro':playing?'Pause intro':'Play intro';
  return <section ref={section} id="intro" className={`intro-film ${light&&!staticMode?'intro-film--light':''}`} aria-label="DrawPacket opening film">
    <div className="intro-film__eyebrow"><span>DrawPacket / The review aperture</span><span>Concept preview</span></div>
    <div className="intro-film__stage">
      {(!format||staticMode)?<picture><source media="(min-width:900px)" srcSet="/media/drawpacket-intro-poster-desktop.jpg"/><img className="intro-film__poster" src="/media/drawpacket-intro-poster-mobile.jpg" alt="DrawPacket. Evidence in view. Decisions with people."/></picture>:
      <video ref={video} key={format} className="intro-film__video" src={`/media/drawpacket-intro-${format}.mp4`} poster={`/media/drawpacket-intro-poster-${format}.jpg`} muted playsInline preload="metadata" aria-label="The Review Aperture — seven-second silent introduction" aria-describedby="intro-description"
        onPlay={()=>{setPlaying(true);setError(false);}} onPause={()=>setPlaying(false)}
        onTimeUpdate={(e)=>{setProgress(e.currentTarget.currentTime/7);setLight(e.currentTarget.currentTime>6.55);}}
        onEnded={finishIntro}
        onError={()=>{setError(true);setPlaying(false);}}/>
      }
    </div>
    <p id="intro-description" className="sr-only">A seven-second silent film. Shutters reveal the month and its evidence, then a synthetic Stoneway Mechanical PA-07 record with a missing waiver and a $6,000 variance. GC approval remains pending. DrawPacket: evidence in view, decisions with people. The shutters open onto Bring the month into focus. No signing or payment execution.</p>
    <div className="intro-film__controls">
      <div className="intro-film__transport">{staticMode?<span className="intro-film__mode">Still preview · reduced motion</span>:<button onClick={togglePlayback} aria-label={label}><Icon name={playing?'player-pause':'player-play'}/><span>{label}</span></button>}<span className="intro-film__duration">{error?'Video unavailable · continue below':'00:07 / Silent film'}</span></div>
      <a className="intro-film__continue" href="#opening" onClick={continueToHero}><span>{ended||staticMode?'Enter the month':'Skip intro'}</span><Icon name="arrow-down"/></a>
    </div>
    <div className="intro-film__progress" aria-hidden="true"><span style={{transform:`scaleX(${staticMode?1:progress})`}}/></div>
  </section>;
}
