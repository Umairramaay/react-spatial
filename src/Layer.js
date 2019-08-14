import Observable from 'ol/Observable';
/**
 * A class representing layer to display on BasicMap with a name, a visibility,
 * a radioGroup, astatus and
 * an [ol/layer/Layer](https://openlayers.org/en/latest/apidoc/module-ol_layer_Layer-Layer.html)
 */
export default class Layer extends Observable {
  constructor({
    key,
    name,
    olLayer,
    radioGroup,
    isBaseLayer,
    hideInLegend,
    visible,
    copyright,
  }) {
    super();
    this.key = key || name.toLowerCase();
    this.name = name;
    this.olLayer = olLayer;
    this.isBaseLayer = isBaseLayer;
    this.hideInLegend = hideInLegend;
    this.radioGroup = radioGroup;
    this.children = [];
    this.visible = visible === undefined ? true : visible;
    this.copyright = copyright;

    if (this.olLayer) {
      this.olLayer.setVisible(this.visible);
    }
  }

  init(map) {
    this.map = map;
    if (this.map && this.olLayer) {
      map.addLayer(this.olLayer);
    }
  }

  getCopyright() {
    return this.copyright;
  }

  getName() {
    return this.name;
  }

  getKey() {
    return this.key;
  }

  getVisible() {
    return this.visible;
  }

  getIsBaseLayer() {
    return this.isBaseLayer;
  }

  getHideInLegend() {
    return this.hideInLegend;
  }

  getRadioGroup() {
    if (!this.radioGroup && this.isBaseLayer) {
      return 'baseLayer';
    }
    return this.radioGroup;
  }

  setRadioGroup(radioGroup) {
    this.radioGroup = radioGroup;
  }

  setVisible(
    visible,
    stopPropagationDown = false,
    stopPropagationUp = false,
    stopPropagationSiblings = false,
  ) {
    if (visible === this.visible) {
      return;
    }

    this.visible = visible;

    if (this.olLayer) {
      this.olLayer.setVisible(this.visible);
    }

    this.dispatchEvent({
      type: 'change:visible',
      target: this,
      stopPropagationDown,
      stopPropagationUp,
      stopPropagationSiblings,
    });
  }

  getChildren() {
    return this.children;
  }

  setChildren(layers) {
    this.children = layers;
  }

  getVisibleChildren() {
    return this.children.filter(c => c.getVisible() === true);
  }

  addChild(layer) {
    this.children.unshift(layer);
  }

  removeChild(name) {
    for (let i = 0; i < this.children.length; i += 1) {
      if (this.children[i].getName() === name) {
        this.children.splice(i, 1);
        return;
      }
    }
  }

  hasVisibleChildren() {
    return !!this.children.find(l => l.getVisible());
  }

  hasChildren(visible) {
    return !!this.children.find(l => visible === l.getVisible());
  }

  // eslint-disable-next-line class-methods-use-this
  onClick() {
    // This layer has no onClick.
    // The function is implemented by inheriting layers.
  }

  /**
   * Request feature information for a given coordinate.
   * @param {ol.Coordinate} coordinate Coordinate to request the information at.
   * @returns {Promise<Object>} Promise with features, layer and coordinate
   *  or null if no feature was hit.
   */
  getFeatureInfoAtCoordinate() {
    // This layer returns no feature info.
    // The function is implemented by inheriting layers.
    return Promise.resolve({
      layer: this,
      features: [],
    });
  }
}
