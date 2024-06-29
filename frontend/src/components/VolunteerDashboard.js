import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/VolunteerDashboard.css";

export default function VolunteerActiveRequests() {
  const [transactions, setTransactions] = useState([]);
  const [logs, setLogs] = useState([]);
  const [location, setLocation] = useState({
    lat: 0,
    long: 0,
  });

  useEffect(() => {
    getTransactions();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    }
  }, []);

  const getTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/volunteer");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  function distancecalculator(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295; // Math.PI / 180
    const toRadians = (x) => (x * Math.PI) / 180;
    const R = 6371; // Radius of the earth in km
    const dlat = toRadians(lat2 - lat1);
    const dlon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dlat / 2) * Math.sin(dlat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dlon / 2) *
        Math.sin(dlon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  function filterTransactions(maxDistance) {
    let templist = [];
    transactions.forEach((element) => {
      const d1 = distancecalculator(
        location.lat,
        location.long,
        element.dloc.lat,
        element.dloc.long
      );
      const d2 = distancecalculator(
        location.lat,
        location.long,
        element.rloc.lat,
        element.rloc.long
      );
      if (d1 <= maxDistance || d2 <= maxDistance) {
        templist.push(element);
      }
    });
    setTransactions(templist);
  }

  function fivekmrange() {
    filterTransactions(5);
  }

  function tenkmrange() {
    filterTransactions(10);
  }

  function cityrange() {
    filterTransactions(15);
  }

  function others() {
    let templist = [];
    transactions.forEach((element) => {
      const d1 = distancecalculator(
        location.lat,
        location.long,
        element.dloc.lat,
        element.dloc.long
      );
      const d2 = distancecalculator(
        location.lat,
        location.long,
        element.rloc.lat,
        element.rloc.long
      );
      if (d1 > 15 || d2 > 15) {
        templist.push(element);
      }
    });
    setTransactions(templist);
  }

  function setstatus(transaction, status) {
    transaction.status = status;
    setLogs([...logs]);
  }

  const LogBox = ({ log }) => {
    log.status = "Taken Up";
    return (
      <div className="VolunteerDashboardCss.logbox">
        <div className="VolunteerDashboardCss.log-details">
          <p className="donorname">Donor Name : {log.donorName}</p>
          <p className="receivername">Receiver Name : {log.receiverName}</p>
          <p className="donationid">Transaction ID : {log.donationId}</p>
          <p className="logstatus">Status : {log.status}</p>
        </div>
        <div className="log-updation-buttons">
          <button className="unmet" onClick={() => setstatus(log, "Unmet")}>
            Unmet
          </button>
          <button className="donebutton" onClick={() => setstatus(log, "Done")}>
            Done
          </button>
        </div>
      </div>
    );
  };

  async function addtologs(transactions, transaction) {
    let templist = transactions.filter((x) => x._id !== transaction._id);
    setstatus(transaction, "active");
    setTransactions([...templist, transaction]);
    await axios.post("http://localhost:3001/api/volunteer", transactions);
  }

  return (
    <div className="volunteer-container">
      <div className="volunteering-heading">VOLUNTEER</div>
      <div className="VolunteerActiveRequests bg-primary">
        <div className="filtertab">
          <button className="5kmrange" onClick={fivekmrange}>
            5KM
          </button>
          <button className="10kmrange" onClick={tenkmrange}>
            10KM
          </button>
          <button className="cityrange" onClick={cityrange}>
            City
          </button>
          <button className="others" onClick={others}>
            Others
          </button>
        </div>
        <div className="requests-container">
          <div className="requeststab">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div key={transaction._id} className="request-container">
                  <div className="request-details">
                    <p className="donorname">{transaction.donorName}</p>
                    <p className="receivername">{transaction.dloc.address}</p>
                    <p className="receivername">{transaction.receiverName}</p>
                    <p className="receivername">{transaction.rloc.address}</p>
                    <p className="donationid">{transaction.donationId}</p>
                  </div>
                  <button
                    className="takeuprequest-button"
                    onClick={() => addtologs(transactions, transaction)}
                  >
                    Take Up
                  </button>
                </div>
              ))
            ) : (
              <p>No transactions available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
