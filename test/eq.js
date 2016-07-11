import query from '../src';
import assert from 'assert';

describe ("Query", ()=>{

  describe("test EQ url: /api/item?name=test", ()=> {
    it("should return object: name:'test'", ()=>{
      const resp = query({ name: 'test' });
      assert.equal('test', resp.name);
    });
  });

  describe("test NE url: /api/item?name=!test", ()=> {
    it("should return object: name:{$ne:'test'}", ()=>{
      const resp = query({ name: '!test' });
      assert.equal( 'test', resp.name.$ne);
    });
  });

  describe("test GT url: /api/item?name=>1", ()=> {
    it("should return object: name:{$gt:1}", ()=>{
      const resp = query({ name: '>1' });
      assert.equal( 1, resp.name.$gt);
    });
  });

  describe("test LT url: /api/item?name=<1", ()=> {
    it("should return object: name:{$lt:1}", ()=>{
      const resp = query({ name: '<1' });
      assert.equal( 1, resp.name.$lt);
    });
  });

  describe("test LT url: /api/item?name=[1", ()=> {
    it("should return object: name:{$lte:1}", ()=>{
      const resp = query({ name: '[1' });
      assert.equal( 1, resp.name.$lte);
    });
  });

  describe("test LT url: /api/item?name=]1", ()=> {
    it("should return object: name:{$gte:1}", ()=>{
      const resp = query({ name: ']1' });
      assert.equal( 1, resp.name.$gte);
    });
  });

  describe("test IN url: /api/item?name=@1|2|3", ()=> {
    it("should return object: name: {$in:[ 1, 2, 3]}", ()=>{
      const resp = query({ name: '@1|2|3' });
      assert.equal( 1, resp.name.$in[0]);
    });
  });

  describe("test NIN url: /api/item?name=#1|2|3", ()=> {
    it("should return object: name: {$nin:[ 1, 2, 3]}", ()=>{
      const resp = query({ name: '#1|2|3' });
      assert.equal( 1, resp.name.$nin[0]);
    });
  });

  describe("test Lower Like url: /api/item?name=~test", ()=> {
    it("should return object: name: ", ()=>{
      const resp = query({ name: '~test' });
      // console.log(JSON.stringify(resp, null, ' ' ));
      assert.equal( '%test%', resp.name.logic.$like);
    });
  });

});
