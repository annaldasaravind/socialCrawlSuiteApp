import React from 'react'
import PropTypes from 'prop-types'

function Number1({ messages, image, type }) {
  const uniqueMessageBodies = new Set()

  // // Filter unique messages based on message body
  const uniqueMessages = messages.filter(message => {
    if (!uniqueMessageBodies.has(message.body)) {
      uniqueMessageBodies.add(message.body)
      return true
    }
    return false
  })

  // Sort unique messages by sent_date in descending order
  const sortedMessages = uniqueMessages
    .slice()
    .sort((a, b) => new Date(a.sent_date) - new Date(b.sent_date))

  // Group messages by day
  const messagesByDay = {}
  sortedMessages.forEach(message => {
    const day = new Date(message.sent_date).toLocaleDateString()
    if (!messagesByDay[day]) {
      messagesByDay[day] = []
    }
    messagesByDay[day].push(message)
  })

  return (
    <>
      {type === 'whatsapp' ? (
        <div style={{ display: 'none' }} />
      ) : (
        <div className="image_link">
          <a href={image} target="_blank" rel="noreferrer">
            click to view the post...
          </a>
        </div>
      )}

      {Object.entries(messagesByDay).map(([day, dayMessages]) => (
        <div key={day} className="day_heading">
          <div className="day_wise">{day}</div>
          {dayMessages.map(message => (
            <div
              key={message}
              className={`body_date ${message.key === 'send' ? 'sendColor' : 'receiveColor'}`}
            >
              <div
                className={`text1 ${message.key === 'send' ? 'text_sendColor' : 'text_receiveColor'}`}
              >
                <div className={`body ${message.key === 'send' ? 'sendColor' : 'receiveColor'}`}>
                  {message.body}
                </div>
                <div className={`date ${message.key === 'send' ? 'sendDate' : 'receiveDate'}`}>
                  {new Date(message.sent_date).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

Number1.propTypes = {
  // messages: PropTypes.array.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default Number1
