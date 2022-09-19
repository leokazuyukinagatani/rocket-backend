exports.up = knex => knex.schema.createTable("rockets", table => {
  
  table.increments('id');
  table.text('name').notNullable();
  table.text('description');
  table.integer('height');
  table.integer('diameter');
  table.integer('mass');
  table.text("photo")
  table.integer('user_id').references('id').inTable('users');
  
  table.timestamp('created_at').default(knex.fn.now());
  table.timestamp('updated_at').default(knex.fn.now());

})


exports.down = knex => knex.schema.dropTable("rockets")