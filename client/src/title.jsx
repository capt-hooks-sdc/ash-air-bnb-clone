import React from 'react';
import styled from 'styled-components';

const Title = ({ property }) => (
  <Info>
    {property.name}
    <div>
      <FavIcon src="https://www.shareicon.net/data/2015/10/06/651855_favorite_512x512.png" />
      <Favorites>{property.favorites}</Favorites>
      <Location>{property.location}</Location>
      <AddText>Save</AddText>
      <Add src="https://cdn2.iconfinder.com/data/icons/4web-3/139/favourite-512.png" />
      <ShareText>Share</ShareText>
      <Share src="https://www.pngfind.com/pngs/m/78-782308_png-file-share-icon-ios-png-transparent-png.png" />
    </div>
  </Info>
);

const Info = styled.div`
margin-left: auto;
margin-right: auto;
margin-bottom: 20px;
width: 100%;
max-width: 1128px;
font-size: 26px;
line-height: 30px;
font-weight: 400;
font-family: 'Roboto', sans-serif;
`;

const Location = styled.span`
margin-left: auto;
margin-right: auto;
margin-bottom: 15px;
width: 100%;
max-width: 1128px;
font-size: 14px;
line-height: 30px;
font-weight: 400;
font-family: 'Roboto', sans-serif;
color: rgb(113, 113, 113);
text-decoration: underline;
cursor: pointer;
display: inline;
`;

const Favorites = styled.span`
margin-left: auto;
margin-right: 10px;
margin-bottom: 20px;
width: 100%;
max-width: 1128px;
font-size: 14px;
line-height: 30px;
font-weight: 400;
font-family: 'Roboto', sans-serif;
color: black;
cursor: pointer;
`;

const FavIcon = styled.img`
max-height: 16px;
max-width: 16px;
margin-top: 10px;
margin-right: 5px;
color: rgb(113, 113, 113);
display: inline;
vertical-align: text-top;
`;

const Add = styled.img`
max-height: 16px;
max-width: 16px;
margin-top: 10px;
margin-right: 5px;
float: right;
display: inline;
vertical-align: text-top;
cursor: pointer;
`;

const Share = styled.img`
max-height: 16px;
max-width: 16px;
margin-top: 10px;
margin-right: 5px;
float: right;
display: inline;
vertical-align: text-top;
cursor: pointer;
`;

const AddText = styled.span`
float: right;
font-size: 14px;
text-decoration: underline;
margin-left: 10px;
margin-right: 10px;
font-family: 'Roboto', sans-serif;
font-weight: 400;
display: inline;
cursor: pointer;
`;

const ShareText = styled.span`
float: right;
font-size: 14px;
text-decoration: underline;
margin-left: 10px;
margin-right: 10px;
font-family: 'Roboto', sans-serif;
font-weight: 400;
display: inline;
cursor: pointer;
`;

export default Title;
