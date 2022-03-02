<script>
	import TabbedLinks from './TabbedLinks.svelte';

	export let slug = '';
	export let api = false;

	const links = [
		{
			title: 'Docs',
			href: api ? slug.slice(0, -'/api'.length) : slug
		},
		{
			title: 'API',
			href: api ? slug : `${slug}/api`
		}
	];
</script>

<TabbedLinks {links} />
