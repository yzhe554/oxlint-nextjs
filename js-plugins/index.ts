import { definePlugin } from 'oxlint';
import requirePrefetch from './rules/nextjs-require-prefetch.ts';

const plugin = definePlugin({
	meta: {
		name: 'test',
	},
	rules: {
		'nextjs-require-prefetch': requirePrefetch,
	},
});

export default plugin;
