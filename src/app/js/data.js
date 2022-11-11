import { URL } from './constants.js';

export async function getLogin(user) {
  const data = await fetch(`${URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.payload == null) {
        throw res.error;
      } else {
        return res;
      }
    });
  return data;
}

export async function getAccounts(token) {
  const data = await fetch(`${URL}/accounts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.payload == null) {
        throw res.error;
      } else {
        return res;
      }
    })
    .catch((err) => {
      throw err;
    });
  return data;
}

export async function getAccount(token, id) {
  const data = await fetch(`${URL}/account/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.payload == null) {
        throw res.error;
      } else {
        return res;
      }
    })
    .catch((err) => {
      throw err;
    });
  return data;
}

export async function createAccount(token) {
  const data = await fetch(`${URL}/create-account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.payload == null) {
        throw res.error;
      } else {
        return res;
      }
    })
    .catch((err) => {
      throw err;
    });
  return data;
}

export async function getAllCurrens(token) {
  const data = await fetch(`${URL}/all-currencies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.payload == null) {
        throw res.error;
      } else {
        return res;
      }
    })
    .catch((err) => {
      throw err;
    });
  return data;
}

export async function getCurrensAccount(token) {
  const data = await fetch(`${URL}/currencies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.payload == null) {
        throw res.error;
      } else {
        return res;
      }
    })
    .catch((err) => {
      throw err;
    });
  return data;
}

export async function doAccountTrans(token, transact) {
  const data = await fetch(`${URL}/transfer-funds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
    body: JSON.stringify(transact),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.payload == null) {
        throw res.error;
      } else {
        return res;
      }
    })
    .catch((err) => {
      throw err;
    });
  return data;
}

export async function doExchange(token, exchange) {
  const data = await fetch(`${URL}/currency-buy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
    body: JSON.stringify(exchange),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.payload == null) {
        throw res.error;
      } else {
        return res;
      }
    })
    .catch((err) => {
      throw err;
    });
  return data;
}

export async function getBanks(token) {
  const data = await fetch(`${URL}/banks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.payload == null) {
        throw res.error;
      } else {
        return res;
      }
    })
    .catch((err) => {
      throw err;
    });
  return data;
}
