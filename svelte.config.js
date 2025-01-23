import adapter from '@sveltejs/adapter-static';
import path from 'path';

export default {
  kit: {
    adapter: adapter({
      pages: path.join('dist'),
      assets: path.join('dist'),
      fallback: 'index.html', // For SPA fallback, if you need dynamic routes
    })
  }
};
