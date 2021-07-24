function set_tags(tags) {
	let tags_dom = document.getElementById('post_tags');
	for (tag of tags) {
		let dom = document.createElement('span');
		dom.setAttribute('class', 'post_tag');
		dom.innerHTML = tag;
		tags_dom.appendChild(dom);
	}
}

function display_404() {
	let post_dom = document.getElementById('post');
	let msg = document.createElement('h1');
	msg.innerHTML = "404 - post not found";
	post_dom.appendChild(msg);
}

function display_post(post) {
	if (post == null)
		return display_404();

	// Set the image src, description and tags
	document.getElementById('post_img').src = get_image_url(post);
	document.getElementById('post_desc').innerHTML = post.description == '' ? 'No Description Provided' : post.description;
	set_tags(post.tag_vector);
	
	// Set the details
	let details = document.getElementById('post_details');
	details.children[0].children[1].innerHTML = post.id;
	details.children[1].children[1].innerHTML = post.rating;
	details.children[2].children[1].innerHTML = post.score;
	details.children[3].children[1].innerHTML = `${post.width} x ${post.height}`;
	details.children[4].children[1].innerHTML = human_readable_bytes(post.size);
	details.children[5].children[1].innerHTML = new Date(post.create_date).toUTCString();
	details.children[6].children[1].innerHTML = new Date(post.create_date).toUTCString();
	
	// Set actions
	document.getElementById('download_link').href = get_image_url(post);
	document.getElementById('delete_image').onclick = eval(`()=>{delete_post(${post.id})}`);
	
	// Make the post visible
	document.getElementById('post').style.display = 'block';
}

function get_post(id, cb) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `${API_ROOT}/post?id=${id}`, true);
	xhr.onreadystatechange = () => {
		if(xhr.readyState === XMLHttpRequest.DONE) {
			let status = xhr.status;
			if (status === 0 || (status >= 200 && status < 400))
				cb(JSON.parse(xhr.responseText));
			else {
				console.log(xhr);
				cb(null, status);
			}
		}
	}
	xhr.send();
}

function delete_post(id) {
	if (!confirm("You are sure you want to delete this post?"))
		return;
	let cb = (status, res) => {
		if (status === 404) {
			alert("Post was not found");
		} else if (status === 200) {
			alert("Post successfully deleted");
		} else {
			console.log("status code: " + status);
			console.log(res);
			alert("Something went wrong...");
		}
	};
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', `${API_ROOT}/post?id=${id}`, true);
	xhr.onreadystatechange = () => {
		if(xhr.readyState === XMLHttpRequest.DONE) {
			console.log(xhr);
			cb(xhr.status, xhr.responseText);
		}
	}
	xhr.send();
}

window.onload = () => {
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());
	if (!params.hasOwnProperty('id')) 
		display_404();
	else
		get_post(params['id'], display_post);
};
