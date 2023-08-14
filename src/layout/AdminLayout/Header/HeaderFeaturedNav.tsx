import Link from 'next/link'
import { Nav } from 'react-bootstrap'
import React from 'react'

export default function HeaderFeaturedNav() {
  return (
    <Nav>
      <Nav.Item>
        <Link href="/pool" passHref legacyBehavior>
          <Nav.Link className="p-2 text-white">Dashboard</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/pool/miner" passHref legacyBehavior>
          <Nav.Link className="p-2 text-white">Miner</Nav.Link>
        </Link>
      </Nav.Item>
    </Nav>
  )
}
