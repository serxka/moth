const API_ROOT = 'http://localhost:8081'

const get_image_url = (post) => { return `${API_ROOT}/s/img/${post.path}/${post.id}-${post.filename}`; };
const get_thumb_url = (post) => { return `${API_ROOT}/s/tmb/${post.path}/${post.id}-thumbnail.jpg`; };

const human_readable_bytes = (size) => {
	if (size / 1000 > 1000)
		return `${(size / 1000 / 1000).toFixed(1)}MB`;
	else
		return `${Math.round(size / 1000)}KB`;
};

Number.prototype.clamp = function(min, max) {
	return Math.min(Math.max(this, min), max);
};
