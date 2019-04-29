import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'
import ProfileActions from './ProfileAction'
import Experience from './Experience'
import Education from './Education'

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getCurrentProfile()
  }

  onDeleteClick (e) {
    this.props.deleteAccount()
  }
  render () {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile
    let dashboardContent
    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      // Checks whether user has profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className='lead text-muted'>
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className='btn btn-danger'
            >
              Delete My Account
            </button>
          </div>
        )
      } else {
        dashboardContent = (
          <div>
            <p className='lead text-muted'>Welcome {user.name}</p>
            <p> You have not yet set a profile, please add some Info </p>
            <Link to='/create-profile' className='btn btn-lg btn-info'>
              Create Profile
            </Link>
          </div>
        )
      }
    }

    return (
      <div className='dashboard'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4'>Dashboard Test</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard)
