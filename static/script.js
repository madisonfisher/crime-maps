
// city: 'atl', 'la', 'phi', 'buf'
// year: 2010, 2011, 2012, 2013, 2014, 2015, 2016
let city = 'atl';
let year = 2015;
fetch(`/${city}/${year}`)
    .then(data => data.json())
    .then(data => console.log(data));
