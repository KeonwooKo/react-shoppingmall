const categories = [
    { "_id": 1, "name": 'Shirt' },
    { "_id": 2, "name": 'T-Shirt' },
    { "_id": 3, "name": 'Hood' },
    { "_id": 4, "name": 'Coat' },
    { "_id": 5, "name": 'Pants' },
    { "_id": 6, "name": 'Underwear' }
] 
const price = [
    { "_id": 0, "name": 'Any', "array": [] },
    { "_id": 1, "name": '$0 ~ $199', "array": [0, 199] },
    { "_id": 2, "name": '$200 ~ $249', "array": [200, 249 ] },
    { "_id": 3, "name": '$250 ~ $299', "array": [250,299] },
    { "_id": 4, "name": '$300 ~ $349', "array": [300,349] },
    { "_id": 5, "name": 'more than $350', "array": [350,100000] }
] 

export { categories, price }