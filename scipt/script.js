const search = document.querySelector("#search");

const fetchApi = async (pkmnName) => {
   const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pkmnName);
   const pknmData = await response.json();

   console.log(pknmData)
};

search.addEventListener('change', async (event)=>{
    await fetchApi(event.target.value)
});


