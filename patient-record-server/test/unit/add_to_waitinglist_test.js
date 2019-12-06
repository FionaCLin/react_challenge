const { addToWaitinglist } = require("../../model/waitinglist.js");

exports.add_to_waitinglist_test = {
  "deny without user full name": test => {
    let data = {
      user_phone: "012345678",
      hospital_id: 1
    };
    addToWaitinglist(data, (err, res) => {
      test.ok(err);
      test.equal(err.message, "user_fullname required");
      test.done();
    });
  },

  "deny without user phone": test => {
    let data = {
      user_fullname: "Fiona Lin",
      user_phone: "012345678"
    };
    addToWaitinglist(data, (err, res) => {
      test.ok(err);
      test.equal(err.message, "hospital_id required");
      test.done();
    });
  },

  "deny without hospital id": test => {
    let data = {
      user_fullname: "Fiona Lin",
      hospital_id: 1
    };
    addToWaitinglist(data, (err, res) => {
      test.ok(err);
      test.equal(err.message, "user_phone required");
      test.done();
    });
  },
  
  "deny with invalid user full name": test => {
    let data = {
      user_fullname: {},
      user_phone: "012345678",
      hospital_id: 1
    };
    addToWaitinglist(data, (err, res) => {
      test.ok(err);
      test.equal(err.message, "invalid user_fullname");
      test.done();
    });
  },
  
  "deny with invalid user phone": test => {
    let data = {
      user_fullname: "Fiona Lin",
      user_phone: {},
      hospital_id: 1
    };
    addToWaitinglist(data, (err, res) => {
      test.ok(err);
      test.equal(err.message, "invalid user_phone");
      test.done();
    });
  },

  "deny with invalid hospital id": test => {
    let data = {
      user_fullname: "Fiona Lin",
      user_phone: "012345678",
      hospital_id: "01"
    };

    addToWaitinglist(data, (err, res) => {
      test.ok(err);
      test.equal(err.message, "invalid hospital_id");
      test.done();
    });
  },

  "add to waitinglist": test => {
    let data = {
      user_fullname: "Fiona Lin",
      user_phone: "012345678",
      hospital_id: 1
    };

    addToWaitinglist(data, (err, res) => {
      test.ok(!err);
      // test.equal(err.message, "invalid hospital_id");
      test.done();
    });
  }
  
};
