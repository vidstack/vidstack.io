<script>
import Docs from '../_Docs.md';
</script>

<Docs>

```jsx:copy-highlight:slot=usage{2-4}
<TimeSlider>
	<SliderVideo
	  src="https://media-files.vidstack.io/240p.mp4"
	></SliderVideo>
</TimeSlider>
```

```jsx:slot=video-events{2-3}
<SliderVideo
	onCanplay={onCanplay}
	onError={onError}
/>
```

```jsx:copy-highlight:slot=styling{2-4}
<TimeSlider>
	<SliderVideo
		src="https://media-files.vidstack.io/240p.mp4"
	></SliderVideo>
</TimeSlider>
```

</Docs>
