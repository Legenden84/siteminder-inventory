import React, { Component } from 'react';
import { useDropzone } from 'react-dropzone';
import './Navbar.css';
import { parseHTM } from '../utils/parseHTM';
import { connect } from 'react-redux';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      columns: null,
    };
  }

  toggleDropdown = () => {
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
  };

  handleDrop = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        const { data, columns } = parseHTM(content, this.state.columns);
        this.setState({ columns });
        this.props.setOccupancyData(data);
      };
      reader.readAsText(file);
    });
  };

  render() {
    const { inventory } = this.props;
    const { dropdownOpen } = this.state;

    return (
      <nav className="navbar">
        <div className="navbar-header">
          <h2>Ascot SiteMinder Inventory Manager</h2>
        </div>
        <div className="dropdown-wrapper">
          <button onClick={this.toggleDropdown} className="dropdown-button">
            Inventory
            {dropdownOpen && (
              <div className="dropdown-content">
                <ul>
                  {Object.entries(inventory).map(([roomType, count]) => (
                    <li key={roomType}>
                      {roomType}: {count}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </button>
        </div>
        <Dropzone onDrop={this.handleDrop} />
      </nav>
    );
  }
}

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'text/html': ['.html', '.htm']
    },
    onDrop
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some HTM files here, or click to select files</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  inventory: state.navbar.inventory,
});

const mapDispatchToProps = (dispatch) => ({
  setOccupancyData: (data) => dispatch({ type: 'SET_OCCUPANCY_DATA', payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
