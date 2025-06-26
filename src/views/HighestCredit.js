import React, { useEffect, useState, useContext } from "react";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import Header from "../container/Header";
import { db } from "../firebase";
import numeral from "numeral";
import { AuthContext } from "../Auth";

function HighestCredit() {
  const { currentUser } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [highCredit, setHighCredit] = useState(0);

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
      if (his.data.category === 2 && highCredit < parseInt(his.data.amount)) {
        setHighCredit(his.data.amount);
      }
    });
  }, [history, highCredit]);

  return (
    <>
      <Header name={"Highest Credit"} arrowBack={true} />
      <div
        style={{ height: "91vh", width: "100vw" }}
        className="d-flex align-items-center"
      >
        <div className="container my-auto mx-auto text-center">
          <div>
            <h1>Huffttt !!!</h1>
            <MoodBadIcon style={{ color: "#f75948", fontSize: "30vw" }} />
            <h2 className="mb-0" style={{ color: "#f75948" }}>
              {numeral(highCredit).format("0,0")}
            </h2>
            <small>
              <i>Highest Credit</i>
            </small>
            <p className="mt-5" style={{ fontSize: 26, fontWeight: "bold" }}>
              Don't lose hope, Fighting
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HighestCredit;
