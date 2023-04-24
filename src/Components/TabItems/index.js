import './index.css'

const TabItems = props => {
  const {details, tabChange, activeTab} = props
  const {tabId, displayText} = details
  const tabClick = () => {
    tabChange(tabId)
  }
  const tabClass = activeTab === tabId ? 'activeTab' : 'normalTab'
  return (
    <li className="tabElement">
      <button onClick={tabClick} className={tabClass} type="button">
        {displayText}
      </button>
    </li>
  )
}

export default TabItems
