# Media Sync

<ComponentTabbedLinks slug={__slug} />

## Import

<ExperimentalWarning />

<ComponentImport tagName="vds-media-sync" />

## Usage

The `<vds-media-sync>` element manages playback and volume of multiple provider elements by
ensuring they're in sync.

### Sync Playback

The `shared-playback` attribute will ensure that only one media provider is playing at any given
moment. All providers that are wrapped with `<vds-media-sync>` and playing will be paused if a
new provider begins to play:

```html:copy
<vds-media-sync shared-playback>
  <!-- player/provider here. -->
</vds-media-sync>
```

### Sync Volume

The `shared-volume` attribute will synchronize the `muted` and `volume` state between all
providers that are wrapped with `<vds-media-sync>`:

```html:copy
<vds-media-sync shared-volume>
  <!-- player/provider here. -->
</vds-media-sync>
```

You can save the volume level to local storage, so it persists across page refreshes by using the
`volume-storage-key` attribute and giving it a storage key name like so:

```html:copy
<vds-media-sync shared-volume volume-storage-key="my-storage-key">
  <!-- player/provider here. -->
</vds-media-sync>
```

Finally, a `vds-media-volume-sync` event will be fired as the volume is synchronized.

```js:copy
player.addEventListener('vds-media-volume-sync', (event) => {
	const { muted, volume } = event.detail;
	// ...
});
```
