# Audio

<ComponentTabbedLinks slug={__slug} />

## Import

Use the following import if you'd like to use the audio provider standalone:

<ComponentImport tagName="vds-audio" />

## Usage

:::info
The audio provider extends the API of the native `<audio>` element so you can replace
it with `<vds-audio>` and it'll just work! Refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
for more information about the native `<audio>` element.
:::

The audio provider is used to embed sound content into documents via the native
[`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) element. It may
contain one or more audio sources, represented using the `src` attribute or the `<source>` element:
the browser will choose the most suitable one.

```html:copy
<vds-audio controls>
	<source src="myAudio.mp3" type="audio/mpeg" />
	<source src="myAudio.ogg" type="audio/ogg" />
	<p>
		Your browser doesn't support HTML5 audio. Here is a
		<a href="myAudio.mp3">link to the audio</a> instead.
	</p>
</vds-audio>
```

## Player

The `<vds-audio-player>` is a light extension ontop of `<vds-audio>` to enable a custom player UI
to be built by exposing the `ui` slot. Thus, the entire audio provider's API is available when
interacting with the `<vds-audio-player>` element.

```html:copy
<vds-audio-player>
	<source src="myAudio.mp3" type="audio/mpeg" />
	<source src="myAudio.ogg" type="audio/ogg" />
	<p>
		Your browser doesn't support HTML5 audio. Here is a
		<a href="myAudio.mp3">link to the audio</a> instead.
	</p>

	<vds-media-ui slot="ui">
		<!-- ... -->
	</vds-media-ui>
</vds-audio-player>
```
