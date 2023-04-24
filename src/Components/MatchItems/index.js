import './index.css'

const MatchItems = props => {
  const {details, checkMatching, randomObj} = props
  const {id, thumbnailUrl} = details
  const randomId = randomObj.id
  const imageClicked = () => {
    checkMatching(id, randomId)
  }
  return (
    <li className="imagesElement">
      <button onClick={imageClicked} className="imageBtn" type="button">
        <img src={thumbnailUrl} className="thumbNail" alt="thumbnail" />
      </button>
    </li>
  )
}

export default MatchItems
