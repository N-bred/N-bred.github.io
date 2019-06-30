// Repos api https://api.github.com/users/N-bred/repos
// User api https://api.github.com/users/N-bred

window.addEventListener('load', function() {
  const loader = document.querySelector('.loader');

  //   Change time to 2 seconds
  setTimeout(() => {
    loader.classList.add('loader-done');
  }, 100);
});
