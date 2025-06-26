import React, { useEffect, useState, useContext } from "react";
import MoodIcon from "@material-ui/icons/Mood";
import Header from "../container/Header";
import { db } from "../firebase";
import numeral from "numeral";
import { AuthContext } from "../Auth";

function HighestDebit() {
  const { currentUser } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [highDebit, setHighDebit] = useState(0);

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
    history.forEach((his) => {
      if (his.data.category === 1 && highDebit < parseInt(his.data.amount)) {
        setHighDebit(his.data.amount);
      }
    });
  }, [history, highDebit]);

  return (
    <>
      <Header name={"Highest Debit"} arrowBack={true} />
      <div
        style={{ height: "91vh", width: "100vw" }}
        className="d-flex align-items-center"
      >
        <div className="container my-auto mx-auto text-center">
          <div>
            <h1>Congrats !!!</h1>
            <MoodIcon style={{ color: "#3bccaa", fontSize: "30vw" }} />
            <h2 className="mb-0" style={{ color: "#3bccaa" }}>
              {numeral(highDebit).format("0,0")}
            </h2>
            <small>
              <i>Highest Debit</i>
            </small>
            <p className="mt-5" style={{ fontSize: 26, fontWeight: "bold" }}>
              Good, Keep it up
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HighestDebit;
