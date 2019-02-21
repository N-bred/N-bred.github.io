//  Author: Nicolas Caballero //
const ul = document.getElementById('projects_list');

const makeElement = element => {
   return document.createElement(element);
};

const appendEl = (element, parent) => {
   return parent.appendChild(element);
};

const makeRequest = (url, method = 'GET') => {
   // Put a conditional to check if it is a GET or POST request.

   if (method === 'POST') {
      // If its a POST request, it will make sure to pass the properties needed.
      const request = fetch(url, {
         method: method,
         headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
         },
         // Make sure to modify this part, it is what you're going to send.
         body: JSON.stringify({ a: 1, b: 'Textual content' })
      });

      request
         // The promise is taken and converted into JSON.
         .then(response => response.json())
         // The function below is set up for you to manipulate the data as you need.
         .then(data => {
            console.log(data);
         })
         // This will catch any error.
         .catch(error => console.log('Oh no, something is wrong ', error));
   } else if (method === 'GET') {
      const request = fetch(url);
      request
         // The promise is taken and converted into JSON.
         .then(response => response.json())
         // The function below is set up for you to manipulate the data as you need.
         .then(data => {
            console.log(data);

            // Start manipulation

            for (let i = 0; i < data.length; i++) {
               let li = makeElement('li'),
                  a = makeElement('a');
               // IF //

               if (
                  data[i].name === 'hello-word' ||
                  data[i].name === 'HTML-Examples' ||
                  data[i].name === 'unad-page' ||
                  data[i].name === 'Layout-1' ||
                  data[i].name === 'N-bred.github.io' ||
                  data[i].name === 'Prueba-U' ||
                  data[i].name === 'unad-page'
               ) {
                  continue;
               } else if (data[i].name === 'MakeRequest_helper') {
                  a.href = 'https://github.com/N-bred/MakeRequest_helper';
                  a.target = '_blank';
                  a.innerHTML = `${data[i].name}`;

                  appendEl(a, li);
                  appendEl(li, ul);
               } else {
                  a.href = `https://n-bred.github.io/${data[i].name}/`;
                  a.target = '_blank';
                  a.innerHTML = `${data[i].name}`;

                  appendEl(a, li);
                  appendEl(li, ul);
               }
            }
         })
         // This will catch any error.
         .catch(error => console.log('Oh no, something is wrong ', error));
   }
};

makeRequest('https://api.github.com/users/N-bred/repos');
