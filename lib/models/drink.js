const pool = require('../utils/pool');

module.exports = class Drink {
  id;
  name;
  img;
  ingredients;
  directions;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.img = row.img;
    this.ingredients = row.ingredients;
    this.directions = row.directions;
  }

  static async insert(drink) {
    const { rows } = await pool.query(
      'INSERT into drinks (name, img, ingredients, directions) VALUES ($1, $2, $3, $4) RETURNING *',
      [drink.name, drink.img, drink.ingredients, drink.directions] 
    );

    return new Drink(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM drinks'
    );

    return rows.map(row => new Drink(row));
  }
};
