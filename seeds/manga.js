/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('manga').del()
  await knex('manga').insert([
    {title: 'jujutsu kaisen', author: 'Gege Akutami',chapter:'Chapter 252', link: 'https://mangakakalot.com/manga/jujutsu-kaisen/'},
    {title: 'one piece', author: 'Eiichiro Oda',chapter:'Chapter 1108', link: 'https://mangakakalot.com/manga/one-piece/'},
    {title: 'naruto', author: 'Masashi Kishimoto',chapter:'Chapter 700', link: 'https://mangakakalot.com/manga/naruto/'},
  ]);
};
