const fetch = require('node-fetch');

async function fetchPokemon() {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    let pokemans = Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        return pokemon;
    });
    return pokemans
};

module.exports = async function() {
    let pokemon = await fetchPokemon();
    console.log(pokemon);

    return pokemon
}
