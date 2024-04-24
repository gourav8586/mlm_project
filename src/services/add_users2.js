let user = require("../model/user");
let Transaction = require("../model/transaction");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.addUsers2 = async (req, res) => {
  try {
    let userId = req.body.userId;
    let name = req.body.name;
    let mobile = req.body.mobile;
    let email = req.body.email;
    let pass = req.body.pass;
    let dateOfBirth = req.body.dateOfBirth;
    let address = req.body.address;
    let state = req.body.state;
    let gender = req.body.gender;
    let city = req.body.city;
    var wallet = req.body.wallet;
    let token = req.cookies.jwt;
    let addedBy = req.body.addedBy;
    let direction = req.body.direction;
    console.log("direction--", direction);
    // console.log("value----", value);
    // let value = req.body.value;

    let bpass = bcrypt.hashSync(pass, 10);

    let data = await user.findOne({ email: email });
    console.log("User_name....", +data);

    let Users = await user.findOne({ auth_key: token });
    console.log("auth vala user", Users);

    let sameparentid_user = await user.find({ addedBy: Users.addedBy });
    let val = [];
    for (let i = 0; i < sameparentid_user.length; i++) {
      let data = sameparentid_user[i];
      // val.push(data.addedBy);
      val.push(data.allchild);
      // console.log("addedBy property of user--", val);
    }
    // console.log("addedBy property of users ki value--", val);

    // let left_user = value.addedBy;
    // console.log("left vala user--", sameparentid_user.level);

    var pId = parseInt(Users.addedBy);
    console.log(Users.addedBy + "useraddedby-");
    let wallet_amount = parseFloat(wallet);
    var bonus_amount = wallet_amount * 0.25;
    var final_amount = wallet_amount - bonus_amount;

    var t0, t1, t2;
    t1 = bonus_amount;
    console.log(pId + "pid");
    i = pId;

    let Unlock_level = await user.find({ addedBy: Users.userId });

    let childLevels = [];
    for (let i = 0; i < Unlock_level.length; i++) {
      let child = Unlock_level[i];
      childLevels.push(child.level);
    }

    console.log("Child Levels:", childLevels);
    // console.log("userid ka parent--",Unlock_level.level);
    let mychild = Users.mychild;

    if (Users.role === "Admin") {
      if (mychild == 2) {
        console.log("mere child level--", childLevels);
        if (childLevels.every((level) => level === 2)) {
          console.log("you can increase your level--", childLevels);

          let mychildID = Users.mychild + 1;
          let mychildId = await user.findOneAndUpdate(
            { auth_key: token },
            { mychild: mychildID },
            { new: true }
          );

          if (!data) {
            let newUser = new user({
              userId: userId,
              name: name,
              mobile: mobile,
              email: email,
              pass: bpass,
              dateOfBirth: dateOfBirth,
              gender: gender,
              state: state,
              address: address,
              city: city,
              addedBy: Users.userId,
              wallet: final_amount,
              mychild: 0,
              direction: direction,
            });

            let savedUser = await newUser.save();

            if (newUser) {
              let allchild_member = await user.findOne({ userId: 1 });
              let add_all_child = allchild_member.allchild + 1;
              let updatechilds = await user.findOneAndUpdate(
                { userId: 1 },
                { allchild: add_all_child }
              );

              let User_level = Users.level + 1;
              let level_detail = await user.findOneAndUpdate(
                { auth_key: token },
                { level: User_level }
              );

              while (i > 0) {
                console.log("i" + i);

                t0 = t1 * 0.25; //62.5
                t2 = t1 * 0.75; //187

                let data1 = await user.findOne({ addedBy: i });
                console.log("mera" + i + "--" + data1);
                var test = parseFloat(data1.wallet) + t2;
                let data3 = await user.findOneAndUpdate(
                  { addedBy: i },
                  { wallet: test }
                );
                console.log("data3" + data3);

                t1 = t0;
                console.log("t1" + t1);
                i--;
              }
              let data1 = await user.findOne({ addedBy: 0 });
              var test = parseFloat(data1.wallet) + t1;
              let data3 = await user.findOneAndUpdate(
                { addedBy: 0 },
                { wallet: test }
              );

              let message_type = "Debited";
              let reason_message = "Money Added";

              let newTransaction = new Transaction({
                amount: final_amount,
                type: message_type,
                reason: reason_message,
                User_Id: Users.userId,
              });

              let transaction = await newTransaction.save();
              let message_types = "Debited";
              let reason_messages = "Refer Bonus";

              let newTransactions = new Transaction({
                amount: bonus_amount,
                type: message_types,
                reason: reason_messages,
                User_Id: Users.userId,
              });

              let transactions = await newTransactions.save();
              return {
                message: "User added",
                data: savedUser,
                success: true,
                status: 200,
              };
            } else {
              return {
                status: 500,
                success: false,
                message: "User already exists",
              };
            }
          } else {
            console.log("User found");
            return {
              status: 500,
              success: false,
              message: "User already exists",
            };
          }
        } else {
          return {
            status: 500,
            success: false,
            message: "Your child can't complete level-2",
          };
        }
      } else {
        if (!data) {
          let newUser = new user({
            userId: userId,
            name: name,
            mobile: mobile,
            email: email,
            pass: bpass,
            dateOfBirth: dateOfBirth,
            gender: gender,
            state: state,
            address: address,
            city: city,
            addedBy: Users.userId,
            wallet: final_amount,
            mychild: 0,
            direction: direction,
          });

          let savedUser = await newUser.save();

          if (newUser) {
            let mychildID = Users.mychild + 1;
            let mychildId = await user.findOneAndUpdate(
              { auth_key: token },
              { mychild: mychildID },
              { new: true }
            );

            let allchild_member = await user.findOne({ userId: 1 });
            let add_all_child = allchild_member.allchild + 1;
            let updatechilds = await user.findOneAndUpdate(
              { userId: 1 },
              { allchild: add_all_child }
            );

            let User_level = Users.level + 1;
            let level_detail = await user.findOneAndUpdate(
              { auth_key: token },
              { level: User_level }
            );

            while (i > 0) {
              console.log("i" + i);

              t0 = t1 * 0.25; //62.5
              t2 = t1 * 0.75; //187

              let data1 = await user.findOne({ addedBy: i });
              console.log("mera" + i + "--" + data1);
              var test = parseFloat(data1.wallet) + t2;
              let data3 = await user.findOneAndUpdate(
                { addedBy: i },
                { wallet: test }
              );
              console.log("data3" + data3);

              t1 = t0;
              console.log("t1" + t1);
              i--;
            }
            let data1 = await user.findOne({ addedBy: 0 });
            var test = parseFloat(data1.wallet) + t1;
            let data3 = await user.findOneAndUpdate(
              { addedBy: 0 },
              { wallet: test }
            );

            let message_type = "Debited";
            let reason_message = "Money Added";

            let newTransaction = new Transaction({
              amount: final_amount,
              type: message_type,
              reason: reason_message,
              User_Id: Users.userId,
            });

            let transaction = await newTransaction.save();
            let message_types = "Debited";
            let reason_messages = "Refer Bonus";

            let newTransactions = new Transaction({
              amount: bonus_amount,
              type: message_types,
              reason: reason_messages,
              User_Id: Users.userId,
            });

            let transactions = await newTransactions.save();
            return {
              message: "User added",
              data: savedUser,
              success: true,
              status: 200,
            };
          } else {
            return {
              status: 500,
              success: false,
              message: "User already exists",
            };
          }
        } else {
          console.log("User found");
          return {
            status: 500,
            success: false,
            message: "User already exists",
          };
        }
      }
    } else {
      if (Users.direction == "right") {
        let leftDirectionUser = await user.findOne({
          addedBy: Users.addedBy,
          direction: "left",
        });
        console.log("hello left user--", leftDirectionUser);
        // let leftDirectionUserChild = await user.findOne({
        //   addedBy: leftDirectionUser.userId,
        // });

        // console.log("hello left child--", leftDirectionUserChild);

        if (leftDirectionUser.mychild === 2) {
          console.log("Level of left direction user's child is 2");

          if (mychild == 2) {
            console.log("mere child level--", childLevels);
            if (childLevels.every((level) => level === 2)) {
              console.log("you can increase your level--", childLevels);

              if (direction === "left" && leftDirectionUser) {
                let leftDirectionUserId = leftDirectionUser.userId;

                let mychildID = Users.mychild + 1;
                let mychildId = await user.findOneAndUpdate(
                  { addedBy: Users.addedBy, direction: "left" },
                  { mychild: mychildID },
                  { new: true }
                );

                if (!data) {
                  let newUser = new user({
                    userId: userId,
                    name: name,
                    mobile: mobile,
                    email: email,
                    pass: bpass,
                    dateOfBirth: dateOfBirth,
                    gender: gender,
                    state: state,
                    address: address,
                    city: city,
                    addedBy: leftDirectionUserId,
                    wallet: final_amount,
                    mychild: 0,
                    direction: direction,
                  });

                  let savedUser = await newUser.save();

                  if (newUser) {
                    let allchild_member = await user.findOne({ userId: 1 });
                    let add_all_child = allchild_member.allchild + 1;
                    let updatechilds = await user.findOneAndUpdate(
                      { userId: 1 },
                      { allchild: add_all_child }
                    );

                    let User_level = Users.level + 1;
                    let level_detail = await user.findOneAndUpdate(
                      { addedBy: Users.addedBy, direction: "left" },
                      { level: User_level }
                    );

                    while (i > 0) {
                      console.log("i" + i);

                      t0 = t1 * 0.25; //62.5
                      t2 = t1 * 0.75; //187

                      let data1 = await user.findOne({ addedBy: i });
                      console.log("mera" + i + "--" + data1);
                      var test = parseFloat(data1.wallet) + t2;
                      let data3 = await user.findOneAndUpdate(
                        { addedBy: i },
                        { wallet: test }
                      );
                      console.log("data3" + data3);

                      t1 = t0;
                      console.log("t1" + t1);
                      i--;
                    }
                    let data1 = await user.findOne({ addedBy: 0 });
                    var test = parseFloat(data1.wallet) + t1;
                    let data3 = await user.findOneAndUpdate(
                      { addedBy: 0 },
                      { wallet: test }
                    );

                    let message_type = "Debited";
                    let reason_message = "Money Added";

                    let newTransaction = new Transaction({
                      amount: final_amount,
                      type: message_type,
                      reason: reason_message,
                      User_Id: Users.userId,
                    });

                    let transaction = await newTransaction.save();
                    let message_types = "Debited";
                    let reason_messages = "Refer Bonus";

                    let newTransactions = new Transaction({
                      amount: bonus_amount,
                      type: message_types,
                      reason: reason_messages,
                      User_Id: Users.userId,
                    });

                    let transactions = await newTransactions.save();
                    return {
                      message: "User added",
                      data: savedUser,
                      success: true,
                      status: 200,
                    };
                  } else {
                    return {
                      status: 500,
                      success: false,
                      message: "User already exists",
                    };
                  }
                } else {
                  console.log("User found");
                  return {
                    status: 500,
                    success: false,
                    message: "User already exists",
                  };
                }
              } else {
                let mychildID = Users.mychild + 1;
                let mychildId = await user.findOneAndUpdate(
                  { auth_key: token },
                  { mychild: mychildID },
                  { new: true }
                );

                if (!data) {
                  let newUser = new user({
                    userId: userId,
                    name: name,
                    mobile: mobile,
                    email: email,
                    pass: bpass,
                    dateOfBirth: dateOfBirth,
                    gender: gender,
                    state: state,
                    address: address,
                    city: city,
                    addedBy: Users.userId,
                    wallet: final_amount,
                    mychild: 0,
                    direction: direction,
                  });

                  let savedUser = await newUser.save();

                  if (newUser) {
                    let allchild_member = await user.findOne({ userId: 1 });
                    let add_all_child = allchild_member.allchild + 1;
                    let updatechilds = await user.findOneAndUpdate(
                      { userId: 1 },
                      { allchild: add_all_child }
                    );

                    let User_level = Users.level + 1;
                    let level_detail = await user.findOneAndUpdate(
                      { auth_key: token },
                      { level: User_level }
                    );

                    while (i > 0) {
                      console.log("i" + i);

                      t0 = t1 * 0.25; //62.5
                      t2 = t1 * 0.75; //187

                      let data1 = await user.findOne({ addedBy: i });
                      console.log("mera" + i + "--" + data1);
                      var test = parseFloat(data1.wallet) + t2;
                      let data3 = await user.findOneAndUpdate(
                        { addedBy: i },
                        { wallet: test }
                      );
                      console.log("data3" + data3);

                      t1 = t0;
                      console.log("t1" + t1);
                      i--;
                    }
                    let data1 = await user.findOne({ addedBy: 0 });
                    var test = parseFloat(data1.wallet) + t1;
                    let data3 = await user.findOneAndUpdate(
                      { addedBy: 0 },
                      { wallet: test }
                    );

                    let message_type = "Debited";
                    let reason_message = "Money Added";

                    let newTransaction = new Transaction({
                      amount: final_amount,
                      type: message_type,
                      reason: reason_message,
                      User_Id: Users.userId,
                    });

                    let transaction = await newTransaction.save();
                    let message_types = "Debited";
                    let reason_messages = "Refer Bonus";

                    let newTransactions = new Transaction({
                      amount: bonus_amount,
                      type: message_types,
                      reason: reason_messages,
                      User_Id: Users.userId,
                    });

                    let transactions = await newTransactions.save();
                    return {
                      message: "User added",
                      data: savedUser,
                      success: true,
                      status: 200,
                    };
                  } else {
                    return {
                      status: 500,
                      success: false,
                      message: "User already exists",
                    };
                  }
                } else {
                  console.log("User found");
                  return {
                    status: 500,
                    success: false,
                    message: "User already exists",
                  };
                }
              }
            } else {
              return {
                status: 500,
                success: false,
                message: "Your child can't complete level-2",
              };
            }
          } else if (direction === "left" && leftDirectionUser) {
            let leftDirectionUserId = leftDirectionUser.userId;

            let mychildID = Users.mychild + 1;
            let mychildId = await user.findOneAndUpdate(
              { addedBy: Users.addedBy, direction: "left" },
              { mychild: mychildID },
              { new: true }
            );

            if (!data) {
              let newUser = new user({
                userId: userId,
                name: name,
                mobile: mobile,
                email: email,
                pass: bpass,
                dateOfBirth: dateOfBirth,
                gender: gender,
                state: state,
                address: address,
                city: city,
                addedBy: leftDirectionUserId,
                wallet: final_amount,
                mychild: 0,
                direction: direction,
              });

              let savedUser = await newUser.save();

              if (newUser) {
                let allchild_member = await user.findOne({ userId: 1 });
                let add_all_child = allchild_member.allchild + 1;
                let updatechilds = await user.findOneAndUpdate(
                  { userId: 1 },
                  { allchild: add_all_child }
                );

                let User_level = Users.level + 1;
                let level_detail = await user.findOneAndUpdate(
                  { addedBy: Users.addedBy, direction: "left" },
                  { level: User_level }
                );

                while (i > 0) {
                  console.log("i" + i);

                  t0 = t1 * 0.25; //62.5
                  t2 = t1 * 0.75; //187

                  let data1 = await user.findOne({ addedBy: i });
                  console.log("mera" + i + "--" + data1);
                  var test = parseFloat(data1.wallet) + t2;
                  let data3 = await user.findOneAndUpdate(
                    { addedBy: i },
                    { wallet: test }
                  );
                  console.log("data3" + data3);

                  t1 = t0;
                  console.log("t1" + t1);
                  i--;
                }
                let data1 = await user.findOne({ addedBy: 0 });
                var test = parseFloat(data1.wallet) + t1;
                let data3 = await user.findOneAndUpdate(
                  { addedBy: 0 },
                  { wallet: test }
                );

                let message_type = "Debited";
                let reason_message = "Money Added";

                let newTransaction = new Transaction({
                  amount: final_amount,
                  type: message_type,
                  reason: reason_message,
                  User_Id: Users.userId,
                });

                let transaction = await newTransaction.save();
                let message_types = "Debited";
                let reason_messages = "Refer Bonus";

                let newTransactions = new Transaction({
                  amount: bonus_amount,
                  type: message_types,
                  reason: reason_messages,
                  User_Id: Users.userId,
                });

                let transactions = await newTransactions.save();
                return {
                  message: "User added",
                  data: savedUser,
                  success: true,
                  status: 200,
                };
              } else {
                return {
                  status: 500,
                  success: false,
                  message: "User already exists",
                };
              }
            } else {
              console.log("User found");
              return {
                status: 500,
                success: false,
                message: "User already exists",
              };
            }
          } else {
            // let rightDirectionUserId = rightDirectionUser.userId;

            let mychildID = Users.mychild + 1;
            let mychildId = await user.findOneAndUpdate(
              { auth_key: token },
              { mychild: mychildID },
              { new: true }
            );

            if (!data) {
              let newUser = new user({
                userId: userId,
                name: name,
                mobile: mobile,
                email: email,
                pass: bpass,
                dateOfBirth: dateOfBirth,
                gender: gender,
                state: state,
                address: address,
                city: city,
                addedBy: Users.userId,
                wallet: final_amount,
                mychild: 0,
                direction: direction,
              });

              let savedUser = await newUser.save();

              if (newUser) {
                let allchild_member = await user.findOne({ userId: 1 });
                let add_all_child = allchild_member.allchild + 1;
                let updatechilds = await user.findOneAndUpdate(
                  { userId: 1 },
                  { allchild: add_all_child }
                );

                let User_level = Users.level + 1;
                let level_detail = await user.findOneAndUpdate(
                  { auth_key: token },
                  { level: User_level }
                );

                while (i > 0) {
                  console.log("i" + i);

                  t0 = t1 * 0.25; //62.5
                  t2 = t1 * 0.75; //187

                  let data1 = await user.findOne({ addedBy: i });
                  console.log("mera" + i + "--" + data1);
                  var test = parseFloat(data1.wallet) + t2;
                  let data3 = await user.findOneAndUpdate(
                    { addedBy: i },
                    { wallet: test }
                  );
                  console.log("data3" + data3);

                  t1 = t0;
                  console.log("t1" + t1);
                  i--;
                }
                let data1 = await user.findOne({ addedBy: 0 });
                var test = parseFloat(data1.wallet) + t1;
                let data3 = await user.findOneAndUpdate(
                  { addedBy: 0 },
                  { wallet: test }
                );

                let message_type = "Debited";
                let reason_message = "Money Added";

                let newTransaction = new Transaction({
                  amount: final_amount,
                  type: message_type,
                  reason: reason_message,
                  User_Id: Users.userId,
                });

                let transaction = await newTransaction.save();
                let message_types = "Debited";
                let reason_messages = "Refer Bonus";

                let newTransactions = new Transaction({
                  amount: bonus_amount,
                  type: message_types,
                  reason: reason_messages,
                  User_Id: Users.userId,
                });

                let transactions = await newTransactions.save();
                return {
                  message: "User added",
                  data: savedUser,
                  success: true,
                  status: 200,
                };
              } else {
                return {
                  status: 500,
                  success: false,
                  message: "User already exists",
                };
              }
            } else {
              console.log("User found");
              return {
                status: 500,
                success: false,
                message: "User already exists",
              };
            }
          }
        } else {
          // Handle the case when the condition is not met
          return {
            status: 500,
            success: false,
            message: "Level of left direction user's child is not 2",
          };
        }
      } else if (Users.direction == "left") {
        let rightDirectionUser = await user.findOne({
          addedBy: Users.addedBy,
          direction: "right",
        });

        console.log("right vala user --", rightDirectionUser);

        if (mychild == 2) {
          console.log("mere child level--", childLevels);
          if (childLevels.every((level) => level === 2)) {
            console.log("you can increase your level--", childLevels);

            if (direction === "right" && rightDirectionUser) {
              let rightDirectionUserId = rightDirectionUser.userId;

              let mychildID = Users.mychild + 1;
              let mychildId = await user.findOneAndUpdate(
                { addedBy: Users.addedBy, direction: "right" },
                { mychild: mychildID },
                { new: true }
              );

              if (!data) {
                let newUser = new user({
                  userId: userId,
                  name: name,
                  mobile: mobile,
                  email: email,
                  pass: bpass,
                  dateOfBirth: dateOfBirth,
                  gender: gender,
                  state: state,
                  address: address,
                  city: city,
                  addedBy: rightDirectionUserId,
                  wallet: final_amount,
                  mychild: 0,
                  direction: direction,
                });

                let savedUser = await newUser.save();

                if (newUser) {
                  let allchild_member = await user.findOne({ userId: 1 });
                  let add_all_child = allchild_member.allchild + 1;
                  let updatechilds = await user.findOneAndUpdate(
                    { userId: 1 },
                    { allchild: add_all_child }
                  );

                  let User_level = Users.level + 1;
                  let level_detail = await user.findOneAndUpdate(
                    { addedBy: Users.addedBy, direction: "right" },
                    { level: User_level }
                  );

                  while (i > 0) {
                    console.log("i" + i);

                    t0 = t1 * 0.25; //62.5
                    t2 = t1 * 0.75; //187

                    let data1 = await user.findOne({ addedBy: i });
                    console.log("mera" + i + "--" + data1);
                    var test = parseFloat(data1.wallet) + t2;
                    let data3 = await user.findOneAndUpdate(
                      { addedBy: i },
                      { wallet: test }
                    );
                    console.log("data3" + data3);

                    t1 = t0;
                    console.log("t1" + t1);
                    i--;
                  }
                  let data1 = await user.findOne({ addedBy: 0 });
                  var test = parseFloat(data1.wallet) + t1;
                  let data3 = await user.findOneAndUpdate(
                    { addedBy: 0 },
                    { wallet: test }
                  );

                  let message_type = "Debited";
                  let reason_message = "Money Added";

                  let newTransaction = new Transaction({
                    amount: final_amount,
                    type: message_type,
                    reason: reason_message,
                    User_Id: Users.userId,
                  });

                  let transaction = await newTransaction.save();
                  let message_types = "Debited";
                  let reason_messages = "Refer Bonus";

                  let newTransactions = new Transaction({
                    amount: bonus_amount,
                    type: message_types,
                    reason: reason_messages,
                    User_Id: Users.userId,
                  });

                  let transactions = await newTransactions.save();
                  return {
                    message: "User added",
                    data: savedUser,
                    success: true,
                    status: 200,
                  };
                } else {
                  return {
                    status: 500,
                    success: false,
                    message: "User already exists",
                  };
                }
              } else {
                console.log("User found");
                return {
                  status: 500,
                  success: false,
                  message: "User already exists",
                };
              }
            } else {
              let mychildID = Users.mychild + 1;
              let mychildId = await user.findOneAndUpdate(
                { auth_key: token },
                { mychild: mychildID },
                { new: true }
              );

              if (!data) {
                let newUser = new user({
                  userId: userId,
                  name: name,
                  mobile: mobile,
                  email: email,
                  pass: bpass,
                  dateOfBirth: dateOfBirth,
                  gender: gender,
                  state: state,
                  address: address,
                  city: city,
                  addedBy: Users.userId,
                  wallet: final_amount,
                  mychild: 0,
                  direction: direction,
                });

                let savedUser = await newUser.save();

                if (newUser) {
                  let allchild_member = await user.findOne({ userId: 1 });
                  let add_all_child = allchild_member.allchild + 1;
                  let updatechilds = await user.findOneAndUpdate(
                    { userId: 1 },
                    { allchild: add_all_child }
                  );

                  let User_level = Users.level + 1;
                  let level_detail = await user.findOneAndUpdate(
                    { auth_key: token },
                    { level: User_level }
                  );

                  while (i > 0) {
                    console.log("i" + i);

                    t0 = t1 * 0.25; //62.5
                    t2 = t1 * 0.75; //187

                    let data1 = await user.findOne({ addedBy: i });
                    console.log("mera" + i + "--" + data1);
                    var test = parseFloat(data1.wallet) + t2;
                    let data3 = await user.findOneAndUpdate(
                      { addedBy: i },
                      { wallet: test }
                    );
                    console.log("data3" + data3);

                    t1 = t0;
                    console.log("t1" + t1);
                    i--;
                  }
                  let data1 = await user.findOne({ addedBy: 0 });
                  var test = parseFloat(data1.wallet) + t1;
                  let data3 = await user.findOneAndUpdate(
                    { addedBy: 0 },
                    { wallet: test }
                  );

                  let message_type = "Debited";
                  let reason_message = "Money Added";

                  let newTransaction = new Transaction({
                    amount: final_amount,
                    type: message_type,
                    reason: reason_message,
                    User_Id: Users.userId,
                  });

                  let transaction = await newTransaction.save();
                  let message_types = "Debited";
                  let reason_messages = "Refer Bonus";

                  let newTransactions = new Transaction({
                    amount: bonus_amount,
                    type: message_types,
                    reason: reason_messages,
                    User_Id: Users.userId,
                  });

                  let transactions = await newTransactions.save();
                  return {
                    message: "User added",
                    data: savedUser,
                    success: true,
                    status: 200,
                  };
                } else {
                  return {
                    status: 500,
                    success: false,
                    message: "User already exists",
                  };
                }
              } else {
                console.log("User found");
                return {
                  status: 500,
                  success: false,
                  message: "User already exists",
                };
              }
            }
          } else {
            return {
              status: 500,
              success: false,
              message: "Your child can't complete level-2",
            };
          }
        } else if (direction === "right" && rightDirectionUser) {
          let rightDirectionUserId = rightDirectionUser.userId;

          let mychildID = Users.mychild + 1;
          let mychildId = await user.findOneAndUpdate(
            { addedBy: Users.addedBy, direction: "right" },
            { mychild: mychildID },
            { new: true }
          );

          if (!data) {
            let newUser = new user({
              userId: userId,
              name: name,
              mobile: mobile,
              email: email,
              pass: bpass,
              dateOfBirth: dateOfBirth,
              gender: gender,
              state: state,
              address: address,
              city: city,
              addedBy: rightDirectionUserId,
              wallet: final_amount,
              mychild: 0,
              direction: direction,
            });

            let savedUser = await newUser.save();

            if (newUser) {
              let allchild_member = await user.findOne({ userId: 1 });
              let add_all_child = allchild_member.allchild + 1;
              let updatechilds = await user.findOneAndUpdate(
                { userId: 1 },
                { allchild: add_all_child }
              );

              let User_level = Users.level + 1;
              let level_detail = await user.findOneAndUpdate(
                { addedBy: Users.addedBy, direction: "right" },
                { level: User_level }
              );

              while (i > 0) {
                console.log("i" + i);

                t0 = t1 * 0.25; //62.5
                t2 = t1 * 0.75; //187

                let data1 = await user.findOne({ addedBy: i });
                console.log("mera" + i + "--" + data1);
                var test = parseFloat(data1.wallet) + t2;
                let data3 = await user.findOneAndUpdate(
                  { addedBy: i },
                  { wallet: test }
                );
                console.log("data3" + data3);

                t1 = t0;
                console.log("t1" + t1);
                i--;
              }
              let data1 = await user.findOne({ addedBy: 0 });
              var test = parseFloat(data1.wallet) + t1;
              let data3 = await user.findOneAndUpdate(
                { addedBy: 0 },
                { wallet: test }
              );

              let message_type = "Debited";
              let reason_message = "Money Added";

              let newTransaction = new Transaction({
                amount: final_amount,
                type: message_type,
                reason: reason_message,
                User_Id: Users.userId,
              });

              let transaction = await newTransaction.save();
              let message_types = "Debited";
              let reason_messages = "Refer Bonus";

              let newTransactions = new Transaction({
                amount: bonus_amount,
                type: message_types,
                reason: reason_messages,
                User_Id: Users.userId,
              });

              let transactions = await newTransactions.save();
              return {
                message: "User added",
                data: savedUser,
                success: true,
                status: 200,
              };
            } else {
              return {
                status: 500,
                success: false,
                message: "User already exists",
              };
            }
          } else {
            console.log("User found");
            return {
              status: 500,
              success: false,
              message: "User already exists",
            };
          }
        } else {
          // let rightDirectionUserId = rightDirectionUser.userId;

          let mychildID = Users.mychild + 1;
          let mychildId = await user.findOneAndUpdate(
            { auth_key: token },
            { mychild: mychildID },
            { new: true }
          );

          if (!data) {
            let newUser = new user({
              userId: userId,
              name: name,
              mobile: mobile,
              email: email,
              pass: bpass,
              dateOfBirth: dateOfBirth,
              gender: gender,
              state: state,
              address: address,
              city: city,
              addedBy: Users.userId,
              wallet: final_amount,
              mychild: 0,
              direction: direction,
            });

            let savedUser = await newUser.save();

            if (newUser) {
              let allchild_member = await user.findOne({ userId: 1 });
              let add_all_child = allchild_member.allchild + 1;
              let updatechilds = await user.findOneAndUpdate(
                { userId: 1 },
                { allchild: add_all_child }
              );

              let User_level = Users.level + 1;
              let level_detail = await user.findOneAndUpdate(
                { auth_key: token },
                { level: User_level }
              );

              while (i > 0) {
                console.log("i" + i);

                t0 = t1 * 0.25; //62.5
                t2 = t1 * 0.75; //187

                let data1 = await user.findOne({ addedBy: i });
                console.log("mera" + i + "--" + data1);
                var test = parseFloat(data1.wallet) + t2;
                let data3 = await user.findOneAndUpdate(
                  { addedBy: i },
                  { wallet: test }
                );
                console.log("data3" + data3);

                t1 = t0;
                console.log("t1" + t1);
                i--;
              }
              let data1 = await user.findOne({ addedBy: 0 });
              var test = parseFloat(data1.wallet) + t1;
              let data3 = await user.findOneAndUpdate(
                { addedBy: 0 },
                { wallet: test }
              );

              let message_type = "Debited";
              let reason_message = "Money Added";

              let newTransaction = new Transaction({
                amount: final_amount,
                type: message_type,
                reason: reason_message,
                User_Id: Users.userId,
              });

              let transaction = await newTransaction.save();
              let message_types = "Debited";
              let reason_messages = "Refer Bonus";

              let newTransactions = new Transaction({
                amount: bonus_amount,
                type: message_types,
                reason: reason_messages,
                User_Id: Users.userId,
              });

              let transactions = await newTransactions.save();
              return {
                message: "User added",
                data: savedUser,
                success: true,
                status: 200,
              };
            } else {
              return {
                status: 500,
                success: false,
                message: "User already exists",
              };
            }
          } else {
            console.log("User found");
            return {
              status: 500,
              success: false,
              message: "User already exists",
            };
          }
        }
      } //next direction
      else {
        let rightDirectionUser = await user.findOne({
          addedBy: Users.addedBy,
          direction: "right",
        });

        let leftDirectionUser = await user.findOne({
          addedBy: Users.addedBy,
          direction: "left",
        });
        console.log("rightdirection user--", rightDirectionUser);

        if (rightDirectionUser.mychild === 2) {
          console.log("Level of right direction user's child is 2");

          if (mychild == 2) {
            console.log("mere child level--", childLevels);
            if (childLevels.every((level) => level === 2)) {
              console.log("you can increase your level--", childLevels);

              if (direction === "left") {
                let leftDirectionUserId = leftDirectionUser.userId;

                let mychildID = Users.mychild + 1;
                let mychildId = await user.findOneAndUpdate(
                  { addedBy: Users.addedBy, direction: "left" },
                  { mychild: mychildID },
                  { new: true }
                );

                if (!data) {
                  let newUser = new user({
                    userId: userId,
                    name: name,
                    mobile: mobile,
                    email: email,
                    pass: bpass,
                    dateOfBirth: dateOfBirth,
                    gender: gender,
                    state: state,
                    address: address,
                    city: city,
                    addedBy: leftDirectionUserId,
                    wallet: final_amount,
                    mychild: 0,
                    direction: direction,
                  });

                  let savedUser = await newUser.save();

                  if (newUser) {
                    let allchild_member = await user.findOne({ userId: 1 });
                    let add_all_child = allchild_member.allchild + 1;
                    let updatechilds = await user.findOneAndUpdate(
                      { userId: 1 },
                      { allchild: add_all_child }
                    );

                    let User_level = Users.level + 1;
                    let level_detail = await user.findOneAndUpdate(
                      { addedBy: Users.addedBy, direction: "left" },
                      { level: User_level }
                    );

                    while (i > 0) {
                      console.log("i" + i);

                      t0 = t1 * 0.25; //62.5
                      t2 = t1 * 0.75; //187

                      let data1 = await user.findOne({ addedBy: i });
                      console.log("mera" + i + "--" + data1);
                      var test = parseFloat(data1.wallet) + t2;
                      let data3 = await user.findOneAndUpdate(
                        { addedBy: i },
                        { wallet: test }
                      );
                      console.log("data3" + data3);

                      t1 = t0;
                      console.log("t1" + t1);
                      i--;
                    }
                    let data1 = await user.findOne({ addedBy: 0 });
                    var test = parseFloat(data1.wallet) + t1;
                    let data3 = await user.findOneAndUpdate(
                      { addedBy: 0 },
                      { wallet: test }
                    );

                    let message_type = "Debited";
                    let reason_message = "Money Added";

                    let newTransaction = new Transaction({
                      amount: final_amount,
                      type: message_type,
                      reason: reason_message,
                      User_Id: Users.userId,
                    });

                    let transaction = await newTransaction.save();
                    let message_types = "Debited";
                    let reason_messages = "Refer Bonus";

                    let newTransactions = new Transaction({
                      amount: bonus_amount,
                      type: message_types,
                      reason: reason_messages,
                      User_Id: Users.userId,
                    });

                    let transactions = await newTransactions.save();
                    return {
                      message: "User added",
                      data: savedUser,
                      success: true,
                      status: 200,
                    };
                  } else {
                    return {
                      status: 500,
                      success: false,
                      message: "User already exists",
                    };
                  }
                } else {
                  console.log("User found");
                  return {
                    status: 500,
                    success: false,
                    message: "User already exists",
                  };
                }
              } else if (direction === "right") {
                let rightDirectionUserId = rightDirectionUser.userId;

                let mychildID = Users.mychild + 1;
                let mychildId = await user.findOneAndUpdate(
                  { addedBy: Users.addedBy, direction: "right" },
                  { mychild: mychildID },
                  { new: true }
                );

                if (!data) {
                  let newUser = new user({
                    userId: userId,
                    name: name,
                    mobile: mobile,
                    email: email,
                    pass: bpass,
                    dateOfBirth: dateOfBirth,
                    gender: gender,
                    state: state,
                    address: address,
                    city: city,
                    addedBy: rightDirectionUserId,
                    wallet: final_amount,
                    mychild: 0,
                    direction: direction,
                  });

                  let savedUser = await newUser.save();

                  if (newUser) {
                    let allchild_member = await user.findOne({ userId: 1 });
                    let add_all_child = allchild_member.allchild + 1;
                    let updatechilds = await user.findOneAndUpdate(
                      { userId: 1 },
                      { allchild: add_all_child }
                    );

                    let User_level = Users.level + 1;
                    let level_detail = await user.findOneAndUpdate(
                      { addedBy: Users.addedBy, direction: "right" },
                      { level: User_level }
                    );

                    while (i > 0) {
                      console.log("i" + i);

                      t0 = t1 * 0.25; //62.5
                      t2 = t1 * 0.75; //187

                      let data1 = await user.findOne({ addedBy: i });
                      console.log("mera" + i + "--" + data1);
                      var test = parseFloat(data1.wallet) + t2;
                      let data3 = await user.findOneAndUpdate(
                        { addedBy: i },
                        { wallet: test }
                      );
                      console.log("data3" + data3);

                      t1 = t0;
                      console.log("t1" + t1);
                      i--;
                    }
                    let data1 = await user.findOne({ addedBy: 0 });
                    var test = parseFloat(data1.wallet) + t1;
                    let data3 = await user.findOneAndUpdate(
                      { addedBy: 0 },
                      { wallet: test }
                    );

                    let message_type = "Debited";
                    let reason_message = "Money Added";

                    let newTransaction = new Transaction({
                      amount: final_amount,
                      type: message_type,
                      reason: reason_message,
                      User_Id: Users.userId,
                    });

                    let transaction = await newTransaction.save();
                    let message_types = "Debited";
                    let reason_messages = "Refer Bonus";

                    let newTransactions = new Transaction({
                      amount: bonus_amount,
                      type: message_types,
                      reason: reason_messages,
                      User_Id: Users.userId,
                    });

                    let transactions = await newTransactions.save();
                    return {
                      message: "User added",
                      data: savedUser,
                      success: true,
                      status: 200,
                    };
                  } else {
                    return {
                      status: 500,
                      success: false,
                      message: "User already exists",
                    };
                  }
                } else {
                  console.log("User found");
                  return {
                    status: 500,
                    success: false,
                    message: "User already exists",
                  };
                }
              } else {
                let mychildID = Users.mychild + 1;
                let mychildId = await user.findOneAndUpdate(
                  { auth_key: token },
                  { mychild: mychildID },
                  { new: true }
                );

                if (!data) {
                  let newUser = new user({
                    userId: userId,
                    name: name,
                    mobile: mobile,
                    email: email,
                    pass: bpass,
                    dateOfBirth: dateOfBirth,
                    gender: gender,
                    state: state,
                    address: address,
                    city: city,
                    addedBy: Users.userId,
                    wallet: final_amount,
                    mychild: 0,
                    direction: direction,
                  });

                  let savedUser = await newUser.save();

                  if (newUser) {
                    let allchild_member = await user.findOne({ userId: 1 });
                    let add_all_child = allchild_member.allchild + 1;
                    let updatechilds = await user.findOneAndUpdate(
                      { userId: 1 },
                      { allchild: add_all_child }
                    );

                    let User_level = Users.level + 1;
                    let level_detail = await user.findOneAndUpdate(
                      { auth_key: token },
                      { level: User_level }
                    );

                    while (i > 0) {
                      console.log("i" + i);

                      t0 = t1 * 0.25; //62.5
                      t2 = t1 * 0.75; //187

                      let data1 = await user.findOne({ addedBy: i });
                      console.log("mera" + i + "--" + data1);
                      var test = parseFloat(data1.wallet) + t2;
                      let data3 = await user.findOneAndUpdate(
                        { addedBy: i },
                        { wallet: test }
                      );
                      console.log("data3" + data3);

                      t1 = t0;
                      console.log("t1" + t1);
                      i--;
                    }
                    let data1 = await user.findOne({ addedBy: 0 });
                    var test = parseFloat(data1.wallet) + t1;
                    let data3 = await user.findOneAndUpdate(
                      { addedBy: 0 },
                      { wallet: test }
                    );

                    let message_type = "Debited";
                    let reason_message = "Money Added";

                    let newTransaction = new Transaction({
                      amount: final_amount,
                      type: message_type,
                      reason: reason_message,
                      User_Id: Users.userId,
                    });

                    let transaction = await newTransaction.save();
                    let message_types = "Debited";
                    let reason_messages = "Refer Bonus";

                    let newTransactions = new Transaction({
                      amount: bonus_amount,
                      type: message_types,
                      reason: reason_messages,
                      User_Id: Users.userId,
                    });

                    let transactions = await newTransactions.save();
                    return {
                      message: "User added",
                      data: savedUser,
                      success: true,
                      status: 200,
                    };
                  } else {
                    return {
                      status: 500,
                      success: false,
                      message: "User already exists",
                    };
                  }
                } else {
                  console.log("User found");
                  return {
                    status: 500,
                    success: false,
                    message: "User already exists",
                  };
                }
              }
            } else {
              return {
                status: 500,
                success: false,
                message: "Your child can't complete level-2",
              };
            }
          } else if (direction === "left") {
            let leftDirectionUserId = leftDirectionUser.userId;

            let mychildID = Users.mychild + 1;
            let mychildId = await user.findOneAndUpdate(
              { addedBy: Users.addedBy, direction: "left" },
              { mychild: mychildID },
              { new: true }
            );

            if (!data) {
              let newUser = new user({
                userId: userId,
                name: name,
                mobile: mobile,
                email: email,
                pass: bpass,
                dateOfBirth: dateOfBirth,
                gender: gender,
                state: state,
                address: address,
                city: city,
                addedBy: leftDirectionUserId,
                wallet: final_amount,
                mychild: 0,
                direction: direction,
              });

              let savedUser = await newUser.save();

              if (newUser) {
                let allchild_member = await user.findOne({ userId: 1 });
                let add_all_child = allchild_member.allchild + 1;
                let updatechilds = await user.findOneAndUpdate(
                  { userId: 1 },
                  { allchild: add_all_child }
                );

                let User_level = Users.level + 1;
                let level_detail = await user.findOneAndUpdate(
                  { addedBy: Users.addedBy, direction: "left" },
                  { level: User_level }
                );

                while (i > 0) {
                  console.log("i" + i);

                  t0 = t1 * 0.25; //62.5
                  t2 = t1 * 0.75; //187

                  let data1 = await user.findOne({ addedBy: i });
                  console.log("mera" + i + "--" + data1);
                  var test = parseFloat(data1.wallet) + t2;
                  let data3 = await user.findOneAndUpdate(
                    { addedBy: i },
                    { wallet: test }
                  );
                  console.log("data3" + data3);

                  t1 = t0;
                  console.log("t1" + t1);
                  i--;
                }
                let data1 = await user.findOne({ addedBy: 0 });
                var test = parseFloat(data1.wallet) + t1;
                let data3 = await user.findOneAndUpdate(
                  { addedBy: 0 },
                  { wallet: test }
                );

                let message_type = "Debited";
                let reason_message = "Money Added";

                let newTransaction = new Transaction({
                  amount: final_amount,
                  type: message_type,
                  reason: reason_message,
                  User_Id: Users.userId,
                });

                let transaction = await newTransaction.save();
                let message_types = "Debited";
                let reason_messages = "Refer Bonus";

                let newTransactions = new Transaction({
                  amount: bonus_amount,
                  type: message_types,
                  reason: reason_messages,
                  User_Id: Users.userId,
                });

                let transactions = await newTransactions.save();
                return {
                  message: "User added",
                  data: savedUser,
                  success: true,
                  status: 200,
                };
              } else {
                return {
                  status: 500,
                  success: false,
                  message: "User already exists",
                };
              }
            } else {
              console.log("User found");
              return {
                status: 500,
                success: false,
                message: "User already exists",
              };
            }
          } else if (direction === "right") {
            let rightDirectionUserId = rightDirectionUser.userId;

            let mychildID = Users.mychild + 1;
            let mychildId = await user.findOneAndUpdate(
              { addedBy: Users.addedBy, direction: "right" },
              { mychild: mychildID },
              { new: true }
            );

            if (!data) {
              let newUser = new user({
                userId: userId,
                name: name,
                mobile: mobile,
                email: email,
                pass: bpass,
                dateOfBirth: dateOfBirth,
                gender: gender,
                state: state,
                address: address,
                city: city,
                addedBy: rightDirectionUserId,
                wallet: final_amount,
                mychild: 0,
                direction: direction,
              });

              let savedUser = await newUser.save();

              if (newUser) {
                let allchild_member = await user.findOne({ userId: 1 });
                let add_all_child = allchild_member.allchild + 1;
                let updatechilds = await user.findOneAndUpdate(
                  { userId: 1 },
                  { allchild: add_all_child }
                );

                let User_level = Users.level + 1;
                let level_detail = await user.findOneAndUpdate(
                  { addedBy: Users.addedBy, direction: "right" },
                  { level: User_level }
                );

                while (i > 0) {
                  console.log("i" + i);

                  t0 = t1 * 0.25; //62.5
                  t2 = t1 * 0.75; //187

                  let data1 = await user.findOne({ addedBy: i });
                  console.log("mera" + i + "--" + data1);
                  var test = parseFloat(data1.wallet) + t2;
                  let data3 = await user.findOneAndUpdate(
                    { addedBy: i },
                    { wallet: test }
                  );
                  console.log("data3" + data3);

                  t1 = t0;
                  console.log("t1" + t1);
                  i--;
                }
                let data1 = await user.findOne({ addedBy: 0 });
                var test = parseFloat(data1.wallet) + t1;
                let data3 = await user.findOneAndUpdate(
                  { addedBy: 0 },
                  { wallet: test }
                );

                let message_type = "Debited";
                let reason_message = "Money Added";

                let newTransaction = new Transaction({
                  amount: final_amount,
                  type: message_type,
                  reason: reason_message,
                  User_Id: Users.userId,
                });

                let transaction = await newTransaction.save();
                let message_types = "Debited";
                let reason_messages = "Refer Bonus";

                let newTransactions = new Transaction({
                  amount: bonus_amount,
                  type: message_types,
                  reason: reason_messages,
                  User_Id: Users.userId,
                });

                let transactions = await newTransactions.save();
                return {
                  message: "User added",
                  data: savedUser,
                  success: true,
                  status: 200,
                };
              } else {
                return {
                  status: 500,
                  success: false,
                  message: "User already exists",
                };
              }
            } else {
              console.log("User found");
              return {
                status: 500,
                success: false,
                message: "User already exists",
              };
            }
          } else {
            // let rightDirectionUserId = rightDirectionUser.userId;

            let mychildID = Users.mychild + 1;
            let mychildId = await user.findOneAndUpdate(
              { auth_key: token },
              { mychild: mychildID },
              { new: true }
            );

            if (!data) {
              let newUser = new user({
                userId: userId,
                name: name,
                mobile: mobile,
                email: email,
                pass: bpass,
                dateOfBirth: dateOfBirth,
                gender: gender,
                state: state,
                address: address,
                city: city,
                addedBy: Users.userId,
                wallet: final_amount,
                mychild: 0,
                direction: direction,
              });

              let savedUser = await newUser.save();

              if (newUser) {
                let allchild_member = await user.findOne({ userId: 1 });
                let add_all_child = allchild_member.allchild + 1;
                let updatechilds = await user.findOneAndUpdate(
                  { userId: 1 },
                  { allchild: add_all_child }
                );

                let User_level = Users.level + 1;
                let level_detail = await user.findOneAndUpdate(
                  { auth_key: token },
                  { level: User_level }
                );

                while (i > 0) {
                  console.log("i" + i);

                  t0 = t1 * 0.25; //62.5
                  t2 = t1 * 0.75; //187

                  let data1 = await user.findOne({ addedBy: i });
                  console.log("mera" + i + "--" + data1);
                  var test = parseFloat(data1.wallet) + t2;
                  let data3 = await user.findOneAndUpdate(
                    { addedBy: i },
                    { wallet: test }
                  );
                  console.log("data3" + data3);

                  t1 = t0;
                  console.log("t1" + t1);
                  i--;
                }
                let data1 = await user.findOne({ addedBy: 0 });
                var test = parseFloat(data1.wallet) + t1;
                let data3 = await user.findOneAndUpdate(
                  { addedBy: 0 },
                  { wallet: test }
                );

                let message_type = "Debited";
                let reason_message = "Money Added";

                let newTransaction = new Transaction({
                  amount: final_amount,
                  type: message_type,
                  reason: reason_message,
                  User_Id: Users.userId,
                });

                let transaction = await newTransaction.save();
                let message_types = "Debited";
                let reason_messages = "Refer Bonus";

                let newTransactions = new Transaction({
                  amount: bonus_amount,
                  type: message_types,
                  reason: reason_messages,
                  User_Id: Users.userId,
                });

                let transactions = await newTransactions.save();
                return {
                  message: "User added",
                  data: savedUser,
                  success: true,
                  status: 200,
                };
              } else {
                return {
                  status: 500,
                  success: false,
                  message: "User already exists",
                };
              }
            } else {
              console.log("User found");
              return {
                status: 500,
                success: false,
                message: "User already exists",
              };
            }
          }
        } else {
          // Handle the case when the condition is not met
          return {
            status: 500,
            success: false,
            message: "Level of right direction user's child is not 2",
          };
        }
      }
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to save User try catch error",
      data: [],
      success: false,
      status: 500,
    };
  }
};
