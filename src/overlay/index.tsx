import InternalOverlay from './Overlay';
import Popup from './Popup';

type OverlayType = typeof InternalOverlay 
interface OverlayInterface extends OverlayType{
  Popup:typeof Popup
}

const Overlay = InternalOverlay as OverlayInterface
Overlay.Popup=Popup
export default Overlay
