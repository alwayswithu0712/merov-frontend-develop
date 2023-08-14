import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import HeaderFeaturedNav from './HeaderFeaturedNav'
import HeaderNotificationNav from './HeaderNotificationNav'
import HeaderProfileNav from './HeaderProfileNav'
import { Button, Container } from 'react-bootstrap'
import React from 'react'

type HeaderProps = {
  toggleSidebar: () => void;
  toggleSidebarMd: () => void;
}

export default function Header(props: HeaderProps) {
  const { toggleSidebar, toggleSidebarMd } = props

  return (
    <header className="header-pool sticky-top  py-2 px-sm-2 border-bottom">
      <Container fluid className="header-navbar-pool d-flex align-items-center">
        <Button
          variant="link"
          className="header-toggler-pool d-md-none px-md-0 me-md-3 rounded-0 shadow-none"
          type="button"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <Button
          variant="link"
          className="header-toggler-pool d-none d-md-inline-block px-md-0 me-md-3 rounded-0 shadow-none"
          type="button"
          onClick={toggleSidebarMd}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <div className="header-nav-pool d-none d-md-flex">
          <HeaderFeaturedNav />
        </div>
        <div className="header-nav-pool ms-auto">
          <HeaderNotificationNav />
        </div>
        <div className="header-nav-pool ms-2">
          <HeaderProfileNav />
        </div>
      </Container>
    </header>
  )
}
