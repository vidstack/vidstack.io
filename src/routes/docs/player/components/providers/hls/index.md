<script>
import Docs from './_Docs.md';
</script>

<Docs>

```html:copy:slot=usage
<vds-hls
	controls
	width="1280"
	height="720"
	loading="lazy"
	src="https://media-files.vidstack.io/hls/index.m3u8"
	poster="https://media-files.vidstack.io/poster.png"
></vds-hls>
```

```html:copy:slot=player
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

```html:slot=loading-hls
<!-- Default development URL. -->
<vds-hls
  hls-library="https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.light.js"
/>
<!-- Default production URL. -->
<vds-hls
  hls-library="https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.light.min.js"
/>
```

<svelte:fragment slot="importing-hls">

```js:slot{1,4}
import Hls from 'hls.js';

const element = document.createElement('vds-hls');
element.hlsLibrary = Hls;
```

```svelte:copy-highlight{6}
<script>
  import Hls from 'hls.js';
</script>

<vds-hls
  hls-library={Hls}
/>
```

</svelte:fragment>

<svelte:fragment slot="dynamically-import-hls">

```js{2}
const element = document.createElement('vds-hls');
element.hlsLibrary = () => import('hls.js');
```

```svelte:copy-highlight{2}
<vds-hls
  hls-library={() => import('hls.js')}
/>
```

</svelte:fragment>

<svelte:fragment slot="configuring-hls">

```js{2}
const element = document.createElement('vds-hls');
element.hlsConfig = { lowLatencyMode: true };
```

```svelte:copy-highlight{2}
<vds-hls
  hls-config={{ lowLatencyMode: true }}
/>
```

</svelte:fragment>

<svelte:fragment slot="hls-engine">

```js{2}
const element = document.createElement('vds-hls');
const hlsjs = element.hlsEngine;
```

```svelte:copy
<script lang="ts">
  import { type HlsElement } from '@vidstack/player';

  let hlsProvider: HlsElement;

  $: hlsEngine = hlsProvider?.hlsEngine;
</script>

<vds-hls
	bind:this={hlsProvider}
/>
```

</svelte:fragment>

<svelte:fragment slot="hls-engine-events">

```js{3-10}
const element = document.createElement('vds-hls');

element.addEventListener('vds-hls-instance', (event) => {
	const hlsjs = event.detail;
	// ...
});

element.addEventListener('vds-hls-destroying', (event) => {
	// ...
});
```

</svelte:fragment>

<svelte:fragment slot="hls-events">

```js{3-6}
const element = document.createElement('vds-hls');

element.addEventListener('vds-hls-manifest-loaded', (event) => {
  const levelLoadedData = event.detail;
  // ...
});
```

```svelte:copy
<script>
  function onHlsManifestLoaded(event) {
		const levelLoadedData = event.detail;
	  // ...
  }
</script>

<vds-hls
  on:vds-hls-manifest-loaded={onHlsManifestLoaded}
/>
```

</svelte:fragment>

</Docs>
