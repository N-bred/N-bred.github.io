window.addEventListener('load', function() {
   // Function that fetches an api and returns the promise
   const requestToApi = async url => {
      const request = await fetch(url);
      const response = await request.json();
      return response;
   };

   /**
    * IIFE that loads the initial content of the header
    * It retrieves data like description of the user
    * His profile img
    * And his name
    * Then it inserts that data into the DOM
    */

   (function loadUserInfo() {
      // Variables that select the elements in the DOM
      const description = document.getElementById('description');
      const profileImg = document.getElementById('profile-img');
      const name = document.getElementById('name');

      // Variable with the user API
      const userApi = 'https://api.github.com/users/N-bred';

      // Call the requestToApi function with the user api as paramenter.
      const requestToUserApi = requestToApi(userApi);

      // Getting the data and inserting it into the DOM
      requestToUserApi
         .then(data => {
            description.innerText = data.bio;
            profileImg.src = data.avatar_url;
            name.innerText = data.name;
         })
         .catch(err => console.error(err));
   })();

   /**
    * IFFE that loads the user repos, make them into a card element and then insert those elements into the DOM
    */
   (function loadUserRepos() {
      // Variable to get the DOM element
      const cardsContainerElement = document.querySelector('.cards-container');
      const paginationList = document.querySelector('.pagination__list');
      const mainElement = document.querySelector('.main');

      // Variable with the repos api URI
      const reposApi =
         'https://api.github.com/users/N-bred/repos?sort=pushed?direction=asc';

      // Call to function requestToApi with the repos url as paramenter.
      const requestToReposApi = requestToApi(reposApi);

      // Function that removes `-` and `_` in  a string and then returns the string formatted.
      const formatData = string =>
         string.replace(/\-/g, ' ').replace(/\_/g, ' ');

      const capitalize = function(string) {
         const strArr = string.toLowerCase().split(' ');

         const modified = strArr.map(
            str =>
               str.split('')[0].toUpperCase() +
               str
                  .split('')
                  .join('')
                  .slice(1)
         );

         return modified.join(' ');
      };

      // Function that will create each card with the info given/

      /**
       * It accepts:
       * title: as the repo name
       * description: as the repo description
       * github: as the link on github
       * page: as the github pages link
       * img: as the img of the repo
       */
      const createCard = function(
         title,
         description,
         github,
         page,
         img = './fox.jpg'
      ) {
         const template = `
  <div class="card">
        
            <div class="card__img">
              <a href="https://n-bred.github.io/${page}/" class="card__img-link" target="_blank">
                <img src="${img}" alt="${formatData(title)}" />
              </a>
            </div>


            <div class="card__title">
              <h3 class="card__title-text">${capitalize(formatData(title))}</h3>
            </div>

            <div class="card__description">
              <p class="card__description-text">
                ${description}
              </p>
            </div>

            <div class="card__btns">
              <a href="${github}" class="card__btn card__btn--white" target="_blank">See on Github</a>
              <a href="https://n-bred.github.io/${page}/" class="card__btn  card__btn--dark" target="_blank">See Demo</a>
            </div>
          </div>

     
  `;
         return template;
      };

      /** Render function for both cards and pagination*/

      const render = function(data, currentPage = 1, limitPerPage = 6) {
         // Array with projects filtered by has pages option
         const projects = data.filter(project => project.has_pages);

         // Everytime the render function is called, the container re-renders;
         cardsContainerElement.innerHTML = '';
         paginationList.innerHTML = '';

         // Array that will contain the number of pages
         const pagination = [];

         /** Function that contains the logic for the pagination and the cards */
         const eachProject = function(datas) {
            // Pagination logic starts
            const limit = limitPerPage;
            let curPage = currentPage;
            const indexOfLastPost = curPage * limit;
            const indexOfFirstPost = indexOfLastPost - limit;
            const currentPosts = datas.slice(indexOfFirstPost, indexOfLastPost);

            for (let i = 1; i <= Math.ceil(datas.length / limit); i++) {
               pagination.push(i);
            }
            // Pagination Logic Ends

            // For each project in the currentPosts array, this will render a card;
            currentPosts.forEach(project => {
               const { description, name, html_url } = project;

               const imgUrl = `https://github.com/N-bred/${name}/blob/master/frontCard.png?raw=true`;

               const repoEl = createCard(
                  name,
                  description,
                  html_url,
                  name,
                  imgUrl
               );

               cardsContainerElement.innerHTML += repoEl;
            });
         };

         // Call to the function that contains the logic for the pagination and the cards
         eachProject(projects);

         // Pagination rendering
         pagination.forEach(page => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.setAttribute('href', '#');

            a.innerText = page;

            // For each button, an event listener is setted;
            a.addEventListener('click', function(e) {
               e.preventDefault();

               // Smooth transition to the top of the main ELement
               if (window.innerWidth <= 600) {
                  window.scrollTo({
                     top: mainElement.offsetTop,
                     left: 0,
                     behavior: 'smooth'
                  });
               }

               // Call to  the render function to re-render each time a button is clicked
               render(projects, this.innerText, limitPerPage);
            });

            li.appendChild(a);
            paginationList.appendChild(li);
         });
      };

      // Request to the api
      requestToReposApi
         .then(data => {
            if (window.innerWidth <= 600) {
               render(data, 1, 3);
            } else {
               render(data, 1, 6);
            }
         })
         .catch(err => console.log(err));
   })();

   // IFFE that loads the static parts of the site
   /**
    * Changes the state of the loader element as soon as the content is loaded.
    * Adds smooth scroll functionality to the first button on the header.
    * Sets the year on the footer
    */
   (function loadStatic() {
      // Varaible to select the loader element
      const loader = document.querySelector('.loader');

      // This will mantain the loader element on page for the time specified
      setTimeout(() => {
         loader.classList.add('loader-done');
         document.body.classList.remove('on-load');
         window.scrollTo({ top: 0 });
      }, 2000);

      // Variable to select the button on the header and the main element.
      const btnProjects = document.getElementById('btn-projects');
      const mainElement = document.querySelector('.main');

      // Adds a listener to the button to activate smooth scroll down to the main section.
      btnProjects.addEventListener('click', e => {
         e.preventDefault();
         window.scrollTo({ top: mainElement.offsetTop, behavior: 'smooth' });
      });

      // Varaible to set the Date.
      const date = new Date();

      // Variable to select the Year element.
      const year = document.getElementById('year');

      // Sets the year in the Year element.
      year.innerText = date.getFullYear();
   })();
});
