const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class RocketsController {
  async create( request, response ) {
    const { name, description, height, diameter, mass, photo } = request.body
    const user_id = request.user.id

    const created_at = knex.fn.now()
    const updated_at = knex.fn.now()
    try {
      await knex("rockets").insert({
        name,
        description,
        height,
        diameter,
        mass,
        photo,
        user_id,
        created_at,
        updated_at
      })
    } catch(error) {
      if(error.data){
        return AppError(error.data.message)
      } else {
        return AppError("Não foi possível criar o novo rocket")
      }
    }
  

    return response.status(201).json()
  }
  async update( request, response ) {
    const { id, name, description, height, diameter, mass, photo } = request.body

    const user_id = request.user.id
    const rocket = await knex("rockets").where({user_id}).andWhere({id}).first()

    if(!rocket) {
      throw new AppError("Não foi possivel localizar o rocket")
    }

    const updated_at = knex.fn.now()

    try {
      await knex("rockets")
      .where({user_id}).andWhere({id})
      .update({
        name,
        description,
        height,
        diameter,
        mass,
        photo,
        updated_at
      })
    } catch(error) {
      if(error.data){
        return AppError(error.data.message)
      } else {
        return AppError("Não foi possível atualizar o rocket")
      }
    }

    return response.json()

  }
  async delete( request, response ) {
    const { id } = request.params
    const user_id = request.user.id
    
    const rocket = await knex("rockets")
      .where({user_id})
      .andWhere({id})
      .first()
    
    if(!rocket){
      throw new AppError("Rocket não foi localizado")
    }
  
    try {
      await knex("rockets")
      .where({user_id})
      .andWhere({id})
      .delete()
    } catch(error) {
      if(error.data){
        return AppError(error.data.message)
      } else {
        return AppError("não foi possivel deletar o rocket")
      }
    }

    return response.json()
  }
  async index( request, response ) {
    const { name } = request.query
    const user_id  = request.user.id
    let rockets

    if(!name) {
      rockets = await knex("rockets")
      .where({user_id})
      .orderBy("name")
    }else {
      rockets = await knex("rockets")
      .where({user_id})
      .whereLike("name", `%${ name }%`)
      .orderBy("name")
    }
    if(!rockets) {
      throw new AppError("Nenhum rocket localizado")
    }
    return response.json(rockets)
  }
  async show( request, response ) {
    const { id } = request.params
    const user_id = request.user.id
    const rocket = await knex("rockets")
      .where({user_id})
      .andWhere({id})
      .first()

    if(!rocket) {
      throw new AppError("rocket não localizado!")
    }
    
    return response.json(rocket)
  }
  async all( request, response ) {
    const rockets = await knex.column(['name', 'description','height', 'diameter', 'mass', 'photo']).select().from('rockets').orderBy("name");
    if(!rockets) {
      throw new AppError("nenhum rocket encontrado!")
    }
    return response.json(rockets)
  }
}

module.exports = RocketsController