/**
 * Convert http req to sequelize find object
 */
import Sequelize from 'sequelize';

export const vents = {
  "!" : ( name, value) => {return { name, value:{ $ne: value}}} ,
  ">" : ( name, value) => {return { name, value:{ $gt: value}}} ,
  "<" : ( name, value) => {return { name, value:{ $lt: value}}} ,
  "]" : ( name, value) => {return { name, value:{ $gte: value}}} ,
  "[" : ( name, value) => {return { name, value:{ $lte: value}}} ,

  "@" : ( name, value) => {return { name, value:{ $in:  value.split('|')}}} ,
  "#" : ( name, value) => {return { name, value:{ $notIn: value.split('|')}}} ,
  "~" : ( name, value) => {
    return {
      name,
      value: Sequelize.where(
        Sequelize.fn( 'LOWER', Sequelize.col(name)),
        { $like: `%${value.toLowerCase()}%`}),
    }
  },
}

export const Query = (query)=>{
  const {limit, skip, order} = query;
  const resp = {};
  // limit
  if (limit) {
    resp['limit'] = limit;
    delete query.limit;
  }
  // skip
  if (skip) {
    resp['offset'] = skip;
    delete query.skip;
  }
  // order
  if (order){
    if (order[0]==='-')
      resp['order']=[[order.slice(1),'DESC']];
    else
      resp['order']=[[order,'ASC']];
    delete query.order;
  }

  // EQ
  Object.keys(query).forEach( (name)=>{
    if (!resp.where) resp.where = {};
    const vent = vents[query[name][0]];
    if (vent){
      const r = vent( name, query[name].slice(1) );
      resp.where[r.name] = r.value;
    }else{
      resp.where[name] = query[name];
    }
  })
  return resp;
}

export default Query;
