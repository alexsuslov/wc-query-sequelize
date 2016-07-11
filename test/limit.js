import query from '../src';
import assert from 'assert';

describe ("Query", ()=>{

  // /api/item?limit=50&skip=50
  describe("test LIMIT limit=50 & skip=100", ()=> {
    it("should return options: {limit: 50, offset:100}", ()=>{

      const resp = query({ limit: 50, skip: 100 });

      assert.equal(50, resp.limit);
      assert.equal(100, resp.offset);
    });
  });
});