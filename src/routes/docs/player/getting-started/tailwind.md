---
description: Register player plugin to add `media-*` variants to Tailwind CSS.
---

# Tailwind Plugin

In this section you'll learn how to install our Tailwind CSS plugin and how to use it.

## Why?

If you're a fan of Tailwind CSS like we are, then you _really_ don't want to be forced to create
a `.css` file to handle random outlier cases. It not only slows you down and breaks your flow,
but it also goes against all the
[advantages of using utility classes](https://adamwathan.me/css-utility-classes-and-separation-of-concerns).

## Installation

You can register the plugin by adding the following to `tailwind.config.js`,

```js:title=tailwind.config.js:copy-highlight{3}
module.exports = {
  plugins: [
		require('@vidstack/player/tailwind.cjs'),
  ]
}
```

## Usage

The Vidstack Player exposes media state on the `vds-media-ui` element. For example,

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

This state is exposed as attributes and CSS properties on `vds-media-ui` so you can style your
player elements without being forced to write JS. If we were to write vanilla CSS to show and
hide icons inside a play button, it might look something like this,

```css
.media-play-icon,
[media-paused] .media-pause-icon {
	opacity: 0;
}

.media-pause-icon,
[media-paused] .media-play-icon {
	opacity: 100;
}
```

Using the Tailwind plugin we could rewrite it like so,

```html{4-7}
<vds-video-player src="...">
	<vds-media-ui>
		<vds-play-button>
			<!-- Pause Icon. -->
			<svg class="media-paused:opacity-0 opacity-100"></svg>
			<!-- Play Icon. -->
			<svg class="media-paused:opacity-100 opacity-0"></svg>
		</vds-play-button>
	</vds-media-ui>
</vds-video-player>
```

Isn't that so much easier to comprehend? Well that's basically the plugin in a nutshell,
we'll leave the rest to your imagination. In the next sections, you'll find out more about
each of the variants and CSS variables available when using our plugin.

## Media Variants

| Variant                | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `media-autoplay`       | Autoplay has successfully started.                 |
| `media-autoplay-error` | Autoplay has failed to start.                      |
| `media-can-load`       | Media can begin loading.                           |
| `media-can-play`       | Media is ready to be played.                       |
| `media-can-fullscreen` | Media fullscreen is available.                     |
| `media-ended`          | Playback has reached the end.                      |
| `media-error`          | Issue with media loading/playback.                 |
| `media-fullscreen`     | Media is in fullscreen mode.                       |
| `media-idle`           | User is not active during playback.                |
| `media-loop`           | Media is set to loop back to start on end.         |
| `media-muted`          | Media is muted.                                    |
| `media-paused`         | Playback is in a paused state.                     |
| `media-playing`        | Playback has started or resumed.                   |
| `media-playsinline`    | Media should play inline by default (iOS Safari).  |
| `media-seeking`        | Media or user is seeking to new playback position. |
| `media-started`        | Media playback has started.                        |
| `media-waiting`        | Media is waiting for more data (i.e., buffering).  |

## Media CSS Variables

If you're using Tailwind CSS v3+ you can take advantage of
[arbitrary values](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values) and
use the following CSS media variables.

| Variable                | Description                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| `media-buffered-amount` | The amount of media that has buffered in seconds (0 -> duration). |
| `media-current-time`    | The current playback time in seconds (0 -> duration).             |
| `media-duration`        | The total length of media in seconds.                             |
| `media-seekable-amount` | The amount of media that is seekable in seconds (0 -> duration).  |

## Media Example

The following example showcases a track with a fill inside indicating the amount of
playback time that has passed. When the media is buffering (indicated by the `media-waiting` variant)
we change the fill background color.

```html
<div class="relative h-6 w-full bg-gray-200">
	<div
		class="
			media-waiting:bg-sky-500 absolute top-0 left-0 h-full w-full
			origin-left
			scale-x-[calc(var(--media-current-time)/var(--media-duration))]
			transform bg-gray-400 will-change-transform
		"
	></div>
</div>
```

## Slider Variants

| Variant       | Description                                           |
| ------------- | ----------------------------------------------------- |
| `dragging`    | Slider thumb is currently being dragged.              |
| `pointing`    | Device pointer (mouse/touch) is within slider bounds. |
| `interactive` | Either dragging or pointing is true.                  |

## Slider CSS Variables

If you're using Tailwind CSS v3+ you can take advantage of
[arbitrary values](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values) and
use the following CSS slider variables.

| Variable                 | Description                                                |
| ------------------------ | ---------------------------------------------------------- |
| `slider-fill-value`      | Slider fill amount (e.g., `30`).                           |
| `slider-fill-rate`       | The fill value expressed as a ratio (e.g., `0.3`).         |
| `slider-fill-percent`    | The fill rate expressed as a percentage (e.g., `30%`).     |
| `slider-pointer-value`   | Fill amount up to the device pointer (e.g., `30`).         |
| `slider-pointer-rate`    | The pointer value expressed as a ratio (e.g., `0.3`).      |
| `slider-pointer-percent` | The pointer rate expressed as a percentage. (e.g., `30%`). |

## Slider Example

The following example showcases a time slider with a thumb inside positioned at the current
time (indicated by the `--slider-fill-percent` variable ). When the device pointer enters the slider,
or the thumb begins to be dragged (indicated by the `interactive` variant), we pin the thumb to the
device pointer position.

```html
<vds-time-slider class="relative h-6 w-full bg-gray-200">
	<!-- Slider Thumb. -->
	<div
		class="
			position interactive:left-[var(--slider-pointer-percent)]
			absolute top-0 left-[var(--slider-fill-percent)]
			h-4 w-4 -translate-x-1/2 transform bg-gray-400
			will-change-[left]
		"
	></div>
</vds-time-slider>
```
