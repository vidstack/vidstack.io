<script>
import Layout from './_Layout.md';
</script>

<Layout>

```html:copy:slot=usage
<vds-audio
	controls
	loading="lazy"
	src="https://media-files.vidstack.io/audio.mp3"
>
	Your browser doesn't support the HTML5 <code>audio</code> tag.
</vds-audio>
```

```html:copy:slot=player
<vds-audio-player
	loading="lazy"
	src="https://media-files.vidstack.io/audio.mp3"
>
	<vds-media-ui slot="ui">
		<!-- ... -->
	</vds-media-ui>
</vds-audio-player>
```

```html:copy:slot=multiple-sources
<vds-audio controls>
	<source src="https://media-files.vidstack.io/audio.mp3" type="audio/mpeg" />
	<source src="https://media-files.vidstack.io/audio.ogg" type="audio/ogg" />
	Your browser doesn't support the HTML5 <code>audio</code> tag.
</vds-audio>
```

</Layout>
