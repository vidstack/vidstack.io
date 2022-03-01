---
description: Brief introduction to Vidstack Player.
---

# Player Foundation

In this section, we'll go through some of the basics of working with the Vidstack Player.
The 'Core Concepts' section dives deeper into what we'll be covering here; this page only
contains a high-level overview.

## Player Reference

You can use the query selector API if you're writing vanilla JS:

```js
const player = document.querySelector('vds-video-player');
```

You can check out any of these links if you're using a JS library or framework:

- [Angular Refs](https://ultimatecourses.com/blog/element-refs-in-angular-templates)
- [Lit `ref`](https://lit.dev/docs/templates/directives/#ref)
- [Preact `createRef`](https://preactjs.com/guide/v10/refs/)
- [React `useRef`](https://reactjs.org/docs/hooks-reference.html#useref)
- [Svelte Instance Bindings](https://svelte.dev/tutorial/component-this)
- [Vue Template Refs](https://vuejs.org/guide/essentials/template-refs.html)

## Player Types

You can obtain the player type from the package if you're using TypeScript:

```ts:copy
import { type VideoPlayerElement } from '@vidstack/player';

let player: VideoPlayerElement;
```

## Media Store

The player has a media store that keeps track of the running state of the player. A store in
the player is a simple pub/sub mechanism for creating reactive state, updating the value,
and subscribing to state changes. The implementation was derived
from [Svelte Stores](https://svelte.dev/docs#run-time-svelte-store).

The store enables you to subscribe directly to specific media state changes, rather than
listening to potentially multiple DOM events and binding it yourself. You can access it off
the `store` property on the player.

:::no
Tracking media state via events:
:::

```js
let paused = true;

player.addEventListener('vds-pause', () => {
	paused = true;
});

player.addEventListener('vds-play', () => {
	paused = false;
});
```

:::yes
Tracking media state via store subscription:
:::

```js
const unsubscribe = player.store.paused.subscribe(($paused) => {
	console.log('Is Paused:', $paused);
});

unsubscribe();
```

## Media State

The player exposes a superset of the [`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)
API. Therefore, you can swap out a native provider (e.g., `<video>`) for a Vidstack implementation
(e.g., `<vds-video-player>`) and it'll just work :tada:

You can update media state by changing attribute or property values. Actions that require the
media to be ready are queued and applied right after the `vds-can-play` event is fired. Only the
last change is executed if it's applied more than once before media is ready for playback.
Therefore, we always recommend updating state through attributes or properties unless you
explicitly want to handle the result of some method.

**Attribute**

```html
<!-- Paused. -->
<vds-video-player paused />
<!-- Still Paused. -->
<vds-video-player paused="false" />
<!-- Not Paused. -->
<vds-video-player />
```

**Property**

```js
// Safely queued and executed after player is ready.
player.paused = false;
// Executed immediately regardless of player state (throws).
player.play();
```

## Media Events

The player fires a superset of `HTMLMediaElement` events. You can kebab-case and prefix any
[native media event type](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#events)
with `vds-` to get the custom variant.

- `loadedmetadata` -> `vds-loaded-metadata`
- `canplay` -> `vds-can-play`
- `play` -> `vds-play`

The player still dispatches the original media event (e.g., `play`) for backwards compatibility. Prefer
the custom variant as it smooths out any issues, and contains rich information such as the
request event that triggered it, or the origin event that kicked it off.

### Request Events

Request events are fired when 'requesting' the player to update the provider's state. For example,
the `vds-play-request` event is a request to begin/resume playback, and as a consequence it'll
trigger a `play()` call. The provider should respond with a `vds-play` event to confirm the
request was satisfied.

```js
player.addEventListener('vds-play–request', () => {
	console.log('Play request was made.');
});

player.addEventListener('vds-play', (event) => {
	// Request events are attached to media events.
	const playRequestEvent = event.requestEvent;
	console.log('Play request was satisfied.');
});

playButton.dispatchEvent('vds-play-request', { bubbles: true });
```

### Event Triggers

All events in the player keep a history of **trigger** events. They are stored as a
chain of events, where each event points to the event that came before it. The chain goes back
to the **origin event**, which is the event that started the chain.

```js
player.addEventListener('vds-play', (event) => {
	// Was this triggered by an actual person?
	const userPlayed = event.isOriginTrusted;
});

player.addEventListener('vds-playing', (event) => {
	// Is this resuming from buffering?
	if (event.triggerEvent?.type === 'vds-waiting') {
		// ...
	}
});
```

Here's an example chain (each <- represents a call to `triggerEvent`):

`vds-playing` <- `playing` (native) <- `vds-play` <- `play` (native) <- `vds-play-request`
<- `pointerdown` (origin event) <- `null`.

## Media Elements

We provide a variety of elements out of the box that help enhance the player. Some provide visual
controls such as `vds-play-button` or `vds-time-slider`, and others manage one or many player
instances such as `vds-media-sync` or `vds-media-visibility`.

We recommend either searching (`cmd + k`) for what you're looking for or browsing the sidebar. Each
element contains comprehensive documentation on what it does and how to use it.

## Media Styling

:::tip
Remove the `controls` attribute on the player if you're building a custom UI to avoid
double controls (i.e., native and custom).
:::

All UI elements in the library are headless meaning they contain no styling out of the box. It's
completely up to you how they look as they only provide some core functionality. For example, the
`vds-play-button` element will dispatch play and pause requests when pressed.

The player exposes media state as attributes and CSS variables on the `vds-media-ui` element:

```html
<vds-video-player src="...">
	<vds-media-ui
		media-paused
		media-waiting
		media-can-play
		...
		style="--media-current-time: 500; --media-duration: 1000; ..."
	>
		<!-- ... -->
	</vds-media-ui>
</vds-video-player>
```

Media state is exposed in this way so you can style your player elements without being forced
to write JS. We can now update the UI using CSS:

```css
.pause-icon {
	opacity: 100;
}

[media-paused] .pause-icon {
	opacity: 0;
}
```

Refer to each element's respective docs in the library for more information on how you can style them.
