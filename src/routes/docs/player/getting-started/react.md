---
description: Introduction to using the React distribution.
---

# React Integration

In this section, you'll find a simple overview of how to use the React version of the library.

## Import

You can import all components from the path `@vidstack/player/react`. Component names mirror
the element tag name except they're in PascalCase without the `vds` prefix.

- `vds-play-button` -> `PlayButton`
- `vds-slider-value-text` -> `SliderValueText`

```js
import { VideoPlayer, PlayButton } from '@vidstack/player/react';
```

## Reference

All components forward the underlying custom element reference.

```tsx
import { useRef } from 'React';
import { type VideoPlayerElement } from '@vidstack/player';
import { VideoPlayer } from '@vidstack/player/react';

function Example() {
	const playerRef = useRef<VideoPlayerElement>(null);
	// ...
	return <VideoPlayer ref={playerRef} />;
}
```

## Properties

We expose all custom element properties on the React wrapper, which gets forwarded to the
element itself.

```tsx
import { HlsPlayer } from '@vidstack/player/react';

function Example() {
	return <HlsPlayer paused hlsConfig={{ lowLatencyMode: true }} />;
}
```

## Events

All custom events are forwarded to a callback whose name mirrors the event name without the `vds` prefix
and in PascalCase.

- `vds-play` -> `onPlay`
- `vds-can-play` -> `onCanPlay`

```tsx
import { type MediaPlayEvent } from '@vidstack/player';
import { VideoPlayer } from '@vidstack/player/react';

function Example() {
	function onPlay(event: MediaPlayEvent) {
		// ...
	}

	return <VideoPlayer onPlay={onPlay} />;
}
```
