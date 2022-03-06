---
description: Introduction to using the React distribution.
---

# React

In this section, you'll find a simple overview of how to use the React version of the library.

## Importing Components

You can import all components from the path `@vidstack/player/react`. Component names mirror
the element tag name except they're in PascalCase without the `vds` prefix.

- `vds-play-button` -> `PlayButton`
- `vds-slider-value-text` -> `SliderValueText`

```js
import { VideoPlayer, PlayButton } from '@vidstack/player/react';
```

## Element References

All components forward the underlying custom element reference, so you can use the familiar
`useRef` hook to get a hold of it. This is _generally_ only required when calling a method.

```tsx
import { useRef, useEffect } from 'React';
import { type VideoPlayerElement } from '@vidstack/player';
import { VideoPlayer } from '@vidstack/player/react';

function MyPlayer() {
	const playerRef = useRef<VideoPlayerElement>(null);

	useEffect(() => {
		const canPlayType = playerRef.current!.canPlayType('video/mp4');
		// ...
	}, []);

	return <VideoPlayer ref={playerRef} />;
}
```

## Properties

We expose all custom element properties on the React wrapper, which gets forwarded to the
element itself.

```tsx
import { useState } from 'React';
import { HlsPlayer } from '@vidstack/player/react';

function MyPlayer() {
	const [paused, setPaused] = useState(true);
	return <HlsPlayer paused={paused} hlsConfig={{ lowLatencyMode: true }} />;
}
```

## Events

All custom events are forwarded to a callback whose name mirrors the original event name but in
PascalCase, and without the `vds` prefix.

- `vds-play` -> `onPlay`
- `vds-can-play` -> `onCanPlay`

```tsx
import { type MediaPlayingEvent } from '@vidstack/player';
import { VideoPlayer } from '@vidstack/player/react';

function MyPlayer() {
	function onPlaying(event: MediaPlayingEvent) {
		// ...
	}

	return <VideoPlayer onPlaying={onPlaying} />;
}
```

## Media Store

The media store enables you to subscribe directly to specific media state changes, rather than
listening to potentially multiple DOM events and binding it yourself. Here's an example of
creating a custom `useMediaStore` hook so you can easily bind to reactive media state:

```ts:title=useMediaStore.ts:copy
import { useRef, useState } from 'React';
import {
	get,
	createMediaStore,
	type MediaContext,
	type MediaProviderElement
} from '@vidstack/player';

const defaults = createMediaStore();

export function useMediaStore<T extends keyof MediaContext>(prop: T) {
	const providerRef = useRef<MediaProviderElement>(null);

	const [value, setValue] = useState<MediaContext[T]>(
		get(defaults[prop]) as any
	);

	useEffect(() => {
		const store = providerRef.current?.store[prop];
		return store?.subscribe(setValue);
	}, []);

	return [providerRef, value] as const;
}
```

```tsx:title=MyPlayer.tsx:copy
import { useEffect } from 'React';
import { useMediaStore } from './useMediaStore';
import { VideoPlayer } from '@vidstack/player/react';

function MyPlayer() {
	const [providerRef, paused] = useMediaStore('paused');

	useEffect(() => {
		console.log(paused);
	}, [paused]);

	return <VideoPlayer src="..." ref={providerRef} />
}
```
