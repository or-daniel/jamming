import { useState } from "react";
import popupStyles from "./Popup.module.css";
import PropTypes from "prop-types";
import spotifyLogo from '../../images/spotify-logo.ico';

const Popup = (props) => {
  let [show, setShow] = useState(true);
  show = props.show;

  const clickHandler = (e) => {
    props.getToken();
    setShow(false);
  };


  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0"
      }}
      className={popupStyles.overlay}
    >
      <div className={popupStyles.popup}>
        <div className={popupStyles.content}>{props.children}</div>
        <button onClick={clickHandler} className={popupStyles.connect}><img id="spotify_logo" alt="spotify logo" src={spotifyLogo}/>connect</button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  show: PropTypes.bool.isRequired
};

export default Popup;
