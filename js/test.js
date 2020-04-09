var firebaseConfig = {
  apiKey: "AIzaSyAFWDNvUKbXJR5fUgMspyQFUHC67aDUSaw",
  authDomain: "delivery-528c3.firebaseapp.com",
  databaseURL: "https://delivery-528c3.firebaseio.com",
  projectId: "delivery-528c3",
  storageBucket: "delivery-528c3.appspot.com",
  messagingSenderId: "399514464364",
  appId: "1:399514464364:web:10c59339d9be2a5d912849",
  measurementId: "G-1594WX62C0",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const dbRefObject = firebase.database().ref().child("orders/"); // + "OVZqH7sLC9NSnnPx0s8kLc3POrV2");
var dbRefObjectWithUserId;
var userId;
var orderId;
let jsonData;
dbRefObject
  .once("value")
  .then((snap) => {
    //console.log(JSON.stringify(snap));
    let data = JSON.stringify(snap);
    jsonData = JSON.parse(data);
    // console.log(data);
    // console.log(jsonData.OVZqH7sLC9NSnnPx0s8kLc3POrV2);
    userId = Object.keys(jsonData);
    console.log(userId[0]);
    console.log(userId[1]);
    console.log(userId.length);
    return userId;
    // snap.forEach((mealId, mealData) => {
    //   console.log(mealId);
    //   console.log(mealData);
    // });
  })
  .then((result) => {
    for (var l = 0; l < result.length; l++) {
      dbRefObjectWithUserId = firebase
        .database()
        .ref()
        .child("orders/" + result[l]);

      dbRefObjectWithUserId.once("value").then((snap) => {
        let data = JSON.stringify(snap);
        jsonData = JSON.parse(data);
        const entries = Object.entries(jsonData);

        var orderTitle = [];
        var orderQuantity = [];

        for (var i = 0; i < entries.length; i++) {
          var orderId = document.createElement("TD");
          var dateTime = document.createElement("TD");
          var orderDetails = document.createElement("TD");
          var paymentType = document.createElement("TD");
          var orderNote = document.createElement("TD");
          var totalAmount = document.createElement("TD");
          var userId = document.createElement("TD");

          var text1 = document.createTextNode(entries[i][0]);
          var dateTimeText = document.createTextNode(entries[i][1]["dateTime"]);

          var orderDetailsText;

          console.log(Object.entries(entries[i][1]["products"])[0]);

          // prodArray = Object.entries(entries[i][1]["products"]);
          // console.log(prodArray);
          for (
            var j = 0;
            j < Object.entries(entries[i][1]["products"]).length;
            j++
          ) {
            orderTitle.push(
              Object.entries(entries[i][1]["products"])[j][1]["title"]
            );
            orderQuantity.push(
              Object.entries(entries[i][1]["products"])[j][1]["quantity"]
            );
            console.log(orderTitle);
            console.log(orderQuantity);
          }

          for (var k = 0; k < orderTitle.length; k++) {
            orderDetailsText = document.createTextNode(
              k +
                1 +
                ".Order: Title: " +
                orderTitle[k] +
                ", times: " +
                orderQuantity[k] +
                "\n"
            );
            orderDetails.appendChild(orderDetailsText);
          }

          orderTitle = [];
          orderQuantity = [];

          var paymentTypeText = document.createTextNode(
            entries[i][1]["paymentType"]
          );
          var orderNoteText = document.createTextNode(
            entries[i][1]["orderNote"]
          );
          var totalAmountText = document.createTextNode(
            entries[i][1]["totalAmount"]
          );

          dateTime.appendChild(dateTimeText);
          orderId.appendChild(text1);

          paymentType.appendChild(paymentTypeText);
          orderNote.appendChild(orderNoteText);
          totalAmount.appendChild(totalAmountText);

          var newLine = document.createElement("TR");
          newLine.appendChild(orderId);
          newLine.appendChild(dateTime);
          newLine.appendChild(orderDetails);
          newLine.appendChild(paymentType);
          newLine.appendChild(orderNote);
          newLine.appendChild(totalAmount);
          var mainTable = document.getElementById("mainTable");
          mainTable.appendChild(newLine);
          console.log("looped");
        }

        //document.getElementById("userID").appendChild(para);

        // orderId = Object.keys(jsonData);
        // var orderData = Object.values(jsonData);
        // console.log(orderId);
        // console.log(orderData[0]["dateTime"]);
      });
    }
  });

/*dbRefObject.once("value").then((snap) => {
  snap.val().forEach((mealId, mealData) => {
    console.log(mealId);
  });
});*/

// response.forEach((orderId, orderData) => {
//   console.log(orderId);
//   console.log(orderData["orderNote"]);
// });
