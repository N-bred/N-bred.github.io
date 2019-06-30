window.addEventListener('load',function(){const requestToApi=async url=>{const request=await fetch(url);const response=await request.json();return response};(function loadUserInfo(){const description=document.getElementById('description');const profileImg=document.getElementById('profile-img');const name=document.getElementById('name');const userApi='https://api.github.com/users/N-bred';const requestToUserApi=requestToApi(userApi);requestToUserApi.then(data=>{description.innerText=data.bio;profileImg.src=data.avatar_url;name.innerText=data.name}).catch(err=>console.error(err))})();(function loadUserRepos(){const cardsContainerElement=document.querySelector('.cards-container');const reposApi='https://api.github.com/users/N-bred/repos?sort=pushed?direction=asc';const requestToReposApi=requestToApi(reposApi);const createCard=function(img='./fox.jpg',title,description,github,page){const template=`
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

     
  `;return template};requestToReposApi.then(data=>{data.forEach(repo=>{if(repo.has_pages){const{description,name,html_url}=repo;const repoEl=createCard('./fox.jpg',name,description,html_url,name);cardsContainerElement.innerHTML+=repoEl}})}).catch(err=>console.log(err))})();(function loadStatic(){const loader=document.querySelector('.loader');setTimeout(()=>{loader.classList.add('loader-done');document.body.classList.remove('on-load')},2000);const btnProjects=document.getElementById('btn-projects');const mainElement=document.querySelector('.main');btnProjects.addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:mainElement.offsetTop,behavior:'smooth'})});const date=new Date();const year=document.getElementById('year');year.innerText=date.getFullYear()})()})