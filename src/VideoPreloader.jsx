import aboutVideo from './assets/AboutsMe.mp4'
import resumeVideo from './assets/Resumes.mp4'
import socialsVideo from './assets/Social.mp4'

// Buffers the About / Resume / Socials backgrounds while the user sits on
// the main menu, so page navigation swaps to an already-cached video.
export default function VideoPreloader() {
  return (
    <div aria-hidden="true" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: 1,
      height: 1,
      opacity: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: -1,
    }}>
      <video src={aboutVideo} preload="auto" muted playsInline />
      <video src={resumeVideo} preload="auto" muted playsInline />
      <video src={socialsVideo} preload="auto" muted playsInline />
    </div>
  )
}
