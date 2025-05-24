(function () {
  'use strict';

  function formatDate(dateStr) {
    var date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function loadPosts() {
    var container = document.getElementById('posts-list');
    if (!container) return;

    fetch('posts.json')
      .then(function (response) {
        if (!response.ok) throw new Error('Failed to load posts');
        return response.json();
      })
      .then(function (posts) {
        posts.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });

        if (posts.length === 0) {
          container.innerHTML = '<p class="empty-text">No posts yet. Check back soon.</p>';
          return;
        }

        container.innerHTML = posts
          .map(function (post) {
            return (
              '<article class="post-preview">' +
              '  <time datetime="' + post.date + '" class="post-date">' + formatDate(post.date) + '</time>' +
              '  <h2><a href="posts/' + post.slug + '.html">' + post.title + '</a></h2>' +
              '  <p class="post-summary">' + post.summary + '</p>' +
              '</article>'
            );
          })
          .join('');
      })
      .catch(function () {
        container.innerHTML = '<p class="empty-text">No posts yet. Check back soon.</p>';
      });
  }

  loadPosts();
})();
