const app = require("../../app");
const request = require("request");
const MongoClient = require("mongodb").MongoClient;
const { connection_string, database } = require("../../model/config");

exports.add_to_waitinglist_e2e_test = {
  "reset db": test => {
    MongoClient.connect(
      connection_string,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      },
      (err, client) => {
        const db = client.db(database);
        db.collection("waitinglist")
          .drop()
          .catch(() => {})
          .finally(() => {
            test.done();
          });
      }
    );
  },

  "start app": test => {
    app.listen(3000, test.done);
  },

  "deny without user full name": test => {
    let data = {
      user_phone: "012345678",
      hospital_id: 1
    };
    request.post(
      {
        headers: { "content-type": "application/json" },
        url: "http://localhost:3000/users/waitinglist",
        body: JSON.stringify(data)
      },
      (err, res, body) => {
        body = JSON.parse(body);
        test.equal(res.statusCode, 400);
        test.equal(body.result, "fail");
        test.equal(body.message, "user_fullname required");
        test.done();
      }
    );
  },

  "deny without user phone": test => {
    let data = {
      user_fullname: "Fiona Lin",
      hospital_id: 1
    };
    request.post(
      {
        headers: { "content-type": "application/json" },
        url: "http://localhost:3000/users/waitinglist",
        body: JSON.stringify(data)
      },
      (err, res, body) => {
        body = JSON.parse(body);
        test.equal(res.statusCode, 400);
        test.equal(body.result, "fail");
        test.equal(body.message, "user_phone required");
        test.done();
      }
    );
  },

  "deny without hospital id": test => {
    let data = {
      user_fullname: "Fiona Lin",
      user_phone: "012345678"
    };
    request.post(
      {
        headers: { "content-type": "application/json" },
        url: "http://localhost:3000/users/waitinglist",
        body: JSON.stringify(data)
      },
      (err, res, body) => {
        body = JSON.parse(body);
        test.equal(res.statusCode, 400);
        test.equal(body.result, "fail");
        test.equal(body.message, "hospital_id required");
        test.done();
      }
    );
  },

  "deny with invalid user full name": test => {
    let data = {
      user_fullname: {},
      user_phone: "012345678",
      hospital_id: 1
    };
    request.post(
      {
        headers: { "content-type": "application/json" },
        url: "http://localhost:3000/users/waitinglist",
        body: JSON.stringify(data)
      },
      (err, res, body) => {
        body = JSON.parse(body);
        test.equal(res.statusCode, 400);
        test.equal(body.result, "fail");
        test.equal(body.message, "invalid user_fullname");
        test.done();
      }
    );
  },

  "deny with invalid user phone": test => {
    let data = {
      user_fullname: "Fiona Lin",
      user_phone: {},
      hospital_id: 1
    };
    request.post(
      {
        headers: { "content-type": "application/json" },
        url: "http://localhost:3000/users/waitinglist",
        body: JSON.stringify(data)
      },
      (err, res, body) => {
        body = JSON.parse(body);
        test.equal(res.statusCode, 400);
        test.equal(body.result, "fail");
        test.equal(body.message, "invalid user_phone");
        test.done();
      }
    );
  },

  "deny with invalid hospital id": test => {
    let data = {
      user_fullname: "Fiona Lin",
      user_phone: "012345678",
      hospital_id: "01"
    };
    request.post(
      {
        headers: { "content-type": "application/json" },
        url: "http://localhost:3000/users/waitinglist",
        body: JSON.stringify(data)
      },
      (err, res, body) => {
        body = JSON.parse(body);
        test.equal(res.statusCode, 400);
        test.equal(body.result, "fail");
        test.equal(body.message, "invalid hospital_id");
        test.done();
      }
    );
  },

  "add to waitinglist": test => {
    let data = {
      user_fullname: "Fiona Lin",
      user_phone: "012345678",
      hospital_id: 1
    };
    request.post(
      {
        headers: { "content-type": "application/json" },
        url: "http://localhost:3000/users/waitinglist",
        body: JSON.stringify(data)
      },
      (err, res, body) => {
        body = JSON.parse(body);
        test.equal(res.statusCode, 200);
        test.equal(body.user_fullname, data.user_fullname);
        test.equal(body.user_phone, data.user_phone);
        test.equal(body.hospital_id, data.hospital_id);
        test.done();
      }
    );
  }
};
