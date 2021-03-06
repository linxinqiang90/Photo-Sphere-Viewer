# Equirectangular tiles adapter

This adapter is used to load equirectangular panoramas which has been sliced into many smaller files, it drastically improve the initial loading time and the used bandwidth.

```js
new PhotoSphereViewer.Viewer({
  adapter: PhotoSphereViewer.EquirectangularTilesAdapter,
  panorama: {
    width: 6000,
    cols: 16,
    rows: 8,
    baseUrl: 'low_res.jpg',
    tileUrl: (col, row) => {
      return `tile_${col}x${row}.jpg`;
    },
  },
});
```

::: warning
This adapter does not use `panoData` option. You can use `sphereCorrection` if the tilt/roll/pan needs to be corrected.
:::


## Example

<iframe style="width: 100%; height: 600px;" src="//jsfiddle.net/mistic100/419yhpek/embedded/result,js/dark" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


## Configuration

When using this adapter the `panorama` option and the `setPanorama()` method accept an object to configure the tiles.

#### `width` (required)
- type: `number`

Total width of the panorama, the height is always width / 2.

#### `cols` (required)
- type: `number`

Number of columns, must  be power of two (4, 6, 16, etc.) and the maximum value is 64.

#### `rows` (required)
- type: `number`

Number of rows, must  be power of two (4, 6, 16, etc.) and the maximum value is 32.

#### `tileUrl` (required)
- type: `function: (col, row) => string`

Function used to build the URL of a tile.

#### `baseUrl` (recommended)
- type: `string`

URL of a low resolution complete panorama image to display while the tiles are loading.


## Preparing the panorama

The tiles can be easily generated using [ImageMagick](https://imagemagick.org) software.

Let's say you have a 12000x6000 pixels panorama you want to split in 32 columns and 16 rows, use the following command:

```
magick panorama.jpg -crop 375x375 tile_%04d.jpg
```
