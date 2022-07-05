import PropTypes from "prop-types";
import React, { Component } from "react";
import "react-drawer/lib/react-drawer.css";

import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";

import { Link } from "react-router-dom";

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ChatDropdown from "../CommonForBoth/TopbarDropdown/ChatDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import logoDashed from "../../assets/images/logo-light.svg";

import ellipse from "../../assets/images/ellipse.svg";

//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import { toggleRightSidebar } from "../../store/actions";

import OptionsModal from "components/Common/OptionsModal";

const menu_items = [
  { url: "/", title: "Discover" },
  { url: "/", title: "Dashboards" },
  { url: "/", title: "Data Stories" },
];

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      open: false,
      position: "right",
      optionsModalVisible: false,
      hoverPosition: null,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.showOptionsModal = this.showOptionsModal.bind(this);
    this.hideOptionsModal = this.hideOptionsModal.bind(this);
    this.hover = this.hover.bind(this);
  }
  /**
   * Toggle sidebar
   */
  toggleMenu() {
    this.props.toggleMenuCallback();
  }

  /**
   * Toggles the sidebar
   */
  toggleRightbar() {
    this.props.toggleRightSidebar();
  }

  toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  showOptionsModal() {
    this.setState({ optionsModalVisible: true });
  }
  hideOptionsModal() {
    this.setState({ optionsModalVisible: false });
  }

  hover(index) {
    this.setState({ hoverPosition: index * (160 + 16) });
  }

  unhover() {
    this.setState({ hoverPosition: null });
  }

  render() {
    return (
      <React.Fragment>
        <header id="page-topbar">
          <div className="d-flex justify-content-center align-items-center position-absolute start-0 end-0 top-0 bottom-0">
            <Link to="/" className="">
              <span className="">
                <img src={logoDashed} alt="" style={{ height: 16 }} />
              </span>
            </Link>
          </div>
          <div className="navbar-header d-flex justify-content-between align-items-center">
            <div className="d-flex z-10">
              <button
                type="button"
                onClick={this.toggleMenu}
                className="btn btn-sm font-size-16 bg-light rounded-circle"
                id="vertical-menu-btn"
              >
                <img src={ellipse} />
                {/* <i className="fa fa-fw fa-bars"></i> */}
              </button>

              <ul
                className="metismenu d-flex align-items-center list-unstyled"
                onMouseLeave={() => this.unhover()}
              >
                {this.state.hoverPosition !== null && (
                  <div
                    className="animated-menu"
                    style={{
                      marginLeft: this.state.hoverPosition,
                    }}
                  ></div>
                )}

                {menu_items.map(({ to, title }, index) => (
                  <li
                    className="header-space"
                    style={{ zIndex: 10, width: 160 }}
                    key={index}
                    onMouseEnter={() => this.hover(index)}
                  >
                    <Link
                      to={to}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <i className="bx bx-map-alt mx-2" />
                      <span>{this.props.t(title)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="d-flex justify-content-center align-items-center z-10">
              <div className="header-space">
                <ul className="metismenu d-flex align-items-center list-unstyled">
                  <li className="">
                    <Link to="/#" className="d-flex align-items-center">
                      <i className="bx bx-transfer-alt mx-2" />
                      <span>{this.props.t("Trade")}</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="">
                <ProfileMenu />
              </div>

              <div className="">
                <ChatDropdown />
              </div>

              <div className="header-space-sm mt-1">
                <NotificationDropdown />
              </div>

              {/* <Link
                to="/projects-create"
                className="px-3 btn btn-success rounded-pill font-size-14 fw-bold"
              >
                {this.props.t("Create")}
              </Link> */}
              <button
                onClick={this.showOptionsModal}
                className="px-3 btn btn-success rounded-pill font-size-14 fw-bold"
              >
                {this.props.t("Create")}
              </button>
            </div>
          </div>
        </header>
        <OptionsModal
          visible={this.state.optionsModalVisible}
          onDismiss={this.hideOptionsModal}
        />
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  t: PropTypes.any,
  toggleMenuCallback: PropTypes.any,
  showRightSidebar: PropTypes.any,
  toggleRightSidebar: PropTypes.func,
};

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar } = state.Layout;
  return { layoutType, showRightSidebar };
};

export default connect(mapStatetoProps, { toggleRightSidebar })(
  withTranslation()(Header)
);
