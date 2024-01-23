import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Number1 from './components/Number1';
import './App.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/////
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
/////

function App() {
  const [myData, setMyData] = useState({ result: [] });
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [myDataResult, setMyDataResult] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [modal, setModal] = useState(false);
  // const [radioInput, setRadioInput] = useState('');
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState([]);
  // const [postData, setPostData] = useState({});
  const [isRotated, setRotated] = useState(false);

  // Reading Data
  const myFunction = async () => {
    try {
      const response = await axios.get('http://192.168.1.63:4000/send');
      setMyData(response.data);
      setFilteredResults(response.data.result);
      // Getting group of subject for whatsapp (or) instagram after selecting
      setOptions([...new Set(response.data.result.map((type) => type.type))]);
      if (response.data.result.length > 0) {
        setSelectedSubject(response.data.result[0].subject);
      }
    } catch (error) {
      console.error(
        'Error fetching data:',
        error.response || error.message || error
      );
    }
  };

  useEffect(() => {
    myFunction();
  }, []);

  // By clicking subject getting messages
  const onClickHandler = (subject, type, messages) => {
    setSelectedSubject(subject);
    setMyDataResult(type);
    // setOriginalLength(messages.length);
  };

  // Filtering the data based on subject like searching
  // selectedOption === '' means All
  // result.type === selectedOption means whatsapp or instagram
  const onSelectOptionInDropDown = (e) => {
    setSelectedOption(e.target.value);
    const filteredResults = myData.result.filter(
      (result) => e.target.value === '' || result.type === e.target.value
    );
    setFilteredResults(filteredResults);
  };

  // Refreshing the content
  const onRefresh = () => {
    window.location.reload();
    setRotated(!isRotated);
  };

  // Sending an message through pop-up
  const onSendMessageOpen = async () => {
    setModal(!modal);
  };

  // Closing the pop-up of sending a message
  const onSendMessageClose = () => {
    setModal(!modal);
    // setRadioInput('');
    setMessage('');
  };

  // Submitting the form in pop-up
  const onSubmitSendMessage = async (e) => {
    try {
      const response = await axios.post(
        'http://192.168.1.63:4000/sendMessage',
        {
          from: '14155238886',
          to: selectedSubject,
          msg: message,
        }
      );
      if (response.status === 200) {
        toast.success('Message sent successfully!..', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: 'dark',
          transition: Bounce,
        });
      } else {
        toast.error('Message not sent', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: 'dark',
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log(error.messgae);
    }
    // if ((radioInput && message) === '') {
    if (message === '') {
      toast.error('Please fill all the fields', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: 'dark',
        transition: Bounce,
      });
    } else {
      e.preventDefault();
      // console.log('From:', radioInput);
      // console.log('Message:', message);
      // toast.success('Form submitted successfully!', {
      //   position: 'top-right',
      //   autoClose: 2000,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: 0,
      //   theme: 'dark',
      //   transition: Bounce,
      // });
      setModal(false);
      // setRadioInput('');
      setMessage('');
    }
  };

  // Radio button in pop-up
  // const onRadioButtonHandler = (e) => {
  //   setRadioInput(e.target.id);
  // };

  // Message in pop-up
  const onMessageHandler = (e) => {
    setMessage(e.target.value);
  };

  // Receiving messages
  const onReceiveMessages = async () => {
    // let selectedNumber = selectedSubject;
    try {
      const response = await axios.get(
        // `http://192.168.1.63:4000/receiveMessages/${selectedNumber}`
        `http://192.168.1.63:4000/receiveMessages`
      );
      if (response.status === 200) {
        toast.success('Message received successfully!..', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: 'dark',
          transition: Bounce,
        });
      } else {
        toast.error('Message not received', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: 'dark',
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error(
        'Error receiving data:',
        error.response || error.message || error
      );
    }
  };

  // Receiving data for whatsapp
  const onReceiveData = async () => {
    try {
      const response = await axios.get('http://192.168.1.63:4000/send');
      setMyData(response.data);
      toast.success('You got a new message..', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: 'dark',
        transition: Bounce,
      });
    } catch (error) {
      console.error(
        'Error receiving data:',
        error.response || error.message || error
      );
    }
  };

  // Receiving data for instagram
  const onLoadData = async () => {
    try {
      const response = await axios.get('http://192.168.1.63:4000/insta');
      console.log(response.status);
      if (response.status === 200) {
        toast.success('Comments received successfully!..', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: 'dark',
          transition: Bounce,
        });
      } else {
        toast.error('Comments not received', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: 'dark',
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error(
        'Error receiving data:',
        error.response || error.message || error
      );
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="navBar">
        <div className="title" title="Social-CrawlSuite">
          Social-CrawlSuite
        </div>
        <div
          className={`tRefresh ${isRotated ? 'rotate' : ''}`}
          title="Reload"
          onClick={onRefresh}
        >
          <FontAwesomeIcon icon={faArrowsRotate} />
        </div>
      </div>

      {/* Container contains whatsapp and instagram data */}
      <div className="container">
        {/* Searching Options... */}
        <div className="dropBox">
          <select
            id="dropDown"
            value={selectedOption}
            onChange={onSelectOptionInDropDown}
          >
            <option className="dropList" value="">
              All
            </option>
            {options.map((option, index) => (
              <option
                className="dropList"
                key={index}
                value={option}
                style={{ height: '60px' }}
              >
                {option}
              </option>
            ))}
          </select>
        </div>
        {/* Displaying whatsapp and instagram data after search */}
        <div className="container1">
          {Array.isArray(filteredResults) &&
            filteredResults.map((result) => (
              <div
                title={result.lead_no}
                key={result.subject}
                className={`whatsapp ${
                  selectedSubject === result.subject ? 'selected' : ''
                }`}
                onClick={() => {
                  onClickHandler(result.subject, result.type, result.messages);
                }}
              >
                <div style={{ display: 'flex' }}>
                  <div
                    className={`image ${
                      result.type === 'whatsapp' ? 'waImage' : 'igImage'
                    }`}
                  />
                  <div className="lead_subject">
                    <div className="leadNo">{result.lead_no}</div>
                    <div className="subjects">{result.subject}</div>
                  </div>
                </div>
                <div className="notif_arrow">
                  <div className="notification" title="Notification">
                    {result.messages.some((msg) => msg.flag) && (
                      <>
                        <FontAwesomeIcon icon={faBell} shake />
                        {console.log(result.messages.length)}
                      </>
                    )}
                  </div>
                  <div
                    className={`arrow ${
                      selectedSubject === result.subject
                        ? 'selected'
                        : 'notSelected'
                    }`}
                  >
                    &rarr;
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Pop-Up */}
      {modal && (
        <>
          <div className="overlay" onClick={onSendMessageClose}></div>
          <div className="pop">
            <form className="form" onSubmit={onSubmitSendMessage}>
              <div className="from">
                {/* <label htmlFor="from">From:</label>
                <label htmlFor="bot">
                  <input
                    type="radio"
                    id="bot"
                    name="From"
                    checked={radioInput === 'bot'}
                    onChange={onRadioButtonHandler}
                  />
                  bot
                </label>
                <label htmlFor="customer">
                  <input
                    type="radio"
                    id="customer"
                    name="From"
                    checked={radioInput === 'customer'}
                    onChange={onRadioButtonHandler}
                  />
                  customer
                </label> */}
                <div className="from_div">
                  <div>From: </div>
                  <div>14155238886</div>
                </div>
                <div className="to_div">
                  <div>To: </div>
                  <div>{selectedSubject}</div>
                </div>
              </div>
              <div className="message">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={onMessageHandler}
                />
              </div>
              <div className="btn">
                <div type="submit" onClick={onSubmitSendMessage}>
                  Submit
                </div>
                <div onClick={onSendMessageClose}>Close</div>
              </div>
            </form>
          </div>
        </>
      )}
      {/* URLs for Whatsapp */}
      {myDataResult === 'whatsapp' && (
        <>
          <div
            title="SendMessages"
            className="sendMessages"
            onClick={onSendMessageOpen}
            style={{ top: '90px' }}
          >
            SendMessages
          </div>
          <div
            title="ReceiveMessages"
            className="receiveMessages"
            onClick={onReceiveMessages}
            style={{ top: '130px' }}
          >
            ReceiveMessages
          </div>
          <div
            title="ReceiveData"
            className="receiveData"
            onClick={onReceiveData}
            style={{ top: '170px' }}
          >
            ReceiveData
          </div>
        </>
      )}
      {/* URLs for Instagram */}
      {myDataResult === 'instagram' && (
        <>
          <div title="LoadData" className="loadData" onClick={onLoadData}>
            LoadData
          </div>
          <div
            title="ReceiveData"
            className="receiveData"
            onClick={onReceiveData}
          >
            ReceiveData
          </div>
        </>
      )}
      {/* Getting messages based on selecting subject */}
      {selectedSubject && (
        <div className="messages">
          <div className="app">
            <Number1
              messages={
                myData.result.find(
                  (result) => result.subject === selectedSubject
                )?.messages || []
              }
              image={
                myData.result.find(
                  (result) => result.subject === selectedSubject
                )?.image || []
              }
              type={
                myData.result.find(
                  (result) => result.subject === selectedSubject
                )?.type || []
              }
            />
          </div>
        </div>
      )}
      {/* Toast */}
      <ToastContainer />
    </div>
  );
}

export default App;