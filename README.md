# Express req.query -> sequelize find object
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
    + options.sort:{name:1}

- /api/item?order=-name
    + options.sort:{name:-1}

### Limit, Skip
- /api/item?limit=5&skip=5
    + Project.findAll({ offset: 5, limit: 5 })
