function error_upload(msg) {
	let result = document.getElementById('result');
	result.innerHTML = msg;
	result.style.display = 'block';
}

function success_upload(msg, id) {
	let result = document.getElementById('result');
	result.innerHTML = msg;
	let link_dom = document.createElement('a');
	link_dom.href = `/post.html?id=${id}`;
	link_dom.innerHTML = 'post?'
	result.appendChild(link_dom);
	result.style.display = 'block';	
}

function upload_post(form) {
	const file = document.getElementById('image_file');
	const description = document.getElementById('description').value;
	const tags = document.getElementById('tags').value;
	let form_data = new FormData();
	let data = {
		description: description,
		tags: tags.split(',').filter(t => t).map(t => t.trim())
	};
	if (file.files.length == 0)
		return error_upload('error: no image has been provided');
	if (data.tags.length == 0)
		return error_upload('error: no tags have been provided');
	form_data.append('image', file.files[0]);
	form_data.append('data', JSON.stringify(data));
		
	let xhr = new XMLHttpRequest();
	xhr.open('POST', `${API_ROOT}/post`, true);
	xhr.onreadystatechange = () => {
		if(xhr.readyState === XMLHttpRequest.DONE) {
			let status = xhr.status;
			if (status === 0 || (status >= 200 && status < 400)) {
				let post = JSON.parse(xhr.responseText);
				success_upload("Uploaded post, would you like to view this ", post.id);
			} else {
				console.log(xhr);
				error_upload("failed to upload post: " + xhr.responseText);
			}
		}
	}
	xhr.send(form_data);
}

window.onload = () => {};
