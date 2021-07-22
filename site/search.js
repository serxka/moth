function display_no_posts() {
	let posts_dom = document.getElementById('grid');
	let msg = document.createElement('h1');
	msg.innerHTML = "404 no posts where found";
	posts_dom.appendChild(msg);
}

function print_arrows(p) {
	let arrows = document.getElementById('arrows');
	arrows.children[0].href = `/browse.html?l=30&p=${Math.max(0, (p.p|0) - 1)}&s=dd&t=${encodeURIComponent(p.t)}`;
	arrows.children[2].href = `/browse.html?l=30&p=${(p.p|0) + 1}&s=dd&t=${encodeURIComponent(p.t)}`;
}

function set_tags(tags) {
	let tags_dom = document.getElementById('post_tags');
	for (tag of tags) {
		let dom = document.createElement('span');
		dom.setAttribute('class', 'post_tag');
		dom.innerHTML = tag;
		tags_dom.appendChild(dom);
	}
	if (tags.length == 0) {
		document.getElementById('curent_tags').style.display = 'none';
	} else {
		document.getElementById('curent_tags').style.display = 'block';
	}
}

function write_thumbnail(dom, post) {
	let a_dom = document.createElement('a');
	a_dom.setAttribute('href', `/post.html?id=${post.id}`);
	a_dom.setAttribute('target', '_blank');
	let img_dom = document.createElement('img');
	img_dom.setAttribute('width', '250');
	img_dom.setAttribute('src', get_thumb_url(post));
	a_dom.appendChild(img_dom);
	dom.appendChild(a_dom);
}

function display_search(posts, params) {
	print_arrows(params);
	if (posts === null)
		return display_no_posts();
	set_tags(JSON.parse(params.t).filter(t => t));
	let grid_dom = document.getElementById('grid');
	for (post of posts) {
		let thumb_dom = document.createElement('div');
		thumb_dom.setAttribute('class', 'thumbnail');
		write_thumbnail(thumb_dom, post);
		grid.appendChild(thumb_dom);
	}
}

function set_search(self, source) {
	let tags = self[0].value.split(' ');
	if (source == 'global') {
		document.location.href = `/browse.html?l=30&p=0&s=dd&t=${encodeURIComponent(JSON.stringify(tags))}`;
		return false;
	}
}

function get_posts(p, cb) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `${API_ROOT}/search?l=${p.l}&p=${p.p}&s=${p.s}&t=${p.t}`, true);
	xhr.onreadystatechange = () => {
		if(xhr.readyState === XMLHttpRequest.DONE) {
			let status = xhr.status;
			if (status === 0 || (status >= 200 && status < 400))
				cb(JSON.parse(xhr.responseText), p);
			else {
				console.log(xhr);
				cb(null, p);
			}
		}
	}
	xhr.send();
}

function get_url_params() {
	const urlSearchParams = new URLSearchParams(window.location.search);
	let params = {
		...{l: 30, p: 0, s: 'dd', t: '[""]'},
		...Object.fromEntries(urlSearchParams.entries())
	};
	return params;
}

window.onload = () => {
	const params = get_url_params();
	get_posts(params, display_search);
};
