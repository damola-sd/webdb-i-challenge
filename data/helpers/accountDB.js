const db = require('../dbConfig.js');


export function get() {
    return db('accounts');
}

export function getById(id) {
    return db('accounts').where({ id });
}

export function add( account ) {
    return db('accounts').insert(account);
}
export function update(id, account) {
    return db('accounts').where({ id }).update( account )
}

export function deleteAccount(id) {
    return db('accounts').where({ id }).del();
}

