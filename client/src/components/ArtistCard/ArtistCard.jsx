import React, { useState, useEffect } from 'react';
import "./ArtistCard.css";

const ArtistCard = ({name, img}) => {
	return (
		<div className="artist-card">
			<div className="img">
				<img src={"/assets/imgs/artists/" + img} alt="" />
			</div>
			<div className="display-font">{name}</div>
		</div>
	);
}
 
export default ArtistCard;