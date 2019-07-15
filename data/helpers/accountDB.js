const db = require('../dbConfig.js');

module.exports = {
    get, 
    getById,
    add,
    update,
    deleteAccount
};
function get() {
    return db('accounts');
}

function getById(id) {
    return db('accounts').where({ id });
}

function add( account ) {
    return db('accounts').insert(account);
}
function update(id, account) {
    return db('accounts').where({ id }).update( account )
}

function deleteAccount(id) {
    return db('accounts').where({ id }).del();
}

