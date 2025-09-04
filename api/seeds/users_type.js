/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { first_name: 'John', last_name: 'Smith', username: 'john.smith', hashed_password: '$2b$12$VC4tmlyM/w2hNA9kir9k0.GsA0xvcLo0.KSWioIu9mWQw0BDihKnW' }, // savage
    { first_name: 'Jacob', last_name: 'Jacobson', username: 'jacob.jacobson', hashed_password: '$2b$12$WIjJ.75LkxuEL0TVDxIjZOAruwgt7ez3FWfvK2cn7VvUOpwF2rSCe' }, // jacob
    { first_name: 'Peter', last_name: 'Rockafeller', username: 'peter.rockafeller', hashed_password: '$2b$12$4Ly0F/OmG4FzezVuxM09Tev7HSkTzdSke.9ObPcsnuybHUcWAWpci' }, // rockman
    { first_name: 'Paul', last_name: 'Bishop', username: 'paul.bishop', hashed_password: '$2b$12$VZDCJ49vPpTsbi7EWboMYewUVdYRX0JSYWukTyWFiK2Gxuejl.EfG' }, // bible
    { first_name: 'Thomas', last_name: 'Jefferson', username: 'thomas.jefferson', hashed_password: '$2b$12$M6xoj5DySd5/RBABDuDBjO2oaZGK2GFqkN5p/I88nfed4PUO1qvuq' } // 1776
  ]);
};
