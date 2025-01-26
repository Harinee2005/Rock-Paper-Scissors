import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import './index.css'

const testIdMap = {
  ROCK: 'rockButton',
  PAPER: 'paperButton',
  SCISSORS: 'scissorsButton',
}

class GameView extends Component {
  state = {
    score: 0,
    userChoice: '',
    systemChoice: '',
    resultView: false,
    result: '',
  }

  onGame = id => {
    const {details} = this.props
    const randNo = Math.floor(Math.random() * 3)
    const systemChoice = details[randNo].id
    let resultNow
    let scoreNow

    if (id === systemChoice) {
      resultNow = 'IT IS DRAW'
      scoreNow = 0
    } else if (id === 'PAPER' && systemChoice === 'ROCK') {
      resultNow = 'YOU WON'
      scoreNow = 1
    } else if (id === 'SCISSORS' && systemChoice === 'PAPER') {
      resultNow = 'YOU WON'
      scoreNow = 1
    } else if (id === 'ROCK' && systemChoice === 'SCISSORS') {
      resultNow = 'YOU WON'
      scoreNow = 1
    } else {
      resultNow = 'YOU LOSE'
      scoreNow = -1
    }

    this.setState(prevState => ({
      userChoice: id,
      systemChoice,
      result: resultNow,
      score: prevState.score + scoreNow,
      resultView: true,
    }))
  }

  onPlayAgain = () => {
    this.setState({resultView: false})
  }

  render() {
    const {score, resultView, userChoice, systemChoice, result} = this.state
    const {details} = this.props
    const userChoiceData = details.filter(
      eachData => eachData.id === userChoice,
    )
    const userChoiceImg = userChoiceData[0]?.imageUrl
    const sysChoiceData = details.filter(
      eachData => eachData.id === systemChoice,
    )
    const sysChoiceImg = sysChoiceData[0]?.imageUrl

    return (
      <div className="game-container">
        <div className="details-container">
          <div>
            <h1 className="heading">
              Rock <br />
              Paper <br /> Scissors
            </h1>
          </div>
          <div className="score-container">
            <p className="score">Score</p>
            <p className="score-count-num">{score}</p>
          </div>
        </div>
        {resultView ? (
          <div className="result-main">
            <div className="result-container">
              <div className="each-choice">
                <h1 className="who">YOU</h1>
                <img
                  src={userChoiceImg}
                  alt="your choice"
                  className="image-size"
                />
              </div>
              <div className="each-choice">
                <h1 className="who">OPPONENT</h1>
                <img
                  src={sysChoiceImg}
                  alt="opponent choice"
                  className="image-size"
                />
              </div>
            </div>
            <p className="result">{result}</p>
            <button
              onClick={this.onPlayAgain}
              className="play-again-btn"
              type="button"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            <div className="image-container">
              {details.map(eachThing => (
                <button
                  onClick={() => this.onGame(eachThing.id)}
                  className="type-btn"
                  type="button"
                  key={eachThing.id}
                  data-testid={testIdMap[eachThing.id]}
                >
                  <img
                    src={eachThing.imageUrl}
                    alt={eachThing.id}
                    className="image-size"
                  />
                </button>
              ))}
            </div>
          </>
        )}
        <Popup
          modal
          trigger={
            <button className="rules-btn" type="button">
              RULES
            </button>
          }
        >
          {close => (
            <div className="modal-container">
              <button
                className="type-btn close-btn"
                type="button"
                onClick={() => close()}
              >
                <RiCloseLine />
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
                className="rules-img"
              />
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default GameView
