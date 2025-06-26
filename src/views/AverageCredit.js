import React, { useEffect, useState, useContext } from "react";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import Header from "../container/Header";
import { db } from "../firebase";
import numeral from "numeral";
import { AuthContext } from "../Auth";

function AverageCredit() {
  const { currentUser } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [avgCredit, setAvgCredit] = useState(0);

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
    let totalCredit = 0;
    let countCredit = 0;
    history.forEach((his) => {
      if (his.data.category === 2) {
        totalCredit += parseInt(his.data.amount);
        countCredit += 1;
      }
    });
    setAvgCredit(totalCredit / countCredit);
  }, [history]);

  return (
    <>
      <Header name="Average Credit" arrowBack={true} />
      <div
        style={{ height: "91vh", width: "100vw" }}
        className="d-flex align-items-center"
      >
        <div className="container my-auto mx-auto text-center">
          <div>
            <h1>Huffttt !!!</h1>
            <MoodBadIcon style={{ color: "#FFAA4C", fontSize: "30vw" }} />
            <h2 className="mb-0" style={{ color: "#FFAA4C" }}>
              {numeral(avgCredit).format("0,0")}
            </h2>
            <small>
              <i>Average Credit</i>
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

export default AverageCredit;
