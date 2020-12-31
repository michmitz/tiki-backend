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
});
