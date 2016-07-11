import query from '../src';
import assert from 'assert';

describe ("Query", ()=>{

  describe("test /api/item?order=name", ()=> {
    it("should return options: order:[ 'name', 'ASC']", ()=>{

      const resp = query({ order: 'name' });
      // console.log(resp)

      assert.equal('name', resp.order[0][0]);
      assert.equal('ASC', resp.order[0][1]);
    });
  });

  describe("test /api/item?order=-name", ()=> {
    it("should return options: order:[ 'name', 'DESC']", ()=>{

      const resp = query({ order: '-name' });

      assert.equal('name', resp.order[0][0]);
      assert.equal('DESC', resp.order[0][1]);
    });
  });
});
