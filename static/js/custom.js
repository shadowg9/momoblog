document.addEventListener("DOMContentLoaded", () => {
  // Toggle trait boxes
  document.querySelectorAll('.trait-box').forEach(box => {
    box.addEventListener('click', () => {
      const content = box.querySelector('.trait-content');
      content.style.display =
        content.style.display === 'block' ? 'none' : 'block';
    });
  });
});


