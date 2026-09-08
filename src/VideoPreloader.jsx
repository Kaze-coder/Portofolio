import main1 from './assets/main1.mp4'
import main2 from './assets/main2.mp4'
import main3 from './assets/main3.mp4'

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
      <video src={main1} preload="auto" muted playsInline />
      <video src={main2} preload="auto" muted playsInline />
      <video src={main3} preload="auto" muted playsInline />
    </div>
  )
}
