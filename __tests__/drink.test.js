const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Drink = require('../lib/models/drink');

describe('Drink routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a drink', () => {
    return request(app)
      .post('/api/v1/drinks')
      .send({
        name: 'Mai Tai',
        img: 'http://maitai.png',
        ingredients: JSON.stringify([
          {
            name: 'spiced rum',
            amount: 1.5,
            measurement: 'fluid oz'
          },
          {
            name: 'coconut-flavored rum',
            amount: 1.5,
            measurement: 'fluid oz'
          },
          {
            name: 'grenadine',
            amount: 1,
            measurement: 'tsp'
          },
          {
            name: 'pineapple juice',
            amount: 3,
            measurement: 'fluid oz'
          },
          {
            name: 'orange juice',
            amount: 2,
            measurement: 'fluid oz'
          },
          {
            name: 'ice cubes',
            amount: 1,
            measurement: 'cup'
          }
        ]),
        directions: [
          'In a cocktail mixer full of ice, combine the spiced rum, coconut rum, grendine, pineapple juice and orange juice.',
          'Shake vigorously and strain into glass full of ice.'
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Mai Tai',
          img: 'http://maitai.png',
          ingredients: [
            {
              name: 'spiced rum',
              amount: 1.5,
              measurement: 'fluid oz'
            },
            {
              name: 'coconut-flavored rum',
              amount: 1.5,
              measurement: 'fluid oz'
            },
            {
              name: 'grenadine',
              amount: 1,
              measurement: 'tsp'
            },
            {
              name: 'pineapple juice',
              amount: 3,
              measurement: 'fluid oz'
            },
            {
              name: 'orange juice',
              amount: 2,
              measurement: 'fluid oz'
            },
            {
              name: 'ice cubes',
              amount: 1,
              measurement: 'cup'
            }
          ],
          directions: [
            'In a cocktail mixer full of ice, combine the spiced rum, coconut rum, grendine, pineapple juice and orange juice.',
            'Shake vigorously and strain into glass full of ice.'
          ] 
        });
      });
  });

  it('gets all drinks', async() => {
    const drinks = await Promise.all([
      {
        name: 'Ice Water',
        img: 'http://ice-water.png',
        ingredients: JSON.stringify([
          {
            name: 'ice',
            amount: 3,
            measurement: 'oz'
          },
          {
            name: 'water',
            amount: 5,
            measurement: 'fluid oz'
          }
        ]),
        directions: [
          'In a cocktail mixer, combine the ice and water.'
        ]
      },
      {
        name: 'Invisibility Potion',
        img: 'http://invisibility-potion.png',
        ingredients: JSON.stringify([
          {
            name: 'garlic',
            amount: 3,
            measurement: 'bulbs'
          },
          {
            name: 'ice wraith teeth',
            amount: 5,
            measurement: 'teeth idk'
          }
        ]),
        directions: [
          'In a cocktail mixer, combine the ice wraith teeth and garlic bulbs.'
        ]
      }
    ].map(drink => Drink.insert(drink)));

    return request(app)
      .get('/api/v1/drinks')
      .then(res => {
        drinks.forEach(drink => {
          expect(res.body).toContainEqual(drink);
        });
      });
  });

  it('gets a drink by id', async() => {
    const water = await Drink.insert({
      name: 'Ice Water',
      img: 'http://ice-water.png',
      ingredients: JSON.stringify([
        {
          name: 'ice',
          amount: 3,
          measurement: 'oz'
        },
        {
          name: 'water',
          amount: 5,
          measurement: 'fluid oz'
        }
      ]),
      directions: [
        'In a cocktail mixer, combine the ice and water.'
      ]
    });

    return request(app)
      .get(`/api/v1/drinks/${water.id}`)
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Ice Water',
          img: 'http://ice-water.png',
          ingredients: [
            {
              name: 'ice',
              amount: 3,
              measurement: 'oz'
            },
            {
              name: 'water',
              amount: 5,
              measurement: 'fluid oz'
            }
          ],
          directions: [
            'In a cocktail mixer, combine the ice and water.'
          ]
        });
      });
  });

  it('updates a drink by id', async() => {
    const drink = await Drink.insert({
      name: 'Ice Water',
      img: 'http://ice-water.png',
      ingredients: JSON.stringify([
        {
          name: 'ice',
          amount: 3,
          measurement: 'oz'
        },
        {
          name: 'water',
          amount: 5,
          measurement: 'fluid oz'
        }
      ]),
      directions: [
        'In a glass, combine the ice and water.'
      ]
    });

    return request(app)
      .put(`/api/v1/drinks/${drink.id}`)
      .send({
        name: 'Ice Water with Lemon',
        img: 'http://ice-water.png',
        ingredients: JSON.stringify([
          {
            name: 'ice',
            amount: 3,
            measurement: 'oz'
          },
          {
            name: 'water',
            amount: 5,
            measurement: 'fluid oz'
          },
          {
            name: 'lemon',
            amount: .5,
            measurement: 'fluid oz'
          }
        ]),
        directions: [
          'In a glass, combine the ice, water, lemon and stir.'
        ] 
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Ice Water with Lemon',
          img: 'http://ice-water.png',
          ingredients: [
            {
              name: 'ice',
              amount: 3,
              measurement: 'oz'
            },
            {
              name: 'water',
              amount: 5,
              measurement: 'fluid oz'
            },
            {
              name: 'lemon',
              amount: .5,
              measurement: 'fluid oz'
            }
          ],
          directions: [
            'In a glass, combine the ice, water, lemon and stir.'
          ]
        });
      });
  });

});

