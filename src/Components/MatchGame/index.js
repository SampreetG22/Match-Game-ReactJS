import {Component} from 'react'
import TabItems from '../TabItems'
import MatchItems from '../MatchItems'
import './index.css'

class MatchGame extends Component {
  state = {
    score: 0,
    activeTab: 'FRUIT',
    randomNumber: 0,
    timer: 60,
    isGameInProgress: true,
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tabChange = id => {
    this.setState({activeTab: id})
  }

  checkMatching = (imgId, randomId) => {
    const {imagesList} = this.props
    if (imgId === randomId) {
      const randomNum = Math.floor(Math.random() * imagesList.length)
      this.setState(prevstate => ({
        randomNumber: randomNum,
        score: prevstate.score + 1,
      }))
    } else {
      this.componentWillUnmount()
      this.setState({isGameInProgress: false})
    }
  }

  resetEverything = () => {
    this.setState({
      score: 0,
      activeTab: 'FRUIT',
      randomNumber: 0,
      timer: 60,
      isGameInProgress: true,
    })
    this.componentDidMount()
  }

  tick = () => {
    const {timer} = this.state
    if (timer > 0) {
      this.setState(prevstate => ({timer: prevstate.timer - 1}))
    } else {
      this.componentWillUnmount()
      this.setState({isGameInProgress: false})
    }
  }

  render() {
    const {activeTab, score, timer, randomNumber, isGameInProgress} = this.state
    const {tabsList, imagesList} = this.props
    const randomObj = imagesList[randomNumber]
    const filteredList = imagesList.filter(
      eachObj => eachObj.category === activeTab,
    )

    return (
      <div className="mainContainer">
        <ul className="navBar">
          <li className="navBarEls">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              className="matchGameImg"
              alt="website logo"
            />
          </li>

          <li className="navBarSubContainer navBarEls">
            <li className="navBarEls">
              <p className="scoreCSS">
                Score: <span className="spanCSS">{score}</span>
              </p>
            </li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              className="clockSymbol"
              alt="timer"
            />
            <p className="spanCSS">{timer} sec</p>
          </li>
        </ul>
        <div className="bgContainer">
          {isGameInProgress && (
            <>
              <img
                src={randomObj.imageUrl}
                className="selectedPic"
                alt="match"
              />
              <ul className="tabsList">
                {tabsList.map(eachTab => (
                  <TabItems
                    key={eachTab.tabId}
                    tabChange={this.tabChange}
                    details={eachTab}
                    activeTab={activeTab}
                  />
                ))}
              </ul>
              <ul className="imagesList">
                {filteredList.map(eachImage => (
                  <MatchItems
                    key={eachImage.id}
                    checkMatching={this.checkMatching}
                    details={eachImage}
                    randomObj={randomObj}
                  />
                ))}
              </ul>
            </>
          )}
          {!isGameInProgress && (
            <div className="scoreCardBg">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                className="selectedPic"
                alt="trophy"
              />
              <p className="yourScoreText">YOUR SCORE</p>
              <h1 className="score">{score}</h1>
              <button
                onClick={this.resetEverything}
                type="button"
                className="playAgainBtn"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  className="resetBtn"
                  alt="reset"
                />
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MatchGame
