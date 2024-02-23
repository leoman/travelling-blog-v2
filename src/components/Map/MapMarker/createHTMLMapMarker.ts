// eslint-disable-next-line no-undef
export const createHTMLMapMarker = ({ OverlayView = google.maps.OverlayView,  ...args }) => {
  class HTMLMapMarker extends OverlayView {
    public latlng: google.maps.LatLng
    public html: string
    public div: HTMLDivElement | null
    
    constructor() {
      super();
      this.div = null;
      this.latlng = args.latlng;
      this.html = args.html;
      this.setMap(args.map);
    }

    createDiv() {
      this.div = document.createElement('div');
      this.div.style.position = 'absolute';
      this.div.style.width = '30px';
      this.div.style.height = '30px';
      this.div.className = 'map-marker-wrapper'
      if (this.html) {
        this.div.innerHTML = this.html;
      }
    }

    appendDivToOverlay() {
      const panes = this.getPanes();
      if (panes && this.div) {
        panes.overlayLayer.appendChild(this.div);
      }
    }

    positionDiv() {
      const point = this.getProjection().fromLatLngToDivPixel(this.latlng);
      if (point && this.div) {
        this.div.style.left = `${point.x}px`;
        this.div.style.top = `${point.y}px`;
      }
    }

    draw() {
      if (!this.div) {
        this.createDiv();
        this.appendDivToOverlay();
      }
      this.positionDiv();
    }

    remove() {
      if (this.div && this.div.parentNode) {
        this.div.parentNode.removeChild(this.div);
      }
      if (this.div) {
        this.div = null;
      }
    }

    getPosition() {
      return this.latlng;
    }

    getDraggable() {
      return false;
    }
  } 
  return new HTMLMapMarker();
};

export default createHTMLMapMarker;