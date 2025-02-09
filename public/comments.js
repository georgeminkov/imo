document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display comments for the investors page
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