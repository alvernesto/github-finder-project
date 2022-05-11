import React from 'react';
import { Link } from 'react-router-dom';

/** Navbar Functional Component */

const Navbar = (props) => {
  const { icon, title } = props;
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon}></i>
        {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  )
}

Navbar.defaultProps = {
  icon: 'fab fa-github',
  title: ' Github Finder',

};

export default Navbar

/** Navbar Class Component */

// class Navbar extends Component {
//   static defaultProps = {
//     title: ' Github Finder',
//     icon: 'fab fa-github'
//   };
//   render() {
//     return (
//       <nav className='navbar bg-primary'>
//         <h1>
//           <i className={this.props.icon}></i>
//           {this.props.title}
//         </h1>
//       </nav>
//     )
//   }
// }

