# HLS

<ComponentTabbedLinks slug={__slug} />

## Install

You'll need to install `hls.js` if you're using the HLS provider locally (i.e., not over a CDN):

```bash:copy
npm i hls.js
```

## Import

Use the following import if you'd like to use the HLS provider standalone:

<ComponentImport tagName="vds-hls" />

## Usage

:::info
The HLS provider extends the API of the native `<video>` element so you can replace
it with `<vds-hls>` and it'll just work! Refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
for more information about the native `<video>` element.
:::

Embeds streamable video content into documents using the native `<video>` element, and streams media using
the [HTTP Live Streaming (HLS)](https://en.wikipedia.org/wiki/HTTP_Live_Streaming) protocol.
HLS streaming is [supported natively](https://caniuse.com/?search=hls) in some browsers (e.g., iOS Safari),
otherwise, we fallback to using [`hls.js`](https://github.com/video-dev/hls.js).

```html:copy
<vds-hls
	controls
	width="1280"
	height="720"
	loading="lazy"
	src="https://media-files.vidstack.io/hls/index.m3u8"
	poster="https://media-files.vidstack.io/poster.png"
></vds-hls>
```

## Player

The `<vds-hls-player>` is a light extension on top of `<vds-hls>` to enable a custom player UI
to be built by exposing the `ui` slot. Thus, the entire HLS provider's API is available when
interacting with the `<vds-hls-player>` element.

```html:copy
<vds-hls-player
	width="1280"
	height="720"
	loading="lazy"
	src="https://media-files.vidstack.io/hls/index.m3u8"
	poster="https://media-files.vidstack.io/poster.png"
>
	<vds-media-ui slot="ui">
		<!-- ... -->
	</vds-media-ui>
</vds-hls-player>
```

## Loading `hls.js`

The HLS provider will default to loading the light version of `hls.js` from [JSDelivr](https://jsdelivr.com). We load
the default bundle in development, and the minified version in production.

```html
<!-- Default development URL. -->
<vds-hls hls-library="https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.light.js" />
<!-- Default production URL. -->
<vds-hls hls-library="https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.light.min.js" />
```

You can point `hls-library` at any URL that re-exports `hls.js@^1.0`. This means you can use your
own server or CDN if desired.

### Importing `hls.js`

Generally when using a JS library you might want to statically, or dynamically import `hls.js`
and pass it in as a property:

```svelte:copy
<script>
import Hls from 'hls.js';
</script>

<!-- Make sure to set as property in your chosen JS library. -->
<vds-hls hls-library={Hls}></vds-hls>
```

Or, you can dynamically import it like so:

```svelte:copy
<!-- Make sure to set as property in your chosen JS library. -->
<vds-hls hls-library={() => import('hls.js')} />
```

### Load Events

The provider will fire the following events while loading `hls.js`:

- `vds-hls-lib-load-start`: Fired when we begin downloading the library.
- `vds-hls-lib-loaded`: Fired when the library has been loaded.
- `vds-hls-lib-load-error`: Fired when the library _fails_ to download.

These events are fired regardless of how you decide to load the library (i.e., import or CDN).

## Configuring `hls.js`

You can configure `hls.js` using the `hlsConfig` property. First obtain a reference to the
`<vds-hls>` instance, then set it like so:

```js
provider.hlsConfig = { lowLatencyMode: true };
```

You can pass it in using markup if you're building with a JS library like so:

```svelte:copy
<!-- Make sure to set as property in your chosen JS library. -->
<vds-hls hls-config={{ lowLatencyMode: true }}></vds-hls>
```

## HLS Engine

If you need access to the `hls.js` instance, you can access it off the `hlsEngine` property
on the `<vds-hls>` element:

```js
const hlsjs = provider.hlsEngine;
```

Listen to the `vds-hls-instance` event to be notified of when it's created, and the
`vds-hls-destroying` event for when it will be destroyed.

```js:copy
provider.addEventListener('vds-hls-instance', (event) => {
	const hlsjs = event.detail;
})

provider.addEventListener('vds-hls-destroying', (event) => {
	// ...
})
```

## HLS Events

All [`hls.js` events](https://github.com/video-dev/hls.js/blob/master/docs/API.md#runtime-events)
can be listened to directly off the `<vds-hls>` element. Every event name is in kebab-case
with the `vds` prefix. Some examples include:

- `Hls.Events.MEDIA_ATTACHED` -> `vds-hls-media-attached`
- `Hls.Events.MANIFEST_LOADED` -> `vds-hls-manifest-loaded`
- `Hls.Events.LEVEL_SWITCHING` -> `vds-hls-level-switching`

```js:copy
provider.addEventListener('vds-hls-manifest-loaded', (event) => {
	// ...
})
```

```svelte:copy-highlight{2}
<vds-hls
	on:vds-hls-manifest-loaded={onManifestLoaded}
></vds-hls>
```

You can find a [list of all provider events](/docs/player/elements/providers/hls/api#events) in
the API reference.
