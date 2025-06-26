import React, { useState, useContext, useEffect } from "react";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import DescriptionIcon from "@material-ui/icons/Description";
import ClassIcon from "@material-ui/icons/Class";
import Header from "../container/Header";
import { db } from "../firebase";
import firebase from "firebase";
import { AuthContext } from "../Auth";
import numeral from "numeral";

function Credit() {
  const { currentUser } = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    db.collection("transactions")
      .where("user", "==", currentUser.uid)
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        setHistory(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, [currentUser.uid]);

  useEffect(() => {
    let countBalance = 0;
    history.forEach((his) => {
      if (his.data.category === 1) {
        countBalance += parseInt(his.data.amount);
      } else {
        countBalance -= parseInt(his.data.amount);
      }
    });
    setBalance(countBalance);
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("transactions")
      .add({
        user: currentUser.uid,
        category: 2,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        amount: amount,
        description: description,
      })
      .catch((err) => console.log(err));

    setAmount("");
    setDescription("");
  };

  return (
    <>
      <Header name={"Credit"} arrowBack={true} />
      <div className="container py-4">
        <h5 style={{ fontWeight: "bold" }}>Current</h5>
        <hr />
        <div className="card" style={{ borderRadius: 15 }}>
          <div className="card-body py-2" style={{ borderRadius: 15 }}>
            <div className="d-flex align-items-center">
              <AccountBalanceWalletIcon
                style={{ fontSize: 35, color: "#5089C6" }}
              />
              <div className="d-flex flex-column ml-2">
                <span style={{ fontSize: 14, fontWeight: "bold" }}>
                  My Balance
                </span>
                <span style={{ fontSize: 12 }}>
                  Rp {numeral(balance).format("0,0")}{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-top">
        <div className="container py-4">
          <h5 style={{ fontWeight: "bold" }}>Make some credit</h5>
          <small>
            <i>This action will decrease your balance</i>
          </small>
          <hr />
          <form onSubmit={handleSubmit}>
            <label style={{ fontSize: 14 }} htmlFor="category">
              Category
            </label>
            <div
              className="d-flex align-items-center border px-3 py-1 shadow mb-3"
              style={{ borderRadius: 20, backgroundColor: "whitesmoke" }}
            >
              <ClassIcon style={{ color: "#5089C6" }} />
              <input
                type="text"
                className="ml-2"
                placeholder="Enter category"
                value="Credit"
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: 12,
                  color: "grey",
                }}
                required
                disabled
              />
            </div>
            <label style={{ fontSize: 14 }} htmlFor="description">
              Description
            </label>
            <div
              className="d-flex align-items-center justify-content-between border px-3 py-1 shadow mb-3"
              style={{ borderRadius: 20 }}
            >
              <div className="d-flex align-items-center">
                <DescriptionIcon style={{ color: "#5089C6" }} />
                <input
                  type={"text"}
                  className="ml-2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: 12,
                    color: "grey",
                  }}
                  required
                />
              </div>
            </div>
            <label style={{ fontSize: 14 }} htmlFor="amount">
              Amount
            </label>
            <div
              className="d-flex align-items-center justify-content-between border px-3 py-1 shadow mb-3"
              style={{ borderRadius: 20 }}
            >
              <div className="d-flex align-items-center">
                <MonetizationOnIcon style={{ color: "#5089C6" }} />
                <input
                  type={"text"}
                  className="ml-2"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: 12,
                    color: "grey",
                  }}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn w-100 py-2 text-white"
              style={{
                borderRadius: 20,
                fontSize: 12,
                backgroundColor: "#5089C6",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Credit;
