import React, { Component } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

class User extends Component {

    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
    }



    render() {
        const { name, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, company, hireable } = this.props.user;
        const { loading } = this.props;
        if (loading) return <Spinner />
        return (
            <>
                <Link to='/' className='btn btn-light'> Back to search</Link>
                Hireable: {''}
                {hireable ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger' />}
                <div className='card grid-2'>
                    <div className='all-center'>
                        <img src={avatar_url}
                            className='round-img'
                            alt='pic-profile'
                            style={{ width: '150px' }} />
                        <h1>{name}</h1>
                        <p><i class="fa-solid fa-location-dot"></i> {location}</p>
                    </div>
                    <div>
                        {bio &&
                            <>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </>}
                        <a href={html_url} className='btn btn-dark my-1'>
                            Visit Github profile</a>
                        <ul>
                            <li>
                                {login && <>
                                    <strong>Username: </strong> {login}
                                </>}
                            </li>
                            <li>
                                {company && <>
                                    <strong>Company:  </strong> {company}
                                </>}
                            </li>
                            <li>
                                {blog && <>
                                    <strong>Website:  </strong> {blog}
                                </>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='card text-center'>
                    <div className='badge badge-primary'> Followers: {followers}</div>
                    <div className='badge badge-success'> Following: {following}</div>
                    <div className='badge badge-light'> Public Repos: {public_repos}</div>
                    <div className='badge badge-dark'> Public Gists: {public_gists}</div>
                </div>
            </>
        )
    }
}

export default User; 
