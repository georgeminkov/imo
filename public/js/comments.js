document.addEventListener('DOMContentLoaded', () => {
    // split comments on topics (investors) and fetch based on that along with "news feed type"
    fetch('/api/comments')
      .then(response => response.json())
      .then(comments => {
        const commentsSection = document.getElementById('comments-section');
        comments.forEach(comment => {
          const commentDiv = document.createElement('div');
          commentDiv.className = 'comment';
          commentDiv.innerHTML = `<strong>${comment.author}</strong>: ${comment.text}`;
          commentsSection.appendChild(commentDiv);
        });
      })
      .catch(err => console.error('Error fetching comments:', err));
  });