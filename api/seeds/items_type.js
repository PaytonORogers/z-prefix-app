/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  // const myUsers = await knex.select('*').from('users')
  // await knex('items').insert([
  //   {iid: 1, uid: myUsers[0].uid, item_name: 'item_1', description: 'item_1 description', quantity: 5},
  //   {iid: 2, uid: myUsers[0].uid, item_name: 'item_2', description: 'item_2 description', quantity: 5},
  //   {iid: 3, uid: myUsers[1].uid, item_name: 'item_3', description: 'item_3 description', quantity: 5},
  //   {iid: 4, uid: myUsers[2].uid, item_name: 'item_4', description: 'item_4 description', quantity: 5},
  //   {iid: 5, uid: myUsers[3].uid, item_name: 'item_5', description: 'item_5 description', quantity: 5},
  //   {iid: 6, uid: myUsers[4].uid, item_name: 'item_6', description: 'item_6 description', quantity: 5},
  //   {iid: 7, uid: myUsers[3].uid, item_name: 'item_7', description: 'item_7 description', quantity: 5}
  // ]);
};
