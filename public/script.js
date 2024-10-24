document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('posts');
  const newPostForm = document.getElementById('new-post-form');

  function fetchPosts() {
    fetch('/api/posts')
      .then(response => response.json())
      .then(posts => {
        postsContainer.innerHTML = '';
        posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.classList.add('post');
          postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <small>${new Date(post.created_at).toLocaleString()}</small>
          `;
          postsContainer.appendChild(postElement);
        });
      })
      .catch(error => console.error('Error fetching posts:', error));
  }

  newPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
      .then(response => response.json())
      .then(() => {
        fetchPosts();
        newPostForm.reset();
      })
      .catch(error => console.error('Error creating post:', error));
  });

  fetchPosts();
});

