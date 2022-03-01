---
description: Introduction to styling Vidstack Player.
---

# Player Styling

Remove the `controls` attribute on the player if you're building a custom UI to avoid
double controls (i.e., native and custom).

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
