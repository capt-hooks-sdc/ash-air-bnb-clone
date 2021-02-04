/* eslint-disable react/button-has-type */
/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import Title from './title.jsx';
import Modal from './modal.jsx';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      property: {},
      photos: [],
      currentPhoto: 0,
    };
    this.renderImageContent = this.renderImageContent.bind(this);
    this.showModal = this.showModal.bind(this);
    this.nextPicture = this.nextPicture.bind(this);
    this.prevPicture = this.prevPicture.bind(this);
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '/photos',
    }).then((data) => {
      const photoArray = [];
      const property = {
        name: null,
        location: null,
        favorites: null,
      };
      for (let i = 0; i < data.data.length; i++) {
        property.name = data.data[0].name;
        property.location = data.data[0].location;
        property.favorites = data.data[0].favorites;
        photoArray.push(data.data[i].photoURL);
      }
      this.setState({
        property,
        photos: photoArray,
      });
    });
  }

  nextPicture() {
    if (this.state.currentPhoto !== this.state.photos.length - 1) {
      this.setState({
        currentPhoto: this.state.currentPhoto + 1,
      });
    } else {
      console.log('end of carousel, not a valid click');
    }
  }

  prevPicture() {
    if (this.state.currentPhoto !== 0) {
      this.setState({
        currentPhoto: this.state.currentPhoto - 1,
      });
    } else {
      console.log('start of carousel, not a valid click');
    }
  }

  showModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
    if (this.state.modalOpen === true) {
      setTimeout(() => {
        this.setState({
          currentPhoto: 0,
        });
      }, 600);
    }
  }

  openModal(e, index) {
    this.setState({ currentPhoto: index });
    this.showModal();
  }

  // eslint-disable-next-line class-methods-use-this
  renderImageContent(src, index) {
    return (
      <GalleryChild
        key={index}
        index={index}
        onClick={(e) => this.openModal(e, index)}
      >
        <Photos src={src} key={src} />
      </GalleryChild>
    );
  }

  render() {
    const displayImages = this.state.photos.slice(0, 5);
    return (
      <div>
        <Title property={this.state.property} />
        <Grid>
          {displayImages.map(this.renderImageContent)}
          <Submit
            onClick={(e) => {
              this.showModal();
            }}
          >
            <Dots src="https://lh3.googleusercontent.com/proxy/OiwrMASYxmaO5Rd647dux4b7P20fZ2R27FmMkvQABSyf5-OfTyhMXHxsb-NafVHnhZHD-WcLHBKaYzToZSmHTZ5LYj6cV_VzDPv_YkED1GeT" />
            Show All Photos
          </Submit>
        </Grid>
        <Modal currentPhoto={this.state.currentPhoto} photos={this.state.photos} modalOpen={this.state.modalOpen} showModal={this.showModal} nextPicture={this.nextPicture} prevPicture={this.prevPicture} />
      </div>
    );
  }
}

const Grid = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 50% 50%;
  grid-gap: 8px;
  height: 100%;
  max-height: 355px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1128px;
  overflow: hidden;
  border-radius: 12px;
`;

const Photos = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  background-color:#000;
  transition-property: opacity;
  transition-duration: 200ms;
  &:hover {
    opacity: 0.85;
    background-color:#000;
    cursor: pointer;
  }
`;

const Submit = styled.button`
  position: absolute;
  grid-column-start: 4;
  grid-column-end: span 1;
  grid-row-start: 2;
  grid-row-end: span 1;
  z-index: 3;
  margin-left: 29%;
  margin-top: 40%;
  padding: 7px 15px;
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  cursor: pointer;
  background: white;
  vertical-align: middle
`;

const Dots = styled.img`
  height: 15px;
  width: 15px;
  margin: auto 5px 0px auto;
`;

const GalleryChild = styled.div`
position: relative;
  grid-column-start: ${(props) => {
    if (props.index === 0) {
      return '1';
    }
    if (props.index === 1) {
      return '3';
    }
    if (props.index === 2) {
      return '4';
    }
    if (props.index === 3) {
      return '3';
    }
    if (props.index === 4) {
      return '4';
    }
  }};
  grid-column-end: ${(props) => {
    if (props.index === 0) {
      return 'span 2';
    }
    if (props.index === 1) {
      return 'span 1';
    }
    if (props.index === 2) {
      return 'span 1';
    }
    if (props.index === 3) {
      return 'span 1';
    }
    if (props.index === 4) {
      return 'span 1';
    }
  }};
  grid-row-start: ${(props) => {
    if (props.index === 0) {
      return '1';
    }
    if (props.index === 1) {
      return '1';
    }
    if (props.index === 2) {
      return '1';
    }
    if (props.index === 3) {
      return '2';
    }
    if (props.index === 4) {
      return '2';
    }
  }};
  grid-row-end: ${(props) => {
    if (props.index === 0) {
      return 'span 2';
    }
    if (props.index === 1) {
      return 'span 1';
    }
    if (props.index === 2) {
      return 'span 1';
    }
    if (props.index === 3) {
      return 'span 1';
    }
    if (props.index === 4) {
      return 'span 1';
    }
  }};
  object-fit: cover;
  background-color: black;
`;

ReactDOM.render(<div><Gallery /></div>, document.getElementById('photos'));
