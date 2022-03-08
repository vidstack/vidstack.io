<script>
import Docs from './_Docs.md';
</script>

<Docs>

```html:copy-highlight{6-8}:slot=usage
<vds-video-player
	poster="https://media-files.vidstack.io/poster.png"
	loading="lazy"
>
	<vds-media-ui>
		<vds-poster
			alt="Large alien ship hovering over New York."
		></vds-poster>

		<div class="big-play-button">
			<vds-play-button>
				<!-- Icons here. -->
			</vds-play-button>
		</div>
	</vds-media-ui>
</vds-video-player>
```

```html:slot=loading-strategy
<vds-poster loading="lazy" />
```

```html:slot=double-loading-strategy
<vds-video-player loading="lazy">
	<vds-media-ui>
		<vds-poster loading="lazy"></vds-poster>
	</vds-media-ui>
</vds-video-player>
```

</Docs>
