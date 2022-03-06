---
description: Introduction to using Vidstack Player with Svelte.
---

# Svelte

In this section, you'll find a simple overview of how to use the library with Svelte.

## Importing Components

You can import any component from the path `@vidstack/player/define/*`. The import will safely
register the custom element and any dependencies so you can start using it.

```svelte:title=MyPlayer.svelte:copy
<script>
	// `.js` extension is required for Node exports to work.
  import '@vidstack/player/define/vds-video-player.js';
  import '@vidstack/player/define/vds-play-button.js';
</script>

<vds-video-player>
  <vds-media-ui>
		<vds-play-button />
	</vds-media-ui>
</vds-video-player>
```

## Element References

You can use [instance bindings](https://svelte.dev/tutorial/component-this) to obtain a
reference to a custom element if needed. This is _generally_ only required when calling a method.

```svelte
<script lang="ts">
	import { type VideoPlayerElement } from '@vidstack/player';

	let videoPlayer: VideoPlayerElement;

	$: if (videoPlayer) {
		const canPlayType = videoPlayer.canPlayType('video/mp4');
		// ...
	}
</script>

<vds-video-player bind:this={videoPlayer} />
```

## Properties

Svelte automatically checks DOM-property presence using the `in` operator and will prefer setting
the value as a DOM property if the key is present; therefore, you can pass in complex data types
such as objects and arrays without any issues.

```svelte
<vds-hls hls-config={{ lowLatencyMode: true }} />
```

Typically this would fail since `hls-config` is _not_ a property on `HlsElement`, but we define
it as one, so you can go on with your day and not worry about whether to use `hls-config` or `hlsConfig`.

## Events

You can listen to custom events just as you would listen to any other event. All event types
can be imported from the `@vidstack/player` module.

```svelte
<script lang="ts">
	import { type MediaPlayingEvent } from '@vidstack/player';

	function onPlaying(event: MediaPlayingEvent) {
		// ...
	}
</script>

<vds-video-player on:vds-playing={onPlaying} />
```

## Media Store

The media store enables you to subscribe directly to specific media state changes, rather than
listening to potentially multiple DOM events and binding it yourself. Here's an example of
creating a custom `mediaStore` helper function so you can easily bind to reactive media state on
the player:

```ts:title=mediaStore.ts:copy
import { derived, get, type Readable, writable } from 'svelte/store';
import {
	createMediaStore,
	type MediaContext,
	type MediaProviderElement
} from '@vidstack/player';

const defaults = createMediaStore();

export function mediaStore<T extends keyof MediaContext>(prop: T) {
  const provider = writable<MediaProviderElement | null>(null);

  const value = derived(provider, ($provider, set) => {
    if (!$provider) set(get(defaults[prop] as any));
    return $provider?.store[prop]?.subscribe(set);
  });

  return [provider, value as Readable<MediaContext[T]>] as const;
}
```

```svelte:title=MyPlayer.svelte:copy
<script lang="ts">
	import { mediaStore } from './mediaStore';

	const [provider, paused] = mediaStore('paused');

	$: console.log($paused);
</script>

<vds-video-player bind:this={$provider} />
```
