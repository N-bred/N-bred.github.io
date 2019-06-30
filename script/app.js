window.addEventListener('load', function() {
  const requestToApi = async url => {
    const request = await fetch(url);
    const response = await request.json();
    return response;
  };

  // Function that loads all the user info displayed in the header.
  (function loadUserInfo() {
    // Variables to select elements.
    const description = document.getElementById('description');
    const profileImg = document.getElementById('profile-img');
    const name = document.getElementById('name');

    // Variable with the user api
    const userApi = 'https://api.github.com/users/N-bred';
    // Request to the api
    const requestToUserApi = requestToApi(userApi);

    // Setting the data in the DOM
    requestToUserApi
      .then(data => {
        description.innerText = data.bio;
        profileImg.src = data.avatar_url;
        name.innerText = data.name;
      })
      .catch(err => console.error(err));
  })();

  (function loadUserRepos() {
    // Variable to select the card-container Element.

    const cardsContainerElement = document.querySelector('.cards-container');

    // Variable for repos api from github.
    const reposApi =
      'https://api.github.com/users/N-bred/repos?sort=pushed?direction=asc';

    // Call to function with the repos api.

    const requestToReposApi = requestToApi(reposApi);

    // Function that creates and returns a card element in HTML format.

    const createCard = function(
      img = './fox.jpg',
      title,
      description,
      github,
      page
    ) {
      const template = `
  <div class="card">
        
            <div class="card__img">
              <a href="https://n-bred.github.io/${page}/index.html" class="card__img-link">
                <img src="${img}" alt="${title}" />
              </a>
            </div>


            <div class="card__title">
              <h3 class="card__title-text">${title
                .replace(/\-/g, ' ')
                .replace(/\_/g, ' ')}</h3>
            </div>

            <div class="card__description">
              <p class="card__description-text">
                ${description}
              </p>
            </div>

            <div class="card__btns">
              <a href="${github}" class="card__btn card__btn--white">See on Github</a>
              <a href="https://n-bred.github.io/${page}/index.html" class="card__btn  card__btn--dark">See Demo</a>
            </div>
          </div>

     
  `;

      return template;
    };

    // Go trough data from the api and make each repo a card with the function createCard, then append the HTML to the card container;

    requestToReposApi
      .then(data => {
        data.forEach(repo => {
          if (repo.has_pages) {
            const { description, name, html_url } = repo;
            const repoEl = createCard(
              './fox.jpg',
              name,
              description,
              html_url,
              name
            );
            cardsContainerElement.innerHTML += repoEl;
          }
        });
      })
      .catch(err => console.log(err));
  })();

  // Function that wraps the execution of all static content
  (function loadStatic() {
    // Loader
    const loader = document.querySelector('.loader');

    setTimeout(() => {
      loader.classList.add('loader-done');
      document.body.classList.remove('on-load');
    }, 2000);

    // Smooth Scroll to projects
    const btnProjects = document.getElementById('btn-projects');
    const mainElement = document.querySelector('.main');

    btnProjects.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: mainElement.offsetTop, behavior: 'smooth' });
    });

    // Footer
    const date = new Date();
    const year = document.getElementById('year');
    year.innerText = date.getFullYear();
  })();
});
