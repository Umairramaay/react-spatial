#

This demonstrates the use of Permalink.

```jsx
import React from 'react';
import Permalink from 'react-spatial/components/Permalink';
import BasicMap from 'react-spatial/components/BasicMap';
import LayerService from 'react-spatial/LayerService';
import Map from 'ol/Map';
import ConfigReader from '../../ConfigReader';

const layers = ConfigReader.readConfig(treeData);
const layerService = new LayerService(layers);
const map = new Map({ controls: [] });

const populationLayer = layerService.getLayer('USA Population Density');
const baseLayers = layerService.getBaseLayers();

<div className="rs-permalink-example">
  <BasicMap map={map} layers={layers} tabIndex={0} />
  <Permalink
    map={map}
    layerService={layerService}
    params={{
      mode: 'custom',
    }}
    isLayerHidden={l => l.get('hideInLegend') || layerService.getParents(l).some(pl => pl.get('hideInLegend'))}
  />
  <div
    role="button"
    onClick={() => {
      populationLayer.setVisible(!populationLayer.visible);
    }}
  >
    Toggle population layer
  </div>
  <div
    role="button"
    onClick={() => {
      if (baseLayers[1].visible) {
        baseLayers[0].setVisible(true);
      } else {
        baseLayers[1].setVisible(true);
      }
    }}
  >
    Change base layer
  </div>
</div>;
```
