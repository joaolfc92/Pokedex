const search        = document.querySelector("#search");
const number        = document.querySelector('#number');
const pokemonImage  = document.querySelector("#pokemon-image");
const type          = document.querySelectorAll(".type");
const types          = document.querySelector("#types");
const statNumber     = document.querySelectorAll(".stat-number");
const barInner       = document.querySelectorAll(".bar-inner")

const typeColors = {
    "rock":     [182, 158,  49],
    "ghost":    [112,  85, 155],
    "steel":    [183, 185, 208],
    "water":    [100, 147, 235],
    "grass":    [116, 203,  72],
    "psychic":  [251,  85, 132],
    "ice":      [154, 214, 223],
    "dark":     [117,  87,  76],
    "fairy":    [230, 158, 172],
    "normal":   [170, 166, 127],
    "fighting": [193,  34,  57],
    "flying":   [168, 145, 236],
    "poison":   [164,  62, 158],
    "ground":   [222, 193, 107],
    "bug":      [167, 183,  35],
    "fire":     [245, 125,  49],
    "electric": [249, 207,  48],
    "dragon":   [112,  55, 255]
}



const fetchApi = async (pkmnName) => {
    pkmnNameApi = pkmnName.split(' ').join('-')


   const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pkmnNameApi);

    if(response.status === 200){
        const pknmData = await response.json();
        return pknmData;
    }

    return false;


  
};

search.addEventListener('change', async (event)=>{
   const pkmnData =  await fetchApi(event.target.value)

   //validation when pokemon does not exist

   if(!pkmnData) alert("Pokemon não registrado");


   // for debugging - will be removed later on
   console.log(pkmnData);

   // set pokemon # at the top of the page 
   number.innerHTML = '#' + pkmnData.id.toString().padStart(3, '0');

   // set pokemon image
   pokemonImage.src = pkmnData.sprites.other.home.front_default;

   //updates "type"
    types.innerHTML = '';

    pkmnData.types.forEach((t)=>{
    let newType = document.createElement("span");
    let color = typeColors[t.type.name];


    newType.innerHTML = t.type.name;
    newType.classList.add("type");
    newType.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    

    
    types.appendChild(newType);

    });

    // updates stats

    pkmnData.stats.forEach((s, i) => {
        statNumber[i].innerHTML = s.base_stat.toString().padStart(3, '0');

        barInner[i].style.width = `${s.base_stat}%`
    });

    //update stats bars







});


