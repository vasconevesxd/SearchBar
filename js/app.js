/* === Variables Declaration === */

const itemsList = document.getElementById("itemsList");
const searchBar = document.getElementById("searchBar");
const svgSearch = document.getElementById('svg-search');
const resultNumber = document.getElementById("numb-results");
let allItems = [];


/* === Filter/Searcher ===  */

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredItems = allItems.items.filter((item) => {
  
    return item.title.toLowerCase().indexOf(searchString) > -1; /*Search if json file contain the title we are
                                                                looking for starting from the beginning of the title*/

  });


  
  inputValidation(e,filteredItems);

});

/* === Validator ===  */

function inputValidation(e,filteredItems){    
  if (e.target.value !== "" && filteredItems.length > 0) {
  
    searchBar.style.borderColor = "green";
    svgSearch.style.fill = "green";

    displayItems(filteredItems); //Pass items filter to be displayed
    numbResult(e,filteredItems);  

  } else if(filteredItems.length === 0){
    //add class
    numbResult(e,filteredItems); 
    searchBar.style.borderColor = "red";    
    svgSearch.style.fill = "red";
    itemsList.innerHTML = "";

  } else if(e.target.value == "") {

    svgSearch.style.fill = "black";
    searchBar.style.borderColor = "black";
    itemsList.innerHTML = "";
    resultNumber.innerHTML = " ";
  }
  
}

/* === Number of Results  ===  */

function numbResult(e,filteredItems){
  if (e.target.value !== "" && filteredItems.length > 0) {
   
    resultNumber.innerHTML = filteredItems.length + " Results";

  }else{

    resultNumber.innerHTML = "0 Results";

  }

}

/* === Fetch all data from a json file ===  */
const loadItems = async () => {
  try {
    const res = await fetch("products.json");
    allItems = await res.json(); //Pass the data to allItems array
   
  } catch (err) {
    console.error(err);
  }
};


/* ===  Display each item to the body ===  */

const displayItems = (items) => {
  const htmlString = items //convert object to html block
    .map((item) => {
      return `
            <li class="item">
              <a href="#">
                <img src="assets${item.image}"></img>
                <div class="content">
                  <h1>${item.title}</h1>
                  <p>${item.path}</p>
                </div>
              </a>
            </li>
        `;
    })
    .join("");
  itemsList.innerHTML = htmlString;
};

loadItems();
