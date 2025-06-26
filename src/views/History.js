import React, { useState, useEffect, useContext } from "react";
import Header from "../container/Header";
import { db } from "../firebase";
import numeral from "numeral";
import { AuthContext } from "../Auth";

function History() {
  const { currentUser } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [historyGrouped, setHistoryGrouped] = useState([]);
  const [listDate, setListDate] = useState([]);
  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  useEffect(() => {
    db.collection("transactions")
      .where("user", "==", currentUser.uid)
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        setListDate(
          snapshot.docs.map((doc) => {
            const date = new Date(doc.data().date.seconds * 1000).getDate();
            const month =
              new Date(doc.data().date.seconds * 1000).getMonth() + 1;
            const year = new Date(doc.data().date.seconds * 1000).getFullYear();
            const fullDate = date + "/" + month + "/" + year;
            return fullDate;
          })
        );
        setHistory(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });

    return () => {
      db.disableNetwork();
    };
  }, [currentUser.uid]);

  useEffect(() => {
    setHistoryGrouped(
      listDate.filter(onlyUnique).map((d) => ({
        date: d,
        data: history.filter((hist) => {
          const date = new Date(hist.data.date.seconds * 1000).getDate();
          const month = new Date(hist.data.date.seconds * 1000).getMonth() + 1;
          const year = new Date(hist.data.date.seconds * 1000).getFullYear();
          const fullDate = date + "/" + month + "/" + year;

          if (fullDate === d) {
            return {
              description: hist.data.description,
              category: hist.data.category,
              amount: hist.data.amount,
            };
          } else {
            return null;
          }
        }),
      }))
    );

    return () => {};
  }, [history, listDate]);

  return (
    <>
      <Header name={"History"} arrowBack={true} />
      {historyGrouped.map((data, i) => (
        <div key={i}>
          <div className="py-1" style={{ backgroundColor: "#e3e2e1" }}>
            <div className="container">{data.date}</div>
          </div>
          {data.data.map((data2, i2) => {
            return (
              <div className={"container py-3"} key={i2}>
                <span
                  style={{ fontWeight: "bold", fontSize: 14 }}
                  className="mb-3"
                >
                  {data2.data.description}
                </span>
                <div className="d-flex align-items-center justify-content-between">
                  <span style={{ fontSize: 14 }}>
                    {data2.data.category === 1 ? "Debit" : "Credit"}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: data2.data.category === 2 ? "#f75948" : "#3bccaa",
                    }}
                  >
                    {numeral(data2.data.amount).format("0,0")}
                  </span>
                </div>
                {data.data.length === i2 + 1 ? (
                  ""
                ) : (
                  <hr className="py-0 my-0" />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

export default History;
