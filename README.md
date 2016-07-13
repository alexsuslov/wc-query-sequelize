# Express req.query -> sequelize find object

## Simple use in graphQL controller:
```
import wQueryS from 'wc-query-sequelize'

const items = {
  type: new GraphQLList(Type),
  description: 'get item list',
  args: {
    limit : { type: IntType},
    skip  : { type: IntType},
    order : { type: StringType},
    name  : { type: StringType},
  },
  resolve( request, args, session) {
    const options = wQueryS(args);
    return Model.findAll(options);
  }
```

```
{items(limit:16, order:'-updatedAt', name:"~test" ){id name}}
```

```
SELECT * FROM `Items` WHERE LOWER(`name`) LIKE '%test%' ORDER BY `Items`.`updatedAt` DESC LIMIT 16;
```

## Comparison Query Operators
### EQ

- url: /api/item?name=test
    + name: 'test'

### NEQ

- url: /api/item?name=!test
    + name: {$ne:'test'}

### LT, LTE, GT, GTE
- LT  <
- LTE [
- GT  >
- GTE ]

- url: /api/item?name=>test
    + name: {$gt:'test'}

### IN,  NIN
- IN  - @
- NIN - #

- url: /api/item?name=@1|2|3
    + name: {$in:['1','2','3']}

### Lower Like
url: /api/item?name=~test
```
{
 "name": {
  "attribute": {
   "fn": "lower",
   "args": [
    {
     "col": "name"
    }
   ]
  },
  "comparator": "=",
  "logic": {
   "$like": "%test%"
  }
 }
}
```



## Evaluation Query Operators
### Sort

- /api/item?order=name
    + order:['name', 'ASC']

- /api/item?order=-name
    + order:['name', 'DESC']

### Limit, Skip
- /api/item?limit=5&skip=5
    + { offset: 5, limit: 5 }
