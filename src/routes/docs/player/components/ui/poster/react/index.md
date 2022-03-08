<script>
import Docs from '../_Docs.md';
</script>

<Docs>

```jsx:copy-highlight{6-8}:slot=usage
<VideoPlayer
	poster="https://media-files.vidstack.io/poster.png"
	loading="lazy"
>
	<MediaUi>
		<Poster
			alt="Large alien ship hovering over New York."
		/>

		<div className="big-play-button">
			<PlayButton>
				{/* Icons here. */}
			</PlayButton>
		</div>
	</MediaUi>
</VideoPlayer>
```

```jsx:slot=loading-strategy
<Poster loading="lazy" />
```

```jsx:slot=double-loading-strategy
<VideoPlayer loading="lazy">
	<MediaUi>
		<Poster loading="lazy" />
	</MediaUi>
</VideoPlayer>
```

</Docs>
