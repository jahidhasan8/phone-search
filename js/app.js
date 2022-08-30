
const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    // display only 10 phones 
    phones = phones.slice(0, 10);
    // display not found message
    const notFoundMessage = document.getElementById('not-found-message');
    if (phones.length === 0) {
        notFoundMessage.classList.remove('d-none')
    }
    else {
        notFoundMessage.classList.add('d-none');
    }


    //  display all phones
    phones.forEach(phone => {
        const { image, brand, phone_name, slug } = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');

        phoneDiv.innerHTML = `
           <div class="card border rounded-lg p-4 ">
                    <img src="${image}" class="card-img-top " alt="...">
                    <div class="card-body">
                      <h5 class="card-title fw-bold">${phone_name} </h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                  </div>
        
        `
        phonesContainer.appendChild(phoneDiv);
    });
    // stop loader
    toggleLoader(false)
}

// get search field, add event handler

document.getElementById('btn-search').addEventListener('click', function () {
    //start loader
    toggleLoader(true)
    const searchField = document.getElementById('search-field');

    const searchText = searchField.value;
    // console.log(searchText);
    loadPhones(searchText);
    searchField.value = '';
})

// loader function
const toggleLoader = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none')
    }
    else {
        loader.classList.add('d-none');
    }
}
// loadPhones();
