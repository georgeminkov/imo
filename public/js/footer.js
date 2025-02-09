function toggleFooter() {
    const footer = document.getElementById('page-footer');
    const button = document.getElementById('footer-toggle');
    if (footer.style.display === 'none') {
        footer.style.display = 'flex';
        button.textContent = '▼';
    } else {
        footer.style.display = 'none';
        button.textContent = '▲';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('page-footer').style.display = 'none';
});