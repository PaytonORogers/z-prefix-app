/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { uid: 1, first_name: 'John', last_name: 'Smith', username: 'john.smith', hashed_password: 'pocahauntas' },
    { uid: 2, first_name: 'Jacob', last_name: 'Jacobson', username: 'jacob.jacobson', hashed_password: 'jacob' },
    { uid: 3, first_name: 'Peter', last_name: 'Rockafeller', username: 'peter.rockafeller', hashed_password: 'rockman' },
    { uid: 4, first_name: 'Paul', last_name: 'Bishop', username: 'paul.bishop', hashed_password: 'bible' },
    { uid: 5, first_name: 'Thomas', last_name: 'Jefferson', username: 'thomas.jefferson', hashed_password: '1776' }
  ]);
};
