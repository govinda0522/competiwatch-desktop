import React, { Component } from 'react'
import SettingsForm from './SettingsForm'

class SettingsPage extends Component {
  returnToAccounts = event => {
    event.target.blur()
    this.props.onPageChange('accounts')
  }

  render() {
    const { db } = this.props

    return (
      <div className="container layout-children-container">
        <div className="mt-4">
          <button
            type="button"
            onClick={this.returnToAccounts}
            className="btn-link"
          >&larr; Back to your accounts</button>
        </div>
        <h1
          className="h1 mb-2 mt-4"
        >Settings</h1>
        <SettingsForm
          db={db}
        />
      </div>
    )
  }
}

export default SettingsPage
