# Video

<ComponentTabbedLinks slug={__slug} />

## Import

Use the following import if you'd like to use the video provider standalone:

<ComponentImport tagName="vds-video" />

## Usage

:::info
The video provider extends the API of the native `<video>` element so you can replace
it with `<vds-video>` and it'll just work! Refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
for more information about the native `<video>` element.
:::

Embeds video content into documents via the native `<video>` element. It may contain
one or more video sources, represented using the `src` attribute or the `<source>` element: the
browser will choose the most suitable one.

The list of [supported media formats](https://developer.mozilla.org/en-US/docs/Web/Media/Formats)
varies from one browser to the other. You should either provide your video in a single format
that all the relevant browsers support, or provide multiple video sources in enough different
formats that all the browsers you need to support are covered.

```html:copy
<vds-video
	controls
	width="1280"
	height="720"
	loading="lazy"
	src="https://media-files.vidstack.io/720p.mp4"
	poster="https://media-files.vidstack.io/poster.png"
>
	Your browser doesn't support the HTML5 <code>video</code> tag.
</vds-video>
```

## Player

The `<vds-video-player>` is a light extension on top of `<vds-video>` to enable a custom player UI
to be built by exposing the `ui` slot. Thus, the entire video provider's API is available when
interacting with the `<vds-video-player>` element.

```html:copy
<vds-video-player
	width="1280"
	height="720"
	loading="lazy"
	src="https://media-files.vidstack.io/720p.mp4"
	poster="https://media-files.vidstack.io/poster.png"
>
	<vds-media-ui slot="ui">
		<!-- ... -->
	</vds-media-ui>
</vds-video-player>
```

## Multiple Sources

```html:copy
<vds-video
	controls
	width="1280"
	height="720"
	poster="https://media-files.vidstack.io/poster.png"
>
	<source src="https://media-files.vidstack.io/720p.ogv" type="video/ogg" />
	<source src="https://media-files.vidstack.io/720p.avi" type="video/avi" />
	<source src="https://media-files.vidstack.io/720p.mp4" type="video/mp4" />
	Your browser doesn't support the HTML5 <code>video</code> tag.
</vds-video>
```
