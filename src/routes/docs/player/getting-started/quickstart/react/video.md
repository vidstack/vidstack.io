---
title: Video Player Installation (React)
---

!!!step :title=Install NPM Package :desc=Install `@vidstack/player` and dependencies via NPM.

```bash:copy
npm i lit @vidstack/player
```

!!!

!!!step :title=Import Components :desc=Import player components into the `jsx` or `tsx` file where you'll be building your player.

```js:copy
import { VideoPlayer, MediaUi } from '@vidstack/player/react';
```

!!!

!!!step :title=Add Player Markup :desc=Let's add the following player JSX boilerplate to get you started.

```jsx:copy
<VideoPlayer
	src="https://media-files.vidstack.io/720p.mp4"
	poster="https://media-files.vidstack.io/poster.png"
	controls
	loading="lazy"
>
	{/* `<source>` and `<track>` elements can go here. */}
	<MediaUi slot="ui">
  	{/* UI elements go here. */}
	</MediaUi>
</VideoPlayer>
```

!!!
