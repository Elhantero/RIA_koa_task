const myDb = require('../managers/testDbManager');

const Memcached = require('memcached');
const memcached = new Memcached();


/**
 *   RIA node task
 */
async function getGoods(ctx, next) {
    ctx.body = await memcached.get(ctx.params.id, function (err, data) {
        err ? ctx.status = 404 : ctx.status = 200;
        console.log(data);
    });
    await next();
}

async function setGoods(ctx, next) {
    for (var key in ctx.request.body) {
        ctx.body = await memcached.set(key, ctx.request.body[key], 10000, function (err) {
            err ? ctx.status = 400 : ctx.status = 201;
        });
    }
    await next();
}

async function delGoods(ctx, next) {
    ctx.body = await memcached.del(ctx.params.id, function (err) {
        err ? ctx.status = 400 : ctx.status = 204;
    });
    ctx.status = 204;
    await next();
}


/**
 * @example curl -XGET "http://localhost:8081/users/1"
 */
async function getId(ctx, next) {
    ctx.body = await myDb.getById(ctx.params.id);
    await next();
}

/**
* @example curl -XGET "http://localhost:8081/users"
*/
async function list(ctx, next) {
    ctx.body = await myDb.getAll();
    await next();
}

/**
 * @example curl -XPOST "http://localhost:8081/users" -d '{"name":"New record 1"}' -H 'Content-Type: application/json'
 */
async function createItem(ctx, next) {
    ctx.body = await myDb.setNewId(ctx.request.body.name);
    ctx.status = 201;
    await next();
}

/**
 * @example curl -XPUT "http://localhost:8081/users/3" -d '{"name":"New record 3"}' -H 'Content-Type: application/json'
 */
async function updateItem(ctx, next) {
    ctx.body = await myDb.updateId(ctx.params.id, ctx.request.body.name);
    await next();
}

/**
 * @example curl -XDELETE "http://localhost:8081/users/3"
 */
async function removeItem(ctx, next) {
    await myDb.removeId(ctx.params.id);
    ctx.status = 204;
    await next();
}

module.exports = { getId, list, createItem, updateItem, removeItem, getGoods, setGoods, delGoods };
